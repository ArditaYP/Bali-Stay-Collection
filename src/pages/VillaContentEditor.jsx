import React, { useState, useEffect } from 'react';
import { formatBscMoney } from '../utils/bscFormat';
import { CONFIG } from '../data/bscVillasData';

/**
 * Daftar fasilitas standar yang sering dipilih untuk villa di Bali
 */
const COMMON_AMENITIES = [
  'Private pool',
  'Infinity pool',
  'Ocean view',
  'Jungle view',
  'River valley view',
  'Full kitchen',
  'Air conditioning',
  'High-speed WiFi',
  'Daily housekeeping',
  'Free parking',
  'Near the beach',
  'Sunken lounge',
  'Romantic outdoor bathtub',
  'Private chef on request',
  'Dedicated workspace'
];

/**
 * ID dari 3 villa utama yang diposisikan di urutan paling atas untuk kemudahan akses
 */
const TOP_PRIORITY_IDS = ['st-lau-ubud', 'iconic-cliff-top-villa', 'angkasa-ubud'];

/**
 * Komponen Halaman VillaContentEditor
 * Menyediakan antarmuka editor konten khusus bagi tim/pemilik untuk menulis
 * dan menyesuaikan deskripsi naratif, harga, fasilitas, dan detail villa.
 * 
 * @param {Object} props
 * @param {Object[]} props.villas - Seluruh daftar master villa yang tersedia di aplikasi
 * @param {Function} props.onUpdateVillas - Callback untuk menyimpan perubahan master data villa ke state global
 * @param {Function} props.onBackToCatalog - Callback untuk kembali ke halaman utama katalog
 * @param {Function} props.onPreviewDetail - Callback untuk membuka pratinjau halaman detail villa
 * @returns {React.JSX.Element} Elemen JSX Halaman Editor Konten Villa
 */
