import React, { useState, useMemo } from 'react';

/**
 * Parsing string YYYY-MM-DD ke objek Date lokal tanpa pergeseran timezone (UTC bug-free)
 * @param {string} str - String tanggal format YYYY-MM-DD
 * @returns {Date|null} Objek Date atau null jika format tidak valid
 */
function parseLocalDate(str) {
  if (!str || typeof str !== 'string') return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month, day);
}

/**
 * Format objek Date ke string YYYY-MM-DD lokal
 * @param {Date} date - Objek Date
 * @returns {string} String format YYYY-MM-DD
 */
function toLocalDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Komponen AirbnbDatePopover
 * Merender popover kalender 2 bulan bersebelahan (desktop) dan responsif 1 bulan (mobile)
 * dengan pengalaman pengguna interaktif khas Airbnb:
 * - Pemilihan rentang tanggal Check-in dan Check-out 2 langkah
 * - Highlight visual rentang tanggal menginap (in-range & endpoint pills)
 * - Preview visual saat mengarahkan kursor (hover preview)
 * - Pintasan durasi menginap cepat (+2, +3, +5, +7 malam)
 * - Navigasi bulan maju/mundur dengan proteksi tanggal lampau
 * 
 * @param {Object} props
 * @param {string} [props.checkIn=''] - Tanggal check-in aktif (YYYY-MM-DD)
 * @param {string} [props.checkOut=''] - Tanggal check-out aktif (YYYY-MM-DD)
 * @param {'checkIn'|'checkOut'} [props.initialTarget='checkIn'] - Fokus awal pemilihan
 * @param {Function} props.onDatesChange - Callback saat checkIn atau checkOut diperbarui (newCi, newCo)
 * @param {Function} props.onClose - Callback saat popover ditutup
 * @param {Function} [props.onDone] - Callback saat selesai memilih dan melanjutkan (misal ke Who)
 * @returns {React.JSX.Element} Elemen JSX Popover Kalender
 */
