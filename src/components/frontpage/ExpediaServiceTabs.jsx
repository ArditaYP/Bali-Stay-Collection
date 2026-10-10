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
    {
      id: 'stays',
      label: 'Stay',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 7h-8v6H3V5H1v15h2v-3h18v3h2v-9a4 4 0 0 0-4-4zM7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      )
    },
    {
      id: 'cars',
      label: 'Car',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
          <circle cx="7.5" cy="14.5" r="1.5" />
          <circle cx="16.5" cy="14.5" r="1.5" />
        </svg>
      )
    },
    {
      id: 'motorbikes',
      label: 'Motorbike',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="18.5" cy="17.5" r="3.5" />
          <path d="M15 6h-2l-3 6h7l-2-6z" />
          <path d="M9 17l1.5-5.5L14 9h3" />
          <path d="M5.5 17.5L8 12" />
          <path d="M14 6l1.5-2H18" />
        </svg>
      )
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      )
    },
    {
      id: 'experiences',
      label: 'Thing Todo',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
