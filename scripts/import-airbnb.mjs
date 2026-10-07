/**
 * import-airbnb.mjs
 * Script untuk mengambil data villa langsung dari Airbnb dan menyimpannya ke proyek ini.
 *
 * Fitur yang diambil per villa:
 *  - Nama villa, lokasi, kapasitas tamu, kamar, kasur, kamar mandi
 *  - Rating keseluruhan, jumlah review, dan rating per kategori (Cleanliness, Accuracy, dst.)
 *  - Foto villa beresolusi tinggi (diunduh ke /public/airbnb/<slug>/photos)
 *  - Semua review tamu: nama, foto profil (diunduh lokal), bintang, tanggal, isi review, balasan host
 *
 * Hasil akhir: src/data/airbnbVillas.json (dibaca oleh src/data/villasData.js)
 *
 * Cara pakai: node scripts/import-airbnb.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ---------------------------------------------------------------------------
// KONFIGURASI
// ---------------------------------------------------------------------------

/** Daftar 13 villa aktif dari tautan Airbnb yang diberikan */
const LISTINGS = [
  { slug: 'villa-habitas', airbnbId: '1227088687659654852' },
  { slug: 'tranquil-sanctuary-pererenan', airbnbId: '1472810975642833657' },
  { slug: 'tropical-canggu-villa', airbnbId: '48112412' },
  { slug: 'luxe-beach-villa-seminyak', airbnbId: '1239607319731763224' },
  { slug: 'tropical-elegance-seseh', airbnbId: '1344632024593729408' },
  { slug: 'iconic-cliff-top-villa', airbnbId: '1365727502132237034' },
  { slug: 'yellow-moon-uluwatu', airbnbId: '1435827081108148692' },
  { slug: 'st-lau-ubud', airbnbId: '1517027661326621037' },
  { slug: 'casa-kaya-bingin', airbnbId: '1521544022364650655' },
  { slug: 'luxury-tropical-bingin', airbnbId: '1547562543907085427' },
  { slug: 'chic-tropical-bingin', airbnbId: '1558539228609452633' },
  { slug: 'five-bedroom-designer-umalas', airbnbId: '1562881107580894513' },
  { slug: 'angkasa-ubud', airbnbId: '1634534758752754577' }
];

/** Jumlah maksimal foto villa yang diunduh per listing */
const MAX_PHOTOS = 20;

/** Hash persisted-query GraphQL milik Airbnb untuk mengambil review */
const REVIEWS_QUERY_HASH = 'dec1c8061483e78373602047450322fd474e79ba9afa8d3dbbc27f504030f91d';

/** Header browser agar Airbnb mengembalikan respons halaman normal */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

/** Folder tujuan */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public', 'airbnb');
const OUTPUT_JSON = path.join(ROOT, 'src', 'data', 'airbnbVillas.json');

// ---------------------------------------------------------------------------
// FUNGSI BANTU DENGAN JSDOC RESMI
// ---------------------------------------------------------------------------

/**
 * Menjeda eksekusi sementara selama durasi tertentu agar tidak membebani server
 * @param {number} ms - Durasi jeda dalam milidetik
 * @returns {Promise<void>} Janji penundaan waktu
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Mengambil isi teks HTML dari sebuah URL publik
 * @param {string} url - Alamat URL target yang akan diambil
 * @returns {Promise<string>} Konten HTML halaman
 */
async function getText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  return res.text();
}

/**
 * Mengunduh file media/gambar ke path disk lokal (dilewati jika file sudah ada)
 * @param {string} url - URL sumber gambar
 * @param {string} dest - Path lokasi penyimpanan file di disk
 * @returns {Promise<void>} Janji penyelesaian unduhan
 */
