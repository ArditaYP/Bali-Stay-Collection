import React, { useMemo } from 'react';
import { formatUSD } from '../data/villasData';

/**
 * ID default dari 5 villa unggulan pilihan tamu:
 * 2 Villa teratas (Baris Atas: 50% - 50%) + 3 Villa berikutnya (Baris Bawah: 33.3% rata)
 */
const DEFAULT_PREFERRED_VILLA_IDS = [
  'st-lau-ubud',
  'iconic-cliff-top-villa',
  'the-palms-villa-canggu',
  'angkasa-ubud',
  'villa-samudra-canggu'
];

/**
 * Komponen TopPreferredVillas
 * Menampilkan seksi '5 Most Prefer Villa By Guests' sesuai format tambahan 1.png:
 * - Baris Atas: 2 Kartu Besar Asimetris (50% - 50%)
 * - Baris Bawah: 3 Kartu Sedang (33.3% - 33.3% - 33.3%)
 * - Dilengkapi badge nama lokasi di kiri atas, rating bintang, harga per malam, dan transisi hover mewah.
 * - Responsif: Pada layar ponsel bertransformasi menjadi swipeable carousel horizontal yang halus.
 * - Modular: Sangat mudah dipindahkan posisinya (ke atas/bawah) di ExplorePage.jsx.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Seluruh daftar objek villa
 * @param {Function} props.onSelectVilla - Callback saat salah satu villa diklik untuk membuka detail
 * @param {string} [props.title] - Judul seksi (default: '5 Most Prefer Villa By Guests')
 * @param {string} [props.subtitle] - Subjudul seksi
 * @param {string[]} [props.villaIds] - Urutan 5 ID villa yang ingin ditampilkan
 * @returns {React.JSX.Element} Elemen JSX seksi 5 villa paling disukai tamu
 */
export default function TopPreferredVillas({
  villas = [],
  onSelectVilla,
  title = '5 Most Prefer Villa By Guests',
  subtitle = 'Top-rated luxury sanctuaries most loved and highly reviewed by our guests',
  villaIds = DEFAULT_PREFERRED_VILLA_IDS
}) {
  /**
   * Menyiapkan 5 data villa terpilih dengan data fallback jika ada ID yang tidak cocok
   */
  const preferredVillas = useMemo(() => {
    if (!villas || villas.length === 0) return [];
    
    // Ambil villa sesuai daftar ID yang ditentukan
    const selected = villaIds
      .map((id) => villas.find((v) => v.id === id))
      .filter(Boolean);

    // Jika kurang dari 5, lengkapi dengan villa berating tertinggi
    if (selected.length < 5) {
      const remaining = villas
        .filter((v) => !selected.some((s) => s.id === v.id))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));
      selected.push(...remaining.slice(0, 5 - selected.length));
    }

    return selected.slice(0, 5);
  }, [villas, villaIds]);

  if (preferredVillas.length < 5) {
    return null;
  }

  // 2 Villa Baris Atas (Ukuran Besar 50% - 50%)
  const topPair = preferredVillas.slice(0, 2);
  // 3 Villa Baris Bawah (Ukuran Sedang 33.3% x 3)
  const bottomTrio = preferredVillas.slice(2, 5);

  /**
   * Menangani klik kartu villa untuk membuka rincian
   * @param {string} villaId - ID villa yang diklik
   * @returns {void}
   */
  const handleCardClick = (villaId) => {
    if (typeof onSelectVilla === 'function') {
      onSelectVilla(villaId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Render kartu villa individual dengan styling visual sesuai format tambahan 1.png
   * @param {Object} villa - Objek data villa
   * @param {string} sizeVariant - Varian ukuran ('large' atau 'medium')
   * @param {number} index - Urutan index kartu (1 s/d 5)
   * @returns {React.JSX.Element} Kartu villa
   */
  const renderCard = (villa, sizeVariant = 'medium', index = 0) => {
    const bgImage = villa.images?.[0] || '';
    const cleanLocation = villa.location || 'Bali';

    return (
      <div
        key={villa.id}
        className={`preferred-card preferred-card-${sizeVariant}`}
        onClick={() => handleCardClick(villa.id)}
        role="button"
        tabIndex={0}
        title={`${villa.name} - Klik untuk melihat detail villa`}
      >
        {/* Gambar Latar Belakang Villa */}
        <div 
          className="preferred-card-bg"
          style={{ backgroundImage: `url('${bgImage}')`, backgroundColor: villa.cardBg || '#242220' }}
        />

        {/* Lapisan Gradien Bayangan Gelap untuk Keterbacaan Teks */}
        <div className="preferred-card-overlay" />

        {/* Badge Lokasi & Bendera di Pojok Kiri Atas (Persis format tambahan 1.png) */}
        <div className="preferred-badge-top">
          <span className="preferred-badge-location">
            {cleanLocation}
          </span>
          <span className="preferred-badge-flag">🇮🇩</span>
          <span className="preferred-badge-rating">
            ★ {villa.rating?.toFixed(2) || '4.95'}
          </span>
        </div>

        {/* Info Villa di Bagian Bawah Kartu */}
        <div className="preferred-card-bottom">
          <div className="preferred-card-title-wrap">
            <h3 className="preferred-card-name">
              {villa.name}
            </h3>
            <p className="preferred-card-subtitle">
              {villa.guests} guests &middot; {villa.beds} beds &middot; {villa.bathrooms} baths
            </p>
          </div>
          <div className="preferred-card-price-tag">
            <span className="preferred-price-amt">{formatUSD(villa.price)}</span>
            <span className="preferred-price-unit">/ night</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="preferred-villas-section" id="preferred-villas">
      <div className="preferred-inner">
        {/* Header Judul Seksi Sesuai Perintah Bos */}
        <div className="preferred-header">
          <div>
            <span className="section-kicker">Guest Favorites &middot; Top Curated</span>
            <h2 className="preferred-title">{title}</h2>
            <p className="preferred-sub">{subtitle}</p>
          </div>
        </div>

        {/* Layout Grid Asimetris: 2 Baris Atas + 3 Baris Bawah */}
        <div className="preferred-grid-wrapper">
          {/* Baris Atas: 2 Kartu Besar (50% - 50%) */}
          <div className="preferred-row-top">
            {topPair.map((villa, idx) => renderCard(villa, 'large', idx))}
          </div>

          {/* Baris Bawah: 3 Kartu Sedang (33.3% x 3) */}
          <div className="preferred-row-bottom">
            {bottomTrio.map((villa, idx) => renderCard(villa, 'medium', idx + 2))}
          </div>
        </div>
      </div>
    </section>
  );
}
