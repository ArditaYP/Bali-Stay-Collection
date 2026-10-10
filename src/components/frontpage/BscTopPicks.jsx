import React, { useState, useMemo, useEffect } from 'react';
import { formatBscMoney, calculateNights } from '../../utils/bscFormat';
import AirbnbDatePopover from './AirbnbDatePopover';

/**
 * Komponen BscTopPicks
 * Menampilkan seksi rekomendasi terkurasi 'Our top picks' (9 villa pilihan terbaik):
 * - Kicker: Hand-picked by our team
 * - Judul: Villas we would book for our own family
 * - Deskripsi: Every pick comes with the reason we chose it, based on our own notes.
 * - Harga default disembunyikan sesuai arahan pengguna.
 * - Tombol 'Show price' membuka kalender pemilih tanggal (Check-in & Check-out).
 * - Setelah tanggal dipilih, harga terhitung ditampilkan dan sistem langsung mengarahkan
 *   pengguna masuk ke dalam halaman detail villa yang dipilih tersebut.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Seluruh daftar master villa
 * @param {string} props.currency - Mata uang aktif ('USD' atau 'IDR')
 * @param {number} props.nights - Jumlah malam yang dipilih
 * @param {string[]} props.savedVillaIds - Daftar ID villa yang disimpan di wishlist
 * @param {Function} props.onToggleSave - Callback saat tombol wishlist love diklik
 * @param {Function} props.onSelectVilla - Callback saat tombol 'View villa' diklik untuk membuka detail
 * @param {Object} [props.searchParams] - Objek parameter pencarian aktif
 * @param {Function} [props.onSearchParamsChange] - Callback untuk memperbarui tanggal pencarian global
 * @returns {React.JSX.Element} Elemen JSX Top Picks BSC
 */
