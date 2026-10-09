import React, { useState, useEffect, useRef, useMemo } from 'react';
import { formatBscMoney } from '../../utils/bscFormat';

/**
 * Komponen SearchModal (Quick Search / Spotlight Command Palette)
 * Menampilkan jendela pencarian cepat interaktif di tengah layar dengan fitur:
 * - Shortcut keyboard global: ⌘K / Ctrl+K untuk membuka, Escape untuk menutup
 * - Pencarian multi-kriteria instan: Nama villa, destinasi/kawasan, fasilitas, kamar tidur, tipe kemewahan
 * - Chip filter cepat (Uluwatu, Canggu, Ubud, Ocean View, Private Pool, Gym, dll.)
 * - Tampilan pratinjau kartu mewah lengkap dengan foto, rating, fasilitas, dan harga per malam
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Status visibilitas modal pencarian
 * @param {Function} props.onClose - Fungsi callback untuk menutup modal
 * @param {Object[]} props.villas - Seluruh daftar master villa
 * @param {Function} props.onSelectVilla - Callback saat salah satu villa diklik
 * @param {string} [props.currency='USD'] - Mata uang aktif
 * @returns {React.JSX.Element|null} Elemen JSX Modal Pencarian
 */
export default function SearchModal({
  isOpen,
  onClose,
  villas = [],
  onSelectVilla,
  currency = 'USD'
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Autofocus input saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Listener tombol keyboard (Escape, Arrow Up, Arrow Down, Enter)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (searchResults.length > 0 && searchResults[selectedIndex]) {
          e.preventDefault();
          handleSelect(searchResults[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Gulir otomatis item yang dipilih ke dalam pandangan
  useEffect(() => {
    if (listRef.current && listRef.current.children[selectedIndex]) {
      listRef.current.children[selectedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  // Filter pencarian cerdas
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Tampilkan villa prioritas/unggulan jika query kosong
      return villas.slice(0, 10);
    }

    return villas.filter(v => {
      const name = (v.name || '').toLowerCase();
      const area = (v.area || v.location || '').toLowerCase();
      const desc = (v.desc || v.description || v.shortDesc || '').toLowerCase();
      const tier = (v.tier || v.category || '').toLowerCase();
      const amenities = (v.am || v.amenities || []).join(' ').toLowerCase();
      const trips = (v.trips || []).join(' ').toLowerCase();
      const beds = `${v.beds || v.bedroomsCount || ''} bed`;

      return (
        name.includes(q) ||
        area.includes(q) ||
        desc.includes(q) ||
        tier.includes(q) ||
        amenities.includes(q) ||
        trips.includes(q) ||
        beds.includes(q)
      );
    });
  }, [query, villas]);

  /**
   * Menangani pemilihan villa
   * @param {string} villaId - ID villa yang dipilih
   */
  const handleSelect = (villaId) => {
    onClose();
    if (typeof onSelectVilla === 'function') {
      onSelectVilla(villaId);
    }
  };

  /**
   * Mengatur kata kunci pencarian dari chip preset
   * @param {string} text - Kata kunci
   */
  const handleChipClick = (text) => {
    setQuery(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Quick Search">
      <div 
        className="search-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar Pencarian */}
        <div className="search-modal-header">
          <div className="search-modal-input-wrap">
            <svg className="search-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-modal-input"
              placeholder="Search villas by name, destination, bedroom, or features..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
            />
            {query && (
              <button
                type="button"
                className="search-modal-clear"
                onClick={() => setQuery('')}
                title="Clear input"
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="search-modal-close"
            onClick={onClose}
            aria-label="Close search"
          >
            <span className="search-modal-esc">ESC</span>
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="search-modal-chips">
          <span className="search-modal-chips-label">Popular:</span>
          {['Uluwatu', 'Canggu', 'Pererenan', 'Ubud', 'Seminyak', 'Ocean view', 'Private pool', 'Gym', 'Luxury'].map((chip) => (
            <button
              key={chip}
              type="button"
              className={`search-modal-chip ${query.toLowerCase() === chip.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleChipClick(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Daftar Hasil Pencarian */}
        <div className="search-modal-body" ref={listRef}>
          {searchResults.length === 0 ? (
            <div className="search-modal-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <h4>No villas match &ldquo;{query}&rdquo;</h4>
              <p>Try searching by popular areas like <strong>Uluwatu</strong>, <strong>Canggu</strong>, or amenities like <strong>Pool</strong> or <strong>Ocean view</strong>.</p>
            </div>
          ) : (
            <>
              <div className="search-modal-results-count">
                {query.trim() ? (
                  <span>Found <strong>{searchResults.length}</strong> villa{searchResults.length > 1 ? 's' : ''} for &ldquo;{query}&rdquo;</span>
                ) : (
                  <span>Featured Collection ({searchResults.length} villas)</span>
                )}
              </div>

              <div className="search-modal-list">
                {searchResults.map((villa, idx) => {
                  const isSelected = idx === selectedIndex;
                  const thumb = villa.img || (villa.images && villa.images[0]) || '/destinations/pererenan.jpg';
                  const areaText = villa.area || villa.location || 'Bali';
                  const bedsText = `${villa.beds || villa.bedroomsCount || 1} Bed${(villa.beds || villa.bedroomsCount || 1) > 1 ? 's' : ''}`;
                  const guestsText = `${villa.guests || 2} Guests`;
                  const ratingVal = villa.rating ? Number(villa.rating).toFixed(2) : '4.90';
                  const reviewsCount = villa.reviewsCount || (villa.reviews ? villa.reviews.length : 0);

                  return (
                    <div
                      key={villa.id}
                      className={`search-result-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelect(villa.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="search-result-thumb-wrap">
                        <img
                          src={thumb}
                          alt={villa.name}
                          className="search-result-thumb"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        {villa.tier && (
                          <span className="search-result-tier-badge">{villa.tier}</span>
                        )}
                      </div>

                      <div className="search-result-info">
                        <div className="search-result-top-row">
                          <h4 className="search-result-name">{villa.name}</h4>
                          <span className="search-result-rating">
                            ★ {ratingVal} {reviewsCount > 0 && <small>({reviewsCount})</small>}
                          </span>
                        </div>

                        <div className="search-result-meta">
                          <span className="search-result-area">📍 {areaText}</span>
                          <span className="search-result-dot">·</span>
                          <span>🛏️ {bedsText}</span>
                          <span className="search-result-dot">·</span>
                          <span>👥 {guestsText}</span>
                        </div>

                        {villa.why && (
                          <p className="search-result-snippet">{villa.why}</p>
                        )}
                      </div>

                      <div className="search-result-price-wrap">
                        <span className="search-result-price-amount">
                          {formatBscMoney(villa.price || 350, currency)}
                        </span>
                        <span className="search-result-price-period">/ night</span>
                        <span className="search-result-arrow">→</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="search-modal-footer">
          <div className="search-modal-hint">
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </div>
          <div className="search-modal-hint">
            <kbd>↵</kbd> to view villa
          </div>
          <div className="search-modal-hint">
            <kbd>ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
