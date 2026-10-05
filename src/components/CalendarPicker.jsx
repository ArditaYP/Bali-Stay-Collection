import React, { useMemo, useState } from 'react';
import { checkDateRangeAvailability } from '../data/villasData';

/**
 * Komponen CalendarPicker
 * Menampilkan kalender ketersediaan interaktif untuk detail villa:
 * 1. Menyorot secara dinamis tanggal Check-in hingga Check-out sesuai jumlah malam.
 * 2. Menandai tanggal yang sudah dipesan (booked) dengan warna MERAH mencolok.
 * 3. Mencegah pemilihan rentang tanggal yang melewati tanggal yang sudah di-booking tamu lain.
 * 4. Mendukung pemilihan 2 langkah ala Airbnb (Klik 1: Check-in, Klik 2: Check-out).
 * 
 * @param {Object} props
 * @param {string} props.checkIn - Tanggal check-in saat ini (format: YYYY-MM-DD)
 * @param {string} props.checkOut - Tanggal check-out saat ini (format: YYYY-MM-DD)
 * @param {Function} props.onDatesChange - Callback ketika tanggal dipilih atau diubah
 * @param {number[]} props.bookedDays - Kumpulan angka tanggal dalam bulan yang sudah di-book tamu lain
 * @param {string} props.location - Nama lokasi villa (Seminyak, Ubud, dll)
 * @param {number} props.nights - Jumlah malam menginap
 * @returns {React.JSX.Element} Elemen JSX Kalender Ketersediaan
 */
