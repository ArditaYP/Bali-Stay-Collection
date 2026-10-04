/**
 * reviewMentions.js
 * Utilitas dan konfigurasi topik "Guest reviews mention" seperti di Airbnb.
 * Mendeteksi topik-topik populer dari komentar tamu secara otomatis (Location, Breakfast, Pool, Staff, dll).
 */

/**
 * Daftar kategori topik review beserta kata kunci pencariannya (dalam bahasa Inggris & Indonesia)
 */
export const REVIEW_TOPICS = [
  {
    id: 'location',
    label: 'Location',
    icon: '📍',
    keywords: ['location', 'walk', 'walking distance', 'close to', 'nearby', 'area', 'central', 'lokasi', 'secluded', 'surroundings']
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    icon: '🍳',
    keywords: ['breakfast', 'floating breakfast', 'food', 'morning meal', 'sarapan', 'pancake', 'fruit']
  },
  {
    id: 'pool',
    label: 'Pool',
    icon: '🏊',
    keywords: ['pool', 'infinity pool', 'swim', 'swimming', 'swimming pool', 'kolam renang']
  },
  {
    id: 'staff',
    label: 'Staff & Host',
    icon: '👥',
    keywords: ['staff', 'host', 'hospitality', 'manager', 'service', 'team', 'helpful', 'attentive', 'friendly', 'staf', 'pelayanan', 'tuan rumah']
  },
  {
    id: 'cleanliness',
    label: 'Cleanliness',
    icon: '✨',
    keywords: ['clean', 'spotless', 'tidy', 'neat', 'cleanliness', 'bersih', 'kebersihan']
  },
  {
    id: 'peaceful',
    label: 'Peaceful',
    icon: '🌿',
    keywords: ['peaceful', 'quiet', 'tranquil', 'calm', 'serene', 'relaxing', 'chill', 'tenang', 'sunyi', 'damai']
  },
  {
    id: 'views',
    label: 'Views',
    icon: '🌅',
    keywords: ['view', 'views', 'sunset', 'ocean', 'jungle', 'panorama', 'scenery', 'cliff', 'pemandangan']
  },
  {
    id: 'comfort',
    label: 'Comfort & Bed',
    icon: '🛏️',
    keywords: ['bed', 'bedding', 'bedsheets', 'comfortable', 'comfy', 'cozy', 'spacious', 'kasur', 'nyaman', 'lapang']
  }
];

/**
 * Memeriksa apakah sebuah ulasan menyebutkan salah satu kata kunci dari topik tertentu
 * @param {Object} review - Objek ulasan tamu
 * @param {string} topicId - ID topik yang ingin dicocokkan (misal: 'location', 'breakfast')
 * @returns {boolean} True jika ulasan menyebutkan topik tersebut
 */
export function reviewMatchesTopic(review, topicId) {
  if (!review || !topicId) return false;
  const topic = REVIEW_TOPICS.find((t) => t.id === topicId);
  if (!topic) return false;

  const combinedText = `${review.comment || ''} ${review.originalComment || ''}`.toLowerCase();
  return topic.keywords.some((kw) => combinedText.includes(kw.toLowerCase()));
}

/**
 * Menghitung dan mengekstrak daftar topik mention yang relevan untuk sekumpulan ulasan
 * Hanya mengembalikan topik yang memiliki setidaknya 1 ulasan yang cocok,
 * diurutkan berdasarkan jumlah ulasan terbanyak (paling sering dibahas tamu).
 *
 * @param {Object[]} reviews - Daftar seluruh ulasan tamu
 * @returns {Array<{ id: string, label: string, icon: string, count: number, keywords: string[] }>}
 */
export function getMentionsForReviews(reviews = []) {
  if (!Array.isArray(reviews) || reviews.length === 0) return [];

  const results = [];

  for (const topic of REVIEW_TOPICS) {
    const matchingCount = reviews.filter((r) => reviewMatchesTopic(r, topic.id)).length;
    if (matchingCount > 0) {
      results.push({
        id: topic.id,
        label: topic.label,
        icon: topic.icon,
        count: matchingCount,
        keywords: topic.keywords
      });
    }
  }

  // Urutkan dari yang paling sering dibahas tamu
  return results.sort((a, b) => b.count - a.count);
}

/**
 * Mendapatkan daftar kata kunci untuk suatu topik berdasarkan ID-nya
 * @param {string} topicId - ID topik (contoh: 'breakfast')
 * @returns {string[]} Array kata kunci
 */
export function getTopicKeywords(topicId) {
  const topic = REVIEW_TOPICS.find((t) => t.id === topicId);
  return topic ? topic.keywords : [];
}
