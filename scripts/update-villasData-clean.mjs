import fs from 'fs';
import path from 'path';
import { ENGLISH_NLP_VILLAS } from './apply-english-nlp-all-villas.mjs';

const villasDataPath = path.resolve('src/data/villasData.js');
let code = fs.readFileSync(villasDataPath, 'utf8');

const startMarker = 'const VILLA_DETAILS = {';
const startIndex = code.indexOf(startMarker);
const endIndex = code.indexOf('\n};\n\n/**', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not locate VILLA_DETAILS boundaries!");
  process.exit(1);
}

const header = code.substring(0, startIndex + startMarker.length);
const footer = code.substring(endIndex);
const body = code.substring(startIndex + startMarker.length, endIndex);

const entries = [];
const regex = /'([a-z0-9-]+)':\s*\{([\s\S]*?)\n  \}(,)?/g;
let match;
const seen = new Set();

while ((match = regex.exec(body)) !== null) {
  const id = match[1];
  if (seen.has(id)) {
    console.log(`Skipping duplicate key: ${id}`);
    continue;
  }
  seen.add(id);

  let blockContent = match[2];
  const nlp = ENGLISH_NLP_VILLAS[id];

  const getProp = (name) => {
    // Mencocokkan: string dalam petik satu (termasuk escaped), string dalam petik dua, boolean, angka, atau array
    const pRegex = new RegExp(`${name}:\\s*('(\\\\.|[^'])*'|"[^"]*"|true|false|\\d+|\\{[\\s\\S]*?\\}|\\[[\\s\\S]*?\\])`);
    const pMatch = blockContent.match(pRegex);
    return pMatch ? pMatch[1].trim() : null;
  };

  const category = getProp('category') || "'Premium'";
  const price = getProp('price') || "250";
  const cleaningFee = getProp('cleaningFee') || "35";
  const freeCancel = getProp('freeCancel') || "true";
  const cardBg = getProp('cardBg') || "'#DFD3C3'";
  const bookedDays = getProp('bookedDays') || "[]";
  const address = getProp('address') || "'Bali'";
  const location = getProp('location') || "'Bali'";
  const amenities = getProp('amenities') || "['Private pool', 'High-speed WiFi', 'Air conditioning']";
  
  const bedMatch = blockContent.match(/bedrooms:\s*(\[[\s\S]*?\n    \])/);
  const bedroomsStr = bedMatch ? `,\n    bedrooms: ${bedMatch[1]}` : '';

  const shortDesc = nlp ? nlp.shortDesc : "Private luxury villa sanctuary in Bali.";
  const description = nlp ? nlp.description : "Experience unmatched privacy and luxury.";
  const why = nlp ? nlp.why : "Verified by Bali Stay Collection.";

  const newEntry = `\n  '${id}': {
    category: ${category},
    price: ${price},
    cleaningFee: ${cleaningFee},
    freeCancel: ${freeCancel},
    cardBg: ${cardBg},
    bookedDays: ${bookedDays},
    address: ${address},
    location: ${location},
    shortDesc: ${JSON.stringify(shortDesc)},
    description: ${JSON.stringify(description)},
    why: ${JSON.stringify(why)},
    amenities: ${amenities}${bedroomsStr}
  }`;

  entries.push(newEntry);
}

const newBody = entries.join(',') + '\n';
const finalCode = header + newBody + footer;

fs.writeFileSync(villasDataPath, finalCode, 'utf8');
console.log(`Reconstructed VILLA_DETAILS cleanly with ${entries.length} unique entries!`);
