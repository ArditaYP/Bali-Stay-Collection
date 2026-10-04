import React from 'react';
import { formatUSD } from '../data/villasData';

/**
 * Komponen VillaCard
 * Menampilkan kartu ringkasan satu properti villa pada daftar hasil pencarian.
 * Termasuk foto thumbnail, badge kategori, tombol wishlist (heart), detail kamar, rating bintang,
 * fasilitas unggulan, harga per malam, dan tombol View Details.
 * 
 * @param {Object} props
 * @param {Object} props.villa - Objek data villa
 * @param {Function} props.onSelectVilla - Callback ketika kartu atau tombol View Details diklik
 * @param {boolean} props.isSaved - Menandakan apakah villa ini ada di daftar wishlist pengguna
 * @param {Function} props.onToggleSave - Callback saat tombol hati (wishlist) diklik
 */
export default function VillaCard({ villa, onSelectVilla, isSaved, onToggleSave }) {
  /**
   * Menangani klik pada tombol hati untuk menambah atau menghapus villa dari wishlist
   * Mencegah event bubbling agar tidak memicu pembukaan halaman detail villa secara tidak sengaja
   * @param {React.MouseEvent} e - Event klik mouse
   */
  const handleHeartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof onToggleSave === 'function') {
      onToggleSave(villa.id);
    }
  };

  /**
   * Menangani klik pada seluruh kartu untuk membuka halaman detail villa
   */
  const handleCardClick = () => {
    if (typeof onSelectVilla === 'function') {
      onSelectVilla(villa.id);
    }
  };

  return (
    <div 
      className="result-card card" 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      title={`Lihat detail ${villa.name}`}
    >
      {/* Kolom Kiri: Thumbnail Foto Villa & Tombol Heart */}
      <div 
        className="result-thumb" 
        style={{ backgroundColor: villa.cardBg }}
      >
        <img 
          src={villa.images[0]} 
          alt={villa.name} 
          loading="lazy"
        />
        {/* Tombol Wishlist / Favorite */}
        <button 
          type="button" 
          className={`heart-btn ${isSaved ? 'active' : ''}`}
          onClick={handleHeartClick}
          aria-label={isSaved ? "Hapus dari favorit" : "Simpan ke favorit"}
        >
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 24 24" 
            fill={isSaved ? "#E4572E" : "none"} 
            stroke={isSaved ? "#E4572E" : "#141413"} 
            strokeWidth="2"
          >
            <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
          </svg>
        </button>

        {/* Badge Kategori Villa */}
        <span className="cat-badge">{villa.category}</span>
      </div>

      {/* Kolom Kanan: Rincian Info, Rating, dan Harga */}
      <div className="result-body">
        <div className="result-top">
          <div>
            <div className="result-name">{villa.name}</div>
            <div className="result-meta">
              {villa.location} &middot; {villa.beds} bed &middot; {villa.guests} guests
            </div>
          </div>
          {/* Skor Rating dan Jumlah Ulasan */}
          <div className="result-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#141413">
              <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
            </svg>
            {villa.rating} <span>({villa.reviewsCount})</span>
          </div>
        </div>

        {/* Deskripsi Singkat Villa */}
        <p className="result-desc">{villa.shortDesc}</p>

        {/* Tag Fasilitas Unggulan */}
        <div className="tag-row">
          {villa.amenities.slice(0, 2).map((amenity) => (
            <span key={amenity} className="tag pill">{amenity}</span>
          ))}
          {villa.freeCancel && (
            <span className="tag free-cancel">Free reschedule</span>
          )}
        </div>

        {/* Footer Kartu: Harga per Malam & Tombol Aksi */}
        <div className="result-footer">
          <div>
            <span className="price-big">{formatUSD(villa.price)}</span>
            <span className="price-unit"> / night</span>
          </div>
          <button 
            type="button" 
            className="view-btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
