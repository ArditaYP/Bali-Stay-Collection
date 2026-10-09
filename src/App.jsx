import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './components/frontpage/bscFrontpage.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BscNavbar from './components/frontpage/BscNavbar';
import BscFooter from './components/frontpage/BscFooter';
import ExplorePage from './pages/ExplorePage';
import VillaDetailPage from './pages/VillaDetailPage';
import VillaContentEditor from './pages/VillaContentEditor';
import WishlistDrawer from './components/Modals/WishlistDrawer';
import ListVillaModal from './components/Modals/ListVillaModal';
import SearchModal from './components/Modals/SearchModal';
import { INITIAL_VILLAS, getDefaultDate } from './data/villasData';
import { BSC_VILLAS, ACTIVE_AIRBNB_VILLA_IDS, AIRBNB_ONLY_VILLA_IDS } from './data/bscVillasData';

/** Pemetaan ID alias antara katalog villa dan data asli airbnbVillas */
const VILLA_ALIAS_MAP = {
  'villa-infinity-umalas': 'villa-infinity-umalas',
  'villa-satiya': 'villa-satiya',
  'alua-loft': 'alua-loft',
  'villa-aless': 'villa-aless',
  'wellness-estate-canggu': 'wellness-estate-canggu',
  'beachside-haven-canggu': 'beachside-haven-canggu',
  'villa-milana': 'villa-milana',
  'coco-bay': 'coco-bay',
  'berawa-breeze': 'berawa-breeze',
  'the-bull-house': 'the-bull-house',
  'cala-blanca': 'cala-blanca',
  'villa-daun-by-teduh': 'villa-daun-by-teduh',
  'designer-beachside-canggu': 'designer-beachside-canggu',
  'magnificent-canggu-estate': 'magnificent-canggu-estate',
  'house-terra': 'house-terra',
  'villa-habitas': 'villa-habitas',
  'the-palms-villa-canggu': 'villa-habitas',
  'st-lau': 'st-lau-ubud',
  'balangan-cliff-villa': 'iconic-cliff-top-villa',
  'villa-angkasa': 'angkasa-ubud',
  'coco-bay': 'villa-samudra-canggu',
  'the-bull-house': 'villa-kayu-raja-seminyak',
  'villa-imala': 'villa-imala',
  'villa-kanopi': 'villa-cendana-seminyak',
  'villa-mahina': 'villa-mahina',
  'khaleela-villas': 'khaleela-villas',
  'beyond-the-palms': 'beyond-the-palms',
  'villa-akar': 'villa-akar',
  'villa-golden': 'villa-golden',
  'villa-surga': 'villa-surga',
  'house-terra': 'house-terra'
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
  // State data master villa (menggabungkan data segar INITIAL_VILLAS dengan data tersimpan di LocalStorage)
  const [villas, setVillas] = useState(() => {
    const saved = localStorage.getItem('bsc_villas');
    if (!saved) return INITIAL_VILLAS;
    try {
      const parsed = JSON.parse(saved);
      const savedIds = new Set(parsed.map(v => v.id));
      const newVillas = INITIAL_VILLAS.filter(v => !savedIds.has(v.id));
      const updated = parsed.map(v => {
        const fresh = INITIAL_VILLAS.find(iv => iv.id === v.id);
        if (fresh) {
          return {
            ...v,
            ...fresh,
            images: (fresh.images && fresh.images.length) ? fresh.images : (v.images || []),
            img: fresh.img || v.img || '',
            reviews: (fresh.reviews && fresh.reviews.length) ? fresh.reviews : (v.reviews || []),
            rating: fresh.rating ?? v.rating,
            reviewsCount: fresh.reviewsCount ?? v.reviewsCount,
            amenities: (fresh.amenities && fresh.amenities.length) ? fresh.amenities : (v.amenities || []),
            price: fresh.price || v.price,
            name: fresh.name || v.name,
            description: fresh.description || v.description,
            shortDesc: fresh.shortDesc || v.shortDesc,
            fullDesc: fresh.fullDesc || v.fullDesc,
            descriptionSections: fresh.descriptionSections || v.descriptionSections
          };
        }
        return v;
      });
      return [...updated, ...newVillas];
    } catch {
      return INITIAL_VILLAS;
    }
  });

  // Mode filter sementara: hanya menampilkan 13 villa murni dari tautan listing Airbnb
  // (termasuk 4 villa awal: Habitas, Balangan, St. Lau, Angkasa + 9 villa baru)
  const isAirbnbOnlyMode = true;

  // Daftar villa aktif untuk katalog Explore (13 villa murni Airbnb, disinkronkan dengan data database)
  const activeCatalogVillas = useMemo(() => {
    const sourceList = !isAirbnbOnlyMode
      ? BSC_VILLAS
      : AIRBNB_ONLY_VILLA_IDS
          .map(id => BSC_VILLAS.find(bv => bv.id === id))
          .filter(Boolean);

    return sourceList.map(base => {
      const live = villas.find(v => v.id === base.id || v.id === VILLA_ALIAS_MAP[base.id]);
      if (!live) return base;
      return {
        ...base,
        name: live.name || base.name,
        price: live.price !== undefined && live.price !== null ? live.price : base.price,
        tier: live.tier || live.category || base.tier,
        category: live.category || live.tier || base.category,
        area: live.location || live.area || base.area,
        beds: live.beds || base.beds,
        baths: live.baths || live.bathrooms || base.baths,
        guests: live.guests || base.guests,
        shortDesc: live.shortDesc || base.shortDesc || base.desc,
        desc: live.shortDesc || live.description || base.desc,
        description: live.description || base.description,
        am: (base.am && base.am.length) ? base.am : (live.amenities || []),
        amenities: live.amenities || base.amenities || base.am,
        img: live.img || base.img,
        images: (live.images && live.images.length) ? live.images : base.images,
        verified: live.verified !== undefined ? live.verified : base.verified
      };
    });
  }, [isAirbnbOnlyMode, villas]);

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  // Sinkronisasi data master villa terbaru dari Database MySQL (XAMPP / Hostinger)
  useEffect(() => {
    let isMounted = true;
    fetch('/api/villas.php')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data && data.success && Array.isArray(data.villas) && data.villas.length > 0) {
          const dbMap = new Map();
          data.villas.forEach(v => dbMap.set(v.id, v));

          setVillas(prev => {
            return prev.map(pv => {
              const fromDb = dbMap.get(pv.id) || dbMap.get(VILLA_ALIAS_MAP[pv.id]);
              if (!fromDb) return pv;
              return {
                ...pv,
                ...fromDb,
                images: (fromDb.images && fromDb.images.length) ? fromDb.images : pv.images,
                img: fromDb.img || pv.img
              };
            });
          });
        }
      })
      .catch(err => {
        // Fallback anggun jika server PHP belum aktif
        console.info('Koneksi API database: fallback ke local cache/static data (', err.message, ')');
      });

    return () => { isMounted = false; };
  }, []);

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
   * @returns {void}
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
   * @returns {void}
   */
  const handleOpenVillaDetail = (villaId) => {
    setActiveVillaId(villaId);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Menavigasikan pengguna ke halaman editor konten villa
   * @returns {void}
   */
  const handleOpenEditor = () => {
    window.location.hash = 'editor';
    setCurrentPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Mengembalikan navigasi pengguna ke halaman utama (Katalog Explore)
   * @returns {void}
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
   * @returns {void}
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
          img: bscItem?.img || aliased.img || aliased.images?.[0] || '',
          shortDesc: aliased.shortDesc || bscItem?.desc,
          fullDesc: aliased.fullDesc || aliased.description,
          descriptionSections: aliased.descriptionSections || null
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

  // Menghasilkan daftar lengkap villa untuk editor konten (mencakup 13 villa Airbnb di urutan teratas)
  const allEditorVillas = useMemo(() => {
    const priorityList = AIRBNB_ONLY_VILLA_IDS.map(id => resolveVilla(id)).filter(Boolean);
    const priorityIds = new Set(priorityList.map(v => v.id));
    const otherBscList = BSC_VILLAS.map(bv => resolveVilla(bv.id)).filter(v => !priorityIds.has(v.id));
    const existingIds = new Set([...priorityList, ...otherBscList].map(v => v.id));
    const extraVillas = villas.filter(v => !existingIds.has(v.id));
    return [...priorityList, ...otherBscList, ...extraVillas];
  }, [villas, resolveVilla]);

  return (
    <div className="app-container">
      {/* Navbar Atas - Khusus halaman Editor */}
      {currentPage === 'editor' && (
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
          villas={activeCatalogVillas}
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
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      ) : (
        <div className="bsc-frontpage">
          {/* Navbar resmi BSC selaras dengan Halaman Utama */}
          <BscNavbar 
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
            wishlistCount={savedVillaIds.length}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onGoHome={handleGoHome}
            isDetailPage={true}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
          <VillaDetailPage 
            villa={currentVilla}
            allVillas={activeCatalogVillas.map(bv => resolveVilla(bv.id))}
            onBackToCatalog={handleGoHome}
            onSelectSimilarVilla={handleOpenVillaDetail}
            isSaved={savedVillaIds.includes(currentVilla.id)}
            onToggleSave={handleToggleSaveVilla}
            searchParams={searchParams}
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
          />
          {/* Footer resmi BSC selaras dengan Halaman Utama */}
          <BscFooter 
            onOpenListVilla={() => setIsListVillaOpen(true)}
            onOpenEditor={handleOpenEditor}
          />
        </div>
      )}

      {/* Footer Bawah - Khusus halaman Editor */}
      {currentPage === 'editor' && (
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

      {/* Modal Pencarian Cepat Spotlight (⌘K) */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        villas={allEditorVillas}
        onSelectVilla={handleOpenVillaDetail}
        currency={currency}
      />
    </div>
  );
}
