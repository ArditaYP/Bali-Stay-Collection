import React, { useEffect } from 'react';

/**
 * Memformat dan merender blok teks deskripsi villa menjadi elemen JSX terstruktur
 * Mendeteksi judul bagian huruf kapital (seperti LIVING & DINING, THE SPACE, dll)
 * dan memformat paragraf serta daftar butir secara rapi.
 * 
 * @param {string} text - Teks deskripsi lengkap villa
 * @returns {React.JSX.Element[]} Array elemen paragraf dan subjudul JSX terformat
 */
function renderFormattedDescription(text) {
  if (!text) return null;
  const normalized = typeof text === 'string' ? text.replace(/\\n/g, '\n') : String(text);
  const blocks = normalized.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Deteksi apakah blok ini merupakan judul bagian kapital (misal: LIVING & DINING, KITCHEN, dll)
    const isHeaderLine = /^[A-Z0-9\s&•·\-_/:]{3,40}$/.test(trimmed.split('\n')[0]);
    if (isHeaderLine && trimmed.split('\n').length === 1) {
      return (
        <h4 
          key={index} 
          className="desc-modal-section-title"
          style={{
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            color: 'var(--ink, #141413)',
            marginTop: '22px',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}
        >
          {trimmed}
        </h4>
      );
    }

    // Jika blok memiliki judul kapital di baris pertama diikuti penjelasan di baris berikutnya
    const lines = trimmed.split('\n');
    if (lines.length > 1 && /^[A-Z0-9\s&•·\-_/:]{3,40}$/.test(lines[0].trim())) {
      const header = lines[0].trim();
      const body = lines.slice(1).join('\n');
      return (
        <div key={index} style={{ marginTop: '20px', marginBottom: '14px' }}>
          <h4 
            className="desc-modal-section-title"
            style={{
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: 'var(--ink, #141413)',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            {header}
          </h4>
          <p 
            className="desc-modal-p"
            style={{
              fontSize: '14.5px',
              lineHeight: 1.7,
              color: 'var(--ink-soft, #484841)',
              margin: 0,
              whiteSpace: 'pre-line'
            }}
          >
            {body}
          </p>
        </div>
      );
    }

    return (
      <p 
        key={index}
        className="desc-modal-p"
        style={{
          fontSize: '14.5px',
          lineHeight: 1.7,
          color: 'var(--ink-soft, #484841)',
          marginTop: 0,
          marginBottom: '14px',
          whiteSpace: 'pre-line'
        }}
      >
        {trimmed}
      </p>
    );
  });
}

/**
 * Komponen Modal DescriptionModal
 * Menampilkan popup detail penjelasan lengkap villa (About this space / About this villa)
 * sesuai instruksi Coach: di halaman awal hanya tampil penjelasan ringkas,
 * lalu saat tamu mengklik 'Show more', modal ini terbuka dengan informasi rinci.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Status apakah modal sedang terbuka
 * @param {Function} props.onClose - Callback untuk menutup modal
 * @param {Object} props.villa - Objek data villa lengkap yang sedang aktif
 * @returns {React.JSX.Element|null} Elemen JSX modal deskripsi atau null jika tertutup
 */
export default function DescriptionModal({ isOpen, onClose, villa }) {
  // Tutup modal menggunakan tombol Escape dan kunci scroll background halaman
  useEffect(() => {
    if (!isOpen) return undefined;

    /**
     * Menangani penekanan tombol keyboard Escape untuk menutup modal
     * @param {KeyboardEvent} e - Event keyboard
     * @returns {void}
     */
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !villa) return null;

  const hasCustomFullDesc = Boolean(villa.fullDesc && typeof villa.fullDesc === 'string' && villa.fullDesc.trim().length > 0);
  const primaryText = hasCustomFullDesc ? villa.fullDesc : (villa.description || villa.shortDesc || '');

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="desc-modal-title"
    >
      <div 
        className="modal-content desc-modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.22)'
        }}
      >
        {/* Tombol Tutup Silang di Kanan Atas */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Tutup detail penjelasan"
          style={{ top: '20px', right: '20px' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header Modal */}
        <div style={{ marginBottom: '20px', paddingRight: '40px' }}>
          <h2 
            id="desc-modal-title" 
            style={{ 
              fontSize: '22px', 
              fontWeight: 700, 
              color: 'var(--ink, #141413)',
              margin: '0 0 6px' 
            }}
          >
            About this space
          </h2>
          <div style={{ fontSize: '13.5px', color: 'var(--muted, #6B6860)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>{villa.name}</span>
            <span>&middot;</span>
            <span>{villa.location}, Bali</span>
            {villa.rating && (
              <>
                <span>&middot;</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#141413', fontWeight: 600 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#141413">
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                  </svg>
                  {villa.rating} ({villa.reviewsCount} reviews)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Ringkasan Cepat Fasilitas & Ruangan */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'wrap', 
            padding: '12px 16px', 
            background: 'var(--bg-subtle, #F8F7F4)', 
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '13px',
            color: 'var(--ink, #141413)',
            fontWeight: 500
          }}
        >
          <span>🏠 Entire villa</span>
          <span>&middot;</span>
          <span>👥 {villa.guests} guests</span>
          <span>&middot;</span>
          <span>🛏️ {villa.beds} bedrooms</span>
          <span>&middot;</span>
          <span>🚿 {villa.bathrooms} bathrooms</span>
          <span>&middot;</span>
          <span>🏊 Private pool</span>
        </div>

        {/* Isi Penjelasan Lengkap Terstruktur */}
        <div className="desc-modal-body" style={{ color: 'var(--ink-soft, #484841)' }}>
          {/* Teks Deskripsi Utama (Parsed Blocks) */}
          {renderFormattedDescription(primaryText)}

          {/* Jika tidak ada fullDesc kustom, tambahkan rincian susunan kamar & akses secara otomatis */}
          {!hasCustomFullDesc && (
            <>
              {/* Susunan Kamar Tidur */}
              {villa.bedrooms && villa.bedrooms.length > 0 && (
                <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--line, #E8E6DF)' }}>
                  <h4 
                    style={{ 
                      fontSize: '15px', 
                      fontWeight: 700, 
                      color: 'var(--ink, #141413)', 
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Bedrooms & Sleeping Arrangements
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8 }}>
                    {villa.bedrooms.map((bed, idx) => (
                      <li key={idx}>
                        <strong>{bed.name}:</strong> {bed.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Akses Tamu & Fasilitas Utama */}
              <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--line, #E8E6DF)' }}>
                <h4 
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: 700, 
                    color: 'var(--ink, #141413)', 
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Guest Access
                </h4>
                <p style={{ fontSize: '14.5px', lineHeight: 1.7, margin: 0 }}>
                  You will have private, exclusive access to the entire villa, including your private swimming pool, sun loungers, garden pavilion, fully equipped kitchen, and on-site parking.
                </p>
              </div>

              {/* Layanan Tim Lokal & Concierge */}
              <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--line, #E8E6DF)' }}>
                <h4 
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: 700, 
                    color: 'var(--ink, #141413)', 
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Your On-the-Ground Team
                </h4>
                <p style={{ fontSize: '14.5px', lineHeight: 1.7, margin: 0 }}>
                  Managed directly by our Bali Stay Collection local team. Daily housekeeping keeps your villa fresh, and a dedicated host is available via WhatsApp throughout your stay to arrange airport transfers, scooter rentals, private chefs, or in-villa massages.
                </p>
              </div>

              {/* Hal Penting Lainnya (Other Things to Note) */}
              <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--line, #E8E6DF)' }}>
                <h4 
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: 700, 
                    color: 'var(--ink, #141413)', 
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Other Things to Note
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8 }}>
                  <li>Check-in starting from 14:00 PM; check-out until 12:00 PM.</li>
                  <li>Free reschedule available up to 7 days before check-in.</li>
                  <li>High-speed fiber-optic WiFi is provided complimentary in all rooms and outdoor pool areas.</li>
                  <li>Children must be supervised around the swimming pool area at all times.</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Tombol Tutup di Bagian Bawah */}
        <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--line, #E8E6DF)', textAlign: 'right' }}>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onClose}
            style={{
              padding: '10px 22px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
