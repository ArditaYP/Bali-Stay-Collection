import React from 'react';

/**
 * Basis data 4 layanan pengalaman tambahan (Beyond the Stay Experiences)
 * Diambil langsung dari berkas referensi bali-stay-collection.html
 */
const EXPERIENCES_DATA = [
  {
    id: 'airport-transfer',
    title: 'Airport Transfer',
    description: 'Private arrival and departure service.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=84'
  },
  {
    id: 'private-chef',
    title: 'Private Chef',
    description: 'Breakfast, dinner and special occasions.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=84'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    description: 'In-villa massage, yoga and spa rituals.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=84'
  },
  {
    id: 'explore-bali',
    title: 'Explore Bali',
    description: 'Drivers, day trips and local experiences.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=84'
  }
];

/**
 * Komponen Experiences
 * Menampilkan modul seksi 'Beyond the stay' (id="experiences")
 * sesuai dengan rancangan asli pada berkas bali-stay-collection.html:
 * - Kicker: 'Beyond the stay'
 * - Judul: 'Make Bali part of the villa.'
 * - Deskripsi lead pengantar layanan tambahan
 * - Grid 4 kartu pengalaman mewah (Airport Transfer, Private Chef, Wellness, Explore Bali)
 * 
 * @returns {React.JSX.Element} Elemen JSX seksi experiences
 */
export default function Experiences() {
  return (
    <section className="section alt experiences-section" id="experiences">
      <div className="container experiences-inner">
        {/* Header Seksi Pengalaman */}
        <div className="section-head experiences-head">
          <div>
            <div className="section-kicker">Beyond the stay</div>
            <h2 className="experiences-title">Make Bali part of the villa.</h2>
          </div>
          <p className="lead experiences-lead">
            Turn every reservation into a richer guest experience with optional services that can be added before arrival.
          </p>
        </div>

        {/* Grid 4 Kartu Pengalaman */}
        <div className="experience-grid">
          {EXPERIENCES_DATA.map((item) => (
            <div
              key={item.id}
              className="experience"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
