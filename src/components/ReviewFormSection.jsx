import React, { useState } from 'react';

/**
 * Komponen ReviewFormSection
 * Menyediakan area / section khusus bagi tamu untuk menulis ulasan (Leave a Review) di setiap villa.
 * Dilengkapi dengan:
 * - Pemilih rating bintang interaktif (1 - 5 bintang)
 * - Input nama tamu dan periode menginap
 * - Penilaian detail per kategori (Cleanliness, Accuracy, Check-in, Communication, Location, Value)
 * - Kolom pesan ulasan pengalaman menginap
 * - Tombol kirim ulasan yang siap dihubungkan ke backend nantinya
 * 
 * @param {Object} props
 * @param {string} props.villaName - Nama villa yang sedang diulas
 * @param {Function} props.onAddReview - Callback saat ulasan baru dikirim (untuk memperbarui state list ulasan)
 */
export default function ReviewFormSection({ villaName, onAddReview }) {
  // State untuk membuka / menutup formulir review
  const [isOpenForm, setIsOpenForm] = useState(false);

  // State data formulir ulasan
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [stayPeriod, setStayPeriod] = useState('October 2026 · Stayed 3 nights');
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // State penilaian kategori opsional
  const [categoryRatings, setCategoryRatings] = useState({
    cleanliness: 5,
    accuracy: 5,
    checkIn: 5,
    communication: 5,
    location: 5,
    value: 5
  });

  /**
   * Menangani pengiriman form ulasan baru
   * Mengambil input, membuat objek ulasan, memanggil callback onAddReview,
   * dan menampilkan pesan sukses
   * @param {React.FormEvent} e - Event submit form
   */
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!authorName.trim() || !comment.trim()) {
      alert('Silakan masukkan nama Anda dan tulis ulasan pengalaman menginap.');
      return;
    }

    // Membuat inisial nama untuk avatar
    const nameParts = authorName.trim().split(' ');
    const initials = nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : authorName.slice(0, 2).toUpperCase();

    const newReview = {
      name: authorName.trim(),
      initials: initials,
      date: stayPeriod || 'October 2026',
      stay: 'Stayed 3 nights',
      rating: rating,
      comment: comment.trim()
    };

    if (typeof onAddReview === 'function') {
      onAddReview(newReview);
    }

    setIsSuccess(true);
    setAuthorName('');
    setComment('');

    // Reset pesan sukses setelah beberapa detik
    setTimeout(() => {
      setIsSuccess(false);
      setIsOpenForm(false);
    }, 2500);
  };

  /**
   * Mengatur nilai rating kategori spesifik
   * @param {string} catKey - Kunci kategori ('cleanliness', 'accuracy', dll)
   * @param {number} value - Nilai rating (1 - 5)
   */
  const handleCategoryRatingChange = (catKey, value) => {
    setCategoryRatings(prev => ({
      ...prev,
      [catKey]: value
    }));
  };

  return (
    <div className="review-form-section" style={{
      marginTop: '28px',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid var(--line)',
      background: 'var(--bg)'
    }}>
      {/* Header Section Tempat Review */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: isOpenForm ? '20px' : '0'
      }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>
            Have you stayed at {villaName}?
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
            Bagikan ulasan dan penilaian Anda untuk membantu calon tamu lainnya.
          </p>
        </div>

        {/* Tombol Toggle Buka Form Review */}
        <button
          type="button"
          className="btn-outline"
          onClick={() => setIsOpenForm(!isOpenForm)}
          style={{
            fontSize: '13px',
            padding: '8px 16px',
            borderRadius: '8px'
          }}
        >
          {isOpenForm ? 'Tutup Formulir' : '✍️ Tulis Ulasan'}
        </button>
      </div>

      {/* Formulir Input Ulasan (Tampil saat isOpenForm bernilai true) */}
      {isOpenForm && (
        <form onSubmit={handleSubmitReview} style={{ marginTop: '16px' }}>
          {isSuccess ? (
            <div style={{
              background: '#EFF6EE',
              color: '#2F6B3A',
              padding: '16px',
              borderRadius: '10px',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '14px'
            }}>
              ✓ Terima kasih! Ulasan Anda telah berhasil disimpan dan ditambahkan ke daftar ulasan.
            </div>
          ) : (
            <>
              {/* 1. Pemilihan Rating Bintang Keseluruhan */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Overall Rating *
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: star <= (hoverRating || rating) ? '#D4AF37' : '#D1CFC7',
                        padding: '0 2px',
                        transition: 'transform 0.1s ease'
                      }}
                      title={`${star} Star`}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ fontSize: '13px', fontWeight: 700, marginLeft: '8px', color: 'var(--ink)' }}>
                    {hoverRating || rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* 2. Rating Per Kategori */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
                marginBottom: '18px',
                padding: '14px',
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid var(--line)'
              }}>
                {[
                  { key: 'cleanliness', label: 'Cleanliness' },
                  { key: 'accuracy', label: 'Accuracy' },
                  { key: 'checkIn', label: 'Check-in' },
                  { key: 'communication', label: 'Communication' },
                  { key: 'location', label: 'Location' },
                  { key: 'value', label: 'Value' }
                ].map((cat) => (
                  <div key={cat.key}>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>
                      {cat.label}
                    </span>
                    <select
                      value={categoryRatings[cat.key]}
                      onChange={(e) => handleCategoryRatingChange(cat.key, Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--line)',
                        fontSize: '12.5px',
                        background: 'var(--bg)'
                      }}
                    >
                      <option value="5">★ 5.0</option>
                      <option value="4">★ 4.0</option>
                      <option value="3">★ 3.0</option>
                      <option value="2">★ 2.0</option>
                      <option value="1">★ 1.0</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* 3. Input Nama dan Periode Menginap */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '14px'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Budi Santoso"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: '#fff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                    When did you stay? (Month &amp; Duration)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. September 2026 · Stayed 4 nights"
                    value={stayPeriod}
                    onChange={(e) => setStayPeriod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: '#fff'
                    }}
                  />
                </div>
              </div>

              {/* 4. Kolom Pesan Ulasan */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                  Your Review / Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ceritakan pengalaman Anda: suasana villa, pelayanan staf, kolam renang, kebersihan, atau tips bagi tamu lain…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: '#fff',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Tombol Kirim Ulasan */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsOpenForm(false)}
                  style={{ padding: '9px 18px', borderRadius: '8px', fontSize: '13px' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '9px 22px', borderRadius: '8px', fontSize: '13px' }}
                >
                  Kirim Ulasan
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}
