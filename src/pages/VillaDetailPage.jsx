import React, { useState, useMemo, useEffect } from 'react';
import { calculateNights, checkDateRangeAvailability } from '../data/villasData';
import { formatBscMoney } from '../utils/bscFormat';
import GalleryModal from '../components/Modals/GalleryModal';
import BookingModal from '../components/Modals/BookingModal';
import CalendarPicker from '../components/CalendarPicker';
import ReviewFormSection from '../components/ReviewFormSection';
import ReviewCard from '../components/ReviewCard';
import ReviewsModal from '../components/Modals/ReviewsModal';
import ReviewMentions from '../components/ReviewMentions';
import ConciergeFinder from '../components/ConciergeFinder';
import NeighborhoodMap from '../components/NeighborhoodMap';
import { getMentionsForReviews, reviewMatchesTopic, getTopicKeywords } from '../utils/reviewMentions';

/** Jumlah review yang ditampilkan langsung di halaman (sisanya ada di modal "Show all") */
const REVIEW_PREVIEW_COUNT = 6;

/**
 * Memformat dan merender blok teks deskripsi villa menjadi elemen JSX terstruktur
 * Mendeteksi judul bagian huruf kapital (seperti LIVING & DINING, KITCHEN, dll)
 * dan memformat paragraf serta subjudul secara rapi.
 * 
 * @param {string} text - Teks deskripsi lengkap villa
 * @returns {React.JSX.Element[]} Array elemen paragraf dan subjudul JSX terformat
 */
