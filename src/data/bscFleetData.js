/**
 * bscFleetData.js
 * Basis data resmi armada mobil, sewa skuter, paket wellness,
 * dan pengalaman immersion untuk frontpage Bali Stay Collection (Hero & Concierge Services).
 */

export const CAR_FLEET_DATA = [
  {
    id: 'airport-transfer',
    name: 'Airport Transfer',
    shortName: 'Airport Transfer',
    category: 'Airport VIP Service',
    badge: 'Meet & Greet',
    seats: 4,
    luggage: 4,
    transmission: 'Automatic',
    fuel: 'Included',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      'Ngurah Rai (DPS) Airport Meet & Greet',
      'Luggage Escort & Direct Villa Drop',
      'Air-Conditioned Premium Vehicle',
      'Complimentary Cold Water & Wet Towels'
    ],
    priceIdr: 'Rp 450.000',
    priceUsd: '~$30 USD',
    period: 'one way',
    description: 'Layanan penjemputan dan pengantaran bandara Ngurah Rai (DPS) bebas antre dengan supir pribadi siap menyambut di gerbang kedatangan.'
  },
  {
    id: 'private-driver-full-day',
    name: 'Private Driver Full Day',
    shortName: 'Private Driver Full Day',
    category: '10h Island Charter',
    badge: 'Most Flexible',
    seats: 6,
    luggage: 4,
    transmission: 'Automatic',
    fuel: 'Petrol & Parking Included',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      '10 Hours Dedicated Standby & Custom Route',
      'English-Speaking Licensed Local Driver',
      'Petrol / BBM & Parking Fees Included',
      'Flexible Itinerary Across All Bali Regions'
    ],
    priceIdr: 'Rp 850.000',
    priceUsd: '~$55 USD',
    period: '10 hours',
    description: 'Supir pribadi berlisensi berbahasa Inggris siap mengantar Anda menjelajahi berbagai destinasi eksotis Bali selama 10 jam penuh.'
  },
  {
    id: 'luxury-mpv-with-driver',
    name: 'Luxury MPV with Driver',
    shortName: 'Luxury MPV with Driver',
    category: 'VIP Executive Lounge',
    badge: 'VIP Class',
    seats: 5,
    luggage: 4,
    transmission: 'Automatic',
    fuel: 'Petrol / Hybrid',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      'Toyota Alphard / Vellfire VIP Cabin',
      'Ottoman Captain Reclining Leather Seats',
      'In-Car High-Speed Wi-Fi & Cold Refreshments',
      'Professional Uniformed Executive Chauffeur'
    ],
    priceIdr: 'Rp 2.200.000',
    priceUsd: '~$140 USD',
    period: '10 hours',
    description: 'Kemewahan kelas satu dengan MPV premium (Toyota Alphard / Vellfire), kursi kapten elektrik ottoman, dan pengemudi VIP profesional.'
  },
  {
    id: 'self-drive-car',
    name: 'Self-drive Car',
    shortName: 'Self-drive Car',
    category: 'Self-Drive Rental',
    badge: 'Independent Trip',
    seats: 5,
    luggage: 3,
    transmission: 'Automatic',
    fuel: 'Self-Service',
    driverOption: 'Self Drive (Lepas Kunci)',
    amenities: [
      'Clean & Well-Maintained Automatic Car',
      'Free Villa Delivery & Return in Key Areas',
      'Comprehensive Insurance Coverage Included',
      'Requires Valid Driving License / IDP'
    ],
    priceIdr: 'Rp 400.000',
    priceUsd: '~$25 USD',
    period: '24 hours',
    description: 'Sewa mobil lepas kunci (nyetir sendiri) dengan unit mobil bersih, terawat, dan pengantaran langsung ke villa Anda.'
  }
];

export const MOTORBIKE_FLEET_DATA = [
  {
    id: 'daily-scooter',
    name: 'Daily Scooter',
    shortName: 'Daily Scooter',
    category: 'Daily Rental',
    badge: 'Flexible Daily',
    engine: '110cc–125cc Automatic (Scoopy / Vario)',
    storage: 'Underseat trunk & phone mount',
    priceIdr: 'Rp 120.000',
    priceUsd: '~$8 USD',
    period: 'per day',
    description: 'Skuter matik harian lincah dan hemat bahan bakar, sangat ideal untuk mobilitas santai ke kafe dan pantai terdekat.'
  },
  {
    id: 'weekly-scooter',
    name: 'Weekly Scooter',
    shortName: 'Weekly Scooter',
    category: '7-Day Package',
    badge: 'Best Value Deal',
    engine: '110cc–125cc Automatic (Scoopy / Vario)',
    storage: 'Underseat trunk & phone mount',
    priceIdr: 'Rp 650.000',
    priceUsd: '~$42 USD',
    period: 'per 7 days',
    description: 'Paket sewa mingguan hemat untuk liburan santai 7 hari di Bali, gratis antar-jemput ke villa Anda.'
  },
  {
    id: 'premium-scooter',
    name: 'Premium Scooter',
    shortName: 'Premium Scooter',
    category: 'Maxi Touring Class',
    badge: 'Maxi Comfort',
    engine: '155cc–250cc (XMAX / NMAX / Vespa)',
    storage: 'Large double-helmet storage trunk',
    priceIdr: 'Rp 280.000',
    priceUsd: '~$18 USD',
    period: 'per day',
    description: 'Skuter premium bertenaga dengan kenyamanan maksimal untuk perjalanan jarak jauh dan rute perbukitan Uluwatu atau Ubud.'
  }
];

