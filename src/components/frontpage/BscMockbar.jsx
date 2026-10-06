import React from 'react';

/**
 * Komponen BscMockbar
 * Menampilkan bar notifikasi draf resmi di bagian paling atas halaman sesuai bsc-frontpage_1.html,
 * lengkap dengan tombol pengalih mata uang global antara USD dan IDR.
 * 
 * @param {Object} props
 * @param {string} props.currency - Mata uang aktif ('USD' atau 'IDR')
 * @param {Function} props.onToggleCurrency - Callback untuk mengubah mata uang
 * @returns {React.JSX.Element} Elemen JSX Mockbar
 */
export default function BscMockbar({ currency = 'USD', onToggleCurrency }) {
  return (
    <div className="mockbar" id="mockbar">
      <span>Draft for Bali Stay Collection &middot; 51 villas &middot; Oct 2026</span>
      <div>
        <button 
          type="button" 
          className="btn btn-ghost" 
          onClick={onToggleCurrency}
          style={{ padding: '4px 10px', fontSize: '12px' }}
        >
          {currency === 'USD' ? 'Switch to IDR' : 'Switch to USD'}
        </button>
      </div>
    </div>
  );
}
