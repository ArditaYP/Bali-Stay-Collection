import React from 'react';

/**
 * Komponen BscTrustInfo
 * Menampilkan blok kredibilitas, transparansi pembayaran, panduan kedatangan,
 * tabel layanan tambahan (extras), serta banner tamu terverifikasi awal
 * persis sesuai dengan tata letak bsc-frontpage_1.html.
 * 
 * @param {Object} props
 * @param {Function} [props.onSeeVillasClick] - Callback saat tombol 'See available villas' diklik
 * @returns {React.JSX.Element} Elemen JSX trust & arrival info
 */
export default function BscTrustInfo({ onSeeVillasClick }) {
  /**
   * Menangani navigasi halus ke seksi katalog villa
   * @param {React.MouseEvent} e - Event klik
   * @returns {void}
   */
  const handleScrollToVillas = (e) => {
    e.preventDefault();
    if (onSeeVillasClick) {
      onSeeVillasClick();
    } else {
      const el = document.getElementById('villas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Safe & Accountable */}
      <section className="sec sec-safe" id="safe" style={{ background: '#fff', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Safe &amp; accountable</div>
            <h2>Licensed, insured and ready for emergencies</h2>
            <p>Show only what is true. Replace each placeholder with your real document or leave the line out.</p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                  <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
                </svg>
              </div>
              <h3>Licensed operator</h3>
              <p>
                [PT legal name] &middot; NIB [number]<br />
                Tourism business licence: [number]<br />
                <span className="ph-note">Link to your OSS/NIB extract if allowed.</span>
              </p>
            </div>

            <div className="card">
              <div className="ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                  <path d="M12 8v4l3 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3>Emergency protocol</h3>
              <ul>
                <li>On-call team reachable [hours]</li>
                <li>Nearest clinic: [name, X min]</li>
                <li>Nearest hospital: [name, X min]</li>
                <li>First-aid kit and smoke alarm in every villa</li>
              </ul>
            </div>

            <div className="card">
              <div className="ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                  <path d="M3 12h18M12 3v18" />
                </svg>
              </div>
              <h3>Pool &amp; child safety</h3>
              <ul>
                <li>Pool depth and fencing stated on every villa</li>
                <li>Pool fence or nanny on request, where available</li>
                <li>[Insurance details, if you have them]</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Booking & Payment */}
      <section className="sec sec-booking" id="booking">
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Booking &amp; payment</div>
            <h2>Simple, secure and transparent</h2>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <h3>Pay the way you prefer</h3>
              <p>[e.g. card, bank transfer, other]. You receive a written confirmation right after booking.</p>
              <div className="pay-logos">
                <span>[Visa]</span>
                <span>[Mastercard]</span>
                <span>[Bank transfer]</span>
              </div>
              <p className="ph-note">Show only methods you actually accept.</p>
            </div>

            <div className="card">
              <div className="ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                  <path d="M12 2v20M17 6H9.5a3 3 0 000 6h5a3 3 0 010 6H6" />
                </svg>
              </div>
              <h3>Reserve with a deposit</h3>
              <p>[e.g. 30% to confirm, balance due [X] days before arrival]. Security deposit: [amount], returned within [X] days after check-out.</p>
            </div>

            <div className="card">
              <div className="ico">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3>Price breakdown, no surprises</h3>
              <p>You see the nightly rate, [cleaning fee], [taxes] and the total before you pay. Extras like transfers or a chef are quoted separately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Arrival Guide & Extras */}
      <section className="sec sec-arrival" id="arrival">
        <div className="wrap grid2">
          <div className="card">
            <div className="eyebrow">Before you arrive</div>
            <h3 style={{ fontSize: '22px', margin: '6px 0 8px' }}>Your arrival guide</h3>
            <p>Everything in one place: how check-in works, house rules, WiFi, who to call and where to eat. We send it with your confirmation.</p>
            <ul>
              <li>Check-in from [time], check-out by [time]</li>
              <li>Staff greet you at the villa [or: self check-in steps]</li>
              <li>Emergency contacts and nearest clinic</li>
              <li>Local tips: cafés, spas and beaches with real distances</li>
            </ul>
            <a className="btn btn-ghost" href="#sample-guide" onClick={(e) => e.preventDefault()} style={{ marginTop: '14px' }}>
              Preview a sample guide
            </a>
          </div>

          <div className="card">
            <div className="eyebrow">Extras, fixed prices</div>
            <h3 style={{ fontSize: '22px', margin: '6px 0 8px' }}>Make your stay easier</h3>
            <table className="ext">
              <tbody>
                <tr>
                  <td>Airport transfer (up to [4] guests)</td>
                  <td>[$ amount]</td>
                </tr>
                <tr>
                  <td>Private chef dinner</td>
                  <td>from [$ amount]</td>
                </tr>
                <tr>
                  <td>In-villa massage (per person)</td>
                  <td>from [$ amount]</td>
                </tr>
                <tr>
                  <td>Scooter or car with driver</td>
                  <td>from [$ amount] / day</td>
                </tr>
                <tr>
                  <td>Baby cot / high chair</td>
                  <td>[free / $ amount]</td>
                </tr>
              </tbody>
            </table>
            <p className="ph-note">Fill in only services you really provide. Fixed prices published upfront build trust.</p>
          </div>
        </div>
      </section>

      {/* 4. Early Verified Guests Banner */}
      <section className="sec sec-early" id="early-guests">
        <div className="wrap">
          <div className="early">
            <div style={{ maxWidth: '620px' }}>
              <div className="eyebrow">Reviews</div>
              <h2 style={{ fontSize: '26px', margin: '6px 0 8px' }}>Be one of our first verified guests</h2>
              <p style={{ margin: 0, color: 'var(--ink-soft)' }}>
                We only show reviews from guests who stayed with us, so there are no ratings yet. Instead, you can read our inspection notes on every villa. Early guests get [early-guest perk, e.g. complimentary welcome dinner].
              </p>
            </div>
            <a className="btn btn-primary" href="#villas" onClick={handleScrollToVillas}>
              See available villas
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
