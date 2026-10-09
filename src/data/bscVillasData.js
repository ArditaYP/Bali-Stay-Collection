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
  "villa-habitas",
  "tranquil-sanctuary-pererenan",
  "tropical-canggu-villa",
  "luxe-beach-villa-seminyak",
  "tropical-elegance-seseh",
  "balangan-cliff-villa",
  "yellow-moon-uluwatu",
  "st-lau",
  "casa-kaya-bingin",
  "luxury-tropical-bingin",
  "chic-tropical-bingin",
  "five-bedroom-designer-umalas",
  "villa-angkasa",
  "villa-imala",
  "villa-mahina",
  "khaleela-villas",
  "beyond-the-palms",
  "villa-akar",
  "villa-golden",
  "villa-surga",
  "house-terra",
  "villa-samudra-canggu",
  "villa-kayu-raja-seminyak",
  "villa-cendana-seminyak",
  "cliffside-panorama-uluwatu",
  "mandapa-jungle-villa"
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
    count: 3,
    badge: 'Chill & Surf',
    layout: 'norm',
    description: 'Quieter neighbour to Canggu with artisan cafés, local lanes, and easy beach breaks.',
    tone: ['#CBB9C9', '#E9DCE6'],
    image: '/destinations/pererenan.jpg',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Canggu & Berawa',
    count: 8,
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
    count: 4,
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
    count: 4,
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
    "id": "villa-habitas",
    "name": "Villa Habitas – Serene 4BR Lagoon Sanctuary in Pererenan",
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
    "why": "Ulasan tamu terbaik: 'Lokasi sempurna di Pererenan, sangat tenang, dan staf luar biasa hangat—surga tersembunyi yang membuat kami ingin kembali lagi.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Bayangkan bangun setiap pagi disambut pemandangan sawah hijau zamrud dan berenang di laguna pribadi yang menenangkan jiwa. Hanya beberapa langkah santai menuju kafe artisan terbaik Pererenan, surga 4 kamar ini menghadirkan ketenangan mutlak dengan sentuhan pelayanan bintang lima.",
    "know": [
      "Walkable to trendy cafes and restaurants in Pererenan.",
      "A nanny service and pool fence are available on request through our concierge.",
      "Free parking fits up to 2 cars plus scooters."
    ],
    "aliasId": "villa-habitas"
  },
  {
    "id": "tranquil-sanctuary-pererenan",
    "name": "Tranquil Sanctuary – Romantic 1BR Private Haven in Prime Pererenan",
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
    "why": "Ulasan tamu terbaik: 'Sangat damai, indah, dan intim. Oase privat terbaik untuk melepaskan penat berdua di Bali.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Rasakan kehangatan sinar matahari pagi yang menembus celah dedaunan tropis saat Anda menikmati kopi di tepi plunge pool pribadi. Sanctuary 1 kamar intim ini dirancang khusus untuk pasangan yang mendambakan privasi tanpa batas dan kedamaian sejati.",
    "know": [
      "Located in a tranquil lane with minimal traffic.",
      "Walking distance to top Pererenan cafés and bakeries."
    ]
  },
  {
    "id": "tropical-canggu-villa",
    "name": "Casa Kameeyla – Vibrant 4BR Tropical Villa in Central Canggu",
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
    "why": "Ulasan tamu terbaik: 'Sangat bersih, luas, dan lokasinya tak tertandingi di pusat Canggu. Pilihan sempurna untuk liburan keluarga.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Biarkan diri Anda tenggelam dalam pesona hidup tropis modern di jantung Canggu. Paviliun terbuka yang lapang, kolam renang berkilau, dan 4 kamar tidur mewah menanti Anda dan orang-orang tercinta untuk merayakan momen berharga bersama.",
    "know": [
      "Moments from Canggu's best dining and beach clubs.",
      "Spacious living pavilion perfect for groups."
    ]
  },
  {
    "id": "luxe-beach-villa-seminyak",
    "name": "Luxe Beach Villa – Chic 3BR Coastal Hideaway Steps from Seminyak Beach",
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
    "why": "Ulasan tamu terbaik: 'Hanya beberapa langkah dari deburan ombak dan beach club ternama, namun di dalam terasa begitu hening dan eksklusif.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Dengarkan bisikan deburan ombak pantai Seminyak yang hanya sepelemparan batu dari pintu villa Anda. Perpaduan desain pesisir kontemporer dan kenyamanan mewah yang memastikan liburan tropis Anda terasa istimewa sejak detik pertama.",
    "know": [
      "Steps from Seminyak Beach and famous beach clubs.",
      "Open-air tropical living area with private pool."
    ]
  },
  {
    "id": "tropical-elegance-seseh",
    "name": "Tropical Elegance – Breezy 2BR Ocean-Air Villa by Seseh Beach",
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
    "why": "Ulasan tamu terbaik: 'Kombinasi langka antara kedamaian desa Bali asli dan akses pantai langsung tanpa hiruk-pikuk macet.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Hirup segarnya angin laut yang berhembus lembut melintasi teras terbuka villa 2 kamar yang elegan ini. Tersembunyi di desa pesisir Seseh yang asri, nikmati kemewahan ruang privat di mana waktu seakan melambat hanya untuk Anda.",
    "know": [
      "Nestled in peaceful Seseh, free from heavy traffic.",
      "Short stroll to black-sand coastline and coastal walks."
    ]
  },
  {
    "id": "balangan-cliff-villa",
    "name": "Balangan Cliff Villa – Iconic 5BR Cliff-Edge Oceanfront Estate",
    "area": "Uluwatu & Bukit",
    "beds": 5,
    "baths": 5,
    "guests": 10,
    "price": 495,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Ocean view",
      "Cliff top",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Villa manager",
      "Wellness facilities"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/iconic-cliff-top-villa/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Panorama matahari terbenam 180° langsung di atas tebing laut lepas yang tiada duanya di seluruh Bali.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Tataplah cakrawala Samudra Hindia yang membentang tanpa batas tepat di depan mata Anda. Bertengger megah di atas tebing kapur Balangan, estate 5 kamar tidur ini menyuguhkan kemegahan matahari terbenam spektakuler dan akses pantai eksklusif yang tak terlupakan.",
    "know": [
      "Cliff-edge infinity swimming pool facing the Indian Ocean horizon.",
      "Short walking access down to Balangan surf beach."
    ],
    "aliasId": "iconic-cliff-top-villa"
  },
  {
    "id": "yellow-moon-uluwatu",
    "name": "Yellow Moon – Sun-Drenched 3BR Tropical Sanctuary in Uluwatu",
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
    "why": "Ulasan tamu terbaik: 'Tempat paling cantik yang pernah kami tinggali! Rasanya ingin tinggal di sini selamanya bersama keluarga.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Tenggelamkan diri Anda di sunken lounge luar ruangan seraya menikmati semilir angin perbukitan Uluwatu. Desain kayu hangat, kolam renang yang mengundang, dan pelayanan tulus staf kami akan membuat Anda jatuh cinta sejak hari pertama.",
    "know": [
      "Convenient access to top surf breaks in Uluwatu and Padang Padang.",
      "Sunken outdoor lounge beside the swimming pool."
    ]
  },
  {
    "id": "st-lau",
    "name": "St. Lau – Timeless 3BR Jungle Sanctuary in Ubud",
    "area": "Ubud",
    "beds": 3,
    "baths": 3,
    "guests": 8,
    "price": 310,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family",
      "Wellness retreat"
    ],
    "setting": [
      "Garden setting",
      "Rice-field view"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Villa manager",
      "Wellness facilities"
    ],
    "tone": [
      "#C7CDBB",
      "#E2E7D6"
    ],
    "img": "/airbnb/st-lau-ubud/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Suasana hening yang magis di Ubud. Stafnya sangat penuh perhatian, membuat kami merasa dimanjakan seutuhnya.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Biarkan ketenangan hutan tropis Ubud memeluk seluruh panca indera Anda. Dengan dek kolam renang privat yang menghadap rerimbunan hijau dan sentuhan arsitektur khas Bali, villa 3 kamar ini adalah tempat di mana pikiran Anda menemukan kedamaian mutlak.",
    "know": [
      "Open-plan living spaces flow onto private pool deck surrounded by tropical greenery.",
      "Conveniently close to Ubud centre and Monkey Forest sanctuary."
    ],
    "aliasId": "st-lau-ubud"
  },
  {
    "id": "casa-kaya-bingin",
    "name": "CASA KĀYA – Bohemian 1BR Design Villa in Bingin",
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
    "why": "Ulasan tamu terbaik: 'Desain Mediterania tropis yang begitu estetik dan romantis, hanya hitungan menit dari pantai Bingin.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Temukan pelarian romantis berdesain Mediterania tropis yang memesona di tebing Bingin. Lengkungan arsitektur yang anggun dan kolam renang privat menciptakan suasana intim yang sempurna bagi Anda berdua untuk merajut kenangan manis.",
    "know": [
      "Minutes from Bingin Beach stairs and cafés.",
      "Minimalist Mediterranean-inspired architectural details."
    ]
  },
  {
    "id": "luxury-tropical-bingin",
    "name": "Luxury Tropical Bingin – Elegant 3BR Palm Villa Near Beach",
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
    "why": "Ulasan tamu terbaik: 'Lokasi luar biasa, kasur super nyaman, kolam renang menawan, dan dekat dengan butik serta kafe terbaik.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Bayangkan bersantai di tepi kolam yang teduh dinaungi pepohonan palem setelah seharian menikmati pantai Bingin. Villa 3 kamar tidur mewah ini memberikan kenyamanan paripurna bagi keluarga atau sahabat yang menginginkan relaksasi tingkat tinggi.",
    "know": [
      "Surrounded by tropical frangipani and palm trees.",
      "Easy access to Bingin and Padang Padang beaches."
    ]
  },
  {
    "id": "chic-tropical-bingin",
    "name": "Chic Tropical Bingin – Polished 2BR Concrete Oasis Near Beach",
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
    "why": "Ulasan tamu terbaik: 'Nilai 10 sempurna! Jauh lebih indah daripada foto, dan pelayanan manajernya benar-benar tiada tanding.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Rasakan harmoni antara semen ekspos modern yang elegan dan kehangatan kayu alami di oase 2 kamar tidur ini. Pelayanan manajer villa yang penuh dedikasi memastikan setiap keinginan Anda terpenuhi bahkan sebelum Anda memintanya.",
    "know": [
      "Exceptional 4.97 rating across 30+ verified guest reviews.",
      "Minutes from Bingin surf breaks and sunset cliff spots."
    ]
  },
  {
    "id": "five-bedroom-designer-umalas",
    "name": "Umalas Estate – Grand 5BR Designer Haven Bordering Berawa",
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
    "why": "Ulasan tamu terbaik: 'Kemewahan skala resor pribadi dengan kolam renang 18 meter dan tim staf berdedikasi tinggi.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Ketika ukuran dan privasi menjadi prioritas tertinggi Anda, mahakarya arsitektur 5 kamar tidur di perbatasan Umalas dan Berawa ini siap memukau rombongan besar Anda dengan kolam renang 18 meter dan layanan concierge berkelas.",
    "know": [
      "Features large 18-meter swimming pool and manicured estate grounds.",
      "Prime location bridging quiet Umalas and vibrant Berawa."
    ]
  },
  {
    "id": "villa-angkasa",
    "name": "Villa Angkasa – Majestic 5BR Rainforest Infinity Villa in Ubud",
    "area": "Ubud",
    "beds": 5,
    "baths": 6,
    "guests": 10,
    "price": 420,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Rice-field view"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities"
    ],
    "tone": [
      "#C7CDBB",
      "#E2E7D6"
    ],
    "img": "/airbnb/angkasa-ubud/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Berenang di infinity pool yang seakan melayang di atas kanopi lembah Sungai Ayung adalah pengalaman spiritual.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Rasakan sensasi melayang di atas kanopi lembah Sungai Ayung dari infinity pool spektakuler villa 5 kamar ini. Udara pegunungan Ubud yang sejuk dan suara alam yang menenteramkan akan memulihkan energi tubuh dan jiwa Anda secara menyeluruh.",
    "know": [
      "Spectacular unhindered jungle and river valley vistas.",
      "Generous indoor-outdoor dining areas ideal for family retreats."
    ],
    "aliasId": "angkasa-ubud"
  },
  {
    "id": "villa-imala",
    "name": "Villa Imala – Ultra-Luxury 6BR Ocean-View Spa & Gym Estate in Uluwatu",
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
    "why": "Ulasan tamu terbaik: 'Villa termewah di Uluwatu! Kolam 80m², gym kaca panorama laut, dan ruang spa privat yang tak tertandingi.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Kemewahan tanpa batas menanti Anda di estate 6 kamar prestisius ini. Mulai hari Anda dengan sesi kebugaran di gym berdinding kaca panorama samudra, manjakan diri di ruang spa privat, dan saksikan senja keemasan dari kolam renang 80m² Anda.",
    "know": [
      "80m² private swimming pool with sundeck and rooftop ocean-view daybeds.",
      "Dedicated private spa room and panoramic glass-wall fitness gym.",
      "Minutes away from Savaya Beach Club and Melasti Beach."
    ]
  },
  {
    "id": "villa-mahina",
    "name": "Villa Mahina – Contemporary 3BR Luxury Villa 400m from Berawa Beach",
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
    "desc": "Nikmati kemewahan berada di pusat gaya hidup Berawa tanpa mengorbankan ketenangan tidur Anda. Dilengkapi jendela kedap suara total, sunken lounge elegan, dan kolam renang privat, villa 3 kamar ini adalah santuari modern terbaik Anda.",
    "img": "/airbnb/villa-mahina/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-mahina/photos/photo-01.jpg",
      "/airbnb/villa-mahina/photos/photo-02.jpg",
      "/airbnb/villa-mahina/photos/photo-03.jpg",
      "/airbnb/villa-mahina/photos/photo-04.jpg",
      "/airbnb/villa-mahina/photos/photo-05.jpg"
    ],
    "why": "Ulasan tamu terbaik: 'Hanya 400 meter jalan kaki ke Pantai Berawa dan Finns Club, namun di dalam villa sangat tenang dan privat berkat jendela kedap suara.'"
  },
  {
    "id": "khaleela-villas",
    "name": "Khaleela Villas – Desert-Inspired 2BR Sunlit Oasis in Canggu",
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
    "desc": "Biarkan diri Anda terhanyut dalam kehangatan nuansa gurun pasir yang eksotis di jantung Canggu. Nikmati kesegaran berenang di bawah sinar mentari tropis dan sensasi mandi terbuka bernuansa spa alami yang merelaksasi setiap jengkal tubuh Anda.",
    "img": "/airbnb/khaleela-villas/photos/photo-01.jpg",
    "images": [
      "/airbnb/khaleela-villas/photos/photo-01.jpg",
      "/airbnb/khaleela-villas/photos/photo-02.jpg",
      "/airbnb/khaleela-villas/photos/photo-03.jpg",
      "/airbnb/khaleela-villas/photos/photo-04.jpg",
      "/airbnb/khaleela-villas/photos/photo-05.jpg"
    ],
    "why": "Ulasan tamu terbaik: 'Estetika gurun yang eksotis dan menenangkan di tengah Canggu. Kamar mandi terbukanya sangat luar biasa!'"
  },
  {
    "id": "beyond-the-palms",
    "name": "Beyond the Palms – High-Tech 4BR Luxury Villa with Rooftop Jacuzzi",
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
    "desc": "Rasakan masa depan liburan mewah di mana kecanggihan teknologi berpadu dengan kemegahan tropis. Bersantailah di rooftop jacuzzi, nikmati bioskop proyektor luar ruangan, dan dengarkan alunan musik jernih dari sistem suara Sonos di seluruh sudut villa.",
    "img": "/airbnb/beyond-the-palms/photos/photo-01.jpg",
    "images": [
      "/airbnb/beyond-the-palms/photos/photo-01.jpg",
      "/airbnb/beyond-the-palms/photos/photo-02.jpg",
      "/airbnb/beyond-the-palms/photos/photo-03.jpg",
      "/airbnb/beyond-the-palms/photos/photo-04.jpg",
      "/airbnb/beyond-the-palms/photos/photo-05.jpg"
    ],
    "why": "Ulasan tamu terbaik: 'Villa berteknologi tercanggih di Bali! Rooftop jacuzzi saat sunset dan bioskop outdoor menjadikannya liburan impian.'"
  },
  {
    "id": "villa-akar",
    "name": "Villa Akar – Guest Favorite 4BR Architectural Hideaway in Berawa",
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
    "desc": "Masuki mahakarya desain kontemporer berpredikat Guest Favorite bintang 5.0 di Berawa. Fleksibilitas ruang keluarga ber-AC yang dapat dibuka menyatu dengan kolam renang asri memberikan kebebasan dan kenyamanan tak tertandingi bagi seluruh keluarga.",
    "img": "/airbnb/villa-akar/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-akar/photos/photo-01.jpg",
      "/airbnb/villa-akar/photos/photo-02.jpg",
      "/airbnb/villa-akar/photos/photo-03.jpg",
      "/airbnb/villa-akar/photos/photo-04.jpg",
      "/airbnb/villa-akar/photos/photo-05.jpg"
    ],
    "why": "Ulasan tamu terbaik: 'Predikat Guest Favorite 5.0 sempurna! Ruang keluarga fleksibel ber-AC dan layanan staf yang membuat kami merasa seperti raja.'"
  },
  {
    "id": "villa-golden",
    "name": "Villa Golden – Modern Chic 2BR Villa Opposite FINNS Club",
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
    "desc": "Kemudahan akses gaya hidup premium Berawa berada tepat di depan pintu Anda. Berada persis di seberang FINNS Recreation Club, villa 2 kamar modern chic ini menyuguhkan interior menawan dan kolam renang privat yang memanjakan liburan Anda.",
    "img": "/airbnb/villa-golden/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-golden/photos/photo-01.jpg",
      "/airbnb/villa-golden/photos/photo-02.jpg",
      "/airbnb/villa-golden/photos/photo-03.jpg",
      "/airbnb/villa-golden/photos/photo-04.jpg",
      "/airbnb/villa-golden/photos/photo-05.jpg"
    ],
    "why": "Ulasan tamu terbaik: 'Tepat di seberang FINNS Recreation Club, desain chic yang sangat instagramable, dan pelayanan harian yang sempurna.'"
  },
  {
    "id": "villa-surga",
    "name": "Villa Surga – Serene 4BR Valley-View Sanctuary in Ubud",
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
    "why": "Ulasan tamu terbaik: 'Ketenangan sejati di lembah tropis Ubud. Pemandangan hijau sejauh mata memandang dan staf yang melayani dari hati.'"
  },
  {
    "id": "house-terra",
    "name": "House Terra – Biombo-Designed 5BR Tropical Pool Estate in Pererenan",
    "area": "Pererenan",
    "beds": 5,
    "baths": 5,
    "guests": 10,
    "price": 550,
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
    "why": "Ulasan tamu terbaik: 'Mahakarya arsitektur Biombo dengan nilai 10 sempurna! Kolam renang spektakuler, piano klasik, dan privasi mutlak di Pererenan.'",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "Bayangkan melangkah masuk ke dalam mahakarya arsitektur tropis Biombo di mana kemewahan modern melebur sempurna dengan alam Pererenan. Dilengkapi 5 kamar tidur mewah, piano klasik, kolam renang luas, dan lounge outdoor, nikmati privasi eksklusif tanpa cela.",
    "know": [],
    "images": [
      "/airbnb/house-terra/photos/photo-01.jpg",
      "/airbnb/house-terra/photos/photo-02.jpg",
      "/airbnb/house-terra/photos/photo-03.jpg",
      "/airbnb/house-terra/photos/photo-04.jpg",
      "/airbnb/house-terra/photos/photo-05.jpg",
      "/airbnb/house-terra/photos/photo-06.jpg",
      "/airbnb/house-terra/photos/photo-07.jpg",
      "/airbnb/house-terra/photos/photo-08.jpg"
    ]
  },
  {
    "id": "villa-samudra-canggu",
    "name": "Villa Samudra – Bohemian Tropical Luxury in Echo Beach Canggu",
    "area": "Canggu & Berawa",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 280,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Beach lovers"
    ],
    "setting": [
      "Walk to the beach",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Near the beach",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-samudra-canggu/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Hanya beberapa langkah dari ombak Echo Beach, desain bohemian mewah yang sangat menenangkan jiwa.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Rasakan ritme santai pesisir Canggu dalam pelukan kemewahan bohemian tropis. Kolam renang privat yang asri dan kamar tidur yang luas siap menyambut kepulangan Anda setelah menikmati sunset di pantai.",
    "know": [
      "5-minute stroll to Echo Beach surf break.",
      "Private pool with sun deck framed by tropical palms."
    ]
  },
  {
    "id": "villa-kayu-raja-seminyak",
    "name": "Villa Kayu Raja – Elegant Tropical Oasis in Petitenget Seminyak",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 320,
    "tier": "Deluxe",
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
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/villa-kayu-raja-seminyak/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Dekat dengan Ku De Ta dan pantai Petitenget, namun di dalam villa terasa begitu hening dan damai.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Temukan oase ketenangan di tengah kawasan paling bergengsi Seminyak. Mandi berendam di bathtub batu alam outdoor di bawah langit berbintang dan nikmati kemewahan privasi di pusat denyut kuliner Bali.",
    "know": [
      "Located in prime Petitenget dining strip.",
      "Private pool with timber sun deck."
    ]
  },
  {
    "id": "villa-cendana-seminyak",
    "name": "Villa Cendana – Romantic Honeymoon Hideaway in Seminyak",
    "area": "Umalas & Seminyak",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 230,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Walk to cafés",
      "Daily housekeeping",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/villa-cendana-seminyak/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Bulan madu kami di sini sangat magis! Floating breakfast dan kolam renang privat yang tak terlupakan.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Ciptakan momen romantis paling berkesan dalam hidup Anda di sanctuary bulan madu privat ini. Dikelilingi taman tropis yang rimbun dan suasana intim, cinta Anda akan mekar lebih indah di Seminyak.",
    "know": [
      "Perfect for couples and honeymooners.",
      "Private plunge pool with garden stone tub."
    ]
  },
  {
    "id": "cliffside-panorama-uluwatu",
    "name": "Cliffside Panorama – Oceanfront Infinity Villa in Uluwatu",
    "area": "Uluwatu & Bukit",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 540,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Celebration",
      "Couples"
    ],
    "setting": [
      "Ocean view",
      "Cliff top"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Villa manager",
      "Wellness facilities"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/cliffside-panorama-uluwatu/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Tak ada kata yang sanggup melukiskan keindahan sunset dari infinity pool ini. Menatap ombak Bingin sambil menikmati koktail sungguh magis.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Biarkan pesona lautan biru lepas Uluwatu menghipnotis hari-hari Anda. Duduklah di tepi infinity pool saat matahari perlahan tenggelam, dan nikmati kemewahan hakiki yang hanya dimiliki segelintir orang di dunia.",
    "know": [
      "Uninterrupted 180° Indian Ocean sunset view.",
      "Horizon infinity swimming pool."
    ]
  },
  {
    "id": "mandapa-jungle-villa",
    "name": "Mandapa Jungle Villa – Eco-Luxury Bamboo Sanctuary in Sayan Ubud",
    "area": "Ubud",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 290,
    "tier": "Premium",
    "trips": [
      "Nature getaway",
      "Wellness retreat",
      "Couples"
    ],
    "setting": [
      "Rice-field view"
    ],
    "am": [
      "Private pool",
      "Wellness facilities",
      "Daily staff",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#C7CDBB",
      "#E2E7D6"
    ],
    "img": "/airbnb/mandapa-jungle-villa/photos/photo-01.jpg",
    "why": "Ulasan tamu terbaik: 'Tidur ditemani suara gemericik Sungai Ayung di mahakarya bambu ini adalah retret spiritual yang tak terlupakan.'",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Rasakan keselarasan sejati dengan alam di mahakarya arsitektur bambu ramah lingkungan yang melayang di atas lembah Sungai Ayung. Hirup kesegaran udara Ubud dan temukan kembali kedamaian batin Anda yang paling murni.",
    "know": [
      "Spectacular open-concept bamboo architecture.",
      "Unobstructed jungle and Ayung River valley view."
    ]
  }
];
