import React, { useMemo } from 'react';

/**
 * Komponen CalendarPicker
 * Menampilkan kalender ketersediaan interaktif untuk detail villa:
 * 1. Menyorot secara dinamis tanggal Check-in hingga Check-out sesuai jumlah malam (misal 2 malam, 6 malam).
 * 2. Menandai tanggal yang sudah dipesan (booked) dengan warna MERAH mencolok sesuai permintaan pengguna.
 * 3. Memungkinkan pemilihan tanggal langsung dengan mengklik hari pada kalender.
 * 
 * @param {Object} props
 * @param {string} props.checkIn - Tanggal check-in saat ini (format: YYYY-MM-DD)
 * @param {string} props.checkOut - Tanggal check-out saat ini (format: YYYY-MM-DD)
 * @param {Function} props.onDatesChange - Callback ketika tanggal dipilih atau diubah
 * @param {number[]} props.bookedDays - Kumpulan angka tanggal dalam bulan yang sudah di-book tamu lain
 * @param {string} props.location - Nama lokasi villa (Seminyak, Ubud, dll)
 * @param {number} props.nights - Jumlah malam menginap
 */
export default function CalendarPicker({
  checkIn,
  checkOut,
  onDatesChange,
  bookedDays = [3, 4, 21, 22],
  location = 'Bali',
  nights = 2
}) {
  // Mengekstrak informasi tahun, bulan, dan hari dari tanggal check-in saat ini
  const { currentYear, currentMonth, checkInDay, checkOutDay } = useMemo(() => {
    const ciDate = checkIn ? new Date(checkIn) : new Date(2026, 9, 12);
    const coDate = checkOut ? new Date(checkOut) : new Date(2026, 9, 14);

    return {
      currentYear: ciDate.getFullYear(),
      currentMonth: ciDate.getMonth(), // 0-indexed (9 = Oktober)
      checkInDay: ciDate.getDate(),
      checkOutDay: coDate.getMonth() === ciDate.getMonth() ? coDate.getDate() : 999
    };
  }, [checkIn, checkOut]);

  // Nama-nama bulan dalam bahasa Inggris
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Kalkulasi hari pertama dalam minggu dan jumlah hari dalam bulan aktif
  const { paddingDays, totalDaysInMonth } = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Minggu (Su)
    const daysCount = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total hari dalam bulan
    return {
      paddingDays: firstDayIndex,
      totalDaysInMonth: daysCount
    };
  }, [currentYear, currentMonth]);

  /**
   * Format tanggal untuk teks ramah pengguna (contoh: "Oct 12, 2026")
   * @param {string} dateStr - String tanggal dalam format YYYY-MM-DD
   * @returns {string} String tanggal terformat
   */
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  /**
   * Menangani klik pada salah satu tanggal di kalender
   * Jika user mengklik tanggal yang belum di-book:
   * - Tanggal tersebut dijadikan Check-in baru
   * - Check-out otomatis diatur +2 hari (minimal menginap 2 malam) atau dipertahankan selisih malamnya
   * @param {number} dayNumber - Angka tanggal yang diklik (1 - 31)
   */
  const handleDateClick = (dayNumber) => {
    // Abaikan jika tanggal sudah di-booking (berwarna merah)
    if (bookedDays.includes(dayNumber)) {
      alert(`Tanggal ${dayNumber} ${monthNames[currentMonth]} sudah terisi (booked). Silakan pilih tanggal lain yang tersedia.`);
      return;
    }

    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(dayNumber).padStart(2, '0');
    const newCheckInStr = `${currentYear}-${monthStr}-${dayStr}`;

    // Menghitung tanggal check-out berdasarkan jumlah malam saat ini (minimal 2 malam)
    const stayNights = Math.max(nights || 2, 2);
    const newCoDate = new Date(currentYear, currentMonth, dayNumber + stayNights);
    const coMonthStr = String(newCoDate.getMonth() + 1).padStart(2, '0');
    const coDayStr = String(newCoDate.getDate()).padStart(2, '0');
    const newCheckOutStr = `${newCoDate.getFullYear()}-${coMonthStr}-${coDayStr}`;

    if (typeof onDatesChange === 'function') {
      onDatesChange(newCheckInStr, newCheckOutStr);
    }
  };

  return (
    <div>
      {/* Header Blok Kalender */}
      <div className="calendar-block">
        <div>
          <h2>{nights} {nights === 1 ? 'night' : 'nights'} in {location}</h2>
          <p className="cal-note">
            {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
          </p>
        </div>
      </div>

      {/* Grid Kalender Bulanan */}
      <div className="mini-cal">
        {/* Header Nama Hari */}
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>

        {/* Kotak Kosong Padding Hari Sebelum Tanggal 1 */}
        {Array.from({ length: paddingDays }).map((_, i) => (
          <div key={`pad-${i}`} className="day" style={{ cursor: 'default' }}></div>
        ))}

        {/* Angka Tanggal dalam Bulan */}
        {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
          const dayNumber = idx + 1;
          const isBooked = bookedDays.includes(dayNumber);
          const isSelected = dayNumber === checkInDay || dayNumber === checkOutDay;
          const isInRange = dayNumber > checkInDay && dayNumber < checkOutDay;

          // Menentukan kelas CSS yang diterapkan
          let dayClass = 'day available';
          let titleText = `Pilih tanggal ${dayNumber} ${monthNames[currentMonth]}`;

          if (isBooked) {
            dayClass = 'day booked';
            titleText = `Tanggal ${dayNumber} sudah ter-booking`;
          } else if (isSelected) {
            dayClass = 'day selected';
            titleText = `${dayNumber === checkInDay ? 'Check-in' : 'Check-out'}: ${dayNumber} ${monthNames[currentMonth]}`;
          } else if (isInRange) {
            dayClass = 'day in-range';
            titleText = `Menginap: ${dayNumber} ${monthNames[currentMonth]}`;
          }

          return (
            <div
              key={dayNumber}
              className={dayClass}
              onClick={() => handleDateClick(dayNumber)}
              title={titleText}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>

      {/* Legenda Keterangan Warna Kalender */}
      <div className="cal-legend">
        <div className="cal-legend-item">
          <span className="cal-legend-dot selected"></span>
          <span>Selected stay ({nights} {nights === 1 ? 'night' : 'nights'})</span>
        </div>
        <div className="cal-legend-item">
          <span className="cal-legend-dot booked"></span>
          <span style={{ color: '#DC2626', fontWeight: 600 }}>Already booked</span>
        </div>
        <div className="cal-legend-item">
          <span className="cal-legend-dot available"></span>
          <span>Available</span>
        </div>
      </div>

      <p className="cal-note" style={{ marginTop: '14px' }}>
        Minimum stay: 2 nights &middot; Free reschedule up to 7 days before check-in
      </p>
    </div>
  );
}
