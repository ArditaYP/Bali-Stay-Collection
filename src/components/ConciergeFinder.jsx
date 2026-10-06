import React, { useState } from 'react';
import { formatBscMoney } from '../utils/bscFormat';

/**
 * Komponen ConciergeFinder (Concierge Matching)
 * Menyediakan modul pencarian dan pencocokan villa pintar ("Not sure which villa?")
 * berdasarkan lokasi area, kapasitas tamu, jumlah kamar tidur, dan anggaran per malam.
 * 
 * Sesuai dengan desain section finder pada bali-stay-collection.html:
 * - Kicker: "Concierge matching"
 * - Judul: "Not sure which villa?"
 * - Keterangan: "Tell us what your trip looks like. We will match you with villas that fit your location, group size and budget."
 * - Form Grid interaktif dengan seleksi Area, Guests, Bedrooms, Budget / Night, dan tombol "Find My Villa →"
 * - Penampil hasil pencocokan (finder-result) yang menampilkan villa yang relevan dan navigasi langsung
 * 
 * @param {Object} props
 * @param {Object[]} props.allVillas - Seluruh daftar data villa yang tersedia
 * @param {Object} [props.currentVilla] - Data villa yang sedang dilihat di halaman detail
 * @param {Function} props.onSelectVilla - Callback saat tamu memilih villa hasil rekomendasi
 * @param {string} [props.currency='USD'] - Pilihan mata uang aktif ('USD' atau 'IDR')
 * @returns {React.JSX.Element} Elemen JSX Concierge Finder
 */
