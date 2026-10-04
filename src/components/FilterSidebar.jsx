import React from 'react';
import { formatUSD } from '../data/villasData';

/**
 * Komponen FilterSidebar
 * Menampilkan panel bilah samping (sidebar) berisi kontrol filter lengkap:
 * - Rentang batas harga per malam (slider)
 * - Pilihan kategori villa (Standard, Deluxe, Premium, Honeymoon)
 * - Fasilitas khusus (Amenities)
 * - Batas rating kepuasan tamu
 * - Opsi khusus pembatalan gratis (Free cancellation)
 * - Tombol Reset semua filter
 * 
 * @param {Object} props
 * @param {Object} props.filters - State data filter saat ini
 * @param {Function} props.onFilterChange - Callback saat ada perubahan nilai filter
 * @param {Function} props.onResetFilters - Callback untuk mengembalikan filter ke kondisi awal
 */
export default function FilterSidebar({ filters, onFilterChange, onResetFilters }) {
  /**
   * Menangani perubahan slider batas harga per malam
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event perubahan input range
   */
  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    onFilterChange({ ...filters, maxPrice: newPrice });
  };

  /**
   * Menangani pemilihan atau pembatalan checkbox kategori villa
   * @param {string} category - Nama kategori villa ('Deluxe', 'Premium', dll)
   */
  const handleCategoryToggle = (category) => {
    const currentCategories = [...filters.categories];
    const index = currentCategories.indexOf(category);
    if (index > -1) {
      currentCategories.splice(index, 1);
    } else {
      currentCategories.push(category);
    }
    onFilterChange({ ...filters, categories: currentCategories });
  };

  /**
   * Menangani pemilihan atau pembatalan checkbox fasilitas (amenities)
   * @param {string} amenity - Nama fasilitas ('Private pool', 'Full kitchen', dll)
   */
  const handleAmenityToggle = (amenity) => {
    const currentAmenities = [...filters.amenities];
    const index = currentAmenities.indexOf(amenity);
    if (index > -1) {
      currentAmenities.splice(index, 1);
    } else {
      currentAmenities.push(amenity);
    }
    onFilterChange({ ...filters, amenities: currentAmenities });
  };

  /**
   * Menangani pemilihan radio button untuk minimum skor rating
   * @param {number} minRating - Nilai rating minimum (0, 4.0, 4.5, 4.9)
   */
  const handleRatingChange = (minRating) => {
    onFilterChange({ ...filters, minRating });
  };

  /**
   * Menangani toggle switch untuk opsi 'Hanya pembatalan gratis'
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event perubahan checkbox
   */
  const handleFreeCancelToggle = (e) => {
    onFilterChange({ ...filters, freeCancelOnly: e.target.checked });
  };

  const CATEGORY_OPTIONS = ['Standard', 'Deluxe', 'Premium', 'Honeymoon'];
  const AMENITY_OPTIONS = [
    'Private pool',
    'Full kitchen',
    'Daily staff',
    'Pet friendly',
    'Near the beach'
  ];

  return (
    <aside className="filters">
      {/* 1. Filter Rentang Harga Per Malam */}
      <div>
        <div className="filter-title">Price range / night</div>
        <input 
          type="range" 
          min="50" 
          max="600" 
          value={filters.maxPrice} 
          className="filter-range" 
          onChange={handlePriceChange}
        />
        <div className="range-labels">
          <span>$50</span>
          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Up to {formatUSD(filters.maxPrice)}</span>
          <span>$600+</span>
        </div>
      </div>

      {/* 2. Filter Kategori Villa */}
      <div>
        <div className="filter-title">Villa category</div>
        {CATEGORY_OPTIONS.map((cat) => (
          <label key={cat} className="check-row">
            <input 
              type="checkbox" 
              checked={filters.categories.includes(cat)} 
              onChange={() => handleCategoryToggle(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* 3. Filter Fasilitas (Amenities) */}
      <div>
        <div className="filter-title">Amenities</div>
        {AMENITY_OPTIONS.map((amenity) => (
          <label key={amenity} className="check-row">
            <input 
              type="checkbox" 
              checked={filters.amenities.includes(amenity)} 
              onChange={() => handleAmenityToggle(amenity)}
            />
            {amenity}
          </label>
        ))}
      </div>

      {/* 4. Filter Minimum Rating Ulasan */}
      <div className="star-row">
        <div className="filter-title">Minimum rating</div>
        <label>
          <input 
            type="radio" 
            name="ratingFilter" 
            checked={filters.minRating === 4.9} 
            onChange={() => handleRatingChange(4.9)}
          />
          <span>★★★★★ (4.9+)</span>
        </label>
        <label>
          <input 
            type="radio" 
            name="ratingFilter" 
            checked={filters.minRating === 4.8} 
            onChange={() => handleRatingChange(4.8)}
          />
          <span>★★★★ &amp; up (4.8+)</span>
        </label>
        <label>
          <input 
            type="radio" 
            name="ratingFilter" 
            checked={filters.minRating === 0} 
            onChange={() => handleRatingChange(0)}
          />
          <span>All ratings</span>
        </label>
      </div>

      {/* 5. Toggle Pembatalan Gratis Saja */}
      <label className="toggle-row">
        <span>Free cancellation only</span>
        <input 
          type="checkbox" 
          checked={filters.freeCancelOnly} 
          onChange={handleFreeCancelToggle}
        />
      </label>

      {/* 6. Tombol Aksi Filter */}
      <button 
        type="button" 
        className="apply-btn btn-primary"
        onClick={() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Apply Filters
      </button>

      <button 
        type="button" 
        className="reset-btn"
        onClick={onResetFilters}
      >
        Reset all filters
      </button>
    </aside>
  );
}
