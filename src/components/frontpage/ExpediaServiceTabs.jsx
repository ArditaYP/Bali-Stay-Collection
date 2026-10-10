import React from 'react';

/**
 * Komponen ExpediaServiceTabs
 * Menampilkan tab kategori layanan horizontal di atas formulir pencarian Hero
 * terinspirasi dari antarmuka modern Expedia.com:
 * - Stay (Villa & Penginapan Mewah Bali)
 * - Car (Sewa Mobil & Private Chauffeur VIP)
 * - Motorbike (Sewa Skuter & Maxi Scooter Premium Bali)
 * - Packages (Paket Liburan All-Inclusive Villa VIP)
 * - Thing Todo (Aktivitas & On-Demand Concierge Experiences)
 * 
 * Tampil tanpa blok/kontainer putih (transparan) dengan garis bawah (underline)
 * tegas pada tab aktif, bersatu di dalam satu kotak widget pencarian.
 * 
 * @param {Object} props
 * @param {string} props.activeTab - ID tab aktif ('stays', 'cars', 'motorbikes', 'packages', 'experiences')
 * @param {Function} props.onTabChange - Callback saat pengguna beralih tab
 * @returns {React.JSX.Element} Elemen JSX tab layanan ala Expedia
 */
export default function ExpediaServiceTabs({ activeTab = 'stays', onTabChange }) {
  const tabs = [
    { id: 'stays', label: 'Stay' },
    { id: 'packages', label: 'Wellness' },
    { id: 'experiences', label: 'Immersion' },
    { id: 'cars', label: 'Car' },
    { id: 'motorbikes', label: 'Motorbike' }
  ];

  return (
    <div className="expedia-tabs-container" role="tablist" aria-label="Service categories">
      <div className="expedia-tabs-scroll">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              className={`expedia-tab-btn ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof onTabChange === 'function') {
                  onTabChange(tab.id);
                }
              }}
            >
              <span className="expedia-tab-label">{tab.label}</span>
              {isActive && <span className="expedia-tab-active-indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