export default function CalendarPicker({
  checkIn,
  checkOut,
  onDatesChange,
  bookedDays = [3, 4, 21, 22],
  location = 'Bali',
  nights = 2
}) {
  // Mode pemilihan: 'checkIn' (memilih awal) atau 'checkOut' (memilih akhir)
  const [selectMode, setSelectMode] = useState('checkIn');

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

  // Validasi ketersediaan rentang tanggal saat ini
  const rangeValidation = useMemo(() => {
    return checkDateRangeAvailability(checkIn, checkOut, bookedDays);
  }, [checkIn, checkOut, bookedDays]);

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
   * Menerapkan validasi ketat agar user TIDAK BISA memilih rentang yang melewati tanggal booked
   * @param {number} dayNumber - Angka tanggal yang diklik (1 - 31)
   * @returns {void}
   */
  const handleDateClick = (dayNumber) => {
    // 1. Blokir langsung jika tanggal yang diklik adalah tanggal booked
    if (bookedDays.includes(dayNumber)) {
      alert(`Tanggal ${dayNumber} ${monthNames[currentMonth]} sudah terisi (booked) oleh tamu lain. Silakan pilih tanggal yang tersedia (berwarna putih).`);
      return;
    }

    const monthStr = String(currentMonth + 1).padStart(2, '0');

    // Jika sedang dalam mode memilih Check-in, atau user mengklik tanggal sebelum check-in saat ini
    if (selectMode === 'checkIn' || dayNumber <= checkInDay) {
      const newCiDayStr = String(dayNumber).padStart(2, '0');
      const newCiStr = `${currentYear}-${monthStr}-${newCiDayStr}`;

      // Cari tanggal booked terdekat setelah hari check-in baru ini
      const nextBookedDay = bookedDays
        .filter(d => d > dayNumber)
        .sort((a, b) => a - b)[0];

      // Jika tanggal tepat setelahnya langsung booked (misal tgl 1 lalu tgl 2 booked)
      if (nextBookedDay === dayNumber + 1) {
        alert(`Perhatian: Tanggal ${nextBookedDay} ${monthNames[currentMonth]} sudah terisi (booked). Villa memerlukan minimal menginap 2 malam, sehingga tanggal ${dayNumber} tidak cukup untuk reservasi 2 malam. Silakan pilih tanggal setelah tanggal ${nextBookedDay}.`);
        return;
      }

      // Tentukan check-out awal yang aman (misal +2 hari, atau sebelum tanggal booked berikutnya)
      let safeNights = 2;
      if (nextBookedDay && dayNumber + safeNights > nextBookedDay) {
        safeNights = Math.max(1, nextBookedDay - dayNumber);
      }

      const safeCoDate = new Date(currentYear, currentMonth, dayNumber + safeNights);
      const safeCoMonthStr = String(safeCoDate.getMonth() + 1).padStart(2, '0');
      const safeCoDayStr = String(safeCoDate.getDate()).padStart(2, '0');
      const safeCoStr = `${safeCoDate.getFullYear()}-${safeCoMonthStr}-${safeCoDayStr}`;

      if (typeof onDatesChange === 'function') {
        onDatesChange(newCiStr, safeCoStr);
      }

      // Alihkan ke mode menunggu klik check-out
      setSelectMode('checkOut');
      return;
    }

    // Jika sedang dalam mode memilih Check-out (user mengklik tanggal setelah check-in)
    if (selectMode === 'checkOut' && dayNumber > checkInDay) {
      // PERIKSA APAKAH ADA TANGGAL BOOKED DI ANTARA CHECK-IN DAN CHECK-OUT YANG DIKLIK!
      // Malam menginap adalah dari checkInDay sampai (dayNumber - 1)
      const conflictDays = bookedDays
        .filter(d => d >= checkInDay && d < dayNumber)
        .sort((a, b) => a - b);

      if (conflictDays.length > 0) {
        alert(`❌ Tidak dapat memesan rentang ini!\n\nTanggal ${conflictDays.join(', ')} ${monthNames[currentMonth]} sudah terisi (booked) oleh tamu lain.\n\nSilakan pilih tanggal Check-out sebelum tanggal ${conflictDays[0]}.`);
        return;
      }

      // Jika aman dan tidak ada tanggal yang bentrok
      const newCoDayStr = String(dayNumber).padStart(2, '0');
      const newCoStr = `${currentYear}-${monthStr}-${newCoDayStr}`;

      if (typeof onDatesChange === 'function') {
        onDatesChange(checkIn, newCoStr);
      }

      // Selesai memilih rentang, kembali ke mode siap check-in baru jika diklik lagi
      setSelectMode('checkIn');
    }
  };

  return (
    <div className="calendar-wrapper">
      {/* Header Blok Kalender */}
      <div className="calendar-block">
        <div>
          <h2>{nights} {nights === 1 ? 'night' : 'nights'} in {location}</h2>
          <p className="cal-note">
            {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
          </p>
        </div>

        {/* Petunjuk Langkah Pemilihan */}
        <div className="cal-step-indicator">
          {selectMode === 'checkOut' ? (
            <span className="cal-step-badge step-checkout">👉 Klik tanggal untuk <strong>Check-out</strong></span>
          ) : (
            <span className="cal-step-badge step-checkin">Klik tanggal untuk <strong>Check-in</strong></span>
          )}
        </div>
      </div>

      {/* Banner Peringatan Jika Rentang Tanggal Saat Ini Bentrok dengan Tanggal Booked */}
      {!rangeValidation.isAvailable && (
        <div className="cal-conflict-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <strong>Rentang tanggal tidak tersedia:</strong> {rangeValidation.message}
          </div>
        </div>
      )}

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
          const isCheckIn = dayNumber === checkInDay;
          const isCheckOut = dayNumber === checkOutDay;
          const isSelected = isCheckIn || isCheckOut;
          const isInRange = dayNumber > checkInDay && dayNumber < checkOutDay;

          // Menentukan kelas CSS yang diterapkan
          let dayClass = 'day available';
          let titleText = `Pilih tanggal ${dayNumber} ${monthNames[currentMonth]}`;

          // PRIORITAS 1: Tanggal yang sudah di-book SELALU MERAH (tidak boleh tertimpa in-range)
          if (isBooked) {
            dayClass = 'day booked';
            titleText = `Tanggal ${dayNumber} sudah terisi (booked) - tidak tersedia`;
          } else if (isSelected) {
            dayClass = 'day selected';
            titleText = `${isCheckIn ? 'Check-in' : 'Check-out'}: ${dayNumber} ${monthNames[currentMonth]}`;
          } else if (isInRange) {
            // Jika ada tanggal booked di dalam rentang, tandai in-range sebagai konflik
            if (!rangeValidation.isAvailable) {
              dayClass = 'day in-range-conflict';
              titleText = `Rentang tidak valid (melewati tanggal booked)`;
            } else {
              dayClass = 'day in-range';
              titleText = `Menginap: ${dayNumber} ${monthNames[currentMonth]}`;
            }
          }

          return (
            <div
              key={dayNumber}
              className={dayClass}
              onClick={() => handleDateClick(dayNumber)}
              title={titleText}
            >
              {dayNumber}
              {isBooked && <span className="booked-cross">&times;</span>}
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
          <span style={{ color: '#DC2626', fontWeight: 600 }}>Already booked (tidak bisa dipilih)</span>
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
