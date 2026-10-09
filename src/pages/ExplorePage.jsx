import React, { useState, useEffect, useMemo } from 'react';
import '../components/frontpage/bscFrontpage.css';
import { BSC_VILLAS, DESTINATIONS_SUMMARY } from '../data/bscVillasData';
import { calculateNights } from '../utils/bscFormat';

import BscNavbar from '../components/frontpage/BscNavbar';
import BscHero from '../components/frontpage/BscHero';
import BscDestinations from '../components/frontpage/BscDestinations';
import BscLevels from '../components/frontpage/BscLevels';
import BscTopPicks from '../components/frontpage/BscTopPicks';
import BscVillaCatalog from '../components/frontpage/BscVillaCatalog';
import BscVerification from '../components/frontpage/BscVerification';
import BscLiveTour from '../components/frontpage/BscLiveTour';
import BscComparisonTable from '../components/frontpage/BscComparisonTable';
import BscExperiences from '../components/frontpage/BscExperiences';
import BscTeamSection from '../components/frontpage/BscTeamSection';
import BscStayPromise from '../components/frontpage/BscStayPromise';
import BscTrustInfo from '../components/frontpage/BscTrustInfo';
import BscFooter from '../components/frontpage/BscFooter';

/**
 * Komponen Halaman ExplorePage (Halaman Utama Resmi Bali Stay Collection)
 * Mengimplementasikan 100% tata letak, copywriting, filter, dan estetika
 * sesuai dengan berkas desain bsc-frontpage_1.html yang diberikan oleh Coach/Boss.
 * 
 * Terdiri dari 51 villa terkurasi, dengan 4 villa unggulan utama yang memiliki foto
 * asli Airbnb, harga per malam, dan halaman rincian detail:
 * 1. Villa Habitas (Pererenan)
 * 2. St. Lau (Ubud)
 * 3. Balangan Cliff Villa (Uluwatu & Bukit)
 * 4. Villa Angkasa (Ubud)
 * 
 * @param {Object} props
 * @param {Object[]} [props.villas] - Daftar villa (default menggunakan BSC_VILLAS)
 * @param {Function} props.onSelectVilla - Callback ketika villa dipilih untuk melihat halaman detail
 * @param {string[]} [props.savedVillaIds] - Daftar ID villa yang disimpan di wishlist
 * @param {Function} props.onToggleSave - Callback untuk menambah/menghapus villa dari wishlist
 * @param {Object} props.searchParams - Parameter pencarian (location/area, checkIn, checkOut, guests)
 * @param {Function} props.setSearchParams - Fungsi untuk memperbarui searchParams
 * @param {Function} [props.onOpenWishlist] - Callback membuka modal wishlist
 * @param {Function} [props.onOpenListVilla] - Callback membuka modal pendaftaran villa host
 * @param {string} [props.currency='USD'] - Mata uang aktif ('USD' atau 'IDR')
 * @param {Function} [props.onCurrencyChange] - Callback perubahan mata uang global
 * @returns {React.JSX.Element} Elemen JSX Halaman Utama BSC
 */
