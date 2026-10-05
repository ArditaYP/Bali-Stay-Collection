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
    address: 'Balangan Beach, Uluwatu, Badung, Bali',
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
  },
  'villa-samudra-canggu': {
    category: 'Deluxe',
    price: 280,
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#CBC3A8',
    bookedDays: [5, 6, 17, 18],
    address: 'Echo Beach, Canggu, Badung, Bali',
    shortDesc: 'A boho-chic 3-bedroom sanctuary steps from Echo Beach with private pool and sun deck.',
    description: 'Villa Samudra blends breezy Mediterranean bohemian aesthetics with traditional Balinese artisanal craftsmanship. Located just 5 minutes from Echo Beach in Canggu, this sanctuary features high-vaulted ceilings, an open-concept living pavilion, custom rattan furnishings, and a turquoise swimming pool framed by swaying palms.',
    amenities: ['Private pool', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Daily housekeeping', 'Near the beach', 'Free parking']
  },
  'the-palms-villa-canggu': {
    category: 'Premium',
    price: 350,
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#B8C5BD',
    bookedDays: [10, 11, 22, 23],
    address: 'Batu Bolong, Canggu, Badung, Bali',
    shortDesc: 'A stunning minimalist 4-bedroom villa with sunken lounge and lap pool in prime Canggu.',
    description: 'The Palms Villa is an architectural masterpiece situated in Canggu’s vibrant Batu Bolong precinct. Designed with clean geometric lines, polished concrete, and natural teak elements, the property centers around an elongated lap pool and sunken outdoor lounge with fully enclosed air-conditioned living spaces.',
    amenities: ['Private pool', 'Sunken lounge', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Dedicated workspace', 'Free parking']
  },
  'villa-kayu-raja-seminyak': {
    category: 'Deluxe',
    price: 320,
    cleaningFee: 40,
    freeCancel: true,
    cardBg: '#CBB9C9',
    bookedDays: [7, 8, 19, 20],
    address: 'Petitenget, Seminyak, Badung, Bali',
    shortDesc: 'A refined 3-bedroom pool villa within walking distance of Seminyak’s world-class dining.',
    description: 'Tucked away in the prestigious Petitenget quarter of Seminyak, Villa Kayu Raja is a tranquil haven moments away from renowned beach clubs and culinary hotspots. The villa features lush tropical courtyard gardens, a sparkling central pool with sun loungers, and luxuriously appointed master suites with en-suite terrazzo bathtubs.',
    amenities: ['Private pool', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Daily housekeeping', 'Near the beach', 'Free parking']
  },
  'villa-cendana-seminyak': {
    category: 'Honeymoon',
    price: 230,
    cleaningFee: 30,
    freeCancel: true,
    cardBg: '#DFD3C3',
    bookedDays: [2, 3, 14, 15],
    address: 'Kayu Aya, Seminyak, Badung, Bali',
    shortDesc: 'An intimate 2-bedroom romantic retreat with private plunge pool and garden bathroom.',
    description: 'Designed specifically for romantic getaways and honeymoon couples, Villa Cendana is an intimate haven nestled along Seminyak’s quiet lanes. Wake up to breakfast served by the plunge pool, unwind in the semi-open garden bathroom featuring a stone soaking tub, and enjoy serene tropical evenings in secluded privacy.',
    amenities: ['Private pool', 'Romantic outdoor bathtub', 'Air conditioning', 'High-speed WiFi', 'Full kitchen', 'Daily housekeeping', 'Free parking']
  },
  'cliffside-panorama-uluwatu': {
    category: 'Premium',
    price: 540,
    cleaningFee: 55,
    freeCancel: true,
    cardBg: '#A9B9C9',
    bookedDays: [12, 13, 26, 27],
    address: 'Bingin Beach, Uluwatu, Badung, Bali',
    shortDesc: 'An ultra-luxurious 4-bedroom cliff villa overlooking Bingin Beach and the Indian Ocean.',
    description: 'Perched commandingly on the limestone cliffs of Uluwatu, Cliffside Panorama offers front-row views of world-famous surf breaks and sunset vistas across the Indian Ocean. An infinity pool seemingly merges with the azure horizon, flanked by expansive timber sun decks and contemporary minimalist suites.',
    amenities: ['Infinity pool', 'Ocean view', 'Private chef on request', 'Air conditioning', 'High-speed WiFi', 'Free parking', 'Daily housekeeping']
  },
  'mandapa-jungle-villa': {
    category: 'Standard',
    price: 290,
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#C7CDBB',
    bookedDays: [4, 5, 20, 21],
    address: 'Sayan Ridge, Ubud, Gianyar, Bali',
    shortDesc: 'A breathtaking 2-bedroom bamboo architectural villa suspended over the Ayung River valley.',
    description: 'Experience true harmony with nature at Mandapa Jungle Villa, an architectural wonder crafted entirely from sustainably harvested bamboo. Perched on Ubud’s famous Sayan Ridge, this open-concept sanctuary offers sweeping views of emerald jungle canopies and the murmuring Ayung River below.',
    amenities: ['Private pool', 'Jungle view', 'River valley view', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Free parking']
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
 * Destinasi populer di Bali dengan gambar lanskap berkualitas tinggi,
 * jumlah koleksi villa, dan warna dasar identitas destinasi.
 */
export const POPULAR_DESTINATIONS = [
  {
    name: 'Ubud',
    count: '3 villas',
    image: '/destinations/ubud.jpg',
    bg: '#C7CDBB'
  },
  {
    name: 'Balangan Beach',
    count: '1 villa',
    image: '/destinations/balangan.jpg',
    bg: '#B9CBC9'
  },
  {
    name: 'Canggu',
    count: '2 villas',
    image: '/destinations/canggu.jpg',
    bg: '#CBC3A8'
  },
  {
    name: 'Seminyak',
    count: '2 villas',
    image: '/destinations/seminyak.jpg',
    bg: '#CBB9C9'
  },
  {
    name: 'Uluwatu',
    count: '1 villa',
    image: '/destinations/uluwatu.jpg',
    bg: '#A9B9C9'
  }
];

/**
 * Daftar ikon kategori resmi Airbnb yang diadopsi dari proyek Vista.
 * Hanya 6 kategori utama yang aktif: Beach, Trending, Luxe, Amazing View, Pool, WOW!
 * Kategori lainnya dinonaktifkan sementara (dikomentari) dan siap diaktifkan kembali jika diperlukan.
 */
export const AIRBNB_CATEGORIES = [
  { id: 'beach', name: 'Beach', icon: '/categories/beach.jpg' },
  { id: 'trending', name: 'Trending', icon: '/categories/trending.jpg' },
  // { id: 'beachfront', name: 'Beachfront', icon: '/categories/beachfront.jpg' },
  // { id: 'earthhome', name: 'Earth Home', icon: '/categories/earthhome.jpg' },
  { id: 'luxe', name: 'Luxe', icon: '/categories/luxe.jpg' },
  { id: 'amazingView', name: 'Amazing View', icon: '/categories/amazingView.jpg' },
  // { id: 'design', name: 'Design', icon: '/categories/design.jpg' },
  { id: 'pool', name: 'Pool', icon: '/categories/pool.jpg' },
  // { id: 'tiny', name: 'Tiny Home', icon: '/categories/tiny.jpg' },
  // { id: 'historic', name: 'Historic Home', icon: '/categories/historic.jpg' },
  // { id: 'countryside', name: 'Countryside', icon: '/categories/countryside.jpg' },
  { id: 'omg', name: 'WOW!', icon: '/categories/omg.jpg' },
  // { id: 'surfing', name: 'Surfing', icon: '/categories/surfing.jpg' }
];

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
