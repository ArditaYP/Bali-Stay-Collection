import React, { useRef, useState } from 'react';

/**
 * ReviewMentions
 * Komponen bilah tombol (pills) "Guest reviews mention" seperti pada Airbnb.
 * Memungkinkan pengguna mengklik topik yang sering dibahas oleh tamu (seperti Location, Breakfast, Pool, Staff, dll)
 * untuk langsung menyaring ulasan yang membicarakan topik tersebut.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, icon: string, count: number, keywords: string[] }>} props.mentions - Daftar topik mention yang tersedia
 * @param {string|null} props.selectedMention - ID topik yang saat ini sedang aktif (null jika tidak ada filter)
 * @param {Function} props.onSelectMention - Callback saat user mengklik atau membatalkan pilihan topik
 * @param {number} [props.totalCount] - Jumlah seluruh ulasan untuk pill "All"
 * @param {string} [props.variant='full'] - Varian tampilan: 'full' (di halaman detail) atau 'compact' (di dalam modal ulasan)
 */
export default function ReviewMentions({
  mentions = [],
  selectedMention = null,
  onSelectMention,
  totalCount = 0,
  variant = 'full'
}) {
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /**
   * Memeriksa apakah deretan pill masih dapat digeser ke kiri atau kanan
   */
  const checkScrollable = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  // Periksa batas scroll saat komponen dimuat atau ukuran jendela berubah
  React.useEffect(() => {
    checkScrollable();
    const handleResize = () => checkScrollable();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mentions]);

  /**
   * Menggeser deretan pill berdasarkan jarak pixel dengan animasi halus
   * @param {number} distance - Jarak pergeseran dalam pixel
   */
  const handleScrollByDistance = (distance) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    setTimeout(checkScrollable, 250);
  };

  /**
   * Menangani scroll roda mouse agar bergeser secara horizontal
   * @param {React.WheelEvent} e - Event wheel mouse
   */
  const handleWheel = (e) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      scrollRef.current.scrollLeft += e.deltaY;
      checkScrollable();
    }
  };

  /**
   * Menangani event mouse down untuk memulai drag geser horizontal
   * @param {React.MouseEvent} e - Event mouse
   */
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    setIsGrabbing(true);
  };

  /**
   * Menangani event pergerakan mouse saat tombol ditekan (geser konten)
   * @param {React.MouseEvent} e - Event mouse
   */
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    checkScrollable();
  };

  /**
   * Mengakhiri interaksi drag geser mouse
   */
  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
      checkScrollable();
    }, 50);
  };

  /**
   * Menangani klik pada pill topik: jika sedang di-drag, abaikan klik.
   * Jika topik yang sama diklik lagi, batalkan filter (reset ke null/semua).
   * @param {string|null} topicId - ID topik yang dipilih
   */
  const handleClickPill = (topicId) => {
    if (hasDraggedRef.current) return;
    if (selectedMention === topicId) {
      onSelectMention(null); // Batalkan filter jika pill aktif diklik ulang
    } else {
      onSelectMention(topicId);
    }
  };

  return (
    <div className={`review-mentions-block review-mentions-${variant}`}>
      <div className="review-mentions-header">
        <span className="review-mentions-title">Guest reviews mention</span>
      </div>

      <div className="review-mentions-scroll-wrapper">
        {/* Tombol Geser Kiri */}
        {canScrollLeft && (
          <button
            type="button"
            className="mentions-nav-btn mentions-nav-prev"
            onClick={() => handleScrollByDistance(-200)}
            aria-label="Geser ke kiri"
            title="Geser ke kiri"
          >
            ‹
          </button>
        )}

        {/* Kontainer Baris Pill */}
        <div
          ref={scrollRef}
          className={`review-mentions-list ${isGrabbing ? 'grabbing' : ''}`}
          onScroll={checkScrollable}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {/* Tombol Tab: Semua Ulasan */}
          <button
            type="button"
            className={`review-mention-pill ${!selectedMention ? 'active' : ''}`}
            onClick={() => handleClickPill(null)}
            title="Tampilkan semua ulasan"
          >
            <span>All reviews</span>
            {totalCount > 0 && <span className="review-mention-count">{totalCount}</span>}
          </button>

          {/* Deretan Tombol Tab: Tiap Topik yang Dibahas Tamu */}
          {mentions.map((topic) => {
            const isActive = selectedMention === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                className={`review-mention-pill ${isActive ? 'active' : ''}`}
                onClick={() => handleClickPill(topic.id)}
                title={`Saring ulasan yang membicarakan ${topic.label}`}
              >
                <span className="review-mention-label">{topic.label}</span>
                <span className="review-mention-count">{topic.count}</span>
              </button>
            );
          })}
        </div>

        {/* Tombol Geser Kanan */}
        {canScrollRight && (
          <button
            type="button"
            className="mentions-nav-btn mentions-nav-next"
            onClick={() => handleScrollByDistance(200)}
            aria-label="Geser ke kanan"
            title="Geser ke kanan"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
