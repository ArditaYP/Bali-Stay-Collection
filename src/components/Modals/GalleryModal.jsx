import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

/**
 * Mengekstrak nama kategori ruangan dari teks keterangan foto asli Airbnb
 * Contoh input: "Living room image 3" -> "Living room"
 * @param {string} caption - Teks keterangan foto dari Airbnb
 * @returns {string} Nama ruangan yang bersih dan terstandarisasi
 */
function extractRoomName(caption = '') {
  if (!caption) return 'General';
  // Menghapus pola penomoran seperti " image 1", " photo 2", "- 1", dll.
  const clean = caption.replace(/\s+(image|photo)\s+\d+.*$/i, '').trim();
  return clean || 'General';
}

/**
 * Menghasilkan ikon SVG minimalis untuk nama ruangan pada kurasi panel kanan
 * @param {string} roomName - Nama ruangan
 * @returns {React.JSX.Element} Elemen SVG ikon ruangan
 */
function getRoomIcon(roomName = '') {
  const text = roomName.toLowerCase();
  if (text.includes('pool') || text.includes('kolam')) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c3-1.5 5-1.5 8 0s5 1.5 8 0 3-1.5 4-1" />
        <path d="M2 17c3-1.5 5-1.5 8 0s5 1.5 8 0 3-1.5 4-1" />
      </svg>
    );
  }
  if (text.includes('bed') || text.includes('kamar') || text.includes('suite')) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
        <path d="M3 11V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
        <path d="M3 18h18" />
      </svg>
    );
  }
  if (text.includes('kitchen') || text.includes('dining') || text.includes('chef') || text.includes('dapur')) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v20" />
        <path d="M18 7h4V2" />
        <path d="M6 2v7a3 3 0 0 0 6 0V2" />
        <path d="M9 12v10" />
      </svg>
    );
  }
  if (text.includes('bath') || text.includes('toilet') || text.includes('tub')) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20v4a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-4z" />
        <path d="M5 12V6a2 2 0 0 1 2-2h1" />
      </svg>
    );
  }
  if (text.includes('living') || text.includes('lounge') || text.includes('sofa')) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
        <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5z" />
      </svg>
    );
  }
  if (text.includes('garden') || text.includes('exterior') || text.includes('view') || text.includes('outdoor')) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13C4 7 12 3 12 3s8 4 8 10a7 7 0 0 1-7 7z" />
        <path d="M12 3v17" />
      </svg>
    );
  }
  // Default ikon denah ruangan
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

/**
 * Komponen GalleryModal (The Luxury Pavilion — Split-Screen Architectural Canvas)
 * Mengimplementasikan penampil galeri foto elegan non-fullscreen:
 * - Format Floating Pavilion melayang di tengah layar (92vw x 88vh, border-radius 28px, blur backdrop)
 * - Panel Kiri (Cinema Stage ~68%): Foto aktif resolusi tinggi + Navigasi panah + Strip Thumbnail interaktif
 * - Panel Kanan (Curator Index ~32%): Kurasi daftar ruangan vertikal + Badge jumlah foto + Detail ulasan ruangan
 * - Dukungan Mode Toggle (Split Pavilion vs Full Masonry Grid)
 * - Kontrol Keyboard (ArrowLeft, ArrowRight, Escape)
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Status apakah modal galeri sedang terbuka
 * @param {Function} props.onClose - Callback untuk menutup modal galeri
 * @param {string[]} props.images - Array URL gambar-gambar villa
 * @param {string[]} props.photoCaptions - Array teks keterangan/caption foto dari Airbnb
 * @param {string} props.villaName - Nama villa untuk judul
 * @param {number|null} [props.initialPhotoIndex=null] - Index foto yang langsung dibuka
 * @returns {React.JSX.Element|null} Elemen JSX Modal Galeri
 */
