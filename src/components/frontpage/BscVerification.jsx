import React from 'react';

/**
 * Komponen BscVerification
 * Menampilkan seksi standar verifikasi BSC 'How we verify every villa'
 * dengan 12 poin checklist inspeksi fisik sesuai bsc-frontpage_1.html.
 * 
 * @param {Object} props
 * @param {Function} [props.onBrowseClick] - Callback opsional saat tombol diarahkan ke katalog villa
 * @returns {React.JSX.Element} Elemen JSX verifikasi villa
 */
export default function BscVerification({ onBrowseClick }) {
  const checkItems = [
    'Photos match the real villa',
    'Pool clean and safe',
    'Air conditioning tested',
    'WiFi speed measured',
    'Hot water and water pressure',
    'Kitchen fully equipped',
    'Bedding and towels fresh',
    'Walking distances measured',
    'Safety: locks, smoke alarm, first aid',
    'Staff briefed and reachable',
    'Noise level checked day and night',
    'Owner confirms availability'
  ];

  /**
   * Menangani klik tombol menuju ke katalog villa
   * @param {React.MouseEvent} e - Event klik
   * @returns {void}
   */
  const handleScrollToVillas = (e) => {
    e.preventDefault();
    if (onBrowseClick) {
      onBrowseClick();
    } else {
      const el = document.getElementById('villas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sec" id="verify" style={{ background: '#fff', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap verify">
        <div>
          <div className="eyebrow">Our standard</div>
          <h2 style={{ fontSize: '32px', margin: '6px 0 14px' }}>How we verify every villa</h2>
          <p style={{ color: 'var(--ink-soft)' }}>
            A villa only goes live on Bali Stay Collection after our team has visited it and checked the points below. Photos are taken by our team, and we note the date of the last inspection on each listing.
          </p>
          <a
            className="btn btn-ghost"
            href="#villas"
            onClick={handleScrollToVillas}
            style={{ marginTop: '14px' }}
          >
            Browse verified villas
          </a>
        </div>

        <div className="panel">
          <ul className="checks">
            {checkItems.map((item, idx) => (
              <li key={idx}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
