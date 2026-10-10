import React from 'react';
import { CONFIG } from '../../data/bscVillasData';

/**
 * Komponen BscFooter
 * Menampilkan informasi legalitas perusahaan, tautan navigasi bawah,
 * hak cipta, serta tombol mengambang kontak WhatsApp sesuai bsc-frontpage_1.html.
 * 
 * @param {Object} props
 * @param {Function} [props.onOpenListVilla] - Callback membuka modal pendaftaran villa host
 * @param {Function} [props.onOpenEditor] - Callback membuka halaman editor deskripsi villa
 * @returns {React.JSX.Element} Elemen JSX footer dan tombol floating WA
 */
export default function BscFooter({ onOpenListVilla, onOpenEditor }) {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hello Bali Stay Collection team, I would like to inquire about booking a villa.')}`;

  return (
    <>
      {/* Seksi Legalitas & Kontak Perusahaan */}
      {/* <section className="sec sec-legal" id="legal">
        <div className="wrap">
          <div className="legal">
            <div>
              <b>Company</b>
              [PT legal name]
              <br />
              [NIB / business licence number]
            </div>
            <div>
              <b>Office in Bali</b>
              [Full address]
              <br />
              [Google Maps link]
            </div>
            <div>
              <b>Contact</b>
              [Email] &middot; [WhatsApp]
              <br />
              Replies: [e.g. within 1 hour, 8am-10pm WITA]
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer Utama */}
      <footer>
        <div className="wrap foot">
          <div>
            <img 
              src="/logo-white.svg" 
              alt="Bali Stay Collection" 
              style={{ height: '34px', width: 'auto', display: 'block', marginBottom: '12px' }} 
            />
            <p style={{ margin: 0, color: '#CFCABD', fontSize: '13.5px', lineHeight: 1.5 }}>
              Private villas in Bali, managed by a local team.
            </p>
            {onOpenListVilla && (
              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={onOpenListVilla}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  List your villa with us
                </button>
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
              <a href="#villas">Villas</a>
              <a href="#destinations">Destinations</a>
              <a href="#experiences">Experiences</a>
              <a href="#tour">Video tour</a>
              {onOpenEditor && (
                <a href="#editor" onClick={(e) => { e.preventDefault(); onOpenEditor(); }}>
                  Villa Content Editor
                </a>
              )}
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
            </div>
            <div className="socials" style={{ marginTop: '12px' }}>
              <a href="#maps" onClick={(e) => e.preventDefault()}>Find us on Google Maps</a>
              <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
              <a href="#youtube" onClick={(e) => e.preventDefault()}>YouTube</a>
              <a href="mailto:hello@balistaycollection.com">hello@balistaycollection.com</a>
            </div>
          </div>

          <div>&copy; 2026 Bali Stay Collection</div>
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
        >
          <path d="M21 12a9 9 0 01-13.5 7.8L3 21l1.3-4.4A9 9 0 1121 12z" />
        </svg>
        <span>Chat with us</span>
      </a>
    </>
  );
}
