import React from 'react';
import { TIERS_INFO } from '../../data/bscVillasData';

/**
 * Komponen BscLevels
 * Menampilkan seksi 'Choose your level' (Tiering standard) sesuai bsc-frontpage_1.html:
 * - Kicker: Choose your level
 * - Judul: From simple and stylish to full luxury
 * - Deskripsi: Every villa has a private pool. The level tells you the design, service and extras to expect. Tap a level to see those villas.
 * - 4 kartu tingkat kualitas villa (Standard, Deluxe, Premium, Luxury) dengan jumlah villa aktif dan karakteristik layanannya.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Daftar master villa untuk menghitung jumlah per tier
 * @param {Function} props.onSelectTier - Callback saat salah satu tier diklik untuk memfilter
 * @returns {React.JSX.Element} Elemen JSX Level Tiering BSC
 */
export default function BscLevels({
  villas = [],
  onSelectTier
}) {
  const tiersList = ['Standard', 'Deluxe', 'Premium', 'Luxury'];

  /**
   * Menangani klik pada salah satu kartu tier
   * @param {string} tierName - Nama level/tier yang dipilih
   */
  const handleTierClick = (tierName) => {
    if (typeof onSelectTier === 'function') {
      onSelectTier(tierName);
    }
    const villasEl = document.getElementById('villas');
    if (villasEl) {
      villasEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sec" id="levels">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Choose your level</div>
          <h2>From simple and stylish to full luxury</h2>
          <p>
            Every villa has a private pool. The level tells you the design, service and extras to expect. Tap a level to see those villas.
          </p>
        </div>

        <div className="tiers" id="tierGrid">
          {tiersList.map((tierKey) => {
            const count = villas.filter(v => v.tier === tierKey).length;
            const info = TIERS_INFO[tierKey];

            return (
              <button
                key={tierKey}
                type="button"
                className="tcard"
                onClick={() => handleTierClick(tierKey)}
              >
                <b>{tierKey}</b>
                <span className="n">{count} {count === 1 ? 'villa' : 'villas'}</span>
                <p>{info.desc}</p>
                <div className="for">{info.forTrip}</div>
              </button>
            );
          })}
        </div>
      </div>
      <br></br>
      <br></br>
    </section>
  );
}
