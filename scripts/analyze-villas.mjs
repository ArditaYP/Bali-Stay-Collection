import fs from 'fs';

const airbnb = JSON.parse(fs.readFileSync('src/data/airbnbVillas.json', 'utf8'));

const results = airbnb.map((v, i) => {
  const reviews = v.reviews || [];
  const topReviews = reviews
    .filter(r => (r.rating >= 4.8 || !r.rating) && (r.comment || '').length > 40)
    .sort((a, b) => ((b.comment || '').length) - ((a.comment || '').length));
  
  const best = topReviews[0];
  const comment = best ? (best.comment || '').replace(/\n+/g, ' ').trim() : 'Sanctuary privat baru dengan standar kenyamanan tertinggi di Bali.';
  const author = best ? (best.name || 'Tamu Terverifikasi') : 'Tamu Terverifikasi';
  const rating = best?.rating || 5.0;

  return {
    index: i,
    id: v.id,
    name: v.name,
    location: v.location,
    bedrooms: v.bedroomsCount,
    reviewsCount: reviews.length,
    reviewer: author,
    rating,
    comment
  };
});

fs.writeFileSync('scripts/villas-reviews-analysis.json', JSON.stringify(results, null, 2), 'utf8');
console.log(`Analyzed ${results.length} villas. Saved to scripts/villas-reviews-analysis.json.`);
