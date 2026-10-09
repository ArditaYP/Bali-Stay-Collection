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
    price: 310, // Patokan menengah (USD / malam)
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
    price: 495, // Patokan menengah (USD / malam)
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
    price: 420, // Patokan menengah (USD / malam)
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
    name: 'Villa Habitas – 4BR Pererenan Pool Villa · Walk to Cafes & Bars',
    category: 'Premium',
    price: 380,
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#B8C5BD',
    bookedDays: [10, 11, 22, 23],
    address: 'Pererenan, Canggu, Badung, Bali',
    location: 'Canggu',
    shortDesc: 'Wake up unhurried. Stroll to a favourite café, linger over dinner, then wander home to your own private pool. This 4-bedroom Pererenan villa sleeps 8, with a king bed in every room, a lagoon-style pool, and a warm local team on hand. Trendy cafés, restaurants and bars are within walking distance, and Canggu centre is a short ride away. Easy, unhurried Bali.',
    description: 'Villa Habitas is a private 4-bedroom villa in Pererenan, built for slow mornings and easy evenings. Trendy cafés, restaurants and bars are within walking distance, and Canggu centre is a short ride away.',
    fullDesc: `Villa Habitas is a private 4-bedroom villa in Pererenan, built for slow mornings and easy evenings.

LIVING & DINING
Open-plan living and dining area with comfortable lounge seating, air conditioning, and smart TV.

POOL & OUTDOOR
A private lagoon-style swimming pool surrounded by a manicured tropical garden and sun deck with loungers.

KITCHEN
Fully equipped modern kitchen with induction stove, oven, full-size refrigerator, and espresso coffee machine.

BEDROOMS & BATHROOMS
Four tranquil bedrooms, each featuring a king-size bed, premium linens, air conditioning, and private en-suite bathroom.

WORK & CONNECTIVITY
Dedicated workspace with high-speed fiber-optic WiFi (200 Mbps) suitable for remote work, video calls, and streaming.

EXTRAS
Safety deposit boxes, fresh bath towels, and pool towels provided.

GUEST ACCESS
You'll have the whole villa to yourselves, including the private pool and garden. Free parking on the property fits up to 2 cars plus scooters.

YOUR LOCAL TEAM
What guests remember most isn't just the villa, it's the people. Our local team keeps the villa fresh with daily cleaning, and is happy to help arrange a driver, a massage, or a table at the right restaurant (extra services are on request, at additional cost). You'll feel looked after, not managed. A concierge is available through WhatsApp / messaging during your stay.

TRAVELLING WITH FAMILY
Travelling with little ones? Walkable cafés and restaurants mean fewer car rides. A nanny service and a pool fence are available on request through our concierge, so just let us know before you arrive (baby cot / high chair available upon request).

THE NEIGHBOURHOOD
Pererenan is the quieter, more local-feeling neighbour of Canggu. Trendy cafés, restaurants and bars are within walking distance. Pererenan Beach and Canggu centre are a short drive away (Echo Beach, 5 min ride).

OTHER THINGS TO NOTE
• Check-in from 14:00 PM and check-out by 12:00 PM.
• Minimum stay: 2 nights.
• Pets friendly.
• Pool safety: children must be supervised around the pool at all times.
• Cancellation policy: Cut off date 21 Days (Free cancellation up to 21 days before check-in).`,
    amenities: ['Private pool', 'Jungle view', 'River valley view', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Free parking'],
    bedrooms: [
      { name: 'Bedroom 1', detail: 'King bed · En-suite bathroom' },
      { name: 'Bedroom 2', detail: 'King bed · En-suite bathroom' },
      { name: 'Bedroom 3', detail: 'King bed · En-suite bathroom' },
      { name: 'Bedroom 4', detail: 'King bed · En-suite bathroom' }
    ]
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
  'villa-habitas': {
    name: 'Villa Habitas – 4BR Designer Villa In Pererenan',
    category: 'Premium',
    price: 380,
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#B8C5BD',
    bookedDays: [10, 11, 22, 23],
    address: 'Pererenan, Canggu, Badung, Bali',
    location: 'Pererenan',
    shortDesc: 'Wake up unhurried. Stroll to a favourite café, linger over dinner, then wander home to your own private pool. This 4-bedroom Pererenan villa sleeps 8 with king beds in every room and a dedicated local team.',
    description: 'Villa Habitas is a private 4-bedroom villa in Pererenan, built for slow mornings and easy evenings. Trendy cafés, restaurants and bars are within walking distance, and Canggu centre is a short ride away.',
    amenities: ['Private pool', 'Jungle view', 'River valley view', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Free parking'],
    bedrooms: [
      { name: 'Bedroom 1', detail: 'King bed · En-suite bathroom' },
      { name: 'Bedroom 2', detail: 'King bed · En-suite bathroom' },
      { name: 'Bedroom 3', detail: 'King bed · En-suite bathroom' },
      { name: 'Bedroom 4', detail: 'King bed · En-suite bathroom' }
    ]
  },
  'tranquil-sanctuary-pererenan': {
    name: 'Tranquil 1BR Sanctuary in Prime Pererenan!',
    category: 'Standard',
    price: 165,
    cleaningFee: 25,
    freeCancel: true,
    cardBg: '#CBB9C9',
    bookedDays: [4, 5, 18, 19],
    address: 'Pererenan, Badung, Bali',
    location: 'Pererenan',
    shortDesc: 'An intimate 1-bedroom sanctuary in prime Pererenan, ideal for couples seeking peaceful luxury.',
    description: 'Tranquil 1BR Sanctuary is tucked in a peaceful lane in prime Pererenan. Featuring minimalist aesthetic design, private plunge pool, lush tropical garden, and seamless indoor-outdoor living moments away from artisan cafés.',
    amenities: ['Private pool', 'High-speed WiFi', 'Air conditioning', 'Kitchenette', 'Daily housekeeping', 'Free parking']
  },
  'tropical-canggu-villa': {
    name: 'Modern Tropical 4BR Villa in Central Canggu',
    category: 'Deluxe',
    price: 390,
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#D8C9A8',
    bookedDays: [7, 8, 20, 21],
    address: 'Central Canggu, Badung, Bali',
    location: 'Canggu',
    shortDesc: 'A spacious 4-bedroom modern tropical villa in central Canggu, perfect for groups and families.',
    description: 'Located right in the heart of Canggu, this modern tropical villa offers a sparkling central swimming pool, open-concept lounge, generous sundeck, and luxurious air-conditioned bedrooms with en-suite bathrooms.',
    amenities: ['Private pool', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Daily housekeeping', 'Free parking']
  },
  'luxe-beach-villa-seminyak': {
    name: 'Luxe & Stylish 3BR Villa Just Steps from the Beach',
    category: 'Deluxe',
    price: 320,
    cleaningFee: 40,
    freeCancel: true,
    cardBg: '#D5B8A8',
    bookedDays: [9, 10, 22, 23],
    address: 'Seminyak Beach, Badung, Bali',
    location: 'Seminyak',
    shortDesc: 'A stylish 3-bedroom villa just steps from Seminyak Beach with private pool and chic dining.',
    description: 'Luxe & Stylish 3BR Villa is an elegant oasis steps away from Seminyak’s golden sands and famous beach clubs. Designed with contemporary tropical flair, open-air living pavilion, and sun-drenched private pool.',
    amenities: ['Private pool', 'Near the beach', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Free parking']
  },
  'tropical-elegance-seseh': {
    name: 'Tropical Elegance 2BR Villa – Steps from the Beach',
    category: 'Deluxe',
    price: 245,
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#B8C9B2',
    bookedDays: [3, 4, 15, 16],
    address: 'Seseh Beach, Badung, Bali',
    location: 'Seseh',
    shortDesc: 'A peaceful 2-bedroom haven steps from Seseh Beach with serene pool and ocean breezes.',
    description: 'Experience the authentic, tranquil charm of coastal Bali at Tropical Elegance. Nestled in the quiet coastal village of Seseh, just moments from black sand beaches and scenic coastal paths.',
    amenities: ['Private pool', 'Ocean breeze', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Daily housekeeping']
  },
  'yellow-moon-uluwatu': {
    name: 'Yellow Moon, A Tropical 3BR Sanctuary in Uluwatu',
    category: 'Premium',
    price: 365,
    cleaningFee: 50,
    freeCancel: true,
    cardBg: '#9FB7C7',
    bookedDays: [6, 7, 24, 25],
    address: 'Uluwatu, Badung, Bali',
    location: 'Uluwatu & Bukit',
    shortDesc: 'A tropical 3-bedroom sanctuary perched in Uluwatu, combining clifftop breezes and warm island design.',
    description: 'Yellow Moon is an architecturally striking 3-bedroom sanctuary in Uluwatu. Features expansive timber pool deck, lush garden, sunken outdoor lounge, and proximity to iconic surf spots.',
    amenities: ['Private pool', 'Ocean breeze', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Free parking']
  },
  'casa-kaya-bingin': {
    name: 'CASA KĀYA – Tropical 1BR Villa Near Bingin Beaches',
    category: 'Standard',
    price: 175,
    cleaningFee: 25,
    freeCancel: true,
    cardBg: '#D5E2EA',
    bookedDays: [2, 3, 16, 17],
    address: 'Bingin Beach, Uluwatu, Badung, Bali',
    location: 'Uluwatu & Bukit',
    shortDesc: 'A romantic 1-bedroom tropical villa near Bingin Beach with private pool and Mediterranean touches.',
    description: 'CASA KĀYA is a boutique 1-bedroom tropical villa near the shores of Bingin Beach. Perfect for couples, featuring curved archways, private plunge pool, and serene outdoor lounging.',
    amenities: ['Private pool', 'High-speed WiFi', 'Air conditioning', 'Kitchenette', 'Near the beach', 'Free parking']
  },
  'luxury-tropical-bingin': {
    name: 'Luxury 3BR Tropical Villa in Uluwatu • Near Beach',
    category: 'Premium',
    price: 350,
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#A9B9C9',
    bookedDays: [8, 9, 21, 22],
    address: 'Bingin Beach, Uluwatu, Badung, Bali',
    location: 'Uluwatu & Bukit',
    shortDesc: 'A luxury 3-bedroom tropical villa in Bingin near pristine beaches and sunset cliffs.',
    description: 'Set in one of Bali’s most sought-after cliffside enclaves, this 3-bedroom villa offers open-plan luxury living, private pool surrounded by frangipani trees, and easy access to Bingin’s turquoise surf.',
    amenities: ['Private pool', 'Ocean view nearby', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Free parking']
  },
  'chic-tropical-bingin': {
    name: '2BR Chic Tropical Villa • Minutes to Bingin Beaches',
    category: 'Deluxe',
    price: 265,
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#C5D3DC',
    bookedDays: [5, 6, 19, 20],
    address: 'Bingin Beach, Uluwatu, Badung, Bali',
    location: 'Uluwatu & Bukit',
    shortDesc: 'A chic 2-bedroom tropical villa minutes from Bingin Beach, designed for effortless island living.',
    description: 'This 2-bedroom chic tropical villa combines polished concrete, warm timber, and lush landscaping. Features sun-soaked pool deck and breezy open living pavilion.',
    amenities: ['Private pool', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Daily housekeeping', 'Free parking']
  },
  'five-bedroom-designer-umalas': {
    name: 'Five Bedroom Designer Villa next to Berawa',
    category: 'Luxury',
    price: 580,
    cleaningFee: 65,
    freeCancel: true,
    cardBg: '#DFD3C3',
    bookedDays: [11, 12, 27, 28],
    address: 'Umalas, Badung, Bali',
    location: 'Umalas & Seminyak',
    shortDesc: 'An expansive 5-bedroom designer villa next to Berawa with massive pool and dedicated staff.',
    description: 'A masterpiece of contemporary architecture on the border of Umalas and Berawa. Features five opulent master suites, private 18-meter swimming pool, sunken lounge, manicured lawn, and dedicated villa concierge.',
    amenities: ['Private pool', 'Dedicated staff', 'Chef on request', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Free parking']
  },
  'villa-imala': {
    name: 'Exclusive 6BR Uluwatu Villa with Gym & Ocean View',
    category: 'Luxury',
    price: 720,
    cleaningFee: 80,
    freeCancel: true,
    cardBg: '#9FB7C7',
    bookedDays: [8, 9, 21, 22],
    address: 'Uluwatu, Badung, Bali',
    location: 'Uluwatu & Bukit',
    shortDesc: 'Ultra-luxury 6-bedroom ocean-view villa in Uluwatu with 80m² pool, panoramic fitness gym, and in-villa spa.',
    description: 'Welcome to Villa Imala, a spectacular 6-bedroom luxury private villa in Uluwatu offering ocean views, expansive living spaces, 80m² pool, panoramic glass-walled gym, and private spa room minutes from Savaya and Melasti Beach.',
    amenities: ['Private pool', 'Ocean view', 'Gym & fitness', 'Private spa room', 'Villa manager', 'Chef on request', 'Daily housekeeping', 'High-speed WiFi', 'Free parking']
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
 * @returns {Array<{ name: string, detail: string }>} Daftar objek spesifikasi tiap kamar tidur
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
    name: d.name || a.name,
    location: d.location || a.location,
    address: d.address || `${a.location}, Bali`,
    beds: d.beds || a.bedroomsCount,
    guests: d.guests || a.guests,
    bathrooms: d.bathrooms || a.bathrooms,
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
    description: a.description || d.description || '',
    shortDesc: a.shortDesc || d.shortDesc || '',
    fullDesc: a.fullDesc || d.fullDesc || '',
    descriptionSections: a.descriptionSections || null,
    host: DEFAULT_HOST,
    img: a.images?.[0] || '',
    images: a.images,
    photoCaptions: a.photoCaptions || [],
    features: DEFAULT_FEATURES,
    amenities: d.amenities || [],
    bedrooms: d.bedrooms || buildBedrooms(a.bedroomsCount),
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
    image: '/destinations/ubud.jpg?v=20261008c',
    objectPosition: 'center 50%',
    bg: '#C7CDBB'
  },
  {
    name: 'Canggu',
    count: '2 villas',
    image: '/destinations/canggu.jpg?v=20261008',
    objectPosition: 'center 72%',
    bg: '#CBC3A8'
  },
  {
    name: 'Uluwatu',
    count: '2 villas',
    image: '/destinations/uluwatu.jpg?v=20261008',
    objectPosition: 'center 50%',
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
 * Format angka numerik ke format mata uang USD ($) atau IDR (Rp) secara dinamis
 * @param {number|string} amount - Jumlah nominal angka yang akan diformat
 * @param {string} [currency] - Pilihan mata uang ('USD' atau 'IDR', opsional)
 * @returns {string} String harga terformat (contoh: "$152" atau "Rp 2.432.000")
 */
export function formatUSD(amount, currency) {
  const activeCurrency = currency || (typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('bsc_currency') : 'USD') || 'USD';
  const num = Number(amount || 0);
  if (activeCurrency === 'IDR') {
    const idr = Math.round((num * 16000) / 1000) * 1000;
    return `Rp ${idr.toLocaleString('id-ID')}`;
  }
  return `$${num.toLocaleString('en-US')}`;
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

/**
 * Memeriksa apakah suatu rentang tanggal menginap (Check-in sampai Check-out) tersedia
 * atau bertabrakan dengan tanggal-tanggal yang sudah di-booking tamu lain (bookedDays).
 * Setiap malam menginap (dari tanggal check-in sampai sebelum check-out) tidak boleh berada pada tanggal booked.
 * 
 * @param {string} checkInStr - Tanggal check-in dalam format YYYY-MM-DD
 * @param {string} checkOutStr - Tanggal check-out dalam format YYYY-MM-DD
 * @param {number[]} bookedDays - Daftar angka hari dalam bulan yang sudah terisi (booked)
 * @returns {{ isAvailable: boolean, conflictDays: number[], message: string }} Objek status ketersediaan dan daftar tanggal yang bentrok
 */
export function checkDateRangeAvailability(checkInStr, checkOutStr, bookedDays = []) {
  if (!checkInStr || !checkOutStr) {
    return { isAvailable: false, conflictDays: [], message: 'Pilih tanggal check-in dan check-out.' };
  }

  const startDate = new Date(checkInStr);
  const endDate = new Date(checkOutStr);

  if (endDate <= startDate) {
    return { isAvailable: false, conflictDays: [], message: 'Tanggal check-out harus setelah tanggal check-in.' };
  }

  // Iterasi setiap malam menginap dari tanggal checkIn sampai sebelum checkOut
  const conflictDays = [];
  const cur = new Date(startDate);

  while (cur < endDate) {
    const dayNum = cur.getDate();
    if (bookedDays.includes(dayNum) && !conflictDays.includes(dayNum)) {
      conflictDays.push(dayNum);
    }
    cur.setDate(cur.getDate() + 1);
  }

  if (conflictDays.length > 0) {
    return {
      isAvailable: false,
      conflictDays,
      message: `Tanggal ${conflictDays.sort((a, b) => a - b).join(', ')} sudah terisi (booked). Silakan pilih tanggal lain yang masih kosong.`
    };
  }

  return { isAvailable: true, conflictDays: [], message: '' };
}
