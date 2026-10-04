import React from 'react';

/**
 * Komponen WhyBookDirect
 * Menampilkan section edukasi nilai tambah (value proposition) mengapa tamu
 * lebih diuntungkan memesan langsung melalui platform Bali Stay Collection.
 */
export default function WhyBookDirect() {
  return (
    <section className="why" id="why-section">
      <div className="why-inner">
        <h2>Why book direct with Bali Stay Collection?</h2>
        <p className="why-sub">
          Unlike OTA aggregators — every villa is managed and verified by us directly.
        </p>

        <div className="why-grid">
          {/* Nilai 1: Tanpa Biaya Layanan Tersembunyi */}
          <div className="why-card">
            <div className="why-icon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
              </svg>
            </div>
            <div className="why-title">No service fees</div>
            <div className="why-desc">The price you see is the final price — no hidden platform fees added later.</div>
          </div>

          {/* Nilai 2: Dikelola Tim Lokal Satu Pintu */}
          <div className="why-card">
            <div className="why-icon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>
            <div className="why-title">Managed by one team</div>
            <div className="why-desc">Not a third-party aggregator — our team knows every villa personally.</div>
          </div>

          {/* Nilai 3: Respon Cepat 24/7 di Bali */}
          <div className="why-card">
            <div className="why-icon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <div className="why-title">24/7 fast response</div>
            <div className="why-desc">Questions and issues during your stay are answered by our local team, any time.</div>
          </div>

          {/* Nilai 4: Keamanan Pembayaran & Kebijakan Reschedule */}
          <div className="why-card">
            <div className="why-icon">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
            </div>
            <div className="why-title">Secure payment</div>
            <div className="why-desc">Your deposit is held safely until check-in is confirmed, with a clear reschedule policy.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
