import React from 'react';

/**
 * Komponen ExpediaServiceTabs
 * Menampilkan tab kategori layanan horizontal di atas bar pencarian Hero
 * terinspirasi dari antarmuka Expedia.com (sesuai referensi tambahan di hero.png):
 * - Stays (Villa & Penginapan Mewah) - Aktif default
 * - Cars (Sewa Mobil Mewah & Private Chauffeur di Bali)
 * - Packages (Paket Liburan All-Inclusive Villa VIP)
 * - Things to do (Aktivitas & Concierge Bali Experiences)
 * 
 * Sesuai instruksi pemilik proyek: Tab Flights dan Cruises telah dihilangkan.
 * Memiliki area klik luas (100% responsive tanpa dead click points).
 * 
 * @param {Object} props
 * @param {string} props.activeTab - ID tab yang sedang aktif ('stays', 'cars', 'packages', 'experiences')
 * @param {Function} props.onTabChange - Callback saat pengguna beralih tab
 * @returns {React.JSX.Element} Elemen JSX tab layanan Expedia
 */
export default function ExpediaServiceTabs({ activeTab = 'stays', onTabChange }) {
  const tabs = [
    {
      id: 'stays',
      label: 'Stays',
      badge: '35 Villas',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
        </svg>
      )
    },
    {
      id: 'cars',
      label: 'Cars',
      badge: 'Chauffeur',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
          <circle cx="7.5" cy="14.5" r="1.5" />
          <circle cx="16.5" cy="14.5" r="1.5" />
        </svg>
      )
    },
    {
      id: 'packages',
      label: 'Packages',
      badge: 'VIP Bundles',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      )
    },
    {
      id: 'experiences',
      label: 'Things to do',
      badge: 'Curated',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z" />
        </svg>
      )
    }
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
              <span className="expedia-tab-icon">{tab.icon}</span>
              <span className="expedia-tab-label">{tab.label}</span>
              {isActive && <span className="expedia-tab-active-indicator" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
