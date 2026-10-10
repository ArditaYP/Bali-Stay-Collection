import React from 'react';
import { CAR_FLEET_DATA, PACKAGES_DATA, EXPERIENCES_DATA } from '../../data/bscFleetData';

/**
 * Komponen HeroConciergeShowcase
 * Menampilkan galeri mockup list visual yang berkelas dan interaktif
 * saat pengguna memilih tab layanan di Hero:
 * - Cars: Galeri armada mobil mewah VIP (Alphard, HiAce VIP, Ioniq 5 EV, Innova Zenix)
 * - Packages: Showcase paket liburan All-Inclusive (Yacht & Villa, Honeymoon, Family Estate)
 * - Things to do: Showcase pengalaman kurasi concierge (Private Chef, Heli-Tour, Yacht, Spa)
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Tab yang sedang aktif ('stays', 'cars', 'packages', 'experiences')
 * @param {string} props.selectedCarId - ID mobil yang saat ini terpilih di bar pencarian
 * @param {Function} props.onSelectCar - Callback saat pengguna memilih mobil dari kartu showcase
 * @param {Function} [props.onSelectPackage] - Callback saat memilih paket
 * @param {Function} [props.onSelectExperience] - Callback saat memilih aktivitas
 * @returns {React.JSX.Element|null} Elemen JSX showcase concierge atau null jika stays
 */
