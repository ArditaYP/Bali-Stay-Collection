import React from 'react';
import { CONFIG } from '../../data/bscVillasData';

/**
 * Komponen BscFooter
 * Menampilkan footer resmi Bali Stay Collection sesuai referensi footer.jpeg:
 * - Pre-footer callout: "Not sure which villa fits? Tell us how you want Bali to feel."
 * - Kolom 1: Brand BALI STAY COLLECTION · BY ANAKOSA, deskripsi & kontak Bali
 * - Kolom 2: STAY (All villas, Destinations, Experiences, Find by mood, Villa levels, Video tour)
 * - Kolom 3: BOOK WITH CONFIDENCE (How we verify, FAQ, Our local team, Cancellation terms, Terms & Privacy)
 * - Kolom 4: A BRAND OF ANAKOSA (Own a villa in Bali? Talk to ANAKOSA)
 * - Bottom bar: Hak cipta 2026 ANAKOSA, tautan media sosial & Maps
 * - Floating WhatsApp badge di kanan bawah (Chat with us)
 * 
 * @param {Object} props
 * @param {Function} [props.onOpenListVilla] - Callback membuka modal pendaftaran villa host
 * @param {Function} [props.onOpenEditor] - Callback membuka halaman editor deskripsi villa
 * @returns {React.JSX.Element} Elemen JSX footer dan tombol floating WA
 */
export default function BscFooter({ onOpenListVilla, onOpenEditor }) {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hello Bali Stay Collection team, I would like to inquire about booking a villa.')}`;

  /**
   * Menggulir halaman secara halus ke elemen target
   * @param {React.MouseEvent} e
   * @param {string} targetId
   */
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bsc-site-footer">
        {/* Seksi Pre-Footer Banner: Pertanyaan Rekomendasi Villa */}
        <section className="foot-banner" aria-label="Villa inquiry callout">
          <div className="foot-banner-in">
            <div className="foot-banner-text">
              <h2>Not sure which villa fits? Tell us how you want Bali to feel.</h2>
              <p>Our local team will suggest the right villa, and tell you honestly if we don&rsquo;t have it.</p>
            </div>
            <div className="foot-banner-actions">
              <button 
                type="button" 
                className="btn-foot-find"
                onClick={(e) => handleScrollTo(e, 'villas')}
              >
                Find my villa
              </button>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-foot-chat"
              >
                Chat with our team
              </a>
            </div>
          </div>
        </section>

        {/* Garis Pemisah Tipis 1 */}
        <div className="foot-divider" />

        {/* Seksi Utama Footer: 4 Kolom Grid */}
        <div className="foot-main">
          <div className="foot-grid">
            {/* Kolom 1: Brand Info & Kontak Bali */}
            <div className="foot-col foot-brand-col">
              <img 
                src="/logo-white.svg" 
                alt="Bali Stay Collection" 
                className="foot-logo-img"
                style={{ height: '36px', width: 'auto', display: 'block', marginBottom: '14px' }} 
              />
              <p className="foot-brand-desc">
                Not a thousand listings. Just villas we know, and a local team that finds the one that&rsquo;s yours.
              </p>
              <div className="foot-contact-block">
                <div>
                  <strong>Office in Bali</strong>
                </div>
                <div style={{ color: '#CBD5E1', fontSize: '13.5px', marginTop: '2px', lineHeight: 1.5 }}>
                  <a 
                    href="https://maps.google.com/?q=Jl.+Gunung+Salak+Utara+No.189,+Padangsambian+Klod,+Kec.+Denpasar+Bar.,+Kota+Denpasar,+Bali+80117" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#CBD5E1', textDecoration: 'none' }}
                    title="Open in Google Maps"
                  >
                    Jl. Gunung Salak Utara No.189, Padangsambian Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 80117
                  </a>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <strong>WhatsApp / Telp</strong>{' '}
                  <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    +62 813-3774-3002
                  </a>
                  {' '}&middot;{' '}
                  <strong>Email</strong>{' '}
                  <a href="mailto:hello@balistaycollection.com">
                    hello@balistaycollection.com
                  </a>
                </div>
                <div className="foot-contact-sub" style={{ marginTop: '4px' }}>
                  Replies: [e.g. within 1 hour, 8am&ndash;10pm WITA]
                </div>
              </div>
            </div>

            {/* Kolom 2: STAY */}
            <div className="foot-col">
              <h4 className="foot-col-title">STAY</h4>
              <ul className="foot-links">
                <li><a href="#villas" onClick={(e) => handleScrollTo(e, 'villas')}>All villas</a></li>
                <li><a href="#destinations" onClick={(e) => handleScrollTo(e, 'destinations')}>Destinations</a></li>
                <li><a href="#experiences" onClick={(e) => handleScrollTo(e, 'experiences')}>Experiences</a></li>
                <li><a href="#villas" onClick={(e) => handleScrollTo(e, 'villas')}>Find by mood</a></li>
                <li><a href="#villas" onClick={(e) => handleScrollTo(e, 'villas')}>Villa levels</a></li>
                <li><a href="#tour" onClick={(e) => handleScrollTo(e, 'tour')}>Video tour</a></li>
              </ul>
            </div>

            {/* Kolom 3: BOOK WITH CONFIDENCE */}
            <div className="foot-col">
              <h4 className="foot-col-title">BOOK WITH CONFIDENCE</h4>
              <ul className="foot-links">
                <li><a href="#picks" onClick={(e) => handleScrollTo(e, 'picks')}>How we verify</a></li>
                <li><a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')}>FAQ</a></li>
                <li><a href="#team" onClick={(e) => handleScrollTo(e, 'team')}>Our local team</a></li>
                <li><a href="#terms" onClick={(e) => e.preventDefault()}>Cancellation terms</a></li>
                <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Terms &amp; Privacy</a></li>
                {onOpenEditor && (
                  <li>
                    <a href="#editor" onClick={(e) => { e.preventDefault(); onOpenEditor(); }}>
                      Villa Content Editor
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Kolom 4: A BRAND OF ANAKOSA */}
            <div className="foot-col foot-anakosa-col">
              <h4 className="foot-col-title">A BRAND OF</h4>
              <div className="foot-anakosa-logo">A N A K Ō S A</div>
              <p className="foot-anakosa-sub">
                Own a villa in Bali?{' '}
                <a 
                  href="#list-villa" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof onOpenListVilla === 'function') onOpenListVilla();
                  }}
                  className="foot-anakosa-cta"
                >
                  Talk to ANAKOSA
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Garis Pemisah Tipis 2 */}
        <div className="foot-divider" />

        {/* Seksi Bawah: Hak Cipta & Socials */}
        <div className="foot-bottom">
          <div className="foot-bottom-in">
            <div className="foot-copy">&copy; 2026 ANAKOSA</div>
            <div className="foot-bottom-links">
              <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
              <a href="#youtube" onClick={(e) => e.preventDefault()}>YouTube</a>
              <a 
                href="https://maps.google.com/?q=Jl.+Gunung+Salak+Utara+No.189,+Padangsambian+Klod,+Kec.+Denpasar+Bar.,+Kota+Denpasar,+Bali+80117" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA */}
      <a
        className="wa"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="wa"
        aria-label="Chat with our team on WhatsApp"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Chat with us</span>
      </a>
    </>
  );
}
