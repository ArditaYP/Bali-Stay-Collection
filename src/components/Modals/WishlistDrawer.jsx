import React, { useEffect } from 'react';
import { formatUSD } from '../../data/villasData';

/**
 * Komponen WishlistDrawer
 * Menampilkan panel overlay daftar villa yang telah disimpan/disukai oleh user (Wishlist).
 * User dapat langsung membuka detail villa atau menghapusnya dari daftar tersimpan.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Status apakah modal/drawer terbuka
 * @param {Function} props.onClose - Fungsi callback untuk menutup drawer
 * @param {Object[]} props.savedVillas - Array objek villa yang ada di wishlist
 * @param {Function} props.onSelectVilla - Callback untuk membuka halaman detail villa tertentu
 * @param {Function} props.onRemoveFromWishlist - Callback untuk menghapus villa dari wishlist
 */
export default function WishlistDrawer({
  isOpen,
  onClose,
  savedVillas = [],
  onSelectVilla,
  onRemoveFromWishlist
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px' }}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Tutup daftar tersimpan"
        >
          ✕
        </button>

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}>
            Saved Villas ({savedVillas.length})
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
            Koleksi villa impian yang Anda tandai
          </p>
        </div>

        {savedVillas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block' }}>
              <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
            </svg>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>Belum ada villa yang disimpan</p>
            <p style={{ fontSize: '12.5px', marginTop: '4px' }}>Klik ikon hati (♡) pada villa mana pun untuk menyimpannya di sini.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '60vh', overflowY: 'auto' }}>
            {savedVillas.map((villa) => (
              <div 
                key={villa.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr auto',
                  gap: '14px',
                  alignItems: 'center',
                  padding: '12px',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  background: 'var(--bg)'
                }}
              >
                <img 
                  src={villa.images[0]} 
                  alt={villa.name}
                  style={{ width: '90px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 2px' }}>{villa.name}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 4px' }}>{villa.location} &middot; {villa.beds} beds</p>
                  <b style={{ fontSize: '13px', color: 'var(--ink)' }}>{formatUSD(villa.price)} <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--muted)' }}>/ night</span></b>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '6px' }}
                    onClick={() => {
                      onClose();
                      onSelectVilla(villa.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(villa.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--muted)',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