export default function GalleryModal({ 
  isOpen, 
  onClose, 
  images = [], 
  photoCaptions = [], 
  villaName = 'Villa',
  initialPhotoIndex = null
}) {
  // State index foto aktif yang sedang ditampilkan (0-indexed)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // State ruangan yang sedang aktif dipilih ('ALL' atau nama ruangan tertentu)
  const [selectedRoom, setSelectedRoom] = useState('ALL');

  // State mode tampilan: 'pavilion' (Split Screen) atau 'grid' (Masonry Grid Overview)
  const [viewMode, setViewMode] = useState('pavilion');

  // Ref container thumbnail strip untuk auto-scroll mengikuti foto aktif
  const thumbStripRef = useRef(null);

  /**
   * Menyiapkan daftar objek foto lengkap dengan ID, index urutan, URL, caption asli, dan kategori ruangan
   */
  const photoItems = useMemo(() => {
    return images.map((url, idx) => {
      const caption = photoCaptions[idx] || `Photo ${idx + 1}`;
      const room = extractRoomName(caption);
      return {
        id: idx,
        index: idx + 1,
        url,
        caption,
        room
      };
    });
  }, [images, photoCaptions]);

  /**
   * Mengelompokkan foto-foto berdasarkan nama ruangan
   */
  const groupedRooms = useMemo(() => {
    const groups = {};
    photoItems.forEach((item) => {
      if (!groups[item.room]) {
        groups[item.room] = [];
      }
      groups[item.room].push(item);
    });
    return groups;
  }, [photoItems]);

  // Daftar nama-nama ruangan yang ada pada villa ini
  const roomNames = useMemo(() => Object.keys(groupedRooms), [groupedRooms]);

  // Sinkronisasi index awal saat modal dibuka dari klik salah satu foto di showcase
  useEffect(() => {
    if (isOpen) {
      if (typeof initialPhotoIndex === 'number' && initialPhotoIndex >= 0 && initialPhotoIndex < photoItems.length) {
        setActivePhotoIndex(initialPhotoIndex);
        setSelectedRoom('ALL');
      } else {
        setActivePhotoIndex(0);
        setSelectedRoom('ALL');
      }
      setViewMode('pavilion');
    }
  }, [isOpen, initialPhotoIndex, photoItems.length]);


  // Objek foto aktif saat ini
  const currentPhoto = photoItems[activePhotoIndex] || photoItems[0] || null;

  /**
   * Navigasi ke foto sebelumnya
   * @returns {void}
   */
  const handlePrevPhoto = useCallback(() => {
    if (photoItems.length === 0) return;
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photoItems.length - 1));
  }, [photoItems.length]);

  /**
   * Navigasi ke foto berikutnya
   * @returns {void}
   */
  const handleNextPhoto = useCallback(() => {
    if (photoItems.length === 0) return;
    setActivePhotoIndex((prev) => (prev < photoItems.length - 1 ? prev + 1 : 0));
  }, [photoItems.length]);

  /**
   * Menggulir thumbnail strip secara otomatis agar thumbnail aktif terlihat di tengah
   */
  useEffect(() => {
    if (!thumbStripRef.current || viewMode !== 'pavilion') return;
    const activeThumb = thumbStripRef.current.querySelector(`.pavilion-thumb.active`);
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activePhotoIndex, viewMode]);

  /**
   * Mengatur listener keyboard (ArrowLeft, ArrowRight, Escape)
   */
  useEffect(() => {
    /**
     * Handler tombol keyboard
     * @param {KeyboardEvent} e - Event keyboard
     */
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (viewMode === 'grid') {
          setViewMode('pavilion');
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && viewMode === 'pavilion') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight' && viewMode === 'pavilion') {
        handleNextPhoto();
      }
    };

    if (isOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, viewMode, onClose, handlePrevPhoto, handleNextPhoto]);

  /**
   * Memilih ruangan dari panel kanan
   * Otomatis melompat ke foto pertama dari ruangan tersebut di stage kiri
   * @param {string} roomName - Nama ruangan atau 'ALL'
   * @returns {void}
   */
  const handleSelectRoom = (roomName) => {
    setSelectedRoom(roomName);
    if (roomName !== 'ALL') {
      const firstInRoom = photoItems.find(p => p.room === roomName);
      if (firstInRoom) {
        setActivePhotoIndex(firstInRoom.id);
      }
    }
  };

  /**
   * Menggeser strip thumbnail horizontal
   * @param {number} distance - Jarak pergeseran dalam piksel
   * @returns {void}
   */
  const handleScrollThumbnails = (distance) => {
    if (thumbStripRef.current) {
      thumbStripRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  if (!isOpen || photoItems.length === 0) return null;

  return (
    <div className="modal-overlay pavilion-gallery-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content pavilion-gallery-canvas"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================
            1. HEADER PAVILION MEWAH
            ========================================================= */}
        <div className="pavilion-header">
          <div className="pavilion-header-left">
            <span className="pavilion-eyebrow">BALI STAY COLLECTION · ARCHITECTURAL TOUR</span>
            <h2 className="pavilion-title">{villaName}</h2>
            <p className="pavilion-meta">
              {photoItems.length} curated photographs &middot; {roomNames.length} private spaces
            </p>
          </div>

          <div className="pavilion-header-actions">
            {/* Toggle Mode: Split Pavilion vs Grid View */}
            <div className="pavilion-view-switcher">
              <button
                type="button"
                className={`switcher-btn ${viewMode === 'pavilion' ? 'active' : ''}`}
                onClick={() => setViewMode('pavilion')}
                title="Split-Screen Pavilion View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
                <span>Pavilion</span>
              </button>
              <button
                type="button"
                className={`switcher-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid Overview"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                <span>All Grid</span>
              </button>
            </div>

            {/* Tombol Tutup Bulat */}
            <button 
              type="button" 
              className="pavilion-close-btn" 
              onClick={onClose}
              aria-label="Close gallery"
              title="Close gallery (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* =========================================================
            2. KONTEN UTAMA: MODE SPLIT PAVILION (DEFAULT)
            ========================================================= */}
        {viewMode === 'pavilion' ? (
          <div className="pavilion-split-body">
            {/* --- PANEL KIRI: CINEMA STAGE & THUMBNAILS (~68%) --- */}
            <div className="pavilion-stage-panel">
              {/* Panggung Foto Utama */}
              <div className="pavilion-main-stage">
                {/* Tombol Navigasi Kiri */}
                <button
                  type="button"
                  className="pavilion-nav-btn pavilion-nav-prev"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  title="Previous photo (Arrow Left)"
                >
                  ‹
                </button>

                {/* Kontainer Foto Utama */}
                <div className="pavilion-img-container">
                  {currentPhoto && (
                    <img
                      key={currentPhoto.url}
                      src={currentPhoto.url}
                      alt={`${villaName} — ${currentPhoto.caption}`}
                      className="pavilion-active-img"
                    />
                  )}
                  {/* Badge Counter Melayang */}
                  <div className="pavilion-counter-badge">
                    <span className="dot-live" />
                    <span>{currentPhoto ? currentPhoto.index : 1} / {photoItems.length}</span>
                  </div>
                </div>

                {/* Tombol Navigasi Kanan */}
                <button
                  type="button"
                  className="pavilion-nav-btn pavilion-nav-next"
                  onClick={handleNextPhoto}
                  aria-label="Next photo"
                  title="Next photo (Arrow Right)"
                >
                  ›
                </button>
              </div>

              {/* Strip Thumbnail Mini di Bawah Foto Utama */}
              <div className="pavilion-thumbs-strip-wrapper">
                <button
                  type="button"
                  className="thumb-scroll-btn thumb-scroll-prev"
                  onClick={() => handleScrollThumbnails(-200)}
                  aria-label="Scroll thumbnails left"
                >
                  ‹
                </button>

                <div className="pavilion-thumbs-track" ref={thumbStripRef}>
                  {photoItems.map((photo) => {
                    const isActive = photo.id === activePhotoIndex;
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        className={`pavilion-thumb ${isActive ? 'active' : ''}`}
                        onClick={() => setActivePhotoIndex(photo.id)}
                        title={`View photo ${photo.index}: ${photo.caption}`}
                      >
                        <img src={photo.url} alt="" loading="lazy" />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="thumb-scroll-btn thumb-scroll-next"
                  onClick={() => handleScrollThumbnails(200)}
                  aria-label="Scroll thumbnails right"
                >
                  ›
                </button>
              </div>
            </div>

            {/* --- PANEL KANAN: CURATOR INDEX (~32%) --- */}
            <div className="pavilion-curator-panel">
              <div className="curator-panel-header">
                <div className="curator-title-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D2B073" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <h3>Spaces &amp; Rooms</h3>
                </div>
                <span className="curator-sub">Select space to jump</span>
              </div>

              {/* Daftar Tombol Ruangan Vertikal */}
              <div className="curator-rooms-list">
                {/* Opsi Semua Ruangan */}
                <button
                  type="button"
                  className={`curator-room-btn ${selectedRoom === 'ALL' ? 'active' : ''}`}
                  onClick={() => handleSelectRoom('ALL')}
                >
                  <div className="room-btn-left">
                    <span className="room-icon">🌴</span>
                    <span className="room-name">All Spaces</span>
                  </div>
                  <span className="room-count-badge">{photoItems.length}</span>
                </button>

                {/* Daftar Ruangan Spesifik */}
                {roomNames.map((room) => {
                  const count = groupedRooms[room]?.length || 0;
                  const isSelected = selectedRoom === room;
                  return (
                    <button
                      key={room}
                      type="button"
                      className={`curator-room-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectRoom(room)}
                    >
                      <div className="room-btn-left">
                        <span className="room-icon-svg">{getRoomIcon(room)}</span>
                        <span className="room-name">{room}</span>
                      </div>
                      <span className="room-count-badge">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Detail Keterangan Ruangan yang Sedang Dilihat */}
              <div className="curator-active-card">
                <div className="card-tag">NOW VIEWING</div>
                <h4 className="card-room-title">{currentPhoto?.room || 'General Space'}</h4>
                <p className="card-caption-desc">
                  {currentPhoto?.caption || 'Private villa curated area photographed directly on-site.'}
                </p>
                <div className="card-verified-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2F6B3A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Verified in person &middot; Bali Stay Collection</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================
              3. KONTEN ALTERNATIF: MODE ALL GRID (MASONRY ROOMS)
              ========================================================= */
          <div className="pavilion-grid-body">
            {roomNames.map((room) => {
              const photos = groupedRooms[room] || [];
              return (
                <section key={room} className="pavilion-grid-section">
                  <div className="grid-section-header">
                    <div className="grid-section-title">
                      {getRoomIcon(room)}
                      <h3>{room}</h3>
                    </div>
                    <span>{photos.length} photos</span>
                  </div>

                  <div className="pavilion-masonry-grid">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="masonry-card"
                        onClick={() => {
                          setActivePhotoIndex(photo.id);
                          setViewMode('pavilion');
                        }}
                        role="button"
                        tabIndex={0}
                        title={`Click to view: ${photo.caption}`}
                      >
                        <img src={photo.url} alt="" loading="lazy" />
                        <div className="masonry-card-overlay">
                          <span>{photo.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
