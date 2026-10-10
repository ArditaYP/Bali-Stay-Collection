/**
 * bscFleetData.js
 * Basis data resmi armada mobil mewah, opsi supir, lokasi transfer,
 * paket liburan VIP (Packages), dan pengalaman kurasi (Things to do)
 * untuk frontpage Bali Stay Collection (Hero & Concierge Services).
 */

export const CAR_FLEET_DATA = [
  {
    id: 'toyota-alphard',
    name: 'Toyota Alphard VIP Executive Lounge',
    shortName: 'Toyota Alphard VIP',
    category: 'VIP Luxury Lounge',
    badge: 'Most Popular VIP',
    seats: 5,
    luggage: 4,
    transmission: 'Automatic',
    fuel: 'Petrol / Hybrid',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      'Ottoman Captain Reclining Seats',
      'In-Car High-Speed Wi-Fi',
      'Complimentary Cold Water & Towels',
      'Dual Panoramic Sunroof & Air Ionizer'
    ],
    priceIdr: 'Rp 2.200.000',
    priceUsd: '~$140 USD',
    period: 'per day (10 hours)',
    description: 'Standar kemewahan mobilitas para tamu VVIP Bali. Kursi kapten elektrik dengan leg rest ottoman, kabin senyap ber-AC dingin, dan pengemudi pribadi berbusana batik rapi.'
  },
  {
    id: 'toyota-hiace-premio',
    name: 'Toyota HiAce Premio Luxury VIP (10-Seat)',
    shortName: 'HiAce Premio VIP (10-Seat)',
    category: 'VIP Group Van',
    badge: 'Family & Group Luxury',
    seats: 10,
    luggage: 8,
    transmission: 'Automatic',
    fuel: 'Diesel',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      'Custom Leather Reclining Seats',
      'High-Roof Spacious Cabin',
      'In-Car Wi-Fi & Premium Audio',
      'Dual Independent Air Conditioning'
    ],
    priceIdr: 'Rp 2.500.000',
    priceUsd: '~$160 USD',
    period: 'per day (10 hours)',
    description: 'Pilihan sempurna untuk rombongan keluarga besar atau grup villa. Kabin tinggi lapang, kursi kulit berjarak lega, bagasi ekstra luas untuk koper & perlengkapan golf.'
  },
  {
    id: 'hyundai-ioniq-5',
    name: 'Hyundai Ioniq 5 EV Luxury Lounge',
    shortName: 'Hyundai Ioniq 5 EV',
    category: '100% Eco-Luxury EV',
    badge: 'Zero Emission',
    seats: 4,
    luggage: 3,
    transmission: 'Automatic EV',
    fuel: '100% Electric',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      'Zero-Emission Whisper Quiet Drive',
      'Panoramic Vision Glass Roof',
      'Premium Relaxation Front Seats',
      'Eco-Conscious Island Mobility'
    ],
    priceIdr: 'Rp 2.400.000',
    priceUsd: '~$155 USD',
    period: 'per day (10 hours)',
    description: 'Mobilitas modern ramah lingkungan tanpa emisi & polusi suara. Menikmati keindahan alam pulau Bali dengan kabin hening, atap kaca luas, dan interior futuristik.'
  },
  {
    id: 'toyota-zenix-hybrid',
    name: 'Toyota Innova Zenix Hybrid Luxury',
    shortName: 'Innova Zenix Hybrid',
    category: 'Premium Hybrid Explorer',
    badge: 'Island Comfort',
    seats: 6,
    luggage: 4,
    transmission: 'Automatic Hybrid',
    fuel: 'Petrol Hybrid',
    driverOption: 'Private Chauffeur Included',
    amenities: [
      'Captain Seats in 2nd Row',
      'Smooth Hybrid Fuel Efficiency',
      'Modern Digital Climate AC',
      'Agile for Bali Scenic Coastal Roads'
    ],
    priceIdr: 'Rp 1.400.000',
    priceUsd: '~$90 USD',
    period: 'per day (10 hours)',
    description: 'Pilihan mobilitas serbaguna yang sangat nyaman untuk pasangan maupun keluarga kecil menelusuri pantai-pantai tersembunyi dan kafe-kafe trendi di Bali.'
  }
];

