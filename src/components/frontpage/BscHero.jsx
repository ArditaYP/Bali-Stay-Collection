import React, { useState } from 'react';
import ExpediaServiceTabs from './ExpediaServiceTabs';
import AirbnbSearchBar from './AirbnbSearchBar';
import HeroConciergeShowcase from './HeroConciergeShowcase';
import { 
  CAR_FLEET_DATA, 
  PICKUP_LOCATIONS_DATA, 
  CHAUFFEUR_OPTIONS_DATA, 
  PACKAGES_DATA, 
  EXPERIENCES_DATA 
} from '../../data/bscFleetData';

/**
 * Komponen BscHero
 * Menampilkan seksi hero utama Bali Stay Collection:
 * - Tab kategori layanan horizontal ala Expedia.com (Stays, Cars, Packages, Things to do) ditaruh di ATAS bar pencarian
 * - Formulir pencarian floating capsule ala Airbnb (Where, When, Who / Cars / Packages / Things to do) dengan id="searchForm"
 * - Galeri mockup list visual interaktif untuk armada mobil VIP, paket, dan pengalaman concierge
 * - 4 Pilar jaminan kepercayaan (Private pool, Verified in person, Clear cancellation, Dedicated local team)
 * 
 * @param {Object} props
 * @param {string[]} props.areas - Daftar nama area/kawasan Bali
 * @param {Object} props.searchParams - Parameter pencarian saat ini
 * @param {Function} props.onSearchChange - Callback saat input form berubah
 * @param {Function} props.onSubmitSearch - Callback saat tombol submit pencarian diklik
 * @param {Object} [props.heroData=null] - Data headline, lead, dan background hero kustom
 * @returns {React.JSX.Element} Elemen JSX Hero BSC
 */
export default function BscHero({
  areas = [],
  searchParams,
  onSearchChange,
  onSubmitSearch,
  heroData = null
}) {
  const [activeTab, setActiveTab] = useState('stays');

  // State armada mobil mewah terpilih
  const [selectedCar, setSelectedCar] = useState(CAR_FLEET_DATA[0]);
  const [selectedPickup, setSelectedPickup] = useState(PICKUP_LOCATIONS_DATA[0]);
  const [selectedDriverOption, setSelectedDriverOption] = useState(CHAUFFEUR_OPTIONS_DATA[0]);

  // State paket liburan dan aktivitas concierge terpilih
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES_DATA[0]);
  const [selectedExperience, setSelectedExperience] = useState(EXPERIENCES_DATA[0]);

  const headline = heroData?.headline || 'Find a Bali villa you can book with confidence';
  const leadText = heroData?.lead || 'Hand-picked private villas. On-the-ground local support';
  const bgImage = heroData?.bgImage || '';

  return (
    <section 
      className="hero" 
      style={bgImage ? {
        backgroundImage: `linear-gradient(rgba(244, 241, 234, 0.88), rgba(244, 241, 234, 0.94)), url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      <div className="wrap">
        <div className="hero-in">
          <h1 style={{ marginTop: '8px' }}>
            {headline}
          </h1>
          <p className="lead">
            {leadText}
          </p>
        </div>

        {/* 1. Tab Kategori Layanan ala Expedia.com (Ditaruh di ATAS Search Bar sesuai referensi screenshot tambahan di hero.png) */}
        <ExpediaServiceTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* 2. Formulir Pencarian Floating Capsule ala Airbnb (id="searchForm") */}
        <AirbnbSearchBar 
          activeTab={activeTab}
          _areas={areas}
          searchParams={searchParams}
          onSearchChange={onSearchChange}
          onSubmitSearch={onSubmitSearch}
          selectedCar={selectedCar}
          onSelectCar={setSelectedCar}
          selectedPickup={selectedPickup}
          onSelectPickup={setSelectedPickup}
          selectedDriverOption={selectedDriverOption}
          onSelectDriverOption={setSelectedDriverOption}
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />

        {/* 3. Galeri Mockup List Visual Interaktif untuk Cars, Packages, dan Experiences */}
        <HeroConciergeShowcase
          activeTab={activeTab}
          selectedCarId={selectedCar?.id}
          onSelectCar={(car) => {
            setSelectedCar(car);
            const searchFormEl = document.getElementById('searchForm');
            if (searchFormEl) {
              searchFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onSelectExperience={(exp) => setSelectedExperience(exp)}
        />

        {/* 4. 4 Pilar Kepercayaan (Trust Strip) untuk Stays */}
        {activeTab === 'stays' && (
          <div className="trust-strip">
            <div className="ts">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2B073" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <div>
                <b>Every villa has a private pool</b>
                Cleaned and inspected before you arrive
              </div>
            </div>

            <div className="ts">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2B073" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <b>Verified in person</b>
                Every bedroom, bathroom & amenity checked
              </div>
            </div>

            <div className="ts">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2B073" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <div>
                <b>Clear cancellation</b>
                Fair terms so you can plan with ease
              </div>
            </div>

            <div className="ts">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2B073" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div>
                <b>Dedicated local team</b>
                On call 7 days a week in Bali
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
