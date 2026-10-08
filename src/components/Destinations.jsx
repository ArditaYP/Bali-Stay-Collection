import React from 'react';
import { POPULAR_DESTINATIONS, AIRBNB_CATEGORIES } from '../data/villasData';

/**
 * Komponen Destinations
 * Menampilkan bar filter kategori resmi ala Airbnb dari Vista (Beach, Trending, Beachfront, Pool, Luxe, dll.)
 * serta kartu grid destinasi populer di Bali (Ubud, Balangan Beach, Canggu, Seminyak, Uluwatu).
 * 
 * @param {Object} props - Properti komponen
 * @param {Function} props.onSelectDestination - Fungsi callback saat salah satu destinasi diklik
 * @param {string} props.activeDestination - Nama destinasi yang saat ini sedang aktif dipilih
 * @param {Function} [props.onSelectCategory] - Fungsi callback saat salah satu kategori Airbnb diklik
 * @param {string} [props.activeCategory] - ID kategori Airbnb yang sedang aktif dipilih
 * @returns {React.JSX.Element} Elemen JSX seksi destinasi dan bar kategori Airbnb
 */
export default function Destinations({
  onSelectDestination,
  activeDestination,
  onSelectCategory,
  activeCategory
}) {
  /**
   * Menangani klik pada kartu destinasi
   * @param {string} destName - Nama lokasi destinasi yang diklik (misal: 'Canggu')
   * @returns {void}
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

  /**
   * Menangani klik pada item kategori Airbnb
   * @param {string} catId - ID filter kategori yang diklik (misal: 'beach', 'pool')
   * @returns {void}
   */
  const handleCategoryClick = (catId) => {
    if (typeof onSelectCategory === 'function') {
      onSelectCategory(catId);
    }
    const resultsEl = document.getElementById('results-section');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="destinations" id="destinations-section">
      <div className="destinations-inner">
        {/* Bar Kategori Airbnb dari Vista */}
      <div className="category-scroll-wrap">
        <div className="category-bar">
          {AIRBNB_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-item ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
                title={`Kategori ${cat.name}`}
              >
                <div className="category-icon-wrap">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    width="24"
                    height="24"
                    loading="lazy"
                    className="category-icon"
                  />
                </div>
                <span className="category-label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="destinations-header">
        <h2>Prefer Villa Destination</h2>
        <p className="destinations-sub">Explore Bali’s most sought-after villa destinations</p>
      </div>
      <div className="dest-grid">
        {POPULAR_DESTINATIONS.map((dest) => {
          const isActive = activeDestination && activeDestination.toLowerCase() === dest.name.toLowerCase();
          return (
            <div
              key={dest.name}
              className={`dest-card ${isActive ? 'active' : ''}`}
              onClick={() => handleDestinationClick(dest.name)}
              role="button"
              tabIndex={0}
              title={`Lihat koleksi villa di ${dest.name}`}
            >
              <img 
                src={dest.image} 
                alt={`${dest.name}, Bali`} 
                className="dest-card-img" 
                style={dest.objectPosition ? { objectPosition: dest.objectPosition } : undefined}
                loading="lazy" 
              />
              <div className="dest-card-overlay" />
              <div className="dest-card-content">
                <span className="dest-card-name">{dest.name}</span>
                <span className="dest-card-count">{dest.count}</span>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
