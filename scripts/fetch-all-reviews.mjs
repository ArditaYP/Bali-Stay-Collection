/**
 * fetch-all-reviews.mjs
 * Script untuk menarik seluruh ulasan asli dan foto profil avatar tamu dari Airbnb
 * untuk semua villa yang belum ditarik ulasannya secara penuh.
 * 
 * Fitur:
 * - Mengambil ulasan terverifikasi langsung dari GraphQL Airbnb API
 * - Mengunduh avatar profil tamu ke public/airbnb/<id>/avatars/
 * - Memperbarui data reviews dan reviewsCount di src/data/airbnbVillas.json
 * - Menjaga keutuhan copywriting NLP yang sudah ada di setiap villa
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public', 'airbnb');
const AIRBNB_JSON_PATH = path.join(ROOT, 'src', 'data', 'airbnbVillas.json');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
const REVIEWS_QUERY_HASH = 'dec1c8061483e78373602047450322fd474e79ba9afa8d3dbbc27f504030f91d';

// Daftar villa target yang akan ditarik ulasannya secara lengkap
const TARGET_VILLAS = [
  { id: 'villa-mahina', airbnbId: '1774378701877333551' },
  { id: 'khaleela-villas', airbnbId: '943039238876312168' },
  { id: 'beyond-the-palms', airbnbId: '1138105700588823608' },
  { id: 'villa-akar', airbnbId: '1119970392950872597' },
  { id: 'villa-golden', airbnbId: '1119868803686917540' },
  { id: 'villa-surga', airbnbId: '1106787074513318766' },
  { id: 'villa-imala', airbnbId: '1569243074057240780' },
  { id: 'five-bedroom-designer-umalas', airbnbId: '1562881107580894513' },
  { id: 'villa-habitas', airbnbId: '1227088687659654852' }
];

/**
 * Menjeda proses selama durasi tertentu agar tidak membebani server
 * @param {number} ms - Milidetik jeda
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mengambil API key publik dari halaman listing Airbnb
 * @param {string} airbnbId - ID listing Airbnb
 * @returns {Promise<string>} Kunci API publik
 */
async function fetchApiKey(airbnbId) {
  try {
    const res = await fetch(`https://www.airbnb.com/rooms/${airbnbId}`, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' }
    });
    const html = await res.text();
    const match = html.match(/"api_config":\{"key":"([a-z0-9]+)"/);
    return match ? match[1] : 'd306zoyjsyarp7ifhu67rjxn52tv0t20';
  } catch (err) {
    return 'd306zoyjsyarp7ifhu67rjxn52tv0t20';
  }
}

/**
 * Mengunduh file gambar ke disk lokal
 * @param {string} url - URL gambar
 * @param {string} dest - Path penyimpanan di disk
 * @returns {Promise<boolean>} Sukses atau gagal
 */
async function downloadFile(url, dest) {
  if (fs.existsSync(dest)) return true;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return false;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return true;
  } catch {
    return false;
  }
}

/**
 * Mengubah URL gambar Airbnb menjadi ukuran tertentu
 * @param {string} url - URL asli
 * @param {number} width - Lebar gambar
 * @returns {string} URL terformat ukuran
 */
const sized = (url, width) => `${url}${url.includes('?') ? '&' : '?'}im_w=${width}`;

/**
 * Format tanggal ISO ke format bulan tahun Bahasa Inggris
 * @param {string} iso - String tanggal ISO
 * @returns {string} Nama bulan dan tahun
 */
const monthYear = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

/**
 * Menghasilkan inisial nama tamu
 * @param {string} [name=''] - Nama tamu
 * @returns {string} Inisial kapital
 */
const initialsOf = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

/**
 * Mengambil satu halaman review dari Airbnb GraphQL
 * @param {string} airbnbId - ID listing Airbnb
 * @param {string} apiKey - API key
 * @param {number} offset - Offset pagination
 * @returns {Promise<Array>} Array review mentah
 */