export default function VillaContentEditor({
  villas = [],
  currency = 'USD',
  onUpdateVillas,
  onBackToCatalog,
  onPreviewDetail
}) {
  // Salinan data villa lokal yang dapat diedit
  const [editableVillas, setEditableVillas] = useState(villas);
  // ID villa yang sedang aktif diedit di formulir (default: villa pertama di urutan paling atas)
  const [selectedVillaId, setSelectedVillaId] = useState(
    villas.find(v => v.id === TOP_PRIORITY_IDS[0])?.id || villas[0]?.id
  );
  // State untuk filter pencarian villa di panel samping
  const [searchFilter, setSearchFilter] = useState('');
  // State notifikasi toast saat aksi berhasil dijalankan
  const [toastMessage, setToastMessage] = useState('');
  // Input teks untuk menambahkan fasilitas kustom baru
  const [newAmenityInput, setNewAmenityInput] = useState('');

  // Sinkronisasi data saat props villas berubah dari luar
  useEffect(() => {
    setEditableVillas(villas);
  }, [villas]);

  // Villa yang sedang dipilih di form
  const selectedVilla = editableVillas.find(v => v.id === selectedVillaId) || editableVillas[0];

  /**
   * Menampilkan pesan toast sementara selama 3.5 detik
   * @param {string} msg - Teks notifikasi yang akan ditampilkan
   * @returns {void}
   */
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  /**
   * Menangani perubahan nilai pada field formulir villa aktif
   * @param {string} field - Nama properti yang diubah (misal: 'description', 'price')
   * @param {any} value - Nilai baru yang diinputkan pengguna
   * @returns {void}
   */
  const handleFieldChange = (field, value) => {
    if (!selectedVilla) return;
    setEditableVillas((prev) =>
      prev.map((v) => (v.id === selectedVilla.id ? { ...v, [field]: value } : v))
    );
  };

  /**
   * Menangani penambahan atau penghapusan fasilitas (amenity) pada villa aktif
   * @param {string} amenity - Nama fasilitas yang di-toggle
   * @returns {void}
   */
  const handleToggleAmenity = (amenity) => {
    if (!selectedVilla) return;
    const current = selectedVilla.amenities || [];
    const next = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    handleFieldChange('amenities', next);
  };

  /**
   * Menambahkan fasilitas kustom baru dari input teks ke villa aktif
   * @returns {void}
   */
  const handleAddCustomAmenity = () => {
    const trimmed = newAmenityInput.trim();
    if (!trimmed || !selectedVilla) return;
    const current = selectedVilla.amenities || [];
    if (!current.includes(trimmed)) {
      handleFieldChange('amenities', [...current, trimmed]);
    }
    setNewAmenityInput('');
  };

  /**
   * Menyimpan seluruh perubahan data villa ke localStorage browser dan memanggil onUpdateVillas
   * @returns {void}
   */
  const handleSaveToBrowser = () => {
    localStorage.setItem('bsc_villas', JSON.stringify(editableVillas));
    if (typeof onUpdateVillas === 'function') {
      onUpdateVillas(editableVillas);
    }
    showToast('✓ Seluruh perubahan deskripsi villa berhasil disimpan di browser!');
  };

  /**
   * Menyalin ringkasan teks deskripsi villa yang sedang dipilih ke clipboard
   * @returns {void}
   */
  const handleCopyCurrentSummary = () => {
    if (!selectedVilla) return;
    const summary = `
========================================
UPDATE KONTEN VILLA: ${selectedVilla.name}
========================================
ID: ${selectedVilla.id}
Lokasi: ${selectedVilla.location} (${selectedVilla.address})
Kategori: ${selectedVilla.category}
Harga per malam: $${selectedVilla.price} USD
Kamar: ${selectedVilla.beds} BR | Tamu: ${selectedVilla.guests} | Kamar Mandi: ${selectedVilla.bathrooms}

[SHORT DESCRIPTION]
${selectedVilla.shortDesc}

[FULL DESCRIPTION]
${selectedVilla.description}

[FASILITAS]
${(selectedVilla.amenities || []).join(', ')}
========================================
    `.trim();

    navigator.clipboard.writeText(summary).then(() => {
      showToast(`✓ Teks deskripsi "${selectedVilla.name}" berhasil disalin ke clipboard!`);
    }).catch(() => {
      showToast('Gagal menyalin otomatis. Silakan salin teks secara manual.');
    });
  };

  /**
   * Membuka aplikasi WhatsApp dengan format pesan teks yang sudah terisi otomatis
   * @returns {void}
   */
  const handleShareWhatsApp = () => {
    if (!selectedVilla) return;
    const msg = `Halo Tim Bali Stay Collection, ini update deskripsi untuk villa *${selectedVilla.name}*:\n\n*Harga*: ${formatBscMoney(selectedVilla.price, currency)}/malam\n*Kategori*: ${selectedVilla.category}\n\n*Short Desc*:\n${selectedVilla.shortDesc}\n\n*Full Desc*:\n${selectedVilla.description}\n\n*Fasilitas*:\n${(selectedVilla.amenities || []).join(', ')}`;
    const waNumber = CONFIG?.whatsapp || '';
    const url = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  /**
   * Mengunduh file cadangan format JSON berisi seluruh data yang telah diedit
   * @returns {void}
   */
  const handleDownloadBackupJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(editableVillas, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'bali-villas-content-update.json');
    dlAnchor.click();
    showToast('✓ File data bali-villas-content-update.json berhasil diunduh!');
  };

  /**
   * Membuka pratinjau halaman detail villa yang sedang aktif diedit
   * @returns {void}
   */
  const handlePreviewCurrentVilla = () => {
    // Simpan dulu agar preview menampilkan perubahan terbaru
    handleSaveToBrowser();
    if (typeof onPreviewDetail === 'function' && selectedVilla) {
      onPreviewDetail(selectedVilla.id);
    }
  };

  // Urutkan agar 3 villa prioritas utama berada di posisi paling atas, diikuti villa lainnya
  const sortedVillas = [...editableVillas].sort((a, b) => {
    const idxA = TOP_PRIORITY_IDS.indexOf(a.id);
    const idxB = TOP_PRIORITY_IDS.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });

  // Filter daftar villa berdasarkan query pencarian
  const filteredList = sortedVillas.filter(v => 
    v.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    v.location.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="editor-page-container" id="editor">
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="editor-toast">
          {toastMessage}
        </div>
      )}

      {/* Bar Atas Editor */}
      <div className="editor-header">
        <div className="editor-header-left">
          <button 
            type="button" 
            className="editor-back-btn" 
            onClick={onBackToCatalog}
            title="Kembali ke halaman depan"
          >
            ← Kembali ke Web
          </button>
          <div>
            <h1 className="editor-main-title">Villa Content &amp; Copywriting Editor</h1>
            <p className="editor-main-sub">
              Tulis dan perbarui deskripsi resmi, harga, dan fasilitas villa Bali Stay Collection.
            </p>
          </div>
        </div>

        <div className="editor-header-actions">
          <button 
            type="button" 
            className="btn-outline editor-action-btn"
            onClick={handleDownloadBackupJson}
            title="Unduh file JSON data cadangan"
          >
            📥 Unduh File Data
          </button>
          <button 
            type="button" 
            className="btn-primary editor-save-btn"
            onClick={handleSaveToBrowser}
            title="Simpan seluruh perubahan ke browser"
          >
            💾 Simpan Semua Perubahan
          </button>
        </div>
      </div>

      {/* Konten Utama Editor: 2 Kolom (Sidebar Daftar Villa + Form Editor & Preview) */}
      <div className="editor-layout">
        {/* Kolom Kiri: Navigasi Daftar Villa */}
        <aside className="editor-sidebar">
          <div className="editor-search-box">
            <input 
              type="text"
              placeholder="Cari villa atau area..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="editor-search-input"
            />
          </div>

          <div className="editor-villa-list">
            <div className="editor-group-title">
              <span>📋 Daftar Villa ({filteredList.length})</span>
            </div>
            {filteredList.map((v) => {
              const isSelected = v.id === selectedVillaId;
              return (
                <div 
                  key={v.id} 
                  className={`editor-villa-item ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedVillaId(v.id)}
                  role="button"
                  tabIndex={0}
                >
                  <img 
                    src={v.images?.[0] || v.img || '/destinations/ubud.jpg'} 
                    alt={v.name} 
                    className="editor-item-thumb" 
                  />
                  <div className="editor-item-info">
                    <strong className="editor-item-name">{v.name}</strong>
                    <span className="editor-item-meta">{v.location} &middot; {formatBscMoney(v.price, currency)}/night</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Kolom Kanan: Formulir Penulisan & Live Preview */}
        <main className="editor-main-panel">
          {selectedVilla ? (
            <div className="editor-form-wrap">
              {/* Header Villa yang Dipilih */}
              <div className="editor-villa-header">
                <div>
                  <div className="editor-kicker">
                    ✍️ EDIT KONTEN VILLA
                  </div>
                  <h2 className="editor-heading">{selectedVilla.name}</h2>
                  <p className="editor-subhead">
                    Area: <strong>{selectedVilla.location}</strong> &middot; ID: <code>{selectedVilla.id}</code>
                  </p>
                </div>

                <div className="editor-quick-actions">
                  <button 
                    type="button" 
                    className="btn-outline btn-sm"
                    onClick={handlePreviewCurrentVilla}
                    title="Buka pratinjau halaman detail villa ini"
                  >
                    👁️ Lihat Tampilan di Web
                  </button>
                  <button 
                    type="button" 
                    className="btn-outline btn-sm"
                    onClick={handleCopyCurrentSummary}
                    title="Salin deskripsi villa ini untuk dikirim ke Ardi"
                  >
                    📋 Salin Teks
                  </button>
                  <button 
                    type="button" 
                    className="btn-gold btn-sm"
                    onClick={handleShareWhatsApp}
                    title="Kirim format teks ini ke WhatsApp Ardi"
                  >
                    📱 Kirim ke WA
                  </button>
                </div>
              </div>

              {/* Grid Input Formulir */}
              <div className="editor-fields-grid">
                {/* 1. Nama Villa */}
                <div className="editor-field full-width">
                  <label htmlFor="edit-name">Judul / Nama Villa</label>
                  <input 
                    id="edit-name"
                    type="text" 
                    value={selectedVilla.name || ''} 
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="editor-input"
                    placeholder="Contoh: Villa Samudra – Bohemian Tropical Luxury in Canggu"
                  />
                </div>

                {/* 2. Kategori Villa */}
                <div className="editor-field">
                  <label htmlFor="edit-category">Kategori</label>
                  <select 
                    id="edit-category"
                    value={selectedVilla.category || 'Premium'}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                    className="editor-select"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxe">Luxe</option>
                    <option value="Family">Family</option>
                    <option value="Retreat">Retreat</option>
                    <option value="Honeymoon">Honeymoon</option>
                  </select>
                </div>

                {/* 3. Harga per Malam (USD) */}
                <div className="editor-field">
                  <label htmlFor="edit-price">
                    Harga per Malam (USD $ &middot; perkiraan {formatBscMoney(selectedVilla.price || 0, currency)})
                  </label>
                  <input 
                    id="edit-price"
                    type="number" 
                    min="50"
                    max="5000"
                    value={selectedVilla.price || ''} 
                    onChange={(e) => handleFieldChange('price', Number(e.target.value))}
                    className="editor-input"
                  />
                </div>

                {/* 4. Lokasi & Alamat */}
                <div className="editor-field">
                  <label htmlFor="edit-location">Area / Destinasi</label>
                  <input 
                    id="edit-location"
                    type="text" 
                    value={selectedVilla.location || ''} 
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    className="editor-input"
                    placeholder="Contoh: Canggu"
                  />
                </div>

                <div className="editor-field">
                  <label htmlFor="edit-address">Alamat Lengkap</label>
                  <input 
                    id="edit-address"
                    type="text" 
                    value={selectedVilla.address || ''} 
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    className="editor-input"
                    placeholder="Contoh: Echo Beach, Canggu, Badung, Bali"
                  />
                </div>

                {/* 5. Kamar & Tamu */}
                <div className="editor-field triple">
                  <div>
                    <label htmlFor="edit-beds">Kamar Tidur (BR)</label>
                    <input 
                      id="edit-beds"
                      type="number" 
                      min="1"
                      max="20"
                      value={selectedVilla.beds || ''} 
                      onChange={(e) => handleFieldChange('beds', Number(e.target.value))}
                      className="editor-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-guests">Maks. Tamu</label>
                    <input 
                      id="edit-guests"
                      type="number" 
                      min="1"
                      max="40"
                      value={selectedVilla.guests || ''} 
                      onChange={(e) => handleFieldChange('guests', Number(e.target.value))}
                      className="editor-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-baths">Kamar Mandi</label>
                    <input 
                      id="edit-baths"
                      type="number" 
                      min="1"
                      max="20"
                      value={selectedVilla.bathrooms || ''} 
                      onChange={(e) => handleFieldChange('bathrooms', Number(e.target.value))}
                      className="editor-input"
                    />
                  </div>
                </div>

                {/* 6. Short Description */}
                <div className="editor-field full-width">
                  <div className="editor-field-header">
                    <label htmlFor="edit-shortdesc">Short Description (Ringkasan Katalog)</label>
                    <span className="editor-char-count">
                      {(selectedVilla.shortDesc || '').length} karakter (disarankan 80–140 karakter)
                    </span>
                  </div>
                  <textarea 
                    id="edit-shortdesc"
                    rows={2}
                    value={selectedVilla.shortDesc || ''} 
                    onChange={(e) => handleFieldChange('shortDesc', e.target.value)}
                    className="editor-textarea"
                    placeholder="Tulis 1–2 kalimat singkat yang memikat pengunjung di halaman katalog..."
                  />
                </div>

                {/* 7. Full Description */}
                <div className="editor-field full-width">
                  <div className="editor-field-header">
                    <label htmlFor="edit-desc">Full Description (Deskripsi Lengkap Halaman Detail)</label>
                    <span className="editor-char-count">
                      {(selectedVilla.description || '').length} karakter
                    </span>
                  </div>
                  <textarea 
                    id="edit-desc"
                    rows={6}
                    value={selectedVilla.description || ''} 
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="editor-textarea"
                    placeholder="Ceritakan keistimewaan arsitektur villa, pemandangan, kenyamanan ruang santai, kedekatan dengan tempat wisata, dan pengalaman unik yang didapat tamu..."
                  />
                  {selectedVilla.description && (
                    <div style={{ marginTop: '10px', padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '10px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                        👁️ Pratinjau Paragraf &amp; Enter (Tampilan Nyata di Halaman Web):
                      </div>
                      <div style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'var(--ink-soft)', whiteSpace: 'pre-line' }}>
                        {selectedVilla.description}
                      </div>
                    </div>
                  )}
                </div>

                {/* 8. Fasilitas (Amenities) */}
                <div className="editor-field full-width">
                  <label>Fasilitas Unggulan (Pilih yang Tersedia)</label>
                  <div className="editor-amenities-cloud">
                    {COMMON_AMENITIES.map((am) => {
                      const isChecked = (selectedVilla.amenities || []).includes(am);
                      return (
                        <button
                          key={am}
                          type="button"
                          className={`editor-amenity-chip ${isChecked ? 'active' : ''}`}
                          onClick={() => handleToggleAmenity(am)}
                        >
                          {isChecked ? '✓ ' : '+ '} {am}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tambah Fasilitas Kustom */}
                  <div className="editor-add-amenity-row">
                    <input 
                      type="text" 
                      placeholder="Tambah fasilitas lain (contoh: BBQ grill, Jacuzzi)..." 
                      value={newAmenityInput}
                      onChange={(e) => setNewAmenityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomAmenity();
                        }
                      }}
                      className="editor-input"
                    />
                    <button 
                      type="button" 
                      className="btn-outline" 
                      onClick={handleAddCustomAmenity}
                    >
                      + Tambah
                    </button>
                  </div>
                </div>
              </div>

              {/* Bar Tombol Simpan Bawah */}
              <div className="editor-bottom-bar">
                <button 
                  type="button" 
                  className="btn-primary editor-save-btn-large"
                  onClick={handleSaveToBrowser}
                >
                  💾 Simpan Perubahan Sekarang
                </button>
                <button 
                  type="button" 
                  className="btn-outline"
                  onClick={handlePreviewCurrentVilla}
                >
                  👁️ Lihat Tampilan di Web
                </button>
                <button 
                  type="button" 
                  className="btn-gold"
                  onClick={handleShareWhatsApp}
                >
                  📱 Kirim Hasil Tulisan ke WA Ardi
                </button>
              </div>
            </div>
          ) : (
            <div className="editor-empty-state">
              <p>Pilih salah satu villa di panel kiri untuk mulai menulis deskripsi.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
