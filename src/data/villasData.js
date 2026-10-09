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
  'house-terra': {
    category: 'Luxury',
    price: 550, // Patokan menengah (USD / malam)
    cleaningFee: 50,
    freeCancel: true,
    cardBg: '#CBB9C9',
    bookedDays: [4, 5, 18, 19],
    address: 'Pererenan, Canggu, Badung, Bali',
    shortDesc: 'Bayangkan melangkah masuk ke dalam mahakarya arsitektur tropis Biombo di mana kemewahan modern melebur sempurna dengan alam Pererenan. Dilengkapi 5 kamar tidur mewah, piano klasik, kolam renang luas, dan lounge outdoor, nikmati privasi eksklusif tanpa cela.',
    description: 'Bayangkan melangkah masuk ke dalam mahakarya arsitektur tropis Biombo di mana kemewahan modern melebur sempurna dengan alam Pererenan. Dilengkapi 5 kamar tidur mewah, piano klasik, kolam renang luas, dan lounge outdoor, nikmati privasi eksklusif tanpa cela.',
    amenities: ['Private pool', 'Dedicated staff', 'Chef on request', 'Villa manager', 'Air conditioning', 'High-speed WiFi']
  },

  'st-lau-ubud': {
    category: 'Honeymoon',
    price: 310, // Patokan menengah (USD / malam)
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#CBB9C9',
    bookedDays: [3, 4, 21, 22],
    address: 'Ubud, Gianyar, Bali',
    shortDesc: 'Biarkan ketenangan hutan tropis Ubud memeluk seluruh panca indera Anda. Dengan dek kolam renang privat yang menghadap rerimbunan hijau dan sentuhan arsitektur khas Bali, villa 3 kamar ini adalah tempat di mana pikiran Anda menemukan kedamaian mutlak.',
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
    shortDesc: 'Tataplah cakrawala Samudra Hindia yang membentang tanpa batas tepat di depan mata Anda. Bertengger megah di atas tebing kapur Balangan, estate 5 kamar tidur ini menyuguhkan kemegahan matahari terbenam spektakuler dan akses pantai eksklusif yang tak terlupakan.',
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
    shortDesc: 'Rasakan sensasi melayang di atas kanopi lembah Sungai Ayung dari infinity pool spektakuler villa 5 kamar ini. Udara pegunungan Ubud yang sejuk dan suara alam yang menenteramkan akan memulihkan energi tubuh dan jiwa Anda secara menyeluruh.',
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
    shortDesc: 'Rasakan ritme santai pesisir Canggu dalam pelukan kemewahan bohemian tropis. Kolam renang privat yang asri dan kamar tidur yang luas siap menyambut kepulangan Anda setelah menikmati sunset di pantai.',
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
    shortDesc: 'Bayangkan bangun setiap pagi disambut pemandangan sawah hijau zamrud dan berenang di laguna pribadi yang menenangkan jiwa. Hanya beberapa langkah santai menuju kafe artisan terbaik Pererenan, surga 4 kamar ini menghadirkan ketenangan mutlak dengan sentuhan pelayanan bintang lima.',
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
    shortDesc: 'Temukan oase ketenangan di tengah kawasan paling bergengsi Seminyak. Mandi berendam di bathtub batu alam outdoor di bawah langit berbintang dan nikmati kemewahan privasi di pusat denyut kuliner Bali.',
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
    shortDesc: 'Ciptakan momen romantis paling berkesan dalam hidup Anda di sanctuary bulan madu privat ini. Dikelilingi taman tropis yang rimbun dan suasana intim, cinta Anda akan mekar lebih indah di Seminyak.',
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
    shortDesc: 'Biarkan pesona lautan biru lepas Uluwatu menghipnotis hari-hari Anda. Duduklah di tepi infinity pool saat matahari perlahan tenggelam, dan nikmati kemewahan hakiki yang hanya dimiliki segelintir orang di dunia.',
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
    shortDesc: 'Bayangkan bangun setiap pagi disambut pemandangan sawah hijau zamrud dan berenang di laguna pribadi yang menenangkan jiwa. Hanya beberapa langkah santai menuju kafe artisan terbaik Pererenan, surga 4 kamar ini menghadirkan ketenangan mutlak dengan sentuhan pelayanan bintang lima.',
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
    shortDesc: 'Rasakan kehangatan sinar matahari pagi yang menembus celah dedaunan tropis saat Anda menikmati kopi di tepi plunge pool pribadi. Sanctuary 1 kamar intim ini dirancang khusus untuk pasangan yang mendambakan privasi tanpa batas dan kedamaian sejati.',
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
    shortDesc: 'Biarkan diri Anda tenggelam dalam pesona hidup tropis modern di jantung Canggu. Paviliun terbuka yang lapang, kolam renang berkilau, dan 4 kamar tidur mewah menanti Anda dan orang-orang tercinta untuk merayakan momen berharga bersama.',
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
    shortDesc: 'Dengarkan bisikan deburan ombak pantai Seminyak yang hanya sepelemparan batu dari pintu villa Anda. Perpaduan desain pesisir kontemporer dan kenyamanan mewah yang memastikan liburan tropis Anda terasa istimewa sejak detik pertama.',
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
    shortDesc: 'Hirup segarnya angin laut yang berhembus lembut melintasi teras terbuka villa 2 kamar yang elegan ini. Tersembunyi di desa pesisir Seseh yang asri, nikmati kemewahan ruang privat di mana waktu seakan melambat hanya untuk Anda.',
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
    shortDesc: 'Tenggelamkan diri Anda di sunken lounge luar ruangan seraya menikmati semilir angin perbukitan Uluwatu. Desain kayu hangat, kolam renang yang mengundang, dan pelayanan tulus staf kami akan membuat Anda jatuh cinta sejak hari pertama.',
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
    shortDesc: 'Temukan pelarian romantis berdesain Mediterania tropis yang memesona di tebing Bingin. Lengkungan arsitektur yang anggun dan kolam renang privat menciptakan suasana intim yang sempurna bagi Anda berdua untuk merajut kenangan manis.',
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
    shortDesc: 'Bayangkan bersantai di tepi kolam yang teduh dinaungi pepohonan palem setelah seharian menikmati pantai Bingin. Villa 3 kamar tidur mewah ini memberikan kenyamanan paripurna bagi keluarga atau sahabat yang menginginkan relaksasi tingkat tinggi.',
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
    shortDesc: 'Rasakan harmoni antara semen ekspos modern yang elegan dan kehangatan kayu alami di oase 2 kamar tidur ini. Pelayanan manajer villa yang penuh dedikasi memastikan setiap keinginan Anda terpenuhi bahkan sebelum Anda memintanya.',
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
    shortDesc: 'Ketika ukuran dan privasi menjadi prioritas tertinggi Anda, mahakarya arsitektur 5 kamar tidur di perbatasan Umalas dan Berawa ini siap memukau rombongan besar Anda dengan kolam renang 18 meter dan layanan concierge berkelas.',
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
    shortDesc: 'Kemewahan tanpa batas menanti Anda di estate 6 kamar prestisius ini. Mulai hari Anda dengan sesi kebugaran di gym berdinding kaca panorama samudra, manjakan diri di ruang spa privat, dan saksikan senja keemasan dari kolam renang 80m² Anda.',
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
    shortDesc: 'Rasakan keselarasan sejati dengan alam di mahakarya arsitektur bambu ramah lingkungan yang melayang di atas lembah Sungai Ayung. Hirup kesegaran udara Ubud dan temukan kembali kedamaian batin Anda yang paling murni.',
    description: 'Experience true harmony with nature at Mandapa Jungle Villa, an architectural wonder crafted entirely from sustainably harvested bamboo. Perched on Ubud’s famous Sayan Ridge, this open-concept sanctuary offers sweeping views of emerald jungle canopies and the murmuring Ayung River below.',
    amenities: ['Private pool', 'Jungle view', 'River valley view', 'High-speed WiFi', 'Full kitchen', 'Air conditioning', 'Free parking']
  },
  'villa-mahina': {
    category: 'Luxe',
    price: 380,
    cleaningFee: 40,
    freeCancel: true,
    cardBg: '#2C3539',
    bookedDays: [8, 9, 15, 16],
    address: 'Berawa Beach, Canggu, Badung, Bali',
    shortDesc: 'Nikmati kemewahan berada di pusat gaya hidup Berawa tanpa mengorbankan ketenangan tidur Anda. Dilengkapi jendela kedap suara total, sunken lounge elegan, dan kolam renang privat, villa 3 kamar ini adalah santuari modern terbaik Anda.',
    description: 'Escape to Villa Mahina, in one of Canggu’s most sought-after locations. Just 400m from Berawa Beach and minutes from Finns Beach Club, this stylish 3-bedroom villa sits in a private residence, offering peace and privacy while being close to Canggu’s best restaurants, cafés, and nightlife.',
    amenities: ['Private pool', 'Sunken lounge', 'Walk to beach (400m)', 'Double-glazed soundproof windows', 'Air conditioning', 'High-speed WiFi', 'Full kitchen', 'Daily housekeeping']
  },
  'khaleela-villas': {
    category: 'Standard',
    price: 195,
    cleaningFee: 25,
    freeCancel: true,
    cardBg: '#C4A482',
    bookedDays: [3, 4, 18, 19],
    address: 'Canggu, Badung, Bali',
    shortDesc: 'Biarkan diri Anda terhanyut dalam kehangatan nuansa gurun pasir yang eksotis di jantung Canggu. Nikmati kesegaran berenang di bawah sinar mentari tropis dan sensasi mandi terbuka bernuansa spa alami yang merelaksasi setiap jengkal tubuh Anda.',
    description: 'Discover Khaleela Villas, a desert-inspired oasis in vibrant Canggu. Its unique charm captivates with immersive desert vibes. This single-story haven boasts two cozy bedrooms for a serene retreat. Lounge by the refreshing pool, basked in sunlight.',
    amenities: ['Private pool', 'Desert-inspired architecture', 'Outdoor tropical shower', 'Full kitchen', 'Air conditioning', 'High-speed WiFi', 'Daily housekeeping', 'Dedicated team']
  },
  'beyond-the-palms': {
    category: 'Luxe',
    price: 720,
    cleaningFee: 50,
    freeCancel: true,
    cardBg: '#1F2937',
    bookedDays: [10, 11, 24, 25],
    address: 'Canggu, Badung, Bali',
    shortDesc: 'Rasakan masa depan liburan mewah di mana kecanggihan teknologi berpadu dengan kemegahan tropis. Bersantailah di rooftop jacuzzi, nikmati bioskop proyektor luar ruangan, dan dengarkan alunan musik jernih dari sistem suara Sonos di seluruh sudut villa.',
    description: 'Welcome to Beyond the Palms! This luxurious, high-tech 4-bedroom villa is perfect for anyone who wants a truly unforgettable Bali experience. Features 45sqm pool, massive garden, rooftop jacuzzi, Sonos sound system, and SMEG kitchen.',
    amenities: ['Private pool (45m²)', 'Rooftop jacuzzi', 'Yoga deck', 'Sonos sound system', '86" 4K Smart TV', 'SMEG kitchen', 'Outdoor cinema projector', 'Private BBQ grill']
  },
  'villa-akar': {
    category: 'Luxe',
    price: 490,
    cleaningFee: 45,
    freeCancel: true,
    cardBg: '#3A352F',
    bookedDays: [5, 6, 21, 22],
    address: 'Berawa, Canggu, Badung, Bali',
    shortDesc: 'Masuki mahakarya desain kontemporer berpredikat Guest Favorite bintang 5.0 di Berawa. Fleksibilitas ruang keluarga ber-AC yang dapat dibuka menyatu dengan kolam renang asri memberikan kebebasan dan kenyamanan tak tertandingi bagi seluruh keluarga.',
    description: 'Discover Villa Akar, a contemporary four-bedroom villa set in one of Berawa’s most desirable pockets. Features unbeatable location near the beach, modern living spaces filled with natural light, and a dedicated hospitality team.',
    amenities: ['Private pool', 'Guest Favorite 5.0 rating', 'Flexible enclosed/open living', 'Designer architecture by Teduh', 'En-suite master suites', 'High-speed WiFi', 'Daily housekeeping']
  },
  'villa-golden': {
    category: 'Deluxe',
    price: 230,
    cleaningFee: 25,
    freeCancel: true,
    cardBg: '#8C704B',
    bookedDays: [12, 13, 27, 28],
    address: 'Berawa, Canggu, Badung, Bali',
    shortDesc: 'Kemudahan akses gaya hidup premium Berawa berada tepat di depan pintu Anda. Berada persis di seberang FINNS Recreation Club, villa 2 kamar modern chic ini menyuguhkan interior menawan dan kolam renang privat yang memanjakan liburan Anda.',
    description: 'Nestled in the vibrant Berawa neighborhood, Villa Golden offers a luxurious retreat for discerning travelers. Beautiful design and architecture, located directly opposite FINNS recreation club, few meters from top cafes.',
    amenities: ['Private pool', 'Opposite FINNS Recreation Club', 'Modern chic interior', 'Both en-suite bedrooms', 'Fully equipped kitchen', 'Air conditioning', 'Daily housekeeping']
  },
  'villa-surga': {
    category: 'Retreat',
    price: 320,
    cleaningFee: 35,
    freeCancel: true,
    cardBg: '#2F4F4F',
    bookedDays: [7, 8, 22, 23],
    address: 'Ubud, Gianyar, Bali',
    shortDesc: 'Sesuai namanya, temukan serpihan surga tersembunyi di kawasan asri Ubud. Infinity pool pribadi yang menghadap lembah tropis rimbun dan keramahan staf lokal kami akan mengantarkan Anda pada dimensi relaksasi yang belum pernah Anda rasakan sebelumnya.',
    description: 'Welcome to Villa Surga, a private 4-bedroom villa tucked into the lush surroundings of Ubud — ideal for families and groups seeking space, comfort, and a peaceful tropical setting close to Bali’s cultural heart.',
    amenities: ['Private infinity pool', 'Traditional Balinese entrance', 'Lush tropical valley view', 'Full villa staffing', 'All en-suite bathrooms', 'Spacious open living', 'Daily housekeeping']
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
