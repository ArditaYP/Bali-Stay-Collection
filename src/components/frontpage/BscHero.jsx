import React from 'react';

/**
 * Komponen BscHero
 * Menampilkan seksi hero utama sesuai dengan tata letak dan copywriting resmi bsc-frontpage_1.html:
 * - Kicker kawasan utama di Bali
 * - Headline judul utama: 'Find a Bali villa you can book with confidence'
 * - Lead description pengantar brand BSC
 * - Form pencarian instan (Area, Check-in, Check-out, Guests)
 * - Trust strip 4 pilar jaminan kepercayaan (Private pool, Verified in person, Clear cancellation, Local team)
 * 
 * @param {Object} props
 * @param {string[]} props.areas - Daftar nama area/kawasan Bali
 * @param {Object} props.searchParams - Parameter pencarian saat ini
 * @param {Function} props.onSearchChange - Callback saat input form berubah
 * @param {Function} props.onSubmitSearch - Callback saat tombol submit pencarian diklik
 * @returns {React.JSX.Element} Elemen JSX Hero BSC
 */
export default function BscHero({
  areas = [],
  searchParams,
  onSearchChange,
  onSubmitSearch
}) {
  /**
   * Menangani pengiriman form pencarian hero
   * @param {React.FormEvent} e - Event submit form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmitSearch === 'function') {
      onSubmitSearch();
    }
  };

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-in">
          <div className="eyebrow" style={{ color: 'var(--accent-dark)' }}>
            Private villas &middot; Canggu &middot; Pererenan &middot; Umalas &middot; Uluwatu &middot; Ubud
          </div>
          <h1 style={{ marginTop: '8px' }}>
            Find a Bali villa you can book with confidence
          </h1>
          <p className="lead">
            Hand-picked private villas managed by our on-the-ground team. What you see is what you get — verified in person, no hidden fees, local support when you need it.
          </p>
        </div>

        {/* Form Pencarian Cepat */}
        <form className="search" onSubmit={handleSubmit} id="searchForm">
          <label htmlFor="sArea">
            <span className="lb">Where</span>
            <select
              id="sArea"
              value={searchParams.location || searchParams.area || ''}
              onChange={(e) => {
                if (typeof onSearchChange === 'function') {
                  onSearchChange('location', e.target.value);
                  onSearchChange('area', e.target.value);
                }
              }}
            >
              <option value="">All Bali</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </label>

          <label htmlFor="sIn">
            <span className="lb">Check-in</span>
            <input
              type="date"
              id="sIn"
              value={searchParams.checkIn || ''}
              onChange={(e) => onSearchChange('checkIn', e.target.value)}
            />
          </label>

          <label htmlFor="sOut">
            <span className="lb">Check-out</span>
            <input
              type="date"
              id="sOut"
              value={searchParams.checkOut || ''}
              onChange={(e) => onSearchChange('checkOut', e.target.value)}
            />
          </label>

          <label htmlFor="sGuests">
            <span className="lb">Guests</span>
            <select
              id="sGuests"
              value={searchParams.guests || 2}
              onChange={(e) => onSearchChange('guests', Number(e.target.value))}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="4">4 guests</option>
              <option value="6">6 guests</option>
              <option value="8">8 guests</option>
              <option value="10">10+ guests</option>
            </select>
          </label>

          <button className="btn btn-primary" type="submit">
            See villas
          </button>
        </form>

        {/* 4 Pilar Kepercayaan (Trust Strip) */}
        <div className="trust-strip">
          <div className="ts">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <div>
              <b>Every villa has a private pool</b>
              Cleaned and inspected before you arrive
            </div>
          </div>

          <div className="ts">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <b>Verified in person by our team</b>
              Real photos, real distances, tested WiFi
            </div>
          </div>

          <div className="ts">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <div>
              <b>Clear cancellation terms</b>
              Shown on every villa
            </div>
          </div>

          <div className="ts">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <div>
              <b>Local team on call</b>
              Real people, in Bali
            </div>
          </div>
        </div>
      </div>
      <br></br>

    </section >
  );
}
