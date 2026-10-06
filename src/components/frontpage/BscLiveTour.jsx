import React, { useState } from 'react';
import { CONFIG } from '../../data/bscVillasData';

/**
 * Komponen BscLiveTour
 * Menampilkan seksi tur video langsung 10 menit 'Book a 10-minute live video tour'
 * lengkap dengan video player walkthrough dan formulir reservasi tur video.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Daftar villa untuk pilihan dropdown
 * @returns {React.JSX.Element} Elemen JSX live video tour
 */
export default function BscLiveTour({ villas = [] }) {
  const [selectedVilla, setSelectedVilla] = useState(villas[0]?.name || '');
  const [when, setWhen] = useState('');
  const [name, setName] = useState('');
  const [submittedNote, setSubmittedNote] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Menangani pengiriman formulir pemesanan video tour
   * @param {React.FormEvent} e - Form event
   * @returns {void}
   */
  const handleSubmitTour = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setSubmittedNote('Please enter your name so our team can greet you properly.');
      return;
    }
    setSubmittedNote(`Thank you, ${name}! We received your tour request for ${selectedVilla || 'your chosen villa'}. Our team will WhatsApp you to confirm.`);
  };

  /**
   * Menangani pemutaran video walkthrough
   * @returns {void}
   */
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="sec" id="tour">
      <div className="wrap vid">
        <div>
          {isPlaying ? (
            <div style={{ position: 'relative', width: '100%', minHeight: '320px', borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
              <iframe
                src={`${CONFIG.videoEmbed}?autoplay=1`}
                title="Villa live walkthrough video tour"
                style={{ width: '100%', height: '100%', minHeight: '320px', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              className="player"
              type="button"
              id="player"
              aria-label="Play villa tour video"
              onClick={handlePlayVideo}
            >
              <span className="play">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#C96F4A">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <small>Unedited walkthrough &middot; [Casa Pere, filmed Oct 2026]</small>
            </button>
          )}
          <p className="ph-note">
            Add your YouTube link in CONFIG.videoEmbed. Keep it raw: one continuous walk through, no heavy editing.
          </p>
        </div>

        <form className="tourform" id="tourForm" onSubmit={handleSubmitTour}>
          <div className="eyebrow">See it before you book</div>
          <h2 style={{ fontSize: '26px', margin: '6px 0 6px' }}>Book a 10-minute live video tour</h2>
          <p style={{ margin: 0, color: 'var(--ink-soft)' }}>
            A member of our team walks you through the villa on a video call, and answers your questions on the spot. Free, no obligation.
          </p>

          <label htmlFor="tVilla" style={{ display: 'block', marginTop: '14px', fontWeight: 600, fontSize: '13px' }}>
            Villa
          </label>
          <select
            id="tVilla"
            value={selectedVilla}
            onChange={(e) => setSelectedVilla(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: '#fff' }}
          >
            {villas.map((v) => (
              <option key={v.id} value={v.name}>{v.name} ({v.area})</option>
            ))}
          </select>

          <label htmlFor="tWhen" style={{ display: 'block', marginTop: '12px', fontWeight: 600, fontSize: '13px' }}>
            Preferred day &amp; time
          </label>
          <input
            id="tWhen"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            placeholder="e.g. Tuesday 10:00 Bali time"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: '#fff' }}
          />

          <label htmlFor="tName" style={{ display: 'block', marginTop: '12px', fontWeight: 600, fontSize: '13px' }}>
            Your first name
          </label>
          <input
            id="tName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: '#fff' }}
          />

          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: '100%', marginTop: '16px' }}
          >
            Request a video tour
          </button>

          {submittedNote && (
            <p className="ph-note" id="tNote" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              {submittedNote}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
