import React, { useState, useMemo, useEffect } from 'react';
import { formatBscMoney } from '../../utils/bscFormat';

const CRITERIA = ['Design', 'Pool & outdoor', 'View & setting', 'Service', 'Amenities'];

const DEFAULT_TIER_SCORES = {
  Standard: [1.0, 1.0, 0.75, 1.38, 1.38],
  Deluxe: [1.35, 1.35, 1.41, 1.94, 1.59],
  Premium: [1.95, 2.05, 1.76, 2.05, 1.76],
  Luxury: [2.4, 2.8, 2.4, 2.6, 3.0]
};

const bestFor = (v) => {
  const w = v.am && v.am.includes('Wellness facilities');
  if (v.beds <= 2) return 'Best for couples';
  if (v.tier === 'Luxury' && v.guests >= 10) return 'Best for celebrations';
  if (v.guests >= 10) return 'Best for big groups';
  if (w) return 'Best for wellness trips';
  if (v.beds >= 3 && v.trips && v.trips.includes('Family')) return 'Best for families & friends';
  return 'Best for small groups';
};

const EXCLUDED_AMENITIES = new Set([
  'private pool',
  'daily staff',
  'high-speed wifi',
  'kitchenette',
  'air conditioning'
]);

const isExcludedAmenity = (name) => {
  if (!name) return false;
  return EXCLUDED_AMENITIES.has(name.trim().toLowerCase());
};

/**
 * Komponen BscVillaCatalog
 * Menampilkan katalog lengkap villa dengan panel filter sisi kiri (sidebar),
 * quick filter chips, pengurutan (sort), dan kartu baris (row card) villa
 * persis sesuai spesifikasi bsc-frontpage_1.html.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Basis data 51 villa BSC
 * @param {string} props.currency - Mata uang aktif ('USD' atau 'IDR')
 * @param {number} props.nights - Jumlah malam menginap yang dipilih
 * @param {Object} props.searchParams - Parameter pencarian (location, checkIn, checkOut, guests)
 * @param {Function} props.onSearchParamsChange - Fungsi untuk memperbarui searchParams
 * @param {string[]} props.savedVillaIds - Daftar ID villa yang disimpan di wishlist
 * @param {Function} props.onToggleSave - Callback penambahan/penghapusan wishlist
 * @param {Function} props.onSelectVilla - Callback pembukaan detail villa
 * @param {string} [props.activeTier] - Tingkat kemewahan yang dipilih dari luar
 * @returns {React.JSX.Element} Elemen JSX katalog villa
 */
