import React, { useState, useRef, useEffect } from 'react';
import { DESTINATIONS_SUMMARY } from '../../data/bscVillasData';

/**
 * Komponen AirbnbSearchBar
 * Mengimplementasikan formulir pencarian id="searchForm" bergaya floating capsule ala Airbnb:
 * - Where: Pilihan kawasan destinasi interaktif dengan visual jumlah villa
 * - When (Check-in / Check-out): Pemilihan tanggal menginap terintegrasi
 * - Who: Stepper counter jumlah tamu dewasa (Adults), anak-anak (Children), dan bayi (Infants)
 * - Tombol Search ikonik dengan micro-animation
 * - Adaptif untuk tab Expedia (Stays, Cars, Packages, Things to do)
 * 
 * @param {Object} props
 * @param {string} [props.activeTab='stays'] - Tab layanan aktif ('stays', 'cars', 'packages', 'experiences')
 * @param {string[]} [props.areas=[]] - Daftar nama kawasan
 * @param {Object} props.searchParams - Parameter pencarian aktif
 * @param {Function} props.onSearchChange - Callback saat nilai pencarian berubah
 * @param {Function} props.onSubmitSearch - Callback saat form disubmit
 * @param {boolean} [props.isCompact=false] - Tampilan kompak (misal saat melayang di navbar)
 * @returns {React.JSX.Element} Elemen JSX Airbnb Search Bar
 */
