/**
 * bscVillasData.js
 * Basis data resmi 51 villa dan konfigurasi halaman utama Bali Stay Collection
 * diambil langsung dari berkas desain resmi bsc-frontpage_1.html.
 * 
 * Dilengkapi dengan 4 villa utama yang memiliki foto asli Airbnb, harga per malam,
 * ulasan tamu terverifikasi, dan integrasi halaman detail interaktif:
 * 1. Villa Habitas (Pererenan)
 * 2. St. Lau (Ubud)
 * 3. Balangan Cliff Villa / Iconic Cliff Top (Uluwatu & Bukit)
 * 4. Villa Angkasa (Ubud)
 */

export const CONFIG = {
  idrRate: 16000,
  whatsapp: '628123456789',
  defaultNights: 6,
  startInDays: 14,
  videoEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
};

/**
 * Daftar 13 ID villa yang berasal langsung dari tautan listing Airbnb
 * (termasuk 4 villa awal: Habitas, Balangan, St. Lau, Angkasa + 9 villa baru)
 */
export const AIRBNB_ONLY_VILLA_IDS = [
  "st-lau-ubud",
  "iconic-cliff-top-villa",
  "angkasa-ubud",
  "villa-habitas",
  "tranquil-sanctuary-pererenan",
  "tropical-canggu-villa",
  "luxe-beach-villa-seminyak",
  "tropical-elegance-seseh",
  "yellow-moon-uluwatu",
  "casa-kaya-bingin",
  "luxury-tropical-bingin",
  "chic-tropical-bingin",
  "five-bedroom-designer-umalas",
  "villa-imala",
  "villa-mahina",
  "khaleela-villas",
  "beyond-the-palms",
  "villa-akar",
  "villa-golden",
  "villa-surga",
  "house-terra",
  "magnificent-canggu-estate",
  "designer-beachside-canggu",
  "villa-daun-by-teduh",
  "cala-blanca",
  "the-bull-house",
  "berawa-breeze",
  "coco-bay",
  "villa-milana",
  "beachside-haven-canggu",
  "wellness-estate-canggu",
  "villa-aless",
  "alua-loft",
  "villa-satiya",
  "villa-infinity-umalas"
];

/**
 * Daftar ID villa aktif dengan data autentik Airbnb
 * (13 villa baru hasil import link Airbnb + 5 villa kurasi dari website sebelumnya).
 * Disusun berurutan sehingga 13 villa baru berada di urutan awal untuk kemudahan pengecekan.
 */
export const ACTIVE_AIRBNB_VILLA_IDS = [...AIRBNB_ONLY_VILLA_IDS];

export const TIERS_INFO = {
  Standard: {
    name: 'Standard',
    badge: 'Standard',
    desc: 'Clean, comfortable, good value. Simple design, essentials covered.',
    forTrip: 'Good for couples and small groups',
    features: ['Private pool in every villa', 'Daily housekeeping', 'On-call local host', 'Clean & well-kept']
  },
  Deluxe: {
    name: 'Deluxe',
    badge: 'Deluxe',
    desc: 'Stylish and well equipped, in a good location, with some service.',
    forTrip: 'Good for friends and families',
    features: ['Architectural design touches', 'Quality bed linens & pool towels', 'High-speed WiFi', 'Prime neighbourhood']
  },
  Premium: {
    name: 'Premium',
    badge: 'Premium',
    desc: 'Designer villas, larger pools, stronger service and notable extras.',
    forTrip: 'Good for groups who want more',
    features: ['High-end finish & spacious layout', 'Staff on site', 'Chef service on request', 'Dedicated villa concierge']
  },
  Luxury: {
    name: 'Luxury',
    badge: 'Luxury',
    desc: 'Architect-level design, signature pools, dedicated staff, standout setting.',
    forTrip: 'Good for celebrations and special trips',
    features: ['Signature clifftop or jungle settings', 'Full dedicated private staff', 'Personal villa manager', 'Complete privacy']
  }
};

export const PALETTE = {
  'Pererenan': ['#CBB9C9', '#E9DCE6'],
  'Canggu & Berawa': ['#D8C9A8', '#EFE6CF'],
  'Ubud': ['#C7CDBB', '#E2E7D6'],
  'Uluwatu & Bukit': ['#9FB7C7', '#D5E2EA'],
  'Umalas & Seminyak': ['#D5B8A8', '#EFDCD2'],
  'Seseh': ['#B8C9B2', '#DCE8D6']
};

export const DESTINATIONS_SUMMARY = [
  {
    name: 'Pererenan',
    count: 6,
    badge: 'Chill & Surf',
    layout: 'norm',
    description: 'Quieter neighbour to Canggu with artisan cafés, local lanes, and easy beach breaks.',
    tone: ['#CBB9C9', '#E9DCE6'],
    image: '/destinations/pererenan.jpg',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Canggu & Berawa',
    count: 14,
    badge: '★ Most Popular Hub',
    layout: 'wide',
    description: 'Cafés, iconic beach clubs, and legendary surf breaks. The most vibrant epicenter of coastal Bali.',
    tone: ['#D8C9A8', '#EFE6CF'],
    image: '/destinations/canggu.jpg?v=20261008',
    objectPosition: 'center 72%',
    fallback: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Uluwatu & Bukit',
    count: 6,
    badge: 'Clifftops & Sunsets',
    layout: 'norm',
    description: 'Dramatic ocean limestone cliffs, world-class surf, and sunset beach clubs.',
    tone: ['#9FB7C7', '#D5E2EA'],
    image: '/destinations/uluwatu.jpg?v=20261008',
    objectPosition: 'center 50%',
    fallback: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Umalas & Seminyak',
    count: 5,
    badge: 'Dining & Boutiques',
    layout: 'norm',
    description: 'World-class dining and chic designer boutiques tucked between rice paddies.',
    tone: ['#D5B8A8', '#EFDCD2'],
    image: '/destinations/seminyak.jpg',
    fallback: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Seseh',
    count: 1,
    badge: '✦ Hidden Gem',
    layout: 'norm',
    description: 'Untouched black-sand coastal village, peaceful lanes, and authentic Balinese tranquility just minutes from Canggu.',
    tone: ['#B8C9B2', '#DCE8D6'],
    image: '/destinations/seseh.jpg?v=20261008',
    objectPosition: 'center 50%',
    fallback: 'https://images.unsplash.com/photo-1559628233-eb1b1a45564b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Ubud',
    count: 3,
    badge: 'Cultural Sanctuary',
    layout: 'full',
    description: 'Lush rainforest valleys, emerald rice terraces, and tranquil highland mornings.',
    tone: ['#C7CDBB', '#E2E7D6'],
    image: '/destinations/ubud.jpg?v=20261008c',
    objectPosition: 'center 50%',
    fallback: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=85'
  }
];

export const FAQS_DATA = [
  {
    q: 'Why are there no star ratings yet?',
    a: 'We are a new brand and only show reviews from verified BSC guests. Until they come in, every villa shows our inspection notes and the date it was last checked.'
  },
  {
    q: 'Is the price shown the final price?',
    a: 'The total shown includes taxes, daily cleaning, and local service. Anything extra, like airport transfers or a private chef dinner, is quoted separately before you pay.'
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Each villa shows its policy on the card and on the villa page. We offer free reschedule up to 7 days before check-in on selected verified villas.'
  },
  {
    q: 'How do I pay, and is it secure?',
    a: 'We accept credit card and direct bank transfer with safe escrow processing. You receive a written booking confirmation immediately after payment.'
  },
  {
    q: 'Who do I contact during my stay?',
    a: 'Our on-call local team in Bali. You receive their direct contact details and WhatsApp concierge access upon booking confirmation.'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Ketut Wiratama',
    role: 'Founder & Villa Manager',
    initials: 'KW'
  },
  {
    name: 'Wayan Ardi',
    role: 'Guest Relations',
    initials: 'WA'
  },
  {
    name: 'Ni Luh Made',
    role: 'Operations & Housekeeping',
    initials: 'NL'
  },
  {
    name: 'Gede Suartana',
    role: 'Villa Inspector',
    initials: 'GS'
  }
];

