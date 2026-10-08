import React from 'react';

/**
 * Komponen BscExperiences
 * Menampilkan section 'Beyond the stay - Make Bali part of the villa'
 * yang diimpor dari bali-stay-collection.html (section id="experiences").
 * 
 * Berisi 4 kartu pengalaman/layanan opsional sebelum kedatangan tamu:
 * 1. Airport Transfer
 * 2. Private Chef
 * 3. Wellness
 * 4. Explore Bali
 * 
 * @returns {React.JSX.Element} Elemen JSX Experiences
 */
export default function BscExperiences() {
  const experiences = [
    {
      title: 'Airport Transfer',
      desc: 'Private arrival and departure service.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=84'
    },
    {
      title: 'Private Chef',
      desc: 'Breakfast, dinner and special occasions.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=84'
    },
    {
      title: 'Wellness',
      desc: 'In-villa massage, yoga and spa rituals.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=84'
    },
    {
      title: 'Explore Bali',
      desc: 'Drivers, day trips and local experiences.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=84'
    }
  ];

  return (
    <section className="sec sec-experiences section alt" id="experiences">
      <div className="wrap container">
        <div className="sec-head section-head experiences-head">
          <div>
            <div className="eyebrow section-kicker">Beyond the stay</div>
            <h2>Make Bali part of the villa.</h2>
          </div>
          <p className="lead">
            Turn every reservation into a richer guest experience with optional services that can be added before arrival.
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="experience"
              style={{ backgroundImage: `url('${exp.image}')` }}
            >
              <div>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
