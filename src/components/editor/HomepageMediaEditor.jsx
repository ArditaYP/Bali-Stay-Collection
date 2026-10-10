import React, { useState } from 'react';

/**
 * Komponen HomepageMediaEditor
 * Menyediakan antarmuka visual interaktif untuk mengedit seluruh foto dan teks
 * pada halaman depan (Destinations, Experiences, Hero section).
 * 
 * @param {Object} props
 * @param {Object} props.homepageData - Data media halaman depan saat ini
 * @param {Function} props.onSave - Callback untuk menyimpan perubahan ke API/database
 * @param {Function} props.onBackToWeb - Callback untuk kembali ke tampilan web publik
 * @param {Function} props.showToast - Callback untuk menampilkan notifikasi toast
 * @param {boolean} props.isSaving - Status proses penyimpanan
 * @returns {React.JSX.Element} Elemen JSX Editor Halaman Depan
 */
export default function HomepageMediaEditor({
  homepageData,
  onSave,
  onBackToWeb,
  showToast,
  isSaving
}) {
  const [data, setData] = useState(() => ({
    destinations: homepageData?.destinations || [],
    experiences: homepageData?.experiences || [],
    hero: homepageData?.hero || {
      headline: 'The villa you’ve been looking for is already here.',
      lead: 'Hand-picked private villas. On-the-ground local support',
      bgImage: ''
    }
  }));

  const [activeSection, setActiveSection] = useState('destinations'); // 'destinations' | 'experiences' | 'hero'
  const [uploadingItemId, setUploadingItemId] = useState(null);

  /**
   * Menangani upload foto baru ke server (/api/upload.php)
   * @param {File} file - Berkas gambar yang dipilih pengguna
   * @param {string} section - Nama seksi ('destinations', 'experiences', 'hero')
   * @param {string|number} itemId - ID atau indeks item yang diedit
   */
  const handleFileUpload = async (file, section, itemId) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, atau WebP).');
      return;
    }

    setUploadingItemId(itemId);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('villa_id', `homepage_${section}_${itemId}`);

      const response = await fetch('/BaliStayCollection/api/upload.php', {
        method: 'POST',
        body: formData
      });

      const resData = await response.json();
      if (resData.success && resData.url) {
        if (section === 'destinations') {
          handleDestinationChange(itemId, 'image', resData.url);
        } else if (section === 'experiences') {
          handleExperienceChange(itemId, 'image', resData.url);
        } else if (section === 'hero') {
          handleHeroChange('bgImage', resData.url);
        }
        showToast('Foto berhasil diunggah ke server!');
      } else {
        alert(resData.error || 'Gagal mengunggah foto.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      // Fallback base64 jika API PHP tidak merespons (misal saat preview lokal tanpa XAMPP aktif)
      const reader = new FileReader();
      reader.onload = (e) => {
        const localUrl = e.target.result;
        if (section === 'destinations') {
          handleDestinationChange(itemId, 'image', localUrl);
        } else if (section === 'experiences') {
          handleExperienceChange(itemId, 'image', localUrl);
        } else if (section === 'hero') {
          handleHeroChange('bgImage', localUrl);
        }
        showToast('Foto dimuat secara lokal.');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingItemId(null);
    }
  };

  /**
   * Memperbarui field pada item destinasi
   */
  const handleDestinationChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      destinations: prev.destinations.map(d => d.id === id ? { ...d, [field]: value } : d)
    }));
  };

  /**
   * Memperbarui field pada item experiences
   */
  const handleExperienceChange = (id, field, value) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  /**
   * Memperbarui field hero
   */
  const handleHeroChange = (field, value) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  /**
   * Menyimpan seluruh perubahan
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave(data);
    }
  };

  return (
    <div className="homepage-editor-container">
      {/* Sub Header & Sub Tabs */}
      <div className="homepage-editor-subnav">
        <div className="homepage-editor-tabs">
          <button
            type="button"
            className={`hp-tab-btn ${activeSection === 'destinations' ? 'active' : ''}`}
            onClick={() => setActiveSection('destinations')}
          >
            📍 Foto Destinasi ({data.destinations.length} Kawasan)
          </button>
          <button
            type="button"
            className={`hp-tab-btn ${activeSection === 'experiences' ? 'active' : ''}`}
            onClick={() => setActiveSection('experiences')}
          >
            ✨ Foto Beyond the Stay ({data.experiences.length} Pengalaman)
          </button>
          <button
            type="button"
            className={`hp-tab-btn ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveSection('hero')}
          >
            🌅 Hero Banner &amp; Header
          </button>
        </div>

        <div className="homepage-editor-top-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? '⏳ Menyimpan...' : '💾 Simpan Perubahan Halaman Depan'}
          </button>
        </div>
      </div>

      {/* Konten Tab 1: Foto Destinasi (Explore by destination) */}
      {activeSection === 'destinations' && (
        <div className="hp-section-wrap">
          <div className="hp-section-intro">
            <h3>Explore by Destination — Foto &amp; Deskripsi Kawasan</h3>
            <p>
              Ubah foto kartu kawasan yang tampil pada bagian depan. Anda bisa mengunggah file foto dari komputer atau memasukkan URL gambar berkualitas tinggi.
            </p>
          </div>

          <div className="hp-cards-grid">
            {data.destinations.map((dest) => {
              const isUploading = uploadingItemId === dest.id;
              return (
                <div key={dest.id} className="hp-dest-edit-card">
                  {/* Pratinjau Tampilan Kartu Halaman Depan */}
                  <div className="hp-dest-preview-box">
                    <img
                      src={dest.image || dest.fallback_image}
                      alt={dest.title || dest.name}
                      className="hp-dest-preview-img"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="hp-dest-preview-overlay">
                      {dest.badge && (
                        <span className="hp-dest-preview-badge">{dest.badge}</span>
                      )}
                      <h4 className="hp-dest-preview-title">{dest.title || dest.name}</h4>
                      <p className="hp-dest-preview-desc">{dest.description}</p>
                    </div>
                  </div>

                  {/* Form Pengaturan Media & Konten */}
                  <div className="hp-dest-form">
                    <div className="hp-field-row">
                      <label>Judul Kawasan</label>
                      <input
                        type="text"
                        value={dest.title || dest.name || ''}
                        onChange={(e) => handleDestinationChange(dest.id, 'title', e.target.value)}
                        className="editor-input"
                      />
                    </div>

                    <div className="hp-field-row">
                      <label>Badge / Tagline</label>
                      <input
                        type="text"
                        value={dest.badge || ''}
                        placeholder="Contoh: ★ Most Popular Hub, Clifftops & Sunsets"
                        onChange={(e) => handleDestinationChange(dest.id, 'badge', e.target.value)}
                        className="editor-input"
                      />
                    </div>

                    <div className="hp-field-row">
                      <label>URL Foto Kawasan</label>
                      <div className="hp-url-input-wrap">
                        <input
                          type="text"
                          value={dest.image || ''}
                          onChange={(e) => handleDestinationChange(dest.id, 'image', e.target.value)}
                          placeholder="/destinations/canggu.jpg atau https://..."
                          className="editor-input"
                        />
                      </div>
                    </div>

                    <div className="hp-upload-action-row">
                      <label className="hp-upload-file-btn">
                        <span>{isUploading ? '⏳ Mengunggah...' : '📁 Unggah Foto Baru'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          disabled={isUploading}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], 'destinations', dest.id);
                            }
                          }}
                        />
                      </label>
                      <small className="hp-upload-help">Format JPG, PNG, atau WebP.</small>
                    </div>

                    <div className="hp-field-row" style={{ marginTop: '8px' }}>
                      <label>Deskripsi Singkat</label>
                      <textarea
                        rows={2}
                        value={dest.description || ''}
                        onChange={(e) => handleDestinationChange(dest.id, 'description', e.target.value)}
                        className="editor-textarea"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Konten Tab 2: Beyond the Stay (Experiences) */}
      {activeSection === 'experiences' && (
        <div className="hp-section-wrap">
          <div className="hp-section-intro">
            <h3>Beyond the Stay — Make Bali Part of the Villa</h3>
            <p>
              Kelola 4 kartu layanan tambahan sebelum kedatangan tamu (Airport Transfer, Private Chef, Wellness, Explore Bali).
            </p>
          </div>

          <div className="hp-cards-grid">
            {data.experiences.map((exp) => {
              const isUploading = uploadingItemId === exp.id;
              return (
                <div key={exp.id} className="hp-dest-edit-card">
                  {/* Pratinjau Tampilan Kartu Experience */}
                  <div className="hp-exp-preview-box" style={{ backgroundImage: `url('${exp.image}')` }}>
                    <div className="hp-exp-preview-overlay">
                      <h4>{exp.title}</h4>
                      <p>{exp.desc}</p>
                    </div>
                  </div>

                  {/* Form Pengaturan Experience */}
                  <div className="hp-dest-form">
                    <div className="hp-field-row">
                      <label>Nama Layanan / Judul</label>
                      <input
                        type="text"
                        value={exp.title || ''}
                        onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                        className="editor-input"
                      />
                    </div>

                    <div className="hp-field-row">
                      <label>URL Gambar Latar</label>
                      <input
                        type="text"
                        value={exp.image || ''}
                        onChange={(e) => handleExperienceChange(exp.id, 'image', e.target.value)}
                        className="editor-input"
                      />
                    </div>

                    <div className="hp-upload-action-row">
                      <label className="hp-upload-file-btn">
                        <span>{isUploading ? '⏳ Mengunggah...' : '📁 Unggah Foto Baru'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          disabled={isUploading}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], 'experiences', exp.id);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div className="hp-field-row" style={{ marginTop: '8px' }}>
                      <label>Deskripsi Ringkas</label>
                      <textarea
                        rows={2}
                        value={exp.desc || ''}
                        onChange={(e) => handleExperienceChange(exp.id, 'desc', e.target.value)}
                        className="editor-textarea"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Konten Tab 3: Hero Section Banner */}
      {activeSection === 'hero' && (
        <div className="hp-section-wrap">
          <div className="hp-section-intro">
            <h3>Hero Section — Headline &amp; Latar Belakang</h3>
            <p>
              Sesuaikan teks headline utama serta latar belakang seksi pencarian atas.
            </p>
          </div>

          <div className="hp-hero-edit-box">
            <div className="hp-field-row">
              <label>Headline Utama</label>
              <input
                type="text"
                value={data.hero?.headline || ''}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                className="editor-input"
              />
            </div>

            <div className="hp-field-row" style={{ marginTop: '12px' }}>
              <label>Sub-heading / Lead Text</label>
              <textarea
                rows={2}
                value={data.hero?.lead || ''}
                onChange={(e) => handleHeroChange('lead', e.target.value)}
                className="editor-textarea"
              />
            </div>

            <div className="hp-field-row" style={{ marginTop: '12px' }}>
              <label>Foto Latar Belakang Hero (Opsional)</label>
              <input
                type="text"
                value={data.hero?.bgImage || ''}
                placeholder="Kosongkan untuk latar minimal bersih atau masukkan URL foto"
                onChange={(e) => handleHeroChange('bgImage', e.target.value)}
                className="editor-input"
              />
            </div>

            <div className="hp-upload-action-row" style={{ marginTop: '8px' }}>
              <label className="hp-upload-file-btn">
                <span>{uploadingItemId === 'hero' ? '⏳ Mengunggah...' : '📁 Unggah Background Hero'}</span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  disabled={uploadingItemId === 'hero'}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], 'hero', 'hero');
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Bar Bawah Penyimpanan */}
      <div className="hp-bottom-bar">
        <button
          type="button"
          className="btn-outline"
          onClick={onBackToWeb}
        >
          👁️ Pratinjau di Halaman Depan
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? '⏳ Menyimpan ke Database...' : '💾 Simpan Perubahan Halaman Depan'}
        </button>
      </div>
    </div>
  );
}
