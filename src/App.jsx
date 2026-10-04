import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExplorePage from './pages/ExplorePage';
import VillaDetailPage from './pages/VillaDetailPage';
import WishlistDrawer from './components/Modals/WishlistDrawer';
import ListVillaModal from './components/Modals/ListVillaModal';
import { INITIAL_VILLAS, getDefaultDate } from './data/villasData';

/**
 * Komponen Utama Aplikasi (App)
 * Mengelola state global aplikasi:
 * - Halaman aktif (Explore katalog atau Detail villa)
 * - Villa yang sedang dipilih
 * - Daftar wishlist tersimpan (disinkronkan dengan LocalStorage browser)
 * - State modal Wishlist dan modal Pendaftaran Villa (Host)
 * - Parameter pencarian terintegrasi
 */
export default function App() {
  // State data master villa (bisa bertambah jika host mendaftarkan villa baru)
  const [villas, setVillas] = useState(() => {
    const saved = localStorage.getItem('bsc_villas');
    return saved ? JSON.parse(saved) : INITIAL_VILLAS;
  });

  // State navigasi halaman ('explore' | 'detail')
  const [currentPage, setCurrentPage] = useState('explore');

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

  // Sinkronisasi data wishlist ke LocalStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('bsc_wishlist', JSON.stringify(savedVillaIds));
  }, [savedVillaIds]);

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
   * Mengembalikan navigasi pengguna ke halaman utama (Katalog Explore)
   */
  const handleGoHome = () => {
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

  // Mencari objek data villa yang saat ini aktif dibuka detailnya
  const currentVilla = villas.find(v => v.id === activeVillaId) || villas[0];

  // Mendapatkan daftar objek villa yang ada di wishlist
  const savedVillasList = villas.filter(v => savedVillaIds.includes(v.id));

  return (
    <div className="app-container wrap">
      {/* Navbar Atas */}
      <Navbar 
        onGoHome={handleGoHome}
        wishlistCount={savedVillaIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenListVilla={() => setIsListVillaOpen(true)}
      />

      {/* Konten Halaman Aktif */}
      {currentPage === 'explore' ? (
        <ExplorePage 
          villas={villas}
          onSelectVilla={handleOpenVillaDetail}
          savedVillaIds={savedVillaIds}
          onToggleSave={handleToggleSaveVilla}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
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
        />
      )}

      {/* Footer Bawah */}
      <Footer 
        onGoHome={handleGoHome}
        onOpenListVilla={() => setIsListVillaOpen(true)}
      />

      {/* Drawer / Modal Wishlist */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedVillas={savedVillasList}
        onSelectVilla={handleOpenVillaDetail}
        onRemoveFromWishlist={handleToggleSaveVilla}
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
