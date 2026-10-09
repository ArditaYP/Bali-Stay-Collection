import React from 'react';
import { DESTINATIONS_SUMMARY, PALETTE, BSC_VILLAS } from '../../data/bscVillasData';
import { formatBscMoney } from '../../utils/bscFormat';

/**
 * Komponen BscDestinations
 * Menampilkan seksi 'Explore by destination' persis sesuai format kotak resmi bsc-frontpage_1.html:
 * - Struktur kotak kartu dcard seragam (3 kolom desktop, 2 kolom tablet, 1 kolom mobile)
 * - Foto autentik dimuat cepat dengan prioritas tinggi dan fallback otomatis
 * - Lapisan gradasi kontras lembut melindungi keterbacaan teks putih
 * - Teks judul area bold (b) dan ringkasan villa serta harga (small) di sudut bawah kartu
 * 
 * @param {Object} props
 * @param {Object[]} [props.villas=[]] - Seluruh daftar master villa untuk menghitung statistik area
 * @param {string} [props.currency='USD'] - Mata uang aktif ('USD' atau 'IDR')
 * @param {Function} [props.onSelectArea] - Callback saat user mengklik salah satu kartu area
 * @param {Function} [props.onSelectDestination] - Alias callback saat user mengklik kartu area
 * @returns {React.JSX.Element} Elemen JSX Destinasi BSC
 */
export default function BscDestinations({
  villas = [],
  currency = 'USD',
  onSelectArea,
  onSelectDestination,
  destinationsData = null
}) {
  const activeVillas = (villas && villas.length > 0) ? villas : BSC_VILLAS;

  // Gunakan data dinamis jika tersedia, atau fallback ke DESTINATIONS_SUMMARY resmi
  const destinationsList = (destinationsData && destinationsData.length > 0)
    ? DESTINATIONS_SUMMARY.map(defaultDest => {
        const custom = destinationsData.find(d => (d.name === defaultDest.name || d.title === defaultDest.name || d.id === defaultDest.name));
        return custom ? { ...defaultDest, ...custom, image: custom.image || defaultDest.image } : defaultDest;
      })
    : DESTINATIONS_SUMMARY;

  /**
   * Menangani klik pada kartu destinasi:
   * Meneruskan nama area ke filter katalog dan menggulir halus ke seksi villas
   * @param {string} areaName - Nama area yang dipilih
   * @returns {void}
   */
  const handleCardClick = (areaName) => {
    const callback = onSelectDestination || onSelectArea;
    if (typeof callback === 'function') {
      callback(areaName);
    }
    const villasEl = document.getElementById('villas');
    if (villasEl) {
      villasEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="sec" id="destinations">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Explore</div>
          <h2>Explore by destination</h2>
          <p>Choose the feel of your stay, then browse the villas. Tap an area to filter.</p>
        </div>

        {/* Grid Destinasi Sesuai Format Kotak Asli bsc-frontpage_1.html */}
        <div className="dest" id="destGrid">
          {destinationsList.map((dest) => {
            const areaVillas = activeVillas.filter(v => v.area === dest.name);
            const count = areaVillas.length || dest.count;
            const pricedVillas = areaVillas.filter(v => v.price && v.price > 0);
            const minPrice = pricedVillas.length > 0
              ? Math.min(...pricedVillas.map(v => v.price))
              : null;

            const tone = PALETTE[dest.name] || dest.tone || ['#CBB9C9', '#E9DCE6'];
            const imgSrc = dest.image || dest.fallback;

            return (
              <button
                key={dest.name}
                type="button"
                className={`dcard ${dest.layout === 'wide' ? 'dcard-wide' : dest.layout === 'full' ? 'dcard-full' : 'dcard-norm'}`}
                data-area={dest.name}
                onClick={() => handleCardClick(dest.name)}
                aria-label={`Explore ${count} villas in ${dest.name}`}
                style={{
                  backgroundColor: tone[0] || '#CBB9C9'
                }}
              >
                {imgSrc && (
                  <>
                    {dest.objectFit === 'contain' && (
                      <img
                        src={imgSrc}
                        alt=""
                        aria-hidden="true"
                        className="dcard-img-blur"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'blur(24px) brightness(0.65)',
                          transform: 'scale(1.15)',
                          zIndex: 0,
                          pointerEvents: 'none'
                        }}
                      />
                    )}
                    <img
                      src={imgSrc}
                      alt={`${dest.name}, Bali`}
                      className="dcard-img"
                      style={{
                        ...(dest.objectPosition ? { objectPosition: dest.objectPosition } : {}),
                        ...(dest.objectFit ? { objectFit: dest.objectFit } : {}),
                        ...(dest.objectFit === 'contain' ? { zIndex: 1 } : {})
                      }}
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                      onError={(e) => {
                        if (dest.fallback && e.currentTarget.src !== dest.fallback) {
                          e.currentTarget.src = dest.fallback;
                        }
                      }}
                    />
                  </>
                )}
                <div className="dcard-overlay" />
                <div className="dcard-body">
                  <b>{dest.name}</b>
                  <small>
                    {count} {count === 1 ? 'villa' : 'villas'} &middot;{' '}
                    {minPrice ? (
                      <>from <strong>{formatBscMoney(minPrice, currency)}</strong> / night</>
                    ) : (
                      'Deluxe to Luxury'
                    )}
                  </small>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
