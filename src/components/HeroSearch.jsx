import React from 'react';

/**
 * Komponen HeroSearch
 * Menampilkan section header utama (Hero) yang terdiri dari judul promosi,
 * form pencarian multi-parameter (lokasi, tanggal, tamu), dan bar nilai kepercayaan (trust row).
 * 
 * @param {Object} props
 * @param {string} props.searchLocation - Nilai input teks lokasi yang sedang dicari
 * @param {Function} props.onLocationChange - Callback saat input lokasi berubah
 * @param {string} props.checkIn - Tanggal check-in (YYYY-MM-DD)
 * @param {Function} props.onCheckInChange - Callback saat tanggal check-in berubah
 * @param {string} props.checkOut - Tanggal check-out (YYYY-MM-DD)
 * @param {Function} props.onCheckOutChange - Callback saat tanggal check-out berubah
 * @param {number} props.guests - Jumlah tamu yang dipilih
 * @param {Function} props.onGuestsChange - Callback saat jumlah tamu berubah
 * @param {Function} props.onSearch - Callback saat tombol 'Search Villas' diklik
 */
export default function HeroSearch({
  searchLocation,
  onLocationChange,
  checkIn,
  onCheckInChange,
  checkOut,
  onCheckOutChange,
  guests,
  onGuestsChange,
  onSearch
}) {
  /**
   * Menangani pengiriman form pencarian saat tombol Search diklik
   * Memastikan fokus menggulir langsung ke daftar hasil pencarian villa
   * @param {React.FormEvent} e - Event submit form atau klik tombol
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch();
    }
    const resultsEl = document.getElementById('results-section');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Badge Jumlah Koleksi Villa Terverifikasi */}
        <div className="badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#C96F4A">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
          Over 60 private villas across Bali
        </div>

        {/* Headline Judul Besar */}
        <h1 className="headline">
          Find your dream private villa,<br />
          straight from the people who run it.
        </h1>

        {/* Sub-judul Penjelasan Keuntungan Direct Booking */}
        <p className="hero-sub">
          No layered agency markups. Better rates, direct communication, and a local team that actually knows every villa.
        </p>
      </div>

      {/* Bar Formulir Pencarian Terintegrasi */}
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        {/* Input Lokasi Destinasi */}
        <label>
          <div className="search-field-label">Location</div>
          <input 
            type="text" 
            placeholder="Canggu, Ubud, Seminyak…" 
            value={searchLocation}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </label>

        {/* Input Tanggal Check-in */}
        <label>
          <div className="search-field-label">Check-in</div>
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
          />
        </label>

        {/* Input Tanggal Check-out */}
        <label>
          <div className="search-field-label">Check-out</div>
          <input 
            type="date" 
            value={checkOut}
            min={checkIn}
            onChange={(e) => onCheckOutChange(e.target.value)}
          />
        </label>

        {/* Input Jumlah Tamu Menginap */}
        <label>
          <div className="search-field-label">Guests</div>
          <input 
            type="number" 
            min="1" 
            max="16"
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
          />
        </label>

        {/* Tombol Eksekusi Pencarian */}
        <button type="submit" className="search-btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          Search Villas
        </button>
      </form>

      {/* Row Poin Kepercayaan (Trust Row) */}
      <div className="trust-row">
        <div className="trust-item">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
          Best Price, Direct from Owners
        </div>
        <div className="trust-item">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          Secure Payment &amp; Deposit
        </div>
        <div className="trust-item">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          24/7 Local Support
        </div>
        <div className="trust-item">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Every Villa Verified by Our Team
        </div>
      </div>
    </section>
  );
}
