import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExplorePage from './pages/ExplorePage';
import VillaDetailPage from './pages/VillaDetailPage';
import VillaContentEditor from './pages/VillaContentEditor';
import WishlistDrawer from './components/Modals/WishlistDrawer';
import ListVillaModal from './components/Modals/ListVillaModal';
import { INITIAL_VILLAS, getDefaultDate } from './data/villasData';
import { BSC_VILLAS } from './data/bscVillasData';

/** Pemetaan ID alias antara katalog villa dan data asli airbnbVillas */
const VILLA_ALIAS_MAP = {
  'villa-habitas': 'the-palms-villa-canggu',
  'st-lau': 'st-lau-ubud',
  'balangan-cliff-villa': 'iconic-cliff-top-villa',
  'villa-angkasa': 'angkasa-ubud',
  'coco-bay': 'villa-samudra-canggu',
  'the-bull-house': 'villa-kayu-raja-seminyak',
  'villa-imala': 'cliffside-panorama-uluwatu',
  'villa-kanopi': 'villa-cendana-seminyak',
  'villa-surga': 'mandapa-jungle-villa'
};

/**
 * Komponen Utama Aplikasi (App)
 * Mengelola state global aplikasi:
 * - Halaman aktif (Explore katalog, Detail villa, atau Villa Content Editor)
 * - Villa yang sedang dipilih
 * - Daftar wishlist tersimpan (disinkronkan dengan LocalStorage browser)
 * - State modal Wishlist dan modal Pendaftaran Villa (Host)
 * - Parameter pencarian terintegrasi
 */
