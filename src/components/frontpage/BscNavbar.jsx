import React, { useState, useEffect } from 'react';

/**
 * Komponen BscNavbar
 * Menampilkan bilah pengumuman atas (topbar) dan bilah navigasi utama (header.nav)
 * dengan responsivitas adaptif penuh untuk desktop, tablet, dan smartphone:
 * - Warna Adaptif Dinamis: Berwarna senada dengan latar hero saat berada di atas,
 *   lalu otomatis beralih warna menjadi putih jernih elegan saat mencapai section destinations.
 * - Spacing & Navigasi Presisi: Terintegrasi dengan link tujuan dan menu drawer mobile.
 * 
 * @param {Object} props
 * @param {string} props.currency - Mata uang aktif ('USD' atau 'IDR')
 * @param {Function} props.onCurrencyChange - Callback untuk mengubah mata uang
 * @param {number} [props.wishlistCount=0] - Jumlah villa yang tersimpan di wishlist
 * @param {Function} [props.onOpenWishlist] - Callback untuk membuka modal wishlist
 * @returns {React.JSX.Element} Elemen JSX navigasi BSC
 */
export default function BscNavbar({
  currency = 'USD',
  onCurrencyChange,
  wishlistCount = 0,
  onOpenWishlist
}) {
  // State untuk membuka / menutup menu navigasi mobile drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State apakah posisi scroll browser telah melewati hero dan memasuki section destinations
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    /**
     * Memantau posisi scroll browser untuk menyesuaikan warna navbar antara section hero dan destinations
     * @returns {void}
     */
    const handleScroll = () => {
      const destEl = document.getElementById('destinations');
      if (destEl) {
        const rect = destEl.getBoundingClientRect();
        // Ketika bagian atas section destinations telah mencapai area dekat navbar (tinggi navbar ~72px)
        setIsScrolledPastHero(rect.top <= 85);
      } else {
        setIsScrolledPastHero(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Menggulir halaman secara halus ke bagian section yang dituju
   * Sekaligus menutup menu navigasi mobile jika sedang terbuka
   * @param {React.MouseEvent} e - Event klik
   * @param {string} sectionId - ID elemen target tujuan
   * @returns {void}
   */
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Menangani klik tombol wishlist dan menutup menu mobile
   * @returns {void}
   */
  const handleWishlistClick = () => {
    setIsMobileMenuOpen(false);
    if (typeof onOpenWishlist === 'function') {
      onOpenWishlist();
    }
  };

  return (
    <>
      {/* 1. Topbar Pengumuman Jaminan Langsung */}
      <div className="topbar">
        Managed directly by our local team in Bali &middot; Total price shown upfront &middot; Free reschedule on selected villas
      </div>

      {/* 2. Header Navigasi Resmi dengan kelas dinamis nav-hero / nav-scrolled */}
      <header className={`nav ${isScrolledPastHero ? 'nav-scrolled' : 'nav-hero'}`}>
        <div className="nav-in">
          {/* Logo Brand Resmi */}
          <a
            className="logo"
            href="#top"
            onClick={(e) => handleScrollToSection(e, 'top')}
            aria-label="Bali Stay Collection home"
          >
            <img
              src="/logo.svg"
              alt="Bali Stay Collection"
              className="logo-img"
            />
          </a>

          {/* Tautan Navigasi Desktop (Tampil pada layar lebar > 980px) */}
          <nav className="nav-links" aria-label="Main Navigation">
            <a href="#villas" onClick={(e) => handleScrollToSection(e, 'villas')}>Villas</a>
            <a href="#destinations" onClick={(e) => handleScrollToSection(e, 'destinations')}>Destinations</a>
            <a href="#verify" onClick={(e) => handleScrollToSection(e, 'verify')}>How we verify</a>
            <a href="#team" onClick={(e) => handleScrollToSection(e, 'team')}>Our team</a>
            <a href="#faq" onClick={(e) => handleScrollToSection(e, 'faq')}>FAQ</a>
          </nav>

          {/* Sisi Kanan: Wishlist, Currency Toggle, Tombol CTA & Hamburger Mobile */}
          <div className="nav-cta">
            {/* Tombol Wishlist jika ada yang disimpan */}
            {wishlistCount > 0 && onOpenWishlist && (
              <button
                type="button"
                onClick={handleWishlistClick}
                className="nav-wishlist-btn"
                aria-label="View saved wishlist"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#E05638" stroke="#E05638" strokeWidth="2">
                  <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                </svg>
                <span>Saved ({wishlistCount})</span>
              </button>
            )}

            {/* Pill Pengalih Mata Uang USD / IDR */}
            <div className="cur" role="group" aria-label="Currency">
              <button
                type="button"
                className={currency === 'USD' ? 'active' : ''}
                aria-pressed={currency === 'USD'}
                onClick={() => onCurrencyChange('USD')}
              >
                USD
              </button>
              <button
                type="button"
                className={currency === 'IDR' ? 'active' : ''}
                aria-pressed={currency === 'IDR'}
                onClick={() => onCurrencyChange('IDR')}
              >
                IDR
              </button>
            </div>

            {/* Tombol Utama 'Find a villa' */}
            <a
              className="btn btn-primary"
              href="#villas"
              onClick={(e) => handleScrollToSection(e, 'villas')}
            >
              Find a villa
            </a>

            {/* Tombol Hamburger Khusus Tablet & Mobile */}
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 3. Menu Drawer Dropdown untuk Tablet & Mobile */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-drawer open" id="mobileNavMenu">
            <nav className="nav-mobile-links" aria-label="Mobile Navigation">
              <a href="#villas" onClick={(e) => handleScrollToSection(e, 'villas')}>Villas</a>
              <a href="#destinations" onClick={(e) => handleScrollToSection(e, 'destinations')}>Destinations</a>
              <a href="#verify" onClick={(e) => handleScrollToSection(e, 'verify')}>How we verify</a>
              <a href="#team" onClick={(e) => handleScrollToSection(e, 'team')}>Our team</a>
              <a href="#faq" onClick={(e) => handleScrollToSection(e, 'faq')}>FAQ</a>
              {wishlistCount > 0 && onOpenWishlist && (
                <a href="#wishlist" onClick={(e) => { e.preventDefault(); handleWishlistClick(); }}>
                  Saved Wishlist ({wishlistCount})
                </a>
              )}
            </nav>

            <div className="nav-mobile-footer">
              {/* Currency toggle cadangan di mobile drawer */}
              <div className="cur" role="group" aria-label="Mobile Currency">
                <button
                  type="button"
                  className={currency === 'USD' ? 'active' : ''}
                  aria-pressed={currency === 'USD'}
                  onClick={() => onCurrencyChange('USD')}
                >
                  USD
                </button>
                <button
                  type="button"
                  className={currency === 'IDR' ? 'active' : ''}
                  aria-pressed={currency === 'IDR'}
                  onClick={() => onCurrencyChange('IDR')}
                >
                  IDR
                </button>
              </div>

              <a
                className="btn btn-primary"
                href="#villas"
                onClick={(e) => handleScrollToSection(e, 'villas')}
                style={{ flex: 1, textAlign: 'center' }}
              >
                Find a villa
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
