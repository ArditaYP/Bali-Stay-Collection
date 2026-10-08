import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  getVillaCoordinates, 
  getNearbyPlaces, 
  NEARBY_CATEGORIES 
} from '../data/neighborhoodData';

/**
 * Komponen NeighborhoodMap
 * Menampilkan modul peta interaktif 'Where you'll be' ala Airbnb dengan fitur:
 * - Peta nyata (Leaflet + OpenStreetMap) yang dapat di-zoom dan digeser
 * - Pin lokasi villa dengan lingkaran radius privasi halus khas villa mewah
 * - Bar pencarian tempat sekitar (cafe, pantai, beach club, yoga, dll.)
 * - Tombol filter kategori tempat menarik
 * - Pin tempat interaktif dengan sinkronisasi klik dua arah (daftar kartu & peta)
 * - Tautan langsung petunjuk arah ke Google Maps dengan event isolation lengkap
 * 
 * @param {Object} props
 * @param {Object} props.villa - Objek data villa yang sedang aktif ditampilkan
 * @returns {React.JSX.Element} Elemen JSX Peta Lokasi Lingkungan Sekitar
 */
export default function NeighborhoodMap({ villa }) {
  // Koordinat geografis villa (didukung resolusi alias & area cerdas)
  const villaCoords = useMemo(() => getVillaCoordinates(villa?.id, villa), [villa?.id, villa]);
  // Seluruh daftar tempat menarik di sekitar villa ini
  const allPlaces = useMemo(() => getNearbyPlaces(villa?.id, villa), [villa?.id, villa]);

  // State pencarian teks dari input user
  const [searchQuery, setSearchQuery] = useState('');
  // State kategori aktif yang dipilih ('all', 'beach', 'cafe', dll.)
  const [activeCategory, setActiveCategory] = useState('all');
  // State ID tempat yang sedang dipilih / aktif di peta
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  // Ref kontainer elemen DOM peta
  const mapContainerRef = useRef(null);
  // Ref instance objek peta Leaflet
  const mapInstanceRef = useRef(null);
  // Ref kumpulan layer marker tempat sekitar
  const placesLayerGroupRef = useRef(null);
  // Ref peta marker dictionary (id -> L.marker)
  const markersDictRef = useRef({});
  // Ref tombol floating gmaps
  const floatingGmapsRef = useRef(null);
  // Ref elemen DOM kartu tempat untuk scrolling halus
  const placeCardsRef = useRef({});

  // URL Google Maps untuk villa: Menggunakan nama bersih villa + area terkurasi di Bali
  const villaGmapsUrl = useMemo(() => {
    let cleanName = (villa?.name || '')
      .split(/–|-|•|:/)[0]
      .replace(/\b\d+BR\b/gi, '')
      .trim();

    if (cleanName.length < 3) {
      cleanName = villa?.name || 'Villa';
    }

    const area = villaCoords?.areaName || villa?.location || villa?.address || 'Bali';
    const query = `${cleanName}, ${area}, Bali`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }, [villa?.name, villa?.location, villa?.address, villaCoords?.areaName]);

  /**
   * Menghasilkan elemen HTML ikon custom untuk marker villa utama
   * @returns {L.DivIcon} Ikon Leaflet custom untuk villa
   */
  const createVillaIcon = useCallback(() => {
    return L.divIcon({
      className: 'custom-villa-marker',
      html: `
        <div class="villa-pin-bubble" title="${villa.name}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -22]
    });
  }, [villa.name]);

  /**
   * Menghasilkan elemen HTML ikon custom untuk marker tempat menarik di sekitar (POI)
   * @param {Object} place - Objek data tempat
   * @param {boolean} isSelected - Menandakan apakah tempat sedang dipilih
   * @returns {L.DivIcon} Ikon Leaflet custom untuk tempat
   */
  const createPlaceIcon = useCallback((place, isSelected) => {
    return L.divIcon({
      className: `custom-place-marker ${isSelected ? 'selected' : ''}`,
      html: `
        <div class="place-pin-bubble ${isSelected ? 'active' : ''}">
          <span class="place-pin-emoji">${place.icon}</span>
        </div>
      `,
      iconSize: isSelected ? [38, 38] : [32, 32],
      iconAnchor: isSelected ? [19, 19] : [16, 16],
      popupAnchor: [0, -18]
    });
  }, []);

  /**
   * Menyaring daftar tempat berdasarkan filter kategori dan kata kunci pencarian
   */
  const filteredPlaces = useMemo(() => {
    return allPlaces.filter((place) => {
      // Filter kategori
      if (activeCategory !== 'all' && place.category !== activeCategory) {
        return false;
      }
      // Filter pencarian teks
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = place.name.toLowerCase().includes(query);
        const matchCat = place.categoryLabel.toLowerCase().includes(query);
        const matchHighlight = (place.highlight || '').toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchHighlight) {
          return false;
        }
      }
      return true;
    });
  }, [allPlaces, activeCategory, searchQuery]);

  /**
   * Menginisialisasi peta Leaflet dan layer dasarnya
   */
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Bersihkan instance peta lama jika sudah ada
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    // Hapus ID leaflet jika tersisa di elemen DOM kontainer
    if (mapContainerRef.current._leaflet_id) {
      delete mapContainerRef.current._leaflet_id;
    }

    // Inisialisasi peta Leaflet baru berpusat di koordinat villa
    const map = L.map(mapContainerRef.current, {
      center: [villaCoords.lat, villaCoords.lng],
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: false // Mencegah scroll halaman tidak sengaja terhenti oleh peta
    });

    // Tambahkan kontrol zoom di pojok kanan bawah
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer Tile Peta OpenStreetMap Resmi
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Lingkaran radius privasi villa (approximate location) khas Airbnb mewah
    L.circle([villaCoords.lat, villaCoords.lng], {
      color: '#C96F4A',
      fillColor: '#C96F4A',
      fillOpacity: 0.12,
      weight: 1.5,
      radius: 350
    }).addTo(map);

    // Marker utama Villa
    const villaMarker = L.marker([villaCoords.lat, villaCoords.lng], {
      icon: createVillaIcon(),
      zIndexOffset: 1000
    }).addTo(map);

    villaMarker.bindPopup(`
      <div class="map-popup-card">
        <strong class="map-popup-title">${villa.name}</strong>
        <p class="map-popup-sub">📍 ${villaCoords.areaName}</p>
        <span class="map-popup-badge">Perkiraan Area Villa</span>
        <div class="map-popup-actions">
          <a href="${villaGmapsUrl}" target="_blank" rel="noopener noreferrer" class="map-popup-gmaps-btn" onclick="event.stopPropagation()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Buka Lokasi di Google Maps &nearr;
          </a>
        </div>
      </div>
    `, { maxWidth: 280 });

    villaMarker.on('click', () => {
      setSelectedPlaceId(null);
      villaMarker.openPopup();
    });

    // Layer group untuk marker tempat-tempat di sekitar
    const placesLayer = L.layerGroup().addTo(map);
    placesLayerGroupRef.current = placesLayer;
    mapInstanceRef.current = map;

    // Cegah interaksi di dalam popup merembet ke peta
    map.on('popupopen', (e) => {
      const popupNode = e.popup.getElement();
      if (popupNode) {
        L.DomEvent.disableClickPropagation(popupNode);
        L.DomEvent.disableScrollPropagation(popupNode);
      }
    });

    // Reset pilihan tempat saat klik pada latar peta kosong
    map.on('click', () => {
      setSelectedPlaceId(null);
    });

    // InvalidateSize saat window di-resize atau tab browser kembali aktif (focus)
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleResize);

    // ResizeObserver untuk memantau perubahan ukuran kontainer peta secara presisi
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    // Invalidate size setelah jeda singkat saat mount awal
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }
    };
  }, [villaCoords, villa.name, villaGmapsUrl, createVillaIcon]);

  // Isolasi tombol floating Google Maps dari propagasi event Leaflet
  useEffect(() => {
    if (floatingGmapsRef.current) {
      L.DomEvent.disableClickPropagation(floatingGmapsRef.current);
      L.DomEvent.disableScrollPropagation(floatingGmapsRef.current);
    }
  }, []);

  /**
   * Menghasilkan URL pencarian resmi Google Maps untuk tempat sekitar (POI).
   * Format query: Nama Tempat Bersih, Area Villa, Bali
   * Ini langsung membuka profil tempat resmi di Google Maps (foto, ulasan, menu, jam buka,
   * dan tombol "Rute/Directions" asli bawaan Google Maps) serta 100% bebas dari error rute.
   */
  const getPlaceGmapsUrl = useCallback((place) => {
    const cleanPlaceName = place.name
      .split('/')[0]
      .replace(/\(.*?\)/g, '')
      .trim();
    const area = villaCoords?.areaName || villa?.location || 'Bali';
    const query = `${cleanPlaceName}, ${area}, Bali`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }, [villaCoords?.areaName, villa?.location]);

  /**
   * Membuat layer marker tempat sekitar saat daftar filteredPlaces berubah
   * CATATAN PENTING: Effect ini HANYA bergantung pada filteredPlaces.
   * Tidak bergantung pada selectedPlaceId agar layer TIDAK di-clear/dihancurkan
   * setiap kali user mengklik pin atau kartu tempat.
   */
  useEffect(() => {
    if (!mapInstanceRef.current || !placesLayerGroupRef.current) return;

    // Bersihkan marker lama
    placesLayerGroupRef.current.clearLayers();
    markersDictRef.current = {};

    filteredPlaces.forEach((place) => {
      const isSelected = place.id === selectedPlaceId;
      const marker = L.marker([place.lat, place.lng], {
        icon: createPlaceIcon(place, isSelected),
        zIndexOffset: isSelected ? 500 : 0
      });

      // Konten Popup saat pin diklik dengan link Google Maps resmi tempat ini
      const googleMapsUrl = getPlaceGmapsUrl(place);
      const popupContent = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <span class="map-popup-icon">${place.icon}</span>
            <div>
              <strong class="map-popup-title">${place.name}</strong>
              <div class="map-popup-meta">${place.categoryLabel} &middot; <strong>${place.distance}</strong> (${place.duration})</div>
            </div>
          </div>
          <p class="map-popup-desc">${place.highlight}</p>
          <div class="map-popup-actions">
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="map-popup-gmaps-btn" onclick="event.stopPropagation()">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Buka di Google Maps &nearr;
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });

      // Event saat marker diklik di peta
      marker.on('click', () => {
        setSelectedPlaceId(place.id);
        marker.openPopup();
        // Gulir kartu terkait di panel kanan agar terlihat
        const cardEl = placeCardsRef.current[place.id];
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      marker.addTo(placesLayerGroupRef.current);
      markersDictRef.current[place.id] = marker;
    });
  }, [filteredPlaces, createPlaceIcon, getPlaceGmapsUrl]);

  /**
   * Memperbarui visual aktif (ikon & z-index) secara instan tanpa me-recreate layer Leaflet
   */
  useEffect(() => {
    filteredPlaces.forEach((place) => {
      const marker = markersDictRef.current[place.id];
      if (marker) {
        const isSelected = place.id === selectedPlaceId;
        marker.setIcon(createPlaceIcon(place, isSelected));
        marker.setZIndexOffset(isSelected ? 500 : 0);
      }
    });
  }, [selectedPlaceId, filteredPlaces, createPlaceIcon]);

  /**
   * Reset selectedPlaceId jika tempat yang sedang aktif tersaring keluar oleh pencarian/kategori
   */
  useEffect(() => {
    if (selectedPlaceId && !filteredPlaces.some((p) => p.id === selectedPlaceId)) {
      setSelectedPlaceId(null);
    }
  }, [filteredPlaces, selectedPlaceId]);

  /**
   * Menangani klik pada salah satu kartu tempat di daftar kanan
   * Menggeser peta secara halus dan membuka popup secara andal
   * @param {Object} place - Objek tempat yang dipilih
   */
  const handleSelectPlace = useCallback((place) => {
    setSelectedPlaceId(place.id);
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const marker = markersDictRef.current[place.id];

    const currentCenter = map.getCenter();
    const isAlreadyAtTarget = 
      Math.abs(currentCenter.lat - place.lat) < 0.0001 &&
      Math.abs(currentCenter.lng - place.lng) < 0.0001 &&
      map.getZoom() === 15;

    if (isAlreadyAtTarget) {
      if (marker) {
        marker.openPopup();
      }
    } else {
      map.flyTo([place.lat, place.lng], 15, {
        duration: 0.8,
        easeLinearity: 0.25
      });

      if (marker) {
        map.once('moveend', () => {
          marker.openPopup();
        });
      }
    }
  }, []);

  /**
   * Mengembalikan posisi peta ke pusat lokasi villa utama
   */
  const handleRecenterVilla = useCallback(() => {
    setSelectedPlaceId(null);
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.closePopup();
    mapInstanceRef.current.flyTo([villaCoords.lat, villaCoords.lng], 14, {
      duration: 0.9
    });
  }, [villaCoords.lat, villaCoords.lng]);

  return (
    <div className="neighborhood-section">
      {/* Header Bagian Peta */}
      <div className="neighborhood-header">
        <div>
          <div className="section-kicker">Neighborhood Guide</div>
          <h2 className="neighborhood-title">Where you'll be</h2>
          <p className="neighborhood-lead">
            {villa.address} &middot; <strong>{villaCoords.areaName}</strong>
          </p>
          <p className="neighborhood-subtitle">
            {villaCoords.subtitle}
          </p>
        </div>

        {/* Tombol Aksi Peta */}
        <div className="neighborhood-header-actions">
          <button 
            type="button" 
            className="btn-outline btn-sm recenter-btn"
            onClick={handleRecenterVilla}
            title="Pusatkan kembali peta ke lokasi villa"
          >
            📍 Fokus ke Villa
          </button>
          <a 
            href={villaGmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline btn-sm gmaps-header-btn"
            title="Buka peta area villa ini langsung di aplikasi Google Maps"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Buka di Google Maps &nearr;
          </a>
        </div>
      </div>

      {/* Bar Pencarian Tempat & Kategori Pintas */}
      <div className="neighborhood-controls">
        {/* Input Pencarian Cepat */}
        <div className="neighborhood-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text"
            placeholder="Cari tempat di sekitar (contoh: pantai, cafe, la brisa, spa)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neighborhood-search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="neighborhood-clear-btn" 
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Kategori Pills */}
        <div className="neighborhood-categories-row no-scrollbar">
          {NEARBY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`neighborhood-cat-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tata Letak Interaktif: Peta (Kiri) & Daftar Tempat Sekitar (Kanan) */}
      <div className="neighborhood-grid">
        {/* Kolom Kiri: Peta Interaktif Leaflet */}
        <div className="neighborhood-map-container">
          <div 
            ref={mapContainerRef} 
            className="neighborhood-map"
            style={{ width: '100%', height: '100%', minHeight: '440px' }}
          />
          
          {/* Tombol Melayang Google Maps di Pojok Kanan Atas Peta */}
          <a 
            ref={floatingGmapsRef}
            href={villaGmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neighborhood-floating-gmaps"
            title="Buka tampilan peta ini di Google Maps"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Google Maps</span>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>&nearr;</span>
          </a>

          {/* Badge Keterangan Privasi Lokasi di atas Peta */}
          <div className="neighborhood-privacy-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Lingkaran menunjukkan perkiraan area demi privasi tamu & host</span>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Rekomendasi Tempat Terdekat */}
        <div className="neighborhood-places-panel">
          <div className="neighborhood-places-head">
            <span className="places-count-label">
              <strong>{filteredPlaces.length} tempat menarik</strong> ditemukan di sekitar
            </span>
          </div>

          <div className="neighborhood-places-list">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => {
                const isSelected = place.id === selectedPlaceId;
                const googleMapsUrl = getPlaceGmapsUrl(place);
                return (
                  <div 
                    key={place.id}
                    ref={(el) => {
                      if (el) placeCardsRef.current[place.id] = el;
                    }}
                    className={`neighborhood-place-card ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectPlace(place)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectPlace(place);
                      }
                    }}
                  >
                    <div className="place-card-top">
                      <div className="place-card-icon">{place.icon}</div>
                      <div className="place-card-main">
                        <strong className="place-card-name">{place.name}</strong>
                        <div className="place-card-meta">
                          <span className="place-cat-tag">{place.categoryLabel}</span>
                          <span className="place-dist-badge">📍 {place.distance} &middot; {place.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="place-card-highlight">{place.highlight}</p>

                    <div className="place-card-actions">
                      <button 
                        type="button" 
                        className="place-view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlace(place);
                        }}
                      >
                        Lihat di Peta &rarr;
                      </button>
                      <a 
                        href={googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="place-directions-link"
                        onClick={(e) => e.stopPropagation()}
                        title="Buka profil tempat ini di Google Maps"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Buka di Maps &nearr;
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="neighborhood-empty-state">
                <p>Tidak ada tempat yang cocok dengan kata kunci pencarian atau kategori ini.</p>
                <button 
                  type="button" 
                  className="btn-outline btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
