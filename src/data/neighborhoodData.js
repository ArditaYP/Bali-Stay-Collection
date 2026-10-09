/**
 * neighborhoodData.js
 * Data koordinat geografis villa dan tempat-tempat menarik di sekitar (Points of Interest / POI)
 * untuk fitur peta interaktif 'Where you'll be' ala Airbnb di Bali Stay Collection.
 */

/**
 * Koordinat pusat untuk setiap villa terdaftar di Bali
 */
export const VILLA_COORDINATES = {
  'st-lau-ubud': {
    lat: -8.5190,
    lng: 115.2630,
    areaName: 'Ubud Center',
    subtitle: 'Tucked away in central Ubud, surrounded by rice fields & cultural landmarks.'
  },
  'iconic-cliff-top-villa': {
    lat: -8.7915,
    lng: 115.1235,
    areaName: 'Balangan Beach, Uluwatu',
    subtitle: 'Perched on limestone cliffs directly overlooking the Indian Ocean.'
  },
  'angkasa-ubud': {
    lat: -8.4975,
    lng: 115.2450,
    areaName: 'Sayan Valley, Ubud',
    subtitle: 'Hovering above the lush Ayung River rainforest canopy.'
  },
  'tropical-canggu-villa': {
    lat: -8.6540,
    lng: 115.1260,
    areaName: 'Echo Beach, Canggu',
    subtitle: 'Only 400m from world-famous surf breaks, beach clubs, and cafes.'
  },
  'villa-habitas': {
    lat: -8.6480,
    lng: 115.1220,
    areaName: 'Pererenan, Canggu',
    subtitle: 'Walkable to trendy cafes & bars, 5 min ride to Echo Beach & Canggu center.'
  },
  'luxe-beach-villa-seminyak': {
    lat: -8.6830,
    lng: 115.1575,
    areaName: 'Petitenget, Seminyak',
    subtitle: 'Steps from iconic beach clubs like Potato Head & world-class dining.'
  },
  'the-bull-house': {
    lat: -8.6890,
    lng: 115.1610,
    areaName: 'Kayu Aya, Seminyak',
    subtitle: 'Private hideaway off Eat Street with vibrant nightlife and boutiques nearby.'
  },
  'yellow-moon-uluwatu': {
    lat: -8.8055,
    lng: 115.1120,
    areaName: 'Bingin Beach, Uluwatu',
    subtitle: 'Commanding cliff front near Bingin surf break and cliffside seafood grills.'
  },
  'villa-surga': {
    lat: -8.5030,
    lng: 115.2410,
    areaName: 'Sayan Ridge, Ubud',
    subtitle: 'Secluded bamboo sanctuary nestled beside the sacred Ayung River.'
  },
  'tropical-elegance-seseh': {
    lat: -8.6435,
    lng: 115.1120,
    areaName: 'Seseh Beach',
    subtitle: 'Serene coastal village where traditional Bali meets calm sunset beaches.'
  },
  'five-bedroom-designer-umalas': {
    lat: -8.6650,
    lng: 115.1520,
    areaName: 'Umalas, Kerobokan',
    subtitle: 'Tranquil upscale enclave nestled between vibrant Seminyak & trendy Berawa.'
  }
};

/**
 * Daftar kategori tempat di sekitar (Nearby Filter Categories)
 */
export const NEARBY_CATEGORIES = [
  { id: 'all', label: 'All places', icon: '📍' },
  { id: 'beach', label: 'Beaches & Surf', icon: '🏖️' },
  { id: 'beachclub', label: 'Beach Clubs', icon: '🍹' },
  { id: 'cafe', label: 'Cafes & Coffee', icon: '☕' },
  { id: 'dining', label: 'Dining & Warungs', icon: '🍽️' },
  { id: 'wellness', label: 'Yoga & Spas', icon: '🧘' },
  { id: 'groceries', label: 'Groceries & Markets', icon: '🛒' },
  { id: 'transit', label: 'Airport & Transit', icon: '✈️' }
];

/**
 * Basis data tempat menarik terdekat (Points of Interest) yang dikurasi per kawasan villa
 */
