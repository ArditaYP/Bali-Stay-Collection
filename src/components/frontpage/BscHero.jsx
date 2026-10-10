import React, { useState } from 'react';
import ExpediaServiceTabs from './ExpediaServiceTabs';
import AirbnbSearchBar from './AirbnbSearchBar';
import { 
  CAR_FLEET_DATA, 
  MOTORBIKE_FLEET_DATA,
  PICKUP_LOCATIONS_DATA, 
  CHAUFFEUR_OPTIONS_DATA, 
  PACKAGES_DATA, 
  EXPERIENCES_DATA 
} from '../../data/bscFleetData';

/**
 * Komponen BscHero
 * Menampilkan seksi hero utama Bali Stay Collection:
 * - Kotak pencarian terpadu ala Expedia.com (Tabs di atas, Search Bar di bawah dalam 1 kotak)
 * - Tab kategori: Stay, Car, Motorbike, Packages, Thing Todo dengan garis bawah aktif (tanpa blok putih)
 * - Formulir pencarian floating capsule ala Airbnb (Where, Experience / When, Who)
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

  // State armada mobil mewah & motor terpilih
  const [selectedCar, setSelectedCar] = useState(CAR_FLEET_DATA[0]);
  const [selectedMotorbike, setSelectedMotorbike] = useState(MOTORBIKE_FLEET_DATA[0]);
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
        </div>

        {/* Kotak Widget Pencarian Terpadu (Dalam 1 Kotak ala Expedia.com) */}
        <div className="hero-search-unified-box">
          {/* 1. Tab Kategori Layanan di Atas: Stay - Car - Motorbike - Packages - Thing Todo */}
          <ExpediaServiceTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {/* 2. Formulir Pencarian Floating Capsule ala Airbnb: Where - Experience - Who */}
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
            selectedMotorbike={selectedMotorbike}
            onSelectMotorbike={setSelectedMotorbike}
          />
        </div>
      </div>
    </section>
  );
}
