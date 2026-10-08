import React from 'react';
import { TIERS_INFO } from '../../data/bscVillasData';

/**
 * 5 Kriteria Inspeksi Standar BSC
 */
const CRITERIA = ['Design', 'Pool & outdoor', 'View & setting', 'Service', 'Amenities'];

/**
 * Skor Rata-rata Default per Tier (dari bsc-frontpage_3.html)
 */
const DEFAULT_TIER_SCORES = {
  Standard: [1.0, 1.0, 0.75, 1.38, 1.38],
  Deluxe: [1.35, 1.35, 1.41, 1.94, 1.59],
  Premium: [1.95, 2.05, 1.76, 2.05, 1.76],
  Luxury: [2.4, 2.8, 2.4, 2.6, 3.0]
};

/**
 * Komponen BscLevels
 * Menampilkan seksi 'Choose your level' persis seperti pada bsc-frontpage_3.html:
 * - Kicker: Choose your level
 * - Judul: From simple and stylish to full luxury
 * - Deskripsi: Every villa has a private pool. The level tells you the design, service and extras to expect. Tap a level to see those villas.
 * - 4 kartu level (Standard, Deluxe, Premium, Luxury) dengan:
 *   1. Jumlah villa terdaftar (.n)
 *   2. Ikon 4 daun BSC Level 1-4 (.lvlbig)
 *   3. Judul nama level (b)
 *   4. Deskripsi karakteristik level (p)
 *   5. Meteran 5-point check (Design, Pool & outdoor, View & setting, Service, Amenities) (.meter)
 *   6. Kategori trip yang cocok (.for)
 * - Catatan transparansi penilaian mnote (.mnote)
 * - Kotak jaminan ulasan autentik (.rev): 'Guest reviews: real ones only'
 * 
 * @param {Object} props
 * @param {Object[]} [props.villas=[]] - Daftar master villa
 * @param {Function} [props.onSelectTier] - Callback saat tier dipilih
 * @param {Function} [props.onSelectLevel] - Alias callback saat level dipilih
 * @returns {React.JSX.Element} Elemen JSX Level Tiering BSC
 */
export default function BscLevels({
  villas = [],
  onSelectTier,
  onSelectLevel
}) {
  const tiersList = ['Standard', 'Deluxe', 'Premium', 'Luxury'];

  /**
   * Menangani klik pada salah satu kartu tier
   * @param {string} tierName - Nama level/tier yang dipilih
   */
  const handleTierClick = (tierName) => {
    const callback = onSelectLevel || onSelectTier;
    if (typeof callback === 'function') {
      callback(tierName);
    }
    const villasEl = document.getElementById('villas');
    if (villasEl) {
      villasEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Menghitung rata-rata skor 5 kriteria untuk tier tertentu
   * @param {string} tierKey - Nama tier
   * @returns {number[]} Array 5 skor
   */
  const getTierAvg = (tierKey) => {
    const matching = villas.filter(v => v.tier === tierKey && Array.isArray(v.sc) && v.sc.length === 5);
    if (!matching.length) {
      return DEFAULT_TIER_SCORES[tierKey] || [1, 1, 1, 1, 1];
    }
    return CRITERIA.map((_, i) => {
      const sum = matching.reduce((acc, v) => acc + (v.sc[i] || 0), 0);
      return sum / matching.length;
    });
  };

  /**
   * Merender ikon daun level BSC (1 sampai 4)
   * @param {number} levelCount - Jumlah level aktif (1 - 4)
   * @returns {React.JSX.Element}
   */
  const renderLeaves = (levelCount) => {
    return (
      <span className="lvl" role="img" aria-label={`BSC Level ${levelCount} of 4`}>
        {[0, 1, 2, 3].map((i) => (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
            <path
              d="M5 19C5 10 10 4 20 4c0 10-6 15-15 15zM5 19l8-8"
              fill={i < levelCount ? '#16294D' : 'none'}
              stroke="#0C1B38"
              strokeWidth="1.6"
            />
          </svg>
        ))}
      </span>
    );
  };

  return (
    <section className="sec" id="levels" style={{ paddingBottom: '0' }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Choose your level</div>
          <h2>From simple and stylish to full luxury</h2>
          <p>
            Every villa has a private pool. The level tells you the design, service and extras to expect. Tap a level to see those villas.
          </p>
        </div>

        <div className="tiers" id="tierGrid">
          {tiersList.map((tierKey, index) => {
            const count = villas.filter(v => v.tier === tierKey).length;
            const info = TIERS_INFO[tierKey] || { desc: '', forTrip: '' };
            const scores = getTierAvg(tierKey);

            return (
              <button
                key={tierKey}
                type="button"
                className="tcard"
                data-tier={tierKey}
                onClick={() => handleTierClick(tierKey)}
              >
                <span className="n">{count} {count === 1 ? 'villa' : 'villas'}</span>
                <span className="lvlbig">{renderLeaves(index + 1)}</span>
                <b>{tierKey}</b>
                <p>{info.desc}</p>
                <div className="meter">
                  {scores.map((score, sIdx) => (
                    <div key={sIdx}>
                      {CRITERIA[sIdx]}
                      <span className="bar">
                        {[0, 1, 2].map((k) => {
                          const diff = score - k;
                          const statusClass = diff >= 1 ? 'on' : diff >= 0.5 ? 'half' : '';
                          return <i key={k} className={statusClass} />;
                        })}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="for">{info.forTrip}</span>
              </button>
            );
          })}
        </div>

        <p className="mnote" style={{ marginTop: '12px' }}>
          The bars show our own 5-point check (design, pool &amp; outdoor, view &amp; setting, service, amenities). It is a BSC level, not a guest rating. Levels are confirmed after each inspection.
        </p>

        <div className="rev">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0C1B38" strokeWidth="1.8">
            <path d="M21 12a9 9 0 01-13.5 7.8L3 21l1.3-4.4A9 9 0 1121 12z" />
          </svg>
          <div>
            <b>Guest reviews: real ones only</b>
            <p>
              BSC is new, so you will not see stars here yet. After the first stays, verified guest reviews appear on each villa, labelled with their source and never edited.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