export const PICKUP_LOCATIONS_DATA = [
  {
    id: 'dps-airport',
    title: 'Ngurah Rai Airport (DPS) VIP Meet & Greet',
    subtitle: 'Arrival gate greeting with personalized name board & luggage escort',
    icon: '✈️',
    badge: 'Airport VIP'
  },
  {
    id: 'villa-transfer',
    title: 'Direct Villa Delivery & In-Stay Transfer',
    subtitle: 'Pickup or drop-off at any villa across Seminyak, Canggu, Ubud, Uluwatu, or Sanur',
    icon: '🏡',
    badge: 'Villa to Villa'
  },
  {
    id: 'day-tour',
    title: 'Full Island Custom Day Tour (10 Hours)',
    subtitle: 'Dedicated private chauffeur ready at your villa doorstep for your personal Bali itinerary',
    icon: '🗺️',
    badge: '10h Daily Charter'
  }
];

export const CHAUFFEUR_OPTIONS_DATA = [
  {
    id: 'with-chauffeur',
    title: 'With Dedicated Private English Chauffeur',
    subtitle: 'Includes verified licensed local driver, all fuel/petrol, road tolls, and parking fees',
    badge: 'Recommended VIP',
    isDefault: true
  },
  {
    id: 'self-drive',
    title: 'Self-Drive Luxury Rental',
    subtitle: 'Requires valid International Driving Permit (IDP) and refundable security deposit',
    badge: 'IDP Required',
    isDefault: false
  }
];

export const PACKAGES_DATA = [
  {
    id: 'balinese-ritual-massage',
    name: 'Balinese Ritual Massage',
    title: 'Balinese Ritual Massage',
    badge: 'Signature Wellness',
    tag: 'Traditional Holistic Massage',
    desc: 'Pijat relaksasi tradisional khas Bali menggunakan minyak herbal alami untuk melemaskan otot tegang dan memulihkan energi tubuh.',
    includes: ['90-min Full Body Balinese Massage', 'Organic Floral Essential Oils', 'Aromatic Foot Bath Ritual', 'Herbal Ginger Warm Tea'],
    price: 'From $45 USD',
    period: 'per person'
  },
  {
    id: 'couples-spa-journey',
    name: 'Couples Spa Journey',
    title: 'Couples Spa Journey',
    badge: 'Romance Ritual',
    tag: '2.5h In-Villa Couple Spa',
    desc: 'Pengalaman relaksasi spa berdua di villa dengan lulur rempah Bali, rendaman bathtub kelopak bunga mawar, dan pijat aromaterapi.',
    includes: ['120-min Dual Holistic Massage', 'Rose Petal Floral Bath', 'Balinese Body Scrub & Wrap', 'Complimentary Chilled Sparkling Wine'],
    price: 'From $120 USD',
    period: 'per couple'
  },
  {
    id: 'deep-restore-day',
    name: 'Deep Restore Day',
    title: 'Deep Restore Day',
    badge: 'Full-Day Healing',
    tag: 'Full-Day Wellness Retreat',
    desc: 'Retret pemulihan seharian penuh di villa Anda: privat yoga pagi, terapi sound healing mangkuk Tibet, pijat restoratif, dan makanan organik sehat.',
    includes: ['Morning Private Yoga Session', 'Tibetan Singing Bowl Healing', '90-min Deep Restore Bodywork', 'Organic Detox Lunch & Fresh Cold Pressed Juice'],
    price: 'From $185 USD',
    period: 'per person'
  }
];

export const EXPERIENCES_DATA = [
  {
    id: 'sunrise-yoga-meditation',
    name: 'Sunrise Yoga & Meditation',
    title: 'Sunrise Yoga & Meditation',
    badge: 'Morning Serenity',
    tag: 'Private Guided Session',
    desc: 'Sesi yoga dan meditasi privat saat fajar menyingsing di teras villa atau tepi pantai dipandu guru yoga Bali bersertifikat.',
    price: 'From $40 USD',
    duration: '90 Mins'
  },
  {
    id: 'melukat-water-purification',
    name: 'Melukat Water Purification',
    title: 'Melukat Water Purification',
    badge: 'Sacred Blessing',
    tag: 'Holy Spring Water Ritual',
    desc: 'Ritual pembersihan spiritual suci Melukat di mata air alami Tirta Empul atau Sebatu didampingi pemangku adat Bali.',
    price: 'From $65 USD',
    duration: 'Half Day'
  },
  {
    id: 'balinese-culture-day',
    name: 'Balinese Culture Day',
    title: 'Balinese Culture Day',
    badge: 'Opsional',
    tag: 'Temple & Village Heritage (Opsional)',
    desc: 'Aktivitas eksplorasi budaya Bali yang fleksibel (opsional): membuat canang sari, mengunjungi desa tradisional, dan prosesi pura leluhur.',
    price: 'From $75 USD',
    duration: 'Full Day'
  }
];