export default function ConciergeFinder({ allVillas = [], currentVilla, onSelectVilla, currency = 'USD' }) {
  // State untuk form pencarian finder
  const [area, setArea] = useState('Ubud');
  const [guests, setGuests] = useState('4');
  const [beds, setBeds] = useState('2+');
  const [budget, setBudget] = useState('Rp 3–5M');

  // State untuk melacak status dan hasil pencarian
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedVillas, setMatchedVillas] = useState([]);
  const [activeCriteria, setActiveCriteria] = useState('');

  /**
   * Menjalankan pencocokan villa pintar berdasarkan kriteria yang dipilih pengguna.
   * Memfilter daftar villa berdasarkan area lokasi, kapasitas tamu, jumlah kamar, dan rentang harga.
   */
  const findMatch = () => {
    const rawGuests = parseInt(guests.replace('+', ''), 10) || 2;
    const rawBeds = parseInt(beds.replace('+', ''), 10) || 1;

    // Filter daftar villa
    const matches = allVillas.filter((v) => {
      // 1. Pencocokan Area / Wilayah
      let matchArea = true;
      if (area && area !== 'All Bali' && area !== 'All') {
        const target = area.toLowerCase();
        const vLoc = (v.location || '').toLowerCase();
        const vAddr = (v.address || '').toLowerCase();

        // Wilayah Uluwatu mencakup Balangan Beach, Badung, dan semenanjung Bukit
        if (target.includes('uluwatu')) {
          matchArea = vLoc.includes('uluwatu') || 
                      vLoc.includes('balangan') || 
                      vAddr.includes('balangan') || 
                      vAddr.includes('badung');
        } else {
          matchArea = vLoc.includes(target) || vAddr.includes(target);
        }
      }

      // 2. Pencocokan Kapasitas Tamu (Guests)
      const matchGuests = (v.guests || 2) >= rawGuests;

      // 3. Pencocokan Jumlah Kamar Tidur (Bedrooms)
      const matchBeds = (v.beds || 1) >= rawBeds;

      // 4. Pencocokan Anggaran per Malam (Budget)
      let matchBudget = true;
      const price = v.price || 0;
      if (budget === 'Under Rp 3M') {
        // Setara di bawah $230 USD/malam
        matchBudget = price <= 230;
      } else if (budget === 'Rp 3–5M') {
        // Setara $200 - $350 USD/malam
        matchBudget = price >= 180 && price <= 350;
      } else if (budget === 'Rp 5–8M') {
        // Setara $350 - $550 USD/malam
        matchBudget = price >= 340 && price <= 550;
      } else if (budget === 'Rp 8M+') {
        // Setara di atas $500 USD/malam
        matchBudget = price >= 500;
      }

      return matchArea && matchGuests && matchBeds && matchBudget;
    });

    setMatchedVillas(matches);
    setActiveCriteria(`${area} · ${guests} Guests · ${beds} Bedrooms · ${budget}`);
    setHasSearched(true);
  };

  /**
   * Menangani pemilihan villa hasil pencocokan concierge untuk membuka halaman detail villa tersebut.
   * @param {string} villaId - Identifier unik villa yang akan dibuka
   */
  const handleOpenVilla = (villaId) => {
    if (onSelectVilla) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onSelectVilla(villaId);
    }
  };

  /**
   * Menutup tampilan hasil pencocokan atau mereset status pencarian
   */
  const handleResetSearch = () => {
    setHasSearched(false);
    setMatchedVillas([]);
  };

  return (
    <div className="concierge-finder-block">
      <div className="section-head finder-head">
        <div>
          <div className="section-kicker">Concierge matching</div>
          <h2 className="finder-title">Not sure which villa?</h2>
        </div>
        <p className="lead finder-lead">
          Tell us what your trip looks like. We will match you with villas that fit your location, group size and budget.
        </p>
      </div>

      <div className="finder">
        <div className="finder-grid">
          <div className="field">
            <label htmlFor="fArea">Area</label>
            <select 
              id="fArea" 
              value={area} 
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="Uluwatu">Uluwatu</option>
              <option value="Canggu">Canggu</option>
              <option value="Seminyak">Seminyak</option>
              <option value="Ubud">Ubud</option>
              <option value="Sanur">Sanur</option>
              <option value="All Bali">All Bali</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="fGuests">Guests</label>
            <select 
              id="fGuests" 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12+">12+</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="fBeds">Bedrooms</label>
            <select 
              id="fBeds" 
              value={beds} 
              onChange={(e) => setBeds(e.target.value)}
            >
              <option value="1+">1+</option>
              <option value="2+">2+</option>
              <option value="3+">3+</option>
              <option value="4+">4+</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="fBudget">Budget / Night</label>
            <select 
              id="fBudget" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="Under Rp 3M">Under Rp 3M</option>
              <option value="Rp 3–5M">Rp 3–5M</option>
              <option value="Rp 5–8M">Rp 5–8M</option>
              <option value="Rp 8M+">Rp 8M+</option>
            </select>
          </div>

          <button 
            type="button" 
            className="btn btn-gold finder-btn" 
            onClick={findMatch}
          >
            Find My Villa →
          </button>
        </div>

        {/* Kotak Hasil Pencocokan Villa */}
        <div className={`finder-result ${hasSearched ? 'show' : ''}`} id="finderResult">
          {hasSearched && (
            <>
              {matchedVillas.length > 0 ? (
                <div className="finder-result-body">
                  <div className="finder-result-header">
                    <div className="finder-result-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <strong>We found {matchedVillas.length} matching villa{matchedVillas.length > 1 ? 's' : ''} in {area === 'All Bali' ? 'Bali' : area}.</strong>
                      <span className="finder-result-criteria">{activeCriteria}</span>
                    </div>
                    <button 
                      type="button" 
                      className="finder-clear-btn" 
                      onClick={handleResetSearch}
                      title="Clear results"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Tombol Chip Cepat (Sesuai Gaya Asli bali-stay-collection.html) */}
                  <div className="finder-chips-row">
                    {matchedVillas.map((v) => (
                      <button 
                        key={v.id} 
                        type="button"
                        className="btn btn-light finder-chip-btn" 
                        onClick={() => handleOpenVilla(v.id)}
                      >
                        {v.name} · {v.beds}BR ({formatBscMoney(v.price, currency)})
                      </button>
                    ))}
                  </div>

                  {/* Kartu Pratinjau Lengkap Villa yang Cocok */}
                  <div className="finder-cards-grid">
                    {matchedVillas.map((v) => (
                      <div 
                        key={v.id} 
                        className="finder-card"
                        onClick={() => handleOpenVilla(v.id)}
                      >
                        <div 
                          className="finder-card-thumb"
                          style={{
                            backgroundImage: `url('${v.images[0]}')`,
                            backgroundColor: v.cardBg || '#ccc'
                          }}
                        >
                          <span className="finder-card-badge">{v.location}</span>
                        </div>
                        <div className="finder-card-info">
                          <h4 className="finder-card-name">{v.name}</h4>
                          <p className="finder-card-meta">
                            {v.beds} Bedrooms &middot; Up to {v.guests} Guests
                          </p>
                          <div className="finder-card-bottom">
                            <div className="finder-card-price">
                              <strong>{formatBscMoney(v.price, currency)}</strong> <span>/ night</span>
                            </div>
                            <span className="finder-card-action">View Villa →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="finder-result-body finder-no-matches">
                  <div className="finder-result-header">
                    <div className="finder-result-badge alt">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <div>
                      <strong>No exact match in {area === 'All Bali' ? 'Bali' : area} for this criteria.</strong>
                      <p className="finder-fallback-note">
                        In production, our concierge team can curate custom private villas for your exact dates and group size. 
                        Here are our top recommended available villas that fit your trip:
                      </p>
                    </div>
                    <button 
                      type="button" 
                      className="finder-clear-btn" 
                      onClick={handleResetSearch}
                      title="Clear results"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Rekomendasi Villa Alternatif */}
                  <div className="finder-cards-grid">
                    {allVillas.slice(0, 2).map((v) => (
                      <div 
                        key={v.id} 
                        className="finder-card"
                        onClick={() => handleOpenVilla(v.id)}
                      >
                        <div 
                          className="finder-card-thumb"
                          style={{
                            backgroundImage: `url('${v.images[0]}')`,
                            backgroundColor: v.cardBg || '#ccc'
                          }}
                        >
                          <span className="finder-card-badge">{v.location}</span>
                        </div>
                        <div className="finder-card-info">
                          <h4 className="finder-card-name">{v.name}</h4>
                          <p className="finder-card-meta">
                            {v.beds} Bedrooms &middot; Up to {v.guests} Guests
                          </p>
                          <div className="finder-card-bottom">
                            <div className="finder-card-price">
                              <strong>{formatBscMoney(v.price, currency)}</strong> <span>/ night</span>
                            </div>
                            <span className="finder-card-action">View Villa →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