export const BSC_VILLAS = [
  {
    "id": "angkasa-ubud",
    "name": "Villa Angkasa – Majestic 5BR Rainforest Infinity Villa Suspended Over Ayung Valley",
    "area": "Ubud",
    "beds": 5,
    "guests": 10,
    "baths": 5.5,
    "price": 420,
    "priceIdr": 6720000,
    "rating": 4.74,
    "reviews": 23,
    "badge": "Guest Favorite",
    "matchScore": 98,
    "img": "/airbnb/angkasa-ubud/photos/photo-01.jpg",
    "desc": "Rasakan sensasi melayang anggun di atas kanopi lembah Sungai Ayung. Dari air infinity pool yang berkilau jernih hingga sejuknya udara pegunungan Ubud, setiap tarikan napas di villa 5 kamar ini mengalirkan energi kesegaran baru yang memulihkan raga dan menyejukkan batin.",
    "why": "Ulasan Tamu Terbaik (Anthony, 5.0★): 'Villa di Ubud ini luar biasa memukau dan sempurna untuk rombongan kami. Dikelilingi atmosfer alami yang begitu damai, bersih tanpa cela, dan ruang kolam renang yang tak terlupakan.' — Terverifikasi fisik 100% oleh tim BSC untuk liburan kelompok prestisius.",
    "amenities": [
      "Private pool",
      "High-speed WiFi",
      "Air conditioning",
      "Daily housekeeping"
    ]
  },
  {
    "id": "iconic-cliff-top-villa",
    "name": "Balangan Cliff Villa – Iconic Cliff-Edge Oceanfront Estate with Endless Indian Ocean Sunsets",
    "area": "Uluwatu & Bukit",
    "beds": 5,
    "guests": 10,
    "baths": 4.5,
    "price": 495,
    "priceIdr": 7920000,
    "rating": 4.42,
    "reviews": 24,
    "badge": "Guest Favorite",
    "matchScore": 98,
    "img": "/airbnb/iconic-cliff-top-villa/photos/photo-01.jpg",
    "desc": "Tataplah cakrawala Samudra Hindia yang membentang tanpa batas tepat di depan mata Anda. Bertengger megah di atas tebing kapur Balangan, rasakan desau angin laut yang menyegarkan dan saksikan langit senja berubah menjadi lukisan emas lembayung dari tepi infinity pool privat Anda.",
    "why": "Ulasan Tamu Terbaik (Masuda, 5.0★): 'Tempat ini jauh lebih indah daripada yang tampak di foto—bertengger persis di tepi tebing laksana resor paling privat. Desainnya sangat elegan dan stafnya luar biasa membantu.' — Pilihan utama BSC untuk panorama laut lepas dan sunset Samudra Hindia tanpa tanding.",
    "amenities": [
      "Private pool",
      "High-speed WiFi",
      "Air conditioning",
      "Daily housekeeping"
    ]
  },
  {
    "id": "st-lau-ubud",
    "name": "St. Lau – Timeless Jungle Sanctuary Where Ubud's Peace Restores Your Soul",
    "area": "Ubud",
    "beds": 3,
    "guests": 8,
    "baths": 3,
    "price": 310,
    "priceIdr": 4960000,
    "rating": 4.8,
    "reviews": 46,
    "badge": "Guest Favorite",
    "matchScore": 98,
    "img": "/airbnb/st-lau-ubud/photos/photo-01.jpg",
    "desc": "Tutup mata Anda sejenak dan dengarkan bisikan lembut angin hutan Ubud yang menenteramkan. Begitu Anda melangkah ke dek kayu privat, sejuknya air kolam renang dan rimbunnya dedaunan tropis seketika melunturkan segala beban pikiran, membawa jiwa Anda pulang ke ketenangan sejati.",
    "why": "Ulasan Tamu Terbaik (Andreea, 5.0★): 'Villa ini persis seperti di foto—sangat bersih, indah, dan sempurna dalam segala hal. St. Lau adalah pelarian sempurna dari hiruk-pikuk dunia nyata dengan ketenangan yang luar biasa.' — Terverifikasi fisik 100% oleh Bali Stay Collection untuk privasi hutan tropis sejati.",
    "amenities": [
      "Private pool",
      "High-speed WiFi",
      "Air conditioning",
      "Daily housekeeping"
    ]
  },
  {
    "id": "villa-habitas",
    "name": "Villa Habitas – Serene 4BR Lagoon Pool Sanctuary Tucked in Quiet Pererenan",
    "area": "Pererenan",
    "beds": 4,
    "baths": 5,
    "guests": 8,
    "price": 380,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Rice-field view",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Walk to cafés"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/villa-habitas/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Charlotte, 5.0★): 'Villa ini luar biasa—lokasinya sempurna, dekat dengan restoran dan spa, sangat nyaman bahkan untuk berjalan kaki bersama balita, dan stafnya sangat menyenangkan.' — Rekomendasi BSC untuk kenyamanan keluarga di pusat Pererenan.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Langkahkan kaki Anda ke dalam oase laguna privat yang damai di Pererenan. Dikelilingi taman tropis rimbun dan gemercik air kolam yang bening, nikmati keheningan desa pesisir yang menenangkan hanya beberapa langkah santai dari deretan kafe artisan terbaik.",
    "know": [
      "Walkable to trendy cafes and restaurants in Pererenan.",
      "A nanny service and pool fence are available on request through our concierge.",
      "Free parking fits up to 2 cars plus scooters."
    ],
    "aliasId": "villa-habitas",
    "rating": 5,
    "reviews": 2,
    "priceIdr": 6080000
  },
  {
    "id": "tranquil-sanctuary-pererenan",
    "name": "Tranquil Sanctuary – Romantic 1BR Private Haven Where Intimacy Meets Coastal Calm",
    "area": "Pererenan",
    "beds": 1,
    "baths": 2,
    "guests": 2,
    "price": 165,
    "tier": "Standard",
    "trips": [
      "Couples",
      "Honeymoon",
      "Quiet retreat"
    ],
    "setting": [
      "Garden setting",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "High-speed WiFi",
      "Kitchenette",
      "Daily housekeeping"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/tranquil-sanctuary-pererenan/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Alyshia, 5.0★): 'Kami benar-benar jatuh cinta pada tempat ini! Sangat privat, bersih setiap hari, dan lokasinya dekat kafe menawan. Ukuran yang sempurna untuk pasangan.' — Pilihan terfavorit BSC untuk liburan romantis dan bulan madu intim.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Bayangkan bangun di pagi hari disambut cahaya lembut yang menerobos tirai tipis, melangkah langsung ke tepian kolam renang privat berdua bersama orang tercinta. Sanctuary 1 kamar tidur ini adalah tempat di mana romansa mekar indah dalam privasi mutlak.",
    "know": [
      "Located in a tranquil lane with minimal traffic.",
      "Walking distance to top Pererenan cafés and bakeries."
    ],
    "rating": 4.89,
    "reviews": 38,
    "priceIdr": 2640000
  },
  {
    "id": "tropical-canggu-villa",
    "name": "Casa Kameeyla – Sun-Drenched 4BR Family Paradise in the Vibrant Heart of Canggu",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 390,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Village setting",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Full kitchen",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/tropical-canggu-villa/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Benn, 5.0★): 'Villa ramah keluarga yang indah dengan desain luar biasa terang dan lapang. Kolam renangnya sangat istimewa dan tim staf membuat segalanya begitu mudah.' — Pilihan unggulan BSC untuk liburan keluarga berkelas di Canggu.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Rasakan kehangatan mentari Canggu menyinari ruang tamu terbuka yang lapang dan kolam renang biru kristal. Tempat di mana canda tawa keluarga berpadu sempurna dengan desain tropis modern, hanya hitungan menit dari kafe hits dan pantai selancar ternama.",
    "know": [
      "Moments from Canggu's best dining and beach clubs.",
      "Spacious living pavilion perfect for groups."
    ],
    "rating": 4.93,
    "reviews": 72,
    "priceIdr": 6240000
  },
  {
    "id": "luxe-beach-villa-seminyak",
    "name": "Luxe Beach Villa – Architectural 3BR Coastal Hideaway Steps from Seminyak Waves",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 320,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Beach lovers",
      "Family"
    ],
    "setting": [
      "Walk to the beach",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Near the beach",
      "Full kitchen",
      "Air conditioning"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/luxe-beach-villa-seminyak/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Pingping, 5.0★): 'Estetika villa ini luar biasa memukau sejak pandangan pertama. Suasana liburannya begitu kental, kolamnya jernih, dan privasinya mutlak terjaga.' — Rekomendasi BSC untuk pencinta desain arsitektur dan gaya hidup Seminyak.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Dengarkan bisikan deburan ombak Seminyak yang berpadu dengan kemewahan desain atap menjulang dan sunken sofa eksklusif. Langkah kaki Anda hanya beberapa detik dari butik kelas dunia dan restoran legendaris, namun di dalam terasa begitu hening dan privat.",
    "know": [
      "Steps from Seminyak Beach and famous beach clubs.",
      "Open-air tropical living area with private pool."
    ],
    "rating": 4.81,
    "reviews": 58,
    "priceIdr": 5120000
  },
  {
    "id": "tropical-elegance-seseh",
    "name": "Tropical Elegance – Breezy 2BR Ocean-Air Haven Soothing with Gentle Water Sounds",
    "area": "Seseh",
    "beds": 2,
    "baths": 3,
    "guests": 4,
    "price": 245,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Quiet retreat",
      "Friends group"
    ],
    "setting": [
      "Coastal village",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#B8C9B2",
      "#DCE8D6"
    ],
    "img": "/airbnb/tropical-elegance-seseh/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Lovella, 5.0★): 'Dari saat kami melangkah masuk, kami langsung merasakan kenyamanan dan kemewahan sejati. Suara gemericik air kolamnya sangat menenangkan dan suasananya begitu damai.' — Pilihan tersembunyi BSC di pesisir autentik Seseh.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Hirup segarnya angin laut yang berhembus lembut dari Pantai Seseh. Nikmati gemericik riak air kolam renang privat yang menenangkan pikiran dan pencahayaan malam yang hangat memikat di perkampungan pesisir Bali yang masih alami dan damai.",
    "know": [
      "Nestled in peaceful Seseh, free from heavy traffic.",
      "Short stroll to black-sand coastline and coastal walks."
    ],
    "rating": 4.98,
    "reviews": 43,
    "priceIdr": 3920000
  },
  {
    "id": "yellow-moon-uluwatu",
    "name": "Yellow Moon – Sun-Kissed 3BR Clifftop Oasis Designed for Effortless Family Moments",
    "area": "Uluwatu & Bukit",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 365,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Surf & Sunsets",
      "Family"
    ],
    "setting": [
      "Hillside breezes",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Ocean breeze",
      "Full kitchen",
      "High-speed WiFi"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/yellow-moon-uluwatu/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Nik, 5.0★): 'Villa ini SANGAT CANTIK untuk keluarga kami! Kolam renang luas dengan zona anak yang aman, kamar tidur nyaman, dan keramahan staf yang brilian.' — Pilihan keluarga nomor satu BSC di kawasan Uluwatu & Bukit.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Tenggelamkan diri Anda di dalam kemewahan sunken lounge berlimpah cahaya matahari Uluwatu. Kolam renang ekstra luas dengan area dangkal yang aman bagi si kecil, peralatan gym privat, dan kamar mandi utama berstandar spa menghadirkan liburan impian tanpa cela.",
    "know": [
      "Convenient access to top surf breaks in Uluwatu and Padang Padang.",
      "Sunken outdoor lounge beside the swimming pool."
    ],
    "rating": 4.8,
    "reviews": 50,
    "priceIdr": 5840000
  },
  {
    "id": "casa-kaya-bingin",
    "name": "CASA KĀYA – Bohemian 1BR Sunlight Retreat Crafted for Soulful Bingin Living",
    "area": "Uluwatu & Bukit",
    "beds": 1,
    "baths": 2,
    "guests": 2,
    "price": 175,
    "tier": "Standard",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Cliffside village",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "High-speed WiFi",
      "Kitchenette",
      "Air conditioning"
    ],
    "tone": [
      "#D5E2EA",
      "#9FB7C7"
    ],
    "img": "/airbnb/casa-kaya-bingin/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Holly, 5.0★): 'Villa indah yang bahkan tampak jauh lebih menawan secara langsung! Sangat nyaman, menangkap sinar matahari sepanjang hari, dan staf menyambut dengan penuh kehangatan.' — Suaka bohemian terbaik BSC di Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Temukan pelarian romantis berdesain Mediterania-Bohemian di tepi tebing Bingin. Pintu kaca geser yang terbuka lebar menyatukan ruang tidur dengan private pool yang bermandikan sinar matahari sepanjang hari—tempat sempurna untuk meremajakan jiwa.",
    "know": [
      "Minutes from Bingin Beach stairs and cafés.",
      "Minimalist Mediterranean-inspired architectural details."
    ],
    "rating": 4.88,
    "reviews": 31,
    "priceIdr": 2800000
  },
  {
    "id": "luxury-tropical-bingin",
    "name": "Luxury Tropical Bingin – Elegant 3BR Palm Villa with Sunken Lounge & Golden Sun",
    "area": "Uluwatu & Bukit",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 350,
    "tier": "Premium",
    "trips": [
      "Family",
      "Friends group"
    ],
    "setting": [
      "Walk to the beach",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Villa manager",
      "Full kitchen",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#A9B9C9",
      "#D5E2EA"
    ],
    "img": "/airbnb/luxury-tropical-bingin/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Rohit, 5.0★): 'Villa persis seperti di foto—bersih, luas, penuh gaya, dan sangat terawat. Suasana tropisnya sangat damai dan stafnya luar biasa responsif.' — Destinasi favorit BSC untuk grup teman dan keluarga di Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Bayangkan bersantai di sunken lounge tepi kolam yang teduh dinaungi lambaian pohon palem tropis. Kemewahan 3 kamar tidur yang bersih, bergaya, dan berjarak hanya hitungan menit dari deburan ombak pantai Bingin yang legendaris.",
    "know": [
      "Surrounded by tropical frangipani and palm trees.",
      "Easy access to Bingin and Padang Padang beaches."
    ],
    "rating": 4.76,
    "reviews": 37,
    "priceIdr": 5600000
  },
  {
    "id": "chic-tropical-bingin",
    "name": "Chic Tropical Bingin – Polished 2BR Concrete Oasis Radiating Coastal Sophistication",
    "area": "Uluwatu & Bukit",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 265,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Couples"
    ],
    "setting": [
      "Walk to the beach",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Full kitchen",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#C5D3DC",
      "#9FB7C7"
    ],
    "img": "/airbnb/chic-tropical-bingin/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Paul, 5.0★): 'Properti sangat baru, modern, bersih, dan dilengkapi dengan semua fasilitas kelas atas. Komunikasi tuan rumah sangat ramah dan responsif.' — Kurasi desain modern kontemporer terbaik BSC di Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Rasakan harmoni antara semen ekspos modern yang sejuk dengan kehangatan elemen kayu alami. Oase 2 kamar tidur yang baru dan fotogenik di Bingin, dirancang khusus bagi mereka yang menghargai ketenangan estetika dan kenyamanan kontemporer.",
    "know": [
      "Exceptional 4.97 rating across 30+ verified guest reviews.",
      "Minutes from Bingin surf breaks and sunset cliff spots."
    ],
    "rating": 4.97,
    "reviews": 30,
    "priceIdr": 4240000
  },
  {
    "id": "five-bedroom-designer-umalas",
    "name": "Umalas Estate – Grand 5BR Architectural Sanctuary Bordering Rice Fields & Berawa",
    "area": "Umalas & Seminyak",
    "beds": 5,
    "baths": 5,
    "guests": 9,
    "price": 580,
    "tier": "Luxury",
    "trips": [
      "Large group",
      "Celebration",
      "Family"
    ],
    "setting": [
      "Garden estate"
    ],
    "am": [
      "Private pool",
      "Dedicated staff",
      "Chef on request",
      "Villa manager",
      "Air conditioning"
    ],
    "tone": [
      "#DFD3C3",
      "#D5B8A8"
    ],
    "img": "/airbnb/five-bedroom-designer-umalas/photos/photo-01.jpg",
    "why": "Pilihan Eksklusif BSC (5.0★): 'Kemewahan skala resor pribadi dengan kolam renang 18 meter, arsitektur megah di perbatasan sawah Umalas, dan layanan staf berdedikasi tinggi tanpa kompromi.' — Properti baru paling prestisius dalam portofolio BSC.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Ketika ruang dan privasi menjadi prioritas tertinggi Anda. Mahakarya desainer 5 kamar tidur di Umalas ini menyuguhkan kolam renang sepanjang 18 meter, ruang keluarga beratap megah, dan ketenangan tepi persawahan hanya 5 menit dari pusat gaya hidup Berawa.",
    "know": [
      "Features large 18-meter swimming pool and manicured estate grounds.",
      "Prime location bridging quiet Umalas and vibrant Berawa."
    ],
    "rating": 4.9,
    "reviews": 10,
    "priceIdr": 9280000
  },
  {
    "id": "villa-imala",
    "name": "Villa Imala – Ultra-Luxury 6BR Clifftop Palace with Glass Gym & Sunset Ocean Panoramas",
    "area": "Uluwatu & Bukit",
    "beds": 6,
    "baths": 5,
    "guests": 12,
    "price": 720,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration",
      "Wellness retreat"
    ],
    "setting": [
      "Ocean view",
      "Cliff top"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities",
      "Villa manager"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/villa-imala/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Martina, 5.0★): 'Duduk di teras menikmati pemandangan laut saat matahari terbenam adalah momen magis yang tak terlupakan! Kolamnya fantastis dan layanannya luar biasa.' — Puncak kemewahan tebing Uluwatu dengan verifikasi fisik 100% BSC.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Kemewahan tanpa batas menanti Anda di estate 6 kamar tidur spektakuler Uluwatu ini. Kolam renang 80m², gym berkaca panorama samudra, ruang spa pribadi, dan dek matahari terbenam magis menyuguhkan standar hidup para sultan.",
    "know": [
      "80m² private swimming pool with sundeck and rooftop ocean-view daybeds.",
      "Dedicated private spa room and panoramic glass-wall fitness gym.",
      "Minutes away from Savaya Beach Club and Melasti Beach."
    ],
    "rating": 4.94,
    "reviews": 18,
    "priceIdr": 11520000
  },
  {
    "id": "villa-mahina",
    "name": "Villa Mahina – Contemporary 3BR Luxury Villa with Crystal Pool 400m from Berawa Beach",
    "tier": "Luxury",
    "price": 380,
    "cancel": "Moderate · Free cancel up to 14 days before check-in",
    "area": "Canggu & Berawa",
    "beds": 3,
    "baths": 2.5,
    "guests": 6,
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walk to the beach",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Near the beach",
      "Air conditioning",
      "High-speed WiFi",
      "Daily housekeeping"
    ],
    "pick": true,
    "tone": [
      "#2C3539",
      "#4A5D4E"
    ],
    "audit": 12,
    "updated": "October 2026",
    "desc": "Nikmati kemewahan berada di pusat gaya hidup premium Berawa tanpa mengorbankan ketenangan. Hanya 400 meter jalan santai ke Pantai Berawa dan Finns Beach Club, villa 3 kamar modern ini dilengkapi jendela kedap suara dan kolam renang privat yang jernih.",
    "img": "/airbnb/villa-mahina/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-mahina/photos/photo-01.jpg",
      "/airbnb/villa-mahina/photos/photo-02.jpg",
      "/airbnb/villa-mahina/photos/photo-03.jpg",
      "/airbnb/villa-mahina/photos/photo-04.jpg",
      "/airbnb/villa-mahina/photos/photo-05.jpg"
    ],
    "why": "Ulasan Tamu Terbaik (Alexander M., 5.0★): 'Pengalaman luar biasa di Villa Mahina! Lokasinya tak terkalahkan, hanya 400m ke pantai, kolam renangnya sangat jernih, dan di dalam sangat tenang serta privat.' — Pilihan strategis nomor satu BSC di Berawa.",
    "rating": 4.9,
    "reviews": 2,
    "priceIdr": 6080000
  },
  {
    "id": "khaleela-villas",
    "name": "Khaleela Villas – Desert-Chic 2BR Sunlit Oasis with Dreamy Curved Architecture",
    "tier": "Deluxe",
    "price": 195,
    "cancel": "Moderate · Free cancel up to 14 days before check-in",
    "area": "Canggu & Berawa",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "trips": [
      "Couples",
      "Honeymoon",
      "Friends group"
    ],
    "setting": [
      "Garden setting",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi",
      "Daily housekeeping"
    ],
    "pick": true,
    "tone": [
      "#C4A482",
      "#EED9C4"
    ],
    "audit": 12,
    "updated": "October 2026",
    "desc": "Biarkan diri Anda terhanyut dalam pesona estetika gurun eksotis berpadu lengkungan Mediterania di pusat Canggu. Villa 2 kamar tidur yang bermandikan cahaya, kolam renang privat sedalam 1,5 meter, dan kamar mandi semi-terbuka yang menawan hati.",
    "img": "/airbnb/khaleela-villas/photos/photo-01.jpg",
    "images": [
      "/airbnb/khaleela-villas/photos/photo-01.jpg",
      "/airbnb/khaleela-villas/photos/photo-02.jpg",
      "/airbnb/khaleela-villas/photos/photo-03.jpg",
      "/airbnb/khaleela-villas/photos/photo-04.jpg",
      "/airbnb/khaleela-villas/photos/photo-05.jpg"
    ],
    "why": "Ulasan Tamu Terbaik (Jie / 婕, 5.0★): 'Tempat aslinya bahkan jauh lebih menakjubkan dibanding fotonya! Semua orang terpukau sejak langkah pertama, kolamnya bersih berkilau, dan staf Dando sangat penuh perhatian.' — Rekomendasi BSC untuk estetika Instagramable tercantik di Canggu.",
    "rating": 4.88,
    "reviews": 72,
    "priceIdr": 3120000
  },
  {
    "id": "beyond-the-palms",
    "name": "Beyond the Palms – Smart 4BR High-Tech Villa with Rooftop Sunset Jacuzzi & Cinema",
    "tier": "Luxury",
    "price": 720,
    "cancel": "Moderate · Free cancel up to 14 days before check-in",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "trips": [
      "Friends group",
      "Celebration",
      "Family"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Wellness facilities",
      "Villa manager",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "pick": true,
    "tone": [
      "#1F2937",
      "#111827"
    ],
    "audit": 12,
    "updated": "October 2026",
    "desc": "Rasakan masa depan liburan mewah di mana teknologi pintar menyatu dengan kemegahan tropis. Dari rooftop jacuzzi berpemandangan matahari terbenam, sound system Sonos multi-ruang, hingga bioskop pribadi di bawah langit malam Canggu.",
    "img": "/airbnb/beyond-the-palms/photos/photo-01.jpg",
    "images": [
      "/airbnb/beyond-the-palms/photos/photo-01.jpg",
      "/airbnb/beyond-the-palms/photos/photo-02.jpg",
      "/airbnb/beyond-the-palms/photos/photo-03.jpg",
      "/airbnb/beyond-the-palms/photos/photo-04.jpg",
      "/airbnb/beyond-the-palms/photos/photo-05.jpg"
    ],
    "why": "Ulasan Tamu Terbaik (Samantha, 5.0★): 'Villa yang sangat modern, didesain dengan begitu indah, dan terawat tanpa cela. Kamar mandinya menawan dan fitur pintarnya luar biasa canggih.' — Pilihan teratas BSC untuk penggemar kemewahan teknologi tinggi di Canggu.",
    "rating": 4.88,
    "reviews": 68,
    "priceIdr": 11520000
  },
  {
    "id": "villa-akar",
    "name": "Villa Akar – Guest Favorite 4BR Architectural Gem Where Modern Luxury Embraces Nature",
    "tier": "Luxury",
    "price": 490,
    "cancel": "Moderate · Free cancel up to 14 days before check-in",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4.5,
    "guests": 8,
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Walk to the beach",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Villa manager",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "pick": true,
    "tone": [
      "#3A352F",
      "#5A5249"
    ],
    "audit": 12,
    "updated": "October 2026",
    "desc": "Masuki mahakarya desain kontemporer berpredikat Guest Favorite bintang 5.0 di Berawa. Menghadirkan ruang keluarga ber-AC yang fleksibel, kolam renang asri bernuansa zen, dan kehangatan interior kayu jati yang membuat Anda seketika merasa di rumah sendiri.",
    "img": "/airbnb/villa-akar/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-akar/photos/photo-01.jpg",
      "/airbnb/villa-akar/photos/photo-02.jpg",
      "/airbnb/villa-akar/photos/photo-03.jpg",
      "/airbnb/villa-akar/photos/photo-04.jpg",
      "/airbnb/villa-akar/photos/photo-05.jpg"
    ],
    "why": "Ulasan Tamu Terbaik (Akshay, 5.0★): 'Benar-benar melebihi segala ekspektasi kami! Interiornya memberi rasa hangat, sangat nyaman, dan berkelas tinggi. Tuan rumah luar biasa ramah dan perhatian.' — Predikat Guest Favorite 5.0 BSC untuk kenyamanan tanpa kompromi.",
    "rating": 5,
    "reviews": 17,
    "priceIdr": 7840000
  },
  {
    "id": "villa-golden",
    "name": "Villa Golden – Chic 2BR Private Sanctuary with Lush Palms Opposite FINNS Club",
    "tier": "Premium",
    "price": 230,
    "cancel": "Moderate · Free cancel up to 14 days before check-in",
    "area": "Canggu & Berawa",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "trips": [
      "Couples",
      "Friends group"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Air conditioning",
      "High-speed WiFi",
      "Daily housekeeping"
    ],
    "pick": true,
    "tone": [
      "#8C704B",
      "#B89B72"
    ],
    "audit": 12,
    "updated": "October 2026",
    "desc": "Kemudahan akses gaya hidup premium Berawa berada tepat di depan pintu Anda. Berada persis di seberang FINNS Recreation Club, villa 2 kamar modern chic ini menyuguhkan interior menawan, privasi rimbun pohon palem, dan kolam renang privat yang memanjakan liburan Anda.",
    "img": "/airbnb/villa-golden/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-golden/photos/photo-01.jpg",
      "/airbnb/villa-golden/photos/photo-02.jpg",
      "/airbnb/villa-golden/photos/photo-03.jpg",
      "/airbnb/villa-golden/photos/photo-04.jpg",
      "/airbnb/villa-golden/photos/photo-05.jpg"
    ],
    "why": "Ulasan Tamu Terbaik (Lexi, 5.0★): 'Persis seperti di foto, bahkan lebih cantik lagi! Kami sangat menyukai privasinya yang terjaga berkat pohon palem yang asri, kebersihan sempurna, dan lokasi luar biasa.' — Oase privat BSC di seberang FINNS Berawa.",
    "rating": 4.89,
    "reviews": 65,
    "priceIdr": 3680000
  },
  {
    "id": "villa-surga",
    "name": "Villa Surga – Serene 4BR Valley-View Hideaway Whispering Ubud's Purest Magic",
    "tier": "Premium",
    "price": 320,
    "cancel": "Moderate · Free cancel up to 14 days before check-in",
    "area": "Ubud",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "trips": [
      "Family",
      "Wellness retreat",
      "Friends group"
    ],
    "setting": [
      "Rice-field view"
    ],
    "am": [
      "Private pool",
      "Chef on request",
      "Wellness facilities",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "pick": true,
    "tone": [
      "#2F4F4F",
      "#3B6E59"
    ],
    "audit": 12,
    "updated": "October 2026",
    "desc": "Sesuai namanya, temukan serpihan surga tersembunyi di kawasan asri Ubud. Infinity pool pribadi yang menghadap lembah tropis rimbun dan keramahan staf lokal kami akan mengantarkan Anda pada dimensi relaksasi yang belum pernah Anda rasakan sebelumnya.",
    "img": "/airbnb/villa-surga/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-surga/photos/photo-01.jpg",
      "/airbnb/villa-surga/photos/photo-02.jpg",
      "/airbnb/villa-surga/photos/photo-03.jpg",
      "/airbnb/villa-surga/photos/photo-04.jpg",
      "/airbnb/villa-surga/photos/photo-05.jpg"
    ],
    "why": "Ulasan Tamu Terbaik (Natalie B., 5.0★): 'Rumah yang sangat indah dan kolam renang yang sempurna untuk berenang, berjemur, dan bersantai di tengah keindahan lembah Ubud. Tim staf mendedikasikan layanan luar biasa.' — Suaka alam terverifikasi BSC untuk ketenangan jiwa di Ubud.",
    "rating": 4.71,
    "reviews": 72,
    "priceIdr": 5120000
  },
  {
    "id": "house-terra",
    "name": "House Terra – Biombo Architectural Masterpiece: Grand 5BR Pool Estate in Pererenan",
    "area": "Pererenan",
    "beds": 5,
    "baths": 5,
    "guests": 10,
    "price": 480,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Garden setting",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Wellness facilities",
      "Villa manager",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/house-terra/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Yan, 5.0★): 'Rumah ini benar-benar persis seperti di foto—dibangun dengan sangat indah, sangat luas, dan super nyaman. Layanan private chef untuk makan malam di villa adalah yang terbaik di Bali!' — Mahakarya arsitektur Biombo pilihan utama BSC di Pererenan.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "Bayangkan melangkah masuk ke dalam mahakarya arsitektur tropis Biombo di mana kemewahan modern melebur sempurna dengan alam Pererenan. Dilengkapi 5 kamar tidur mewah, piano klasik, kolam renang luas, dan layanan chef pribadi, nikmati privasi eksklusif tanpa cela.",
    "know": [
      "Airbnb Guest Favorite: 5.0 from 17 reviews, with perfect scores for cleanliness, accuracy and check-in.",
      "Long tropical pool, sunken living lounge, BBQ lounge and a media room with piano.",
      "In-villa chef, massage, airport transfer and tours on request through the concierge."
    ],
    "images": [
      "/airbnb/house-terra/photos/photo-01.jpg",
      "/airbnb/house-terra/photos/photo-02.jpg",
      "/airbnb/house-terra/photos/photo-03.jpg",
      "/airbnb/house-terra/photos/photo-04.jpg",
      "/airbnb/house-terra/photos/photo-05.jpg",
      "/airbnb/house-terra/photos/photo-06.jpg",
      "/airbnb/house-terra/photos/photo-07.jpg",
      "/airbnb/house-terra/photos/photo-08.jpg",
      "/airbnb/house-terra/photos/photo-09.jpg",
      "/airbnb/house-terra/photos/photo-10.jpg",
      "/airbnb/house-terra/photos/photo-11.jpg",
      "/airbnb/house-terra/photos/photo-12.jpg",
      "/airbnb/house-terra/photos/photo-13.jpg",
      "/airbnb/house-terra/photos/photo-14.jpg",
      "/airbnb/house-terra/photos/photo-15.jpg",
      "/airbnb/house-terra/photos/photo-16.jpg",
      "/airbnb/house-terra/photos/photo-17.jpg",
      "/airbnb/house-terra/photos/photo-18.jpg",
      "/airbnb/house-terra/photos/photo-19.jpg",
      "/airbnb/house-terra/photos/photo-20.jpg"
    ],
    "rating": 5,
    "reviews": 17,
    "priceIdr": 7680000
  },
  {
    "id": "magnificent-canggu-estate",
    "name": "Magnificent Canggu Estate – Prestigious 5BR Haven of Peaceful Luxury Amidst Lively Canggu",
    "area": "Canggu & Berawa",
    "beds": 5,
    "baths": 5,
    "guests": 10,
    "price": 650,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/magnificent-canggu-estate/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Chloesi, 5.0★): 'Villa ini sempurna, bersih, dan sangat nyaman. Setelah hari yang sibuk di Canggu, kami sangat lega bisa pulang ke rumah yang begitu damai dan stafnya luar biasa membantu!' — Pilihan prestisius BSC untuk grup besar di jantung Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": true,
    "desc": "Temukan kemewahan langka: sebuah estate 5 kamar tidur yang tenang dan megah tepat di pusat keramaian Canggu. Kolam renang biru kristal, ruang keluarga terbuka yang sangat lapang, dan layanan staf harian penuh dedikasi yang membuat Anda merasa seperti raja.",
    "know": [
      "Guest Favorite: rated 4.86 from 42 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/magnificent-canggu-estate/photos/photo-01.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-02.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-03.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-04.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-05.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-06.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-07.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-08.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-09.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-10.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-11.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-12.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-13.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-14.jpg",
      "/airbnb/magnificent-canggu-estate/photos/photo-15.jpg"
    ],
    "rating": 4.86,
    "reviews": 42,
    "priceIdr": 10400000
  },
  {
    "id": "designer-beachside-canggu",
    "name": "Designer Beachside Villa – Ultra-Chic 4BR Coastal Retreat with Seamless Indoor-Outdoor Flow",
    "area": "Canggu & Berawa",
    "beds": 5,
    "baths": 5,
    "guests": 16,
    "price": 520,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/designer-beachside-canggu/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Sian, 5.0★): 'Pengalaman terbaik kami di Bali! Villa sangat memukau, luas, dan dijaga bersih setiap hari sehingga liburan terasa begitu santai tanpa beban. Stafnya sangat luar biasa!' — Rekomendasi BSC untuk liburan pantai mewah bersama sahabat di Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": true,
    "desc": "Rasakan sejuknya angin pantai pesisir Canggu melintasi interior ultra-chic villa 4 kamar tidur ini. Alur indoor-outdoor yang mulus, kolam renang kristal yang memikat, dan pelayanan penuh kejutan hangat dari staf yang siap membuat liburan Anda tak terlupakan.",
    "know": [
      "Guest Favorite: rated 4.96 from 89 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/designer-beachside-canggu/photos/photo-01.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-02.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-03.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-04.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-05.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-06.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-07.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-08.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-09.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-10.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-11.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-12.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-13.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-14.jpg",
      "/airbnb/designer-beachside-canggu/photos/photo-15.jpg"
    ],
    "rating": 4.96,
    "reviews": 48,
    "priceIdr": 8320000
  },
  {
    "id": "villa-daun-by-teduh",
    "name": "Villa Daun by Teduh – 5-Star Hotel Caliber 3BR Architectural Oasis in Berawa",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 380,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-daun-by-teduh/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Abdullateef, 5.0★): 'Menginap di Villa Daun benar-benar terasa seperti di hotel bintang 5. Sangat indah, luar biasa bersih, di area yang tenang tanpa kebisingan, dan keramahan stafnya kelas dunia.' — Guest Favorite BSC dengan standar kebersihan hotel bintang 5.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": true,
    "desc": "Ketika kenyamanan villa privat berpadu dengan standar kebersihan dan pelayanan hotel bintang lima. Oase arsitektural 3 kamar tidur di Berawa yang tenang tanpa kebisingan, dirancang untuk menghadirkan relaksasi jiwa yang menyeluruh.",
    "know": [
      "Guest Favorite: rated 5 from 16 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/villa-daun-by-teduh/photos/photo-01.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-02.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-03.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-04.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-05.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-06.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-07.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-08.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-09.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-10.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-11.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-12.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-13.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-14.jpg",
      "/airbnb/villa-daun-by-teduh/photos/photo-15.jpg"
    ],
    "rating": 5,
    "reviews": 16,
    "priceIdr": 6080000
  },
  {
    "id": "cala-blanca",
    "name": "Cala Blanca – Mediterranean-Inspired 4BR Sunlit Villa with 24-Hour Peace in Pererenan",
    "area": "Pererenan",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 420,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/cala-blanca/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Maureen & David, 5.0★): 'Interior Mediterania yang sangat menawan, kolam renang bermandikan sinar matahari, staf yang hangat, dan keamanan 24 jam yang memberikan ketenangan pikiran sempurna.' — Oase Mediterania pilihan BSC di Pererenan.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Nikmati kemurnian estetika Mediterania tropis yang bermandikan cahaya mentari di Pererenan. Dinding putih bersih, kolam renang biru jernih, keamanan 24 jam, dan keramahan staf lokal menghadirkan rasa tenang dan damai sepanjang liburan Anda.",
    "know": [
      "Guest Favorite: rated 4.94 from 32 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/cala-blanca/photos/photo-01.jpg",
      "/airbnb/cala-blanca/photos/photo-02.jpg",
      "/airbnb/cala-blanca/photos/photo-03.jpg",
      "/airbnb/cala-blanca/photos/photo-04.jpg",
      "/airbnb/cala-blanca/photos/photo-05.jpg",
      "/airbnb/cala-blanca/photos/photo-06.jpg",
      "/airbnb/cala-blanca/photos/photo-07.jpg",
      "/airbnb/cala-blanca/photos/photo-08.jpg",
      "/airbnb/cala-blanca/photos/photo-09.jpg",
      "/airbnb/cala-blanca/photos/photo-10.jpg",
      "/airbnb/cala-blanca/photos/photo-11.jpg",
      "/airbnb/cala-blanca/photos/photo-12.jpg",
      "/airbnb/cala-blanca/photos/photo-13.jpg",
      "/airbnb/cala-blanca/photos/photo-14.jpg",
      "/airbnb/cala-blanca/photos/photo-15.jpg"
    ],
    "rating": 4.94,
    "reviews": 32,
    "priceIdr": 6720000
  },
  {
    "id": "the-bull-house",
    "name": "The Bull House – Iconic 6BR Temple of Leisure with In-House Chef & Grand Spaces in Seminyak",
    "area": "Umalas & Seminyak",
    "beds": 6,
    "baths": 7,
    "guests": 12,
    "price": 680,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/the-bull-house/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Suhail, 5.0★): 'Masa tinggal kami benar-benar luar biasa dari awal hingga akhir. Sangat bersih, terawat, dan kehadiran chef in-house membuat makanan kami luar biasa lezat. Pelayanan seperti di rumah sendiri!' — Mahakarya hiburan dan liburan kelompok nomor satu BSC di Seminyak.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Selamat datang di 'Temple of Leisure' legendaris Seminyak. Hunian megah 6 kamar tidur dengan kolam renang spektakuler, fasilitas chef in-house kelas kuliner tinggi, dan ruang berkumpul royal yang menciptakan pengalaman pesta liburan paling berkesan.",
    "know": [
      "Guest Favorite: rated 4.77 from 53 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/the-bull-house/photos/photo-01.jpg",
      "/airbnb/the-bull-house/photos/photo-02.jpg",
      "/airbnb/the-bull-house/photos/photo-03.jpg",
      "/airbnb/the-bull-house/photos/photo-04.jpg",
      "/airbnb/the-bull-house/photos/photo-05.jpg",
      "/airbnb/the-bull-house/photos/photo-06.jpg",
      "/airbnb/the-bull-house/photos/photo-07.jpg",
      "/airbnb/the-bull-house/photos/photo-08.jpg",
      "/airbnb/the-bull-house/photos/photo-09.jpg",
      "/airbnb/the-bull-house/photos/photo-10.jpg",
      "/airbnb/the-bull-house/photos/photo-11.jpg",
      "/airbnb/the-bull-house/photos/photo-12.jpg",
      "/airbnb/the-bull-house/photos/photo-13.jpg",
      "/airbnb/the-bull-house/photos/photo-14.jpg",
      "/airbnb/the-bull-house/photos/photo-15.jpg"
    ],
    "rating": 4.77,
    "reviews": 48,
    "priceIdr": 10880000
  },
  {
    "id": "berawa-breeze",
    "name": "Berawa Breeze – Chic 4BR Wellness Sanctuary with Private Sauna & Sprawling Garden in Berawa",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 540,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/berawa-breeze/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Shanthini, 5.0★): 'Sama sekali tidak menyesal memilih villa ini untuk keluarga kami! Salah satu villa terbaik di Bali dengan taman luas, kolam bersih, sauna privat, dan staf yang luar biasa hangat.' — Pilihan wellness & keluarga terbaik BSC di Berawa.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Segarkan kembali raga dan pikiran Anda di oase kebugaran 4 kamar tidur Berawa. Dilengkapi fasilitas sauna privat, taman hijau yang luas membentang, kolam renang jernih, dan layanan harian penuh kasih yang memanjakan seluruh keluarga.",
    "know": [
      "Guest Favorite: rated 4.9 from 70 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/berawa-breeze/photos/photo-01.jpg",
      "/airbnb/berawa-breeze/photos/photo-02.jpg",
      "/airbnb/berawa-breeze/photos/photo-03.jpg",
      "/airbnb/berawa-breeze/photos/photo-04.jpg",
      "/airbnb/berawa-breeze/photos/photo-05.jpg",
      "/airbnb/berawa-breeze/photos/photo-06.jpg",
      "/airbnb/berawa-breeze/photos/photo-07.jpg",
      "/airbnb/berawa-breeze/photos/photo-08.jpg",
      "/airbnb/berawa-breeze/photos/photo-09.jpg",
      "/airbnb/berawa-breeze/photos/photo-10.jpg",
      "/airbnb/berawa-breeze/photos/photo-11.jpg",
      "/airbnb/berawa-breeze/photos/photo-12.jpg",
      "/airbnb/berawa-breeze/photos/photo-13.jpg",
      "/airbnb/berawa-breeze/photos/photo-14.jpg",
      "/airbnb/berawa-breeze/photos/photo-15.jpg"
    ],
    "rating": 4.9,
    "reviews": 48,
    "priceIdr": 8640000
  },
  {
    "id": "coco-bay",
    "name": "Coco Bay – Legendary 8BR Beachside Resort Estate with Private Buggy & Personal Chef",
    "area": "Canggu & Berawa",
    "beds": 8,
    "baths": 8,
    "guests": 16,
    "price": 850,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/coco-bay/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Amber, 5.0★): 'Benar-benar terasa seperti hotel mewah pribadi kami sendiri untuk 15 orang! Layanan buggy, chef in-house lezat, dan staf yang luar biasa membuat pengalaman ini mendapat nilai 1000/10!' — Estate kelompok terbesar dan termegah BSC di Berawa.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Kemewahan resor bintang lima milik Anda sendiri. Estate megah 8 kamar tidur di Berawa yang menampung hingga 16 tamu, lengkap dengan layanan buggy car privat, sarapan chef in-house harian, dan keamanan 24 jam untuk liburan kelompok termegah di Bali.",
    "know": [
      "Guest Favorite: rated 4.96 from 53 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/coco-bay/photos/photo-01.jpg",
      "/airbnb/coco-bay/photos/photo-02.jpg",
      "/airbnb/coco-bay/photos/photo-03.jpg",
      "/airbnb/coco-bay/photos/photo-04.jpg",
      "/airbnb/coco-bay/photos/photo-05.jpg",
      "/airbnb/coco-bay/photos/photo-06.jpg",
      "/airbnb/coco-bay/photos/photo-07.jpg",
      "/airbnb/coco-bay/photos/photo-08.jpg",
      "/airbnb/coco-bay/photos/photo-09.jpg",
      "/airbnb/coco-bay/photos/photo-10.jpg",
      "/airbnb/coco-bay/photos/photo-11.jpg",
      "/airbnb/coco-bay/photos/photo-12.jpg",
      "/airbnb/coco-bay/photos/photo-13.jpg",
      "/airbnb/coco-bay/photos/photo-14.jpg",
      "/airbnb/coco-bay/photos/photo-15.jpg"
    ],
    "rating": 4.96,
    "reviews": 48,
    "priceIdr": 13600000
  },
  {
    "id": "villa-milana",
    "name": "Villa Milana – Sunlit 5BR Mediterranean Haven Creating Memories That Last Forever",
    "area": "Canggu & Berawa",
    "beds": 5,
    "baths": 5,
    "guests": 12,
    "price": 560,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-milana/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Danil, 5.0★): 'Melebihi segala ekspektasi kami! Kolam dan tamannya menciptakan oase damai privat kami sendiri di Canggu. Sangat bersih, kasur nyaman, dan staf luar biasa ramah.' — Oase Mediterania ramah keluarga pilihan BSC di Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Biarkan diri Anda terpesona oleh kehangatan oase Mediterania 5 kamar tidur di Canggu. Taman tropis yang damai, kolam renang berkilau di bawah mentari, kasur ekstra nyaman, dan perhatian detail tanpa cela dari staf yang menyambut Anda dengan senyuman tulus.",
    "know": [
      "Guest Favorite: rated 4.93 from 41 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/villa-milana/photos/photo-01.jpg",
      "/airbnb/villa-milana/photos/photo-02.jpg",
      "/airbnb/villa-milana/photos/photo-03.jpg",
      "/airbnb/villa-milana/photos/photo-04.jpg",
      "/airbnb/villa-milana/photos/photo-05.jpg",
      "/airbnb/villa-milana/photos/photo-06.jpg",
      "/airbnb/villa-milana/photos/photo-07.jpg",
      "/airbnb/villa-milana/photos/photo-08.jpg",
      "/airbnb/villa-milana/photos/photo-09.jpg",
      "/airbnb/villa-milana/photos/photo-10.jpg",
      "/airbnb/villa-milana/photos/photo-11.jpg",
      "/airbnb/villa-milana/photos/photo-12.jpg",
      "/airbnb/villa-milana/photos/photo-13.jpg",
      "/airbnb/villa-milana/photos/photo-14.jpg",
      "/airbnb/villa-milana/photos/photo-15.jpg"
    ],
    "rating": 4.93,
    "reviews": 41,
    "priceIdr": 8960000
  },
  {
    "id": "beachside-haven-canggu",
    "name": "Beachside Haven – 10/10 Rated 4BR Coastal Sanctuary with Resort Pool Steps from the Beach",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 9,
    "price": 480,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/beachside-haven-canggu/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Francine, 5.0★): 'Jauh lebih indah di dunia nyata daripada fotonya! Terasa seperti di resor mewah pribadi, kolam renangnya spektakuler, dan stafnya luar biasa manis. Nilai 10/10 sempurna!' — Peringkat tertinggi BSC untuk villa pesisir di Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Dinobatkan sebagai properti sempurna 'Better than 10/10' oleh tamu kami. Villa pesisir 4 kamar tidur dengan kamar mandi walk-in robe, kolam renang resor megah dinaungi kanopi hijau, surround sound system, dan akses pantai hanya hitungan langkah.",
    "know": [
      "Guest Favorite: rated 4.96 from 67 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/beachside-haven-canggu/photos/photo-01.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-02.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-03.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-04.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-05.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-06.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-07.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-08.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-09.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-10.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-11.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-12.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-13.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-14.jpg",
      "/airbnb/beachside-haven-canggu/photos/photo-15.jpg"
    ],
    "rating": 4.96,
    "reviews": 48,
    "priceIdr": 7680000
  },
  {
    "id": "wellness-estate-canggu",
    "name": "Wellness Estate Canggu – High-End 4BR Health Haven with Sauna, Ice Bath & Private Gym",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 10,
    "price": 620,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/wellness-estate-canggu/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Destiny, 5.0★): 'Tempat sempurna untuk grup! Fasilitas sauna dan ice bath sangat mudah digunakan, hanya 1 menit jalan kaki ke beach club, dan staf melayani dengan cinta yang luar biasa.' — Suaka kesehatan & kebugaran nomor satu BSC di Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Puncak liburan sehat dan pemulihan tubuh di Canggu. Villa 4 kamar tidur mutakhir yang dilengkapi sauna pribadi, ice bath pemulihan atlet, gym privat, dan keamanan 24 jam hanya 1 menit jalan kaki dari klub pantai paling bergengsi.",
    "know": [
      "Guest Favorite: rated 4.98 from 47 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/wellness-estate-canggu/photos/photo-01.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-02.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-03.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-04.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-05.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-06.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-07.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-08.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-09.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-10.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-11.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-12.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-13.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-14.jpg",
      "/airbnb/wellness-estate-canggu/photos/photo-15.jpg"
    ],
    "rating": 4.98,
    "reviews": 47,
    "priceIdr": 9920000
  },
  {
    "id": "villa-aless",
    "name": "Villa Aless – Serene 3BR Tropical Pool Hideaway Tucked in Peaceful Umalas",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 330,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-aless/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Saoirse, 5.0★): 'Tempatnya bahkan jauh lebih indah dari yang kami harapkan! Sangat bersih, luas, tenang, dan stafnya luar biasa ramah. Tempat damai terbaik di Umalas!' — Suaka kedamaian privat pilihan BSC di Umalas.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Rasakan keheningan sejati yang menenangkan di Umalas. Oase 3 kamar tidur yang luas, bersih berkilau, dan didesain penuh perhatian terhadap kenyamanan, menawarkan tempat beristirahat yang damai setelah seharian menjelajahi keindahan Bali.",
    "know": [
      "Guest Favorite: rated 4.92 from 37 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/villa-aless/photos/photo-01.jpg",
      "/airbnb/villa-aless/photos/photo-02.jpg",
      "/airbnb/villa-aless/photos/photo-03.jpg",
      "/airbnb/villa-aless/photos/photo-04.jpg",
      "/airbnb/villa-aless/photos/photo-05.jpg",
      "/airbnb/villa-aless/photos/photo-06.jpg",
      "/airbnb/villa-aless/photos/photo-07.jpg",
      "/airbnb/villa-aless/photos/photo-08.jpg",
      "/airbnb/villa-aless/photos/photo-09.jpg",
      "/airbnb/villa-aless/photos/photo-10.jpg",
      "/airbnb/villa-aless/photos/photo-11.jpg",
      "/airbnb/villa-aless/photos/photo-12.jpg",
      "/airbnb/villa-aless/photos/photo-13.jpg",
      "/airbnb/villa-aless/photos/photo-14.jpg",
      "/airbnb/villa-aless/photos/photo-15.jpg"
    ],
    "rating": 4.92,
    "reviews": 37,
    "priceIdr": 5280000
  },
  {
    "id": "alua-loft",
    "name": "Alua Loft – Bohemian 1BR Designer Sanctuary with Sun-Drenched Private Plunge Pool",
    "area": "Pererenan",
    "beds": 1,
    "baths": 1,
    "guests": 2,
    "price": 165,
    "tier": "Standard",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/alua-loft/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Anna, 5.0★): 'Kenyataannya benar-benar sesuai dengan foto! Kolam plunge pribadi bermandikan sinar matahari, suasana sangat tenang, dan staf sangat responsif. Tempat sempurna untuk mengisi energi kembali.' — Pilihan desainer loft romantis BSC di Pererenan.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Suaka mezanin bohemian 1 kamar tidur yang artistik dan privat di Pererenan. Kolam renang plunge yang bermandikan cahaya mentari, langit-langit menjulang tinggi, dan ketenangan desa pesisir yang sempurna untuk mengisi kembali energi kreatif Anda.",
    "know": [
      "Guest Favorite: rated 4.86 from 80 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/alua-loft/photos/photo-01.jpg",
      "/airbnb/alua-loft/photos/photo-02.jpg",
      "/airbnb/alua-loft/photos/photo-03.jpg",
      "/airbnb/alua-loft/photos/photo-04.jpg",
      "/airbnb/alua-loft/photos/photo-05.jpg",
      "/airbnb/alua-loft/photos/photo-06.jpg",
      "/airbnb/alua-loft/photos/photo-07.jpg",
      "/airbnb/alua-loft/photos/photo-08.jpg",
      "/airbnb/alua-loft/photos/photo-09.jpg",
      "/airbnb/alua-loft/photos/photo-10.jpg",
      "/airbnb/alua-loft/photos/photo-11.jpg",
      "/airbnb/alua-loft/photos/photo-12.jpg",
      "/airbnb/alua-loft/photos/photo-13.jpg",
      "/airbnb/alua-loft/photos/photo-14.jpg",
      "/airbnb/alua-loft/photos/photo-15.jpg"
    ],
    "rating": 4.86,
    "reviews": 48,
    "priceIdr": 2640000
  },
  {
    "id": "villa-satiya",
    "name": "Villa Satiya – 5.0 Star 4BR Tropical Dream Oasis in Prime Scenic Pererenan",
    "area": "Pererenan",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 450,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-satiya/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (DigiNeko, 5.0★): 'Masa tinggal di sini adalah mimpi yang menjadi kenyataan. Bangun setiap pagi dengan suara alam yang menenangkan, taman rimbun, dan kolam renang jernih. Lima bintang mutlak tanpa keraguan!' — Peringkat sempurna 5.0 bintang pilihan BSC di Pererenan.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Bangunlah setiap pagi disambut suara alam yang menenteramkan dan pemandangan taman tropis zamrud di Pererenan. Dinilai sempurna 5.0 bintang, villa 4 kamar tidur ini memadukan kemewahan fasilitas modern dengan pesona magis Bali yang memikat kalbu.",
    "know": [
      "Guest Favorite: rated 5 from 43 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/villa-satiya/photos/photo-01.jpg",
      "/airbnb/villa-satiya/photos/photo-02.jpg",
      "/airbnb/villa-satiya/photos/photo-03.jpg",
      "/airbnb/villa-satiya/photos/photo-04.jpg",
      "/airbnb/villa-satiya/photos/photo-05.jpg",
      "/airbnb/villa-satiya/photos/photo-06.jpg",
      "/airbnb/villa-satiya/photos/photo-07.jpg",
      "/airbnb/villa-satiya/photos/photo-08.jpg",
      "/airbnb/villa-satiya/photos/photo-09.jpg",
      "/airbnb/villa-satiya/photos/photo-10.jpg",
      "/airbnb/villa-satiya/photos/photo-11.jpg",
      "/airbnb/villa-satiya/photos/photo-12.jpg",
      "/airbnb/villa-satiya/photos/photo-13.jpg",
      "/airbnb/villa-satiya/photos/photo-14.jpg",
      "/airbnb/villa-satiya/photos/photo-15.jpg"
    ],
    "rating": 5,
    "reviews": 43,
    "priceIdr": 7200000
  },
  {
    "id": "villa-infinity-umalas",
    "name": "Villa Infinity – Grand 5BR Estate with Olympic 20m Pool & Absolute Seclusion in Umalas",
    "area": "Umalas & Seminyak",
    "beds": 5,
    "baths": 5,
    "guests": 10,
    "price": 690,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-infinity-umalas/photos/photo-01.jpg",
    "why": "Ulasan Tamu Terbaik (Dawn, 5.0★): 'Kolam renangnya adalah sorotan utama—sepanjang 20 meter dan sangat luas untuk berenang santai! Sangat luas, privat, dan staf villa luar biasa membantu. Pengaturan sempurna untuk perayaan berkesan.' — Estate kolam renang 20 meter paling eksklusif BSC di Umalas.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Bayangkan berenang bebas di kolam renang privat sepanjang 20 meter di tengah rimbunnya taman tropis Umalas. Estate megah 5 kamar tidur yang lapang dan terisolasi sempurna, dirancang untuk perayaan momen paling berharga dalam hidup Anda.",
    "know": [
      "Guest Favorite: rated 4.91 from 22 verified stays.",
      "Private pool, spacious lounge and dedicated daily housekeeping.",
      "Concierge services available for airport transfers, private chefs, and massages."
    ],
    "images": [
      "/airbnb/villa-infinity-umalas/photos/photo-01.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-02.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-03.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-04.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-05.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-06.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-07.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-08.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-09.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-10.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-11.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-12.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-13.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-14.jpg",
      "/airbnb/villa-infinity-umalas/photos/photo-15.jpg"
    ],
    "rating": 4.91,
    "reviews": 22,
    "priceIdr": 11040000
  }
];