export default function App() {
  // State data master villa (bisa bertambah jika host mendaftarkan villa baru atau diedit di editor)
  const [villas, setVillas] = useState(() => {
    const saved = localStorage.getItem('bsc_villas');
    return saved ? JSON.parse(saved) : INITIAL_VILLAS;
  });

  // State navigasi halaman ('explore' | 'detail' | 'editor')
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('editor') || path.includes('editor')) {
        return 'editor';
      }
    }
    return 'explore';
  });

  // State ID villa yang sedang aktif dibuka detailnya (default: villa pertama)
  const [activeVillaId, setActiveVillaId] = useState(INITIAL_VILLAS[0]?.id);

  // State ID villa-villa yang disimpan di wishlist
  const [savedVillaIds, setSavedVillaIds] = useState(() => {
    const saved = localStorage.getItem('bsc_wishlist');
    return saved ? JSON.parse(saved) : []; // default wishlist kosong
  });

  // State parameter pencarian global
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: getDefaultDate(7),
    checkOut: getDefaultDate(13),
    guests: 2
  });

  // State kontrol modal
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isListVillaOpen, setIsListVillaOpen] = useState(false);

  // State mata uang aktif ('USD' | 'IDR') yang disinkronkan dengan LocalStorage
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('bsc_currency') || 'USD';
    }
    return 'USD';
  });

  /**
   * Menangani perubahan mata uang global (USD / IDR) dan menyimpannya di LocalStorage
   * @param {string} newCurrency - Kode mata uang baru ('USD' atau 'IDR')
   * @returns {void}
   */
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('bsc_currency', newCurrency);
    }
  };

  // Sinkronisasi data wishlist ke LocalStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('bsc_wishlist', JSON.stringify(savedVillaIds));
  }, [savedVillaIds]);

  // Sinkronisasi rute URL (#editor atau /editor) agar bos/pengguna bisa membuka link langsung
  useEffect(() => {
    /**
     * Menangani perubahan URL hash atau path browser untuk navigasi rute
     * @returns {void}
     */
    const handleUrlChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('editor') || path.includes('editor')) {
        setCurrentPage('editor');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || hash === '#' || hash === '#explore') {
        setCurrentPage('explore');
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  /**
   * Menangani toggle (tambah atau hapus) ID villa dari daftar wishlist
   * @param {string} villaId - ID unik villa yang di-klik love
   */
  const handleToggleSaveVilla = (villaId) => {
    setSavedVillaIds((prev) => {
      if (prev.includes(villaId)) {
        return prev.filter(id => id !== villaId);
      } else {
        return [...prev, villaId];
      }
    });
  };

  /**
   * Menangani pembukaan halaman detail villa
   * Mengatur villa aktif dan mengubah tampilan ke halaman detail dengan scroll ke atas
   * @param {string} villaId - ID unik villa yang dipilih
   */
  const handleOpenVillaDetail = (villaId) => {
    setActiveVillaId(villaId);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Menavigasikan pengguna ke halaman editor konten villa
   */
  const handleOpenEditor = () => {
    window.location.hash = 'editor';
    setCurrentPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Mengembalikan navigasi pengguna ke halaman utama (Katalog Explore)
   */
  const handleGoHome = () => {
    if (window.location.hash.includes('editor')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    setCurrentPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Menambahkan villa baru hasil pendaftaran partner ke daftar katalog
   * @param {Object} newVillaData - Data villa yang diinput oleh pemilik villa
   */
  const handleAddHostVilla = (newVillaData) => {
    const newVilla = {
      id: `villa-${Date.now()}`,
      name: newVillaData.villaName,
      location: newVillaData.location,
      address: `Jl. Utama ${newVillaData.location}, Bali`,
      beds: newVillaData.beds,
      guests: newVillaData.guests,
      bathrooms: Math.max(1, newVillaData.beds - 1),
      category: newVillaData.category || 'Deluxe',
      price: newVillaData.price,
      cleaningFee: 30,
      rating: 5.0,
      reviewsCount: 1,
      isGuestFavorite: false,
      freeCancel: true,
      cardBg: '#CBB9C9',
      description: `Luxury private villa located in ${newVillaData.location} with dedicated staff and modern Balinese comfort.`,
      shortDesc: `Brand new direct-listed villa in ${newVillaData.location} with private pool and full modern amenities.`,
      host: {
        name: newVillaData.ownerName,
        tagline: `Entire villa hosted by ${newVillaData.ownerName}`,
        initials: newVillaData.ownerName.slice(0, 2).toUpperCase(),
        isVerified: true
      },
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
      ],
      features: [
        { title: 'New Direct Listing', desc: 'Direct communication with owner without agency fees.' }
      ],
      amenities: ['Private pool', 'Air conditioning', 'High-speed WiFi (100 Mbps)', 'Free parking'],
      bedrooms: [
        { name: 'Master Room', detail: '1 king bed · en-suite bathroom' }
      ],
      ratingsBreakdown: { cleanliness: 5.0, accuracy: 5.0, checkIn: 5.0, communication: 5.0, location: 5.0, value: 5.0 },
      reviews: []
    };

    setVillas((prev) => [newVilla, ...prev]);
  };

  /**
   * Menemukan atau mengkonstruksi objek detail villa berdasarkan ID
   * Mendukung pemetaan alias untuk 4 villa utama serta fallback 51 villa BSC
   * @param {string} id - ID unik villa
   * @returns {Object} Objek detail lengkap villa
   */
  const resolveVilla = useCallback((id) => {
    // 1. Pencocokan langsung pada master villas (termasuk hasil penambahan/edit)
    const direct = villas.find(v => v.id === id);
    if (direct) return direct;

    // 2. Pencocokan alias ID untuk 4 villa utama
    const aliasId = VILLA_ALIAS_MAP[id];
    if (aliasId) {
      const aliased = villas.find(v => v.id === aliasId);
      if (aliased) {
        const bscItem = BSC_VILLAS.find(bv => bv.id === id);
        return {
          ...aliased,
          name: bscItem?.name || aliased.name,
          category: bscItem?.tier || aliased.category,
          price: bscItem?.price || aliased.price,
          img: bscItem?.img || aliased.img || aliased.images?.[0] || ''
        };
      }
    }

    // 3. Fallback konstruksi data detail dari katalog BSC_VILLAS
    const bscItem = BSC_VILLAS.find(bv => bv.id === id);
    if (bscItem) {
      return {
        id: bscItem.id,
        name: bscItem.name,
        location: bscItem.area,
        address: `${bscItem.area}, Bali`,
        beds: bscItem.beds,
        guests: bscItem.guests,
        bathrooms: bscItem.baths,
        category: bscItem.tier,
        price: bscItem.price || 350,
        cleaningFee: 35,
        rating: 4.95,
        reviewsCount: 14,
        isGuestFavorite: true,
        freeCancel: true,
        cardBg: (bscItem.tone && bscItem.tone[0]) || '#CBB9C9',
        description: bscItem.desc,
        shortDesc: bscItem.desc,
        host: {
          name: 'Bali Stay Collection',
          tagline: 'Entire villa hosted by Bali Stay Collection',
          initials: 'BSC',
          isVerified: true
        },
        img: bscItem.img || '',
        images: bscItem.img ? [bscItem.img] : [
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
        ],
        features: [
          { title: 'Inspected in person', desc: bscItem.updated ? `Inspected on ${bscItem.updated}` : 'Verified by local team' },
          { title: 'Free reschedule', desc: bscItem.cancel || 'Free reschedule up to 7 days before check-in' },
          { title: 'Dedicated local team', desc: 'Managed directly by our Bali team.' }
        ],
        amenities: bscItem.am || ['Private pool', 'High-speed WiFi', 'Air conditioning', 'Daily housekeeping'],
        bedrooms: Array.from({ length: bscItem.beds }, (_, i) => ({
          name: `Bedroom ${i + 1}`,
          detail: '1 king bed · en-suite bathroom'
        })),
        ratingsBreakdown: { cleanliness: 5.0, accuracy: 5.0, checkIn: 4.9, communication: 5.0, location: 4.9, value: 4.9 },
        reviews: []
      };
    }

    return villas[0];
  }, [villas]);

  // Mencari objek data villa yang saat ini aktif dibuka detailnya
  const currentVilla = resolveVilla(activeVillaId);

  // Mendapatkan daftar objek villa yang ada di wishlist
  const savedVillasList = villas.filter(v => savedVillaIds.includes(v.id));

  // Menghasilkan daftar lengkap villa untuk editor konten (mencakup 51 BSC villas dan initial/added villas)
  const allEditorVillas = useMemo(() => {
    const bscFullList = BSC_VILLAS.map(bv => resolveVilla(bv.id));
    const existingIds = new Set(bscFullList.map(v => v.id));
    const extraVillas = villas.filter(v => !existingIds.has(v.id));
    return [...bscFullList, ...extraVillas];
  }, [villas, resolveVilla]);

  return (
    <div className="app-container">
      {/* Navbar Atas - Tampil khusus pada halaman Detail dan Editor */}
      {currentPage !== 'explore' && (
        <Navbar 
          onGoHome={handleGoHome}
          wishlistCount={savedVillaIds.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenListVilla={() => setIsListVillaOpen(true)}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />
      )}

      {/* Konten Halaman Aktif */}
      {currentPage === 'editor' ? (
        <VillaContentEditor 
          villas={allEditorVillas}
          currency={currency}
          onUpdateVillas={(updatedList) => {
            setVillas(updatedList);
            localStorage.setItem('bsc_villas', JSON.stringify(updatedList));
          }}
          onBackToCatalog={handleGoHome}
          onPreviewDetail={(villaId) => {
            handleOpenVillaDetail(villaId);
          }}
        />
      ) : currentPage === 'explore' ? (
        <ExplorePage 
          villas={BSC_VILLAS}
          onSelectVilla={handleOpenVillaDetail}
          savedVillaIds={savedVillaIds}
          onToggleSave={handleToggleSaveVilla}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenListVilla={() => setIsListVillaOpen(true)}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          onOpenEditor={handleOpenEditor}
        />
      ) : (
        <VillaDetailPage 
          villa={currentVilla}
          allVillas={villas}
          onBackToCatalog={handleGoHome}
          onSelectSimilarVilla={handleOpenVillaDetail}
          isSaved={savedVillaIds.includes(currentVilla.id)}
          onToggleSave={handleToggleSaveVilla}
          searchParams={searchParams}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />
      )}

      {/* Footer Bawah - Tampil khusus pada halaman Detail dan Editor */}
      {currentPage !== 'explore' && (
        <Footer 
          onGoHome={handleGoHome}
          onOpenListVilla={() => setIsListVillaOpen(true)}
          onOpenEditor={handleOpenEditor}
        />
      )}

      {/* Drawer / Modal Wishlist */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedVillas={savedVillasList}
        onSelectVilla={handleOpenVillaDetail}
        onRemoveFromWishlist={handleToggleSaveVilla}
        currency={currency}
      />

      {/* Modal Pendaftaran Villa Host */}
      <ListVillaModal 
        isOpen={isListVillaOpen}
        onClose={() => setIsListVillaOpen(false)}
        onAddVilla={handleAddHostVilla}
      />
    </div>
  );
}
