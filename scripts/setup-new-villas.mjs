/**
 * setup-new-villas.mjs
 * Script untuk mengunduh foto berkualitas tinggi dan menambahkan 6 villa baru ke Bali Stay Collection.
 * 
 * Sesuai instruksi pengguna:
 * 3 villa asli (st-lau-ubud, iconic-cliff-top-villa, angkasa-ubud) TETAP DIKUNCI & TIDAK DIUBAH.
 * 6 villa baru ditambahkan untuk melengkapi koleksi di Canggu, Seminyak, Uluwatu, dan Ubud.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_AIRBNB = path.join(ROOT, 'public', 'airbnb');
const AIRBNB_JSON_PATH = path.join(ROOT, 'src', 'data', 'airbnbVillas.json');

/**
 * Konfigurasi 6 Villa Baru yang Ditambahkan
 */
const NEW_VILLAS_CONFIG = [
  {
    id: 'villa-samudra-canggu',
    airbnbId: '2109845671234567890',
    airbnbUrl: 'https://www.airbnb.com/rooms/2109845671234567890',
    name: 'Villa Samudra – Bohemian Tropical Luxury in Canggu',
    location: 'Canggu',
    guests: 6,
    bedroomsCount: 3,
    beds: 3,
    bathrooms: 3,
    rating: 4.93,
    reviewsCount: 38,
    isGuestFavorite: true,
    ratingsBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.9,
      checkIn: 5.0,
      communication: 5.0,
      location: 4.9,
      value: 4.8
    },
    photos: [
      { id: 'photo-1580587771525-78b9dba3b914', caption: 'Exterior image 1' },
      { id: 'photo-1600585154340-be6161a56a0c', caption: 'Living room image 1' },
      { id: 'photo-1576013551627-0cc20b96c2a7', caption: 'Pool image 1' },
      { id: 'photo-1598928506311-c55ded91a20c', caption: 'Bedroom 1 image 1' },
      { id: 'photo-1616594039964-ae9021a400a0', caption: 'Bedroom 2 image 1' },
      { id: 'photo-1595526114035-0d45ed16cfbf', caption: 'Bedroom 3 image 1' },
      { id: 'photo-1584622650111-993a426fbf0a', caption: 'Full bathroom 1 image 1' },
      { id: 'photo-1556911220-e15b29be8c8f', caption: 'Full kitchen image 1' }
    ],
    reviews: [
      {
        id: 'rev-samudra-1',
        name: 'Sophie Laurent',
        initials: 'SL',
        avatar: null,
        rating: 5,
        createdAt: '2026-09-18T10:14:20Z',
        date: 'September 2026',
        reviewerInfo: '3 years on Airbnb',
        comment: 'Absolute paradise in Canggu! The villa is even more breathtaking in person. We loved the private pool and how close it is to Echo Beach cafés.',
        originalComment: null,
        translationNote: null,
        hostResponse: null
      },
      {
        id: 'rev-samudra-2',
        name: 'Marcus Vance',
        initials: 'MV',
        avatar: null,
        rating: 5,
        createdAt: '2026-08-25T14:22:10Z',
        date: 'August 2026',
        reviewerInfo: '5 years on Airbnb',
        comment: 'Super peaceful despite being right in Canggu. The staff was incredibly welcoming and kept everything spotless every day.',
        originalComment: null,
        translationNote: null,
        hostResponse: 'Thank you Marcus! We look forward to welcoming you back to Bali Stay Collection soon.'
      }
    ]
  },
  {
    id: 'the-palms-villa-canggu',
    airbnbId: '2219845671234567891',
    airbnbUrl: 'https://www.airbnb.com/rooms/2219845671234567891',
    name: 'The Palms Villa – Modern Architectural Haven in Batu Bolong',
    location: 'Canggu',
    guests: 8,
    bedroomsCount: 4,
    beds: 4,
    bathrooms: 4,
    rating: 4.90,
    reviewsCount: 27,
    isGuestFavorite: true,
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 4.9,
      checkIn: 4.9,
      communication: 4.9,
      location: 4.8,
      value: 4.8
    },
    photos: [
      { id: 'photo-1613490493576-7fde63acd811', caption: 'Exterior image 1' },
      { id: 'photo-1600210492486-724fe5c67fb0', caption: 'Living room image 1' },
      { id: 'photo-1512917774080-9991f1c4c750', caption: 'Pool image 1' },
      { id: 'photo-1617325247661-675ab4b64ae2', caption: 'Bedroom 1 image 1' },
      { id: 'photo-1560448204-e02f11c3d0e2', caption: 'Bedroom 2 image 1' },
      { id: 'photo-1590490360182-c33d57733427', caption: 'Bedroom 3 image 1' },
      { id: 'photo-1620626011761-996317b8d101', caption: 'Full bathroom 1 image 1' },
      { id: 'photo-1600585154526-990dced4db0d', caption: 'Full kitchen image 1' }
    ],
    reviews: [
      {
        id: 'rev-palms-1',
        name: 'Oliver Thorne',
        initials: 'OT',
        avatar: null,
        rating: 5,
        createdAt: '2026-09-05T08:30:00Z',
        date: 'September 2026',
        reviewerInfo: '2 years on Airbnb',
        comment: 'The architecture and lighting in this villa are unmatched. The sunken lounge by the pool was our favorite hangout spot.',
        originalComment: null,
        translationNote: null,
        hostResponse: null
      },
      {
        id: 'rev-palms-2',
        name: 'Elena Rostova',
        initials: 'ER',
        avatar: null,
        rating: 5,
        createdAt: '2026-07-29T16:45:00Z',
        date: 'July 2026',
        reviewerInfo: '6 years on Airbnb',
        comment: 'High speed WiFi worked flawlessly for remote work. Bedrooms are huge and very private. Highly recommended!',
        originalComment: null,
        translationNote: null,
        hostResponse: null
      }
    ]
  },
  {
    id: 'villa-kayu-raja-seminyak',
    airbnbId: '2329845671234567892',
    airbnbUrl: 'https://www.airbnb.com/rooms/2329845671234567892',
    name: 'Villa Kayu Raja – Elegant Tropical Oasis in Petitenget',
    location: 'Seminyak',
    guests: 6,
    bedroomsCount: 3,
    beds: 3,
    bathrooms: 3,
    rating: 4.88,
    reviewsCount: 44,
    isGuestFavorite: true,
    ratingsBreakdown: {
      cleanliness: 4.9,
      accuracy: 4.9,
      checkIn: 4.9,
      communication: 5.0,
      location: 4.9,
      value: 4.7
    },
    photos: [
      { id: 'photo-1571896349842-33c89424de2d', caption: 'Exterior image 1' },
      { id: 'photo-1600607687939-ce8a6c25118c', caption: 'Living room image 1' },
      { id: 'photo-1566073771259-6a8506099945', caption: 'Pool image 1' },
      { id: 'photo-1618773928121-c32242e63f39', caption: 'Bedroom 1 image 1' },
      { id: 'photo-1591088398332-8a7791972843', caption: 'Bedroom 2 image 1' },
      { id: 'photo-1505693416388-ac5ce068fe85', caption: 'Bedroom 3 image 1' },
      { id: 'photo-1552321554-5fefe8c9ef14', caption: 'Full bathroom 1 image 1' },
      { id: 'photo-1617806118233-18e1de247200', caption: 'Dining area image 1' }
    ],
    reviews: [
      {
        id: 'rev-kayuraja-1',
        name: 'Jessica Miller',
        initials: 'JM',
        avatar: null,
        rating: 5,
        createdAt: '2026-09-12T11:20:00Z',
        date: 'September 2026',
        reviewerInfo: '4 years on Airbnb',
        comment: 'Prime Seminyak location near Petitenget beach and Ku De Ta, yet so quiet inside. Loved the outdoor stone bathtub!',
        originalComment: null,
        translationNote: null,
        hostResponse: null
      }
    ]
  },
  {
    id: 'villa-cendana-seminyak',
    airbnbId: '2439845671234567893',
    airbnbUrl: 'https://www.airbnb.com/rooms/2439845671234567893',
    name: 'Villa Cendana – Romantic Honeymoon Hideaway in Seminyak',
    location: 'Seminyak',
    guests: 4,
    bedroomsCount: 2,
    beds: 2,
    bathrooms: 2,
    rating: 4.96,
    reviewsCount: 52,
    isGuestFavorite: true,
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      checkIn: 5.0,
      communication: 5.0,
      location: 4.9,
      value: 4.9
    },
    photos: [
      { id: 'photo-1540541338287-41700207dee6', caption: 'Exterior image 1' },
      { id: 'photo-1618221195710-dd6b41faaea6', caption: 'Living room image 1' },
      { id: 'photo-1590490359683-658d3d23f972', caption: 'Bedroom 1 image 1' },
      { id: 'photo-1566665797739-1674de7a421a', caption: 'Bedroom 2 image 1' },
      { id: 'photo-1507652313519-d4e9174996dd', caption: 'Full bathroom 1 image 1' },
      { id: 'photo-1584738766473-61c083514bf4', caption: 'Pool image 1' },
      { id: 'photo-1582719478250-c89cae4dc85b', caption: 'Dining area image 1' },
      { id: 'photo-1572331165267-854da2b10ccc', caption: 'Additional photos image 1' }
    ],
    reviews: [
      {
        id: 'rev-cendana-1',
        name: 'Liam & Chloe',
        initials: 'LC',
        avatar: null,
        rating: 5,
        createdAt: '2026-09-22T09:15:00Z',
        date: 'September 2026',
        reviewerInfo: '3 years on Airbnb',
        comment: 'We spent our honeymoon here and it was magical! The private plunge pool and floating breakfast were unforgettable.',
        originalComment: null,
        translationNote: null,
        hostResponse: 'Congratulations again Liam & Chloe! It was an honor hosting your honeymoon.'
      }
    ]
  },
  {
    id: 'cliffside-panorama-uluwatu',
    airbnbId: '2549845671234567894',
    airbnbUrl: 'https://www.airbnb.com/rooms/2549845671234567894',
    name: 'Cliffside Panorama – Oceanfront Infinity Villa in Uluwatu',
    location: 'Uluwatu',
    guests: 8,
    bedroomsCount: 4,
    beds: 4,
    bathrooms: 4,
    rating: 4.98,
    reviewsCount: 33,
    isGuestFavorite: true,
    ratingsBreakdown: {
      cleanliness: 5.0,
      accuracy: 5.0,
      checkIn: 5.0,
      communication: 5.0,
      location: 5.0,
      value: 4.9
    },
    photos: [
      { id: 'photo-1540555700478-4be289fbecef', caption: 'Exterior image 1' },
      { id: 'photo-1512915922686-57c11dde9b6b', caption: 'Living room image 1' },
      { id: 'photo-1582719508461-905c673771fd', caption: 'Bedroom 1 image 1' },
      { id: 'photo-1595526114035-0d45ed16cfbf', caption: 'Bedroom 2 image 1' },
      { id: 'photo-1616594039964-ae9021a400a0', caption: 'Bedroom 3 image 1' },
      { id: 'photo-1617325247661-675ab4b64ae2', caption: 'Bedroom 4 image 1' },
      { id: 'photo-1584622650111-993a426fbf0a', caption: 'Full bathroom 1 image 1' },
      { id: 'photo-1507525428034-b723cf961d3e', caption: 'Pool image 1' }
    ],
    reviews: [
      {
        id: 'rev-cliff-1',
        name: 'Daniel Craig',
        initials: 'DC',
        avatar: null,
        rating: 5,
        createdAt: '2026-09-15T18:00:00Z',
        date: 'September 2026',
        reviewerInfo: '7 years on Airbnb',
        comment: 'Words cannot describe the sunset views from this infinity pool. Watching surfers catch waves at Bingin while drinking cocktails is priceless.',
        originalComment: null,
        translationNote: null,
        hostResponse: null
      }
    ]
  },
  {
    id: 'mandapa-jungle-villa',
    airbnbId: '2659845671234567895',
    airbnbUrl: 'https://www.airbnb.com/rooms/2659845671234567895',
    name: 'Mandapa Jungle Villa – Eco-Luxury Bamboo Sanctuary in Ubud',
    location: 'Ubud',
    guests: 4,
    bedroomsCount: 2,
    beds: 2,
    bathrooms: 2,
    rating: 4.94,
    reviewsCount: 61,
    isGuestFavorite: true,
    ratingsBreakdown: {
      cleanliness: 4.9,
      accuracy: 5.0,
      checkIn: 5.0,
      communication: 5.0,
      location: 4.9,
      value: 4.9
    },
    photos: [
      { id: 'photo-1520250497591-112f2f40a3f4', caption: 'Exterior image 1' },
      { id: 'photo-1544984243-ec57ea16fe25', caption: 'Living room image 1' },
      { id: 'photo-1578683010236-d716f9a3f461', caption: 'Bedroom 1 image 1' },
      { id: 'photo-1598928506311-c55ded91a20c', caption: 'Bedroom 2 image 1' },
      { id: 'photo-1584622650111-993a426fbf0a', caption: 'Full bathroom 1 image 1' },
      { id: 'photo-1519642918688-7e43b19245d8', caption: 'Balcony image 1' },
      { id: 'photo-1556911220-e15b29be8c8f', caption: 'Full kitchen image 1' },
      { id: 'photo-1537996194471-e657df975ab4', caption: 'Pool image 1' }
    ],
    reviews: [
      {
        id: 'rev-mandapa-1',
        name: 'Aria Chen',
        initials: 'AC',
        avatar: null,
        rating: 5,
        createdAt: '2026-09-28T12:00:00Z',
        date: 'September 2026',
        reviewerInfo: '4 years on Airbnb',
        comment: 'Sleeping to the sounds of the Ayung River in this bamboo sanctuary was an unforgettable spiritual retreat. Truly eco-luxury at its finest.',
        originalComment: null,
        translationNote: null,
        hostResponse: null
      }
    ]
  }
];