export const MOTORBIKE_FLEET_DATA = [
  {
    id: 'yamaha-xmax-250',
    name: 'Yamaha XMAX 250cc Maxi Scooter',
    shortName: 'Yamaha XMAX 250cc',
    category: 'Maxi Touring Scooter',
    badge: 'Touring & Highway',
    engine: '250cc Liquid-Cooled',
    storage: 'Extra-large double helmet trunk',
    priceIdr: 'Rp 350.000',
    priceUsd: '~$22 USD',
    period: 'per day',
    description: 'Maxi scooter premium paling bertenaga untuk menjelajahi pantai timur, Uluwatu, dan pegunungan Kintamani dengan kestabilan luar biasa.'
  },
  {
    id: 'vespa-sprint-s-150',
    name: 'Vespa Sprint S 150cc i-Get ABS',
    shortName: 'Vespa Sprint S 150cc',
    category: 'Italian Aesthetic Icon',
    badge: 'Most Stylish',
    engine: '150cc i-Get ABS',
    storage: 'Underseat trunk & glove box',
    priceIdr: 'Rp 300.000',
    priceUsd: '~$19 USD',
    period: 'per day',
    description: 'Ikon gaya hidup pesisir Bali. Desain klasik retro elegan dengan akselerasi halus, sangat cocok untuk bersantai di kafe Canggu & Seminyak.'
  },
  {
    id: 'honda-pcx-160',
    name: 'Honda PCX 160cc Luxury Cruiser',
    shortName: 'Honda PCX 160cc',
    category: 'Comfort Island Cruiser',
    badge: 'Smooth Cruiser',
    engine: '160cc 4-Valve eSP+',
    storage: '30L massive storage compartment',
    priceIdr: 'Rp 220.000',
    priceUsd: '~$14 USD',
    period: 'per day',
    description: 'Kenyamanan berkendara terbaik untuk harian. Suspensi empuk, posisi duduk santai, dan bagasi besar muat belanjaan atau pakaian renang.'
  },
  {
    id: 'honda-scoopy-prestige',
    name: 'Honda Scoopy Prestige Smart Key',
    shortName: 'Honda Scoopy 110cc',
    category: 'Light Island Hopper',
    badge: 'Agile & Easy',
    engine: '110cc eSP Smart Key',
    storage: 'Compact city trunk & USB charger',
    priceIdr: 'Rp 140.000',
    priceUsd: '~$9 USD',
    period: 'per day',
    description: 'Skuter ringan, lincah, dan sangat hemat bahan bakar. Sangat mudah bermanuver di gang-gang sempit kafe dan jalanan santai pesisir pantai.'
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
    id: 'yacht-escape',
    title: 'The Ultimate Yacht & Villa Escape',
    badge: 'Signature VIP Bundle',
    tag: '3 Nights Villa + Private Yacht',
    desc: 'Menginap di private pool villa eksklusif dipadukan dengan charter kapal yacht catamaran pribadi menuju Nusa Penida & Lembongan dengan snorkeling manta ray.',
    includes: ['3 Nights Private Villa Stay', 'Full-Day Private Yacht Charter', 'VIP Airport DPS Fast-Track', '5-Course Private Chef Dinner'],
    price: 'From $2,850 USD',
    period: 'per bundle (up to 4 guests)'
  },
  {
    id: 'honeymoon-sanctuary',
    title: 'Romantic Bali Honeymoon Sanctuary',
    badge: 'Romance VIP Bundle',
    tag: '4 Nights Villa + Bespoke Romance',
    desc: 'Retret romantis terbaik di villa tebing Uluwatu atau Ubud. Termasuk floating breakfast bunga mawar, candlelit dinner oleh private chef, dan couple holistic spa ritual.',
    includes: ['Secluded Cliff/Jungle Villa', '5-Course Candlelit Chef Dinner', '2h Couple Spa & Sound Bath', 'Daily Floating Pool Breakfast'],
    price: 'From $1,950 USD',
    period: 'per bundle (for couple)'
  },
  {
    id: 'family-heritage',
    title: 'Family Luxury Heritage & Culture',
    badge: 'Family VIP Bundle',
    tag: '5 Nights Grand Estate + Chauffeur',
    desc: 'Liburan keluarga bebas repot. Grand estate 4-5 kamar tidur dengan staf lengkap, mobil HiAce Premio VIP ber-supir 10 jam sehari, dan private cultural day tour.',
    includes: ['4–5 Bedroom Luxury Estate', 'Chauffeured HiAce Premio (10h/day)', 'Dedicated Butler & Concierge', 'Custom Island Family Excursions'],
    price: 'From $3,400 USD',
    period: 'per bundle (up to 10 guests)'
  }
];

export const EXPERIENCES_DATA = [
  {
    id: 'catamaran-charter',
    title: 'Private Catamaran & Yacht Charter',
    badge: 'Ocean Luxury',
    tag: 'Full Day Cruise',
    desc: 'Berlayar pribadi melintasi selat Badung menuju teluk biru Nusa Penida & Lembongan dengan hidangan champagne & barbekyu hidangan laut segar.',
    price: 'From $1,200 USD',
    duration: '8 Hours'
  },
  {
    id: 'private-chef',
    title: 'In-Villa Bespoke Private Chef Dining',
    badge: 'Gastronomy VIP',
    tag: '5-Course Fine Dining',
    desc: 'Koki pribadi bintang 5 memasak langsung hidangan fine dining gourmet 5-course di dapur villa Anda, lengkap dengan dekorasi meja makan tepi kolam renang.',
    price: 'From $85 USD / person',
    duration: '3 Hours'
  },
  {
    id: 'helicopter-tour',
    title: 'Scenic Island Helicopter Coastline Tour',
    badge: 'Aerial VIP',
    tag: 'Aerial Excursion',
    desc: 'Menyaksikan kemegahan tebing Uluwatu, patung GWK raksasa, dan garis pantai pura Tanah Lot dari ketinggian udara helikopter eksekutif.',
    price: 'From $650 USD',
    duration: '30–60 Mins'
  },
  {
    id: 'in-villa-spa',
    title: 'In-Villa Sound Bath & Balinese Wellness Ritual',
    badge: 'Holistic Spa',
    tag: 'Deep Rejuvenation',
    desc: 'Terapis spa Bali profesional hadir di villa Anda dengan minyak esensial organik, pijat relaksasi tubuh, dan sound healing mangkuk Tibet tepi kolam.',
    price: 'From $65 USD / person',
    duration: '2 Hours'
  }
];
