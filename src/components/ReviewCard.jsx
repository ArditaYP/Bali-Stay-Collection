import React, { useState } from 'react';

/**
 * StarRow
 * Menampilkan deretan bintang (1–5) sesuai rating sebuah review.
 * @param {Object} props
 * @param {number} props.rating - Nilai bintang (1 sampai 5)
 * @param {number} [props.size=11] - Ukuran ikon bintang dalam pixel
 */
export function StarRow({ rating = 5, size = 11 }) {
  return (
    <span className="star-row" aria-label={`Rating ${rating} dari 5 bintang`}>
      {[1, 2, 3, 4, 5].map((n) => (
        // Bintang penuh jika n <= rating, selain itu bintang abu-abu
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" fill={n <= rating ? '#D4AF37' : '#DDDAD2'}>
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * ReviewAvatar
 * Foto profil tamu. Jika foto tidak ada / gagal dimuat, otomatis menampilkan inisial nama.
 * @param {Object} props
 * @param {Object} props.review - Data review (butuh avatar, name, initials)
 * @param {number} [props.size=44] - Diameter avatar dalam pixel
 */
export function ReviewAvatar({ review, size = 44 }) {
  // Menandai apakah gambar gagal dimuat, supaya bisa beralih ke inisial
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size, minWidth: size };

  if (review.avatar && !failed) {
    return (
      <img
        className="review-avatar review-avatar-img"
        src={review.avatar}
        alt={`Foto ${review.name}`}
        style={style}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <div className="review-avatar" style={style}>{review.initials}</div>;
}

/**
 * ReviewCard
 * Satu kartu review tamu: foto avatar, nama, info tamu, rating bintang, tanggal, dan isi ulasan.
 * Teks panjang dipotong dulu dan bisa dibuka dengan tombol "Show more".
 *
 * @param {Object} props
 * @param {Object} props.review - Data review tamu
 * @param {boolean} [props.clamp=true] - Jika true, isi review dipotong maksimal beberapa baris
 * @param {string} [props.highlight] - Kata kunci pencarian yang akan di-highlight di teks
 */
export default function ReviewCard({ review, clamp = true, highlight = '' }) {
  // State untuk membuka/menutup teks review yang panjang
  const [expanded, setExpanded] = useState(false);
  // State untuk menampilkan teks asli (sebelum diterjemahkan)
  const [showOriginal, setShowOriginal] = useState(false);

  const text = showOriginal && review.originalComment ? review.originalComment : review.comment;
  // Dianggap "panjang" jika lebih dari ~220 karakter atau punya banyak baris
  const isLong = text.length > 220 || text.split('\n').length > 4;

  /**
   * Membungkus kata kunci pencarian atau topik mention dengan <mark> agar terlihat menonjol.
   * Mendukung kata kunci tunggal (string) maupun kumpulan kata kunci topik (array of strings).
   * @param {string} str - Teks review
   * @returns {React.ReactNode} Teks yang telah disorot kata kuncinya
   */
  const renderText = (str) => {
    if (!str) return '';
    const keywords = (Array.isArray(highlight) ? highlight : [highlight])
      .map((k) => (typeof k === 'string' ? k.trim() : ''))
      .filter((k) => k.length > 0);

    if (keywords.length === 0) return str;

    // Urutkan kata kunci dari yang terpanjang agar frasa multi-kata cocok lebih dulu
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
    const regexPattern = sortedKeywords
      .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');

    if (!regexPattern) return str;

    const regex = new RegExp(`(${regexPattern})`, 'gi');
    return str.split(regex).map((part, i) => {
      const isMatch = sortedKeywords.some((k) => k.toLowerCase() === part.toLowerCase());
      return isMatch ? <mark key={i} className="review-highlight">{part}</mark> : part;
    });
  };

  return (
    <div className="review-card">
      {/* Header: foto + nama + info tamu */}
      <div className="reviewer">
        <ReviewAvatar review={review} />
        <div>
          <div className="name">{review.name}</div>
          {review.reviewerInfo && <div className="when">{review.reviewerInfo}</div>}
        </div>
      </div>

      {/* Bintang + tanggal menginap */}
      <div className="review-meta">
        <StarRow rating={review.rating} />
        <span>&middot;</span>
        <span>{review.date}</span>
      </div>

      {/* Isi review (dipotong jika panjang) */}
      <p className={`review-text ${clamp && isLong && !expanded ? 'clamped' : ''}`}>
        {renderText(text)}
      </p>

      {/* Tombol aksi: buka teks penuh & lihat teks asli */}
      <div className="review-actions">
        {clamp && isLong && (
          <button type="button" className="link-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
        {review.originalComment && (
          <button type="button" className="link-btn muted" onClick={() => setShowOriginal(!showOriginal)}>
            {showOriginal ? 'Show translation' : `${review.translationNote} · Show original`}
          </button>
        )}
      </div>
    </div>
  );
}