export const NEARBY_PLACES_BY_VILLA = {
  // 1. ST. LAU UBUD
  'st-lau-ubud': [
    {
      id: 'sl-1',
      name: 'Monkey Forest Sanctuary',
      category: 'wellness',
      categoryLabel: 'Attraction & Nature',
      icon: '🐒',
      lat: -8.5186,
      lng: 115.2588,
      distance: '650 m',
      duration: '8 min walk',
      highlight: 'Sacred nature reserve with ancient temples and roaming Balinese macaques.'
    },
    {
      id: 'sl-2',
      name: 'Seniman Coffee Studio',
      category: 'cafe',
      categoryLabel: 'Specialty Coffee',
      icon: '☕',
      lat: -8.5074,
      lng: 115.2638,
      distance: '1.2 km',
      duration: '4 min drive',
      highlight: 'Pioneer of specialty third-wave coffee in Bali with artisanal roasts.'
    },
    {
      id: 'sl-3',
      name: 'The Yoga Barn',
      category: 'wellness',
      categoryLabel: 'Yoga & Wellness',
      icon: '🧘',
      lat: -8.5195,
      lng: 115.2655,
      distance: '450 m',
      duration: '5 min walk',
      highlight: 'World-renowned holistic healing, sound bath, and yoga sanctuary.'
    },
    {
      id: 'sl-4',
      name: 'Ubud Art Market & Royal Palace',
      category: 'dining',
      categoryLabel: 'Culture & Market',
      icon: '🏛️',
      lat: -8.5068,
      lng: 115.2625,
      distance: '1.4 km',
      duration: '5 min drive',
      highlight: 'Historic center of Ubud arts, handcrafted souvenirs, and royal dances.'
    },
    {
      id: 'sl-5',
      name: 'Locavore NXT / Nusantara',
      category: 'dining',
      categoryLabel: 'Fine Dining',
      icon: '🍽️',
      lat: -8.5132,
      lng: 115.2640,
      distance: '900 m',
      duration: '3 min drive',
      highlight: 'Award-winning sustainable Indonesian culinary experience.'
    },
    {
      id: 'sl-6',
      name: 'Bintang Supermarket Ubud',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.5055,
      lng: 115.2510,
      distance: '2.1 km',
      duration: '7 min drive',
      highlight: 'Comprehensive grocery store with imported wines, cheeses, and organic produce.'
    },
    {
      id: 'sl-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '36 km',
      duration: '65 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 2. ICONIC CLIFF TOP VILLA (BALANGAN)
  'iconic-cliff-top-villa': [
    {
      id: 'ic-1',
      name: 'Balangan Beach & Sunset Point',
      category: 'beach',
      categoryLabel: 'Beach & Surf',
      icon: '🏖️',
      lat: -8.7925,
      lng: 115.1215,
      distance: '300 m',
      duration: '4 min walk',
      highlight: 'Golden sand cove famous for cliffside panoramic sunset viewpoints.'
    },
    {
      id: 'ic-2',
      name: 'Savaya Bali Dayclub',
      category: 'beachclub',
      categoryLabel: 'Luxury Dayclub',
      icon: '🍹',
      lat: -8.8475,
      lng: 115.1585,
      distance: '8.5 km',
      duration: '18 min drive',
      highlight: 'Dramatic cliff-edge amphitheater hosting world-class DJs above the ocean.'
    },
    {
      id: 'ic-3',
      name: 'El Kabron Bali',
      category: 'beachclub',
      categoryLabel: 'Sunset Lounge',
      icon: '🍸',
      lat: -8.8010,
      lng: 115.1165,
      distance: '3.2 km',
      duration: '8 min drive',
      highlight: 'Spanish hedonism and infinity pool sunset sessions perched 50m above sea.'
    },
    {
      id: 'ic-4',
      name: 'Single Fin Uluwatu',
      category: 'dining',
      categoryLabel: 'Bar & Grill',
      icon: '🏄',
      lat: -8.8142,
      lng: 115.0885,
      distance: '7.8 km',
      duration: '16 min drive',
      highlight: 'Legendary surf bar overlooking the iconic Uluwatu surf break.'
    },
    {
      id: 'ic-5',
      name: 'Pura Luhur Uluwatu',
      category: 'wellness',
      categoryLabel: 'Historic Temple',
      icon: '🛕',
      lat: -8.8290,
      lng: 115.0850,
      distance: '9.5 km',
      duration: '20 min drive',
      highlight: 'Sacred sea temple perched on a 70m sheer cliff with nightly Kecak fire dance.'
    },
    {
      id: 'ic-6',
      name: 'Nirmala Supermarket Jimbaran',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.7880,
      lng: 115.1610,
      distance: '4.8 km',
      duration: '10 min drive',
      highlight: 'Large supermarket stocking fresh local fruits, snacks, and daily necessities.'
    },
    {
      id: 'ic-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '16 km',
      duration: '35 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 3. ANGKASA UBUD
  'angkasa-ubud': [
    {
      id: 'ak-1',
      name: 'Campuhan Ridge Walk',
      category: 'wellness',
      categoryLabel: 'Nature Trail',
      icon: '🌿',
      lat: -8.5020,
      lng: 115.2530,
      distance: '1.1 km',
      duration: '4 min drive',
      highlight: 'Scenic scenic hill ridge hike with lush jungle views on both sides.'
    },
    {
      id: 'ak-2',
      name: 'Sayan House Restaurant & Bar',
      category: 'dining',
      categoryLabel: 'Fine Dining',
      icon: '🍽️',
      lat: -8.5015,
      lng: 115.2440,
      distance: '600 m',
      duration: '7 min walk',
      highlight: 'Japanese-Latin fusion dining with cliffside sunset views over Ayung River.'
    },
    {
      id: 'ak-3',
      name: 'Moksa Plant-based Cuisine',
      category: 'cafe',
      categoryLabel: 'Organic Cafe',
      icon: '🥗',
      lat: -8.5075,
      lng: 115.2485,
      distance: '1.3 km',
      duration: '5 min drive',
      highlight: 'Farm-to-table culinary garden restaurant and permaculture center.'
    },
    {
      id: 'ak-4',
      name: 'Zest Ubud',
      category: 'cafe',
      categoryLabel: 'Artisan Cafe',
      icon: '☕',
      lat: -8.5050,
      lng: 115.2520,
      distance: '1.5 km',
      duration: '5 min drive',
      highlight: 'Stunning open-air cafe built around a giant sacred bodhi tree.'
    },
    {
      id: 'ak-5',
      name: 'Bintang Supermarket Ubud',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.5055,
      lng: 115.2510,
      distance: '1.2 km',
      duration: '4 min drive',
      highlight: 'Full grocery store with artisan bakery and imported delicacies.'
    },
    {
      id: 'ak-6',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '35 km',
      duration: '60 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 4. VILLA SAMUDRA CANGGU
  'tropical-canggu-villa': [
    {
      id: 'vs-1',
      name: 'Echo Beach',
      category: 'beach',
      categoryLabel: 'Beach & Surf',
      icon: '🏖️',
      lat: -8.6555,
      lng: 115.1250,
      distance: '350 m',
      duration: '4 min walk',
      highlight: 'Reef break beach famous for black volcanic sand, sunset bars, and surf.'
    },
    {
      id: 'vs-2',
      name: 'La Brisa Bali Beach Club',
      category: 'beachclub',
      categoryLabel: 'Eco Beach Club',
      icon: '🍹',
      lat: -8.6548,
      lng: 115.1242,
      distance: '450 m',
      duration: '5 min walk',
      highlight: 'Magical rustic beach club built from reclaimed fishing boats under palm trees.'
    },
    {
      id: 'vs-3',
      name: 'The Lawn Canggu',
      category: 'beachclub',
      categoryLabel: 'Sunset Dayclub',
      icon: '🍸',
      lat: -8.6582,
      lng: 115.1305,
      distance: '950 m',
      duration: '11 min walk',
      highlight: 'Oceanfront lawn with daybeds, infinity pool, and sunset cocktail sessions.'
    },
    {
      id: 'vs-4',
      name: 'Monsieur Spoon Canggu',
      category: 'cafe',
      categoryLabel: 'French Bakery & Cafe',
      icon: '🥐',
      lat: -8.6515,
      lng: 115.1285,
      distance: '400 m',
      duration: '5 min walk',
      highlight: 'Famous French patisserie known for artisan croissants, coffee, and brunch.'
    },
    {
      id: 'vs-5',
      name: 'Crate Cafe',
      category: 'cafe',
      categoryLabel: 'Brunch Hotspot',
      icon: '☕',
      lat: -8.6435,
      lng: 115.1380,
      distance: '2.1 km',
      duration: '6 min drive',
      highlight: 'Iconic bustling brunch warehouse overlooking rice fields with vibrant smoothies.'
    },
    {
      id: 'vs-6',
      name: 'Amo Spa Canggu',
      category: 'wellness',
      categoryLabel: 'Luxury Spa',
      icon: '💆',
      lat: -8.6520,
      lng: 115.1320,
      distance: '850 m',
      duration: '10 min walk',
      highlight: 'State-of-the-art wellness club with sauna, ice plunge, and deep tissue massage.'
    },
    {
      id: 'vs-7',
      name: 'Pepito Market Echo Beach',
      category: 'groceries',
      categoryLabel: 'Premium Supermarket',
      icon: '🛒',
      lat: -8.6480,
      lng: 115.1340,
      distance: '1.2 km',
      duration: '4 min drive',
      highlight: 'Western supermarket offering fresh bakery, imported groceries, and cold drinks.'
    },
    {
      id: 'vs-8',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '19 km',
      duration: '45 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 5. VILLA HABITAS (4BR PERERENAN POOL VILLA)
  'villa-habitas': [
    {
      id: 'tp-1',
      name: 'Pantai Pererenan (Pererenan Beach)',
      category: 'beach',
      categoryLabel: 'Beach & Surf',
      icon: '🏖️',
      lat: -8.6550,
      lng: 115.1180,
      distance: '900 m',
      duration: '3 min drive / 11 min walk',
      highlight: 'Scenic black-sand beach known for relaxed surf waves, horse riding, and stunning sunset vista.'
    },
    {
      id: 'tp-2',
      name: 'Echo Beach Canggu',
      category: 'beach',
      categoryLabel: 'Beach & Surf',
      icon: '🏄‍♂️',
      lat: -8.6540,
      lng: 115.1260,
      distance: '1.2 km',
      duration: '5 min ride',
      highlight: 'Famous surf reef breaks, beachfront seafood barbecues, and lively sunset bars.'
    },
    {
      id: 'tp-3',
      name: 'Shelter Pererenan',
      category: 'dining',
      categoryLabel: 'Restaurant & Bar',
      icon: '🍽️',
      lat: -8.6475,
      lng: 115.1225,
      distance: '280 m',
      duration: '3 min walk',
      highlight: 'Contemporary Middle Eastern & Mediterranean open-fire cooking in a chic tropical pavilion.'
    },
    {
      id: 'tp-4',
      name: 'Baked Pererenan',
      category: 'cafe',
      categoryLabel: 'Artisan Bakery & Cafe',
      icon: '🥐',
      lat: -8.6470,
      lng: 115.1215,
      distance: '240 m',
      duration: '3 min walk',
      highlight: 'Iconic artisan sourdough, decadent breakfast pastries, and specialty espresso coffee.'
    },
    {
      id: 'tp-5',
      name: 'Touché Cafe Pererenan',
      category: 'cafe',
      categoryLabel: 'Brunch Cafe',
      icon: '☕',
      lat: -8.6485,
      lng: 115.1205,
      distance: '350 m',
      duration: '4 min walk',
      highlight: 'Minimalist aesthetic cafe serving healthy French-inspired brunch dishes, matcha, and salads.'
    },
    {
      id: 'tp-6',
      name: 'Pepito Supermarket Pererenan',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.6440,
      lng: 115.1235,
      distance: '650 m',
      duration: '2 min drive / 8 min walk',
      highlight: 'Premium grocery store with imported gourmet wines, cheese, organic produce, and fresh bakery.'
    },
    {
      id: 'tp-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '20 km',
      duration: '45 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 6. VILLA KAYU RAJA SEMINYAK
  'luxe-beach-villa-seminyak': [
    {
      id: 'kr-1',
      name: 'Potato Head Beach Club',
      category: 'beachclub',
      categoryLabel: 'Iconic Beach Club',
      icon: '🍹',
      lat: -8.6800,
      lng: 115.1505,
      distance: '750 m',
      duration: '9 min walk',
      highlight: 'Architectural wonder featuring an oceanfront infinity pool, cocktails, and music.'
    },
    {
      id: 'kr-2',
      name: 'Petitenget Beach & Temple',
      category: 'beach',
      categoryLabel: 'Beach & Culture',
      icon: '🏖️',
      lat: -8.6835,
      lng: 115.1520,
      distance: '600 m',
      duration: '7 min walk',
      highlight: 'Expansive soft golden sand beach ideal for sunset strolling.'
    },
    {
      id: 'kr-3',
      name: 'Ku De Ta Bali',
      category: 'beachclub',
      categoryLabel: 'Sunset Beach Lounge',
      icon: '🍸',
      lat: -8.6890,
      lng: 115.1515,
      distance: '1.2 km',
      duration: '5 min drive',
      highlight: 'Bali pioneer high-end sunset club with Mediterranean fine dining.'
    },
    {
      id: 'kr-4',
      name: 'Sisterfields Cafe',
      category: 'cafe',
      categoryLabel: 'Melbourne Brunch Cafe',
      icon: '☕',
      lat: -8.6865,
      lng: 115.1575,
      distance: '500 m',
      duration: '6 min walk',
      highlight: 'Celebrated Melbourne-style boutique cafe famous for acai bowls and flat whites.'
    },
    {
      id: 'kr-5',
      name: 'Merah Putih Restaurant',
      category: 'dining',
      categoryLabel: 'Indonesian Fine Dining',
      icon: '🍽️',
      lat: -8.6795,
      lng: 115.1570,
      distance: '400 m',
      duration: '5 min walk',
      highlight: 'Breathtaking eco-translucent cathedral design serving refined archipelago gastronomy.'
    },
    {
      id: 'kr-6',
      name: 'Seminyak Square & Village',
      category: 'groceries',
      categoryLabel: 'Shopping & Deli',
      icon: '🛍️',
      lat: -8.6860,
      lng: 115.1565,
      distance: '550 m',
      duration: '7 min walk',
      highlight: 'Open-air arcade with boutique stores, pharmacy, deli, and bakeries.'
    },
    {
      id: 'kr-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '12 km',
      duration: '30 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 7. VILLA CENDANA SEMINYAK
  'the-bull-house': [
    {
      id: 'vc-1',
      name: 'Eat Street (Jalan Kayu Aya)',
      category: 'dining',
      categoryLabel: 'Dining Strip',
      icon: '🍽️',
      lat: -8.6885,
      lng: 115.1600,
      distance: '150 m',
      duration: '2 min walk',
      highlight: 'Bali most famous strip for world-class restaurants, gelato, and cocktail bars.'
    },
    {
      id: 'vc-2',
      name: 'Seminyak Beach (Double Six)',
      category: 'beach',
      categoryLabel: 'Beach & Sunset',
      icon: '🏖️',
      lat: -8.6945,
      lng: 115.1550,
      distance: '900 m',
      duration: '11 min walk',
      highlight: 'Lively beach lined with colorful beanbags, sunset acoustic music, and surf lessons.'
    },
    {
      id: 'vc-3',
      name: 'Revolver Espresso',
      category: 'cafe',
      categoryLabel: 'Boutique Coffee',
      icon: '☕',
      lat: -8.6878,
      lng: 115.1585,
      distance: '350 m',
      duration: '4 min walk',
      highlight: 'Hidden laneway speakeasy coffee bar with top-tier specialty beans.'
    },
    {
      id: 'vc-4',
      name: 'Bodyworks Spa Bali',
      category: 'wellness',
      categoryLabel: 'Iconic Spa Sanctuary',
      icon: '💆',
      lat: -8.6820,
      lng: 115.1530,
      distance: '1.2 km',
      duration: '5 min drive',
      highlight: 'Stunning Moroccan-inspired terracotta palace for massages and aesthetic wellness.'
    },
    {
      id: 'vc-5',
      name: 'Bintang Supermarket Seminyak',
      category: 'groceries',
      categoryLabel: 'Large Supermarket',
      icon: '🛒',
      lat: -8.6980,
      lng: 115.1670,
      distance: '1.3 km',
      duration: '5 min drive',
      highlight: 'Modern multi-story supermarket with extensive local & international selections.'
    },
    {
      id: 'vc-6',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '11 km',
      duration: '28 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 8. CLIFFSIDE PANORAMA ULUWATU
  'yellow-moon-uluwatu': [
    {
      id: 'cp-1',
      name: 'Bingin Beach',
      category: 'beach',
      categoryLabel: 'Beach & Surf',
      icon: '🏖️',
      lat: -8.8065,
      lng: 115.1105,
      distance: '250 m',
      duration: '3 min walk',
      highlight: 'Intimate cliff-framed beach with crystal tide pools and barreling surf.'
    },
    {
      id: 'cp-2',
      name: 'Padang Padang Beach',
      category: 'beach',
      categoryLabel: 'Beach Cove',
      icon: '🌊',
      lat: -8.8115,
      lng: 115.1035,
      distance: '1.8 km',
      duration: '5 min drive',
      highlight: 'Sheltered cove accessed through a limestone rock cave, featured in "Eat Pray Love".'
    },
    {
      id: 'cp-3',
      name: 'Cashew Tree Bingin',
      category: 'cafe',
      categoryLabel: 'Organic Cafe & Acoustic',
      icon: '🥑',
      lat: -8.8040,
      lng: 115.1160,
      distance: '600 m',
      duration: '7 min walk',
      highlight: 'Lush garden cafe serving organic health bowls and weekly acoustic evenings.'
    },
    {
      id: 'cp-4',
      name: 'Ulu Cliffhouse',
      category: 'beachclub',
      categoryLabel: 'Cliff Dayclub',
      icon: '🍹',
      lat: -8.8130,
      lng: 115.0940,
      distance: '2.9 km',
      duration: '7 min drive',
      highlight: 'Ultra-chic clifftop dayclub with direct ocean access and 25m lap pool.'
    },
    {
      id: 'cp-5',
      name: 'Pura Luhur Uluwatu',
      category: 'wellness',
      categoryLabel: 'Temple & Kecak Dance',
      icon: '🛕',
      lat: -8.8290,
      lng: 115.0850,
      distance: '5.2 km',
      duration: '12 min drive',
      highlight: 'Sacred sea temple perched on dramatic cliff with famous sunset Kecak fire dance.'
    },
    {
      id: 'cp-6',
      name: 'Pepito Market Pecatu',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.8150,
      lng: 115.1320,
      distance: '3.5 km',
      duration: '8 min drive',
      highlight: 'Modern grocery hub with gourmet cheese, wine, and daily essentials.'
    },
    {
      id: 'cp-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '18 km',
      duration: '40 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 9. MANDAPA JUNGLE VILLA UBUD
  'villa-surga': [
    {
      id: 'mj-1',
      name: 'Ayung River Valley & Rafting',
      category: 'wellness',
      categoryLabel: 'Nature & Adventure',
      icon: '🛶',
      lat: -8.5025,
      lng: 115.2395,
      distance: '200 m',
      duration: '3 min walk',
      highlight: 'Pristine rainforest gorge along Bali longest sacred river with soothing water sounds.'
    },
    {
      id: 'mj-2',
      name: 'The Sayan House',
      category: 'dining',
      categoryLabel: 'Sunset Dining',
      icon: '🍽️',
      lat: -8.5015,
      lng: 115.2440,
      distance: '450 m',
      duration: '5 min walk',
      highlight: 'Iconic cliff-edge terrace dining with breathtaking river sunset vistas.'
    },
    {
      id: 'mj-3',
      name: 'Kubu at Mandapa (Bamboo Cocoon)',
      category: 'dining',
      categoryLabel: 'Luxury Fine Dining',
      icon: '🍷',
      lat: -8.4985,
      lng: 115.2405,
      distance: '650 m',
      duration: '8 min walk',
      highlight: 'Intimate private woven bamboo dining cocoons right beside the rushing river.'
    },
    {
      id: 'mj-4',
      name: 'Alchemy Bali Ubud',
      category: 'cafe',
      categoryLabel: 'Raw Vegan & Wellness',
      icon: '🥗',
      lat: -8.5110,
      lng: 115.2490,
      distance: '1.4 km',
      duration: '4 min drive',
      highlight: 'Bali first 100% raw vegan restaurant, crystal elixir bar, and holistic clinic.'
    },
    {
      id: 'mj-5',
      name: 'Campuhan Ridge Walk',
      category: 'wellness',
      categoryLabel: 'Scenic Nature Trail',
      icon: '🌿',
      lat: -8.5020,
      lng: 115.2530,
      distance: '1.8 km',
      duration: '6 min drive',
      highlight: 'Panoramic green hillwalk between two sacred rivers.'
    },
    {
      id: 'mj-6',
      name: 'Bintang Supermarket Ubud',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.5055,
      lng: 115.2510,
      distance: '1.6 km',
      duration: '5 min drive',
      highlight: 'Convenient grocery store for imported provisions, snacks, and toiletries.'
    },
    {
      id: 'mj-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '36 km',
      duration: '65 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 10. SESEH BEACH
  'tropical-elegance-seseh': [
    {
      id: 'se-1',
      name: 'Seseh Beach',
      category: 'beach',
      categoryLabel: 'Beach & Sunset',
      icon: '🏖️',
      lat: -8.6440,
      lng: 115.1110,
      distance: '250 m',
      duration: '3 min walk',
      highlight: 'Peaceful black sand beach with authentic fishing boats and dramatic sunset views.'
    },
    {
      id: 'se-2',
      name: 'Seseh General Store',
      category: 'cafe',
      categoryLabel: 'Artisan Cafe',
      icon: '☕',
      lat: -8.6425,
      lng: 115.1135,
      distance: '300 m',
      duration: '4 min walk',
      highlight: 'Charming neighborhood hangout serving sourdough toast, specialty coffee, and natural wines.'
    },
    {
      id: 'se-3',
      name: 'Udara Bali Yoga Detox & Spa',
      category: 'wellness',
      categoryLabel: 'Yoga & Wellness',
      icon: '🧘',
      lat: -8.6430,
      lng: 115.1105,
      distance: '350 m',
      duration: '4 min walk',
      highlight: 'Oceanfront holistic yoga shalas, sound healing, aerial yoga, and sauna caves.'
    },
    {
      id: 'se-4',
      name: 'Tanah Lot Temple',
      category: 'wellness',
      categoryLabel: 'Historic Sea Temple',
      icon: '🛕',
      lat: -8.6212,
      lng: 115.0868,
      distance: '5.2 km',
      duration: '12 min drive',
      highlight: 'Iconic ancient rock temple perched on offshore rock formation amidst breaking waves.'
    },
    {
      id: 'se-5',
      name: 'La Brisa Bali Beach Club',
      category: 'beachclub',
      categoryLabel: 'Beach Club',
      icon: '🍹',
      lat: -8.6558,
      lng: 115.1246,
      distance: '3.4 km',
      duration: '8 min drive',
      highlight: 'Bohemian eco-chic beach club crafted from reclaimed fishing boats on Echo Beach.'
    },
    {
      id: 'se-6',
      name: 'Pepito Market Pererenan',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.6445,
      lng: 115.1325,
      distance: '2.4 km',
      duration: '6 min drive',
      highlight: 'Premium gourmet supermarket with fresh produce, cheese, bakery, and imported goods.'
    },
    {
      id: 'se-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '22 km',
      duration: '45 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ],

  // 11. UMALAS
  'five-bedroom-designer-umalas': [
    {
      id: 'um-1',
      name: 'Nook Bali',
      category: 'dining',
      categoryLabel: 'Ricefield Dining',
      icon: '🍽️',
      lat: -8.6698,
      lng: 115.1565,
      distance: '1.2 km',
      duration: '4 min drive',
      highlight: 'Iconic open-air dining with sweeping vistas across lush green rice paddies.'
    },
    {
      id: 'um-2',
      name: '7AM Bakers Club Umalas',
      category: 'cafe',
      categoryLabel: 'Specialty Bakery',
      icon: '🥐',
      lat: -8.6612,
      lng: 115.1528,
      distance: '650 m',
      duration: '8 min walk',
      highlight: 'Acclaimed artisanal bakery crafting viennoiserie, gourmet sandwiches, and specialty coffee.'
    },
    {
      id: 'um-3',
      name: 'Finns Beach Club & Berawa Beach',
      category: 'beachclub',
      categoryLabel: 'Beach Club & Surf',
      icon: '🍹',
      lat: -8.6652,
      lng: 115.1365,
      distance: '2.6 km',
      duration: '7 min drive',
      highlight: 'World-famous beachfront venue with 4 swimming pools, 9 bars, and live DJ sets.'
    },
    {
      id: 'um-4',
      name: 'Batu Belig Beach',
      category: 'beach',
      categoryLabel: 'Beach & Sunset',
      icon: '🏖️',
      lat: -8.6750,
      lng: 115.1450,
      distance: '2.1 km',
      duration: '6 min drive',
      highlight: 'Long stretch of sandy beach popular for horse riding, beach walks, and sunset drinks.'
    },
    {
      id: 'um-5',
      name: 'Amo Spa Canggu / Umalas',
      category: 'wellness',
      categoryLabel: 'Day Spa & Wellness',
      icon: '💆',
      lat: -8.6575,
      lng: 115.1375,
      distance: '2.3 km',
      duration: '6 min drive',
      highlight: 'Modern wellness center with sauna, ice bath, magnesium plunge, and body treatments.'
    },
    {
      id: 'um-6',
      name: 'Pepito Express Umalas',
      category: 'groceries',
      categoryLabel: 'Supermarket',
      icon: '🛒',
      lat: -8.6645,
      lng: 115.1535,
      distance: '450 m',
      duration: '5 min walk',
      highlight: 'Convenient grocery store for daily fresh groceries, cold beverages, and snacks.'
    },
    {
      id: 'um-7',
      name: 'Ngurah Rai International Airport (DPS)',
      category: 'transit',
      categoryLabel: 'Airport',
      icon: '✈️',
      lat: -8.7482,
      lng: 115.1672,
      distance: '15 km',
      duration: '35 min drive',
      highlight: 'Bali primary international airport terminal.'
    }
  ]
};

/**
 * Mapping alias ID villa agar ID dari airbnbVillas.json dan bscVillasData.js selalu cocok
 */
export const VILLA_COORDINATES_ALIAS = {
  'villa-infinity-umalas': 'five-bedroom-designer-umalas',
  'villa-satiya': 'villa-habitas',
  'alua-loft': 'villa-habitas',
  'villa-aless': 'five-bedroom-designer-umalas',
  'wellness-estate-canggu': 'tropical-canggu-villa',
  'beachside-haven-canggu': 'tropical-canggu-villa',
  'villa-milana': 'tropical-canggu-villa',
  'coco-bay': 'tropical-canggu-villa',
  'berawa-breeze': 'tropical-canggu-villa',
  'the-bull-house': 'the-bull-house',
  'cala-blanca': 'villa-habitas',
  'villa-daun-by-teduh': 'tropical-canggu-villa',
  'designer-beachside-canggu': 'tropical-canggu-villa',
  'magnificent-canggu-estate': 'tropical-canggu-villa',
  // Alias 13 Villa Airbnb Utama
  'st-lau': 'st-lau-ubud',
  'balangan-cliff-villa': 'iconic-cliff-top-villa',
  'villa-angkasa': 'angkasa-ubud',
  'villa-habitas': 'villa-habitas',
  'tranquil-sanctuary-pererenan': 'villa-habitas',
  'house-terra': 'villa-habitas',
  'tropical-canggu-villa': 'tropical-canggu-villa',
  'luxe-beach-villa-seminyak': 'luxe-beach-villa-seminyak',
  'villa-kanopi': 'the-bull-house',
  'yellow-moon-uluwatu': 'yellow-moon-uluwatu',
  'villa-imala': 'yellow-moon-uluwatu',
  'casa-kaya-bingin': 'yellow-moon-uluwatu',
  'luxury-tropical-bingin': 'yellow-moon-uluwatu',
  'chic-tropical-bingin': 'yellow-moon-uluwatu',
  'tropical-elegance-seseh': 'tropical-elegance-seseh',
  'five-bedroom-designer-umalas': 'five-bedroom-designer-umalas',
  'villa-surga': 'villa-surga',
  'villa-mahina': 'tropical-canggu-villa',
  'khaleela-villas': 'tropical-canggu-villa',
  'beyond-the-palms': 'tropical-canggu-villa',
  'villa-akar': 'tropical-canggu-villa',
  'villa-golden': 'tropical-canggu-villa'
};

/**
 * Mendapatkan koordinat geografis villa berdasarkan ID atau objek villa
 * Mendukung pencocokan langsung, alias Airbnb, dan pencocokan area cerdas.
 * @param {string} villaId - ID unik villa
 * @param {Object} [villa] - Objek villa lengkap (opsional, untuk deteksi area otomatis)
 * @returns {{lat: number, lng: number, areaName: string, subtitle: string}} Objek data koordinat villa
 */
export function getVillaCoordinates(villaId, villa = null) {
  // 1. Cek langsung di VILLA_COORDINATES
  if (villaId && VILLA_COORDINATES[villaId]) {
    return VILLA_COORDINATES[villaId];
  }

  // 2. Cek di tabel alias
  const aliasKey = villaId ? VILLA_COORDINATES_ALIAS[villaId] : null;
  if (aliasKey && VILLA_COORDINATES[aliasKey]) {
    return VILLA_COORDINATES[aliasKey];
  }

  // 3. Pencocokan area cerdas jika objek villa diteruskan
  const area = (villa?.location || villa?.address || villa?.area || '').toLowerCase();
  if (area.includes('uluwatu') || area.includes('bingin') || area.includes('balangan') || area.includes('bukit') || area.includes('pecatu')) {
    return VILLA_COORDINATES['iconic-cliff-top-villa'];
  }
  if (area.includes('pererenan')) {
    return VILLA_COORDINATES['villa-habitas'];
  }
  if (area.includes('seseh')) {
    return VILLA_COORDINATES['tropical-elegance-seseh'];
  }
  if (area.includes('umalas')) {
    return VILLA_COORDINATES['five-bedroom-designer-umalas'];
  }
  if (area.includes('canggu') || area.includes('berawa')) {
    return VILLA_COORDINATES['tropical-canggu-villa'];
  }
  if (area.includes('seminyak') || area.includes('petitenget') || area.includes('kerobokan')) {
    return VILLA_COORDINATES['luxe-beach-villa-seminyak'];
  }
  if (area.includes('ubud') || area.includes('sayan') || area.includes('gianyar')) {
    return VILLA_COORDINATES['st-lau-ubud'];
  }

  // Default fallback
  return VILLA_COORDINATES['st-lau-ubud'];
}

/**
 * Mendapatkan daftar tempat menarik di sekitar villa berdasarkan ID atau objek villa
 * @param {string} villaId - ID unik villa
 * @param {Object} [villa] - Objek villa lengkap (opsional)
 * @returns {Array<Object>} Daftar objek tempat menarik di sekitar villa
 */
export function getNearbyPlaces(villaId, villa = null) {
  if (villaId && NEARBY_PLACES_BY_VILLA[villaId]) {
    return NEARBY_PLACES_BY_VILLA[villaId];
  }

  const aliasKey = villaId ? VILLA_COORDINATES_ALIAS[villaId] : null;
  if (aliasKey && NEARBY_PLACES_BY_VILLA[aliasKey]) {
    return NEARBY_PLACES_BY_VILLA[aliasKey];
  }

  const area = (villa?.location || villa?.address || villa?.area || '').toLowerCase();
  if (area.includes('uluwatu') || area.includes('bingin') || area.includes('balangan') || area.includes('bukit') || area.includes('pecatu')) {
    return NEARBY_PLACES_BY_VILLA['iconic-cliff-top-villa'];
  }
  if (area.includes('pererenan')) {
    return NEARBY_PLACES_BY_VILLA['villa-habitas'];
  }
  if (area.includes('seseh')) {
    return NEARBY_PLACES_BY_VILLA['tropical-elegance-seseh'];
  }
  if (area.includes('umalas')) {
    return NEARBY_PLACES_BY_VILLA['five-bedroom-designer-umalas'];
  }
  if (area.includes('canggu') || area.includes('berawa')) {
    return NEARBY_PLACES_BY_VILLA['tropical-canggu-villa'];
  }
  if (area.includes('seminyak') || area.includes('petitenget') || area.includes('kerobokan')) {
    return NEARBY_PLACES_BY_VILLA['luxe-beach-villa-seminyak'];
  }
  if (area.includes('ubud') || area.includes('sayan') || area.includes('gianyar')) {
    return NEARBY_PLACES_BY_VILLA['st-lau-ubud'];
  }

  return NEARBY_PLACES_BY_VILLA['st-lau-ubud'];
}