export default function HeroConciergeShowcase({
  activeTab,
  selectedCarId,
  onSelectCar,
  onSelectPackage,
  onSelectExperience
}) {
  // Jika tab Stays yang aktif, showcase ini tidak ditampilkan (Stays menggunakan 4 pilar trust strip)
  if (activeTab === 'stays') {
    return null;
  }

  /**
   * Menangani pemesanan instan via WhatsApp Concierge BSC
   * @param {string} title - Judul layanan/mobil/paket
   * @param {string} category - Kategori layanan
   * @returns {void}
   */
  const handleWhatsAppBooking = (title, category) => {
    const text = encodeURIComponent(
      `Halo Bali Stay Collection Concierge, saya tertarik untuk memesan layanan ${category}: "${title}". Mohon informasi ketersediaan dan detail layanannya. Terima kasih.`
    );
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="hero-concierge-showcase" aria-label="Concierge Showcase">
      {/* ============================================================== */}
      {/* 1. SHOWCASE TAB: CARS (LUXURY FLEET MOCKUP CARDS) */}
      {/* ============================================================== */}
      {activeTab === 'cars' && (
        <div className="concierge-showcase-wrapper">
          <div className="showcase-header">
            <div className="showcase-badge">
              <span className="badge-dot" />
              BALI STAY COLLECTION · PRIVATE CHAUFFEUR FLEET
            </div>
            <h3 className="showcase-title">Hand-Picked Chauffeured Luxury Mobility</h3>
            <p className="showcase-sub">
              Nikmati kenyamanan jelajah pulau Bali tanpa repot. Seluruh armada dilengkapi pengemudi lokal profesional berbahasa Inggris, AC dingin sejuk, Wi-Fi, dan air mineral dingin.
            </p>
          </div>

          <div className="fleet-showcase-grid">
            {CAR_FLEET_DATA.map((car) => {
              const isSelected = selectedCarId === car.id || selectedCarId === car.name || selectedCarId === car.shortName;

              return (
                <div 
                  key={car.id} 
                  className={`fleet-card ${isSelected ? 'fleet-card-active' : ''}`}
                >
                  {/* Top Badge */}
                  <div className="fleet-card-top">
                    <span className="fleet-tier-tag">{car.category}</span>
                    <span className="fleet-promo-tag">{car.badge}</span>
                  </div>

                  {/* Visual Car Mockup Silhouette / Illustration */}
                  <div className="fleet-visual-container">
                    <div className="fleet-car-art">
                      <svg viewBox="0 0 120 54" className="fleet-car-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id={`carGrad-${car.id}`} x1="0" y1="0" x2="120" y2="54" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#16294D" />
                            <stop offset="100%" stopColor="#25437a" />
                          </linearGradient>
                          <linearGradient id={`goldGrad-${car.id}`} x1="0" y1="0" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D2B073" />
                            <stop offset="100%" stopColor="#b89352" />
                          </linearGradient>
                        </defs>
                        {/* Bayangan realistis di lantai */}
                        <ellipse cx="60" cy="48" rx="52" ry="4.5" fill="rgba(0,0,0,0.14)" />
                        
                        {/* Body Mobil Utama */}
                        <path 
                          d="M12 38 C 14 30, 24 26, 36 24 L 50 14 C 54 11, 72 11, 84 15 L 98 24 C 108 26, 114 30, 115 38 C 115 42, 110 43, 104 43 L 18 43 C 13 43, 11 41, 12 38 Z" 
                          fill={`url(#carGrad-${car.id})`} 
                        />
                        {/* Kaca Jendela & Sunroof */}
                        <path 
                          d="M51 16 L 39 24 L 64 24 L 64 14 Z" 
                          fill="#D2B073" 
                          opacity="0.35" 
                        />
                        <path 
                          d="M68 14 L 68 24 L 95 24 L 83 16 Z" 
                          fill="#D2B073" 
                          opacity="0.55" 
                        />
                        {/* Lis Aksen Garis Emas BSC */}
                        <line x1="22" y1="34" x2="108" y2="34" stroke={`url(#goldGrad-${car.id})`} strokeWidth="1.5" strokeLinecap="round" />
                        
                        {/* Roda Depan & Belakang */}
                        <circle cx="34" cy="42" r="7.5" fill="#0f172a" />
                        <circle cx="34" cy="42" r="4.2" fill="#D2B073" opacity="0.8" />
                        <circle cx="34" cy="42" r="1.5" fill="#ffffff" />
                        
                        <circle cx="92" cy="42" r="7.5" fill="#0f172a" />
                        <circle cx="92" cy="42" r="4.2" fill="#D2B073" opacity="0.8" />
                        <circle cx="92" cy="42" r="1.5" fill="#ffffff" />
                        
                        {/* Lampu Depan & Belakang */}
                        <path d="M112 34 L 115 36 L 112 38 Z" fill="#ffffff" opacity="0.9" />
                        <path d="M13 34 L 12 37 L 15 37 Z" fill="#ef4444" opacity="0.9" />
                      </svg>
                    </div>
                    {isSelected && (
                      <div className="fleet-selected-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Selected in Search
                      </div>
                    )}
                  </div>

                  {/* Info Armada */}
                  <div className="fleet-info">
                    <h4 className="fleet-name">{car.name}</h4>
                    <p className="fleet-desc">{car.description}</p>

                    {/* Key Specs Pills */}
                    <div className="fleet-specs-strip">
                      <span className="spec-pill" title="Seating Capacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        {car.seats} Seats
                      </span>
                      <span className="spec-pill" title="Luggage Capacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                        </svg>
                        {car.luggage} Bags
                      </span>
                      <span className="spec-pill highlight" title="Chauffeur Status">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Chauffeur Inc.
                      </span>
                    </div>

                    {/* Amenities Bullets */}
                    <ul className="fleet-amenities-list">
                      {car.amenities.map((item, idx) => (
                        <li key={idx}>
                          <span className="amenity-check">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Pricing & CTA */}
                    <div className="fleet-card-footer">
                      <div className="fleet-price-block">
                        <span className="price-label">All-Inclusive Rate</span>
                        <div className="price-values">
                          <b className="price-idr">{car.priceIdr}</b>
                          <small className="price-usd">{car.priceUsd}</small>
                        </div>
                        <span className="price-period">{car.period}</span>
                      </div>

                      <div className="fleet-cta-group">
                        <button
                          type="button"
                          className={`btn-select-fleet ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => {
                            if (typeof onSelectCar === 'function') {
                              onSelectCar(car);
                            }
                          }}
                        >
                          {isSelected ? 'Selected' : 'Select Car'}
                        </button>
                        <button
                          type="button"
                          className="btn-wa-fleet"
                          title="Chat via WhatsApp"
                          onClick={() => handleWhatsAppBooking(car.name, 'Sewa Mobil VIP')}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.302-.78 1-.956 1.202-.175.201-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.151-.678-1.634-.929-2.237-.245-.588-.493-.508-.678-.518-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.512 1.079 2.914 1.229 3.115c.15.201 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.229 1.378.197 1.898.119.58-.088 1.78-.728 2.03-1.431.251-.703.251-1.306.176-1.431-.076-.126-.277-.201-.578-.352z"/>
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.96.568 3.791 1.55 5.342L2 22l4.825-1.504A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 0 1-4.22-1.17l-.3-.18-3.04.95.96-2.95-.19-.32A8.17 8.17 0 1 1 12 20.2z"/>
                          </svg>
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SHOWCASE TAB: PACKAGES (VIP BUNDLES SHOWCASE) */}
      {/* ============================================================== */}
      {activeTab === 'packages' && (
        <div className="concierge-showcase-wrapper">
          <div className="showcase-header">
            <div className="showcase-badge">
              <span className="badge-dot" />
              BALI STAY COLLECTION · SIGNATURE EXPERIENCES
            </div>
            <h3 className="showcase-title">All-Inclusive Luxury Villa Bundles</h3>
            <p className="showcase-sub">
              Kombinasi eksklusif akomodasi villa mewah, private yacht cruise, supir pribadi, dan fine dining chef untuk liburan tanpa cela.
            </p>
          </div>

          <div className="packages-showcase-grid">
            {PACKAGES_DATA.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-card-top">
                  <span className="package-tag">{pkg.tag}</span>
                  <span className="package-badge">{pkg.badge}</span>
                </div>
                <h4 className="package-title">{pkg.title}</h4>
                <p className="package-desc">{pkg.desc}</p>

                <div className="package-includes-block">
                  <span className="includes-label">Paket Termasuk:</span>
                  <div className="includes-pills">
                    {pkg.includes.map((inc, i) => (
                      <span key={i} className="inc-pill">
                        ✨ {inc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="package-card-footer">
                  <div className="package-price">
                    <b>{pkg.price}</b>
                    <small>{pkg.period}</small>
                  </div>
                  <div className="package-cta-group">
                    <button
                      type="button"
                      className="btn-select-package"
                      onClick={() => {
                        if (typeof onSelectPackage === 'function') {
                          onSelectPackage(pkg);
                        }
                      }}
                    >
                      Pilih Paket
                    </button>
                    <button
                      type="button"
                      className="btn-wa-fleet"
                      onClick={() => handleWhatsAppBooking(pkg.title, 'Paket Liburan VIP')}
                    >
                      Inquire WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SHOWCASE TAB: EXPERIENCES (THINGS TO DO SHOWCASE) */}
      {/* ============================================================== */}
      {activeTab === 'experiences' && (
        <div className="concierge-showcase-wrapper">
          <div className="showcase-header">
            <div className="showcase-badge">
              <span className="badge-dot" />
              BALI STAY COLLECTION · CURATED CONCIERGE
            </div>
            <h3 className="showcase-title">Exclusive On-Demand Bali Experiences</h3>
            <p className="showcase-sub">
              Lengkapi masa menginap Anda dengan pengalaman private yacht, private chef langsung di villa, tur helikopter, dan ritual spa holistik.
            </p>
          </div>

          <div className="experiences-showcase-grid">
            {EXPERIENCES_DATA.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="experience-card-top">
                  <span className="exp-badge">{exp.badge}</span>
                  <span className="exp-duration">⏱️ {exp.duration}</span>
                </div>
                <h4 className="exp-title">{exp.title}</h4>
                <p className="exp-desc">{exp.desc}</p>
                <div className="experience-card-footer">
                  <div className="exp-price">
                    <b>{exp.price}</b>
                  </div>
                  <div className="exp-cta-group">
                    <button
                      type="button"
                      className="btn-select-exp"
                      onClick={() => {
                        if (typeof onSelectExperience === 'function') {
                          onSelectExperience(exp);
                        }
                      }}
                    >
                      Pilih Aktivitas
                    </button>
                    <button
                      type="button"
                      className="btn-wa-fleet"
                      onClick={() => handleWhatsAppBooking(exp.title, 'Aktivitas Concierge')}
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
