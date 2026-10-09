import React, { useMemo } from 'react';
import { DESTINATIONS_SUMMARY, PALETTE, BSC_VILLAS } from '../../data/bscVillasData';

/**
 * Memeriksa apakah suatu villa berlokasi di dalam destinasi target
 * @param {Object} villa - Objek data villa
 * @param {string} destName - Nama destinasi (misal: 'Canggu & Berawa', 'Pererenan', 'Uluwatu & Bukit')
 * @returns {boolean}
 */
const isVillaInDestination = (villa, destName) => {
  if (!villa || !destName) return false;
  const target = destName.trim().toLowerCase();
  const villaArea = (villa.area || villa.location || '').trim().toLowerCase();
  const villaAddr = (villa.address || '').trim().toLowerCase();
  const villaId = (villa.id || '').trim().toLowerCase();
  const villaName = (villa.name || '').trim().toLowerCase();

  // 1. Pencocokan langsung melalui area (abaikan kata generik 'bali')
  if (villaArea && villaArea !== 'bali') {
    if (villaArea === target) return true;

    // Pencocokan nama gabungan dengan '&' (misal: "canggu & berawa", "uluwatu & bukit")
    const subAreas = target.split('&').map(s => s.trim().toLowerCase());
    for (const sub of subAreas) {
      if (villaArea === sub || villaArea.includes(sub) || sub.includes(villaArea)) {
        return true;
      }
    }

    // Sub-wilayah terkenal (misal: Bingin / Balangan -> Uluwatu & Bukit)
    if (target.includes('uluwatu') || target.includes('bukit')) {
      if (villaArea.includes('bingin') || villaArea.includes('balangan') || villaArea.includes('padang')) {
        return true;
      }
    }
  }

  // 2. Pencocokan pengaman melalui alamat lengkap, ID villa, atau nama
  if (target === 'ubud') {
    return villaAddr.includes('ubud') || villaId.includes('ubud') || villaName.includes('ubud') || villaId.includes('surga');
  }
  if (target.includes('pererenan')) {
    return villaAddr.includes('pererenan') || villaId.includes('pererenan') || villaName.includes('pererenan') || villaId.includes('terra') || villaId.includes('habitas');
  }
  if (target.includes('canggu') || target.includes('berawa')) {
    return villaAddr.includes('canggu') || villaAddr.includes('berawa') || villaId.includes('canggu') || villaId.includes('berawa') || villaName.includes('canggu') || villaName.includes('berawa');
  }
  if (target.includes('uluwatu') || target.includes('bukit')) {
    return villaAddr.includes('uluwatu') || villaAddr.includes('bukit') || villaAddr.includes('balangan') || villaAddr.includes('bingin') || villaId.includes('cliff') || villaId.includes('bingin') || villaId.includes('uluwatu');
  }
  if (target.includes('umalas') || target.includes('seminyak')) {
    return villaAddr.includes('umalas') || villaAddr.includes('seminyak') || villaId.includes('umalas') || villaId.includes('seminyak') || villaName.includes('umalas') || villaName.includes('seminyak');
  }
  if (target.includes('seseh')) {
    return villaAddr.includes('seseh') || villaId.includes('seseh') || villaName.includes('seseh');
  }

  return false;
};

/**
 * Komponen BscDestinations
 * Menampilkan seksi 'Explore by destination' persis sesuai format kotak resmi:
 * - Struktur kotak kartu dcard seragam (3 kolom desktop, 2 kolom tablet, 1 kolom mobile)
 * - Foto autentik dimuat cepat dengan prioritas tinggi dan fallback otomatis
 * - Lapisan gradasi kontras lembut melindungi keterbacaan teks putih
 * - Teks judul area bold (b) dan jumlah villa dinamis tanpa harga (small)
 * 
 * @param {Object} props
 * @param {Object[]} [props.villas=[]] - Seluruh daftar master villa untuk menghitung statistik area dinamis
 * @param {string} [props.currency='USD'] - Mata uang aktif
 * @param {Function} [props.onSelectArea] - Callback saat user mengklik salah satu kartu area
 * @param {Function} [props.onSelectDestination] - Alias callback saat user mengklik kartu area
 * @param {Object[]} [props.destinationsData=null] - Data kustom destinasi jika ada
 * @returns {React.JSX.Element} Elemen JSX Destinasi BSC
 */
export default function BscDestinations({
  villas = [],
  _currency = 'USD',
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

  // Hitung jumlah villa secara dinamis per destinasi berdasarkan data aktif terkini
  const destinationCounts = useMemo(() => {
    const counts = {};
    destinationsList.forEach(dest => {
      const matched = activeVillas.filter(v => isVillaInDestination(v, dest.name));
      counts[dest.name] = matched.length;
    });
    return counts;
  }, [activeVillas, destinationsList]);

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
            const count = destinationCounts[dest.name] ?? (activeVillas.filter(v => isVillaInDestination(v, dest.name)).length || dest.count || 0);
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
                    {count} {count === 1 ? 'villa' : 'villas'}
                    {dest.badge ? ` · ${dest.badge.replace(/^[★✦]\s*/, '')}` : ''}
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