async function downloadFile(url, dest) {
  if (fs.existsSync(dest)) return;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Gagal unduh ${url} (HTTP ${res.status})`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

/**
 * Membentuk URL gambar dengan parameter lebar tertentu untuk optimasi CDN
 * @param {string} url - URL asli gambar dari CDN Airbnb
 * @param {number} width - Lebar gambar yang diinginkan (misal 960 atau 1440)
 * @returns {string} URL gambar dengan parameter ukuran
 */
const sized = (url, width) => `${url}${url.includes('?') ? '&' : '?'}im_w=${width}`;

/**
 * Mengonversi tanggal ISO menjadi format teks bulan dan tahun
 * @param {string} iso - String tanggal format ISO
 * @returns {string} Format tanggal seperti "September 2026"
 */
const monthYear = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

/**
 * Menghasilkan inisial nama tamu jika foto profil tidak tersedia
 * @param {string} [name=''] - Nama tamu
 * @returns {string} Dua huruf inisial kapital
 */
const initialsOf = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

/**
 * Membersihkan tag HTML dan karakter entitas dari teks deskripsi Airbnb
 * @param {string} str - Teks HTML mentah dari API Airbnb
 * @returns {string} Teks bersih terformat baris baru
 */
function cleanAirbnbHtml(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim();
}

/**
 * Membaca halaman listing Airbnb dan mengekstrak info villa serta daftar foto
 * @param {string} airbnbId - Nomor ID listing Airbnb
 * @returns {Promise<Object>} Objek spesifikasi detail villa
 */
async function fetchListing(airbnbId) {
  const html = await getText(`https://www.airbnb.com/rooms/${airbnbId}`);

  // API key publik yang dipakai web Airbnb sendiri
  const apiKey = html.match(/"api_config":\{"key":"([a-z0-9]+)"/)?.[1];

  // Judul halaman
  const pageTitle = (html.match(/<title>([^<]+)<\/title>/)?.[1] || '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'");
  const name = pageTitle.split(' - ')[0].trim();
  const location = pageTitle.match(/for Rent in ([^,]+),/)?.[1] || pageTitle.match(/ in ([^,-]+), Bali/)?.[1] || 'Bali';

  // JSON utama halaman
  const stateRaw = html.match(/<script id="data-deferred-state-0"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  if (!stateRaw) throw new Error('Data listing tidak ditemukan (struktur halaman Airbnb mungkin berubah)');
  const state = JSON.parse(stateRaw);
  const pdp = state.niobeClientData[0][1].data.presentation.stayProductDetailPage.sections;
  const sharing = pdp.metadata.sharingConfig;

  const num = (re) => Number(sharing.title?.match(re)?.[1] || 0);
  const bedrooms = num(/(\d+) bedrooms?/);
  const beds = num(/(\d+) beds?\b/);
  const bathrooms = num(/([\d.]+) (?:private |shared )?baths?/);

  // Daftar foto dari section PHOTO_TOUR_SCROLLABLE
  const photoSection = pdp.sections.find((s) => s.sectionComponentType === 'PHOTO_TOUR_SCROLLABLE')?.section;
  const photos = (photoSection?.mediaItems || [])
    .filter((m) => m.baseUrl)
    .map((m) => ({ url: m.baseUrl, caption: m.accessibilityLabel || '' }));

  // Rating per kategori
  const catMatch = stateRaw.match(/"categoryRatings":(\[[^\]]*\])/);
  const categoryRatings = catMatch ? JSON.parse(catMatch[1]) : [];
  const ratingsBreakdown = {};
  const keyMap = { CLEANLINESS: 'cleanliness', ACCURACY: 'accuracy', CHECKIN: 'checkIn', COMMUNICATION: 'communication', LOCATION: 'location', VALUE: 'value' };
  for (const c of categoryRatings) {
    if (keyMap[c.categoryType]) ratingsBreakdown[keyMap[c.categoryType]] = Number(c.localizedRating);
  }

  // Status "Guest favorite"
  const isGuestFavorite = /"isGuestFavorite":true/.test(stateRaw);

  // Deskripsi lengkap & bagian detail dari PDP_DESCRIPTION_MODAL
  const descModal = pdp.sections.find((s) => s.sectionComponentType === 'PDP_DESCRIPTION_MODAL' || s.sectionId === 'DESCRIPTION_MODAL');
  const modalItems = descModal?.section?.items || [];
  const parsedSections = [];
  const fullTextParts = [];
  let summaryText = '';

  for (const mItem of modalItems) {
    const title = mItem.title || null;
    const body = cleanAirbnbHtml(mItem.html?.htmlText || '');

    // Lewati bagian nomor registrasi perizinan (REGISTRATION DETAILS) sesuai arahan pengguna
    if (
      (title && title.toUpperCase().includes('REGISTRATION')) ||
      body.toUpperCase().includes('NIB:') ||
      body.toUpperCase().includes('KBLI:')
    ) {
      continue;
    }

    parsedSections.push({ title, body });
    if (!title && !summaryText) {
      summaryText = body;
    }
    if (title) {
      fullTextParts.push(`${title.toUpperCase()}\n${body}`);
    } else if (body) {
      fullTextParts.push(body);
    }
  }

  const fullDesc = fullTextParts.join('\n\n');
  const shortDesc = (summaryText || fullDesc).split('\n\n')[0].trim();

  return {
    apiKey, name, location, bedrooms, beds, bathrooms,
    guests: sharing.personCapacity || (bedrooms ? bedrooms * 2 : 2),
    rating: sharing.starRating || 5,
    reviewsCount: sharing.reviewCount || 0,
    isGuestFavorite,
    ratingsBreakdown,
    photos,
    shortDesc,
    description: shortDesc,
    fullDesc,
    descriptionSections: parsedSections
  };
}

// ---------------------------------------------------------------------------
// LANGKAH 2: Semua review via GraphQL Airbnb
// ---------------------------------------------------------------------------

/**
 * Mengambil satu halaman review mulai dari offset tertentu
 * @param {string} airbnbId - Nomor ID listing Airbnb
 * @param {string} apiKey - Kunci API Airbnb
 * @param {number} offset - Indeks pergeseran review
 * @returns {Promise<Array>} Kumpulan objek review
 */
async function fetchReviewPage(airbnbId, apiKey, offset) {
  if (!apiKey) return [];
  const variables = {
    id: Buffer.from(`StayListing:${airbnbId}`).toString('base64'),
    pdpReviewsRequest: {
      fieldSelector: 'for_p3_translation_only', forPreview: false, limit: 24, offset: String(offset),
      showingTranslationButton: false, first: 24, sortingPreference: 'MOST_RECENT'
    }
  };
  const extensions = { persistedQuery: { version: 1, sha256Hash: REVIEWS_QUERY_HASH } };
  const url = `https://www.airbnb.com/api/v3/StaysPdpReviewsQuery/${REVIEWS_QUERY_HASH}?operationName=StaysPdpReviewsQuery&locale=en&currency=USD`
    + `&variables=${encodeURIComponent(JSON.stringify(variables))}&extensions=${encodeURIComponent(JSON.stringify(extensions))}`;

  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'X-Airbnb-API-Key': apiKey, 'Content-Type': 'application/json' } });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data?.presentation?.stayProductDetailPage?.reviews?.reviews || [];
  } catch {
    return [];
  }
}

