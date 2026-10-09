import fs from 'fs';

const airbnbData = JSON.parse(fs.readFileSync('./src/data/airbnbVillas.json', 'utf8'));

console.log("Analyzing 35 villas for best reviews...");
let count = 0;
for (const [key, v] of Object.entries(airbnbData)) {
  const reviews = v.reviews || [];
  // Cari review bintang 5 terpanjang / paling antusias
  const bestReviews = reviews
    .filter(r => (r.rating >= 4.8 || !r.rating) && (r.comments || r.comment || '').length > 50)
    .sort((a, b) => ((b.comments || b.comment || '').length) - ((a.comments || a.comment || '').length));
  
  const best = bestReviews[0];
  const commentSnippet = best ? (best.comments || best.comment || '').slice(0, 180).replace(/\n/g, ' ') : 'Villa baru yang siap memberikan pengalaman menginap privat terbaik.';
  const reviewerName = best ? (best.author || best.reviewer || 'Tamu Terverifikasi') : 'Tamu Terverifikasi';
  
  console.log(`[${v.id}] (${v.name}): ${reviewerName} -> "${commentSnippet}..."`);
  count++;
}
console.log(`Total analyzed: ${count}`);
