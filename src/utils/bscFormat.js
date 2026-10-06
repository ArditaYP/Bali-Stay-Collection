import { CONFIG } from '../data/bscVillasData';

/**
 * Memformat nominal harga dalam mata uang USD atau IDR sesuai pilihan user
 * @param {number|string|null} usd - Nilai harga dalam mata uang USD per malam
 * @param {string} [currency] - Pilihan mata uang ('USD' atau 'IDR', opsional)
 * @returns {string} String representasi harga terformat (contoh: '$290' atau 'Rp 4.640.000')
 */
export function formatBscMoney(usd, currency) {
  const activeCurrency = currency || (typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('bsc_currency') : 'USD') || 'USD';
  const num = Number(usd);
  const safeUsd = (usd === null || usd === undefined || isNaN(num)) ? 250 : num;
  if (activeCurrency === 'IDR') {
    const idr = Math.round((safeUsd * CONFIG.idrRate) / 1000) * 1000;
    return `Rp ${idr.toLocaleString('id-ID')}`;
  }
  return `$${Math.round(safeUsd).toLocaleString('en-US')}`;
}

/**
 * Menghasilkan tanggal format ISO (YYYY-MM-DD) berdasarkan penambahan hari dari sekarang
 * @param {number} daysFromNow - Jumlah hari ke depan dari tanggal hari ini
 * @returns {string} String tanggal format ISO (contoh: '2026-10-20')
 */
export function getIsoDate(daysFromNow = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

/**
 * Memformat string tanggal ISO menjadi format bacaan singkat (contoh: '20 Oct')
 * @param {string} isoStr - String tanggal format ISO (YYYY-MM-DD)
 * @returns {string} String tanggal ringkas (contoh: '20 Oct')
 */
export function formatBscDateShort(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/**
 * Menghitung selisih jumlah malam antara tanggal Check-in dan Check-out
 * @param {string} checkInStr - Tanggal Check-in format ISO
 * @param {string} checkOutStr - Tanggal Check-out format ISO
 * @returns {number} Jumlah malam menginap (minimum 0)
 */
export function calculateNights(checkInStr, checkOutStr) {
  if (!checkInStr || !checkOutStr) return 0;
  const a = new Date(checkInStr + 'T00:00:00');
  const b = new Date(checkOutStr + 'T00:00:00');
  const diffTime = b.getTime() - a.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
