import React, { useState, useRef, useEffect } from 'react';
import { DESTINATIONS_SUMMARY } from '../../data/bscVillasData';
import { 
  CAR_FLEET_DATA, 
  MOTORBIKE_FLEET_DATA,
  PICKUP_LOCATIONS_DATA, 
  CHAUFFEUR_OPTIONS_DATA, 
  PACKAGES_DATA, 
  EXPERIENCES_DATA 
} from '../../data/bscFleetData';
import AirbnbDatePopover from './AirbnbDatePopover';

/**
 * Komponen AirbnbSearchBar
 * Mengimplementasikan formulir pencarian id="searchForm" bergaya floating capsule ala Airbnb:
 * - Tab Stays: Where | Experience (When) | Who | Search
 * - Tab Cars: Pickup | Car Fleet | Chauffeur | Inquire
 * - Tab Motorbikes: Delivery Location | Motorbike Model | Inclusions | Inquire
 * - Tab Packages: Package Category | Destination | Dates | Inquire
 * - Tab Things to do: Activity Category | Location | Inquire
 * 
 * @param {Object} props
 * @param {string} [props.activeTab='stays'] - Tab layanan aktif ('stays', 'cars', 'motorbikes', 'packages', 'experiences')
 * @param {string[]} [props._areas=[]] - Daftar nama kawasan
 * @param {Object} props.searchParams - Parameter pencarian aktif
 * @param {Function} props.onSearchChange - Callback saat nilai pencarian berubah
 * @param {Function} props.onSubmitSearch - Callback saat form disubmit
 * @param {boolean} [props.isCompact=false] - Tampilan kompak (misal saat melayang di navbar)
 * @param {Object} [props.selectedCar] - Mobil yang terpilih saat ini
 * @param {Function} [props.onSelectCar] - Callback pemilih mobil
 * @param {Object} [props.selectedMotorbike] - Motor yang terpilih saat ini
 * @param {Function} [props.onSelectMotorbike] - Callback pemilih motor
 * @param {Object} [props.selectedPickup] - Lokasi penjemputan terpilih
 * @param {Function} [props.onSelectPickup] - Callback pemilih lokasi penjemputan
 * @param {Object} [props.selectedDriverOption] - Opsi supir terpilih
 * @param {Function} [props.onSelectDriverOption] - Callback pemilih opsi supir
 * @param {Object} [props.selectedPackage] - Paket terpilih
 * @param {Function} [props.onSelectPackage] - Callback pemilih paket
 * @param {Object} [props.selectedExperience] - Aktivitas terpilih
 * @param {Function} [props.onSelectExperience] - Callback pemilih aktivitas
 * @returns {React.JSX.Element} Elemen JSX Airbnb Search Bar
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
  selectedMotorbike = MOTORBIKE_FLEET_DATA[0],
  onSelectMotorbike,
  selectedPickup = PICKUP_LOCATIONS_DATA[0],
  onSelectPickup,
  selectedDriverOption = CHAUFFEUR_OPTIONS_DATA[0],
  onSelectDriverOption,
  selectedPackage = PACKAGES_DATA[0],
  onSelectPackage,
  selectedExperience = EXPERIENCES_DATA[0],
  onSelectExperience
}) {
  // State panel drop-up popover aktif ('where', 'dates', 'who', 'pickup', 'carFleet', 'carDriver', 'pkgCat', 'expCat', atau null)
  const [activePopover, setActivePopover] = useState(null);


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

  // Listener click outside untuk menutup popover drop-up
  useEffect(() => {
    /**
     * Menutup popover jika pengguna mengklik di luar area form pencarian
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

  // Tutup popover otomatis saat beralih tab layanan
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

    if (activeTab === 'motorbikes') {
      const datesInfo = searchParams.checkIn ? `untuk tanggal ${searchParams.checkIn}` : 'untuk jadwal segera';
      const msg = encodeURIComponent(
        `Halo Bali Stay Collection Concierge, saya tertarik sewa motor "${selectedMotorbike?.name || 'Yamaha XMAX 250cc'}" dengan pengantaran ke "${selectedPickup?.title || 'Villa Delivery'}" ${datesInfo}. Mohon info ketersediaannya.`
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
   * Format tanggal singkat yang elegan untuk label tampilan (contoh: '14 Oct')
   * @param {string} dateStr - Tanggal format YYYY-MM-DD
   * @returns {string} String tanggal ringkas terformat
   */
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Label ringkasan rentang tanggal menginap pada segmen Experience (When)
  let datesDisplayLabel = 'Add dates';
  if (searchParams.checkIn && searchParams.checkOut) {
    datesDisplayLabel = `${formatDateDisplay(searchParams.checkIn)} – ${formatDateDisplay(searchParams.checkOut)}`;
  } else if (searchParams.checkIn) {
    datesDisplayLabel = `${formatDateDisplay(searchParams.checkIn)} – Add check-out`;
  }

  // Ringkasan label teks tamu
  const totalGuestsCount = adults + children;
  const guestLabel = `${totalGuestsCount} guest${totalGuestsCount > 1 ? 's' : ''}${infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}`;

  return (
    <div className={`airbnb-search-wrapper ${isCompact ? 'compact' : ''} ${activePopover ? 'has-active-popover' : ''}`} ref={containerRef}>
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

              {/* POPOVER DAFTAR DESTINASI (MEMBUKA KE BAWAH) */}
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
                        <small>Explore all 51 authentic luxury villas across Bali</small>
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

            {/* 2. SEGMEN EXPERIENCE (Pengganti Check-in & Check-out: Berfungsi sebagai pemilih tanggal / When) */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment exp-segment ${activePopover === 'dates' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'dates' ? null : 'dates')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'dates' ? null : 'dates');
                }
              }}
            >
              <span className="airbnb-seg-label">Experience</span>
              <span className={`airbnb-seg-value ${!searchParams.checkIn ? 'placeholder' : ''}`}>
                {datesDisplayLabel}
              </span>

              {/* POPOVER KALENDER TANGGAL (MEMBUKA SAAT SEGMEN EXPERIENCE DIKLIK) */}
              {activePopover === 'dates' && (
                <AirbnbDatePopover
                  checkIn={searchParams.checkIn || ''}
                  checkOut={searchParams.checkOut || ''}
                  initialTarget="checkIn"
                  onDatesChange={(newCi, newCo) => {
                    onSearchChange('checkIn', newCi);
                    onSearchChange('checkOut', newCo);
                  }}
                  onClose={() => setActivePopover(null)}
                  onDone={() => setActivePopover('who')}
                />
              )}
            </div>

            <div className="airbnb-seg-divider" />

            {/* 4. SEGMEN WHO (GUEST COUNTER STEPPER) */}
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

              {/* POPOVER STEPPER TAMU (MEMBUKA KE BAWAH DI KANAN) */}
              {activePopover === 'who' && (
                <div className="airbnb-popover guests-popover popover-right" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Number of Guests</span>
                  </div>
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
        {/* KONTEN TAB: CARS (LUXURY FLEET CONCIERGE) */}
        {/* ============================================================== */}
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

              {/* POPOVER LOKASI PENJEMPUTAN (MEMBUKA KE BAWAH) */}
              {activePopover === 'pickup' && (
                <div className="airbnb-popover pickup-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Select Transfer Location</span>
                  </div>
                  <div className="pickup-options-list">
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

              {/* POPOVER PILIHAN ARMADA MOBIL (MEMBUKA KE BAWAH DI TENGAH) */}
              {activePopover === 'carFleet' && (
                <div className="airbnb-popover fleet-popover popover-center" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Select Luxury Fleet</span>
                    <small style={{ color: '#D2B073', fontWeight: 600 }}>Chauffeur & Fuel Included</small>
                  </div>
                  <div className="fleet-popover-list">
                    {CAR_FLEET_DATA.map((car) => {
                      const isSelected = selectedCar?.id === car.id;
                      return (
                        <button
                          key={car.id}
                          type="button"
                          className={`fleet-popover-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (typeof onSelectCar === 'function') {
                              onSelectCar(car);
                            }
                            setActivePopover('carDriver');
                          }}
                        >
                          <div className="fleet-popover-item-left">
                            <div className="fleet-popover-icon">
                              🚗
                            </div>
                            <div className="fleet-popover-details">
                              <div className="fleet-popover-title-row">
                                <b>{car.name}</b>
                                <span className="fleet-badge-gold">{car.badge}</span>
                              </div>
                              <div className="fleet-popover-specs">
                                <span>💺 {car.seats} Seats</span>
                                <span>🧳 {car.luggage} Bags</span>
                                <span>⚙️ {car.transmission}</span>
                              </div>
                            </div>
                          </div>
                          <div className="fleet-popover-pricing">
                            <span className="fleet-popover-price">{car.priceIdr}</span>
                            <small className="fleet-popover-period">/ day</small>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
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

              {/* POPOVER PILIHAN SUPIR (MEMBUKA KE BAWAH DI KANAN) */}
              {activePopover === 'carDriver' && (
                <div className="airbnb-popover driver-popover popover-right" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Driver & Service Option</span>
                  </div>
                  <div className="driver-options-list">
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
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* KONTEN TAB: MOTORBIKES (PREMIUM BALI SCOOTER CONCIERGE) */}
        {/* ============================================================== */}
        {activeTab === 'motorbikes' && (
          <>
            {/* SEGMEN 1: LOKASI PENGANTARAN / PENJEMPUTAN */}
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
              <span className="airbnb-seg-label">Delivery Location</span>
              <span className="airbnb-seg-value">
                {selectedPickup?.title || 'Villa Delivery / Airport'}
              </span>

              {activePopover === 'pickup' && (
                <div className="airbnb-popover pickup-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Select Delivery Location</span>
                  </div>
                  <div className="pickup-options-list">
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
                            setActivePopover('bikeModel');
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
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 2: PILIHAN MODEL MOTOR / SKUTER */}
            <div 
              role="button"
              tabIndex={0}
              className={`airbnb-search-segment car-fleet-segment ${activePopover === 'bikeModel' ? 'active' : ''}`}
              onClick={() => setActivePopover(prev => prev === 'bikeModel' ? null : 'bikeModel')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePopover(prev => prev === 'bikeModel' ? null : 'bikeModel');
                }
              }}
            >
              <span className="airbnb-seg-label">Motorbike Model</span>
              <span className="airbnb-seg-value">
                {selectedMotorbike?.shortName || 'Yamaha XMAX 250cc'}
              </span>

              {activePopover === 'bikeModel' && (
                <div className="airbnb-popover fleet-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Select Motorbike / Scooter</span>
                  </div>
                  <div className="fleet-options-list">
                    {MOTORBIKE_FLEET_DATA.map((bike) => {
                      const isSelected = selectedMotorbike?.id === bike.id;
                      return (
                        <button
                          key={bike.id}
                          type="button"
                          className={`fleet-option-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (typeof onSelectMotorbike === 'function') {
                              onSelectMotorbike(bike);
                            }
                            setActivePopover(null);
                          }}
                        >
                          <div className="fleet-card-info">
                            <div className="fleet-card-title-row">
                              <b>{bike.name}</b>
                              <span className="fleet-badge">{bike.badge}</span>
                            </div>
                            <div className="fleet-specs-row">
                              <span>🛵 {bike.engine}</span>
                              <span>📦 {bike.storage}</span>
                            </div>
                            <p className="fleet-card-desc">{bike.description}</p>
                          </div>
                          <div className="fleet-card-price">
                            <span className="fleet-idr">{bike.priceIdr}</span>
                            <span className="fleet-usd">{bike.priceUsd} / day</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="airbnb-seg-divider" />

            {/* SEGMEN 3: INCLUSIONS */}
            <div 
              role="button"
              tabIndex={0}
              className="airbnb-search-segment"
              onClick={() => setActivePopover(null)}
            >
              <span className="airbnb-seg-label">Inclusions</span>
              <span className="airbnb-seg-value">
                2 Helmets, Raincoats & Mount
              </span>
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* KONTEN TAB: PACKAGES (VIP ALL-INCLUSIVE BUNDLES) */}
        {/* ============================================================== */}
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

              {/* POPOVER PILIHAN PAKET (MEMBUKA KE BAWAH) */}
              {activePopover === 'pkgCat' && (
                <div className="airbnb-popover package-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Select Curated VIP Bundle</span>
                  </div>
                  <div className="package-popover-list">
                    {PACKAGES_DATA.map((pkg) => {
                      const isSelected = selectedPackage?.id === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          className={`package-popover-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (typeof onSelectPackage === 'function') {
                              onSelectPackage(pkg);
                            }
                            setActivePopover(null);
                          }}
                        >
                          <div className="pkg-pop-info">
                            <div className="pkg-pop-title-row">
                              <b>{pkg.title}</b>
                              <span className="pkg-pop-badge">{pkg.badge}</span>
                            </div>
                            <small>{pkg.tag}</small>
                          </div>
                          <div className="pkg-pop-price">
                            <b>{pkg.price}</b>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
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

              {/* POPOVER DESTINASI (MEMBUKA KE BAWAH DI KANAN) */}
              {activePopover === 'where' && (
                <div className="airbnb-popover destinations-popover popover-right" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Preferred Region</span>
                  </div>
                  <div className="dest-regions-grid">
                    {DESTINATIONS_SUMMARY.map((dest) => (
                      <button
                        key={dest.name}
                        type="button"
                        className={`dest-option-btn ${searchParams.location === dest.name ? 'selected' : ''}`}
                        onClick={() => {
                          onSearchChange('location', dest.name);
                          onSearchChange('area', dest.name);
                          setActivePopover(null);
                        }}
                      >
                        <div className="dest-opt-icon">📍</div>
                        <div className="dest-opt-info">
                          <b>{dest.name}</b>
                          <small>{dest.count} villas</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* KONTEN TAB: THINGS TO DO (CURATED EXPERIENCES) */}
        {/* ============================================================== */}
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

              {/* POPOVER PILIHAN AKTIVITAS (MEMBUKA KE BAWAH) */}
              {activePopover === 'expCat' && (
                <div className="airbnb-popover experience-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Select On-Demand Experience</span>
                  </div>
                  <div className="experience-popover-list">
                    {EXPERIENCES_DATA.map((exp) => {
                      const isSelected = selectedExperience?.id === exp.id;
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          className={`exp-popover-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            if (typeof onSelectExperience === 'function') {
                              onSelectExperience(exp);
                            }
                            setActivePopover(null);
                          }}
                        >
                          <div className="exp-pop-info">
                            <div className="exp-pop-title-row">
                              <b>{exp.title}</b>
                              <span className="exp-pop-badge">{exp.badge}</span>
                            </div>
                            <small>{exp.tag} · {exp.duration}</small>
                          </div>
                          <div className="exp-pop-price">
                            <b>{exp.price}</b>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
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

              {/* POPOVER DESTINASI (MEMBUKA KE BAWAH DI KANAN) */}
              {activePopover === 'where' && (
                <div className="airbnb-popover destinations-popover popover-right" onClick={(e) => e.stopPropagation()}>
                  <div className="popover-header">
                    <span>Preferred Region</span>
                  </div>
                  <div className="dest-regions-grid">
                    {DESTINATIONS_SUMMARY.map((dest) => (
                      <button
                        key={dest.name}
                        type="button"
                        className={`dest-option-btn ${searchParams.location === dest.name ? 'selected' : ''}`}
                        onClick={() => {
                          onSearchChange('location', dest.name);
                          onSearchChange('area', dest.name);
                          setActivePopover(null);
                        }}
                      >
                        <div className="dest-opt-icon">📍</div>
                        <div className="dest-opt-info">
                          <b>{dest.name}</b>
                          <small>{dest.count} villas</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* TOMBOL SEARCH */}
        <div className="airbnb-search-btn-container">
          <button 
            type="submit" 
            className="airbnb-submit-btn" 
            aria-label="Find My Villa"
          >
            <span className="search-btn-text">Find My Villa</span>
          </button>
        </div>
      </form>
    </div>
  );
}
