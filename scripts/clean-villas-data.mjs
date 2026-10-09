import fs from 'fs';
import path from 'path';
import { ENGLISH_NLP_VILLAS } from './apply-english-nlp-all-villas.mjs';

const villasDataPath = path.resolve('src/data/villasData.js');
let content = fs.readFileSync(villasDataPath, 'utf8');

// Regex untuk membersihkan setiap properti why di VILLA_DETAILS
for (const [id, data] of Object.entries(ENGLISH_NLP_VILLAS)) {
  // Bersihkan why yang berantakan dengan teks Indonesia yang menempel
  // Cari blok villa ini
  const blockStart = content.indexOf(`'${id}': {`);
  if (blockStart !== -1) {
    const nextBlock = content.indexOf('\n  },', blockStart);
    if (nextBlock !== -1) {
      let block = content.substring(blockStart, nextBlock + 5);

      // Ganti shortDesc dengan versi English murni
      block = block.replace(/shortDesc:\s*'[^']*'/, `shortDesc: '${data.shortDesc.replace(/'/g, "\\'")}'`);

      // Ganti description dengan template literal English murni
      block = block.replace(/description:\s*(`[^`]*`|'[^']*')/, `description: \`${data.description.replace(/`/g, "\\`").replace(/\${/g, "\\${")}\``);

      // Ganti why dengan versi English murni, membuang semua trailing string sampah
      block = block.replace(/why:\s*['`][\s\S]*?['`](?=,\s*\n\s*amenities)/, `why: '${data.why.replace(/'/g, "\\'")}'`);

      content = content.substring(0, blockStart) + block + content.substring(nextBlock + 5);
    }
  }
}

// Hapus entri duplikat kedua dari 'house-terra' jika ada
const firstHouseTerra = content.indexOf("'house-terra': {");
if (firstHouseTerra !== -1) {
  const secondHouseTerra = content.indexOf("'house-terra': {", firstHouseTerra + 20);
  if (secondHouseTerra !== -1) {
    const endSecond = content.indexOf('\n  },', secondHouseTerra);
    if (endSecond !== -1) {
      console.log("Removing duplicate second house-terra entry...");
      content = content.substring(0, secondHouseTerra) + content.substring(endSecond + 5);
    }
  }
}

fs.writeFileSync(villasDataPath, content, 'utf8');
console.log("Cleaned villasData.js successfully!");
