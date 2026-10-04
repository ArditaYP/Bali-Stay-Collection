import React from 'react';
import { POPULAR_DESTINATIONS } from '../data/villasData';

/**
 * Komponen Destinations
 * Menampilkan kartu grid destinasi populer di Bali (Canggu, Ubud, Seminyak, Uluwatu, Nusa Dua).
 * Mengklik salah satu kartu akan secara otomatis memfilter daftar villa untuk wilayah tersebut.
 * 
 * @param {Object} props
 * @param {Function} props.onSelectDestination - Fungsi callback saat salah satu destinasi diklik
 * @param {string} props.activeDestination - Nama destinasi yang saat ini sedang aktif dipilih
 */
export default function Destinations({ onSelectDestination, activeDestination }) {
  /**
   * Menangani klik pada kartu destinasi
   * @param {string} destName - Nama lokasi destinasi yang diklik (misal: 'Canggu')
   */
  const handleDestinationClick = (destName) => {
    if (typeof onSelectDestination === 'function') {
      onSelectDestination(destName);
    }
    const resultsEl = document.getElementById('results-section');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="destinations" id="destinations-section">
      <h2>Popular Destinations</h2>
      <div className="dest-grid">
        {POPULAR_DESTINATIONS.map((dest) => {
          const isActive = activeDestination && activeDestination.toLowerCase() === dest.name.toLowerCase();
          return (
            <div
              key={dest.name}
              className="dest-card"
              style={{
                backgroundColor: dest.bg,
                outline: isActive ? '3px solid var(--accent)' : 'none',
                outlineOffset: '2px'
              }}
              onClick={() => handleDestinationClick(dest.name)}
              role="button"
              tabIndex={0}
              title={`Lihat villa di ${dest.name}`}
            >
              <span>{dest.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
