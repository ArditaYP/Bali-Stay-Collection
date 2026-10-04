import React, { useEffect, useMemo, useState } from 'react';
import ReviewCard from '../ReviewCard';
import ReviewMentions from '../ReviewMentions';
import { getMentionsForReviews, reviewMatchesTopic, getTopicKeywords } from '../../utils/reviewMentions';

/** Label & urutan kategori rating yang ditampilkan di panel kiri */
const CATEGORIES = [
  { key: 'cleanliness', label: 'Cleanliness' },
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'checkIn', label: 'Check-in' },
  { key: 'communication', label: 'Communication' },
  { key: 'location', label: 'Location' },
  { key: 'value', label: 'Value' }
];

/** Pilihan pengurutan review */
const SORTS = {
  recent: { label: 'Most recent', fn: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0) },
  highest: { label: 'Highest rated', fn: (a, b) => b.rating - a.rating || new Date(b.createdAt || 0) - new Date(a.createdAt || 0) },
  lowest: { label: 'Lowest rated', fn: (a, b) => a.rating - b.rating || new Date(b.createdAt || 0) - new Date(a.createdAt || 0) }
};

/**
 * ReviewsModal
 * Modal "Show all reviews": panel kiri berisi ringkasan rating (skor besar, distribusi bintang,
 * rating per kategori), panel kanan berisi daftar semua review yang bisa disaring berdasarkan topik mention
 * (Guest reviews mention), pencarian teks bebas, bintang, dan diurutkan.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Status modal terbuka/tertutup
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {Object} props.villa - Data villa (rating, reviewsCount, ratingsBreakdown, name)
 * @param {Object[]} props.reviews - Daftar seluruh review yang akan ditampilkan
 * @param {string|null} [props.initialMention=null] - Pilihan topik awal dari halaman detail
 */
export default function ReviewsModal({ isOpen, onClose, villa, reviews = [], initialMention = null }) {
  // Kata kunci pencarian review
  const [query, setQuery] = useState('');
  // Mode pengurutan aktif ('recent' | 'highest' | 'lowest')
  const [sortKey, setSortKey] = useState('recent');
  // Filter bintang (null = semua, atau angka 1–5)
  const [starFilter, setStarFilter] = useState(null);
  // Filter topik mention aktif (misal: 'location', 'breakfast', atau null)
  const [selectedMention, setSelectedMention] = useState(initialMention);

  // Kunci scroll halaman belakang + tutup modal dengan tombol Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Reset pencarian & filter setiap kali modal dibuka ulang, atau sesuaikan dengan initialMention
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setStarFilter(null);
      setSortKey('recent');
      setSelectedMention(initialMention);
    }
  }, [isOpen, initialMention]);

  // Ekstraksi topik-topik mention yang dibahas tamu untuk villa ini
  const mentions = useMemo(() => getMentionsForReviews(reviews), [reviews]);

  // Jumlah review per bintang (untuk grafik distribusi 5★ → 1★)
  const distribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => { counts[Math.round(r.rating) || 5] += 1; });
    return counts;
  }, [reviews]);

  // Daftar review setelah difilter (topik mention + bintang + kata kunci) lalu diurutkan
  const visibleReviews = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews
      .filter((r) => (starFilter ? Math.round(r.rating) === starFilter : true))
      .filter((r) => (selectedMention ? reviewMatchesTopic(r, selectedMention) : true))
      .filter((r) => (q ? `${r.comment} ${r.name}`.toLowerCase().includes(q) : true))
      .sort(SORTS[sortKey].fn);
  }, [reviews, query, sortKey, starFilter, selectedMention]);

  // Kata kunci yang akan disorot pada kartu review (dari topik mention aktif dan input pencarian)
  const highlightKeywords = useMemo(() => {
    const list = [];
    if (query.trim()) list.push(query.trim());
    if (selectedMention) {
      list.push(...getTopicKeywords(selectedMention));
    }
    return list;
  }, [query, selectedMention]);

  if (!isOpen) return null;

  const breakdown = villa.ratingsBreakdown || {};

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="All reviews">
      <div className="modal-content reviews-modal" onClick={(e) => e.stopPropagation()}>
        {/* Tombol tutup */}
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup">✕</button>

        <div className="reviews-modal-body">
          {/* ===== Panel kiri: ringkasan rating ===== */}
          <aside className="reviews-modal-side">
            <div className="rm-score">
              <span className="rm-laurel" aria-hidden="true">❦</span>
              <span className="rm-num">{Number(villa.rating).toFixed(2)}</span>
              <span className="rm-laurel flip" aria-hidden="true">❦</span>
            </div>
            <p className="rm-sub">
              {villa.isGuestFavorite ? 'Guest favorite · ' : ''}{villa.reviewsCount} reviews
            </p>

            {/* Distribusi bintang — bisa diklik untuk memfilter */}
            <div className="rm-dist">
              <div className="rm-title">Overall rating</div>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`rm-dist-row ${starFilter === star ? 'active' : ''}`}
                  onClick={() => setStarFilter(starFilter === star ? null : star)}
                  title={`Tampilkan review ${star} bintang`}
                >
                  <span>{star}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${reviews.length ? (distribution[star] / reviews.length) * 100 : 0}%` }} />
                  </div>
                  <span className="rm-count">{distribution[star]}</span>
                </button>
              ))}
            </div>

            {/* Rating per kategori */}
            <div className="rm-cats">
              {CATEGORIES.filter((c) => breakdown[c.key]).map((c) => (
                <div key={c.key} className="rm-cat-row">
                  <span>{c.label}</span>
                  <b>{Number(breakdown[c.key]).toFixed(1)}</b>
                </div>
              ))}
            </div>
          </aside>

          {/* ===== Panel kanan: daftar review ===== */}
          <section className="reviews-modal-main">
            <div className="rm-head">
              <h2>{villa.reviewsCount} reviews</h2>
              {/* Dropdown pengurutan */}
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className="rm-sort">
                {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
              </select>
            </div>

            {/* Kolom pencarian review */}
            <div className="rm-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B6860" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="search"
                placeholder="Search reviews"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Bilah Topic Mention Pills */}
            <ReviewMentions
              mentions={mentions}
              selectedMention={selectedMention}
              onSelectMention={setSelectedMention}
              totalCount={reviews.length}
              variant="compact"
            />

            {/* Info filter aktif */}
            {(starFilter || query || selectedMention) && (
              <p className="rm-filter-note">
                Showing {visibleReviews.length} review{visibleReviews.length === 1 ? '' : 's'}
                {starFilter ? ` with ${starFilter} stars` : ''}
                {selectedMention ? ` mentioning “${mentions.find((m) => m.id === selectedMention)?.label || selectedMention}”` : ''}
                {query ? ` matching “${query}”` : ''}
                {' · '}
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setQuery('');
                    setStarFilter(null);
                    setSelectedMention(null);
                  }}
                >
                  Clear all
                </button>
              </p>
            )}

            {/* Daftar review (scroll di dalam panel) */}
            <div className="rm-list">
              {visibleReviews.length ? (
                visibleReviews.map((r, i) => (
                  <ReviewCard key={r.id || i} review={r} highlight={highlightKeywords} />
                ))
              ) : (
                <p className="rm-empty">No reviews match your search.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
