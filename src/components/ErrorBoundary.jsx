import React from 'react';

/**
 * Komponen ErrorBoundary (Pelindung Layar Putih / White Screen Prevention)
 * Menangkap unhandled error pada komponen React anak agar aplikasi tidak pernah
 * menampilkan layar putih kosong (White Screen of Death).
 * 
 * Fitur:
 * - Menampilkan UI Fallback ramah pengguna dengan gaya mewah khas Bali Stay Collection.
 * - Tombol "Muat Ulang Halaman".
 * - Tombol "Bersihkan Cache & Pulihkan" untuk mereset localStorage jika ada cache yang corrupt.
 * - Rincian error teknis yang dapat dibuka untuk kebutuhan debugging.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Memperbarui state agar render berikutnya menampilkan UI fallback
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Mencatat detail error ke konsol
    console.error('🚨 [ErrorBoundary] Uncaught Error caught by Bali Stay Collection boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      localStorage.removeItem('bsc_villas');
      localStorage.removeItem('bsc_homepage_media');
      localStorage.removeItem('bsc_wishlist');
      localStorage.removeItem('bsc_currency');
    } catch (e) {
      console.warn('Gagal membersihkan cache:', e);
    }
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0c0f14',
          color: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#161b22',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '36px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '28px'
            }}>
              ⚠️
            </div>

            <h1 style={{
              fontSize: '22px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              Terjadi Kendala Memuat Halaman
            </h1>

            <p style={{
              fontSize: '14px',
              color: '#94a3b8',
              lineHeight: '1.6',
              margin: '0 0 24px 0'
            }}>
              Aplikasi mendeteksi adanya gangguan sementara pada sistem tampilan. 
              Sistem perlindungan otomatis mencegah layar putih kosong.
            </p>

            {this.state.error && (
              <details style={{
                textAlign: 'left',
                backgroundColor: '#0a0d12',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '24px',
                fontSize: '12px',
                color: '#f87171',
                fontFamily: 'monospace',
                overflowX: 'auto',
                cursor: 'pointer'
              }}>
                <summary style={{ color: '#cbd5e1', fontWeight: '600', marginBottom: '8px' }}>
                  Lihat Detail Error Teknis
                </summary>
                <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '6px' }}>
                  {this.state.error.toString()}
                </div>
              </details>
            )}

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ffffff',
                  color: '#0c0f14',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                🔄 Muat Ulang Halaman
              </button>

              <button
                onClick={this.handleResetAndReload}
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                🧹 Bersihkan Cache & Pulihkan
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
