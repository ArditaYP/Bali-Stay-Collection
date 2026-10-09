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
export const AIRBNB_ONLY_VILLA_IDS = ['villa-habitas',
  'tranquil-sanctuary-pererenan',
  'tropical-canggu-villa',
  'luxe-beach-villa-seminyak',
  'tropical-elegance-seseh',
  'balangan-cliff-villa',
  'yellow-moon-uluwatu',
  'st-lau',
  'casa-kaya-bingin',
  'luxury-tropical-bingin',
  'chic-tropical-bingin',
  'five-bedroom-designer-umalas',
  'villa-angkasa',
  'villa-imala',
  'villa-mahina',
  'khaleela-villas',
  'beyond-the-palms',
  'villa-akar',
  'villa-golden',
  'villa-surga'];

/**
 * Daftar ID villa aktif dengan data autentik Airbnb
 * (13 villa baru hasil import link Airbnb + 5 villa kurasi dari website sebelumnya).
 * Disusun berurutan sehingga 13 villa baru berada di urutan awal untuk kemudahan pengecekan.
 */
export const ACTIVE_AIRBNB_VILLA_IDS = [
  ...AIRBNB_ONLY_VILLA_IDS,
  'villa-samudra-canggu',
  'villa-kayu-raja-seminyak',
  'villa-cendana-seminyak',
  'cliffside-panorama-uluwatu',
  'mandapa-jungle-villa'
];

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
    count: 8,
    badge: 'Chill & Surf',
    layout: 'norm',
    description: 'Quieter neighbour to Canggu with artisan cafés, local lanes, and easy beach breaks.',
    tone: ['#CBB9C9', '#E9DCE6'],
    image: '/destinations/pererenan.jpg',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Canggu & Berawa',
    count: 19,
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
    count: 8,
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
    count: 12,
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
    "id": "coco-bay",
    "name": "Coco Bay",
    "area": "Canggu & Berawa",
    "beds": 8,
    "baths": 8,
    "guests": 16,
    "price": 850,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Celebration",
      "Wellness retreat"
    ],
    "setting": [
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities",
      "Villa manager"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-samudra-canggu/photos/photo-01.jpg",
    "why": "Right by the beach with cafés around the corner, eight bedrooms and a full staff for a big group.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "8-bedroom private pool villa in Canggu & Berawa, for up to 16 guests. Features architect-designed, a dedicated villa manager and a short walk to the beach.",
    "know": []
  },
  {
    "id": "the-bull-house",
    "name": "The Bull House",
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
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Villa manager"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/villa-kayu-raja-seminyak/photos/photo-01.jpg",
    "why": "Six bedrooms, a personal butler, a 15 m pool and a media room, close to Batu Belig beach.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "6-bedroom private pool villa in Umalas & Seminyak, for up to 12 guests. Features a dedicated villa manager and a short walk to the beach.",
    "know": []
  },
  {
    "id": "villa-imala",
    "name": "Villa Imala",
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
    "why": "Spectacular 6BR ocean-view villa in Uluwatu with an 80m² pool, panoramic glass-wall gym, and private spa room minutes from Savaya.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "Ultra-luxury 6-bedroom ocean-view villa in Uluwatu for up to 12 guests with 80m² pool, panoramic fitness gym, and in-villa spa.",
    "know": [
      "80m² private swimming pool with sundeck and rooftop ocean-view daybeds.",
      "Dedicated private spa room and panoramic glass-wall fitness gym.",
      "Minutes away from Savaya Beach Club and Melasti Beach."
    ]
  },
  {
    "id": "house-terra",
    "name": "House Terra",
    "area": "Pererenan",
    "beds": 5,
    "baths": 6,
    "guests": 12,
    "price": 480,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration",
      "Wellness retreat"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Air conditioning",
      "Wellness facilities"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/the-palms-villa-canggu/photos/photo-02.jpg",
    "why": "Designed by Biombo Architects, with a private hot tub and a pool made for long afternoons in Pererenan.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "5-bedroom private pool villa in Pererenan, for up to 12 guests. Features architect-designed and wellness facilities.",
    "know": []
  },
  {
    "id": "villa-kanopi",
    "name": "Villa Kanopi",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 310,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Walk to cafés"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/villa-cendana-seminyak/photos/photo-01.jpg",
    "why": "A brand-new three-bedroom villa on a quiet lane, a short stroll from Umalas restaurants and cafés.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "3-bedroom private pool villa in Umalas & Seminyak, for up to 6 guests. Features cafés within walking distance.",
    "know": []
  },
  {
    "id": "villa-tala",
    "name": "Villa Tala",
    "area": "Pererenan",
    "beds": 1,
    "baths": 1,
    "guests": 2,
    "price": 160,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/st-lau-ubud/photos/photo-02.jpg",
    "why": "A designer one-bedroom for two, near Pererenan restaurants. Simple, quiet and well priced for couples.",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": true,
    "desc": "1-bedroom private pool villa in Pererenan, for up to 2 guests.",
    "know": []
  },
  {
    "id": "berawa-breeze",
    "name": "Berawa Breeze",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 520,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration",
      "Wellness retreat"
    ],
    "setting": [
      "Walkable to cafés",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities",
      "Walk to cafés"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 8 guests. Features a short walk to the beach, cafés within walking distance and wellness facilities.",
    "know": []
  },
  {
    "id": "villa-aless",
    "name": "Villa Aless",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 5,
    "guests": 10,
    "price": 490,
    "tier": "Luxury",
    "trips": [
      "Friends group",
      "Family",
      "Celebration",
      "Wellness retreat"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 10 guests. Features wellness facilities.",
    "know": []
  },
  {
    "id": "villa-vida",
    "name": "Villa Vida",
    "area": "Canggu & Berawa",
    "beds": 5,
    "baths": 5,
    "guests": 20,
    "price": 460,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Rice-field view",
      "Walkable to cafés",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Walk to cafés"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "5-bedroom private pool villa in Canggu & Berawa, for up to 20 guests. Features rice-field views, a short walk to the beach and cafés within walking distance.",
    "know": [
      "Maximum guest number to be confirmed (16 to 20)."
    ]
  },
  {
    "id": "cala-blanca",
    "name": "Cala Blanca",
    "area": "Pererenan",
    "beds": 4,
    "baths": 5,
    "guests": 8,
    "price": 360,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Pererenan, for up to 8 guests. Features architect-designed.",
    "know": []
  },
  {
    "id": "villa-ithaki",
    "name": "Villa Ithaki",
    "area": "Umalas & Seminyak",
    "beds": 5,
    "baths": 5,
    "guests": 9,
    "price": 450,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Wellness retreat"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "5-bedroom private pool villa in Umalas & Seminyak, for up to 9 guests. Features architect-designed and wellness facilities.",
    "know": [
      "Construction work was reported near this villa. We will check the current situation on inspection and tell you before you book."
    ]
  },
  {
    "id": "villa-satiya",
    "name": "Villa Satiya",
    "area": "Pererenan",
    "beds": 4,
    "baths": 5,
    "guests": 8,
    "price": 350,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Rice-field view"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Pererenan, for up to 8 guests. Features rice-field views.",
    "know": []
  },
  {
    "id": "villa-loedi",
    "name": "Villa Loedi",
    "area": "Uluwatu & Bukit",
    "beds": 4,
    "baths": 5,
    "guests": 8,
    "price": 390,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Ocean view"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Uluwatu & Bukit, for up to 8 guests. Features architect-designed and ocean views.",
    "know": []
  },
  {
    "id": "bedouin-house",
    "name": "Bedouin House",
    "area": "Pererenan",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 260,
    "tier": "Premium",
    "trips": [
      "Couples",
      "Honeymoon",
      "Wellness retreat"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Pererenan, for up to 4 guests. Features architect-designed and wellness facilities.",
    "know": []
  },
  {
    "id": "balangan-cliff-villa",
    "name": "Balangan Cliff Villa",
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
      "Chef on request"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/iconic-cliff-top-villa/photos/photo-01.jpg",
    "why": "Perched commandingly on the limestone cliffs above Balangan Beach with uninterrupted 180° ocean panorama and sunset views.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "5-bedroom private pool villa in Uluwatu & Bukit, for up to 10 guests. Features ocean views and a short walk to the beach.",
    "know": [
      "Cliff-edge infinity swimming pool facing the Indian Ocean horizon.",
      "Short walking access down to Balangan surf beach."
    ],
    "aliasId": "iconic-cliff-top-villa"
  },
  {
    "id": "villa-amanora",
    "name": "Villa Amanora",
    "area": "Canggu & Berawa",
    "beds": 5,
    "baths": 6,
    "guests": 10,
    "price": 420,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Walkable to cafés",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Walk to cafés"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "5-bedroom private pool villa in Canggu & Berawa, for up to 10 guests. Features a short walk to the beach and cafés within walking distance.",
    "know": []
  },
  {
    "id": "villa-milana",
    "name": "Villa Milana",
    "area": "Canggu & Berawa",
    "beds": 5,
    "baths": 5,
    "guests": 12,
    "price": 460,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "5-bedroom private pool villa in Canggu & Berawa, for up to 12 guests. Features architect-designed.",
    "know": []
  },
  {
    "id": "villa-taijasa",
    "name": "Villa Taijasa",
    "area": "Umalas & Seminyak",
    "beds": 5,
    "baths": 6,
    "guests": 10,
    "price": 450,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family",
      "Celebration"
    ],
    "setting": [
      "Rice-field view",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Walk to cafés"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "5-bedroom private pool villa in Umalas & Seminyak, for up to 10 guests. Features rice-field views and cafés within walking distance.",
    "know": []
  },
  {
    "id": "casa-kameelya",
    "name": "Casa Kameelya",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 440,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 8 guests.",
    "know": []
  },
  {
    "id": "villa-habitas",
    "name": "Villa Habitas",
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
      "Rice-field view"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/villa-habitas/photos/photo-01.jpg",
    "why": "Built for slow mornings and easy evenings with private lagoon pool, king beds in every room, and walkable cafes in Pererenan.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "4-bedroom private pool villa in Pererenan, for up to 8 guests. Features architect-designed and rice-field views.",
    "know": [
      "Walkable to trendy cafes and restaurants in Pererenan.",
      "A nanny service and pool fence are available on request through our concierge.",
      "Free parking fits up to 2 cars plus scooters."
    ],
    "aliasId": "villa-habitas"
  },
  {
    "id": "villa-mango-2",
    "name": "Villa Mango 2",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 5,
    "guests": 8,
    "price": 290,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Walkable to cafés",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Walk to cafés"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 8 guests. Features a short walk to the beach and cafés within walking distance.",
    "know": []
  },
  {
    "id": "padang-senang",
    "name": "Padang Senang",
    "area": "Uluwatu & Bukit",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 330,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Walkable to cafés",
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Walk to cafés"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "3-bedroom private pool villa in Uluwatu & Bukit, for up to 6 guests. Features a short walk to the beach and cafés within walking distance.",
    "know": []
  },
  {
    "id": "villa-alva",
    "name": "Villa Alva",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 360,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Walk to cafés"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "3-bedroom private pool villa in Umalas & Seminyak, for up to 6 guests. Features architect-designed and cafés within walking distance.",
    "know": []
  },
  {
    "id": "villa-le-papillon",
    "name": "Villa LE PAPILLON",
    "area": "Umalas & Seminyak",
    "beds": 2,
    "baths": 3,
    "guests": 4,
    "price": 310,
    "tier": "Premium",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Walk to cafés"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Umalas & Seminyak, for up to 4 guests. Features architect-designed and cafés within walking distance.",
    "know": []
  },
  {
    "id": "casa-noema",
    "name": "Casa Noema",
    "area": "Umalas & Seminyak",
    "beds": 2,
    "baths": 3,
    "guests": 4,
    "price": 320,
    "tier": "Premium",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Villa manager"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Umalas & Seminyak, for up to 4 guests. Features a dedicated villa manager.",
    "know": []
  },
  {
    "id": "villa-angkasa",
    "name": "Villa Angkasa",
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
      "Chef on request"
    ],
    "tone": [
      "#C7CDBB",
      "#E2E7D6"
    ],
    "img": "/airbnb/angkasa-ubud/photos/photo-01.jpg",
    "why": "Built around a dramatic infinity pool that hovers above the Ayung River valley rainforest canopy with generous living pavilions.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "5-bedroom private pool villa in Ubud, for up to 10 guests. Features rice-field views.",
    "know": [
      "Spectacular unhindered jungle and river valley vistas.",
      "Generous indoor-outdoor dining areas ideal for family retreats."
    ],
    "aliasId": "angkasa-ubud"
  },
  {
    "id": "villa-daun-by-teduh",
    "name": "Villa Daun (by Teduh)",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 5,
    "guests": 8,
    "price": 250,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 8 guests.",
    "know": [
      "Construction work was reported near this villa. We will check the current situation on inspection and tell you before you book."
    ]
  },
  {
    "id": "villa-vida-mira",
    "name": "Villa Vida Mira",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 4,
    "guests": 9,
    "price": 340,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 9 guests. Features a short walk to the beach.",
    "know": []
  },
  {
    "id": "st-lau",
    "name": "St. Lau",
    "area": "Ubud",
    "beds": 3,
    "baths": 3,
    "guests": 8,
    "price": 310,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#C7CDBB",
      "#E2E7D6"
    ],
    "img": "/airbnb/st-lau-ubud/photos/photo-01.jpg",
    "why": "A signature private sanctuary in Ubud tucked away in serene surroundings with private pool deck and calming retreat spaces.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "3-bedroom private pool villa in Ubud, for up to 8 guests.",
    "know": [
      "Open-plan living spaces flow onto private pool deck surrounded by tropical greenery.",
      "Conveniently close to Ubud centre and Monkey Forest sanctuary."
    ],
    "aliasId": "st-lau-ubud"
  },
  {
    "id": "villa-serenity",
    "name": "Villa Serenity",
    "area": "Canggu & Berawa",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 310,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family",
      "Wellness retreat"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Wellness facilities"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "3-bedroom private pool villa in Canggu & Berawa, for up to 6 guests. Features wellness facilities.",
    "know": []
  },
  {
    "id": "t-ra-bingin-villa",
    "name": "TĀRA Bingin Villa",
    "area": "Uluwatu & Bukit",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 330,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Uluwatu & Bukit, for up to 4 guests.",
    "know": []
  },
  {
    "id": "villa-halle",
    "name": "Villa Halle",
    "area": "Seseh",
    "beds": 2,
    "baths": 3,
    "guests": 4,
    "price": 380,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning"
    ],
    "tone": [
      "#B8C9B2",
      "#DCE8D6"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Seseh, for up to 4 guests. Features a short walk to the beach.",
    "know": [
      "Construction work was reported near this villa. We will check the current situation on inspection and tell you before you book."
    ]
  },
  {
    "id": "alua-taupe",
    "name": "Alua Taupe",
    "area": "Umalas & Seminyak",
    "beds": 1,
    "baths": 1,
    "guests": 2,
    "price": 270,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Air conditioning",
      "Villa manager"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "1-bedroom private pool villa in Umalas & Seminyak, for up to 2 guests. Features a dedicated villa manager.",
    "know": []
  },
  {
    "id": "lady-swan-villa",
    "name": "Lady Swan Villa",
    "area": "Canggu & Berawa",
    "beds": 4,
    "baths": 3,
    "guests": 8,
    "price": 230,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Canggu & Berawa, for up to 8 guests.",
    "know": []
  },
  {
    "id": "yellow-moon",
    "name": "Yellow Moon",
    "area": "Uluwatu & Bukit",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 240,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family",
      "Wellness retreat"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "3-bedroom private pool villa in Uluwatu & Bukit, for up to 6 guests. Features wellness facilities.",
    "know": []
  },
  {
    "id": "casa-nala",
    "name": "Casa Nala",
    "area": "Umalas & Seminyak",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 220,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon",
      "Wellness retreat"
    ],
    "setting": [
      "Ocean view",
      "Walkable to cafés"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Wellness facilities",
      "Walk to cafés"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Umalas & Seminyak, for up to 4 guests. Features ocean views, cafés within walking distance and wellness facilities.",
    "know": []
  },
  {
    "id": "chateau-retreat",
    "name": "Chateau Retreat",
    "area": "Umalas & Seminyak",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 170,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Air conditioning"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Umalas & Seminyak, for up to 4 guests. Features architect-designed.",
    "know": []
  },
  {
    "id": "casa-k-ya",
    "name": "CASA KĀYA",
    "area": "Uluwatu & Bukit",
    "beds": 1,
    "baths": 2,
    "guests": 2,
    "price": 320,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "1-bedroom private pool villa in Uluwatu & Bukit, for up to 2 guests.",
    "know": []
  },
  {
    "id": "pererenan-four-bedroom-villa",
    "name": "Pererenan Four-Bedroom Villa",
    "area": "Pererenan",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 280,
    "tier": "Standard",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "4-bedroom private pool villa in Pererenan, for up to 8 guests.",
    "know": []
  },
  {
    "id": "villa-vaya",
    "name": "Villa Vaya",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 230,
    "tier": "Standard",
    "trips": [
      "Friends group",
      "Family"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "3-bedroom private pool villa in Umalas & Seminyak, for up to 6 guests.",
    "know": []
  },
  {
    "id": "villa-infinity",
    "name": "Villa Infinity",
    "area": "Canggu & Berawa",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 240,
    "tier": "Standard",
    "trips": [
      "Couples",
      "Wellness retreat"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request",
      "Air conditioning",
      "Wellness facilities"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Canggu & Berawa, for up to 4 guests. Features wellness facilities.",
    "know": []
  },
  {
    "id": "terea",
    "name": "Terea",
    "area": "Canggu & Berawa",
    "beds": 2,
    "baths": 3,
    "guests": 4,
    "price": 180,
    "tier": "Standard",
    "trips": [
      "Couples"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Chef on request",
      "Air conditioning"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "2-bedroom private pool villa in Canggu & Berawa, for up to 4 guests. Features architect-designed.",
    "know": []
  },
  {
    "id": "villa-solani",
    "name": "Villa Solani",
    "area": "Pererenan",
    "beds": 1,
    "baths": 2,
    "guests": 2,
    "price": 220,
    "tier": "Standard",
    "trips": [
      "Couples"
    ],
    "setting": [
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "Daily staff",
      "Chef on request"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "1-bedroom private pool villa in Pererenan, for up to 2 guests.",
    "know": []
  },
  {
    "id": "aozora-villas",
    "name": "Aozora Villas",
    "area": "Uluwatu & Bukit",
    "beds": 1,
    "baths": 1,
    "guests": 2,
    "price": 190,
    "tier": "Standard",
    "trips": [
      "Couples"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff",
      "Air conditioning"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "1-bedroom private pool villa in Uluwatu & Bukit, for up to 2 guests.",
    "know": []
  },
  {
    "id": "alua-loft",
    "name": "Alua Loft",
    "area": "Umalas & Seminyak",
    "beds": 1,
    "baths": 1,
    "guests": 2,
    "price": 150,
    "tier": "Standard",
    "trips": [
      "Couples"
    ],
    "setting": [],
    "am": [
      "Private pool",
      "Daily staff"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "",
    "why": "",
    "cancel": "",
    "verified": false,
    "updated": "",
    "pick": false,
    "desc": "1-bedroom private pool villa in Umalas & Seminyak, for up to 2 guests.",
    "know": [
      "The beach is about 2.3 km away, so a scooter or driver is useful."
    ]
  },
  {
    "id": "villa-samudra-canggu",
    "name": "Villa Samudra",
    "area": "Canggu & Berawa",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 280,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Couples",
      "Surf getaway"
    ],
    "setting": [
      "Walk to the beach"
    ],
    "am": [
      "Private pool",
      "High-speed WiFi",
      "Full kitchen",
      "Air conditioning",
      "Daily housekeeping",
      "Near the beach"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/villa-samudra-canggu/photos/photo-01.jpg",
    "why": "Boho-chic 3-bedroom sanctuary steps from Echo Beach with private turquoise pool and sun deck.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "3-bedroom private pool villa in Canggu & Berawa, steps from Echo Beach with custom rattan furnishings and lush garden.",
    "know": [
      "5-minute stroll to Echo Beach surf break.",
      "Private pool with sun deck framed by tropical palms."
    ]
  },
  {
    "id": "villa-kayu-raja-seminyak",
    "name": "Villa Kayu Raja",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 3,
    "guests": 6,
    "price": 320,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Family",
      "Dining & nightlife"
    ],
    "setting": [
      "Walk to dining"
    ],
    "am": [
      "Private pool",
      "Full kitchen",
      "Air conditioning",
      "High-speed WiFi",
      "Daily housekeeping",
      "Near the beach"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/villa-kayu-raja-seminyak/photos/photo-01.jpg",
    "why": "Refined 3-bedroom pool villa in Petitenget within walking distance to Seminyak's world-class dining.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "3-bedroom private pool villa in Petitenget, Seminyak. Features central pool courtyard and master en-suite terrazzo bathtubs.",
    "know": [
      "Located in prime Petitenget dining strip.",
      "Private pool with timber sun deck."
    ]
  },
  {
    "id": "villa-cendana-seminyak",
    "name": "Villa Cendana",
    "area": "Umalas & Seminyak",
    "beds": 2,
    "baths": 2,
    "guests": 4,
    "price": 230,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Honeymoon",
      "Romantic"
    ],
    "setting": [
      "Quiet lane"
    ],
    "am": [
      "Private pool",
      "Romantic outdoor bathtub",
      "Air conditioning",
      "High-speed WiFi",
      "Daily housekeeping"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/villa-cendana-seminyak/photos/photo-01.jpg",
    "why": "Intimate 2-bedroom romantic retreat with private plunge pool and open-air garden stone bathtub.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "2-bedroom intimate romantic pool villa in Kayu Aya, Seminyak with private plunge pool and garden bathroom.",
    "know": [
      "Perfect for couples and honeymooners.",
      "Private plunge pool with garden stone tub."
    ]
  },
  {
    "id": "cliffside-panorama-uluwatu",
    "name": "Cliffside Panorama",
    "area": "Uluwatu & Bukit",
    "beds": 4,
    "baths": 4,
    "guests": 8,
    "price": 540,
    "tier": "Luxury",
    "trips": [
      "Celebration",
      "Friends group",
      "Surf retreat"
    ],
    "setting": [
      "Ocean view",
      "Clifftop"
    ],
    "am": [
      "Infinity pool",
      "Ocean view",
      "Private chef on request",
      "Air conditioning",
      "High-speed WiFi",
      "Daily housekeeping"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/cliffside-panorama-uluwatu/photos/photo-01.jpg",
    "why": "Ultra-luxurious 4-bedroom cliff villa overlooking Bingin Beach and the Indian Ocean with horizon infinity pool.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "4-bedroom luxury cliff-edge villa in Uluwatu, perched above Bingin Beach with infinity pool and sunset panorama.",
    "know": [
      "Uninterrupted 180° Indian Ocean sunset view.",
      "Horizon infinity swimming pool."
    ]
  },
  {
    "id": "mandapa-jungle-villa",
    "name": "Mandapa Jungle Villa",
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
      "Jungle valley",
      "River view"
    ],
    "am": [
      "Private pool",
      "Jungle view",
      "River valley view",
      "High-speed WiFi",
      "Full kitchen",
      "Air conditioning"
    ],
    "tone": [
      "#C7CDBB",
      "#E2E7D6"
    ],
    "img": "/airbnb/mandapa-jungle-villa/photos/photo-01.jpg",
    "why": "Architectural bamboo sanctuary suspended over the Ayung River valley and lush emerald jungle canopies.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "2-bedroom sustainable bamboo architectural villa on Sayan Ridge, Ubud with private pool and river views.",
    "know": [
      "Spectacular open-concept bamboo architecture.",
      "Unobstructed jungle and Ayung River valley view."
    ]
  },
  {
    "id": "tranquil-sanctuary-pererenan",
    "name": "Tranquil 1BR Sanctuary in Prime Pererenan",
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
      "Garden setting"
    ],
    "am": [
      "Private pool",
      "High-speed WiFi",
      "Kitchenette",
      "Daily housekeeping"
    ],
    "tone": [
      "#CBB9C9",
      "#E9DCE6"
    ],
    "img": "/airbnb/tranquil-sanctuary-pererenan/photos/photo-01.jpg",
    "why": "A serene 1-bedroom oasis in prime Pererenan with private pool and effortless walk to artisan cafes.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "1-bedroom intimate sanctuary in prime Pererenan for up to 2 guests with private pool.",
    "know": [
      "Located in a tranquil lane with minimal traffic.",
      "Walking distance to top Pererenan cafés and bakeries."
    ]
  },
  {
    "id": "tropical-canggu-villa",
    "name": "Modern Tropical 4BR Villa in Central Canggu",
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
      "Village setting"
    ],
    "am": [
      "Private pool",
      "Full kitchen",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#D8C9A8",
      "#EFE6CF"
    ],
    "img": "/airbnb/tropical-canggu-villa/photos/photo-01.jpg",
    "why": "Heart-of-Canggu location, private sparkling pool, and high guest satisfaction rating of 4.93 with 135+ reviews.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "4-bedroom modern tropical villa in central Canggu for up to 8 guests with private pool.",
    "know": [
      "Moments from Canggu's best dining and beach clubs.",
      "Spacious living pavilion perfect for groups."
    ]
  },
  {
    "id": "luxe-beach-villa-seminyak",
    "name": "Luxe & Stylish 3BR Villa Near Beach",
    "area": "Umalas & Seminyak",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 320,
    "tier": "Deluxe",
    "trips": [
      "Friends group",
      "Beach lovers"
    ],
    "setting": [
      "Short walk to beach"
    ],
    "am": [
      "Private pool",
      "Near the beach",
      "Full kitchen",
      "Air conditioning"
    ],
    "tone": [
      "#D5B8A8",
      "#EFDCD2"
    ],
    "img": "/airbnb/luxe-beach-villa-seminyak/photos/photo-01.jpg",
    "why": "Prime Seminyak location just steps from the sand, sunset beach clubs, and boutique shopping.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "3-bedroom stylish villa in Seminyak steps from the beach for up to 6 guests with pool.",
    "know": [
      "Steps from Seminyak Beach and famous beach clubs.",
      "Open-air tropical living area with private pool."
    ]
  },
  {
    "id": "tropical-elegance-seseh",
    "name": "Tropical Elegance 2BR Villa by Beach",
    "area": "Seseh",
    "beds": 2,
    "baths": 3,
    "guests": 4,
    "price": 245,
    "tier": "Deluxe",
    "trips": [
      "Couples",
      "Quiet retreat"
    ],
    "setting": [
      "Coastal village",
      "Short walk to beach"
    ],
    "am": [
      "Private pool",
      "Ocean breeze",
      "High-speed WiFi",
      "Full kitchen"
    ],
    "tone": [
      "#B8C9B2",
      "#DCE8D6"
    ],
    "img": "/airbnb/tropical-elegance-seseh/photos/photo-01.jpg",
    "why": "Spectacular 4.98 rating in peaceful Seseh Beach, combining calm village living with immediate beach access.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "2-bedroom elegant villa in Seseh for up to 4 guests with private pool and ocean breezes.",
    "know": [
      "Nestled in peaceful Seseh, free from heavy traffic.",
      "Short stroll to black-sand coastline and coastal walks."
    ]
  },
  {
    "id": "yellow-moon-uluwatu",
    "name": "Yellow Moon Tropical Sanctuary",
    "area": "Uluwatu & Bukit",
    "beds": 3,
    "baths": 4,
    "guests": 6,
    "price": 365,
    "tier": "Premium",
    "trips": [
      "Friends group",
      "Surf & Sunsets"
    ],
    "setting": [
      "Hillside breezes"
    ],
    "am": [
      "Private pool",
      "Ocean breeze",
      "Full kitchen",
      "High-speed WiFi"
    ],
    "tone": [
      "#9FB7C7",
      "#D5E2EA"
    ],
    "img": "/airbnb/yellow-moon-uluwatu/photos/photo-01.jpg",
    "why": "Sunken lounge, generous timber pool deck, and warm island architecture nestled in Uluwatu.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "3-bedroom tropical sanctuary in Uluwatu for up to 6 guests with pool.",
    "know": [
      "Convenient access to top surf breaks in Uluwatu and Padang Padang.",
      "Sunken outdoor lounge beside the swimming pool."
    ]
  },
  {
    "id": "casa-kaya-bingin",
    "name": "CASA KĀYA Tropical Villa",
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
      "Cliffside village"
    ],
    "am": [
      "Private pool",
      "High-speed WiFi",
      "Kitchenette",
      "Air conditioning"
    ],
    "tone": [
      "#D5E2EA",
      "#9FB7C7"
    ],
    "img": "/airbnb/casa-kaya-bingin/photos/photo-01.jpg",
    "why": "Boutique 1-bedroom tropical aesthetic sanctuary minutes from Bingin's famous turquoise beaches.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "1-bedroom boutique villa near Bingin Beach for up to 2 guests with private pool.",
    "know": [
      "Minutes from Bingin Beach stairs and cafés.",
      "Minimalist Mediterranean-inspired architectural details."
    ]
  },
  {
    "id": "luxury-tropical-bingin",
    "name": "Luxury 3BR Tropical Villa in Bingin",
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
      "Near beach"
    ],
    "am": [
      "Private pool",
      "Full kitchen",
      "Air conditioning",
      "High-speed WiFi"
    ],
    "tone": [
      "#A9B9C9",
      "#D5E2EA"
    ],
    "img": "/airbnb/luxury-tropical-bingin/photos/photo-01.jpg",
    "why": "Lush garden pool, premium finishes, and breezy open-plan living right in Bingin.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "3-bedroom luxury villa in Bingin for up to 6 guests with private pool.",
    "know": [
      "Surrounded by tropical frangipani and palm trees.",
      "Easy access to Bingin and Padang Padang beaches."
    ]
  },
  {
    "id": "chic-tropical-bingin",
    "name": "2BR Chic Tropical Villa Bingin",
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
      "Near beach"
    ],
    "am": [
      "Private pool",
      "High-speed WiFi",
      "Full kitchen",
      "Air conditioning"
    ],
    "tone": [
      "#C5D3DC",
      "#9FB7C7"
    ],
    "img": "/airbnb/chic-tropical-bingin/photos/photo-01.jpg",
    "why": "Polished concrete, warm timber, and 4.97 guest rating minutes from Bingin Beach.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": false,
    "desc": "2-bedroom chic villa in Bingin for up to 4 guests with private pool.",
    "know": [
      "Exceptional 4.97 rating across 30+ verified guest reviews.",
      "Minutes from Bingin surf breaks and sunset cliff spots."
    ]
  },
  {
    "id": "five-bedroom-designer-umalas",
    "name": "Five Bedroom Designer Villa Umalas",
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
      "Full kitchen",
      "Air conditioning"
    ],
    "tone": [
      "#DFD3C3",
      "#D5B8A8"
    ],
    "img": "/airbnb/five-bedroom-designer-umalas/photos/photo-01.jpg",
    "why": "Grand 5-bedroom architectural estate with massive pool and dedicated staff right next to Berawa.",
    "cancel": "Free reschedule",
    "verified": true,
    "updated": "Oct 2026",
    "pick": true,
    "desc": "5-bedroom designer estate in Umalas for up to 9 guests with huge pool and staff.",
    "know": [
      "Features large 18-meter swimming pool and manicured estate grounds.",
      "Prime location bridging quiet Umalas and vibrant Berawa."
    ]
  },
  {
    id: 'villa-mahina',
    name: 'Villa Mahina – Luxury 3BR 400m Walk to Berawa Beach & Finns',
    tier: 'Luxury',
    price: 380,
    cancel: 'Moderate · Free cancel up to 14 days before check-in',
    area: 'Canggu & Berawa',
    beds: 3,
    baths: 2.5,
    guests: 6,
    trips: ['Design & style', 'Couples & honeymoons', 'Family'],
    setting: ['Walk to beach'],
    am: ["Private pool","Sunken lounge","Walk to beach (400m)","Double-glazed soundproof windows","Air conditioning","High-speed WiFi","Full kitchen","Daily housekeeping"],
    pick: true,
    tone: ["#2C3539","#4A5D4E"],
    audit: 12,
    updated: 'October 2026',
    desc: 'Villa kontemporer 3 kamar mewah di jantung Berawa, hanya 400 meter dari Pantai Berawa dan Finns Beach Club. Dilengkapi kolam renang pribadi, sunken lounge, dan jendela kedap suara total.',
    img: '/airbnb/villa-mahina/photos/photo-01.jpg',
    images: [
      '/airbnb/villa-mahina/photos/photo-01.jpg',
      '/airbnb/villa-mahina/photos/photo-02.jpg',
      '/airbnb/villa-mahina/photos/photo-03.jpg',
      '/airbnb/villa-mahina/photos/photo-04.jpg',
      '/airbnb/villa-mahina/photos/photo-05.jpg'
    ]
  },
  {
    id: 'khaleela-villas',
    name: 'Khaleela Villas – Desert-Inspired 2BR Oasis in Canggu',
    tier: 'Deluxe',
    price: 195,
    cancel: 'Moderate · Free cancel up to 14 days before check-in',
    area: 'Canggu & Berawa',
    beds: 2,
    baths: 2,
    guests: 4,
    trips: ['Design & style', 'Couples & honeymoons', 'Family'],
    setting: ['Tropical oasis'],
    am: ["Private pool","Desert-inspired architecture","Outdoor tropical shower","Full kitchen","Air conditioning","High-speed WiFi","Daily housekeeping","Dedicated team"],
    pick: true,
    tone: ["#C4A482","#EED9C4"],
    audit: 12,
    updated: 'October 2026',
    desc: 'Oase eksotis bertema gurun di pusat Canggu yang semarak. Menghadirkan 2 kamar tidur nyaman, kolam renang pribadi, kamar mandi terbuka tropis, dan dapur lengkap.',
    img: '/airbnb/khaleela-villas/photos/photo-01.jpg',
    images: [
      '/airbnb/khaleela-villas/photos/photo-01.jpg',
      '/airbnb/khaleela-villas/photos/photo-02.jpg',
      '/airbnb/khaleela-villas/photos/photo-03.jpg',
      '/airbnb/khaleela-villas/photos/photo-04.jpg',
      '/airbnb/khaleela-villas/photos/photo-05.jpg'
    ]
  },
  {
    id: 'beyond-the-palms',
    name: 'Beyond the Palms – High-Tech 4BR Luxury Villa with Rooftop',
    tier: 'Luxury',
    price: 720,
    cancel: 'Moderate · Free cancel up to 14 days before check-in',
    area: 'Canggu & Berawa',
    beds: 4,
    baths: 4,
    guests: 8,
    trips: ['Design & style', 'Couples & honeymoons', 'Family'],
    setting: ['Private retreat'],
    am: ["Private pool (45m²)","Rooftop jacuzzi","Yoga deck","Sonos sound system","86\" 4K Smart TV","SMEG kitchen","Outdoor cinema projector","Private BBQ grill"],
    pick: true,
    tone: ["#1F2937","#111827"],
    audit: 12,
    updated: 'October 2026',
    desc: 'Villa berteknologi tinggi 4 kamar baru di Canggu dengan kolam renang 45m², rooftop jacuzzi, sound system Sonos, TV 4K 86 inci, dan area barbekyu pribadi.',
    img: '/airbnb/beyond-the-palms/photos/photo-01.jpg',
    images: [
      '/airbnb/beyond-the-palms/photos/photo-01.jpg',
      '/airbnb/beyond-the-palms/photos/photo-02.jpg',
      '/airbnb/beyond-the-palms/photos/photo-03.jpg',
      '/airbnb/beyond-the-palms/photos/photo-04.jpg',
      '/airbnb/beyond-the-palms/photos/photo-05.jpg'
    ]
  },
  {
    id: 'villa-akar',
    name: 'Villa Akar – Elegant 4BR Contemporary Hideaway in Berawa',
    tier: 'Luxury',
    price: 490,
    cancel: 'Moderate · Free cancel up to 14 days before check-in',
    area: 'Canggu & Berawa',
    beds: 4,
    baths: 4.5,
    guests: 8,
    trips: ['Design & style', 'Couples & honeymoons', 'Family'],
    setting: ['Central Berawa'],
    am: ["Private pool","Guest Favorite 5.0 rating","Flexible enclosed/open living","Designer architecture by Teduh","En-suite master suites","High-speed WiFi","Daily housekeeping"],
    pick: true,
    tone: ["#3A352F","#5A5249"],
    audit: 12,
    updated: 'October 2026',
    desc: 'Villa 4 kamar tidur elegan kontemporer berpredikat Guest Favorite (5.0 bintang) di jantung Berawa. Memiliki ruang keluarga fleksibel ber-AC, kolam renang asri, dan staf berdedikasi.',
    img: '/airbnb/villa-akar/photos/photo-01.jpg',
    images: [
      '/airbnb/villa-akar/photos/photo-01.jpg',
      '/airbnb/villa-akar/photos/photo-02.jpg',
      '/airbnb/villa-akar/photos/photo-03.jpg',
      '/airbnb/villa-akar/photos/photo-04.jpg',
      '/airbnb/villa-akar/photos/photo-05.jpg'
    ]
  },
  {
    id: 'villa-golden',
    name: 'Villa Golden – Modern Chic 2BR Villa Opposite FINNS Club',
    tier: 'Premium',
    price: 230,
    cancel: 'Moderate · Free cancel up to 14 days before check-in',
    area: 'Canggu & Berawa',
    beds: 2,
    baths: 2,
    guests: 4,
    trips: ['Design & style', 'Couples & honeymoons', 'Family'],
    setting: ['Walk to cafes'],
    am: ["Private pool","Opposite FINNS Recreation Club","Modern chic interior","Both en-suite bedrooms","Fully equipped kitchen","Air conditioning","Daily housekeeping"],
    pick: true,
    tone: ["#8C704B","#B89B72"],
    audit: 12,
    updated: 'October 2026',
    desc: 'Villa 2 kamar bergaya modern chic tepat di seberang Finns Recreation Club di Berawa. Dilengkapi kolam renang pribadi, interior mewah, dan staf pelayanan harian.',
    img: '/airbnb/villa-golden/photos/photo-01.jpg',
    images: [
      '/airbnb/villa-golden/photos/photo-01.jpg',
      '/airbnb/villa-golden/photos/photo-02.jpg',
      '/airbnb/villa-golden/photos/photo-03.jpg',
      '/airbnb/villa-golden/photos/photo-04.jpg',
      '/airbnb/villa-golden/photos/photo-05.jpg'
    ]
  },
  {
    id: 'villa-surga',
    name: 'Villa Surga – Serene 4BR Sanctuary with Private Pool in Ubud',
    tier: 'Premium',
    price: 320,
    cancel: 'Moderate · Free cancel up to 14 days before check-in',
    area: 'Ubud',
    beds: 4,
    baths: 4,
    guests: 8,
    trips: ['Design & style', 'Couples & honeymoons', 'Family'],
    setting: ['Jungle & nature'],
    am: ["Private infinity pool","Traditional Balinese entrance","Lush tropical valley view","Full villa staffing","All en-suite bathrooms","Spacious open living","Daily housekeeping"],
    pick: true,
    tone: ["#2F4F4F","#3B6E59"],
    audit: 12,
    updated: 'October 2026',
    desc: 'Sanctuary tropis privat 4 kamar di kawasan asri Ubud. Menyuguhkan kolam renang infinity pribadi, suasana hijau yang tenang, staf lengkap, dan akses mudah ke jantung budaya Ubud.',
    img: '/airbnb/villa-surga/photos/photo-01.jpg',
    images: [
      '/airbnb/villa-surga/photos/photo-01.jpg',
      '/airbnb/villa-surga/photos/photo-02.jpg',
      '/airbnb/villa-surga/photos/photo-03.jpg',
      '/airbnb/villa-surga/photos/photo-04.jpg',
      '/airbnb/villa-surga/photos/photo-05.jpg'
    ]
  }
];
