import React from 'react';
import { formatBscMoney } from '../../utils/bscFormat';

/**
 * Komponen BscTopPicks
 * Menampilkan seksi rekomendasi terkurasi 'Our top picks' (9 villa pilihan terbaik):
 * - Kicker: Our top picks
 * - Judul: Villas our team would book for their own family
 * - Deskripsi: Chosen by us, with the reason why. New to BSC, so we show our inspection notes instead of star ratings.
 * - Menampilkan 9 villa terkurasi dalam grid 3x3 yang rapi dan simetris,
 *   lengkap dengan foto asli Airbnb, alasan kurasi inspeksi, lencana status, harga, dan tombol 'View villa'.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Seluruh daftar master villa
 * @param {string} props.currency - Mata uang aktif ('USD' atau 'IDR')
 * @param {number} props.nights - Jumlah malam yang dipilih
 * @param {string[]} props.savedVillaIds - Daftar ID villa yang disimpan di wishlist
 * @param {Function} props.onToggleSave - Callback saat tombol wishlist love diklik
 * @param {Function} props.onSelectVilla - Callback saat tombol 'View villa' diklik untuk membuka detail
 * @returns {React.JSX.Element} Elemen JSX Top Picks BSC
 */
export default function BscTopPicks({
  villas = [],
  currency = 'USD',
  nights = 0,
  savedVillaIds = [],
  onToggleSave,
  onSelectVilla
}) {
  // Filter villa yang ditandai sebagai pick: true (mengecualikan Villa Habitas) dan membatasi tepat 9 villa
  const topPickedVillas = React.useMemo(() => {
    const picked = villas.filter(v => v.pick && v.id !== 'villa-habitas');
    if (picked.length >= 9) return picked.slice(0, 9);
    const others = villas.filter(v => !v.pick && v.id !== 'villa-habitas' && v.img);
    return [...picked, ...others].slice(0, 9);
  }, [villas]);

  return (
    <section className="sec" id="picks">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Our top picks</div>
          <h2>Villas our team would book for their own family</h2>
          <p>
            Chosen by us, with the reason why. New to BSC, so we show our inspection notes instead of star ratings.
          </p>
        </div>

        <div className="grid-picks">
          {topPickedVillas.map((villa) => {
            const isSaved = savedVillaIds.includes(villa.id);
            const bgStyle = villa.img 
              ? { backgroundImage: `url('${villa.img}')` }
              : { background: `linear-gradient(135deg, ${(villa.tone && villa.tone[0]) || '#CBB9C9'}, ${(villa.tone && villa.tone[1]) || '#E9DCE6'})` };

            return (
              <article key={villa.id} className="pick">
                {/* Foto / Visual Villa */}
                <div 
                  className="ph" 
                  style={bgStyle}
                  onClick={() => onSelectVilla(villa.id)}
                  role="button"
                  tabIndex={0}
                  title={`Lihat detail ${villa.name}`}
                >
                  <span className="tag">{villa.tier}</span>
                  
                  {/* Tombol Wishlist Love */}
                  <button
                    type="button"
                    className="heart"
                    aria-pressed={isSaved}
                    aria-label={`Simpan ${villa.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (typeof onToggleSave === 'function') {
                        onToggleSave(villa.id);
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? '#E4572E' : 'none'} stroke={isSaved ? '#E4572E' : '#141413'} strokeWidth="2">
                      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
                    </svg>
                  </button>
                </div>

                {/* Konten & Ulasan Inspeksi */}
                <div className="pbody">
                  <h3 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelectVilla(villa.id)}
                  >
                    {villa.name}
                  </h3>
                  <div className="meta">
                    {villa.area} &middot; {villa.beds} bed &middot; {villa.guests} guests
                  </div>

                  {villa.why && (
                    <p className="why">
                      <b>Why we picked it:</b> {villa.why}
                    </p>
                  )}

                  {/* Lencana Verifikasi Inspeksi */}
                  <div className="badges">
                    <span className="bdg new">New on BSC</span>
                    {villa.verified ? (
                      <span className="bdg ok">Inspected {villa.updated || 'Oct 2026'}</span>
                    ) : (
                      <span className="bdg">Inspection pending</span>
                    )}
                    {villa.cancel && (
                      <span className="bdg">{villa.cancel}</span>
                    )}
                  </div>

                  {/* Baris Harga & Aksi Buka Villa */}
                  <div className="price-row">
                    <div>
                      <div className="pr">
                        <span>{formatBscMoney(villa.price || 280, currency)}</span>{' '}
                        <small>/ night</small>
                      </div>
                      {nights > 0 && (
                        <div className="total">
                          {formatBscMoney((villa.price || 280) * nights, currency)} total for {nights} night{nights > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => onSelectVilla(villa.id)}
                    >
                      View villa
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