function renderFormattedDescription(text) {
  if (!text) return null;
  const normalized = typeof text === 'string' ? text.replace(/\\n/g, '\n') : String(text);
  const blocks = normalized.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Abaikan dan hilangkan bagian REGISTRATION DETAILS / NIB / KBLI sesuai instruksi pengguna
    const upper = trimmed.toUpperCase();
    if (
      upper.includes('REGISTRATION DETAILS') ||
      upper.includes('REGISTRATION DETAIL') ||
      /^NIB:\s*\d+/i.test(trimmed) ||
      /^KBLI:\s*\d+/i.test(trimmed)
    ) {
      return null;
    }

    // Deteksi apakah blok ini merupakan judul bagian kapital (misal: LIVING & DINING, KITCHEN, dll)
    const isHeaderLine = /^[A-Z0-9\s&•·\-_/:]{3,40}$/.test(trimmed.split('\n')[0]);
    if (isHeaderLine && trimmed.split('\n').length === 1) {
      return (
        <h4 
          key={index} 
          style={{
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.5px',
            color: 'var(--ink, #141413)',
            marginTop: '20px',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}
        >
          {trimmed}
        </h4>
      );
    }

    // Jika blok memiliki judul kapital di baris pertama diikuti penjelasan di baris berikutnya
    const lines = trimmed.split('\n');
    if (lines.length > 1 && /^[A-Z0-9\s&•·\-_/:]{3,40}$/.test(lines[0].trim())) {
      const header = lines[0].trim();
      const body = lines.slice(1).join('\n');
      return (
        <div key={index} style={{ marginTop: '18px', marginBottom: '12px' }}>
          <h4 
            style={{
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: 'var(--ink, #141413)',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            {header}
          </h4>
          <p 
            style={{
              fontSize: '14.5px',
              lineHeight: 1.7,
              color: 'var(--ink-soft, #484841)',
              margin: 0,
              whiteSpace: 'pre-line'
            }}
          >
            {body}
          </p>
        </div>
      );
    }

    return (
      <p 
        key={index}
        style={{
          fontSize: '14.5px',
          lineHeight: 1.7,
          color: 'var(--ink-soft, #484841)',
          marginTop: 0,
          marginBottom: '14px',
          whiteSpace: 'pre-line'
        }}
      >
        {trimmed}
      </p>
    );
  });
}

/**
 * Merender konten penjelasan detail villa secara lengkap dan terstruktur ke bawah (inline accordion).
 * Menampilkan teks deskripsi utama, serta bagian akses tamu dan tim lokal jika relevan.
 * 
 * @param {Object} v - Objek data villa aktif
 * @returns {React.JSX.Element|null} Elemen JSX detail penjelasan lengkap villa
 */
function renderDetailDescription(v) {
  if (!v) return null;
  const hasCustomFullDesc = Boolean(v.fullDesc && typeof v.fullDesc === 'string' && v.fullDesc.trim().length > 0);
  const primaryText = hasCustomFullDesc ? v.fullDesc : (v.description || v.shortDesc || '');

  return (
    <div className="desc-expanded-wrapper" style={{ marginTop: '4px' }}>
      {renderFormattedDescription(primaryText)}

      {!hasCustomFullDesc && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--line, #E8E6DF)' }}>
          <h4 
            style={{ 
              fontSize: '14px', 
              fontWeight: 700, 
              color: 'var(--ink, #141413)', 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            Guest Access & Dedicated Support
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft, #484841)', margin: 0 }}>
            Enjoy private and exclusive access to the entire villa and its private pool. Daily housekeeping and our on-the-ground Bali Stay Collection concierge are available throughout your stay.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Komponen Halaman VillaDetailPage (Halaman Rincian & Reservasi Villa)
 * Mengimplementasikan tata letak dan interaktivitas persis sesuai desain mockup: villa-kana-retreat-detail.html.
 * Telah disempurnakan dengan responsivitas adaptif penuh:
 * - Desktop: Sticky booking widget di kolom kanan dan grid galeri 5 foto
 * - Mobile / Tablet: Tata letak 1 kolom, galeri foto teroptimasi, dan Floating Bottom Reserve Bar
 * 
 * @param {Object} props
 * @param {Object} props.villa - Data villa terpilih yang ditampilkan
 * @param {Object[]} props.allVillas - Seluruh daftar villa untuk menampilkan villa serupa
 * @param {Function} props.onBackToCatalog - Callback untuk kembali ke halaman katalog utama
 * @param {Function} props.onSelectSimilarVilla - Callback saat memilih villa serupa
 * @param {boolean} props.isSaved - Status apakah villa ini disimpan di wishlist
 * @param {Function} props.onToggleSave - Callback untuk toggle wishlist
 * @param {Object} props.searchParams - Parameter tanggal dan tamu awal dari pencarian
 * @param {string} [props.currency='USD'] - Mata uang aktif ('USD' atau 'IDR')
 * @param {Function} [props.onCurrencyChange] - Callback perubahan mata uang global
 * @returns {React.JSX.Element} Elemen JSX Halaman Detail Villa
 */
export default function VillaDetailPage({
  villa,
  allVillas = [],
  onBackToCatalog,
  onSelectSimilarVilla,
  isSaved,
  onToggleSave,
  searchParams,
  currency = 'USD',
  onCurrencyChange
}) {
  // State untuk tanggal dan jumlah tamu pada widget reservasi
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || '2026-10-12');
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || '2026-10-18');
  const [selectedGuests, setSelectedGuests] = useState(searchParams.guests || 2);

  // State untuk modal galeri foto dan modal reservasi
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  // State untuk ekspansi penjelasan detail villa ke bawah (inline accordion Show more / Show less)
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  // State untuk modal "Show all reviews"
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  // State untuk topik ulasan (Guest reviews mention) yang sedang aktif dipilih
  const [selectedMention, setSelectedMention] = useState(null);

  // State untuk daftar ulasan tamu pada villa ini (bisa bertambah secara interaktif)
  const [reviews, setReviews] = useState(villa.reviews || []);

  /**
   * Membuka modal galeri foto lengkap (bisa langsung ke index tertentu atau mode grid tour)
   * @param {number|null} [photoIndex=null] - Index foto yang ingin ditampilkan langsung dalam mode fokus
   * @returns {void}
   */
  const handleOpenGallery = (photoIndex = null) => {
    setGalleryInitialIndex(photoIndex);
    setIsGalleryOpen(true);
  };

  // Menyiapkan 8 foto showcase (3 atas + 5 bawah) sesuai format contoh.jpeg
  const showcasePhotos = useMemo(() => {
    const list = villa.images || [];
    if (list.length === 0) return Array(8).fill('');
    return Array.from({ length: 8 }).map((_, i) => list[i % list.length]);
  }, [villa.images]);

  // Menghitung sisa foto untuk teks overlay "+X photos" pada foto ke-8
  const remainingPhotosCount = useMemo(() => {
    const total = villa.images?.length || 0;
    if (total > 7) {
      return total - 7;
    }
    return total;
  }, [villa.images]);

  // Penjelasan ringkas untuk tampilan awal di halaman detail sebelum tombol Show more diklik
  const previewDescription = useMemo(() => {
    if (villa.shortDesc && typeof villa.shortDesc === 'string' && villa.shortDesc.trim().length > 0) {
      return villa.shortDesc.trim();
    }
    const desc = typeof villa.description === 'string' ? villa.description : '';
    if (desc.length > 220) {
      return desc.slice(0, 200).trim() + '...';
    }
    return desc;
  }, [villa.shortDesc, villa.description]);

  // Sinkronisasi ulasan, reset pilihan mention & reset ekspansi deskripsi saat properti villa berubah
  useEffect(() => {
    setReviews(villa.reviews || []);
    setSelectedMention(null);
    setIsDescExpanded(false);
  }, [villa]);

  // Ekstraksi topik-topik mention yang relevan untuk villa ini
  const availableMentions = useMemo(() => getMentionsForReviews(reviews), [reviews]);

  // Daftar review yang difilter oleh topik mention di halaman detail
  const filteredReviews = useMemo(() => {
    if (!selectedMention) return reviews;
    return reviews.filter((r) => reviewMatchesTopic(r, selectedMention));
  }, [reviews, selectedMention]);

  // Kata kunci topik yang sedang aktif untuk di-highlight di kartu review
  const activeMentionKeywords = useMemo(() => {
    return selectedMention ? getTopicKeywords(selectedMention) : [];
  }, [selectedMention]);

  // Objek informasi topik mention yang sedang aktif
  const activeMentionObj = useMemo(() => {
    return availableMentions.find((m) => m.id === selectedMention);
  }, [availableMentions, selectedMention]);

  /**
   * Menambahkan ulasan baru dari tamu ke daftar ulasan villa
   * @param {Object} newReview - Objek ulasan baru yang dibuat tamu
   */
  const handleAddReview = (newReview) => {
    // createdAt ditambahkan agar review baru muncul paling atas saat diurutkan "Most recent"
    setReviews(prev => [{ createdAt: new Date().toISOString(), ...newReview }, ...prev]);
  };

  // Menghitung jumlah malam menginap berdasarkan tanggal check-in & check-out
  const nights = useMemo(() => {
    const calc = calculateNights(checkIn, checkOut);
    return calc > 0 ? calc : 1;
  }, [checkIn, checkOut]);

  // Kalkulasi rincian harga
  const subtotal = villa.price * nights;
  const cleaningFee = villa.cleaningFee || 35;
  const total = subtotal + cleaningFee;

  /**
   * Menangani tombol Share untuk membagikan tautan villa ke papan klip (clipboard)
   */
  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan villa berhasil disalin ke clipboard!');
    } else {
      alert(`Bagikan villa ini: ${villa.name} - ${window.location.href}`);
    }
  };

  // Validasi apakah rentang tanggal yang dipilih bertabrakan dengan tanggal yang sudah di-book
  const dateAvailability = useMemo(() => {
    return checkDateRangeAvailability(checkIn, checkOut, villa.bookedDays || []);
  }, [checkIn, checkOut, villa.bookedDays]);

  /**
   * Menangani klik tombol Reserve untuk membuka modal checkout reservasi
   * Menolak jika rentang tanggal bertabrakan dengan tanggal yang sudah di-book tamu lain
   * @returns {void}
   */
  const handleReserveClick = () => {
    if (!dateAvailability.isAvailable) {
      alert(`❌ Tidak dapat melanjutkan reservasi:\n\n${dateAvailability.message}`);
      return;
    }
    setIsBookingModalOpen(true);
  };

  // Mengambil 3 villa serupa dari destinasi yang sama atau terdekat
  const similarVillas = useMemo(() => {
    return allVillas
      .filter((v) => v.id !== villa.id)
      .slice(0, 3);
  }, [allVillas, villa.id]);

  return (
    <div className="villa-detail-page">
      {/* Kontainer Utama Detail Villa (Sejajar sempurna dengan lebar Header & Footer) */}
      <div className="wrap-detail">
        {/* 1. Baris Judul & Breadcrumb */}
        <div className="title-row">
          <div className="breadcrumb">
            <a onClick={onBackToCatalog}>Home</a> /{' '}
            <a onClick={onBackToCatalog}>{villa.location}</a> / {villa.name}
          </div>

          <div className="title-head">
          <div>
            <h1 className="villa-title">{villa.name}</h1>
            <div className="title-meta">
              <span className="rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#141413">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
                {villa.rating} &middot; {villa.reviewsCount} reviews
              </span>
              <span>&middot;</span>
              <span>{villa.location}, Bali</span>
              {villa.isGuestFavorite && (
                <>
                  <span>&middot;</span>
                  <span style={{ color: '#2F6B3A', fontWeight: 700 }}>Guest Favorite</span>
                </>
              )}
            </div>
          </div>

          {/* Tombol Aksi: Share & Save */}
          <div className="title-actions">
            <button type="button" className="icon-btn btn-outline" onClick={handleShareClick}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.6 10.5l6.8-3.9M8.6 13.5l6.8 3.9" />
              </svg>
              Share
            </button>
            <button 
              type="button" 
              className="icon-btn btn-outline"
              onClick={() => onToggleSave(villa.id)}
            >
              <svg 
                width="15" 
                height="15" 
                viewBox="0 0 24 24" 
                fill={isSaved ? "#E4572E" : "none"} 
                stroke={isSaved ? "#E4572E" : "#141413"} 
                strokeWidth="2"
              >
                <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
              </svg>
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Galeri Foto Mewah Sesuai Format contoh.jpeg (3 Foto Hero Atas + 5 Foto Sejajar Bawah dengan Overlay +X Photos) */}
      <div className="gallery-showcase">
        {/* Bagian Atas: 1 Foto Utama Besar (Kiri) + 2 Foto Susun Vertikal (Kanan) */}
        <div className="gallery-top-grid">
          <div 
            className="gallery-item gallery-hero-main" 
            style={{ 
              backgroundImage: `url('${showcasePhotos[0]}')`, 
              backgroundColor: villa.cardBg 
            }}
            onClick={() => handleOpenGallery(0)}
            role="button"
            tabIndex={0}
            title={`${villa.name} - Foto Utama (Klik untuk memperbesar)`}
          >
            {/* Badge penanda foto khusus di layar ponsel / mobile */}
            <div 
              className="gallery-mobile-badge"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenGallery(null);
              }}
              title="Lihat semua foto"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>1 / {villa.images.length}</span>
            </div>
          </div>

          <div className="gallery-hero-stack">
            <div 
              className="gallery-item gallery-hero-sub" 
              style={{ backgroundImage: `url('${showcasePhotos[1]}')` }}
              onClick={() => handleOpenGallery(1)}
              role="button"
              tabIndex={0}
              title={`${villa.name} - Foto 2`}
            />
            <div 
              className="gallery-item gallery-hero-sub" 
              style={{ backgroundImage: `url('${showcasePhotos[2]}')` }}
              onClick={() => handleOpenGallery(2)}
              role="button"
              tabIndex={0}
              title={`${villa.name} - Foto 3`}
            />
          </div>
        </div>

        {/* Bagian Bawah: 5 Foto Sejajar Horizontal */}
        <div className="gallery-bottom-grid">
          {showcasePhotos.slice(3, 7).map((photoUrl, idx) => (
            <div 
              key={`thumb-${idx + 3}`}
              className="gallery-item gallery-thumb"
              style={{ backgroundImage: `url('${photoUrl}')` }}
              onClick={() => handleOpenGallery(idx + 3)}
              role="button"
              tabIndex={0}
              title={`${villa.name} - Foto ${idx + 4}`}
            />
          ))}

          {/* Foto ke-5 di Baris Bawah (Total Foto ke-8) dengan Overlay Elegan "+X photos" */}
          <div 
            className="gallery-item gallery-thumb gallery-thumb-more"
            style={{ backgroundImage: `url('${showcasePhotos[7]}')` }}
            onClick={() => handleOpenGallery(null)}
            role="button"
            tabIndex={0}
            title={`Buka seluruh galeri foto (${villa.images.length} foto)`}
          >
            <div className="gallery-more-overlay">
              <span className="gallery-more-text">
                +{remainingPhotosCount} photos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Grid Konten Utama */}
      <div className="main-grid">
        <div className="main-col">
          {/* Section: Host Info */}
          <div className="section host-row">
            <div className="host-left">
              <h2>{villa.host.tagline}</h2>
              <p>{villa.guests} guests &middot; {villa.beds} bedrooms &middot; {villa.beds} beds &middot; {villa.bathrooms} bathrooms</p>
            </div>
            <div className="host-avatar">{villa.host.initials}</div>
          </div>

          {/* Section: Fitur Keunggulan */}
          <div className="section">
            <div className="feature-grid">
              {villa.features.map((feat, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C96F4A" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </div>
                  <div>
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Deskripsi Villa (Penjelasan Ringkas di Awal & Ekspansi ke Bawah via Show more / Show less) */}
          <div className="section" id="about-space-section">
            <h2 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 12px' }}>About this space</h2>
            {!isDescExpanded ? (
              <>
                <p className="desc-text" style={{ whiteSpace: 'pre-line', marginBottom: '14px', lineHeight: 1.65 }}>
                  {previewDescription}
                </p>
                <button 
                  type="button" 
                  className="show-more-inline-btn" 
                  onClick={() => setIsDescExpanded(true)}
                  aria-expanded="false"
                  aria-controls="villa-full-desc"
                  aria-label="Tampilkan penjelasan lengkap villa ke bawah"
                >
                  Show more
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </>
            ) : (
              <div id="villa-full-desc">
                {renderDetailDescription(villa)}
                <button 
                  type="button" 
                  className="show-more-inline-btn" 
                  onClick={() => {
                    setIsDescExpanded(false);
                    const section = document.getElementById('about-space-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{ marginTop: '14px' }}
                  aria-expanded="true"
                  aria-controls="villa-full-desc"
                  aria-label="Tutup penjelasan lengkap villa"
                >
                  Show less
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Section: Pembagian Kamar Tidur (Where you'll sleep) */}
          <div className="section">
            <h2 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 18px' }}>Where you'll sleep</h2>
            <div className="sleep-grid">
              {villa.bedrooms.map((bed, idx) => (
                <div key={idx} className="sleep-card">
                  <div className="icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="1.8">
                      <path d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7" />
                      <path d="M3 11V8a2 2 0 012-2h4a2 2 0 012 2v3" />
                      <path d="M3 18h18" />
                    </svg>
                  </div>
                  <b>{bed.name}</b>
                  <p>{bed.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Fasilitas Lengkap (What this place offers) */}
          <div className="section">
            <h2 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 18px' }}>What this place offers</h2>
            <div className="amenity-grid">
              {villa.amenities.map((amenity, idx) => (
                <div key={idx} className="amenity-item">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l2 2 6-6" />
                  </svg>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Mini Kalender Ketersediaan Dinamis */}
          <div className="section" style={{ borderBottom: 'none' }}>
            <CalendarPicker 
              checkIn={checkIn}
              checkOut={checkOut}
              onDatesChange={(newCheckIn, newCheckOut) => {
                setCheckIn(newCheckIn);
                setCheckOut(newCheckOut);
              }}
              bookedDays={villa.bookedDays || [3, 4, 21, 22]}
              location={villa.location}
              nights={nights}
            />
          </div>
        </div>

        {/* Kolom Kanan: Sticky Booking Widget (Desktop & Tablet) */}
        {/* Mengikuti scroll hanya sampai akhir kalender ketersediaan, lalu berhenti */}
        <div className="booking-col" id="booking-widget-section">
          <div className="booking-card">
            <div className="booking-price">
              <span className="amt">{formatBscMoney(villa.price, currency)}</span>
              <span className="unit">/ night</span>
              <span className="booking-rating">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#141413">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                </svg>
                {villa.rating} ({villa.reviewsCount})
              </span>
            </div>

            {/* Input Tanggal Menginap */}
            <div className={`date-grid ${!dateAvailability.isAvailable ? 'has-error' : ''}`}>
              <label>
                <div className="lbl">Check-in</div>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </label>
              <label>
                <div className="lbl">Check-out</div>
                <input 
                  type="date" 
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </label>
            </div>

            {/* Banner Peringatan Jika Tanggal Bentrok dengan Booked Days */}
            {!dateAvailability.isAvailable && (
              <div className="booking-date-error-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>{dateAvailability.message}</span>
              </div>
            )}

            {/* Pilihan Jumlah Tamu */}
            <div className="guest-select">
              <div className="lbl">Guests</div>
              <select 
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(Number(e.target.value))}
              >
                {Array.from({ length: villa.guests }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Tombol Reservasi Langsung */}
            <button 
              type="button" 
              className={`reserve-btn btn-primary ${!dateAvailability.isAvailable ? 'btn-disabled' : ''}`}
              onClick={handleReserveClick}
              disabled={!dateAvailability.isAvailable}
              title={!dateAvailability.isAvailable ? dateAvailability.message : 'Lanjutkan ke reservasi'}
            >
              {dateAvailability.isAvailable ? 'Reserve' : 'Dates Unavailable'}
            </button>
            <p className="no-charge-note">
              {dateAvailability.isAvailable ? "You won't be charged yet" : "Pilih rentang tanggal yang tersedia"}
            </p>

            {/* Kalkulasi Otomatis Rincian Biaya */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>{formatBscMoney(villa.price, currency)} x {nights} nights</span>
                <span>{formatBscMoney(subtotal, currency)}</span>
              </div>
              <div className="price-row">
                <span>Cleaning fee</span>
                <span>{formatBscMoney(cleaningFee, currency)}</span>
              </div>
              <div className="price-row">
                <span>Direct service fee</span>
                <span style={{ color: '#2F6B3A', fontWeight: 600 }}>{currency === 'IDR' ? 'Rp 0' : '$0'}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>{formatBscMoney(total, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BAGIAN BAWAH FULL-WIDTH (SEPERTI AIRBNB ASLI)
          Mengambil seluruh ruang kontainer (full width) tanpa booking card
          ========================================================= */}

      {/* 4. Section: Rincian Rating & Ulasan Tamu (Full Width) */}
      <div className="detail-full-section" id="reviews-section">
        <div className="review-summary review-summary-full">
          <div className="review-score">
            <div className="num">{villa.rating}</div>
            <div className="label">★★★★★<br />{villa.reviewsCount} reviews</div>
          </div>
          <div className="review-bars">
            <div className="bar-row">
              <span style={{ width: '105px' }}>Cleanliness</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(villa.ratingsBreakdown.cleanliness / 5) * 100}%` }}></div></div>
              <span>{villa.ratingsBreakdown.cleanliness}</span>
            </div>
            <div className="bar-row">
              <span style={{ width: '105px' }}>Accuracy</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(villa.ratingsBreakdown.accuracy / 5) * 100}%` }}></div></div>
              <span>{villa.ratingsBreakdown.accuracy}</span>
            </div>
            <div className="bar-row">
              <span style={{ width: '105px' }}>Check-in</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(villa.ratingsBreakdown.checkIn / 5) * 100}%` }}></div></div>
              <span>{villa.ratingsBreakdown.checkIn}</span>
            </div>
            <div className="bar-row">
              <span style={{ width: '105px' }}>Communication</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(villa.ratingsBreakdown.communication / 5) * 100}%` }}></div></div>
              <span>{villa.ratingsBreakdown.communication}</span>
            </div>
            <div className="bar-row">
              <span style={{ width: '105px' }}>Location</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(villa.ratingsBreakdown.location / 5) * 100}%` }}></div></div>
              <span>{villa.ratingsBreakdown.location}</span>
            </div>
            <div className="bar-row">
              <span style={{ width: '105px' }}>Value</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(villa.ratingsBreakdown.value / 5) * 100}%` }}></div></div>
              <span>{villa.ratingsBreakdown.value}</span>
            </div>
          </div>
        </div>

        {/* Fitur Guest reviews mention: Topic Pills */}
        {availableMentions.length > 0 && (
          <ReviewMentions
            mentions={availableMentions}
            selectedMention={selectedMention}
            onSelectMention={setSelectedMention}
            totalCount={reviews.length}
            variant="full"
          />
        )}

        {/* Keterangan filter aktif pada halaman */}
        {selectedMention && (
          <div className="review-active-filter-banner">
            <span>
              Showing {filteredReviews.length} review{filteredReviews.length === 1 ? '' : 's'} mentioning <strong>"{activeMentionObj?.label || selectedMention}"</strong>
            </span>
            <button
              type="button"
              className="link-btn"
              onClick={() => setSelectedMention(null)}
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Kartu Ulasan Tamu: tampilkan review (terfilter jika topik dipilih) */}
        {filteredReviews.length > 0 ? (
          <>
            <div className="review-grid">
              {filteredReviews.slice(0, REVIEW_PREVIEW_COUNT).map((rev, idx) => (
                <ReviewCard
                  key={rev.id || idx}
                  review={rev}
                  highlight={activeMentionKeywords}
                />
              ))}
            </div>

            {/* Tombol untuk membuka modal berisi semua review */}
            <button
              type="button"
              className="show-all-reviews-btn btn-outline"
              onClick={() => setIsReviewsOpen(true)}
            >
              {selectedMention
                ? `Show all ${filteredReviews.length} reviews mentioning ${activeMentionObj?.label || selectedMention}`
                : `Show all ${Math.max(reviews.length, villa.reviewsCount || 0)} reviews`}
            </button>
          </>
        ) : selectedMention ? (
          <div className="review-empty-state">
            <p>Tidak ada ulasan yang membicarakan topik "{activeMentionObj?.label || selectedMention}".</p>
            <button
              type="button"
              className="btn-outline"
              style={{ marginTop: '10px' }}
              onClick={() => setSelectedMention(null)}
            >
              Tampilkan semua ulasan
            </button>
          </div>
        ) : (
          <div style={{
            padding: '24px',
            textAlign: 'center',
            background: 'var(--bg)',
            borderRadius: '12px',
            border: '1px dashed var(--line)',
            color: 'var(--muted2)'
          }}>
            <p style={{ margin: 0, fontSize: '13.5px' }}>
              Belum ada ulasan untuk villa ini. Jadilah tamu pertama yang memberikan ulasan!
            </p>
          </div>
        )}

        {/* Tempat / Section untuk Review Tamu */}
        <ReviewFormSection 
          villaName={villa.name}
          onAddReview={handleAddReview}
        />
      </div>

      {/* 5. Section: Lokasi Peta & Lingkungan Sekitar (Where you'll be) (Full Width) */}
      <div className="detail-full-section" id="location-section">
        <NeighborhoodMap villa={villa} />
      </div>

      {/* Concierge Matching Finder ("Not sure which villa?") */}
      <section className="detail-full-section" id="finder">
        <ConciergeFinder 
          allVillas={allVillas}
          currentVilla={villa}
          onSelectVilla={onSelectSimilarVilla}
          currency={currency}
        />
      </section>

      {/* 6. Section: Kebijakan (Things to know) (Full Width 3 Kolom) */}
      <div className="detail-full-section" style={{ borderBottom: 'none' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 20px' }}>Things to know</h2>
        <div className="things-to-know-grid">
          <div className="policy-item">
            <h4>House rules</h4>
            <p>Check-in after 2:00 PM &middot; Check-out before 11:00 AM &middot; No indoor smoking &middot; Quiet hours after 10:00 PM</p>
          </div>
          <div className="policy-item">
            <h4>Health &amp; safety</h4>
            <p>Private pool is unfenced — adult supervision required. Carbon monoxide alarm, smoke detector, and first aid kit on site.</p>
          </div>
          <div className="policy-item">
            <h4>Cancellation policy</h4>
            <p>Free full refund up to 7 days before check-in. Reschedule allowed at zero extra surcharge.</p>
          </div>
        </div>
      </div>
    </div>

      {/* 4. Rekomendasi Villa Serupa (Other villas you might like) - Full-width latar hangat */}
      <section className="similar-section">
        <div className="similar-inner">
          <h2>Other villas you might like</h2>
          <div className="similar-grid">
            {similarVillas.map((simVilla) => (
              <div 
                key={simVilla.id}
                className="similar-card"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectSimilarVilla(simVilla.id);
                }}
              >
                <div 
                  className="similar-thumb"
                  style={{
                    backgroundImage: `url('${simVilla.images[0]}')`,
                    backgroundColor: simVilla.cardBg
                  }}
                />
                <div className="similar-body">
                  <div className="name">{simVilla.name}</div>
                  <div className="loc">{simVilla.location}, Bali</div>
                  <div className="price">
                    {formatBscMoney(simVilla.price, currency)} <span>/ night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom Bar Khusus Layar Ponsel (Mobile Devices) */}
      <div className="mobile-bottom-bar">
        <div className="bottom-price">
          <strong>{formatBscMoney(villa.price, currency)} <small style={{ fontWeight: 400, color: 'var(--muted)', fontSize: '12px' }}>/ night</small></strong>
          <span>{nights} nights · {checkIn.slice(5)} – {checkOut.slice(5)}</span>
        </div>
        <button
          type="button"
          className={`bottom-reserve-btn btn-primary ${!dateAvailability.isAvailable ? 'btn-disabled' : ''}`}
          onClick={handleReserveClick}
          disabled={!dateAvailability.isAvailable}
        >
          {dateAvailability.isAvailable ? 'Reserve' : 'Unavailable'}
        </button>
      </div>

      {/* Modal Galeri Lightbox Berkelompok per Ruangan */}
      <GalleryModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={villa.images}
        photoCaptions={villa.photoCaptions}
        villaName={villa.name}
        initialPhotoIndex={galleryInitialIndex}
      />


      {/* Modal Semua Review (dibuka dari tombol "Show all reviews") */}
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        villa={villa}
        reviews={reviews}
        initialMention={selectedMention}
      />

      {/* Modal Konfirmasi Reservasi / Checkout */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        villa={villa}
        checkIn={checkIn}
        checkOut={checkOut}
        nights={nights}
        guests={selectedGuests}
        currency={currency}
        onBookingSuccess={(bookingRecord) => {
          console.log('Reservasi baru berhasil disimpan:', bookingRecord);
        }}
      />
    </div>
  );
}
