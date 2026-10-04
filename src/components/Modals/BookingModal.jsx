import React, { useState, useEffect } from 'react';
import { formatUSD } from '../../data/villasData';

/**
 * Komponen BookingModal
 * Menangani alur formulir reservasi (checkout flow) villa secara interaktif:
 * 1. Menampilkan ringkasan tanggal, tamu, dan rincian biaya (malam x tarif + cleaning fee)
 * 2. Mengambil input identitas tamu (Nama lengkap, Email, No. WhatsApp, Permintaan Khusus)
 * 3. Memilih simulasi metode pembayaran (Kartu Kredit, Transfer Bank, E-Wallet)
 * 4. Menampilkan layar konfirmasi reservasi sukses dengan kode booking unik
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Status apakah modal sedang dibuka
 * @param {Function} props.onClose - Fungsi callback untuk menutup modal
 * @param {Object} props.villa - Objek data villa yang dipesan
 * @param {string} props.checkIn - Tanggal check-in
 * @param {string} props.checkOut - Tanggal check-out
 * @param {number} props.nights - Jumlah malam menginap
 * @param {number} props.guests - Jumlah tamu yang menginap
 * @param {Function} props.onBookingSuccess - Callback saat pemesanan berhasil disimpan
 */
export default function BookingModal({
  isOpen,
  onClose,
  villa,
  checkIn,
  checkOut,
  nights,
  guests,
  onBookingSuccess
}) {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Mengatur scroll lock pada body ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      setBookingConfirmed(null);
      setIsSubmitting(false);
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen || !villa) return null;

  // Kalkulasi total biaya
  const subtotal = villa.price * (nights || 1);
  const cleaningFee = villa.cleaningFee || 35;
  const totalAmount = subtotal + cleaningFee;

  /**
   * Menangani pengiriman form reservasi
   * Menghasilkan ID booking acak, memicu loading simulasi, dan menampilkan konfirmasi sukses
   * @param {React.FormEvent} e - Event submit form
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      alert('Silakan lengkapi nama, email, dan nomor WhatsApp Anda.');
      return;
    }

    setIsSubmitting(true);

    // Simulasi proses transaksi ke server (800ms)
    setTimeout(() => {
      const generatedId = `BSC-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingRecord = {
        bookingId: generatedId,
        villaId: villa.id,
        villaName: villa.name,
        location: villa.location,
        checkIn,
        checkOut,
        nights,
        guests,
        totalAmount,
        guestName,
        guestEmail,
        guestPhone,
        paymentMethod,
        createdAt: new Date().toISOString()
      };

      setBookingConfirmed(bookingRecord);
      setIsSubmitting(false);

      if (typeof onBookingSuccess === 'function') {
        onBookingSuccess(bookingRecord);
      }
    }, 800);
  };

  /**
   * Menutup modal dan mereset form
   */
  const handleCloseAndReset = () => {
    setBookingConfirmed(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCloseAndReset} role="dialog" aria-modal="true">
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={handleCloseAndReset}
          aria-label="Tutup form reservasi"
        >
          ✕
        </button>

        {!bookingConfirmed ? (
          /* TAHAP 1: Form Reservasi & Konfirmasi Data */
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span className="badge" style={{ marginBottom: '10px' }}>Direct Reservation</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px' }}>
                Complete Your Booking
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--muted2)', margin: 0 }}>
                {villa.name} &middot; {villa.location}, Bali
              </p>
            </div>

            {/* Kotak Ringkasan Tanggal & Tamu */}
            <div style={{
              background: 'var(--bg-warm)',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '10px',
              marginBottom: '20px',
              fontSize: '13px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Check-in</span>
                <b>{checkIn}</b>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Check-out</span>
                <b>{checkOut}</b>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Stay</span>
                <b>{nights} nights, {guests} guests</b>
              </div>
            </div>

            <form onSubmit={handleFormSubmit}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>
                Guest Information
              </h3>

              {/* Input Nama Lengkap */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    fontSize: '14px'
                  }}
                />
              </div>

              {/* Input Email & Telepon */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                    WhatsApp / Phone *
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+62 812 3456 7890"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              {/* Permintaan Khusus */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, marginBottom: '4px' }}>
                  Special Requests (Optional)
                </label>
                <textarea 
                  rows={2}
                  placeholder="Late check-in, airport pickup, dietary preferences…"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    fontSize: '13.5px',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Pilihan Metode Pembayaran */}
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>
                Payment Method (Simulation)
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '8px',
                marginBottom: '20px'
              }}>
                {[
                  { id: 'card', label: 'Credit Card', icon: '💳' },
                  { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                  { id: 'ewallet', label: 'E-Wallet', icon: '📱' }
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: paymentMethod === pm.id ? '2px solid var(--accent)' : '1px solid var(--line)',
                      background: paymentMethod === pm.id ? 'var(--accent-light)' : '#fff',
                      cursor: 'pointer',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{pm.icon}</span>
                    {pm.label}
                  </button>
                ))}
              </div>

              {/* Rincian Harga */}
              <div className="price-breakdown" style={{ marginBottom: '20px' }}>
                <div className="price-row">
                  <span>{formatUSD(villa.price)} x {nights} nights</span>
                  <span>{formatUSD(subtotal)}</span>
                </div>
                <div className="price-row">
                  <span>Cleaning &amp; preparation fee</span>
                  <span>{formatUSD(cleaningFee)}</span>
                </div>
                <div className="price-row">
                  <span>Direct booking service fee</span>
                  <span style={{ color: '#2F6B3A', fontWeight: 700 }}>$0 (Free)</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span style={{ fontSize: '20px', color: 'var(--accent)' }}>{formatUSD(totalAmount)}</span>
                </div>
              </div>

              {/* Tombol Konfirmasi Reservasi */}
              <button 
                type="submit" 
                className="reserve-btn btn-primary"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Confirming Reservation…' : `Confirm & Reserve (${formatUSD(totalAmount)})`}
              </button>
              <p className="no-charge-note">Instant confirmation with free reschedule up to 7 days prior.</p>
            </form>
          </div>
        ) : (
          /* TAHAP 2: Layar Sukses Konfirmasi Reservasi */
          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#EFF6EE',
              color: '#2F6B3A',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '16px'
            }}>
              ✓
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>
              Booking Confirmed!
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--muted2)', margin: '0 auto 20px', maxWidth: '420px' }}>
              Terima kasih, <b>{bookingConfirmed.guestName}</b>! Reservasi villa Anda di <b>{bookingConfirmed.villaName}</b> telah berhasil dikonfirmasi.
            </p>

            {/* Kartu Informasi Konfirmasi */}
            <div style={{
              background: 'var(--bg-warm)',
              borderRadius: '14px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '24px',
              fontSize: '13.5px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>Booking Reference:</span>
                <b style={{ color: 'var(--accent)', letterSpacing: '0.04em' }}>{bookingConfirmed.bookingId}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>Dates:</span>
                <b>{bookingConfirmed.checkIn} — {bookingConfirmed.checkOut} ({bookingConfirmed.nights} nights)</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>Guests:</span>
                <b>{bookingConfirmed.guests} guests</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>Sent confirmation to:</span>
                <b>{bookingConfirmed.guestEmail}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
                <span style={{ fontWeight: 700 }}>Total Paid (Simulation):</span>
                <b style={{ fontSize: '16px', color: 'var(--ink)' }}>{formatUSD(bookingConfirmed.totalAmount)}</b>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-primary" 
              onClick={handleCloseAndReset}
              style={{ padding: '12px 28px', borderRadius: '10px', fontSize: '14.5px', width: '100%' }}
            >
              Done &amp; Return to Villa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
