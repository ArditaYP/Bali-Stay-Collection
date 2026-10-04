/**
 * import-airbnb.mjs
 * Script SEKALI JALAN untuk mengambil data villa dari Airbnb dan menyimpannya ke proyek ini.
 *
 * Yang diambil per villa:
 *  - Nama villa, lokasi, kapasitas tamu, kamar, kasur, kamar mandi
 *  - Rating keseluruhan, jumlah review, dan rating per kategori (Cleanliness, Accuracy, dst.)
 *  - Foto villa (diunduh ke /public/airbnb/<slug>/photos)
 *  - Semua review tamu: nama, foto profil (diunduh lokal), bintang, tanggal, isi review, balasan host
 *
 * Hasil akhir: src/data/airbnbVillas.json  (dibaca oleh src/data/villasData.js)
 *
 * Cara pakai:  node scripts/import-airbnb.mjs
 * Butuh Node.js 18+ (karena memakai fetch bawaan).
 */
import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// KONFIGURASI
// ---------------------------------------------------------------------------

/** Daftar villa yang akan diimport: slug (id di web kita) + ID listing Airbnb */
const LISTINGS = [
  { slug: 'st-lau-ubud', airbnbId: '1517027661326621037' },
  { slug: 'iconic-cliff-top-villa', airbnbId: '1365727502132237034' },
  { slug: 'angkasa-ubud', airbnbId: '1634534758752754577' }
];

/** Jumlah maksimal foto villa yang diunduh per listing (Infinity = ambil semua foto) */
const MAX_PHOTOS = Infinity;

/** Hash persisted-query GraphQL milik Airbnb untuk mengambil review (bisa berubah sewaktu-waktu) */
const REVIEWS_QUERY_HASH = 'dec1c8061483e78373602047450322fd474e79ba9afa8d3dbbc27f504030f91d';

/** Header browser agar Airbnb mengembalikan halaman normal */
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

/** Folder tujuan */
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const PUBLIC_DIR = path.join(ROOT, 'public', 'airbnb');
const OUTPUT_JSON = path.join(ROOT, 'src', 'data', 'airbnbVillas.json');

// ---------------------------------------------------------------------------
// FUNGSI BANTU
// ---------------------------------------------------------------------------

/** Jeda sebentar antar request supaya tidak membebani / diblokir Airbnb */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Mengambil teks HTML dari sebuah URL */
async function getText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  return res.text();
}