export default function ExplorePage({
  villas = BSC_VILLAS,
  onSelectVilla,
  savedVillaIds = [],
  onToggleSave,
  searchParams = { location: '', checkIn: '', checkOut: '', guests: 2 },
  setSearchParams,
  onOpenWishlist,
  onOpenListVilla,
  currency = 'USD',
  onCurrencyChange,
  onOpenEditor,
  onOpenSearch
}) {
  // State mata uang aktif dengan sinkronisasi ke prop atau fallback lokal
  const [internalCurrency, setInternalCurrency] = useState(currency);
  const activeCurrency = currency || internalCurrency;
  const handleCurrencyChange = onCurrencyChange || setInternalCurrency;

  // Menghitung jumlah malam menginap berdasarkan tanggal check-in dan check-out
  const nights = useMemo(() => {
    return calculateNights(searchParams.checkIn, searchParams.checkOut);
  }, [searchParams.checkIn, searchParams.checkOut]);

  // State media dinamis halaman depan (foto destinasi, experiences, hero)
  const [homepageMedia, setHomepageMedia] = useState(() => {
    const saved = localStorage.getItem('bsc_homepage_media');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const resp = await fetch('/BaliStayCollection/api/homepage.php');
        if (resp.ok) {
          const json = await resp.json();
          if (json.success) {
            setHomepageMedia(json);
            localStorage.setItem('bsc_homepage_media', JSON.stringify(json));
          }
        }
      } catch (e) {
        // Fallback ke localStorage atau default resmi
      }
    };
    fetchHomepage();
  }, []);

  // Daftar nama kawasan unik untuk dropdown pencarian hero
  const areas = useMemo(() => {
    const list = DESTINATIONS_SUMMARY.map(d => d.name);
    return Array.from(new Set(list));
  }, []);

  /**
   * Menangani perubahan nilai pada salah satu bidang pencarian
   * @param {string} field - Nama kolom pencarian ('location', 'area', 'checkIn', 'checkOut', 'guests')
   * @param {string|number} value - Nilai baru
   * @returns {void}
   */
  const handleSearchChange = (field, value) => {
    if (typeof setSearchParams === 'function') {
      setSearchParams(prev => ({
        ...prev,
        [field === 'area' ? 'location' : field]: value
      }));
    }
  };

  /**
   * Menangani pengiriman formulir pencarian hero dan menggulir ke katalog villa
   * @returns {void}
   */
  const handleSubmitSearch = () => {
    const el = document.getElementById('villas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Menangani pemilihan destinasi dari kartu 'Explore by destination'
   * @param {string} destination - Nama destinasi yang dipilih
   * @returns {void}
   */
  const handleSelectDestination = (destination) => {
    if (typeof setSearchParams === 'function') {
      setSearchParams(prev => ({
        ...prev,
        location: destination
      }));
    }
    const el = document.getElementById('villas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // State tingkat kemewahan yang dipilih dari kartu Levels
  const [activeTier, setActiveTier] = useState(null);

  /**
   * Menangani pemilihan tingkat kemewahan dari kartu 'From simple and stylish to full luxury'
   * @param {string} tierName - Nama tingkat kemewahan (Standard, Deluxe, Premium, Luxury)
   * @returns {void}
   */
  const handleSelectLevel = (tierName) => {
    setActiveTier(prev => (prev === tierName ? null : tierName));
    const el = document.getElementById('villas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bsc-frontpage">
      {/* 1. Topbar pengumuman dan Navbar resmi BSC */}
      <BscNavbar 
        currency={activeCurrency}
        onCurrencyChange={handleCurrencyChange}
        wishlistCount={savedVillaIds.length}
        onOpenWishlist={onOpenWishlist}
        onOpenSearch={onOpenSearch}
        searchParams={searchParams}
        onSearchChange={handleSearchChange}
        onSubmitSearch={handleSubmitSearch}
        areas={areas}
      />

      <main id="top">
        {/* 3. Hero Section dengan Form Pencarian & 4 Pilar Kepercayaan */}
        <BscHero 
          areas={areas}
          searchParams={searchParams}
          onSearchChange={handleSearchChange}
          onSubmitSearch={handleSubmitSearch}
          heroData={homepageMedia?.hero}
        />

        {/* 4. Explore by Destination */}
        <BscDestinations 
          villas={villas}
          currency={activeCurrency}
          onSelectDestination={handleSelectDestination}
          destinationsData={homepageMedia?.destinations}
        />

        {/* 5. From Simple and Stylish to Full Luxury (Levels)
        <BscLevels 
          villas={villas}
          onSelectLevel={handleSelectLevel}
        /> */}

        {/* 6. Our Top Picks (9 Villa Pilihan Terbaik) */}
        <BscTopPicks 
          villas={villas}
          currency={activeCurrency}
          nights={nights}
          savedVillaIds={savedVillaIds}
          onToggleSave={onToggleSave}
          onSelectVilla={onSelectVilla}
          searchParams={searchParams}
          onSearchParamsChange={setSearchParams}
        />

        {/* 7. All Villas: Find Your Villa (Katalog 51 Villa dengan Sidebar Filter & Paginasi) */}
        <BscVillaCatalog 
          villas={villas}
          currency={activeCurrency}
          nights={nights}
          searchParams={searchParams}
          onSearchParamsChange={setSearchParams}
          savedVillaIds={savedVillaIds}
          onToggleSave={onToggleSave}
          onSelectVilla={onSelectVilla}
          activeTier={activeTier}
        />

        {/* 8. How We Verify Every Villa (12 Poin Standar Inspeksi) */}
        <BscVerification 
          onBrowseClick={handleSubmitSearch}
        />

        {/* 9. Book a 10-Minute Live Video Tour */}
        <BscLiveTour 
          villas={villas}
        />
        {/* 10. Beyond the Stay - Experiences (Layanan Opsional Kedatangan) */}
        <BscExperiences experiencesData={homepageMedia?.experiences} />
        
        {/* 11f. Book Direct, Know Exactly Who You Are Dealing With (Tabel Perbandingan) */}
        <BscComparisonTable />

        {/* 12. The People Behind Your Stay (Tim BSC Bali) */}
        {/* <BscTeamSection /> */}

        {/* 12. The BSC Stay Promise */}
        {/* <BscStayPromise /> */}

        {/* 14. Safe & Accountable, Booking & Payment, Panduan Kedatangan & Extras, First Verified Guests */}
        <BscTrustInfo 
          onSeeVillasClick={handleSubmitSearch}
        />

        {/* 15. Legalitas Perusahaan, Footer Resmi & Tombol Mengambang WhatsApp */}
        <BscFooter 
          onOpenListVilla={onOpenListVilla}
          onOpenEditor={onOpenEditor}
        />
      </main>
    </div>
  );
}