export default function BscVillaCatalog({
  villas = [],
  currency = 'USD',
  nights = 0,
  searchParams = { location: '', checkIn: '', checkOut: '', guests: 2 },
  onSearchParamsChange,
  savedVillaIds = [],
  onToggleSave,
  onSelectVilla,
  activeTier = null
}) {
  // Ekstraksi opsi filter unik dari data villa
  const allTiers = useMemo(() => {
    return Array.from(new Set(villas.map(v => v.tier).filter(Boolean)));
  }, [villas]);

  const allTrips = useMemo(() => {
    const set = new Set();
    villas.forEach(v => (v.trips || []).forEach(t => set.add(t)));
    return Array.from(set);
  }, [villas]);

  const allSettings = useMemo(() => {
    const set = new Set();
    villas.forEach(v => (v.setting || []).forEach(s => set.add(s)));
    return Array.from(set);
  }, [villas]);

  const allAmenities = useMemo(() => {
    const set = new Set();
    villas.forEach(v => {
      (v.am || []).forEach(a => {
        if (!isExcludedAmenity(a)) {
          set.add(a);
        }
      });
    });
    return Array.from(set).sort();
  }, [villas]);

  // State filter interaktif
  const [maxPrice, setMaxPrice] = useState(600);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [selectedSettings, setSelectedSettings] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minBeds, setMinBeds] = useState(0);
  const [sortBy, setSortBy] = useState('rec');
  const [shownCount, setShownCount] = useState(24);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const PAGE_SIZE = 24;

  // Sinkronisasi tingkat kemewahan jika diklik dari kartu Levels
  useEffect(() => {
    if (activeTier) {
      setSelectedTiers([activeTier]);
      setShownCount(PAGE_SIZE);
    }
  }, [activeTier]);

  /**
   * Mengatur ulang seluruh kriteria filter ke pengaturan awal
   * @returns {void}
   */
  const handleResetFilters = () => {
    setMaxPrice(600);
    setSelectedTiers([]);
    setSelectedTrips([]);
    setSelectedSettings([]);
    setSelectedAmenities([]);
    setMinBeds(0);
    setSortBy('rec');
    setShownCount(PAGE_SIZE);
    if (onSearchParamsChange) {
      onSearchParamsChange({ ...searchParams, location: '' });
    }
  };

  /**
   * Menangani toggle pemilihan filter tier
   * @param {string} tier - Nama tingkat kemewahan
   * @returns {void}
   */
  const handleToggleTier = (tier) => {
    setSelectedTiers(prev => 
      prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
    );
    setShownCount(PAGE_SIZE);
  };

  /**
   * Menangani toggle filter trip type
   * @param {string} trip - Jenis perjalanan
   * @returns {void}
   */
  const handleToggleTrip = (trip) => {
    setSelectedTrips(prev => 
      prev.includes(trip) ? prev.filter(t => t !== trip) : [...prev, trip]
    );
    setShownCount(PAGE_SIZE);
  };

  /**
   * Menangani toggle filter setting/view
   * @param {string} setting - Lingkungan/pemandangan villa
   * @returns {void}
   */
  const handleToggleSetting = (setting) => {
    setSelectedSettings(prev => 
      prev.includes(setting) ? prev.filter(s => s !== setting) : [...prev, setting]
    );
    setShownCount(PAGE_SIZE);
  };

  /**
   * Menangani toggle filter amenity
   * @param {string} amenity - Fasilitas yang diinginkan
   * @returns {void}
   */
  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
    setShownCount(PAGE_SIZE);
  };

  /**
   * Menghitung daftar villa yang telah disaring dan diurutkan
   * @returns {Object[]} Daftar villa tersaring
   */
  const filteredVillas = useMemo(() => {
    const area = searchParams.location || '';
    const guests = parseInt(searchParams.guests, 10) || 1;

    const list = villas.filter(v => {
      // Filter wilayah
      if (area && v.area !== area) return false;
      // Filter kapasitas tamu
      if (v.guests < guests) return false;
      // Filter harga
      if (maxPrice < 600 && v.price && v.price > maxPrice) return false;
      // Filter tingkat kemewahan (tier)
      if (selectedTiers.length > 0 && !selectedTiers.includes(v.tier)) return false;
      // Filter jenis perjalanan (trip type)
      if (selectedTrips.length > 0 && !(v.trips || []).some(t => selectedTrips.includes(t))) return false;
      // Filter setting / pemandangan
      if (selectedSettings.length > 0 && !(v.setting || []).some(s => selectedSettings.includes(s))) return false;
      // Filter kamar tidur
      if (minBeds > 0 && v.beds < minBeds) return false;
      // Filter fasilitas (must have)
      if (selectedAmenities.length > 0 && !selectedAmenities.every(a => (v.am || []).includes(a))) return false;

      return true;
    });

    // Pengurutan
    const sorted = [...list];
    if (sortBy === 'pa') {
      sorted.sort((a, b) => (a.price || 99999) - (b.price || 99999));
    } else if (sortBy === 'pd') {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'bd') {
      sorted.sort((a, b) => b.beds - a.beds);
    } else if (sortBy === 'g') {
      sorted.sort((a, b) => b.guests - a.guests);
    }

    return sorted;
  }, [
    villas,
    searchParams.location,
    searchParams.guests,
    maxPrice,
    selectedTiers,
    selectedTrips,
    selectedSettings,
    minBeds,
    selectedAmenities,
    sortBy
  ]);

  // Quick filter chips yang populer
  const chipItems = useMemo(() => {
    const chips = [];
    allTiers.forEach(t => chips.push({ type: 'tier', value: t }));
    ['Couples', 'Honeymoon', 'Family', 'Friends group'].forEach(t => {
      if (allTrips.includes(t)) chips.push({ type: 'trip', value: t });
    });
    return chips;
  }, [allTiers, allTrips]);

  const displayedVillas = filteredVillas.slice(0, shownCount);
  const remainingCount = Math.max(0, filteredVillas.length - shownCount);

  return (
    <section className="sec" id="villas">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">All villas</div>
          <h2>Find your villa</h2>
        </div>

        <div className="results">
          {/* Sisi Kiri: Filter Panel */}
          <aside className={`filters ${isMobileFiltersOpen ? 'open' : ''}`} id="filters" aria-label="Filters">
            {/* Filter Harga */}
            <div className="fg" id="fgPrice">
              <h3>Price per night</h3>
              <input
                type="range"
                id="fPrice"
                min="50"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(parseInt(e.target.value, 10));
                  setShownCount(PAGE_SIZE);
                }}
                aria-label="Maximum price per night"
              />
              <div className="rng">
                <span>{formatBscMoney(50, currency)}</span>
                <b id="fPriceVal">
                  {maxPrice >= 600 ? 'Any price' : `Up to ${formatBscMoney(maxPrice, currency)}`}
                </b>
                <span>{formatBscMoney(600, currency)}+</span>
              </div>
            </div>

            {/* Filter Villa Level */}
            <div className="fg">
              <h3>Villa level</h3>
              <div id="fTier">
                {allTiers.map(tier => (
                  <label key={tier} className="ck">
                    <input
                      type="checkbox"
                      name="tier"
                      value={tier}
                      checked={selectedTiers.includes(tier)}
                      onChange={() => handleToggleTier(tier)}
                    />
                    {' '}{tier}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Trip Type */}
            <div className="fg">
              <h3>Trip type</h3>
              <div id="fTrip">
                {allTrips.map(trip => (
                  <label key={trip} className="ck">
                    <input
                      type="checkbox"
                      name="trip"
                      value={trip}
                      checked={selectedTrips.includes(trip)}
                      onChange={() => handleToggleTrip(trip)}
                    />
                    {' '}{trip}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Setting & View */}
            <div className="fg">
              <h3>Setting &amp; view</h3>
              <div id="fSet">
                {allSettings.map(setting => (
                  <label key={setting} className="ck">
                    <input
                      type="checkbox"
                      name="set"
                      value={setting}
                      checked={selectedSettings.includes(setting)}
                      onChange={() => handleToggleSetting(setting)}
                    />
                    {' '}{setting}
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Bedrooms */}
            <div className="fg">
              <h3>Bedrooms</h3>
              {[
                { label: 'Any', value: 0 },
                { label: '2+', value: 2 },
                { label: '3+', value: 3 },
                { label: '5+', value: 5 },
                { label: '6+', value: 6 },
              ].map(opt => (
                <label key={opt.value} className="ck">
                  <input
                    type="radio"
                    name="beds"
                    value={opt.value}
                    checked={minBeds === opt.value}
                    onChange={() => {
                      setMinBeds(opt.value);
                      setShownCount(PAGE_SIZE);
                    }}
                  />
                  {' '}{opt.label}
                </label>
              ))}
            </div>

            {/* Filter Fasilitas (Must have) */}
            <div className="fg">
              <h3>Must have</h3>
              <div id="fAm">
                {allAmenities.map(am => (
                  <label key={am} className="ck">
                    <input
                      type="checkbox"
                      name="am"
                      value={am}
                      checked={selectedAmenities.includes(am)}
                      onChange={() => handleToggleAmenity(am)}
                    />
                    {' '}{am}
                  </label>
                ))}
              </div>
            </div>

            {/* Tombol Reset Filter */}
            <button
              className="btn btn-ghost"
              type="button"
              id="reset"
              onClick={handleResetFilters}
              style={{ width: '100%' }}
            >
              Reset filters
            </button>
          </aside>

          {/* Sisi Kanan: Daftar Hasil & Kontrol */}
          <div>
            {/* Baris Ringkasan & Kontrol Pengurutan */}
            <div className="rbar">
              <div>
                <h2 id="count" style={{ fontSize: '24px', margin: 0 }}>
                  {filteredVillas.length} {filteredVillas.length === 1 ? 'villa' : 'villas'}
                  {searchParams.location ? ` in ${searchParams.location}` : ' across Bali'}
                </h2>
                <div className="meta" id="sub" style={{ marginTop: '4px' }}>
                  {nights > 0 && `${searchParams.checkIn} to ${searchParams.checkOut} · ${nights} night${nights > 1 ? 's' : ''} · `}
                  {searchParams.guests} guest{parseInt(searchParams.guests, 10) > 1 ? 's' : ''}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  className="btn btn-ghost fbtn"
                  type="button"
                  id="toggleF"
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                  {isMobileFiltersOpen ? 'Close filters' : 'Filters'}
                </button>
                <label className="meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  Sort
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--line)', background: '#fff' }}
                  >
                    <option value="rec">Recommended</option>
                    <option value="pa" className="po">Price: low to high</option>
                    <option value="pd" className="po">Price: high to low</option>
                    <option value="bd">Most bedrooms</option>
                    <option value="g">Most guests</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="chips" id="chips" role="group" aria-label="Quick filters">
              {chipItems.map(chip => {
                const isSelected = chip.type === 'tier' 
                  ? selectedTiers.includes(chip.value)
                  : selectedTrips.includes(chip.value);

                return (
                  <button
                    key={`${chip.type}-${chip.value}`}
                    type="button"
                    className="chip"
                    aria-pressed={isSelected}
                    onClick={() => {
                      if (chip.type === 'tier') handleToggleTier(chip.value);
                      else handleToggleTrip(chip.value);
                    }}
                  >
                    {chip.value}
                  </button>
                );
              })}
            </div>

            {/* Penjelasan Tingkat Kemewahan (Levels Accordion) */}
            <details className="know" style={{ margin: '0 0 16px' }}>
              <summary>What do the levels mean?</summary>
              <ul>
                <li><b>Standard:</b> clean, comfortable, good value. Private pool, simple design, essentials covered.</li>
                <li><b>Deluxe:</b> stylish and well equipped, in a good location, with some service.</li>
                <li><b>Premium:</b> designer villas with larger pools, stronger service and notable extras.</li>
                <li><b>Luxury:</b> architect-level design, signature pools, dedicated staff or a villa manager and a standout setting.</li>
              </ul>
            </details>

            {/* Daftar Kartu Villa */}
            <div className="list" id="list" aria-live="polite">
              {displayedVillas.length === 0 ? (
                <div className="empty" style={{ padding: '48px 24px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid var(--line)' }}>
                  <b>No villas match these filters.</b>
                  <br />
                  Try changing the dates, number of guests or removing a filter.
                  <br /><br />
                  <button className="btn btn-ghost" type="button" onClick={handleResetFilters}>
                    Reset filters
                  </button>
                </div>
              ) : (
                displayedVillas.map(villa => {
                  const isSaved = savedVillaIds.includes(villa.id);
                  const bgStyle = villa.img 
                    ? { backgroundImage: `url('${villa.img}')` }
                    : { background: `linear-gradient(135deg, ${(villa.tone && villa.tone[0]) || '#CBB9C9'}, ${(villa.tone && villa.tone[1]) || '#E9DCE6'})` };

                  return (
                    <article key={villa.id} className="row">
                      {/* Visual & Wishlist Heart */}
                      <div
                        className="ph"
                        style={bgStyle}
                        onClick={() => onSelectVilla(villa.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && onSelectVilla(villa.id)}
                      >
                        <span className="tag">{villa.tier}</span>
                        <button
                          className="heart"
                          type="button"
                          aria-pressed={isSaved}
                          aria-label={`Save ${villa.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(villa.id);
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill={isSaved ? '#16294D' : 'none'}
                            stroke={isSaved ? '#16294D' : '#0C1B38'}
                            strokeWidth="2"
                          >
                            <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                          </svg>
                        </button>
                      </div>

                      {/* Detail Kartu Villa */}
                      <div className="rb">
                        <div className="best">{bestFor(villa)}</div>
                        <h3 
                          onClick={() => onSelectVilla(villa.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          {villa.name}
                        </h3>
                        <div className="meta">
                          {villa.area} &middot; {villa.beds} bed &middot; {villa.baths} bath &middot; {villa.guests} guests
                        </div>
                        <p className="desc">{villa.desc}</p>

                        {/* BSC 5-Point Check Meter */}
                        <div className="meter">
                          {(villa.sc || DEFAULT_TIER_SCORES[villa.tier] || [1, 1, 1, 1, 1]).map((score, sIdx) => (
                            <div key={sIdx}>
                              {CRITERIA[sIdx]}
                              <span className="bar">
                                {[0, 1, 2].map((k) => {
                                  const diff = score - k;
                                  const statusClass = diff >= 1 ? 'on' : diff >= 0.5 ? 'half' : '';
                                  return <i key={k} className={statusClass} />;
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="mnote">BSC level check, not a guest rating</p>

                        {/* Amenities Badges */}
                        <div className="badges" style={{ marginTop: '10px' }}>
                          {(villa.am || []).map(am => (
                            <span key={am} className="bdg">{am}</span>
                          ))}
                        </div>

                        {/* Inspection Status Badges */}
                        <div className="badges" style={{ marginTop: '6px' }}>
                          <span className="bdg new">New on BSC</span>
                          {villa.verified ? (
                            <span className="seal ok">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              Inspected by BSC &middot; {villa.updated || 'Recent'}
                            </span>
                          ) : (
                            <span className="seal wait">Inspection scheduled</span>
                          )}
                          {villa.cancel && (
                            <span className="bdg">{villa.cancel}</span>
                          )}
                        </div>

                        {/* Good to know details */}
                        {villa.know && villa.know.length > 0 && (
                          <details className="know">
                            <summary>Good to know</summary>
                            <ul>
                              {villa.know.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </details>
                        )}

                        {/* Harga & Tombol Aksi */}
                        <div className="bottom">
                          <div>
                            <div className="pr">
                              <span>{formatBscMoney(villa.price || 280, currency)}</span>{' '}
                              <small>/ night</small>
                            </div>
                            {nights > 0 && (
                              <div className="total">
                                {formatBscMoney((villa.price || 280) * nights, currency)} total for {nights} night{nights > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => onSelectVilla(villa.id)}
                          >
                            View details
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Tombol Paginasi 'Show more' */}
            {remainingCount > 0 && (
              <div className="more" style={{ marginTop: '24px', textAlign: 'center' }}>
                <button
                  className="btn btn-ghost"
                  type="button"
                  id="moreBtn"
                  onClick={() => setShownCount(prev => prev + PAGE_SIZE)}
                >
                  Show more villas
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