export default function AirbnbSearchBar({
  activeTab = 'stays',
  areas = [],
  searchParams = {},
  onSearchChange,
  onSubmitSearch,
  isCompact = false
}) {
  // State panel popover aktif ('where', 'dates', 'who', atau null)
  const [activePopover, setActivePopover] = useState(null);

  // State rincian tamu (Adults, Children, Infants)
  const initialGuests = Number(searchParams.guests) || 2;
  const [adults, setAdults] = useState(Math.max(1, initialGuests));
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // State input untuk tab Cars
  const [carType, setCarType] = useState('Toyota Alphard Luxury');
  const [carDriver, setCarDriver] = useState(true);

  // State input untuk tab Packages & Experiences
  const [expType, setExpType] = useState('All Experiences');

  // Ref container untuk mendeteksi klik di luar popover (click outside)
  const containerRef = useRef(null);

  // Sinkronisasi total tamu ke parent saat adults atau children berubah
  useEffect(() => {
    const totalGuests = adults + children;
    if (typeof onSearchChange === 'function' && totalGuests !== searchParams.guests) {
      onSearchChange('guests', totalGuests);
    }
  }, [adults, children]);

  // Listener click outside untuk menutup popover
  useEffect(() => {
    /**
     * Menutup popover jika pengguna mengklik di luar area form pencarian
     * @param {MouseEvent} event - Event klik mouse
     * @returns {void}
     */
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Menangani pengiriman form pencarian
   * @param {React.FormEvent} e - Event submit form
   * @returns {void}
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setActivePopover(null);

    if (activeTab === 'cars') {
      const msg = encodeURIComponent(`Halo Bali Stay Collection Concierge, saya tertarik sewa mobil ${carType} (${carDriver ? 'Dengan Supir' : 'Lepas Kunci'}) di Bali untuk tanggal ${searchParams.checkIn || 'segera'}.`);
      window.open(`https://wa.me/628123456789?text=${msg}`, '_blank');
      return;
    }

    if (activeTab === 'packages' || activeTab === 'experiences') {
      const expEl = document.getElementById('experiences') || document.getElementById('villas');
      if (expEl) expEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (typeof onSubmitSearch === 'function') {
      onSubmitSearch();
    }
  };

  /**
   * Format tanggal singkat yang elegan untuk display (contoh: '14 Oct')
   * @param {string} dateStr - Tanggal format YYYY-MM-DD
   * @returns {string} String terformat
   */
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  // Ringkasan label teks tamu
  const totalGuestsCount = adults + children;
  const guestLabel = `${totalGuestsCount} guest${totalGuestsCount > 1 ? 's' : ''}${infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}`;

  return (
    <div className={`airbnb-search-wrapper ${isCompact ? 'compact' : ''}`} ref={containerRef}>
      <form 
        id="searchForm" 
        className={`airbnb-search-bar ${activePopover ? 'has-active-popover' : ''}`}
        onSubmit={handleFormSubmit}
      >
        {/* ============================================================== */}
        {/* KONTEN TAB: STAYS (VILLA & ESTATES) */}
        {/* ============================================================== */}
        {activeTab === 'stays' && (
          <>
            {/* 1. SEGMEN WHERE */}
            <div 
              className={`airbnb-search-segment where-segment ${activePopover === 'where' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'where' ? null : 'where')}
            >
              <span className="airbnb-seg-label">Where</span>
              <span className={`airbnb-seg-value ${!searchParams.location ? 'placeholder' : ''}`}>
                {searchParams.location || 'Search destinations'}
              </span>

              {/* POPOVER DAFTAR DESTINASI */}
              {activePopover === 'where' && (
                <div className="airbnb-popover destinations-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Search by region in Bali</span>
                    {searchParams.location && (
                      <button 
                        type="button" 
                        className="popover-clear-btn"
                        onClick={() => {
                          onSearchChange('location', '');
                          onSearchChange('area', '');
                        }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="destinations-popover-grid">
                    {/* Opsi Unggulan All Bali */}
                    <button
                      type="button"
                      className={`dest-option-btn dest-option-btn-featured ${!searchParams.location ? 'selected' : ''}`}
                      onClick={() => {
                        onSearchChange('location', '');
                        onSearchChange('area', '');
                        setActivePopover('dates');
                      }}
                    >
                      <div className="dest-opt-icon">🌴</div>
                      <div className="dest-opt-info">
                        <b>All Bali</b>
                        <small>Explore all 35 authentic luxury villas across Bali</small>
                      </div>
                    </button>

                    {/* Grid 2 Kolom untuk 6 Kawasan Populer */}
                    <div className="dest-regions-grid">
                      {DESTINATIONS_SUMMARY.map((dest) => {
                        const isSelected = searchParams.location === dest.name;
                        return (
                          <button
                            key={dest.name}
                            type="button"
                            className={`dest-option-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => {
                              onSearchChange('location', dest.name);
                              onSearchChange('area', dest.name);
                              setActivePopover('dates');
                            }}
                          >
                            <div className="dest-opt-icon">📍</div>
                            <div className="dest-opt-info">
                              <b>{dest.name}</b>
                              <small>{dest.count} villas · {dest.badge}</small>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="airbnb-seg-divider" />

            {/* 2. SEGMEN CHECK-IN */}
            <div 
              className={`airbnb-search-segment checkin-segment ${activePopover === 'dates' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'dates' ? null : 'dates')}
            >
              <span className="airbnb-seg-label">Check-in</span>
              <span className={`airbnb-seg-value ${!searchParams.checkIn ? 'placeholder' : ''}`}>
                {formatDateDisplay(searchParams.checkIn) || 'Add dates'}
              </span>
              <input
                type="date"
                className="hidden-date-input"
                value={searchParams.checkIn || ''}
                onChange={(e) => onSearchChange('checkIn', e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="airbnb-seg-divider" />

            {/* 3. SEGMEN CHECK-OUT */}
            <div 
              className={`airbnb-search-segment checkout-segment ${activePopover === 'dates' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'dates' ? null : 'dates')}
            >
              <span className="airbnb-seg-label">Check-out</span>
              <span className={`airbnb-seg-value ${!searchParams.checkOut ? 'placeholder' : ''}`}>
                {formatDateDisplay(searchParams.checkOut) || 'Add dates'}
              </span>
              <input
                type="date"
                className="hidden-date-input"
                value={searchParams.checkOut || ''}
                onChange={(e) => onSearchChange('checkOut', e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="airbnb-seg-divider" />

            {/* 4. SEGMEN WHO (GUEST COUNTER STEPPER) */}
            <div 
              className={`airbnb-search-segment who-segment ${activePopover === 'who' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'who' ? null : 'who')}
            >
              <span className="airbnb-seg-label">Who</span>
              <span className={`airbnb-seg-value ${totalGuestsCount === 0 ? 'placeholder' : ''}`}>
                {guestLabel}
              </span>

              {/* POPOVER STEPPER ALA AIRBNB */}
              {activePopover === 'who' && (
                <div className="airbnb-popover guests-popover" onClick={(e) => e.stopPropagation()}>
                  {/* Adults */}
                  <div className="guest-stepper-row">
                    <div>
                      <div className="stepper-title">Adults</div>
                      <div className="stepper-sub">Ages 13 or above</div>
                    </div>
                    <div className="stepper-controls">
                      <button
                        type="button"
                        className="stepper-btn"
                        disabled={adults <= 1}
                        onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                      >
                        –
                      </button>
                      <span className="stepper-num">{adults}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        disabled={adults + children >= 16}
                        onClick={() => setAdults(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="guest-stepper-row">
                    <div>
                      <div className="stepper-title">Children</div>
                      <div className="stepper-sub">Ages 2–12</div>
                    </div>
                    <div className="stepper-controls">
                      <button
                        type="button"
                        className="stepper-btn"
                        disabled={children <= 0}
                        onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                      >
                        –
                      </button>
                      <span className="stepper-num">{children}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        disabled={adults + children >= 16}
                        onClick={() => setChildren(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="guest-stepper-row">
                    <div>
                      <div className="stepper-title">Infants</div>
                      <div className="stepper-sub">Under 2 years</div>
                    </div>
                    <div className="stepper-controls">
                      <button
                        type="button"
                        className="stepper-btn"
                        disabled={infants <= 0}
                        onClick={() => setInfants(prev => Math.max(0, prev - 1))}
                      >
                        –
                      </button>
                      <span className="stepper-num">{infants}</span>
                      <button
                        type="button"
                        className="stepper-btn"
                        disabled={infants >= 5}
                        onClick={() => setInfants(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="popover-footer">
                    <small>Maximum 16 guests for private estates.</small>
                    <button
                      type="button"
                      className="popover-done-btn"
                      onClick={() => setActivePopover(null)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* KONTEN TAB: CARS (LUXURY CAR RENTAL) */}
        {/* ============================================================== */}
        {activeTab === 'cars' && (
          <>
            <div className="airbnb-search-segment car-segment">
              <span className="airbnb-seg-label">Pickup & Drop-off</span>
              <input
                type="text"
                className="inline-text-input"
                placeholder="Airport DPS / Villa in Bali"
                defaultValue="Ngurah Rai Airport (DPS) / Villa"
              />
            </div>
            <div className="airbnb-seg-divider" />
            <div className="airbnb-search-segment car-select-segment">
              <span className="airbnb-seg-label">Vehicle Tier</span>
              <select 
                className="inline-select"
                value={carType} 
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="Toyota Alphard Luxury">Toyota Alphard VIP</option>
                <option value="Hyundai Ioniq 5 EV">Hyundai Ioniq 5 (EV)</option>
                <option value="Toyota HiAce Premio Luxury">HiAce Premio (10-seat VIP)</option>
                <option value="Toyota Innova Zenix Hybrid">Innova Zenix Hybrid</option>
              </select>
            </div>
            <div className="airbnb-seg-divider" />
            <div className="airbnb-search-segment car-driver-segment">
              <span className="airbnb-seg-label">Chauffeur</span>
              <select 
                className="inline-select"
                value={carDriver ? 'yes' : 'no'} 
                onChange={(e) => setCarDriver(e.target.value === 'yes')}
              >
                <option value="yes">With Private English Driver</option>
                <option value="no">Self Drive (International License)</option>
              </select>
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* KONTEN TAB: PACKAGES & THINGS TO DO */}
        {/* ============================================================== */}
        {(activeTab === 'packages' || activeTab === 'experiences') && (
          <>
            <div className="airbnb-search-segment exp-segment">
              <span className="airbnb-seg-label">Category</span>
              <select 
                className="inline-select"
                value={expType} 
                onChange={(e) => setExpType(e.target.value)}
              >
                <option value="All Experiences">All VIP Concierge Curations</option>
                <option value="Yacht Charter">Luxury Yacht & Catamaran Charter</option>
                <option value="Private Chef">Villa Private Dining & Chef</option>
                <option value="Wellness & Spa">In-Villa Wellness, Yoga & Spa</option>
                <option value="VIP Airport">Airport VIP Fast-Track & Transfer</option>
              </select>
            </div>
            <div className="airbnb-seg-divider" />
            <div className="airbnb-search-segment exp-area-segment">
              <span className="airbnb-seg-label">Preferred Location</span>
              <span className="airbnb-seg-value">
                {searchParams.location || 'Anywhere in Bali'}
              </span>
            </div>
          </>
        )}

        {/* 5. TOMBOL SEARCH IKONIK */}
        <div className="airbnb-search-btn-container">
          <button 
            type="submit" 
            className="airbnb-submit-btn" 
            aria-label="Search"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="search-btn-text">
              {activeTab === 'cars' ? 'Find car' : activeTab === 'stays' ? 'Search' : 'Explore'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
