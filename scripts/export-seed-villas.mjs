import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const airbnbVillas = JSON.parse(fs.readFileSync('./src/data/airbnbVillas.json', 'utf8'));

// Import bscVillasData by reading and parsing or evaluating
const bscContent = fs.readFileSync('./src/data/bscVillasData.js', 'utf8');

// Extract BSC_VILLAS from bscVillasData.js
// It is between `export const BSC_VILLAS = [` and `];`
const bscMatch = bscContent.match(/export const BSC_VILLAS = (\[[\s\S]*?\n\];)/);
if (!bscMatch) {
  console.error('Failed to match BSC_VILLAS');
  process.exit(1);
}

// Evaluate BSC_VILLAS safely
const bscVillasCode = bscMatch[1].replace(/;$/, '');
const BSC_VILLAS = eval(bscVillasCode);

console.log('Loaded BSC_VILLAS count:', BSC_VILLAS.length);

// Also extract VILLA_DETAILS from villasData.js
const vContent = fs.readFileSync('./src/data/villasData.js', 'utf8');
const vdMatch = vContent.match(/export const VILLA_DETAILS = (\[[\s\S]*?\n\];)/);
let VILLA_DETAILS = [];
if (vdMatch) {
  VILLA_DETAILS = eval(vdMatch[1].replace(/;$/, ''));
}
console.log('Loaded VILLA_DETAILS count:', VILLA_DETAILS.length);

const initMap = new Map();
VILLA_DETAILS.forEach(v => initMap.set(v.id, v));

const combined = BSC_VILLAS.map(bv => {
  const init = initMap.get(bv.id) || {};
  return {
    ...bv,
    ...init,
    name: init.name || bv.name,
    tier: init.tier || bv.tier || 'Premium',
    category: init.category || bv.tier || 'Premium',
    area: bv.area || init.location || 'Bali',
    location: init.location || bv.area || 'Bali',
    address: init.address || bv.area || 'Bali',
    price: init.price || bv.price || 0,
    beds: init.beds || bv.beds || 1,
    baths: init.baths || bv.baths || 1,
    bathrooms: init.bathrooms || init.baths || bv.baths || 1,
    guests: init.guests || bv.guests || 2,
    shortDesc: init.shortDesc || bv.why || bv.desc || '',
    description: init.description || bv.desc || bv.why || '',
    fullDesc: init.fullDesc || init.description || bv.desc || '',
    why: bv.why || '',
    cancel: bv.cancel || '',
    verified: Boolean(bv.verified),
    updated: bv.updated || 'Recent',
    pick: Boolean(bv.pick),
    tone: bv.tone || ['#B9C7CF', '#E4EBEE'],
    img: init.img || bv.img || '',
    images: init.images?.length ? init.images : (bv.img ? [bv.img] : []),
    trips: bv.trips || [],
    setting: bv.setting || [],
    amenities: init.amenities || bv.am || [],
    am: bv.am || init.amenities || [],
    sc: bv.sc || [2, 2, 2, 2, 2],
    know: bv.know || []
  };
});

VILLA_DETAILS.forEach(iv => {
  if (!combined.some(c => c.id === iv.id)) {
    combined.push({
      ...iv,
      tier: iv.tier || iv.category || 'Premium',
      category: iv.category || iv.tier || 'Premium',
      area: iv.location || 'Bali',
      address: iv.address || iv.location || 'Bali',
      bathrooms: iv.bathrooms || iv.baths || 1,
      shortDesc: iv.shortDesc || iv.description || '',
      fullDesc: iv.fullDesc || iv.description || '',
      why: '',
      cancel: '',
      verified: true,
      updated: 'Recent',
      pick: false,
      tone: ['#B9C7CF', '#E4EBEE'],
      img: iv.img || (iv.images && iv.images[0]) || '',
      trips: [],
      setting: [],
      am: iv.amenities || [],
      sc: [2, 2, 2, 2, 2],
      know: []
    });
  }
});

console.log('Total combined villas to export:', combined.length);
fs.writeFileSync('api/seed_villas.json', JSON.stringify(combined, null, 2));
console.log('Wrote to api/seed_villas.json successfully!');