async function fetchReviewPage(airbnbId, apiKey, offset) {
  const variables = {
    id: Buffer.from(`StayListing:${airbnbId}`).toString('base64'),
    pdpReviewsRequest: {
      fieldSelector: 'for_p3_translation_only',
      forPreview: false,
      limit: 24,
      offset: String(offset),
      showingTranslationButton: false,
      first: 24,
      sortingPreference: 'MOST_RECENT'
    }
  };
  const extensions = { persistedQuery: { version: 1, sha256Hash: REVIEWS_QUERY_HASH } };
  const url = `https://www.airbnb.com/api/v3/StaysPdpReviewsQuery/${REVIEWS_QUERY_HASH}?operationName=StaysPdpReviewsQuery&locale=en&currency=USD`
    + `&variables=${encodeURIComponent(JSON.stringify(variables))}&extensions=${encodeURIComponent(JSON.stringify(extensions))}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        'X-Airbnb-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.presentation?.stayProductDetailPage?.reviews?.reviews || [];
  } catch {
    return [];
  }
}

/**
 * Mengambil seluruh ulasan dari listing hingga batas maksimal (maksimal 72 ulasan)
 * @param {string} airbnbId - ID listing Airbnb
 * @param {string} apiKey - API key
 * @returns {Promise<Array>} Array seluruh ulasan
 */
async function fetchAllReviews(airbnbId, apiKey) {
  const all = [];
  const maxReviews = 72;
  for (let offset = 0; offset < maxReviews; offset += 24) {
    const page = await fetchReviewPage(airbnbId, apiKey, offset);
    if (!page || page.length === 0) break;
    all.push(...page);
    if (page.length < 24) break;
    await sleep(600);
  }
  return all;
}

/**
 * Menjalankan proses penarikan ulasan untuk seluruh villa target
 * @returns {Promise<void>}
 */
async function main() {
  console.log(`🚀 Memulai penarikan ulasan lengkap untuk ${TARGET_VILLAS.length} villa target...\n`);

  const airbnbVillas = JSON.parse(fs.readFileSync(AIRBNB_JSON_PATH, 'utf8'));
  const villaIndexMap = new Map();
  airbnbVillas.forEach((v, i) => villaIndexMap.set(v.id, i));

  // Ambil API key awal
  let activeApiKey = await fetchApiKey(TARGET_VILLAS[0].airbnbId);
  console.log(`✓ Kunci API Airbnb aktif: ${activeApiKey}\n`);

  for (let i = 0; i < TARGET_VILLAS.length; i++) {
    const target = TARGET_VILLAS[i];
    console.log(`[${i + 1}/${TARGET_VILLAS.length}] ▶ Mengambil ulasan untuk ${target.id} (${target.airbnbId})...`);

    const rawReviews = await fetchAllReviews(target.airbnbId, activeApiKey);
    console.log(`   Ditemukan ${rawReviews.length} ulasan asli di Airbnb.`);

    if (rawReviews.length === 0) {
      console.log(`   (Tidak ada ulasan baru atau listing belum memiliki ulasan publik)`);
      continue;
    }

    const formattedReviews = [];
    let downloadedAvatars = 0;

    for (const r of rawReviews) {
      const reviewerName = r.reviewer?.firstName || 'Guest';
      let avatarPath = null;
      const pictureUrl = r.reviewer?.pictureUrl;

      if (pictureUrl) {
        const avatarFile = `${r.id}.jpg`;
        const dest = path.join(PUBLIC_DIR, target.id, 'avatars', avatarFile);
        const ok = await downloadFile(sized(pictureUrl, 240), dest);
        if (ok) {
          avatarPath = `/airbnb/${target.id}/avatars/${avatarFile}`;
          downloadedAvatars++;
        }
      }

      const translated = r.localizedReview?.needsTranslation && r.localizedReview?.comments;
      formattedReviews.push({
        id: r.id,
        name: reviewerName,
        initials: initialsOf(reviewerName),
        avatar: avatarPath,
        rating: r.rating ?? 5,
        createdAt: r.createdAt,
        date: monthYear(r.createdAt),
        reviewerInfo: r.localizedReviewerLocation || '',
        comment: (translated || r.comments || '').replace(/<br\s*\/?>/g, '\n'),
        originalComment: translated ? r.comments : null,
        translationNote: translated ? r.localizedReview.disclaimer : null,
        hostResponse: (r.localizedReview?.response || r.response || null)
      });
    }

    console.log(`   ✓ ${formattedReviews.length} ulasan diformat (${downloadedAvatars} avatar profil berhasil diunduh).`);

    // Perbarui entri di airbnbVillas.json
    const vIndex = villaIndexMap.get(target.id);
    if (vIndex !== undefined) {
      airbnbVillas[vIndex].reviews = formattedReviews;
      airbnbVillas[vIndex].reviewsCount = Math.max(airbnbVillas[vIndex].reviewsCount || 0, formattedReviews.length);
    }

    await sleep(800);
  }

  // Tulis kembali ke airbnbVillas.json
  fs.writeFileSync(AIRBNB_JSON_PATH, JSON.stringify(airbnbVillas, null, 2), 'utf8');
  console.log(`\n🎉 SELESAI: airbnbVillas.json berhasil diperbarui dengan ulasan lengkap!`);
}

main().catch(err => {
  console.error('Terjadi error dalam proses:', err);
});