export default function AirbnbDatePopover({
  checkIn = '',
  checkOut = '',
  initialTarget = 'checkIn',
  onDatesChange,
  onClose,
  onDone
}) {
  // Target yang sedang dipilih saat ini: 'checkIn' atau 'checkOut'
  const [targetMode, setTargetMode] = useState(initialTarget || 'checkIn');

  // Tanggal hari ini (waktu 00:00:00 lokal) untuk disable tanggal lampau
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const todayStr = useMemo(() => toLocalDateString(today), [today]);

  // Bulan awal yang ditampilkan pada kalender kiri
  const [viewDate, setViewDate] = useState(() => {
    const ciDate = parseLocalDate(checkIn);
    if (ciDate && ciDate >= today) {
      return new Date(ciDate.getFullYear(), ciDate.getMonth(), 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // State tanggal yang sedang di-hover pengguna untuk preview rentang
  const [hoveredDate, setHoveredDate] = useState(null);

  // Perhitungan bulan 1 (kiri) dan bulan 2 (kanan)
  const month1Year = viewDate.getFullYear();
  const month1Month = viewDate.getMonth();

  const month2Date = useMemo(() => {
    return new Date(month1Year, month1Month + 1, 1);
  }, [month1Year, month1Month]);

  const month2Year = month2Date.getFullYear();
  const month2Month = month2Date.getMonth();

  // Nama bulan dalam bahasa Inggris
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNamesShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Cek apakah navigasi mundur (prev) diperbolehkan (tidak boleh sebelum bulan hari ini)
  const canGoPrev = useMemo(() => {
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const viewMonthStart = new Date(month1Year, month1Month, 1);
    return viewMonthStart > currentMonthStart;
  }, [today, month1Year, month1Month]);

  /**
   * Menggeser kalender 1 bulan ke belakang
   * @returns {void}
   */
  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setViewDate(new Date(month1Year, month1Month - 1, 1));
  };

  /**
   * Menggeser kalender 1 bulan ke depan
   * @returns {void}
   */
  const handleNextMonth = () => {
    setViewDate(new Date(month1Year, month1Month + 1, 1));
  };

  /**
   * Menghasilkan data hari untuk satu bulan tertentu
   * @param {number} year - Tahun
   * @param {number} month - Index bulan (0-11)
   * @returns {Array<Object>} Daftar hari dengan informasi padding dan tanggal
   */
  const generateMonthDays = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Minggu
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Hari padding sebelum tanggal 1
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ isPadding: true, key: `pad-${year}-${month}-${i}` });
    }

    // Hari dalam bulan
    for (let d = 1; d <= totalDays; d++) {
      const dObj = new Date(year, month, d);
      const isoStr = toLocalDateString(dObj);
      const isPast = isoStr < todayStr;
      days.push({
        isPadding: false,
        dayNum: d,
        isoStr,
        isPast,
        key: `day-${isoStr}`
      });
    }

    return days;
  };

  const month1Days = useMemo(() => generateMonthDays(month1Year, month1Month), [month1Year, month1Month, todayStr]);
  const month2Days = useMemo(() => generateMonthDays(month2Year, month2Month), [month2Year, month2Month, todayStr]);

  /**
   * Menangani klik pada salah satu tanggal di kalender
   * Mengikuti alur interaksi standar Airbnb:
   * @param {string} isoStr - Tanggal yang diklik (YYYY-MM-DD)
   * @param {boolean} isPast - Apakah tanggal sudah lampau
   * @returns {void}
   */
  const handleDateClick = (isoStr, isPast) => {
    if (isPast) return;

    if (targetMode === 'checkIn') {
      // Menetapkan check-in baru
      let newCo = checkOut;
      if (checkOut && isoStr >= checkOut) {
        newCo = '';
      }
      onDatesChange(isoStr, newCo);
      setTargetMode('checkOut');
      return;
    }

    // Sedang dalam mode memilih check-out
    if (targetMode === 'checkOut') {
      if (!checkIn) {
        // Jika belum ada check-in, set tanggal ini sebagai check-in
        onDatesChange(isoStr, '');
        setTargetMode('checkOut');
        return;
      }

      if (isoStr > checkIn) {
        // Rentang valid terpilih
        onDatesChange(checkIn, isoStr);
        setHoveredDate(null);
        // Tetap di popover atau siap jika ingin ganti lagi
        return;
      }

      // Jika klik tanggal sebelum atau sama dengan check-in yang sudah ada,
      // jadikan tanggal ini sebagai check-in baru
      onDatesChange(isoStr, '');
      setTargetMode('checkOut');
    }
  };

  /**
   * Menghitung durasi malam antara dua tanggal format YYYY-MM-DD
   * @param {string} ci - Check-in
   * @param {string} co - Check-out
   * @returns {number} Jumlah malam
   */
  const calculateNightsCount = (ci, co) => {
    if (!ci || !co) return 0;
    const a = parseLocalDate(ci);
    const b = parseLocalDate(co);
    if (!a || !b) return 0;
    const diff = b.getTime() - a.getTime();
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
  };

  const selectedNights = calculateNightsCount(checkIn, checkOut);

  /**
   * Menerapkan pintasan durasi cepat (misal +3 malam, +7 malam)
   * @param {number} nights - Jumlah malam yang ingin ditambahkan
   * @returns {void}
   */
  const handleQuickDuration = (nights) => {
    const baseDate = checkIn ? parseLocalDate(checkIn) : new Date(today);
    const safeBaseDate = baseDate < today ? new Date(today) : baseDate;
    const newCiStr = toLocalDateString(safeBaseDate);

    const coDate = new Date(safeBaseDate);
    coDate.setDate(coDate.getDate() + nights);
    const newCoStr = toLocalDateString(coDate);

    onDatesChange(newCiStr, newCoStr);
    setTargetMode('checkOut');
  };

  /**
   * Mengosongkan tanggal terpilih (Reset)
   * @returns {void}
   */
  const handleClearDates = () => {
    onDatesChange('', '');
    setTargetMode('checkIn');
    setHoveredDate(null);
  };

  /**
   * Format tanggal untuk label tab ringkas
   * @param {string} isoStr - Tanggal format YYYY-MM-DD
   * @returns {string} String terformat (contoh: "14 Oct 2026")
   */
  const formatTabDate = (isoStr) => {
    const d = parseLocalDate(isoStr);
    if (!d) return 'Add date';
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  /**
   * Memeriksa status dan styling dari suatu sel tanggal
   * @param {string} isoStr - Tanggal yang dicek
   * @returns {Object} Kumpulan flag status tanggal
   */
  const getDateStatus = (isoStr) => {
    const isCi = isoStr === checkIn;
    const isCo = isoStr === checkOut;

    // Rentang yang sudah terpilih pasti
    const isInSelectedRange = Boolean(checkIn && checkOut && isoStr > checkIn && isoStr < checkOut);

    // Rentang preview saat hover ketika checkIn sudah ada tapi checkOut belum
    const isInHoverRange = Boolean(
      checkIn && 
      !checkOut && 
      hoveredDate && 
      hoveredDate > checkIn && 
      isoStr > checkIn && 
      isoStr <= hoveredDate
    );

    const isHoverEnd = Boolean(
      checkIn && 
      !checkOut && 
      hoveredDate && 
      isoStr === hoveredDate && 
      hoveredDate > checkIn
    );

    return {
      isCi,
      isCo,
      isInRange: isInSelectedRange || isInHoverRange,
      isRangeStart: isCi && (Boolean(checkOut) || (hoveredDate && hoveredDate > checkIn)),
      isRangeEnd: isCo || isHoverEnd
    };
  };

  return (
    <div className="airbnb-popover dates-popover" onClick={(e) => e.stopPropagation()}>
      {/* 1. HEADER TAB PEMILIHAN CHECK-IN & CHECK-OUT */}
      <div className="dates-popover-tabs">
        <button
          type="button"
          className={`date-tab-btn ${targetMode === 'checkIn' ? 'active' : ''}`}
          onClick={() => setTargetMode('checkIn')}
        >
          <span className="tab-label">Check-in</span>
          <span className={`tab-value ${!checkIn ? 'placeholder' : ''}`}>
            {formatTabDate(checkIn)}
          </span>
        </button>

        <div className="date-tab-arrow">→</div>

        <button
          type="button"
          className={`date-tab-btn ${targetMode === 'checkOut' ? 'active' : ''}`}
          onClick={() => setTargetMode('checkOut')}
        >
          <span className="tab-label">Check-out</span>
          <span className={`tab-value ${!checkOut ? 'placeholder' : ''}`}>
            {formatTabDate(checkOut)}
          </span>
        </button>
      </div>

      {/* 2. TOMBOL PINTASAN DURASI CEPAT */}
      <div className="dates-quick-pills">
        <span className="quick-pill-label">Quick select:</span>
        <button
          type="button"
          className={`quick-pill-btn ${selectedNights === 2 ? 'active' : ''}`}
          onClick={() => handleQuickDuration(2)}
        >
          2 nights (Weekend)
        </button>
        <button
          type="button"
          className={`quick-pill-btn ${selectedNights === 3 ? 'active' : ''}`}
          onClick={() => handleQuickDuration(3)}
        >
          3 nights
        </button>
        <button
          type="button"
          className={`quick-pill-btn ${selectedNights === 5 ? 'active' : ''}`}
          onClick={() => handleQuickDuration(5)}
        >
          5 nights
        </button>
        <button
          type="button"
          className={`quick-pill-btn ${selectedNights === 7 ? 'active' : ''}`}
          onClick={() => handleQuickDuration(7)}
        >
          7 nights (1 week)
        </button>
      </div>

      {/* 3. DUA BULAN KALENDER BERDAMPINGAN */}
      <div className="dates-calendars-container">
        {/* Tombol Navigasi Bulan Kiri */}
        <button
          type="button"
          className="cal-nav-btn cal-nav-prev"
          disabled={!canGoPrev}
          onClick={handlePrevMonth}
          aria-label="Previous month"
        >
          ‹
        </button>

        {/* Tombol Navigasi Bulan Kanan */}
        <button
          type="button"
          className="cal-nav-btn cal-nav-next"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          ›
        </button>

        {/* BULAN 1 (KIRI) */}
        <div className="calendar-month-col">
          <div className="month-col-title">
            {monthNames[month1Month]} {month1Year}
          </div>
          <div className="month-weekdays-grid">
            {dayNamesShort.map((day) => (
              <span key={`w1-${day}`} className="weekday-name">{day}</span>
            ))}
          </div>
          <div className="month-days-grid">
            {month1Days.map((item) => {
              if (item.isPadding) {
                return <div key={item.key} className="date-cell-empty" />;
              }

              const status = getDateStatus(item.isoStr);
              return (
                <div
                  key={item.key}
                  className={`date-cell-wrapper ${status.isInRange ? 'in-range' : ''} ${status.isRangeStart ? 'range-start' : ''} ${status.isRangeEnd ? 'range-end' : ''}`}
                  onMouseEnter={() => {
                    if (checkIn && !checkOut) {
                      setHoveredDate(item.isoStr);
                    }
                  }}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <button
                    type="button"
                    className={`date-cell-btn ${item.isPast ? 'is-past' : ''} ${status.isCi ? 'is-checkin' : ''} ${status.isCo ? 'is-checkout' : ''}`}
                    disabled={item.isPast}
                    onClick={() => handleDateClick(item.isoStr, item.isPast)}
                  >
                    {item.dayNum}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* BULAN 2 (KANAN) */}
        <div className="calendar-month-col second-month">
          <div className="month-col-title">
            {monthNames[month2Month]} {month2Year}
          </div>
          <div className="month-weekdays-grid">
            {dayNamesShort.map((day) => (
              <span key={`w2-${day}`} className="weekday-name">{day}</span>
            ))}
          </div>
          <div className="month-days-grid">
            {month2Days.map((item) => {
              if (item.isPadding) {
                return <div key={item.key} className="date-cell-empty" />;
              }

              const status = getDateStatus(item.isoStr);
              return (
                <div
                  key={item.key}
                  className={`date-cell-wrapper ${status.isInRange ? 'in-range' : ''} ${status.isRangeStart ? 'range-start' : ''} ${status.isRangeEnd ? 'range-end' : ''}`}
                  onMouseEnter={() => {
                    if (checkIn && !checkOut) {
                      setHoveredDate(item.isoStr);
                    }
                  }}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <button
                    type="button"
                    className={`date-cell-btn ${item.isPast ? 'is-past' : ''} ${status.isCi ? 'is-checkin' : ''} ${status.isCo ? 'is-checkout' : ''}`}
                    disabled={item.isPast}
                    onClick={() => handleDateClick(item.isoStr, item.isPast)}
                  >
                    {item.dayNum}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. FOOTER POPOVER TANGGAL */}
      <div className="dates-popover-footer">
        <div className="dates-summary-info">
          {checkIn && checkOut ? (
            <span>
              <strong>{selectedNights} {selectedNights === 1 ? 'night' : 'nights'}</strong> in Bali
            </span>
          ) : checkIn ? (
            <span>Check-in: <strong>{formatTabDate(checkIn)}</strong> · Choose check-out</span>
          ) : (
            <span>Select check-in and check-out dates</span>
          )}
        </div>

        <div className="dates-footer-actions">
          {(checkIn || checkOut) && (
            <button
              type="button"
              className="dates-clear-btn"
              onClick={handleClearDates}
            >
              Clear dates
            </button>
          )}

          <button
            type="button"
            className="dates-done-btn"
            onClick={() => {
              if (typeof onDone === 'function' && checkIn && checkOut) {
                onDone();
              } else if (typeof onClose === 'function') {
                onClose();
              }
            }}
          >
            {checkIn && checkOut ? 'Next: Guests →' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
