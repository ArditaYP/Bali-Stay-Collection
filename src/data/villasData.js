/**
 * villasData.js
 * Kumpulan data master villa Bali dan fungsi-fungsi pembantu (helpers).
 *
 * Data villa terdiri dari 2 sumber:
 *  1. airbnbVillas.json  → hasil import otomatis dari Airbnb (nama, foto, rating, review tamu).
 *     Dibuat oleh script: `node scripts/import-airbnb.mjs`. JANGAN diedit manual.
 *  2. VILLA_DETAILS (di bawah) → data yang kita isi sendiri (harga, deskripsi, fasilitas, dll.).
 */
import AIRBNB_VILLAS from './airbnbVillas.json';

/** Host default untuk semua villa */
const DEFAULT_HOST = {
  name: 'Bali Stay Collection',
  tagline: 'Entire villa hosted by Bali Stay Collection',
  initials: 'BSC',
  isVerified: true
};

/** Keunggulan booking langsung (sama untuk semua villa) */
const DEFAULT_FEATURES = [
  { title: 'Free reschedule', desc: 'Change your dates for free up to 7 days before check-in.' },
  { title: 'Secure deposit', desc: 'Your payment is held safely until check-in is confirmed.' },
  { title: 'Dedicated local team', desc: 'Managed directly by our staff — not a third-party agency.' }
];

/**
 * Data manual per villa (key = id/slug yang sama dengan di airbnbVillas.json).
 * Silakan ubah harga, deskripsi, dan fasilitas di sini sesuai kondisi asli villa.
 */
const VILLA_DETAILS = {
  'st-lau-ubud': {
    category: 'Honeymoon',
    price: 220, // TODO: sesuaikan harga asli per malam (USD)
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#CBB9C9',
    bookedDays: [3, 4, 21, 22],
    address: 'Ubud, Gianyar, Bali',
    shortDesc: 'A signature 3-bedroom hideaway in Ubud with a private pool and lush tropical surroundings.',
    description: 'St. Lau is a private 3-bedroom sanctuary tucked away in Ubud. Open-plan living spaces flow onto a private pool deck surrounded by tropical greenery, with every bedroom designed as a calm retreat after a day exploring Ubud’s rice terraces, cafés and temples.',
    amenities: ['Private pool', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Free parking', 'Daily housekeeping']
  },
  'iconic-cliff-top-villa': {
    category: 'Premium',
    price: 450, // TODO: sesuaikan harga asli per malam (USD)
    cleaningFee: 50,
    freeCancel: true,
    cardBg: '#B9CBC9',
    bookedDays: [6, 7, 23, 24],
    address: 'Balangan Beach, Badung, Bali',
    shortDesc: 'An iconic 5-bedroom cliff-top villa with a sweeping 180° view of the Indian Ocean.',
    description: 'Perched on the cliffs above Balangan Beach, this 5-bedroom villa opens onto an uninterrupted 180° ocean panorama. Spacious indoor-outdoor living, a pool facing the horizon and sunset views every evening make it ideal for families and groups of friends.',
    amenities: ['Private pool', 'Ocean view', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Free parking', 'Daily housekeeping']
  },
  'angkasa-ubud': {
    category: 'Premium',
    price: 380, // TODO: sesuaikan harga asli per malam (USD)
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#C7CDBB',
    bookedDays: [8, 9, 25, 26],
    address: 'Ubud, Gianyar, Bali',
    shortDesc: 'A 5-bedroom Ubud villa with an infinity pool overlooking the jungle valley.',
    description: 'Angkasa is a 5-bedroom villa in Ubud built around an infinity pool that seems to float above the surrounding jungle. Generous living and dining areas, a fully equipped kitchen and panoramic views make it a perfect base for larger groups.',
    amenities: ['Infinity pool', 'Jungle view', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Free parking', 'Daily housekeeping']
  }
};

/**
 * Membuat daftar kamar tidur sederhana berdasarkan jumlah kamar dari Airbnb.
 * @param {number} count - Jumlah kamar tidur
 */
function buildBedrooms(count) {
  return Array.from({ length: count || 1 }, (_, i) => ({
    name: `Bedroom ${i + 1}`,
    detail: i === 0 ? 'Master bedroom · en-suite bathroom' : 'Comfortable bed · en-suite bathroom'
  }));
}

/**
 * Daftar villa final: gabungan data Airbnb + data manual.
 * Struktur objeknya tetap sama seperti sebelumnya supaya semua komponen lain tetap jalan.
 */
export const INITIAL_VILLAS = AIRBNB_VILLAS.map((a) => {
  const d = VILLA_DETAILS[a.id] || {};
  return {
    id: a.id,
    airbnbUrl: a.airbnbUrl,
    name: a.name,
    location: a.location,
    address: d.address || `${a.location}, Bali`,
    beds: a.bedroomsCount,
    guests: a.guests,
    bathrooms: a.bathrooms,
    category: d.category || 'Premium',
    price: d.price || 200,
    cleaningFee: d.cleaningFee || 35,
    rating: a.rating,
    reviewsCount: a.reviewsCount,
    // Label "Guest Favorite" ditampilkan untuk villa favorit Airbnb atau rating tinggi
    isGuestFavorite: a.isGuestFavorite || a.rating >= 4.8,
    freeCancel: d.freeCancel ?? true,
    cardBg: d.cardBg || '#CBC3A8',
    bookedDays: d.bookedDays || [],
    description: d.description || '',
    shortDesc: d.shortDesc || '',
    host: DEFAULT_HOST,
    images: a.images,
    photoCaptions: a.photoCaptions || [],
    features: DEFAULT_FEATURES,
    amenities: d.amenities || [],
    bedrooms: buildBedrooms(a.bedroomsCount),
    ratingsBreakdown: a.ratingsBreakdown,
    reviews: a.reviews
  };
});

/**
 * Destinasi populer dihitung otomatis dari lokasi villa yang ada,
 * supaya setiap kartu destinasi pasti punya villa saat diklik.
 */
export const POPULAR_DESTINATIONS = Object.values(
  INITIAL_VILLAS.reduce((acc, v) => {
    acc[v.location] ||= { name: v.location, total: 0, bg: v.cardBg };
    acc[v.location].total += 1;
    return acc;
  }, {})
).map((d) => ({ name: d.name, count: `${d.total} villa${d.total > 1 ? 's' : ''}`, bg: d.bg }));

/**
 * Format angka numerik ke format mata uang Dollar USD ($)
 * @param {number} amount - Jumlah nominal angka yang akan diformat
 * @returns {string} String harga dalam format $XXX (contoh: "$152")
 */
export function formatUSD(amount) {
  return `$${Number(amount || 0).toLocaleString('en-US')}`;
}

/**
 * Menghitung selisih jumlah malam antara tanggal Check-in dan Check-out
 * @param {string} checkInDate - Tanggal check-in dalam format YYYY-MM-DD
 * @param {string} checkOutDate - Tanggal check-out dalam format YYYY-MM-DD
 * @returns {number} Jumlah malam menginap (minimal bernilai 1 jika input valid)
 */
export function calculateNights(checkInDate, checkOutDate) {
  if (!checkInDate || !checkOutDate) return 0;
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Menghasilkan tanggal default untuk Check-in dan Check-out (misal +7 hari dan +13 hari)
 * @param {number} addDaysFromNow - Jumlah hari tambahan dari hari ini
 * @returns {string} Tanggal dalam format YYYY-MM-DD
 */
export function getDefaultDate(addDaysFromNow = 0) {
  const d = new Date();
  d.setDate(d.getDate() + addDaysFromNow);
  return d.toISOString().split('T')[0];
}
