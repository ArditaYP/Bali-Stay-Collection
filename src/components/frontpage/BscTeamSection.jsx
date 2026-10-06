import React from 'react';
import { TEAM_MEMBERS } from '../../data/bscVillasData';

/**
 * Komponen BscTeamSection
 * Menampilkan seksi tim lokal Bali Stay Collection 'The people behind your stay'
 * sesuai bsc-frontpage_1.html.
 * 
 * @returns {React.JSX.Element} Elemen JSX profil tim
 */
export default function BscTeamSection() {
  const members = TEAM_MEMBERS || [
    { initials: 'KW', name: 'Ketut Wiratama', role: 'Founder & Villa Manager' },
    { initials: '[ ]', name: '[Name]', role: 'Guest Relations' },
    { initials: '[ ]', name: '[Name]', role: 'Operations & Housekeeping' },
    { initials: '[ ]', name: '[Name]', role: 'Villa Inspector' }
  ];

  return (
    <section className="sec" id="team" style={{ background: '#fff', borderBlock: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Our team</div>
          <h2>The people behind your stay</h2>
          <p>Real names, real faces, based in Bali. Replace the placeholders below with your team.</p>
        </div>

        <div className="team">
          {members.map((person, idx) => (
            <div key={idx} className="person">
              <div className="avatar">{person.initials}</div>
              <b>{person.name}</b>
              <span>{person.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
