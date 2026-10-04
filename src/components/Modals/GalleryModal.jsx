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
 * Komponen GalleryModal (Photo Tour Khas Airbnb)
 * Menampilkan seluruh galeri foto villa yang dikelompokkan secara terstruktur per ruangan
 * (Living room, Full kitchen, Bedroom 1, Bedroom 2, Pool, Balcony, dll.) sesuai metadata asli Airbnb.
 * 
 * Fitur Utama:
 * 1. Baris Tab/Pill Kategori Ruangan Interaktif (Dapat Digeser Kanan & Kiri):
 *    - Tombol panah geser kiri (‹) dan kanan (›)
 *    - Fitur Geser Menggunakan Mouse (Click & Drag to Scroll)
 *    - Fitur Geser Menggunakan Roda Mouse (Mouse Wheel Scroll Horizontal)
 *    - Dukungan Touch Swipe Halus di Ponsel / Tablet
 *    - "All photos" beserta jumlah total
 *    - Setiap ruangan dengan jumlah foto di ruangan tersebut (Living room (7), Pool (23), dll.)
 * 2. Tampilan Grid per Ruangan:
 *    - Setiap ruangan memiliki judul section dan total fotonya
 *    - Tiap foto menampilkan badge keterangan asli dari Airbnb (contoh: "Living room image 1")
 * 3. Mode Penampil Foto Tunggal (Single Photo Focus Viewer):
 *    - Klik foto manapun untuk memperbesar layar penuh
 *    - Tombol navigasi Sebelumnya (←) dan Selanjutnya (→)
 *    - Navigasi keyboard: Panah Kiri (←), Panah Kanan (→), dan Escape
 *    - Tombol "Grid view" untuk kembali ke daftar ruangan
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Status apakah modal galeri sedang terbuka
 * @param {Function} props.onClose - Callback untuk menutup modal galeri
 * @param {string[]} props.images - Array URL gambar-gambar villa
 * @param {string[]} props.photoCaptions - Array teks keterangan/caption untuk tiap foto dari Airbnb
 * @param {string} props.villaName - Nama villa untuk judul dan atribut alt foto
 */