export default function BscTopPicks({
  villas = [],
  currency = 'USD',
  nights: _globalNights = 0,
  savedVillaIds = [],
  onToggleSave,
  onSelectVilla,
  searchParams = {},
  onSearchParamsChange
}) {
  // Filter villa yang ditandai sebagai pick: true (mengecualikan Villa Habitas) dan membatasi tepat 9 villa
  const topPickedVillas = useMemo(() => {
    const picked = villas.filter(v => v.pick && v.id !== 'villa-habitas');
    if (picked.length >= 9) return picked.slice(0, 9);
    const others = villas.filter(v => !v.pick && v.id !== 'villa-habitas' && v.img);
    return [...picked, ...others].slice(0, 9);
  }, [villas]);

  // State untuk villa yang sedang aktif dibuka kalender "Show price"-nya
  const [activePickerVilla, setActivePickerVilla] = useState(null);

  // State tanggal sementara pada modal date picker
  const [tempCheckIn, setTempCheckIn] = useState('');
  const [tempCheckOut, setTempCheckOut] = useState('');
  const [dateTargetMode, setDateTargetMode] = useState('checkIn');

  // State villa mana saja yang harganya sudah terbuka (unlocked)
  const [unlockedVillas, setUnlockedVillas] = useState({});

  // State indikator saat otomatis mengarahkan ke halaman detail villa
  const [isNavigatingToVillaId, setIsNavigatingToVillaId] = useState(null);

  // Timer ID untuk auto-redirect agar bisa dibersihkan saat unmount
  const timerRef = React.useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /**
   * Membuka modal kalender pemilih tanggal untuk villa tertentu
   * @param {Object} villa - Objek villa yang diklik tombol Show price-nya
   */
  const handleOpenDatePicker = (villa) => {
    setActivePickerVilla(villa);
    setTempCheckIn(searchParams?.checkIn || '');
    setTempCheckOut(searchParams?.checkOut || '');
    setDateTargetMode('checkIn');
    setIsNavigatingToVillaId(null);
  };

  /**
   * Menutup modal kalender pemilih tanggal
   */
  const handleCloseDatePicker = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActivePickerVilla(null);
    setIsNavigatingToVillaId(null);
  };

  /**
   * Handler saat tanggal Check-in atau Check-out berubah di dalam kalender
   * @param {string} newCi - Tanggal check-in baru (YYYY-MM-DD)
   * @param {string} newCo - Tanggal check-out baru (YYYY-MM-DD)
   */
  const handleDatesChange = (newCi, newCo) => {
    setTempCheckIn(newCi);
    setTempCheckOut(newCo);

    if (newCi && !newCo) {
      setDateTargetMode('checkOut');
    }

    // Jika kedua tanggal (Check-in & Check-out) sudah lengkap dipilih
    if (newCi && newCo && activePickerVilla) {
      const calcNights = calculateNights(newCi, newCo);
      const stayNights = calcNights > 0 ? calcNights : 1;
      const rate = activePickerVilla.price || 280;
      const total = rate * stayNights;

      // Catat harga terbuka untuk villa ini
      setUnlockedVillas(prev => ({
        ...prev,
        [activePickerVilla.id]: {
          checkIn: newCi,
          checkOut: newCo,
          nights: stayNights,
          rate,
          total
        }
      }));

      // Sinkronkan ke parameter pencarian global
      if (typeof onSearchParamsChange === 'function') {
        onSearchParamsChange(prev => ({
          ...(prev || {}),
          checkIn: newCi,
          checkOut: newCo
        }));
      }

      // Beri tanda visual bahwa sistem sedang masuk ke halaman detail villa
      setIsNavigatingToVillaId(activePickerVilla.id);

      // Otomatis arahkan masuk ke dalam detail villa setelah jeda singkat (500ms)
      // agar pengguna sempat melihat nominal harga terhitung
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        handleEnterVilla(activePickerVilla.id, newCi, newCo);
      }, 550);
    }
  };

  /**
   * Masuk langsung ke halaman detail villa dengan tanggal yang sudah dipastikan
   * @param {string} villaId - ID villa tujuan
   * @param {string} ci - Tanggal check-in
   * @param {string} co - Tanggal check-out
   */
  const handleEnterVilla = (villaId, ci, co) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (typeof onSearchParamsChange === 'function' && ci && co) {
      onSearchParamsChange(prev => ({
        ...(prev || {}),
        checkIn: ci,
        checkOut: co
      }));
    }
    setActivePickerVilla(null);
    setIsNavigatingToVillaId(null);
    if (typeof onSelectVilla === 'function') {
      onSelectVilla(villaId);
    }
  };

  // Kalkulasi preview jumlah malam dan total harga di dalam modal aktif
  const modalNights = useMemo(() => {
    return calculateNights(tempCheckIn, tempCheckOut);
  }, [tempCheckIn, tempCheckOut]);

  const modalTotalPrice = useMemo(() => {
    if (!activePickerVilla || modalNights <= 0) return 0;
    return (activePickerVilla.price || 280) * modalNights;
  }, [activePickerVilla, modalNights]);

  return (
    <section className="sec" id="picks">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Hand-picked by our team</div>
          <h2>Villas we would book for our own family</h2>
          <p>
            Every pick comes with the reason we chose it, based on our own notes. No borrowed ratings, just a straight answer on what to expect.
          </p>
        </div>

        <div className="grid-picks">
          {topPickedVillas.map((villa) => {
            const isSaved = savedVillaIds.includes(villa.id);
            const unlockedInfo = unlockedVillas[villa.id];
            const bgStyle = villa.img 
              ? { backgroundImage: `url('${villa.img}')` }
              : { background: `linear-gradient(135deg, ${(villa.tone && villa.tone[0]) || '#CBB9C9'}, ${(villa.tone && villa.tone[1]) || '#E9DCE6'})` };

            return (
              <article key={villa.id} className="pick">
                {/* Foto / Visual Villa */}
                <div 
                  className="ph" 
                  style={bgStyle}
                  onClick={() => onSelectVilla(villa.id)}
                  role="button"
                  tabIndex={0}
                  title={`View details for ${villa.name}`}
                >
                  <span className="tag">{villa.tier}</span>
                  
                  {/* Tombol Wishlist Love */}
                  <button
                    type="button"
                    className="heart"
                    aria-pressed={isSaved}
                    aria-label={`Save ${villa.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof onToggleSave === 'function') {
                        onToggleSave(villa.id);
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? '#16294D' : 'none'} stroke={isSaved ? '#16294D' : '#141413'} strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                    </svg>
                  </button>
                </div>

                {/* Konten & Ulasan Inspeksi */}
                <div className="pbody">
                  <h3 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectVilla(villa.id)}
                  >
                    {villa.name}
                  </h3>
                  <div className="meta">
                    {villa.area} &middot; {villa.beds} bed &middot; {villa.guests} guests
                  </div>

                  {villa.why && (
                    <p className="why">
                      <b>Why we picked it:</b> {villa.why}
                    </p>
                  )}

                  {/* Baris Lencana Inspeksi & Tombol Show Price Sejajar ke Kanan */}
                  <div className="picks-badges-row">
                    <div className="badges-group">
                      <span className="bdg new">New on BSC</span>
                      {villa.verified ? (
                        <span className="bdg ok">Inspected {villa.updated || 'Oct 2026'}</span>
                      ) : (
                        <span className="bdg">Inspection pending</span>
                      )}
                    </div>

                    {!unlockedInfo && (
                      <button
                        type="button"
                        className="btn-show-price"
                        onClick={() => handleOpenDatePicker(villa)}
                        title={`Select dates to show price for ${villa.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Show price</span>
                      </button>
                    )}
                  </div>

                  {/* Baris Rincian Harga Terbuka (Hanya tampil saat tanggal sudah dipilih) */}
                  {unlockedInfo && (
                    <div className="price-row is-unlocked">
                      <div className="picks-unlocked-info">
                        <div className="pr">
                          <span>{formatBscMoney(unlockedInfo.rate, currency)}</span>{' '}
                          <small>/ night</small>
                        </div>
                        <div className="total">
                          {formatBscMoney(unlockedInfo.total, currency)} total ({unlockedInfo.nights} night{unlockedInfo.nights > 1 ? 's' : ''})
                        </div>
                        <div className="picks-unlocked-badge">
                          ✓ {unlockedInfo.checkIn.slice(5)} – {unlockedInfo.checkOut.slice(5)}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-view-villa-unlocked"
                        onClick={() => onSelectVilla(villa.id)}
                        title={`View details for ${villa.name}`}
                      >
                        <span>View villa</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL DATE PICKER "SHOW PRICE" KHUSUS SECTION PICKS           */}
      {/* ============================================================== */}
      {activePickerVilla && (
        <div 
          className="picks-date-modal-overlay"
          onClick={handleCloseDatePicker}
          role="dialog"
          aria-modal="true"
          aria-labelledby="picksModalTitle"
        >
          <div 
            className="picks-date-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="picks-date-modal-header">
              <div className="picks-date-modal-villa-info">
                {activePickerVilla.img && (
                  <img 
                    src={activePickerVilla.img} 
                    alt={activePickerVilla.name} 
                    className="picks-date-modal-thumb"
                  />
                )}
                <div className="picks-date-modal-text-wrap">
                  <h3 id="picksModalTitle" className="picks-date-modal-title">
                    {activePickerVilla.name}
                  </h3>
                  <p className="picks-date-modal-subtitle">
                    <span className="picks-modal-tier-tag">{activePickerVilla.tier}</span>
                    <span>{activePickerVilla.area} · {activePickerVilla.beds} Bedrooms</span>
                  </p>
                </div>
              </div>

              <button 
                type="button" 
                className="picks-date-modal-close"
                onClick={handleCloseDatePicker}
                aria-label="Close date picker"
              >
                ✕
              </button>
            </div>

            {/* Body Kalender Airbnb 2-Bulan */}
            <div className="picks-date-modal-body">
              <AirbnbDatePopover 
                checkIn={tempCheckIn}
                checkOut={tempCheckOut}
                initialTarget={dateTargetMode}
                onDatesChange={handleDatesChange}
                onClose={handleCloseDatePicker}
                onDone={() => {
                  if (tempCheckIn && tempCheckOut) {
                    handleEnterVilla(activePickerVilla.id, tempCheckIn, tempCheckOut);
                  }
                }}
              />
            </div>

            {/* Banner Real-time Price Unlocked */}
            {tempCheckIn && tempCheckOut && modalNights > 0 && (
              <div className="picks-price-unlock-banner">
                <div className="picks-price-unlock-info">
                  <div className="picks-price-unlock-heading">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Price Unlocked for Your Stay
                  </div>
                  <p className="picks-price-unlock-details">
                    Rate: <strong>{formatBscMoney(activePickerVilla.price || 280, currency)}</strong> / night · Total: <strong>{formatBscMoney(modalTotalPrice, currency)}</strong> for {modalNights} night{modalNights > 1 ? 's' : ''}
                  </p>
                </div>

                <button
                  type="button"
                  className="picks-price-unlock-btn"
                  onClick={() => handleEnterVilla(activePickerVilla.id, tempCheckIn, tempCheckOut)}
                >
                  {isNavigatingToVillaId === activePickerVilla.id ? 'Opening villa...' : 'View Villa with This Price →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
