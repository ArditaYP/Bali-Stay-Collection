import React, { useState } from 'react';

/**
 * Komponen Navbar
 * Menampilkan bar navigasi atas yang sepenuhnya responsif untuk semua ukuran layar:
 * - Desktop: Menu tautan horizontal lengkap
 * - Tablet & Mobile: Tombol hamburger menu yang memunculkan drawer menu ke bawah
 * - Badge Wishlist dan Tombol Pendaftaran Villa
 * 
 * @param {Object} props
 * @param {Function} props.onGoHome - Fungsi callback untuk kembali ke halaman utama / katalog
 * @param {number} props.wishlistCount - Jumlah villa yang saat ini tersimpan di wishlist
 * @param {Function} props.onOpenWishlist - Fungsi callback untuk membuka drawer / modal wishlist
 * @param {Function} props.onOpenListVilla - Fungsi callback untuk membuka modal 'List Your Villa'
 */
export default function Navbar({ onGoHome, wishlistCount = 0, onOpenWishlist, onOpenListVilla }) {
  // State untuk membuka / menutup menu navigasi mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Menangani klik pada logo brand untuk mengembalikan user ke halaman utama katalog
   * @param {React.MouseEvent} e - Event mouse click
   * @returns {void}
   */
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (typeof onGoHome === 'function') {
      onGoHome();
    }
  };

  /**
   * Menggulir halaman ke bagian pencarian atau tujuan tertentu
   * Sekaligus menutup menu navigasi mobile jika sedang terbuka
   * @param {string} elementId - ID target section yang ingin dituju
   * @returns {void}
   */
  const handleScrollToSection = (elementId) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof onGoHome === 'function') {
      onGoHome();
      setTimeout(() => {
        const targetEl = document.getElementById(elementId);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  /**
   * Membuka modal pendaftaran villa dan menutup menu navigasi mobile
   * @returns {void}
   */
  const handleOpenListVillaMobile = () => {
    setIsMobileMenuOpen(false);
    if (typeof onOpenListVilla === 'function') {
      onOpenListVilla();
    }
  };

  return (
    <header className="nav">
      {/* Brand Logo Resmi */}
      <div className="logo" onClick={handleLogoClick} role="button" tabIndex={0} title="Bali Stay Collection - Beranda">
        <img src="/logo.svg" alt="Bali Stay Collection Logo" className="logo-img" />
      </div>

      {/* Navigasi Menu Desktop */}
      <nav className="links">
        <button type="button" onClick={() => handleScrollToSection('results-section')}>Explore Villas</button>
        <button type="button" onClick={() => handleScrollToSection('destinations-section')}>Locations</button>
        <button type="button" onClick={() => handleScrollToSection('why-section')}>Why Book Direct</button>
        <button type="button" onClick={() => alert('Pusat Bantuan Bali Stay Collection:\nWhatsApp: +62 812-3456-7890\nEmail: hello@balistaycollection.com')}>Contact</button>
      </nav>

      {/* Tombol Aksi di Navbar */}
      <div className="nav-actions">
        {/* Tombol Wishlist dengan badge jumlah villa yang di-save */}
        <button 
          type="button" 
          className="wishlist-btn"
          onClick={onOpenWishlist}
          title="Lihat villa yang disimpan"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "#E4572E" : "none"} stroke={wishlistCount > 0 ? "#E4572E" : "#141413"} strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
          </svg>
          <span>Saved</span>
          {wishlistCount > 0 && (
            <span className="wishlist-count-badge">{wishlistCount}</span>
          )}
        </button>

        {/* Tombol Pendaftaran Villa bagi Partner Host (Desktop) */}
        <button 
          type="button" 
          className="cta btn-primary"
          onClick={onOpenListVilla}
        >
          List Your Villa
        </button>

        {/* Tombol Hamburger Menu (Muncul di Layar Tablet & HP) */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {isMobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Drawer Menu Navigasi Layar HP & Tablet */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button type="button" onClick={() => handleScrollToSection('results-section')}>
          Explore All Villas
        </button>
        <button type="button" onClick={() => handleScrollToSection('destinations-section')}>
          Popular Locations
        </button>
        <button type="button" onClick={() => handleScrollToSection('why-section')}>
          Why Book Direct
        </button>
        <button type="button" onClick={handleOpenListVillaMobile} style={{ color: 'var(--accent)' }}>
          + List Your Villa (Host Partner)
        </button>
        <button type="button" onClick={() => alert('Pusat Bantuan Bali Stay Collection:\nWhatsApp: +62 812-3456-7890\nEmail: hello@balistaycollection.com')}>
          Contact &amp; 24/7 Support
        </button>
      </div>
    </header>
  );
}
