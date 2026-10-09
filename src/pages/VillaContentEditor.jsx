import React, { useState, useEffect } from 'react';
import { formatBscMoney } from '../utils/bscFormat';
import { CONFIG } from '../data/bscVillasData';
import HomepageMediaEditor from '../components/editor/HomepageMediaEditor';

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
 * Daftar label / kategori ruangan standar untuk foto tour Airbnb
 */
const ROOM_LABEL_PRESETS = [
  'Living Area',
  'Master Bedroom',
  'Bedroom 2',
  'Bedroom 3',
  'Private Pool',
  'Full Kitchen',
  'Bathroom',
  'Outdoor Dining',
  'Garden & Exterior',
  'Balcony & Terrace',
  'Aerial View'
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
  // State status proses penyimpanan ke server database
  const [isSaving, setIsSaving] = useState(false);

  // State untuk navigasi tab editor ('villas' | 'homepage')
  const [editorTab, setEditorTab] = useState('villas');
  const [homepageData, setHomepageData] = useState(null);
  const [isSavingHomepage, setIsSavingHomepage] = useState(false);

  // State untuk manajemen foto villa
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('Living Area');

  // Sinkronisasi data saat props villas berubah dari luar
  useEffect(() => {
    setEditableVillas(villas);
  }, [villas]);

  // Mengambil data media halaman depan saat editor dibuka
  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const resp = await fetch('/BaliStayCollection/api/homepage.php');
        if (resp.ok) {
          const json = await resp.json();
          if (json.success) {
            setHomepageData(json);
            localStorage.setItem('bsc_homepage_media', JSON.stringify(json));
            return;
          }
        }
      } catch (e) {
        console.warn('API homepage offline, loading fallback:', e);
      }
      const saved = localStorage.getItem('bsc_homepage_media');
      if (saved) {
        try {
          setHomepageData(JSON.parse(saved));
        } catch (e) {}
      }
    };
    fetchHomepage();
  }, []);

  /**
   * Menangani penyimpanan perubahan foto dan media halaman depan
   * @param {Object} updatedData - Data foto & konten halaman depan yang diperbarui
   */
  const handleSaveHomepage = async (updatedData) => {
    setIsSavingHomepage(true);
    try {
      setHomepageData(updatedData);
      localStorage.setItem('bsc_homepage_media', JSON.stringify(updatedData));
      const resp = await fetch('/BaliStayCollection/api/homepage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const resJson = await resp.json();
      if (resJson.success) {
        showToast('✅ Foto dan konten halaman depan berhasil disimpan ke database!');
      } else {
        showToast('⚠️ Data disimpan secara lokal (' + (resJson.error || 'Server notice') + ')');
      }
    } catch (err) {
      showToast('✅ Tersimpan di penyimpanan lokal browser.');
    } finally {
      setIsSavingHomepage(false);
    }
  };

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
   * Menangani pengunggahan file foto fisik dari komputer/laptop ke server via /api/upload.php
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @returns {Promise<void>}
   */
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedVilla) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('villa_id', selectedVilla.id);

      const res = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data && data.success && data.url) {
        const currentImages = Array.isArray(selectedVilla.images) ? [...selectedVilla.images] : [];
        const currentCaptions = Array.isArray(selectedVilla.photoCaptions) ? [...selectedVilla.photoCaptions] : [];

        const updatedImages = [...currentImages, data.url];
        const updatedCaptions = [...currentCaptions, newImageCaption.trim() || 'General'];

        handleFieldChange('images', updatedImages);
        handleFieldChange('photoCaptions', updatedCaptions);
        if (!selectedVilla.img || currentImages.length === 0) {
          handleFieldChange('img', data.url);
        }

        showToast('✓ Foto berhasil diunggah ke server!');
      } else {
        showToast('⚠️ ' + (data?.error || 'Gagal mengunggah foto.'));
      }
    } catch (err) {
      showToast('⚠️ Gagal terhubung ke upload server: ' + err.message);
    } finally {
      setIsUploadingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  /**
   * Menambahkan foto baru ke galeri villa berdasarkan link / URL eksternal
   * @returns {void}
   */
  const handleAddPhotoUrl = () => {
    const trimmedUrl = newImageUrl.trim();
    if (!trimmedUrl || !selectedVilla) return;

    const currentImages = Array.isArray(selectedVilla.images) ? [...selectedVilla.images] : [];
    const currentCaptions = Array.isArray(selectedVilla.photoCaptions) ? [...selectedVilla.photoCaptions] : [];

    const updatedImages = [...currentImages, trimmedUrl];
    const updatedCaptions = [...currentCaptions, newImageCaption.trim() || 'General'];

    handleFieldChange('images', updatedImages);
    handleFieldChange('photoCaptions', updatedCaptions);
    if (!selectedVilla.img || currentImages.length === 0) {
      handleFieldChange('img', trimmedUrl);
    }

    setNewImageUrl('');
    showToast('✓ Link foto berhasil ditambahkan ke galeri!');
  };

  /**
   * Memasang foto tertentu sebagai cover utama (posisi #1 / thumbnail katalog)
   * @param {number} index - Index foto yang ingin dijadikan cover
   * @returns {void}
   */
  const handleSetAsCover = (index) => {
    if (!selectedVilla || index <= 0) return;
    const currentImages = Array.isArray(selectedVilla.images) ? [...selectedVilla.images] : [];
    const currentCaptions = Array.isArray(selectedVilla.photoCaptions) ? [...selectedVilla.photoCaptions] : [];

    const [selectedImg] = currentImages.splice(index, 1);
    const [selectedCap] = currentCaptions.splice(index, 1);

    const updatedImages = [selectedImg, ...currentImages];
    const updatedCaptions = [selectedCap, ...currentCaptions];

    handleFieldChange('images', updatedImages);
    handleFieldChange('photoCaptions', updatedCaptions);
    handleFieldChange('img', selectedImg);
    showToast('⭐ Foto berhasil dipasang sebagai Cover Utama (#1)!');
  };

  /**
   * Menggeser urutan posisi foto ke kiri (-1) atau ke kanan (+1)
   * @param {number} index - Index foto saat ini
   * @param {number} direction - Arah geser (-1 atau +1)
   * @returns {void}
   */
  const handleMovePhoto = (index, direction) => {
    if (!selectedVilla) return;
    const targetIndex = index + direction;
    const currentImages = Array.isArray(selectedVilla.images) ? [...selectedVilla.images] : [];
    const currentCaptions = Array.isArray(selectedVilla.photoCaptions) ? [...selectedVilla.photoCaptions] : [];

    if (targetIndex < 0 || targetIndex >= currentImages.length) return;

    // Swap images
    const tempImg = currentImages[index];
    currentImages[index] = currentImages[targetIndex];
    currentImages[targetIndex] = tempImg;

    // Swap captions
    const tempCap = currentCaptions[index];
    currentCaptions[index] = currentCaptions[targetIndex];
    currentCaptions[targetIndex] = tempCap;

    handleFieldChange('images', currentImages);
    handleFieldChange('photoCaptions', currentCaptions);
    handleFieldChange('img', currentImages[0]);
  };

  /**
   * Menghapus foto dari galeri villa
   * @param {number} index - Index foto yang akan dihapus
   * @returns {void}
   */
  const handleDeletePhoto = (index) => {
    if (!selectedVilla) return;
    if (!window.confirm('Yakin ingin menghapus foto ini dari galeri villa?')) return;

    const currentImages = Array.isArray(selectedVilla.images) ? [...selectedVilla.images] : [];
    const currentCaptions = Array.isArray(selectedVilla.photoCaptions) ? [...selectedVilla.photoCaptions] : [];

    currentImages.splice(index, 1);
    currentCaptions.splice(index, 1);

    handleFieldChange('images', currentImages);
    handleFieldChange('photoCaptions', currentCaptions);
    handleFieldChange('img', currentImages[0] || '');
    showToast('✓ Foto berhasil dihapus');
  };

  /**
   * Mengubah label atau kategori ruangan pada foto tertentu
   * @param {number} index - Index foto
   * @param {string} newCaption - Label teks baru
   * @returns {void}
   */
  const handleUpdatePhotoCaption = (index, newCaption) => {
    if (!selectedVilla) return;
    const currentCaptions = Array.isArray(selectedVilla.photoCaptions) ? [...selectedVilla.photoCaptions] : [];
    while (currentCaptions.length <= index) {
      currentCaptions.push('General');
    }
    currentCaptions[index] = newCaption;
    handleFieldChange('photoCaptions', currentCaptions);
  };

  /**
   * Menyimpan seluruh perubahan data villa ke database MySQL via REST API dan localStorage
   * @returns {Promise<void>}
   */
  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    // 1. Simpan ke LocalStorage sebagai offline cache cadangan
    try {
      localStorage.setItem('bsc_villas', JSON.stringify(editableVillas));
    } catch {
      // Abaikan jika quota localStorage penuh
    }

    // 2. Simpan villa yang sedang diedit ke Database MySQL via API
    try {
      const response = await fetch('/api/villas.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedVilla)
      });

      const result = await response.json();
      if (result && result.success) {
        if (typeof onUpdateVillas === 'function') {
          onUpdateVillas(editableVillas);
        }
        showToast(`✓ Berhasil disimpan permanen ke Database MySQL ("${selectedVilla.name}")!`);
      } else {
        throw new Error(result?.error || 'Gagal menyimpan ke server');
      }
    } catch (err) {
      console.warn('API save fallback:', err);
      if (typeof onUpdateVillas === 'function') {
        onUpdateVillas(editableVillas);
      }
      showToast(`✓ Disimpan lokal di browser (Server: ${err.message})`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveToBrowser = handleSaveToDatabase;

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
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            title="Simpan perubahan ke database MySQL"
          >
            {isSaving ? '⏳ Menyimpan...' : '💾 Simpan ke Database'}
          </button>
        </div>
      </div>

      {/* Tab Navigasi Mode: Konten Villa vs Foto Halaman Depan */}
      <div className="editor-mode-switcher-bar">
        <button
          type="button"
          className={`editor-mode-tab-btn ${editorTab === 'villas' ? 'active' : ''}`}
          onClick={() => setEditorTab('villas')}
        >
          🏡 Kelola Konten Villa ({editableVillas.length} Villa)
        </button>
        <button
          type="button"
          className={`editor-mode-tab-btn ${editorTab === 'homepage' ? 'active' : ''}`}
          onClick={() => setEditorTab('homepage')}
        >
          🖼️ Kelola Foto Halaman Depan (Destinasi &amp; Experiences)
        </button>
      </div>

      {editorTab === 'homepage' ? (
        <HomepageMediaEditor
          homepageData={homepageData}
          onSave={handleSaveHomepage}
          onBackToWeb={onBackToCatalog}
          showToast={showToast}
          isSaving={isSavingHomepage}
        />
      ) : (
        /* Konten Utama Editor: 2 Kolom (Sidebar Daftar Villa + Form Editor & Preview) */
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

                {/* 9. Galeri Foto Villa (Photo Management & Tour) */}
                <div className="editor-field full-width">
                  <div className="editor-photos-section">
                    <div className="editor-photos-header">
                      <div>
                        <div className="editor-photos-title">
                          📸 Galeri Foto Villa &amp; Photo Tour
                          <span className="editor-photos-badge">
                            {(selectedVilla.images || []).length} Foto
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                          Foto urutan #1 otomatis menjadi Cover Utama &amp; Thumbnail Katalog.
                        </div>
                      </div>
                    </div>

                    {/* Pratinjau Grid 5 Foto Airbnb (Tampilan yang akan dilihat tamu di Halaman Detail) */}
                    {(selectedVilla.images || []).length > 0 && (
                      <div className="editor-mini-preview-showcase">
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                          👁️ Pratinjau Grid 5 Foto Airbnb di Halaman Detail:
                        </div>
                        <div className="editor-mini-showcase-grid">
                          <div 
                            className="editor-mini-showcase-item hero"
                            style={{ backgroundImage: `url('${selectedVilla.images[0]}')` }}
                            title="Foto Utama (Hero Besar Kiri)"
                          >
                            <span className="editor-photo-order-badge" style={{ top: '6px', left: '6px' }}>
                              ★ Cover Utama
                            </span>
                          </div>
                          {selectedVilla.images.slice(1, 4).map((img, idx) => (
                            <div 
                              key={idx} 
                              className="editor-mini-showcase-item"
                              style={{ backgroundImage: `url('${img}')` }}
                              title={`Foto #${idx + 2}`}
                            />
                          ))}
                          {selectedVilla.images[4] && (
                            <div 
                              className="editor-mini-showcase-item"
                              style={{ backgroundImage: `url('${selectedVilla.images[4]}')` }}
                              title="Foto #5"
                            >
                              {(selectedVilla.images.length > 5) && (
                                <div className="editor-mini-showcase-overlay">
                                  +{selectedVilla.images.length - 5} photos
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Uploader Hybrid: 1. Drag & Drop / File Picker, 2. Add via URL */}
                    <div className="editor-photos-uploader-grid">
                      {/* Opsi 1: Upload File Langsung dari Komputer */}
                      <label className={`editor-dropzone ${isUploadingPhoto ? 'uploading' : ''}`}>
                        <input 
                          type="file" 
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          onChange={handlePhotoUpload}
                          style={{ display: 'none' }}
                          disabled={isUploadingPhoto}
                        />
                        <div className="editor-dropzone-icon">
                          {isUploadingPhoto ? '⏳' : '📁'}
                        </div>
                        <div className="editor-dropzone-text">
                          {isUploadingPhoto ? 'Mengunggah & Mengoptimasi Foto...' : 'Klik untuk Unggah Foto dari Laptop/HP'}
                        </div>
                        <div className="editor-dropzone-sub">
                          Mendukung JPG, PNG, WebP (Maks. 20 MB, otomatis dioptimasi)
                        </div>
                      </label>

                      {/* Opsi 2: Tambah via Link / URL Eksternal */}
                      <div className="editor-url-adder">
                        <div className="editor-url-adder-title">
                          🔗 Atau Tambah via Link / URL Foto
                        </div>
                        <div className="editor-url-adder-row">
                          <input 
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddPhotoUrl();
                              }
                            }}
                            className="editor-input"
                            style={{ flex: 1, fontSize: '13px' }}
                          />
                          <button 
                            type="button" 
                            className="btn-primary"
                            onClick={handleAddPhotoUrl}
                            style={{ padding: '8px 16px', fontSize: '13px' }}
                          >
                            + Tambah
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                            Label Ruangan awal:
                          </span>
                          <input 
                            type="text"
                            placeholder="Contoh: Living Area"
                            value={newImageCaption}
                            onChange={(e) => setNewImageCaption(e.target.value)}
                            className="editor-input"
                            style={{ width: '150px', padding: '4px 8px', fontSize: '11.5px' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Grid Daftar Seluruh Kartu Foto */}
                    <div className="editor-photos-grid">
                      {(selectedVilla.images || []).map((imgUrl, idx) => {
                        const isCover = idx === 0;
                        const caption = (selectedVilla.photoCaptions && selectedVilla.photoCaptions[idx]) || 'General';

                        return (
                          <div 
                            key={`${imgUrl}-${idx}`} 
                            className={`editor-photo-card ${isCover ? 'is-cover' : ''}`}
                          >
                            <div className="editor-photo-thumb-wrap">
                              <img 
                                src={imgUrl} 
                                alt={caption || `Foto ${idx + 1}`} 
                                className="editor-photo-thumb"
                                loading="lazy"
                              />

                              {/* Lencana Urutan */}
                              <span className="editor-photo-order-badge">
                                {isCover ? '★ #1 COVER' : `#${idx + 1}`}
                              </span>

                              {/* Bar Tombol Aksi */}
                              <div className="editor-photo-actions-bar">
                                <div style={{ display: 'flex', gap: '2px' }}>
                                  {!isCover && (
                                    <button 
                                      type="button" 
                                      className="editor-photo-act-btn make-cover"
                                      onClick={() => handleSetAsCover(idx)}
                                      title="Jadikan Foto Utama / Cover (#1)"
                                    >
                                      ⭐ Cover
                                    </button>
                                  )}
                                  {idx > 0 && (
                                    <button 
                                      type="button" 
                                      className="editor-photo-act-btn"
                                      onClick={() => handleMovePhoto(idx, -1)}
                                      title="Geser Mundur / Kiri (◀)"
                                    >
                                      ◀
                                    </button>
                                  )}
                                  {idx < (selectedVilla.images || []).length - 1 && (
                                    <button 
                                      type="button" 
                                      className="editor-photo-act-btn"
                                      onClick={() => handleMovePhoto(idx, 1)}
                                      title="Geser Maju / Kanan (▶)"
                                    >
                                      ▶
                                    </button>
                                  )}
                                </div>

                                <button 
                                  type="button" 
                                  className="editor-photo-act-btn delete"
                                  onClick={() => handleDeletePhoto(idx)}
                                  title="Hapus foto dari galeri"
                                >
                                  ✕ Hapus
                                </button>
                              </div>
                            </div>

                            {/* Bagian Input Label / Keterangan Ruangan */}
                            <div className="editor-photo-body">
                              <label className="editor-photo-caption-label">
                                Label Ruangan:
                              </label>
                              <input 
                                type="text"
                                className="editor-photo-caption-input"
                                value={caption}
                                onChange={(e) => handleUpdatePhotoCaption(idx, e.target.value)}
                                placeholder="Contoh: Master Bedroom"
                              />

                              {/* Preset Chips Cepat */}
                              <div className="editor-quick-room-chips">
                                {ROOM_LABEL_PRESETS.slice(0, 5).map((preset) => (
                                  <button
                                    key={preset}
                                    type="button"
                                    className={`editor-room-chip-btn ${caption === preset ? 'active' : ''}`}
                                    onClick={() => handleUpdatePhotoCaption(idx, preset)}
                                  >
                                    {preset}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Tombol Simpan Bawah */}
              <div className="editor-bottom-bar">
                <button 
                  type="button" 
                  className="btn-primary editor-save-btn-large"
                  onClick={handleSaveToDatabase}
                  disabled={isSaving}
                >
                  {isSaving ? '⏳ Menyimpan ke Database...' : '💾 Simpan Perubahan ke Database'}
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
      )}
    </div>
  );
}
