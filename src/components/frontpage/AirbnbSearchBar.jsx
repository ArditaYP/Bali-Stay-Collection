import React, { useState, useRef, useEffect } from 'react';
import { DESTINATIONS_SUMMARY } from '../../data/bscVillasData';
import { 
  CAR_FLEET_DATA, 
  PICKUP_LOCATIONS_DATA, 
  CHAUFFEUR_OPTIONS_DATA, 
  PACKAGES_DATA, 
  EXPERIENCES_DATA 
} from '../../data/bscFleetData';
import AirbnbDatePopover from './AirbnbDatePopover';

/**
 * Komponen AirbnbSearchBar
 * Mengimplementasikan formulir pencarian id="searchForm" bergaya floating capsule ala Airbnb
 * dengan arsitektur Push-Down Accordion:
 * - Kapsul pencarian tetap ringkas dan elegan di baris atas
 * - Saat salah satu segmen diklik, panel mockup list membuka di bawah baris kapsul
 *   secara inline/relative, sehingga MENDORONG tab layanan di bawahnya ke bawah
 *   secara mulus TANPA PERNAH BERTABRAKAN atau saling menutupi
 * - Stays: Where, When (Check-in/Check-out), Who (Dewasa, Anak, Bayi)
 * - Cars: Pickup Location, Luxury Vehicle Tier, Chauffeur Service
 * - Packages & Things to do: Curated VIP Category, Preferred Region
 * 
 * @param {Object} props
 * @param {string} [props.activeTab='stays'] - Tab layanan aktif ('stays', 'cars', 'packages', 'experiences')
 * @param {string[]} [props._areas=[]] - Daftar nama kawasan
 * @param {Object} props.searchParams - Parameter pencarian aktif
 * @param {Function} props.onSearchChange - Callback saat nilai pencarian berubah
 * @param {Function} props.onSubmitSearch - Callback saat form disubmit
 * @param {boolean} [props.isCompact=false] - Tampilan kompak (misal saat melayang di navbar)
 * @param {Object} [props.selectedCar] - Mobil yang terpilih saat ini
 * @param {Function} [props.onSelectCar] - Callback pemilih mobil
 * @param {Object} [props.selectedPickup] - Lokasi penjemputan terpilih
 * @param {Function} [props.onSelectPickup] - Callback pemilih lokasi penjemputan
 * @param {Object} [props.selectedDriverOption] - Opsi supir terpilih
 * @param {Function} [props.onSelectDriverOption] - Callback pemilih opsi supir
 * @param {Object} [props.selectedPackage] - Paket terpilih
 * @param {Function} [props.onSelectPackage] - Callback pemilih paket
 * @param {Object} [props.selectedExperience] - Aktivitas terpilih
 * @param {Function} [props.onSelectExperience] - Callback pemilih aktivitas
 * @returns {React.JSX.Element} Elemen JSX Airbnb Search Bar dengan Push-Down Accordion
 */
