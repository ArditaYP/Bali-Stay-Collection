import React from 'react';

/**
 * Komponen Footer
 * Menampilkan footer navigasi bawah situs dengan logo resmi, informasi hak cipta, dan tautan kebijakan.
 * 
 * @param {Object} props
 * @param {Function} props.onGoHome - Fungsi callback untuk kembali ke katalog villa
 * @param {Function} props.onOpenListVilla - Fungsi callback untuk membuka form partner pendaftaran villa
 * @returns {React.JSX.Element} Elemen JSX Footer situs
 */
export default function Footer({ onGoHome, onOpenListVilla }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand Logo & Name */}
        <div className="footer-brand" onClick={onGoHome} style={{ cursor: 'pointer' }} title="Bali Stay Collection">
          <img src="/logo.svg" alt="Bali Stay Collection" className="footer-logo-img" />
        </div>

        {/* Tautan Footer */}
        <div className="footer-links">
          <a onClick={onGoHome}>Explore Villas</a>
          <a onClick={onOpenListVilla}>Become a Host Partner</a>
          <a onClick={() => alert('Cancellation Policy:\nFree full refund up to 7 days before check-in.\n50% refund up to 48 hours before check-in.')}>Cancellation Policy</a>
          <a onClick={() => alert('Contact Support:\nWhatsApp: +62 812-3456-7890\nOperational 24/7 Bali Time (WITA)')}>Contact Us</a>
        </div>

        {/* Hak Cipta */}
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Bali Stay Collection. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
