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
    "desc": "Experience the exhilarating sensation of floating above the Ayung River valley. From the crystalline infinity pool to the crisp highland air of Ubud, every breath here restores your body and calms your soul.",
    "why": "Guest Highlight: \"Absolutely stunning and surrounded by the peaceful atmosphere that makes Ubud so special. The pool and outdoor spaces made our stay unforgettable.\" — Verified by Bali Stay Collection for premier group escapes.",
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
    "desc": "Gaze across the boundless horizon of the Indian Ocean stretching endlessly before you. Perched majestically on Balangan’s limestone cliffs, feel the revitalizing sea breeze and watch the sunset ignite the sky in gold and crimson from your private infinity pool.",
    "why": "Guest Highlight: \"Perched right on the cliff edge like an exclusive resort, it was even more breathtaking than in the photos.\" — Hand-picked by Bali Stay Collection for iconic clifftop panoramas and unmatched ocean sunsets.",
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
    "desc": "Close your eyes for a moment and listen to the gentle rustle of Ubud's tropical forest. As you step onto your private pool deck, cool emerald waters and lush jungle foliage effortlessly wash away the noise of the world, welcoming you into profound stillness.",
    "why": "Guest Highlight: \"The villa looked exactly like the photos—clean, beautifully presented, and a perfect escape from reality with its quiet atmosphere.\" — Verified by Bali Stay Collection for authentic rainforest seclusion.",
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
    "why": "Guest Highlight: \"Incredible location close to restaurants and spas, walkable with a toddler, and staffed with warm, helpful hospitality.\" — Selected by Bali Stay Collection for family-friendly coastal tranquility.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Step into a private lagoon oasis tucked away in peaceful Pererenan. Framed by lush tropical gardens and glistening turquoise waters, immerse yourself in coastal calm just a gentle stroll from artisan cafés.",
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
    "why": "Guest Highlight: \"Private yet convenient, beautifully maintained, and the perfect romantic size for two.\" — Bali Stay Collection’s top recommendation for honeymoons and intimate romantic escapes.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Wake to soft sunlight filtering through sheer drapes and step directly into your private sunlit pool. A chic one-bedroom mezzanine retreat where romance, privacy, and serene coastal charm intertwine.",
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
    "name": "Casa Kameeyla – Sun-Drenched 4BR Tropical Villa in Central Canggu",
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
    "why": "Guest Highlight: \"Light, airy, and beautifully designed with great indoor-outdoor flow and a private pool our family loved.\" — Curated by Bali Stay Collection for premier family living in central Canggu.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Bask in the golden sunlight of Canggu across breezy open-concept living spaces and a crystalline private pool. A vibrant family sanctuary where modern tropical design meets prime beachside lifestyle.",
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
    "name": "Luxe Beach Villa – Architectural 3BR Coastal Hideaway Steps from Seminyak Beach",
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
    "why": "Guest Highlight: \"Stunning aesthetics with high sloping roofs, clear pool water, and a cozy sunken sofa perfect for slow-paced holiday living.\" — Verified by Bali Stay Collection for design lovers and beach lovers alike.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Experience the luxury of soaring architectural ceilings and sunken poolside lounging just moments from Seminyak Beach. An oasis of calm where chic boutique shopping meets pure private seclusion.",
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
    "why": "Guest Highlight: \"We loved the cozy, luxurious feel from the moment we walked in. The soothing sound of running water in the pool created an unforgettable ambiance.\" — Hand-picked by Bali Stay Collection for authentic coastal serenity.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Inhale the invigorating ocean air of Seseh Beach. Featuring a soothing pool water feature, warm evening ambient illumination, and authentic village calm, this two-bedroom haven is pure balm for the soul.",
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
    "why": "Guest Highlight: \"Absolutely gorgeous for a family getaway! Spacious, spotless, with a large child-friendly pool, great workout gear, and luxurious master suites.\" — The top family recommendation in Uluwatu by Bali Stay Collection.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Relax in a sunken lounge bathed in Uluwatu’s golden sunshine. Featuring an expansive swimming pool with a child-friendly shallow area, private fitness gear, and a gourmet kitchen, every holiday wish is catered for.",
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
    "why": "Guest Highlight: \"Even more beautiful in person! The layout catches all-day sunlight, perfect for tanning, and the villa was lit up so warmly on arrival.\" — Curated by Bali Stay Collection for romantic escapes in Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Find your romantic coastal sanctuary in Bingin. Expansive glass doors slide wide open to invite all-day sunlight into your private pool deck, creating an effortless haven for sunbathing and unwinding.",
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
    "why": "Guest Highlight: \"Clean, spacious, stylish, and very well maintained. The tropical vibe combined with the peaceful atmosphere made our stay truly relaxing.\" — Recommended by Bali Stay Collection for friends and families in Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Unwind in a sunken poolside lounge shaded by swaying tropical palms. Three stylish bedrooms, pristine minimalist interiors, and blissful serenity just moments from Bingin’s iconic surf coast.",
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
    "why": "Guest Highlight: \"Very new, modern, clean, and well-appointed with thoughtful hosts and top-tier amenities.\" — Chosen by Bali Stay Collection for discerning design travelers in Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "Experience the tactile beauty of cool polished concrete softened by warm natural timber. A contemporary two-bedroom haven in Bingin created for lovers of sleek architectural design and calm privacy.",
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
    "why": "BSC Signature Choice: \"Private resort scale featuring an 18-meter lap pool, soaring architectural pavilions, and complete privacy on the Umalas border.\" — The premier large-group estate in Bali Stay Collection's portfolio.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "When space, elegance, and absolute privacy matter most. This five-bedroom designer estate in Umalas features an 18-meter lap pool, soaring living pavilions, and serene rice paddy borders just five minutes from Berawa.",
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
    "why": "Guest Highlight: \"Sitting on the terrace enjoying the ocean sunset view was simply magical! The manager organized massages and special dinners seamlessly.\" — The ultimate clifftop luxury estate in Bali Stay Collection's Uluwatu collection.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Uncompromising luxury awaits at this six-bedroom Uluwatu clifftop estate. Featuring an 80m² pool, panoramic ocean-facing glass gym, private spa room, and magical sunset terrace vistas over the Indian Ocean.",
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
    "desc": "Enjoy the ultimate privilege: prime central Berawa living without the noise. Just 400 meters from Berawa Beach and Finns Beach Club, this modern three-bedroom villa features double-glazed acoustics and a sparkling pool.",
    "img": "/airbnb/villa-mahina/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-mahina/photos/photo-01.jpg",
      "/airbnb/villa-mahina/photos/photo-02.jpg",
      "/airbnb/villa-mahina/photos/photo-03.jpg",
      "/airbnb/villa-mahina/photos/photo-04.jpg",
      "/airbnb/villa-mahina/photos/photo-05.jpg"
    ],
    "why": "Guest Highlight: \"Unbeatable location in Canggu & Berawa, pristine private pool and living space, and surprisingly quiet and private inside.\" — Top-rated walk-to-beach villa by Bali Stay Collection.",
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
    "desc": "Immerse yourself in desert-modernist aesthetics and sweeping curved architecture in central Canggu. Two sun-filled bedrooms, a deep private pool, and photogenic indoor-outdoor bathrooms crafted to enchant.",
    "img": "/airbnb/khaleela-villas/photos/photo-01.jpg",
    "images": [
      "/airbnb/khaleela-villas/photos/photo-01.jpg",
      "/airbnb/khaleela-villas/photos/photo-02.jpg",
      "/airbnb/khaleela-villas/photos/photo-03.jpg",
      "/airbnb/khaleela-villas/photos/photo-04.jpg",
      "/airbnb/khaleela-villas/photos/photo-05.jpg"
    ],
    "why": "Guest Highlight: \"Even more stunning in real life than the photos! The architecture took our breath away, and the house manager was exceptionally kind and attentive.\" — Bali Stay Collection's most photogenic architectural oasis in Canggu.",
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
    "desc": "Step into the future of luxury holiday living where smart home tech meets tropical elegance. Featuring a rooftop sunset jacuzzi, whole-home Sonos sound system, and outdoor cinema under the Canggu stars.",
    "img": "/airbnb/beyond-the-palms/photos/photo-01.jpg",
    "images": [
      "/airbnb/beyond-the-palms/photos/photo-01.jpg",
      "/airbnb/beyond-the-palms/photos/photo-02.jpg",
      "/airbnb/beyond-the-palms/photos/photo-03.jpg",
      "/airbnb/beyond-the-palms/photos/photo-04.jpg",
      "/airbnb/beyond-the-palms/photos/photo-05.jpg"
    ],
    "why": "Guest Highlight: \"Extremely modern and beautifully designed. The indoor-outdoor bathrooms, smart technology, and rooftop jacuzzi made it feel like pure luxury.\" — Curated by Bali Stay Collection for high-tech luxury living in Canggu.",
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
    "desc": "Enter a 5.0-star Guest Favorite retreat in Berawa. Boasting flexible enclosed air-conditioned living, a tranquil zen pool, and warm teak wood finishes that make you feel instantly at home.",
    "img": "/airbnb/villa-akar/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-akar/photos/photo-01.jpg",
      "/airbnb/villa-akar/photos/photo-02.jpg",
      "/airbnb/villa-akar/photos/photo-03.jpg",
      "/airbnb/villa-akar/photos/photo-04.jpg",
      "/airbnb/villa-akar/photos/photo-05.jpg"
    ],
    "why": "Guest Highlight: \"Exceeded our expectations in every way. The interiors felt warm, comfortable, and distinctly premium—we felt at home the second we arrived.\" — Perfect 5.0 Guest Favorite rating in Berawa by Bali Stay Collection.",
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
    "desc": "Unbeatable convenience meets secluded privacy in Berawa. Located directly opposite FINNS Recreation Club, this chic two-bedroom villa offers a sparkling pool, lush perimeter palms, and quiet comfort.",
    "img": "/airbnb/villa-golden/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-golden/photos/photo-01.jpg",
      "/airbnb/villa-golden/photos/photo-02.jpg",
      "/airbnb/villa-golden/photos/photo-03.jpg",
      "/airbnb/villa-golden/photos/photo-04.jpg",
      "/airbnb/villa-golden/photos/photo-05.jpg"
    ],
    "why": "Guest Highlight: \"Exactly as pictured, if not more beautiful! We loved the privacy from the lush palms, spotless cleanliness, and being steps from great cafes.\" — Prime Berawa location verified by Bali Stay Collection.",
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
    "desc": "True to its name meaning 'Paradise', uncover a hidden sanctuary in serene Ubud. A private infinity pool overlooking lush tropical valley jungle brings deep, restorative relaxation.",
    "img": "/airbnb/villa-surga/photos/photo-01.jpg",
    "images": [
      "/airbnb/villa-surga/photos/photo-01.jpg",
      "/airbnb/villa-surga/photos/photo-02.jpg",
      "/airbnb/villa-surga/photos/photo-03.jpg",
      "/airbnb/villa-surga/photos/photo-04.jpg",
      "/airbnb/villa-surga/photos/photo-05.jpg"
    ],
    "why": "Guest Highlight: \"A wonderful stay surrounded by Ubud's tranquil valley. The house and pool were perfect for swimming, sunbathing, and recharging.\" — Selected by Bali Stay Collection for genuine rainforest tranquility.",
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
    "why": "Guest Highlight: \"Nicely built, very spacious, and super comfy for large groups. Having private chefs cook dinner in the villa was one of our best Bali memories.\" — Premier Biombo architectural estate in Pererenan by Bali Stay Collection.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "Step inside a striking architectural masterpiece by Biombo where modern design merges with tropical Pererenan. Featuring five grand bedrooms, a classic piano, an expansive pool, and in-house chef dining.",
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
    "why": "Guest Highlight: \"Impeccable, clean, and comfortable. After a busy day in Canggu, we were so relieved to come home to this peaceful haven. The staff was incredible!\" — Verified by Bali Stay Collection for prestigious group holidays.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": true,
    "desc": "Discover a rare luxury: a grand five-bedroom estate providing peaceful seclusion right in the heart of Canggu. A crystal-blue pool, expansive open living areas, and attentive staff who cater to every detail.",
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
    "why": "Guest Highlight: \"Stunning, spacious, and kept spotless daily. The team made our stay feel super relaxing and effortless—couldn't recommend it enough!\" — Bali Stay Collection's top coastal pick in Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": true,
    "desc": "Feel the refreshing coastal breeze through the ultra-chic interiors of this four-bedroom Canggu villa. Seamless indoor-outdoor flow, a crystal swimming pool, and thoughtful daily hospitality.",
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
    "why": "Guest Highlight: \"Staying at Villa Daun genuinely felt like staying at a 5-star hotel. Beautiful, extremely clean, in a peaceful area with zero noise, and wonderful staff.\" — 5-star hotel standards verified by Bali Stay Collection.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": true,
    "desc": "Experience the comfort of a private villa paired with five-star hotel housekeeping standards. A tranquil three-bedroom architectural haven in Berawa with zero street noise and pristine attention to detail.",
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
    "why": "Guest Highlight: \"Beautiful Mediterranean interior with a sunlit private pool, warm and friendly staff, and 24-hour security peace of mind.\" — Curated by Bali Stay Collection for Mediterranean living in Pererenan.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Enjoy the pristine charm of sunlit tropical Mediterranean design in Pererenan. Whitewashed walls, a clear private pool, 24-hour gated security, and friendly staff for absolute peace of mind.",
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
    "why": "Guest Highlight: \"Incredibly clean, well-maintained, and having an in-house chef made the food simply incredible. Our true home away from home in Bali!\" — Premier large-group celebration estate in Seminyak by Bali Stay Collection.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Welcome to Seminyak's legendary 'Temple of Leisure'. A grand six-bedroom estate with a spectacular pool, in-house private chef service, and palatial social spaces made for celebration.",
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
    "why": "Guest Highlight: \"Easily one of the best villas in Bali! Private sauna, expansive garden, clean pool, and warm daily care made our family stay an easy 5 stars.\" — The top private wellness and family estate in Berawa by Bali Stay Collection.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Recharge body and mind in this four-bedroom wellness sanctuary in Berawa. Boasting a private Finnish sauna, expansive grassy garden, clear pool, and caring daily staff for the ultimate family holiday.",
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
    "why": "Guest Highlight: \"Truly felt like our own private luxury hotel for 15 guests! The buggy service, daily chef, and incredible staff made it an unforgettable 1000/10 stay.\" — Bali Stay Collection's premier 8-bedroom estate in Berawa.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Five-star resort luxury reserved exclusively for you. A grand eight-bedroom estate in Berawa hosting up to 16 guests, complete with private buggy service, daily in-house chef, and 24/7 security.",
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
    "why": "Guest Highlight: \"The pool and garden were a true highlight—creating a peaceful oasis of our own. Spotless, cozy beds, and genuine hospitality in a quiet central location.\" — Hand-picked by Bali Stay Collection for family gatherings in Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Fall in love with this sunlit five-bedroom Mediterranean haven in Canggu. A peaceful tropical garden, sparkling swimming pool, cloud-soft beds, and genuine heartfelt hospitality.",
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
    "why": "Guest Highlight: \"Better in real life than photos! Felt like a private luxury resort with a huge pool and surround sound. PERFECT and better than 10/10!\" — Top-rated coastal villa by Bali Stay Collection in Canggu.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Rated 'Better than 10/10' by guests. A four-bedroom coastal sanctuary featuring walk-in robe en-suites, a large resort pool wrapped in lush greenery, surround sound, and beach access just steps away.",
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
    "why": "Guest Highlight: \"Private sauna, ice bath, clean pool, and one minute walk to beach clubs. The staff took amazing care of us—the ultimate wellness escape!\" — The premier private health and recovery villa in Canggu by Bali Stay Collection.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "The pinnacle of private wellness and vitality in Canggu. A four-bedroom residence equipped with a private sauna, ice bath, personal gym, and 24/7 security just one minute from premier beach clubs.",
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
    "why": "Guest Highlight: \"Even better than we expected! Beautiful, clean, spacious, and the staff were incredibly friendly and welcoming—a tranquil paradise in Umalas.\" — Chosen by Bali Stay Collection for restful residential calm.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Discover the peaceful charm of Umalas. A spacious, sparkling-clean three-bedroom hideaway thoughtfully designed for calm comfort, offering a quiet retreat after exploring Bali.",
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
    "why": "Guest Highlight: \"The reality truly matches the pictures! Sun-drenched private plunge pool, bohemian vibes, and very responsive hospitality.\" — Bali Stay Collection's top designer loft for couples in Pererenan.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "An artistic one-bedroom bohemian mezzanine loft in quiet Pererenan. A sun-drenched private plunge pool, soaring ceilings, and coastal village peace perfect for creative rejuvenation.",
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
    "why": "Guest Highlight: \"A dream come true. Waking up to stunning views and soothing nature sounds. Lush gardens, pristine pool, and dedicated staff—five stars without a doubt!\" — Flawless 5.0 star rated tropical oasis in Pererenan by Bali Stay Collection.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Wake each morning to tranquil nature sounds and lush emerald garden views. Rated a perfect 5.0 stars, this four-bedroom oasis blends modern luxury with authentic Balinese warmth.",
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
    "why": "Guest Highlight: \"The 20-meter pool was a real highlight—large enough to properly swim! Spacious, comfortable, and private with wonderful staff assistance.\" — The premier 20-meter pool estate in Umalas by Bali Stay Collection.",
    "cancel": "Flexible · Free cancel up to 7 days before check-in",
    "verified": true,
    "updated": "October 2026",
    "pick": false,
    "desc": "Swim freely in an extraordinary 20-meter private swimming pool framed by lush tropical gardens. A grand five-bedroom Umalas estate designed for milestone celebrations and ultimate privacy.",
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