export default function AirbnbSearchBar({
  activeTab = 'stays',
  _areas = [],
  searchParams = {},
  onSearchChange,
  onSubmitSearch,
  isCompact = false,
  selectedCar = CAR_FLEET_DATA[0],
  onSelectCar,
  selectedPickup = PICKUP_LOCATIONS_DATA[0],
  onSelectPickup,
  selectedDriverOption = CHAUFFEUR_OPTIONS_DATA[0],
  onSelectDriverOption,
  selectedPackage = PACKAGES_DATA[0],
  onSelectPackage,
  selectedExperience = EXPERIENCES_DATA[0],
  onSelectExperience
}) {
  // State panel aktif ('where', 'dates', 'who', 'pickup', 'carFleet', 'carDriver', 'pkgCat', 'expCat', atau null)
  const [activePopover, setActivePopover] = useState(null);

  // State fokus target segmen tanggal ('checkIn' atau 'checkOut')
  const [dateTargetSegment, setDateTargetSegment] = useState('checkIn');

  // State rincian tamu (Adults, Children, Infants)
  const initialGuests = Number(searchParams.guests) || 2;
  const [adults, setAdults] = useState(Math.max(1, initialGuests));
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Ref container untuk mendeteksi klik di luar popover (click outside)
  const containerRef = useRef(null);

  // Sinkronisasi total tamu ke parent saat adults atau children berubah
  useEffect(() => {
    const totalGuests = adults + children;
    if (typeof onSearchChange === 'function' && totalGuests !== searchParams.guests) {
      onSearchChange('guests', totalGuests);
    }
  }, [adults, children, searchParams.guests, onSearchChange]);

  // Listener click outside untuk menutup panel accordion
  useEffect(() => {
    /**
     * Menutup panel accordion jika pengguna mengklik di luar area wrapper pencarian
     * @param {MouseEvent|TouchEvent} event - Event klik mouse atau sentuh layar
     * @returns {void}
     */
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Tutup panel accordion otomatis saat beralih tab layanan
  const [prevTab, setPrevTab] = useState(activeTab);
  if (prevTab !== activeTab) {
    setPrevTab(activeTab);
    setActivePopover(null);
  }

  /**
   * Menangani pengiriman form pencarian
   * @param {React.FormEvent} e - Event submit form
   * @returns {void}
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setActivePopover(null);

    if (activeTab === 'cars') {
      const datesInfo = searchParams.checkIn ? `untuk tanggal ${searchParams.checkIn}` : 'untuk jadwal segera';
      const msg = encodeURIComponent(
        `Halo Bali Stay Collection Concierge, saya tertarik sewa armada "${selectedCar?.name || 'Toyota Alphard VIP'}" (${selectedDriverOption?.title || 'Dengan Supir'}) dengan lokasi penjemputan "${selectedPickup?.title || 'Bandara DPS'}" ${datesInfo}. Mohon info ketersediaannya.`
      );
      window.open(`https://wa.me/628123456789?text=${msg}`, '_blank', 'noopener,noreferrer');
      return;
    }

    if (activeTab === 'packages') {
      const msg = encodeURIComponent(
        `Halo Bali Stay Collection Concierge, saya tertarik dengan paket liburan "${selectedPackage?.title || 'VIP Package'}". Mohon info ketersediaan dan detail penawaran.`
      );
      window.open(`https://wa.me/628123456789?text=${msg}`, '_blank', 'noopener,noreferrer');
      return;
    }

    if (activeTab === 'experiences') {
      const msg = encodeURIComponent(
        `Halo Bali Stay Collection Concierge, saya tertarik dengan concierge experience "${selectedExperience?.title || 'Curated Experience'}". Mohon info ketersediaan jadwalnya.`
      );
      window.open(`https://wa.me/628123456789?text=${msg}`, '_blank', 'noopener,noreferrer');
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
      {/* ============================================================== */}
      {/* 1. BARIS KAPSUL PENCARIAN (SEARCH FORM CAPSULE BAR) */}
      {/* ============================================================== */}
      <form 
        id="searchForm" 
        className={`airbnb-search-bar ${activePopover ? 'has-active-popover' : ''}`}
        onSubmit={handleFormSubmit}
      >
        {/* KONTEN TAB: STAYS (VILLA & ESTATES) */}
        {activeTab === 'stays' && (
          <>
            {/* SEGMEN 1: WHERE */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment where-segment ${activePopover === 'where' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'where' ? null : 'where')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'where' ? null : 'where');
                }
              }}
            >
              <span className="airbnb-seg-label">Where</span>
              <span className={`airbnb-seg-value ${!searchParams.location ? 'placeholder' : ''}`}>
                {searchParams.location || 'Search destinations'}
              </span>
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 2: CHECK-IN */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment checkin-segment ${(activePopover === 'dates' && dateTargetSegment === 'checkIn') ? 'active' : ''}`}
              onClick={() => {
                setDateTargetSegment('checkIn');
                setActivePopover(prev => (prev === 'dates' && dateTargetSegment === 'checkIn') ? null : 'dates');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setDateTargetSegment('checkIn');
                  setActivePopover(prev => (prev === 'dates' && dateTargetSegment === 'checkIn') ? null : 'dates');
                }
              }}
            >
              <span className="airbnb-seg-label">Check-in</span>
              <span className={`airbnb-seg-value ${!searchParams.checkIn ? 'placeholder' : ''}`}>
                {formatDateDisplay(searchParams.checkIn) || 'Add dates'}
              </span>
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 3: CHECK-OUT */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment checkout-segment ${(activePopover === 'dates' && dateTargetSegment === 'checkOut') ? 'active' : ''}`}
              onClick={() => {
                setDateTargetSegment('checkOut');
                setActivePopover(prev => (prev === 'dates' && dateTargetSegment === 'checkOut') ? null : 'dates');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setDateTargetSegment('checkOut');
                  setActivePopover(prev => (prev === 'dates' && dateTargetSegment === 'checkOut') ? null : 'dates');
                }
              }}
            >
              <span className="airbnb-seg-label">Check-out</span>
              <span className={`airbnb-seg-value ${!searchParams.checkOut ? 'placeholder' : ''}`}>
                {formatDateDisplay(searchParams.checkOut) || 'Add dates'}
              </span>
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 4: WHO */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment who-segment ${activePopover === 'who' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'who' ? null : 'who')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'who' ? null : 'who');
                }
              }}
            >
              <span className="airbnb-seg-label">Who</span>
              <span className={`airbnb-seg-value ${totalGuestsCount === 0 ? 'placeholder' : ''}`}>
                {guestLabel}
              </span>
            </div>
          </>
        )}

        {/* KONTEN TAB: CARS (LUXURY FLEET CONCIERGE) */}
        {activeTab === 'cars' && (
          <>
            {/* SEGMEN 1: PICKUP & DROPOFF */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment car-segment ${activePopover === 'pickup' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'pickup' ? null : 'pickup')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'pickup' ? null : 'pickup');
                }
              }}
            >
              <span className="airbnb-seg-label">Pickup & Drop-off</span>
              <span className="airbnb-seg-value">
                {selectedPickup?.title || 'Airport DPS / Villa'}
              </span>
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 2: VEHICLE FLEET */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment car-fleet-segment ${activePopover === 'carFleet' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'carFleet' ? null : 'carFleet')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'carFleet' ? null : 'carFleet');
                }
              }}
            >
              <span className="airbnb-seg-label">Vehicle Tier</span>
              <div className="car-fleet-value-wrapper">
                <span className="airbnb-seg-value">
                  {selectedCar?.shortName || 'Toyota Alphard VIP'}
                </span>
                <span className="car-mini-badge">
                  {selectedCar?.seats} Seats · {selectedCar?.category}
                </span>
              </div>
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 3: CHAUFFEUR OPTION */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment car-driver-segment ${activePopover === 'carDriver' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'carDriver' ? null : 'carDriver')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'carDriver' ? null : 'carDriver');
                }
              }}
            >
              <span className="airbnb-seg-label">Chauffeur</span>
              <span className="airbnb-seg-value">
                {selectedDriverOption?.title || 'With Private English Driver'}
              </span>
            </div>
          </>
        )}

        {/* KONTEN TAB: PACKAGES (VIP ALL-INCLUSIVE BUNDLES) */}
        {activeTab === 'packages' && (
          <>
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment pkg-segment ${activePopover === 'pkgCat' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'pkgCat' ? null : 'pkgCat')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'pkgCat' ? null : 'pkgCat');
                }
              }}
            >
              <span className="airbnb-seg-label">VIP Package Bundle</span>
              <span className="airbnb-seg-value">
                {selectedPackage?.title || 'The Ultimate Yacht & Villa Escape'}
              </span>
            </div>

            <div className="airbnb-seg-divider" />

            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment pkg-area-segment ${activePopover === 'where' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'where' ? null : 'where')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'where' ? null : 'where');
                }
              }}
            >
              <span className="airbnb-seg-label">Preferred Location</span>
              <span className="airbnb-seg-value">
                {searchParams.location || 'All Across Bali'}
              </span>
            </div>
          </>
        )}

        {/* KONTEN TAB: THINGS TO DO (CURATED EXPERIENCES) */}
        {activeTab === 'experiences' && (
          <>
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment exp-segment ${activePopover === 'expCat' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'expCat' ? null : 'expCat')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'expCat' ? null : 'expCat');
                }
              }}
            >
              <span className="airbnb-seg-label">Concierge Activity</span>
              <span className="airbnb-seg-value">
                {selectedExperience?.title || 'Private Catamaran & Yacht Charter'}
              </span>
            </div>

            <div className="airbnb-seg-divider" />

            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment exp-area-segment ${activePopover === 'where' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'where' ? null : 'where')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'where' ? null : 'where');
                }
              }}
            >
              <span className="airbnb-seg-label">Preferred Location</span>
              <span className="airbnb-seg-value">
                {searchParams.location || 'Anywhere in Bali'}
              </span>
            </div>
          </>
        )}

        {/* TOMBOL SUBMIT PENCARIAN */}
        <div className="airbnb-search-btn-container">
          <button 
            type="submit" 
            className="airbnb-submit-btn" 
            aria-label="Search or Inquire"
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
              {activeTab === 'cars' ? 'Inquire Fleet' : activeTab === 'stays' ? 'Search' : activeTab === 'packages' ? 'Explore Packages' : 'Explore Concierge'}
            </span>
          </button>
        </div>
      </form>

      {/* ============================================================== */}
      {/* 2. ACCORDION PUSH-DOWN PANEL CONTAINER */}
      {/* Mendorong tab Cars dan elemen di bawahnya tanpa menabrak/menimpa */}
      {/* ============================================================== */}
      {activePopover && (
        <div className="airbnb-push-panel-container" onClick={(e) => e.stopPropagation()}>
          {/* Header Panel dengan Judul Kontekstual & Tombol Tutup ✕ */}
          <div className="push-panel-header">
            <div className="push-panel-title-wrap">
              <span className="push-panel-tag">
                {activeTab === 'stays' && 'Villa Stays'}
                {activeTab === 'cars' && 'Chauffeured Fleet'}
                {activeTab === 'packages' && 'VIP Packages'}
                {activeTab === 'experiences' && 'Curated Concierge'}
              </span>
              <h4 className="push-panel-title">
                {activePopover === 'where' && 'Choose Your Bali Region'}
                {activePopover === 'dates' && 'Select Check-in & Check-out Dates'}
                {activePopover === 'who' && 'Number of Guests'}
                {activePopover === 'pickup' && 'Select Pickup & Transfer Location'}
                {activePopover === 'carFleet' && 'Select Luxury Vehicle Tier'}
                {activePopover === 'carDriver' && 'Select Driver & Service Option'}
                {activePopover === 'pkgCat' && 'Select Curated VIP Bundle'}
                {activePopover === 'expCat' && 'Select On-Demand Activity'}
              </h4>
            </div>

            <button 
              type="button" 
              className="push-panel-close-btn"
              onClick={() => setActivePopover(null)}
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>

          {/* Isi Konten Push Panel */}
          <div className="push-panel-body">
            {/* PANEL: WHERE (REGIONAL BALI) */}
            {activePopover === 'where' && (
              <div className="push-destinations-content">
                <div className="popover-header" style={{ marginBottom: '14px' }}>
                  <span>Explore regions in Bali</span>
                  {searchParams.location && (
                    <button 
                      type="button" 
                      className="popover-clear-btn"
                      onClick={() => {
                        onSearchChange('location', '');
                        onSearchChange('area', '');
                      }}
                    >
                      Reset selection
                    </button>
                  )}
                </div>

                <div className="destinations-popover-grid">
                  <button
                    type="button"
                    className={`dest-option-btn dest-option-btn-featured ${!searchParams.location ? 'selected' : ''}`}
                    onClick={() => {
                      onSearchChange('location', '');
                      onSearchChange('area', '');
                      if (activeTab === 'stays') {
                        setDateTargetSegment('checkIn');
                        setActivePopover('dates');
                      } else {
                        setActivePopover(null);
                      }
                    }}
                  >
                    <div className="dest-opt-icon">🌴</div>
                    <div className="dest-opt-info">
                      <b>All Bali</b>
                      <small>Explore all 35 authentic luxury villas across Bali</small>
                    </div>
                  </button>

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
                            if (activeTab === 'stays') {
                              setDateTargetSegment('checkIn');
                              setActivePopover('dates');
                            } else {
                              setActivePopover(null);
                            }
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

            {/* PANEL: DATES (KALENDER DUA BULAN AIRBNB) */}
            {activePopover === 'dates' && (
              <div className="push-dates-content">
                <AirbnbDatePopover
                  checkIn={searchParams.checkIn || ''}
                  checkOut={searchParams.checkOut || ''}
                  initialTarget={dateTargetSegment}
                  onDatesChange={(newCi, newCo) => {
                    onSearchChange('checkIn', newCi);
                    onSearchChange('checkOut', newCo);
                    if (newCi && !newCo) {
                      setDateTargetSegment('checkOut');
                    }
                  }}
                  onClose={() => setActivePopover(null)}
                  onDone={() => setActivePopover('who')}
                />
              </div>
            )}

            {/* PANEL: WHO (STEPPER JUMLAH TAMU) */}
            {activePopover === 'who' && (
              <div className="push-guests-content">
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

                <div className="popover-footer" style={{ marginTop: '20px' }}>
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

            {/* PANEL: PICKUP (LOKASI PENJEMPUTAN VIP) */}
            {activePopover === 'pickup' && (
              <div className="push-pickup-content">
                <div className="pickup-options-grid">
                  {PICKUP_LOCATIONS_DATA.map((loc) => {
                    const isSelected = selectedPickup?.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        className={`pickup-option-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (typeof onSelectPickup === 'function') {
                            onSelectPickup(loc);
                          }
                          setActivePopover('carFleet');
                        }}
                      >
                        <div className="pickup-card-icon">{loc.icon}</div>
                        <div className="pickup-card-text">
                          <div className="pickup-card-title-row">
                            <b>{loc.title}</b>
                            <span className="pickup-badge">{loc.badge}</span>
                          </div>
                          <small>{loc.subtitle}</small>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PANEL: CAR FLEET (PILIHAN ARMADA MOBIL MEWAH VIP) */}
            {activePopover === 'carFleet' && (
              <div className="push-fleet-content">
                <div className="push-fleet-grid">
                  {CAR_FLEET_DATA.map((car) => {
                    const isSelected = selectedCar?.id === car.id;
                    return (
                      <button
                        key={car.id}
                        type="button"
                        className={`fleet-push-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (typeof onSelectCar === 'function') {
                            onSelectCar(car);
                          }
                          setActivePopover('carDriver');
                        }}
                      >
                        <div className="fleet-push-card-top">
                          <span className="fleet-push-badge">{car.badge}</span>
                          <span className="fleet-push-price">{car.priceIdr} <small>/ day</small></span>
                        </div>
                        <div className="fleet-push-main">
                          <div className="fleet-push-icon">🚗</div>
                          <div className="fleet-push-info">
                            <b>{car.name}</b>
                            <p className="fleet-push-desc">{car.description}</p>
                            <div className="fleet-push-specs">
                              <span>💺 {car.seats} Seats</span>
                              <span>🧳 {car.luggage} Luggage</span>
                              <span>⚙️ {car.transmission}</span>
                              <span className="fleet-spec-gold">✓ Chauffeur & Fuel Included</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PANEL: CAR DRIVER (PILIHAN SUPIR / SELF-DRIVE) */}
            {activePopover === 'carDriver' && (
              <div className="push-driver-content">
                <div className="driver-options-grid">
                  {CHAUFFEUR_OPTIONS_DATA.map((opt) => {
                    const isSelected = selectedDriverOption?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`driver-option-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (typeof onSelectDriverOption === 'function') {
                            onSelectDriverOption(opt);
                          }
                          setActivePopover(null);
                        }}
                      >
                        <div className="driver-card-icon">
                          {opt.id === 'with-chauffeur' ? '👨‍✈️' : '🔑'}
                        </div>
                        <div className="driver-card-text">
                          <div className="driver-card-title-row">
                            <b>{opt.title}</b>
                            <span className="driver-badge">{opt.badge}</span>
                          </div>
                          <small>{opt.subtitle}</small>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PANEL: PACKAGE CATEGORY */}
            {activePopover === 'pkgCat' && (
              <div className="push-package-content">
                <div className="package-push-grid">
                  {PACKAGES_DATA.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        className={`package-push-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (typeof onSelectPackage === 'function') {
                            onSelectPackage(pkg);
                          }
                          setActivePopover(null);
                        }}
                      >
                        <div className="pkg-pop-title-row">
                          <b>{pkg.title}</b>
                          <span className="pkg-pop-badge">{pkg.badge}</span>
                        </div>
                        <p style={{ margin: '6px 0', fontSize: '12.5px', color: '#64748b' }}>{pkg.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <small style={{ color: '#D2B073', fontWeight: 600 }}>{pkg.tag}</small>
                          <b style={{ color: '#16294D' }}>{pkg.price}</b>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PANEL: EXPERIENCE CATEGORY */}
            {activePopover === 'expCat' && (
              <div className="push-experience-content">
                <div className="package-push-grid">
                  {EXPERIENCES_DATA.map((exp) => {
                    const isSelected = selectedExperience?.id === exp.id;
                    return (
                      <button
                        key={exp.id}
                        type="button"
                        className={`package-push-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          if (typeof onSelectExperience === 'function') {
                            onSelectExperience(exp);
                          }
                          setActivePopover(null);
                        }}
                      >
                        <div className="exp-pop-title-row">
                          <b>{exp.title}</b>
                          <span className="exp-pop-badge">{exp.badge}</span>
                        </div>
                        <p style={{ margin: '6px 0', fontSize: '12.5px', color: '#64748b' }}>{exp.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <small style={{ color: '#64748b', fontWeight: 600 }}>⏱️ {exp.duration}</small>
                          <b style={{ color: '#16294D' }}>{exp.price}</b>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
