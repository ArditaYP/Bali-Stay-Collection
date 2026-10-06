import React, { useState, useEffect } from 'react';

/**
 * Komponen ListVillaModal
 * Menampilkan formulir kemitraan bagi pemilik properti (Host) yang ingin mendaftarkan villa mereka
 * ke dalam jaringan kurasi Bali Stay Collection.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Status apakah modal pendaftaran villa terbuka
 * @param {Function} props.onClose - Fungsi callback untuk menutup modal
 * @param {Function} props.onAddVilla - Callback opsional saat villa baru didaftarkan ke state
 */
export default function ListVillaModal({ isOpen, onClose, onAddVilla }) {
  const [formData, setFormData] = useState({
    villaName: '',
    location: 'Canggu',
    beds: 3,
    guests: 6,
    price: 150,
    category: 'Deluxe',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      setIsSubmitted(false);
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Menangani perubahan nilai pada setiap field input formulir
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Event perubahan input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'beds' || name === 'guests' || name === 'price' ? Number(value) : value
    }));
  };

  /**
   * Menangani submit form pendaftaran villa
   * @param {React.FormEvent} e - Event submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.villaName || !formData.ownerName || !formData.ownerEmail) {
      alert('Silakan lengkapi nama villa dan kontak pemilik.');
      return;
    }

    if (typeof onAddVilla === 'function') {
      onAddVilla(formData);
    }

    setIsSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px' }}
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Tutup form partner"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <img src="/logo.svg" alt="Bali Stay Collection" style={{ height: '26px', width: 'auto' }} />
                <span className="badge">Host Partnership</span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 6px' }}>
                List Your Bali Villa
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--muted2)', margin: 0 }}>
                Bergabunglah dengan koleksi villa eksklusif direct booking tanpa potongan komisi agen berlapis.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Villa Name *
                  </label>
                  <input 
                    type="text" 
                    name="villaName"
                    required
                    placeholder="e.g. Villa Surya Indah"
                    value={formData.villaName}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Location *
                  </label>
                  <select 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px', background: '#fff' }}
                  >
                    <option value="Canggu">Canggu</option>
                    <option value="Ubud">Ubud</option>
                    <option value="Seminyak">Seminyak</option>
                    <option value="Uluwatu">Uluwatu</option>
                    <option value="Nusa Dua">Nusa Dua</option>
                    <option value="Sanur">Sanur</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Bedrooms</label>
                  <input 
                    type="number" 
                    name="beds"
                    min="1" 
                    max="20"
                    value={formData.beds}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Max Guests</label>
                  <input 
                    type="number" 
                    name="guests"
                    min="1" 
                    max="40"
                    value={formData.guests}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Est. Rate / Night ($)</label>
                  <input 
                    type="number" 
                    name="price"
                    min="30"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '14px 0 8px' }}>Owner / Host Contact</h4>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Your Name *</label>
                <input 
                  type="text" 
                  name="ownerName"
                  required
                  placeholder="e.g. Made Wijaya"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Email *</label>
                  <input 
                    type="email" 
                    name="ownerEmail"
                    required
                    placeholder="host@gmail.com"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>WhatsApp</label>
                  <input 
                    type="tel" 
                    name="ownerPhone"
                    placeholder="+62 81..."
                    value={formData.ownerPhone}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <button type="submit" className="reserve-btn btn-primary">
                Submit Villa for Review
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#EFF6EE',
              color: '#2F6B3A',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              marginBottom: '14px'
            }}>
              ✓
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>
              Submission Received!
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--muted2)', margin: '0 0 20px' }}>
              Tim Bali Stay Collection akan menghubungi Anda di <b>{formData.ownerEmail}</b> dalam 24 jam untuk verifikasi lokasi villa.
            </p>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={onClose}
              style={{ padding: '10px 24px', borderRadius: '8px' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
