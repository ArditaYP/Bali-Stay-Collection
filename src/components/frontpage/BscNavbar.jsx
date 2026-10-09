import React, { useState, useEffect, useRef } from 'react';
import AirbnbSearchBar from './AirbnbSearchBar';

/**
 * Format rentang tanggal ringkas untuk pill pencarian melayang
 * @param {string} [checkIn] - Tanggal check-in
 * @param {string} [checkOut] - Tanggal check-out
 * @returns {string} String rentang tanggal terformat
 */
function formatDateRange(checkIn, checkOut) {
  if (!checkIn && !checkOut) return 'Any week';
  const format = (str) => {
    try {
      const d = new Date(str);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch {
      return str;
    }
  };
  if (checkIn && checkOut) return `${format(checkIn)} – ${format(checkOut)}`;
  if (checkIn) return `From ${format(checkIn)}`;
  return `Until ${format(checkOut)}`;
}

/**
 * Komponen BscNavbar
 * Menampilkan bilah pengumuman atas (topbar) dan bilah navigasi utama (header.nav)
 * dengan responsivitas adaptif penuh untuk desktop, tablet, dan smartphone:
 * - Opsi A (Standar Emas Airbnb): Saat halaman di-scroll melewati Hero,
 *   muncul Sticky Compact Search Capsule di tengah navbar.
 * - Jika kapsul melayang diklik, akan membuka panel pencarian Where, When, Who lengkap
 *   langsung di posisi scroll saat itu juga tanpa harus kembali ke atas.
 * 
 * @param {Object} props
 * @param {string} props.currency - Mata uang aktif ('USD' atau 'IDR')
 * @param {Function} props.onCurrencyChange - Callback untuk mengubah mata uang
 * @param {number} [props.wishlistCount=0] - Jumlah villa yang tersimpan di wishlist
 * @param {Function} [props.onOpenWishlist] - Callback untuk membuka modal wishlist
 * @param {Function} [props.onGoHome] - Callback kembali ke beranda
 * @param {boolean} [props.isDetailPage=false] - Apakah sedang berada di halaman detail
 * @param {Function} [props.onOpenSearch] - Callback shortcut Command+K
 * @param {Object} [props.searchParams={}] - Parameter pencarian aktif
 * @param {Function} [props.onSearchChange] - Callback saat parameter pencarian berubah
 * @param {Function} [props.onSubmitSearch] - Callback saat submit pencarian
 * @param {string[]} [props.areas=[]] - Daftar kawasan
 * @returns {React.JSX.Element} Elemen JSX navigasi BSC
 */
export default function BscNavbar({
  currency = 'USD',
  onCurrencyChange,
  wishlistCount = 0,
  onOpenWishlist,
  onGoHome,
  isDetailPage = false,
  onOpenSearch,
  searchParams = {},
  onSearchChange,
  onSubmitSearch,
  areas = []
}) {
  // State untuk membuka / menutup menu navigasi mobile drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State apakah posisi scroll browser telah melewati hero
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  // State apakah panel pencarian floating expanded di navbar sedang terbuka
  const [isExpandedSearchOpen, setIsExpandedSearchOpen] = useState(false);

  // Ref dropdown container
  const expandedRef = useRef(null);

  // Listener shortcut global Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (typeof onOpenSearch === 'function') {
          onOpenSearch();
        }
      }
      if (e.key === 'Escape') {
        setIsExpandedSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  useEffect(() => {
    /**
     * Memantau posisi scroll browser untuk memicu sticky compact pill di navbar
     * @returns {void}
     */
    const handleScroll = () => {
      if (isDetailPage) {
        setIsScrolledPastHero(false);
        return;
      }
      const heroEl = document.querySelector('.hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Ketika bagian bawah hero telah mencapai navbar
        const pastHero = rect.bottom <= 90;
        setIsScrolledPastHero(pastHero);
        if (!pastHero) {
          setIsExpandedSearchOpen(false);
        }
      } else {
        setIsScrolledPastHero(false);
        setIsExpandedSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDetailPage]);

  /**
   * Menggulir halaman secara halus ke bagian section yang dituju
   * @param {React.MouseEvent} e - Event klik
   * @param {string} sectionId - ID elemen target tujuan
   * @returns {void}
   */
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsExpandedSearchOpen(false);
    if (onGoHome) {
      onGoHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Menangani klik pada logo brand resmi
   * @param {React.MouseEvent} e - Event klik
   * @returns {void}
   */
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsExpandedSearchOpen(false);
    if (onGoHome) {
      onGoHome();
      return;
    }
    handleScrollToSection(e, 'top');
  };

  /**
   * Menangani klik tombol wishlist dan menutup menu mobile
   * @returns {void}
   */
  const handleWishlistClick = () => {
    setIsMobileMenuOpen(false);
    setIsExpandedSearchOpen(false);
    if (typeof onOpenWishlist === 'function') {
      onOpenWishlist();
    }
  };

  /**
   * Menangani submit pencarian dari expanded search bar di navbar
   * @returns {void}
   */
  const handleExpandedSubmit = () => {
    setIsExpandedSearchOpen(false);
    if (typeof onSubmitSearch === 'function') {
      onSubmitSearch();
    }
    const el = document.getElementById('villas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeLocation = searchParams?.location || 'Anywhere';
  const activeDates = formatDateRange(searchParams?.checkIn, searchParams?.checkOut);
  const activeGuests = `${searchParams?.guests || 2} guests`;

  return (
    <>
      {/* Header Navigasi Resmi dengan kelas dinamis nav-hero / nav-scrolled */}
      <header className={`nav ${isScrolledPastHero ? 'nav-scrolled' : 'nav-hero'}`}>
        <div className="nav-in">
          {/* Logo Brand Resmi */}
          <a
            className="logo"
            href="#top"
            onClick={handleLogoClick}
            aria-label="Bali Stay Collection home"
          >
            <img
              src="/logo.svg"
              alt="Bali Stay Collection"
              className="logo-img"
            />
          </a>

          {/* Tautan Navigasi Desktop - Selalu Tetap Ada di Navbar Baik Saat di Hero Maupun Saat Di-Scroll */}
          <nav className="nav-links" aria-label="Main Navigation">
            <a href="#villas" onClick={(e) => handleScrollToSection(e, 'villas')}>Villas</a>
            <a href="#destinations" onClick={(e) => handleScrollToSection(e, 'destinations')}>Destinations</a>
            <a href="#experiences" onClick={(e) => handleScrollToSection(e, 'experiences')}>Experiences</a>
            <a href="#verify" onClick={(e) => handleScrollToSection(e, 'verify')}>How we verify</a>
            <a href="#team" onClick={(e) => handleScrollToSection(e, 'team')}>Our team</a>
          </nav>

          {/* Sisi Kanan: Quick Search, Wishlist, Currency Toggle, Tombol CTA & Hamburger Mobile */}
          <div className="nav-cta">
            {/* Tombol Quick Search (Spotlight ⌘K) */}
            {onOpenSearch && !isScrolledPastHero && (
              <button
                type="button"
                className="nav-search-btn"
                onClick={onOpenSearch}
                title="Search villas & destinations (⌘K)"
                aria-label="Search villas and destinations"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="nav-search-text">Search...</span>
                <kbd className="nav-search-kbd">⌘K</kbd>
              </button>
            )}

            {/* Tombol Wishlist jika ada yang disimpan */}
            {wishlistCount > 0 && onOpenWishlist && (
              <button
                type="button"
                onClick={handleWishlistClick}
                className="nav-wishlist-btn"
                aria-label="View saved wishlist"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="2">
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

            {/* Tombol Hamburger Menu Mobile */}
            <button
              type="button"
              className="nav-mobile-toggle nav-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Kapsul Pencarian Melayang Murni (Floating Pill) di Bawah Navbar Saat Di-Scroll */}
        <div 
          className={`nav-floating-search-pill-wrapper ${isScrolledPastHero ? 'is-visible' : 'is-hidden'}`}
          aria-hidden={!isScrolledPastHero}
        >
          <button
            type="button"
            className="nav-sticky-search-pill"
            onClick={() => setIsExpandedSearchOpen(prev => !prev)}
            aria-label="Search villas anywhere in Bali"
            tabIndex={isScrolledPastHero ? 0 : -1}
          >
            <span className="ns-pill-item bold">{activeLocation}</span>
            <span className="ns-pill-divider" />
            <span className="ns-pill-item">{activeDates}</span>
            <span className="ns-pill-divider" />
            <span className="ns-pill-item muted">{activeGuests}</span>
            <span className="ns-pill-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </button>
        </div>

        {/* OPSI A: FLOATING EXPANDED SEARCH PANEL DI BAWAH NAVBAR */}
        {isScrolledPastHero && isExpandedSearchOpen && (
          <div className="nav-expanded-search-overlay" onClick={() => setIsExpandedSearchOpen(false)}>
            <div 
              className="nav-expanded-search-container" 
              ref={expandedRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="expanded-search-header">
                <span>Refine your search in Bali</span>
                <button 
                  type="button" 
                  className="expanded-close-btn"
                  onClick={() => setIsExpandedSearchOpen(false)}
                >
                  ✕
                </button>
              </div>

              <AirbnbSearchBar
                activeTab="stays"
                areas={areas}
                searchParams={searchParams}
                onSearchChange={onSearchChange}
                onSubmitSearch={handleExpandedSubmit}
                isCompact={true}
              />
            </div>
          </div>
        )}
        {/* Mobile Drawer Menu Resmi BSC di Dalam Navbar Header */}
        <div className={`nav-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-mobile-links">
            <a href="#villas" onClick={(e) => { setIsMobileMenuOpen(false); handleScrollToSection(e, 'villas'); }}>Villas</a>
            <a href="#destinations" onClick={(e) => { setIsMobileMenuOpen(false); handleScrollToSection(e, 'destinations'); }}>Destinations</a>
            <a href="#experiences" onClick={(e) => { setIsMobileMenuOpen(false); handleScrollToSection(e, 'experiences'); }}>Experiences</a>
            <a href="#verify" onClick={(e) => { setIsMobileMenuOpen(false); handleScrollToSection(e, 'verify'); }}>How we verify</a>
            <a href="#team" onClick={(e) => { setIsMobileMenuOpen(false); handleScrollToSection(e, 'team'); }}>Our team</a>
          </div>

          <div className="nav-mobile-footer">
            <div className="cur" role="group" aria-label="Currency">
              <button
                type="button"
                className={currency === 'USD' ? 'active' : ''}
                aria-pressed={currency === 'USD'}
                onClick={() => { setIsMobileMenuOpen(false); onCurrencyChange('USD'); }}
              >
                USD
              </button>
              <button
                type="button"
                className={currency === 'IDR' ? 'active' : ''}
                aria-pressed={currency === 'IDR'}
                onClick={() => { setIsMobileMenuOpen(false); onCurrencyChange('IDR'); }}
              >
                IDR
              </button>
            </div>

            {wishlistCount > 0 && onOpenWishlist && (
              <button
                type="button"
                onClick={() => { setIsMobileMenuOpen(false); handleWishlistClick(); }}
                className="nav-wishlist-btn"
                aria-label="View saved wishlist"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="2">
                  <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                </svg>
                <span>Saved ({wishlistCount})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Backdrop penutup jika mobile drawer terbuka */}
      {isMobileMenuOpen && (
        <div 
          className="nav-mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