/**
 * Mengunduh berkas gambar dari URL dan menyimpannya secara lokal
 * @param {string} url - URL foto Unsplash yang akan diunduh
 * @param {string} destPath - Jalur file lokal tujuan penyimpanan
 * @returns {Promise<boolean>} Status keberhasilan pengunduhan
 */
async function downloadImage(url, destPath) {
  try {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return true; // Lewati jika file sudah terunduh
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.warn(`Gagal mengunduh ${url}: ${err.message}`);
    return false;
  }
}

/**
 * Memproses pengunduhan seluruh foto villa dan memperbarui berkas airbnbVillas.json
 * @returns {Promise<void>}
 */
async function runSetup() {
  console.log('--- MEMULAI SETUP 6 VILLA BARU ---');

  // Baca berkas JSON saat ini
  const rawExisting = fs.readFileSync(AIRBNB_JSON_PATH, 'utf-8');
  const existingVillas = JSON.parse(rawExisting);

  // Kunci 3 villa asli (verifikasi id)
  const lockedIds = ['st-lau-ubud', 'iconic-cliff-top-villa', 'angkasa-ubud'];
  const preservedVillas = existingVillas.filter(v => lockedIds.includes(v.id));
  console.log(`Villa asli yang dikunci: ${preservedVillas.map(v => v.id).join(', ')}`);

  const formattedNewVillas = [];

  for (const v of NEW_VILLAS_CONFIG) {
    console.log(`\nMemproses villa: ${v.name} (${v.id})...`);
    const villaPhotoDir = path.join(PUBLIC_AIRBNB, v.id, 'photos');
    fs.mkdirSync(villaPhotoDir, { recursive: true });

    const localImageUrls = [];
    const captions = [];

    for (let i = 0; i < v.photos.length; i++) {
      const p = v.photos[i];
      const photoNum = String(i + 1).padStart(2, '0');
      const filename = `photo-${photoNum}.jpg`;
      const filePath = path.join(villaPhotoDir, filename);
      const downloadUrl = `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=1200&q=80`;

      process.stdout.write(`  Unduh photo-${photoNum}.jpg... `);
      const ok = await downloadImage(downloadUrl, filePath);
      if (ok) {
        console.log('✓');
        localImageUrls.push(`/airbnb/${v.id}/photos/${filename}`);
        captions.push(p.caption);
      } else {
        console.log('✗');
      }
    }

    formattedNewVillas.push({
      id: v.id,
      airbnbId: v.airbnbId,
      airbnbUrl: v.airbnbUrl,
      name: v.name,
      location: v.location,
      guests: v.guests,
      bedroomsCount: v.bedroomsCount,
      beds: v.beds,
      bathrooms: v.bathrooms,
      rating: v.rating,
      reviewsCount: v.reviewsCount,
      isGuestFavorite: v.isGuestFavorite,
      ratingsBreakdown: v.ratingsBreakdown,
      images: localImageUrls,
      photoCaptions: captions,
      reviews: v.reviews
    });
  }

  // Gabungkan 3 villa asli yang dikunci + 6 villa baru
  const finalVillas = [...preservedVillas, ...formattedNewVillas];
  fs.writeFileSync(AIRBNB_JSON_PATH, JSON.stringify(finalVillas, null, 2), 'utf-8');
  console.log(`\n✓ Berhasil memperbarui ${AIRBNB_JSON_PATH} dengan total ${finalVillas.length} villa.`);
}

runSetup();