/**
 * Mengambil seluruh ulasan tamu secara berulang sampai halaman terakhir
 * @param {string} airbnbId - Nomor ID listing Airbnb
 * @param {string} apiKey - Kunci API Airbnb
 * @param {number} expected - Perkiraan jumlah review total
 * @returns {Promise<Array>} Seluruh daftar review yang berhasil dihimpun
 */
async function fetchAllReviews(airbnbId, apiKey, expected) {
  const all = [];
  const maxReviews = Math.min(expected || 24, 72); // Batasi maksimal 72 review per villa agar efisien
  for (let offset = 0; offset < maxReviews; offset += 24) {
    const page = await fetchReviewPage(airbnbId, apiKey, offset);
    all.push(...page);
    if (page.length < 24) break;
    await sleep(600);
  }
  return all;
}

// ---------------------------------------------------------------------------
// PROSES UTAMA
// ---------------------------------------------------------------------------

/**
 * Menjalankan alur scraping dan integrasi seluruh villa dari daftar listing Airbnb
 * @returns {Promise<void>} Janji penyelesaian proses impor
 */
async function main() {
  console.log(`🚀 Memulai impor data ${LISTINGS.length} villa Airbnb...\n`);

  // Baca data yang sudah ada sebelumnya agar tidak hilang
  const existingVillas = fs.existsSync(OUTPUT_JSON)
    ? JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf8'))
    : [];
  
  const villaMap = new Map();
  for (const v of existingVillas) {
    villaMap.set(v.id, v);
  }

  for (let idx = 0; idx < LISTINGS.length; idx++) {
    const { slug, airbnbId } = LISTINGS[idx];
    console.log(`\n[${idx + 1}/${LISTINGS.length}] ▶ Mengambil data ${slug} (${airbnbId})...`);

    try {
      const listing = await fetchListing(airbnbId);
      console.log(`  ✓ Nama: ${listing.name} · ★${listing.rating} · ${listing.reviewsCount} review · ${listing.photos.length} foto tersedia`);

      // 1. Unduh foto-foto terbaik villa
      const images = [];
      const photoCaptions = [];
      const photosToDownload = listing.photos.slice(0, MAX_PHOTOS);

      for (const [i, p] of photosToDownload.entries()) {
        const file = `photo-${String(i + 1).padStart(2, '0')}.jpg`;
        const destPath = path.join(PUBLIC_DIR, slug, 'photos', file);
        try {
          await downloadFile(sized(p.url, i === 0 ? 1440 : 960), destPath);
          images.push(`/airbnb/${slug}/photos/${file}`);
          photoCaptions.push(p.caption || `Photo ${i + 1}`);
        } catch (err) {
          console.warn(`    ⚠️ Gagal mengunduh foto ${i + 1}: ${err.message}`);
        }
      }
      console.log(`  ✓ ${images.length} foto resolusi tinggi berhasil disimpan`);

      // 2. Ambil ulasan tamu & avatar
      const rawReviews = await fetchAllReviews(airbnbId, listing.apiKey, listing.reviewsCount);
      const reviews = [];

      for (const r of rawReviews) {
        const name = r.reviewer?.firstName || 'Guest';
        let avatar = null;
        const pic = r.reviewer?.pictureUrl;
        if (pic) {
          const file = `${r.id}.jpg`;
          try {
            await downloadFile(sized(pic, 240), path.join(PUBLIC_DIR, slug, 'avatars', file));
            avatar = `/airbnb/${slug}/avatars/${file}`;
          } catch {
            // avatar gagal unduh, gunakan inisial
          }
        }
        const translated = r.localizedReview?.needsTranslation && r.localizedReview?.comments;
        reviews.push({
          id: r.id,
          name,
          initials: initialsOf(name),
          avatar,
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
      console.log(`  ✓ ${reviews.length} ulasan terverifikasi berhasil disimpan`);

      const villaEntry = {
        id: slug,
        airbnbId,
        airbnbUrl: `https://www.airbnb.com/rooms/${airbnbId}`,
        name: listing.name,
        location: listing.location,
        guests: listing.guests,
        bedroomsCount: listing.bedrooms || 1,
        beds: listing.beds || listing.bedrooms || 1,
        bathrooms: listing.bathrooms || 1,
        rating: listing.rating,
        reviewsCount: listing.reviewsCount,
        isGuestFavorite: listing.isGuestFavorite,
        ratingsBreakdown: listing.ratingsBreakdown,
        shortDesc: listing.shortDesc,
        description: listing.description,
        fullDesc: listing.fullDesc,
        descriptionSections: listing.descriptionSections,
        images,
        photoCaptions,
        reviews
      };

      villaMap.set(slug, villaEntry);

      // Sinkronisasi khusus: jika slug adalah villa-habitas, duplikasi juga ke the-palms-villa-canggu
      // agar rute lawas tetap kompatibel 100%
      if (slug === 'villa-habitas') {
        villaMap.set('the-palms-villa-canggu', {
          ...villaEntry,
          id: 'the-palms-villa-canggu'
        });
      }

      // Simpan progres ke file JSON setelah tiap villa berhasil diimpor
      fs.writeFileSync(OUTPUT_JSON, JSON.stringify(Array.from(villaMap.values()), null, 2));

    } catch (err) {
      console.error(`  ❌ Gagal mengimpor ${slug}:`, err.message);
    }

    await sleep(1000);
  }

  console.log(`\n🎉 Seluruh proses impor selesai! Total ${villaMap.size} villa tersimpan di ${path.relative(ROOT, OUTPUT_JSON)}`);
}

main().catch((err) => {
  console.error('❌ Terjadi kesalahan fatal:', err.message);
  process.exit(1);
});
