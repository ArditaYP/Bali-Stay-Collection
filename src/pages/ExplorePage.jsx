import React, { useState, useMemo } from 'react';
import HeroSearch from '../components/HeroSearch';
import Destinations from '../components/Destinations';
import FilterSidebar from '../components/FilterSidebar';
import VillaCard from '../components/VillaCard';
import WhyBookDirect from '../components/WhyBookDirect';
import ConciergeFinder from '../components/ConciergeFinder';
import TopPreferredVillas from '../components/TopPreferredVillas';
import Experiences from '../components/Experiences';

/**
 * Komponen Halaman ExplorePage (Katalog & Pencarian Villa Utama)
 * Mengimplementasikan tata letak dan fitur persis sesuai desain mockup: bali-stay-collection-booking-ui.html.
 * Telah disempurnakan dengan responsivitas adaptif penuh untuk semua resolusi layar (Mobile, Tablet, Desktop).
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Daftar master villa yang tersedia
 * @param {Function} props.onSelectVilla - Callback ketika salah satu villa dipilih untuk dilihat detailnya
 * @param {string[]} props.savedVillaIds - Array ID villa yang sedang disimpan di wishlist
 * @param {Function} props.onToggleSave - Callback untuk menambah/menghapus villa dari wishlist
 * @param {Object} props.searchParams - Parameter pencarian (lokasi, check-in, check-out, guests)
 * @param {Function} props.setSearchParams - Fungsi pengubah parameter pencarian
 */