export default function GalleryModal({ 
  isOpen, 
  onClose, 
  images = [], 
  photoCaptions = [], 
  villaName = 'Villa' 
}) {
  // State ruangan yang sedang aktif dipilih ('ALL' untuk semua ruangan, atau nama ruangan spesifik)
  const [selectedRoom, setSelectedRoom] = useState('ALL');

  // State index foto yang sedang dilihat dalam mode fokus (null = mode grid tour per ruangan)
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Ref untuk elemen kontainer baris pill ruangan
  const pillsRef = useRef(null);

  // State untuk visibilitas tombol panah navigasi geser kiri dan kanan pada baris pill
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Ref untuk melacak state geser mouse (click and drag)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

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

  /**
   * Memeriksa apakah kontainer pill bisa digulir ke kiri atau ke kanan
   * untuk memperbarui tampilan tombol panah geser
   */
  const checkScrollable = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  /**
   * Menggeser baris pill secara halus ke kiri atau ke kanan berdasarkan jarak piksel
   * @param {number} distance - Jarak pergeseran dalam piksel (negatif = kiri, positif = kanan)
   */
  const handleScrollByDistance = (distance) => {
    if (pillsRef.current) {
      pillsRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  /**
   * Menangani event mouse down untuk memulai fitur geser (drag to scroll)
   * @param {React.MouseEvent} e - Event mouse down
   */
  const handleMouseDown = (e) => {
    if (!pillsRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - pillsRef.current.offsetLeft;
    scrollLeftRef.current = pillsRef.current.scrollLeft;
    setIsGrabbing(true);
  };

  /**
   * Menangani event mouse move saat sedang menggeser (dragging) baris pill
   * @param {React.MouseEvent} e - Event mouse move
   */
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !pillsRef.current) return;
    e.preventDefault();
    const x = e.pageX - pillsRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Pengali akselerasi geser
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    pillsRef.current.scrollLeft = scrollLeftRef.current - walk;
    checkScrollable();
  };

  /**
   * Menangani event mouse up atau mouse leave untuk mengakhiri fitur geser
   */
  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  /**
   * Memilih tab kategori ruangan yang ingin difilter
   * Memastikan tab tidak terpilih jika user baru saja melakukan aksi drag geser
   * @param {string} roomName - Nama ruangan yang dipilih atau 'ALL'
   */
  const handlePillClick = (roomName) => {
    if (hasDraggedRef.current) return;
    setSelectedRoom(roomName);
    setActivePhotoIndex(null);
  };

  /**
   * Navigasi ke foto sebelumnya saat berada di mode penampil foto tunggal
   */
  const handlePrevPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : photoItems.length - 1;
    });
  }, [photoItems.length]);

  /**
   * Navigasi ke foto berikutnya saat berada di mode penampil foto tunggal
   */
  const handleNextPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => {
      if (prev === null) return null;
      return prev < photoItems.length - 1 ? prev + 1 : 0;
    });
  }, [photoItems.length]);

  /**
   * Membuka foto tertentu dalam mode penampil foto tunggal
   * @param {number} photoId - ID index global dari foto yang diklik
   */
  const handleOpenPhoto = (photoId) => {
    setActivePhotoIndex(photoId);
  };

  /**
   * Kembali dari mode penampil foto tunggal ke mode grid galeri per ruangan
   */
  const handleBackToGrid = () => {
    setActivePhotoIndex(null);
  };

  /**
   * Mengatur listener tombol keyboard (Escape, ArrowLeft, ArrowRight)
   */
  useEffect(() => {
    /**
     * Handler event keyboard
     * @param {KeyboardEvent} e - Event keyboard
     */
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null); // Kembali ke grid ruangan terlebih dahulu
        } else {
          onClose(); // Tutup modal jika sudah berada di grid
        }
      } else if (e.key === 'ArrowLeft' && activePhotoIndex !== null) {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight' && activePhotoIndex !== null) {
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
  }, [isOpen, activePhotoIndex, onClose, handlePrevPhoto, handleNextPhoto]);

  // Listener roda mouse (wheel) agar scroll vertikal mouse otomatis menggeser pill ke kiri & kanan
  useEffect(() => {
    const el = pillsRef.current;
    if (!el || activePhotoIndex !== null) return;

    /**
     * Mengubah scroll vertikal roda mouse menjadi pergeseran horizontal pada pill bar
     * @param {WheelEvent} e - Event mouse wheel
     */
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        checkScrollable();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [activePhotoIndex, checkScrollable]);

  // Memeriksa status scrollable saat modal dibuka atau ukuran window berubah
  useEffect(() => {
    if (isOpen && activePhotoIndex === null) {
      setTimeout(checkScrollable, 60);
      window.addEventListener('resize', checkScrollable);
      return () => window.removeEventListener('resize', checkScrollable);
    }
  }, [isOpen, activePhotoIndex, roomNames, checkScrollable]);

  // Reset filter ruangan dan foto aktif ke default setiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setSelectedRoom('ALL');
      setActivePhotoIndex(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Daftar ruangan yang akan dirender (semua ruangan jika 'ALL', atau satu ruangan tertentu)
  const displayedRooms = selectedRoom === 'ALL'
    ? roomNames
    : roomNames.filter((r) => r === selectedRoom);

  // Foto yang sedang aktif di mode fokus tunggal
  const currentPhoto = activePhotoIndex !== null ? photoItems[activePhotoIndex] : null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content gallery-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================
            HEADER MODAL GALERI
            ========================================================= */}
        <div className="gallery-modal-header">
          <div className="gallery-modal-header-left">
            <h2 className="gallery-modal-title">
              Photo Tour — {villaName}
            </h2>
            <p className="gallery-modal-sub">
              {photoItems.length} photos · Grouped by room &amp; spaces
            </p>
          </div>

          <div className="gallery-modal-header-actions">
            {activePhotoIndex !== null && (
              <button 
                type="button" 
                className="gallery-grid-toggle-btn"
                onClick={handleBackToGrid}
                title="Back to all photos grid"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                Grid view
              </button>
            )}
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Close gallery"
              title="Close gallery (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* =========================================================
            BARIS TAB RUANGAN DENGAN GESER KIRI-KANAN (SLIDER & DRAG)
            ========================================================= */}
        {activePhotoIndex === null && (
          <div className="gallery-pills-wrapper">
            {/* Tombol Geser ke Kiri */}
            {canScrollLeft && (
              <button
                type="button"
                className="pills-nav-btn pills-nav-prev"
                onClick={() => handleScrollByDistance(-240)}
                aria-label="Geser ke kiri"
                title="Geser ke kiri"
              >
                ‹
              </button>
            )}

            {/* Kontainer Baris Pill yang Dapat Digeser (Scroll, Roda Mouse, & Drag Mouse) */}
            <div 
              ref={pillsRef}
              className={`gallery-pills-bar ${isGrabbing ? 'grabbing' : ''}`}
              onScroll={checkScrollable}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {/* Tombol Tab: Semua Foto */}
              <button
                type="button"
                className={`gallery-pill ${selectedRoom === 'ALL' ? 'active' : ''}`}
                onClick={() => handlePillClick('ALL')}
              >
                All photos ({photoItems.length})
              </button>

              {/* Tombol Tab: Per Ruangan */}
              {roomNames.map((room) => (
                <button
                  key={room}
                  type="button"
                  className={`gallery-pill ${selectedRoom === room ? 'active' : ''}`}
                  onClick={() => handlePillClick(room)}
                >
                  {room} ({groupedRooms[room].length})
                </button>
              ))}
            </div>

            {/* Tombol Geser ke Kanan */}
            {canScrollRight && (
              <button
                type="button"
                className="pills-nav-btn pills-nav-next"
                onClick={() => handleScrollByDistance(240)}
                aria-label="Geser ke kanan"
                title="Geser ke kanan"
              >
                ›
              </button>
            )}
          </div>
        )}

        {/* =========================================================
            KONTEN MODAL: MODE FOKUS TUNGGAL ATAU GRID PER RUANGAN
            ========================================================= */}
        {activePhotoIndex !== null && currentPhoto ? (
          /* --- 1. Mode Penampil Foto Tunggal (Single Photo Focus Viewer) --- */
          <div className="gallery-single-view">
            {/* Tombol Navigasi Sebelumnya */}
            <button
              type="button"
              className="gallery-single-nav gallery-single-prev"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
              title="Previous photo (Left arrow)"
            >
              ‹
            </button>

            {/* Gambar Besar Terpusat */}
            <div className="gallery-single-img-wrap">
              <img 
                src={currentPhoto.url} 
                alt={`${villaName} - ${currentPhoto.caption}`}
                className="gallery-single-img"
              />
            </div>

            {/* Tombol Navigasi Selanjutnya */}
            <button
              type="button"
              className="gallery-single-nav gallery-single-next"
              onClick={handleNextPhoto}
              aria-label="Next photo"
              title="Next photo (Right arrow)"
            >
              ›
            </button>

            {/* Keterangan Bawah Foto Tunggal */}
            <div className="gallery-single-footer">
              <div className="gallery-single-caption-wrap">
                <strong className="gallery-single-room">{currentPhoto.room}</strong>
                <span className="gallery-single-desc">{currentPhoto.caption}</span>
              </div>
              <span className="gallery-single-counter">
                {currentPhoto.index} / {photoItems.length}
              </span>
            </div>
          </div>
        ) : (
          /* --- 2. Mode Grid Galeri Berkelompok per Ruangan --- */
          <div className="gallery-scroll-area">
            {displayedRooms.map((room) => {
              const photos = groupedRooms[room] || [];
              return (
                <section key={room} className="gallery-room-section" id={`room-${room}`}>
                  {/* Judul Ruangan dan Jumlah Foto */}
                  <div className="gallery-room-title">
                    <h3>{room}</h3>
                    <span>{photos.length} photo{photos.length > 1 ? 's' : ''}</span>
                  </div>

                  {/* Grid Foto untuk Ruangan Ini */}
                  <div className="gallery-room-grid">
                    {photos.map((photo) => (
                      <div 
                        key={photo.id}
                        className="gallery-photo-card"
                        onClick={() => handleOpenPhoto(photo.id)}
                        role="button"
                        tabIndex={0}
                        title={`Click to view: ${photo.caption}`}
                      >
                        <img 
                          src={photo.url} 
                          alt={`${villaName} - ${photo.caption}`} 
                          loading="lazy"
                        />
                        {/* Badge Keterangan Asli Airbnb */}
                        <div className="gallery-photo-badge">
                          <span className="gallery-badge-caption">{photo.caption}</span>
                          <span className="gallery-badge-index">#{photo.index}</span>
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