/** Mengunduh file gambar ke disk (dilewati jika file sudah ada) */
async function downloadFile(url, dest) {
  if (fs.existsSync(dest)) return;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Gagal unduh ${url} (HTTP ${res.status})`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

/** Menambahkan parameter ukuran gambar Airbnb (im_w) agar file tidak terlalu besar */
const sized = (url, width) => `${url}${url.includes('?') ? '&' : '?'}im_w=${width}`;

/** Mengubah tanggal ISO menjadi format "September 2026" */
const monthYear = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

/** Mengambil inisial dari nama (dipakai sebagai cadangan jika foto profil gagal dimuat) */
const initialsOf = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

// ---------------------------------------------------------------------------
// LANGKAH 1: Data listing dari halaman villa
// ---------------------------------------------------------------------------

/**
 * Membaca halaman listing Airbnb dan mengambil info villa + daftar foto.
 * Data tersimpan di tag <script id="data-deferred-state-0"> berupa JSON.
 */
async function fetchListing(airbnbId) {
  const html = await getText(`https://www.airbnb.com/rooms/${airbnbId}`);

  // API key publik yang dipakai web Airbnb sendiri (dibutuhkan untuk request review)
  const apiKey = html.match(/"api_config":\{"key":"([a-z0-9]+)"/)?.[1];

  // Judul halaman: "<Nama Villa> - Villas for Rent in Ubud, Bali, Indonesia - Airbnb"
  const pageTitle = (html.match(/<title>([^<]+)<\/title>/)?.[1] || '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'");
  const name = pageTitle.split(' - ')[0].trim();
  // Lokasi diambil dari bagian "for Rent in <Kota>, Bali" (nama villa sendiri bisa mengandung kata "in")
  const location = pageTitle.match(/for Rent in ([^,]+),/)?.[1] || pageTitle.match(/ in ([^,-]+), Bali/)?.[1] || 'Bali';

  // JSON utama halaman
  const stateRaw = html.match(/<script id="data-deferred-state-0"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  if (!stateRaw) throw new Error('Data listing tidak ditemukan (struktur halaman Airbnb mungkin berubah)');
  const state = JSON.parse(stateRaw);
  const pdp = state.niobeClientData[0][1].data.presentation.stayProductDetailPage.sections;
  const sharing = pdp.metadata.sharingConfig;

  // Contoh sharing.title: "Villa in Ubud · ★4.8 · 3 bedrooms · 3 beds · 3 baths"
  const num = (re) => Number(sharing.title.match(re)?.[1] || 0);
  const bedrooms = num(/(\d+) bedrooms?/);
  const beds = num(/(\d+) beds?\b/);
  const bathrooms = num(/([\d.]+) (?:private |shared )?baths?/);

  // Daftar foto dari section PHOTO_TOUR_SCROLLABLE
  const photoSection = pdp.sections.find((s) => s.sectionComponentType === 'PHOTO_TOUR_SCROLLABLE')?.section;
  const photos = (photoSection?.mediaItems || [])
    .filter((m) => m.baseUrl)
    .map((m) => ({ url: m.baseUrl, caption: m.accessibilityLabel || '' }));

  // Rating per kategori (Cleanliness, Accuracy, Check-in, Communication, Location, Value)
  const catMatch = stateRaw.match(/"categoryRatings":(\[[^\]]*\])/);
  const categoryRatings = catMatch ? JSON.parse(catMatch[1]) : [];
  const ratingsBreakdown = {};
  const keyMap = { CLEANLINESS: 'cleanliness', ACCURACY: 'accuracy', CHECKIN: 'checkIn', COMMUNICATION: 'communication', LOCATION: 'location', VALUE: 'value' };
  for (const c of categoryRatings) {
    if (keyMap[c.categoryType]) ratingsBreakdown[keyMap[c.categoryType]] = Number(c.localizedRating);
  }

  // Status "Guest favorite" milik Airbnb
  const isGuestFavorite = /"isGuestFavorite":true/.test(stateRaw);

  return {
    apiKey, name, location, bedrooms, beds, bathrooms,
    guests: sharing.personCapacity,
    rating: sharing.starRating,
    reviewsCount: sharing.reviewCount,
    isGuestFavorite,
    ratingsBreakdown,
    photos
  };
}

// ---------------------------------------------------------------------------
// LANGKAH 2: Semua review via GraphQL Airbnb (per halaman 24 review)
// ---------------------------------------------------------------------------

/** Mengambil satu halaman review mulai dari `offset` */
async function fetchReviewPage(airbnbId, apiKey, offset) {
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

  const res = await fetch(url, { headers: { 'User-Agent': UA, 'X-Airbnb-API-Key': apiKey, 'Content-Type': 'application/json' } });
  const json = await res.json();
  return json?.data?.presentation?.stayProductDetailPage?.reviews?.reviews || [];
}

/** Mengulang fetchReviewPage sampai semua review terambil */
async function fetchAllReviews(airbnbId, apiKey, expected) {
  const all = [];
  for (let offset = 0; offset < Math.max(expected, 24) + 24; offset += 24) {
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

async function main() {
  const result = [];

  for (const { slug, airbnbId } of LISTINGS) {
    console.log(`\n▶ ${slug} (${airbnbId})`);
    const listing = await fetchListing(airbnbId);
    console.log(`  ${listing.name} · ★${listing.rating} · ${listing.reviewsCount} reviews · ${listing.photos.length} foto`);

    // --- Unduh foto villa ---
    const images = [];
    const photoCaptions = [];
    for (const [i, p] of listing.photos.slice(0, MAX_PHOTOS).entries()) {
      const file = `photo-${String(i + 1).padStart(2, '0')}.jpg`;
      // Catatan: CDN Airbnb hanya menerima lebar tertentu (240/480/720/960/1200/1440)
      await downloadFile(sized(p.url, i === 0 ? 1440 : 960), path.join(PUBLIC_DIR, slug, 'photos', file));
      images.push(`/airbnb/${slug}/photos/${file}`);
      photoCaptions.push(p.caption);
    }
    console.log(`  ✓ ${images.length} foto villa diunduh`);

    // --- Ambil & rapikan review ---
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
        } catch { /* foto gagal diunduh → pakai inisial */ }
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
        reviewerInfo: r.localizedReviewerLocation || '', // contoh: "4 years on Airbnb" atau "Sydney, Australia"
        comment: (translated || r.comments || '').replace(/<br\s*\/?>/g, '\n'),
        originalComment: translated ? r.comments : null,
        translationNote: translated ? r.localizedReview.disclaimer : null,
        hostResponse: (r.localizedReview?.response || r.response || null)
      });
    }
    console.log(`  ✓ ${reviews.length} review diambil`);

    result.push({
      id: slug,
      airbnbId,
      airbnbUrl: `https://www.airbnb.com/rooms/${airbnbId}`,
      name: listing.name,
      location: listing.location,
      guests: listing.guests,
      bedroomsCount: listing.bedrooms,
      beds: listing.beds,
      bathrooms: listing.bathrooms,
      rating: listing.rating,
      reviewsCount: listing.reviewsCount,
      isGuestFavorite: listing.isGuestFavorite,
      ratingsBreakdown: listing.ratingsBreakdown,
      images,
      photoCaptions,
      reviews
    });
    await sleep(1000);
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  console.log(`\n✅ Selesai! Data disimpan ke ${path.relative(ROOT, OUTPUT_JSON)}`);
}

main().catch((err) => {
  console.error('❌ Import gagal:', err.message);
  process.exit(1);
});
