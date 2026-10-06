import React from 'react';

/**
 * Komponen BscStayPromise
 * Menampilkan kartu komitmen dan jaminan mutu 'The BSC Stay Promise'
 * persis sesuai desain dan copywriter bsc-frontpage_1.html.
 * 
 * @returns {React.JSX.Element} Elemen JSX BSC Stay Promise
 */
export default function BscStayPromise() {
  return (
    <section className="sec sec-promise" id="promise">
      <div className="wrap">
        <div className="promise">
          <div>
            <div className="eyebrow" style={{ color: '#E9B8A2' }}>Our promise</div>
            <h2 style={{ fontSize: '30px', margin: '6px 0 12px' }}>The BSC Stay Promise</h2>
            <p style={{ color: '#CFCABD' }}>
              What you see is what you get. If something is not right, we put it right, quickly.
            </p>
          </div>
          <ul>
            <li>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E9B8A2" strokeWidth="2.2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>
                <b style={{ color: '#fff' }}>Photos are real.</b> Taken by our team and dated.
              </span>
            </li>
            <li>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E9B8A2" strokeWidth="2.2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>
                <b style={{ color: '#fff' }}>Fixed fast.</b> Issues reported during your stay are handled by our on-call team.
              </span>
            </li>
            <li>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E9B8A2" strokeWidth="2.2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>
                <b style={{ color: '#fff' }}>Moved if needed.</b> If a villa does not match its listing, we offer a comparable villa or a refund as per our policy.
              </span>
            </li>
          </ul>
        </div>
        <p className="meta promise-note" style={{ marginTop: '24px', color: 'rgba(255, 255, 255, 0.4)' }}>
          [Owner to confirm exact policy wording before publishing.]
        </p>
      </div>
    </section>
  );
}