export default function ExplorePage({
  villas = [],
  onSelectVilla,
  savedVillaIds = [],
  onToggleSave,
  searchParams,
  setSearchParams
}) {
  // State untuk filter di sidebar (default menampilkan semua villa yang tersedia)
  const [filters, setFilters] = useState({
    maxPrice: 600,
    categories: ['Standard', 'Deluxe', 'Premium', 'Luxe', 'Family', 'Retreat', 'Honeymoon'],
    amenities: [],
    minRating: 0,
    freeCancelOnly: false
  });

  // State untuk toggle filter pada tampilan mobile / tablet
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // State untuk filter kategori Airbnb yang dipilih dari bar di atas Popular Destinations
  const [activeCategory, setActiveCategory] = useState(null);

  // State untuk halaman aktif paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /**
   * Mengatur ulang seluruh filter sidebar ke nilai bawaan (default)
   */
  const handleResetFilters = () => {
    setFilters({
      maxPrice: 600,
      categories: ['Standard', 'Deluxe', 'Premium', 'Luxe', 'Family', 'Retreat', 'Honeymoon'],
      amenities: [],
      minRating: 0,
      freeCancelOnly: false
    });
    setSearchParams(prev => ({ ...prev, location: '' }));
    setActiveCategory(null);
  };

  /**
   * Menangani pemilihan kategori ikon Airbnb di atas bagian destinasi
   * @param {string} catId - ID kategori yang dipilih (misal: 'beach', 'pool')
   * @returns {void}
   */
  const handleSelectCategory = (catId) => {
    setActiveCategory(prev => (prev === catId ? null : catId));
    setCurrentPage(1);
  };

  /**
   * Memproses penyaringan daftar villa berdasarkan kombinasi pencarian hero bar dan filter sidebar
   * Menggunakan useMemo agar proses kalkulasi efisien dan reaktif
   */
  const filteredVillas = useMemo(() => {
    return villas.filter((villa) => {
      // Filter 1: Lokasi / Destinasi
      if (searchParams.location && searchParams.location.trim() !== '') {
        const queryLoc = searchParams.location.trim().toLowerCase();
        const villaLoc = villa.location.toLowerCase();
        const villaName = villa.name.toLowerCase();
        const villaAddress = (villa.address || '').toLowerCase();
        if (!villaLoc.includes(queryLoc) && !villaName.includes(queryLoc) && !villaAddress.includes(queryLoc)) {
          return false;
        }
      }

      // Filter Tambahan: Kategori Bar Airbnb (dari Vista)
      if (activeCategory) {
        if (activeCategory === 'pool') {
          const hasPool = villa.amenities.some(a => a.toLowerCase().includes('pool')) || villa.description.toLowerCase().includes('pool');
          if (!hasPool) return false;
        } else if (activeCategory === 'beach' || activeCategory === 'beachfront') {
          const hasBeach = villa.location.toLowerCase().includes('beach') || (villa.address || '').toLowerCase().includes('beach') || villa.amenities.some(a => a.toLowerCase().includes('ocean') || a.toLowerCase().includes('beach')) || villa.description.toLowerCase().includes('ocean');
          if (!hasBeach) return false;
        } else if (activeCategory === 'luxe') {
          if (villa.category !== 'Premium' && villa.category !== 'Deluxe' && villa.category !== 'Luxe') return false;
        } else if (activeCategory === 'amazingView') {
          const hasView = villa.amenities.some(a => a.toLowerCase().includes('view')) || villa.description.toLowerCase().includes('view');
          if (!hasView) return false;
        } else if (activeCategory === 'trending') {
          if (villa.rating < 4.9 && !villa.featured) return false;
        } else if (activeCategory === 'omg') {
          if (!villa.featured && villa.price < 350) return false;
        } else if (activeCategory === 'countryside' || activeCategory === 'earthhome') {
          const isUbud = villa.location.toLowerCase().includes('ubud');
          if (!isUbud) return false;
        } else if (activeCategory === 'surfing') {
          const isSurf = villa.location.toLowerCase().includes('balangan') || (villa.address || '').toLowerCase().includes('uluwatu');
          if (!isSurf) return false;
        }
      }

      // Filter 2: Kapasitas Tamu (Guests)
      if (searchParams.guests && villa.guests < searchParams.guests) {
        return false;
      }

      // Filter 3: Batas Harga Tertinggi Per Malam
      if (villa.price > filters.maxPrice) {
        return false;
      }

      // Filter 4: Kategori Villa (Deluxe, Premium, Honeymoon, dll)
      if (filters.categories.length > 0 && !filters.categories.includes(villa.category)) {
        return false;
      }

      // Filter 5: Fasilitas Unggulan (Amenities)
      if (filters.amenities.length > 0) {
        const hasAllSelectedAmenities = filters.amenities.every((amenity) =>
          villa.amenities.some(a => {
            if (amenity === 'Private pool' && a.toLowerCase().includes('pool')) return true;
            return a.toLowerCase().includes(amenity.toLowerCase());
          })
        );
        if (!hasAllSelectedAmenities) return false;
      }

      // Filter 6: Batas Minimum Rating
      if (filters.minRating > 0 && villa.rating < filters.minRating) {
        return false;
      }

      // Filter 7: Opsi Hanya Pembatalan Gratis
      if (filters.freeCancelOnly && !villa.freeCancel) {
        return false;
      }

      return true;
    });
  }, [villas, searchParams, filters, activeCategory]);

  // Kalkulasi data villa untuk paginasi
  const totalPages = Math.ceil(filteredVillas.length / itemsPerPage) || 1;
  const paginatedVillas = filteredVillas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /**
   * Menangani pemilihan destinasi dari kartu Popular Destinations
   * @param {string} destination - Nama destinasi yang dipilih (contoh: 'Canggu')
   */
  const handleSelectPopularDestination = (destination) => {
    setSearchParams(prev => ({ ...prev, location: destination }));
    setCurrentPage(1);
  };

  /**
   * Menghitung berapa banyak filter aktif yang sedang diterapkan
   * @returns {number} Jumlah filter aktif
   */
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.maxPrice < 350) count++;
    if (filters.categories.length > 0 && filters.categories.length < 4) count += filters.categories.length;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.minRating > 0) count++;
    if (filters.freeCancelOnly) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <main>
      {/* 1. Bagian Hero & Formulir Pencarian */}
      <HeroSearch 
        searchLocation={searchParams.location}
        onLocationChange={(val) => setSearchParams(prev => ({ ...prev, location: val }))}
        checkIn={searchParams.checkIn}
        onCheckInChange={(val) => setSearchParams(prev => ({ ...prev, checkIn: val }))}
        checkOut={searchParams.checkOut}
        onCheckOutChange={(val) => setSearchParams(prev => ({ ...prev, checkOut: val }))}
        guests={searchParams.guests}
        onGuestsChange={(val) => setSearchParams(prev => ({ ...prev, guests: val }))}
        onSearch={() => setCurrentPage(1)}
      />

      {/* 2. Bagian Destinasi Populer & Kategori Airbnb */}
      <Destinations 
        onSelectDestination={handleSelectPopularDestination}
        activeDestination={searchParams.location}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
      />

      {/* =========================================================================
          SEKSI: 5 MOST PREFER VILLA BY GUESTS (Format Asimetris Sesuai tambahan 1.png)
          PANDUAN PEMINDAHAN POSISI:
          - Posisi Default (Opsi 1): Di bawah Prefer Villa Destination
          - Jika ingin dipindahkan ke bawah Hasil Pencarian Villa:
            CUT blok <TopPreferredVillas ... /> ini dan PASTE ke bawah </section> hasil pencarian (baris ~360).
          - Jika ingin dipindahkan ke sebelum Concierge:
            PASTE tepat sebelum <section className="explore-finder-section">.
         ========================================================================= */}
      <TopPreferredVillas 
        villas={villas}
        onSelectVilla={onSelectVilla}
      />

      {/* 3. Bagian Hasil Pencarian & Filter Panel */}
      <section className="results" id="results-section">
        <div className="results-inner">
          {/* Header Ringkasan Pencarian */}
          <div className="results-head">
            <h2>
              {filteredVillas.length} villas available
              {searchParams.location ? ` in ${searchParams.location}` : ' across Bali'}
            </h2>
            <span className="results-sub">
              {searchParams.checkIn} – {searchParams.checkOut} &middot; {searchParams.guests} guests
            </span>
          </div>
          <p className="sort-line">
            Sorted by: <b style={{ color: 'var(--ink)' }}>Best match</b>
          </p>

          {/* Tombol Filter Khusus Mobile & Tablet */}
          <div className="mobile-filter-bar">
            <button
              type="button"
              className="mobile-filter-btn"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
              </svg>
              <span>{isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="wishlist-count-badge" style={{ fontSize: '10px', width: '16px', height: '16px' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="results-grid">
            {/* Bilah Samping Filter (Left Sidebar, responsive collapsible on mobile) */}
            <div className={isMobileFilterOpen ? 'mobile-open' : ''}>
              <div className={`filters-container ${isMobileFilterOpen ? 'mobile-show' : ''}`}>
                <FilterSidebar 
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>

            {/* Daftar Kartu Hasil Villa (Right List) */}
            <div className="result-list">
              {paginatedVillas.length > 0 ? (
                paginatedVillas.map((villa) => (
                  <VillaCard 
                    key={villa.id}
                    villa={villa}
                    onSelectVilla={onSelectVilla}
                    isSaved={savedVillaIds.includes(villa.id)}
                    onToggleSave={onToggleSave}
                  />
                ))
              ) : (
                <div style={{
                  padding: '48px 24px',
                  textAlign: 'center',
                  background: 'var(--bg)',
                  borderRadius: '16px',
                  border: '1px dashed var(--line)'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
                    No villas match your exact filters
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                    Coba sesuaikan batas harga per malam atau hapus beberapa kriteria fasilitas.
                  </p>
                  <button 
                    type="button" 
                    className="btn-primary" 
                    onClick={handleResetFilters}
                    style={{ padding: '10px 20px', borderRadius: '8px' }}
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              {/* Baris Paginasi Halaman */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    type="button" 
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    aria-label="Halaman sebelumnya"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8779" strokeWidth="2.3">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        className={`page-btn ${currentPage === pageNum ? 'active btn-primary' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button 
                    type="button" 
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    aria-label="Halaman selanjutnya"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8779" strokeWidth="2.3">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Matching Finder ("Not sure which villa?") */}
      <section className="explore-finder-section" id="finder">
        <div className="explore-finder-inner">
          <ConciergeFinder 
            allVillas={villas}
            onSelectVilla={onSelectVilla}
          />
        </div>
      </section>

      {/* 4. Bagian Layanan Pengalaman Tambahan ("Beyond the stay" - sesuai bali-stay-collection.html) */}
      <Experiences />

      {/* 4. Bagian Edukasi Direct Booking */}
      <WhyBookDirect />
    </main>
  );
}
