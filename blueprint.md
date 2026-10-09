# 🏛️ BLUEPRINT ARSITEKTUR BACK-END & RESERVASI
## Bali Stay Collection — Direct Booking & Calendar Sync System

Dokumen ini adalah cetak biru (*blueprint*) resmi dan panduan teknis kebutuhan back-end untuk platform **Bali Stay Collection**. Dokumen ini mencatat seluruh arsitektur, kebutuhan basis data, pembagian peran pengguna (*user roles*), alur kerja pembayaran, penanganan *edge cases/bugs*, serta standar keamanan siber & proteksi data pelanggan.

---

## 📌 DAFTAR ISI
1. [Ringkasan Eksekutif & Tujuan](#1-ringkasan-eksekutif--tujuan)
2. [Solusi Terpilih: Sinkronisasi Kalender 2 Arah (iCal Sync)](#2-solusi-terpilih-sinkronisasi-kalender-2-arah-ical-sync)
3. [Daftar Fitur Back-End Wajib](#3-daftar-fitur-back-end-wajib)
4. [Struktur Peran Pengguna (User Roles & Permissions)](#4-struktur-peran-pengguna-user-roles--permissions)
5. [Skema Basis Data (Database Schema)](#5-skema-basis-data-database-schema)
6. [Spesifikasi REST API Endpoint](#6-spesifikasi-rest-api-endpoint)
7. [Penanganan Bug Kritis & Pengalaman Pengguna (Edge Cases & UX)](#7-penanganan-bug-kritis--pengalaman-pengguna-edge-cases--ux)
8. [Standar Keamanan Siber & Proteksi Data Pelanggan (Cybersecurity & Anti-Hack)](#8-standar-keamanan-siber--proteksi-data-pelanggan-cybersecurity--anti-hack)
9. [Alur Transaksi & Keamanan](#9-alur-transaksi--keamanan)
10. [Rencana Tahapan Pengerjaan (Implementation Roadmap)](#10-rencana-tahapan-pengerjaan-implementation-roadmap)

---

## 1. RINGKASAN EKSEKUTIF & TUJUAN

* **Nama Proyek:** Bali Stay Collection (BSC)
* **Kategori:** Luxury Villa Rental Platform & Direct Reservation Engine
* **Tujuan Utama Back-End:**
  1. Mengubah tombol **"Reserve"** dari sekadar simulasi *mock* menjadi sistem transaksi riil yang aman.
  2. Mencegah terjadinya bentrok jadwal (*double-booking / overbooking*) antara website BSC dengan Online Travel Agencies (OTA) seperti **Airbnb**, **Tiket.com**, **Booking.com**, dan **Agoda**.
  3. Memproses pembayaran otomatis via Payment Gateway resmi (Kartu Kredit Internasional, QRIS, Virtual Account).
  4. Menerbitkan konfirmasi voucher otomatis ke tamu dan notifikasi instan ke WhatsApp tim operasional villa.
  5. Melindungi data pribadi dan transaksi pelanggan dari pembobolan data dan serangan siber.

---

## 2. SOLUSI TERPILIH: SINKRONISASI KALENDER 2 ARAH (iCAL SYNC)

Sesuai hasil diskusi, arsitektur sinkronisasi yang digunakan adalah **Solusi 1: iCal 2-Way Synchronization** yang dilengkapi **Fitur Input Link iCal per Villa**:

```
 ┌─────────────────────────────────────────────────────────────┐
 │                AIRBNB / TIKET.COM / OTAs                    │
 └──────────────┬──────────────────────────────▲───────────────┘
                │ (A) Inbound Sync             │ (B) Outbound Sync
                │ (Tarik .ics tiap 5-10 mnt)   │ (Ekspor URL .ics BSC)
                ▼                              │
 ┌─────────────────────────────────────────────┴───────────────┐
 │               BACK-END BALI STAY COLLECTION                 │
 │  - Cron Job / Scheduler Parser                              │
 │  - Pre-Payment Live Calendar Check                          │
 │  - 15-Minute Temporary Hold Engine                          │
 └──────────────────────────────┬──────────────────────────────┘
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │               DATABASE BSC (`blocked_dates`)                │
 │  Kalender di website otomatis terkunci / terbuka            │
 └─────────────────────────────────────────────────────────────┘
```

### 2.1. Inbound Sync (OTA ➜ Website BSC)
1. Di dashboard admin, setiap villa memiliki kolom input untuk menempelkan URL iCal dari masing-masing OTA:
   - `airbnb_ical_url` (contoh: `https://www.airbnb.com/calendar/ical/12345.ics?s=xyz`)
   - `tiket_ical_url` (contoh: `https://partner.tiket.com/ical/villas/abc.ics`)
   - `booking_ical_url` (opsional)
2. Back-end menjalankan *background job* (setiap 5–10 menit) untuk mengambil berkas `.ics` tersebut.
3. Server mem-parsing rentang tanggal yang berstatus `RESERVED` atau `BLOCKED`, lalu menyimpannya ke tabel `blocked_dates`.
4. Kalender di halaman detail villa di website BSC seketika menandai tanggal tersebut sebagai **Unavailable** (abu-abu/tidak bisa diklik).

### 2.2. Outbound Sync (Website BSC ➜ OTA)
1. Back-end BSC menyediakan endpoint iCal publik yang unik untuk setiap villa:  
   `GET https://balistaycollection.com/api/ical/:villaSlug.ics`
2. Link ini ditempelkan (*Import Calendar*) pada dashboard Airbnb dan Tiket.com masing-masing villa.
3. Ketika tamu berhasil reservasi di website BSC, tanggal langsung masuk ke berkas `.ics` BSC, sehingga Airbnb dan Tiket.com otomatis memblokir tanggal tersebut di platform mereka.

### 2.3. Pengaman Tambahan (*Safety Net Layers*)
* **Real-time Pre-Payment Check:** Sebelum membuka halaman pembayaran, back-end melakukan verifikasi kilat ke sumber iCal untuk memastikan tanggal belum diambil di detik-detik terakhir.
* **15-Minute Temporary Hold:** Saat tamu memasukkan data di formulir pembayaran, tanggal di-hold selama 15 menit agar tidak diserobot tamu lain di website.

---

## 3. DAFTAR FITUR BACK-END WAJIB

### 1. Booking Engine & State Lifecycle
* Pembuatan ID Reservasi unik dengan format standar: `BSC-YYYYMM-XXXX` (misal: `BSC-202610-0482`).
* Pengelolaan status booking:
  - `HOLD`: Tamu sedang di halaman pembayaran (berlaku 15 menit).
  - `PENDING`: Menunggu konfirmasi pembayaran.
  - `CONFIRMED`: Pembayaran lunas terverifikasi, tanggal resmi terkunci.
  - `CANCELLED`: Dibatalkan oleh tamu/admin atau kedaluwarsa.
  - `COMPLETED`: Tamu telah selesai menginap (*check-out*).

### 2. Multi-Channel iCal Manager per Villa
* Input dan validasi tautan iCal eksternal untuk tiap villa (Airbnb, Tiket.com, dll).
* Tombol manual *"Sync Now"* di dasbor admin untuk sinkronisasi paksa tanpa menunggu jadwal cron.
* Log riwayat sinkronisasi (mencatat kapan sinkronisasi terakhir berhasil dan berapa tanggal yang diperbarui).

### 3. Payment Gateway Integration (Xendit / Midtrans / Stripe)
* **Tamu Mancanegara:** Kartu Kredit Internasional (Visa, Mastercard, JCB, Amex, Apple Pay).
* **Tamu Domestik / Ekspat:** QRIS, BCA/Mandiri/BRI Virtual Account.
* **Opsi Pembayaran Fleksibel:**
  - *Full Payment (100%)*
  - *Deposit (50%)* sekarang, pelunasan sisa H-7 sebelum check-in.
* **Webhook Signature Verification:** Menerima notifikasi server-to-server dari payment gateway secara aman dan tahan manipulasi.

### 4. Notification Engine (Email/Gmail Engine 100% Gratis & Direct WhatsApp)
* **Email / Gmail Engine (Gratis Selamanya via Nodemailer / Gmail SMTP):**
  - **Email Konfirmasi Instan:** Mengirimkan voucher reservasi HTML/PDF resmi ke Gmail tamu (rincian biaya, tombol Google Maps villa, instruksi check-in, dan kontak butler).
  - **Kode OTP & Reset Password:** Mengirim kode 6 angka OTP untuk verifikasi login 2FA admin dan reset password tamu/owner ke Gmail secara instan tanpa biaya langganan API berbayar.
  - **Email H-1 Check-in:** Pengingat otomatis jadwal kedatangan H-1 dan kontak butler.
  - **Email Pasca Check-out:** Ucapan terima kasih dan permintaan ulasan/rating bintang 5 + voucher diskon loyalitas.
* **Direct WhatsApp Integration (Bebas Biaya API):**
  - Menggunakan format tautan deep-link WhatsApp (`https://wa.me/62812...`) yang membuka aplikasi WA tamu/admin secara otomatis dengan teks terisi lengkap saat tamu ingin chat concierge, konfirmasi cepat, atau bantuan langsung tanpa biaya pihak ketiga.

### 5. Dasbor Admin (Back-Office Management)
* **Tabel Pesanan:** Daftar seluruh pesanan masuk dengan filter status, tanggal, dan nama villa.
* **Master Calendar:** Tampilan kalender gabungan seluruh villa (melihat villa yang terisi vs kosong).
* **Kontrol Blokir Manual:** Tombol bagi tim BSC untuk memblokir tanggal secara manual (misal: villa sedang renovasi atau dipakai pemilik).
* **Manajemen Harga & Musim (*Seasonal & Dynamic Pricing Engine*):**
  - **Level 1 (Base Price):** Tarif dasar per malam (Low Season) sebagai patokan awal.
  - **Level 2 (Seasonal Rules Otomatis):**
    - *Low Season* (Februari – Mei, Oktober – November): Tarif dasar normal, min. stay 2 malam.
    - *High Season* (Juli – Agustus, Libur Idul Fitri / Easter): Kenaikan otomatis +20% s.d. +30%, min. stay 3 malam.
    - *Peak Season* (20 Desember – 5 Januari / Libur Natal & Tahun Baru): Kenaikan otomatis +50% s.d. +80%, min. stay 5 malam.
    - *Weekend Surcharge (Opsional):* Kenaikan tarif menginap malam Jumat & Sabtu (+10% atau flat fee).
  - **Level 3 (Custom Date Override):** Kemampuan tim Marketing/Revenue Manager untuk mengubah harga tanggal-tanggal tertentu secara spesifik di kalender (misal: ada festival/konser musik internasional atau promo diskon *Flash Sale / Last Minute*).
  - **Minimum Stay Enforcement:** Sistem otomatis memblokir transaksi jika durasi menginap tamu di bawah syarat minimum musim tersebut.

### 6. Layanan Tambahan Concierge (Add-ons)
* Opsi penambahan layanan saat checkout:
  - Antar-jemput bandara (*Airport Transfer*).
  - Sarapan terapung (*Floating Breakfast*) atau *Private Chef Dinner*.
  - Sewa pagar kolam renang (*Pool Fence*) untuk anak-anak.
  - Sewa motor/mobil dengan sopir.

### 7. Keamanan & Anti-Fraud
* **Server-side Price Calculation:** Perhitungan total biaya selalu dihitung ulang di server berdasarkan data master database (tidak pernah mempercayai angka total yang dikirim dari browser tamu).
* **Rate Limiting:** Membatasi percobaan request booking untuk mencegah serangan bot/spam.

---

## 4. STRUKTUR PERAN PENGGUNA (USER ROLES & PERMISSIONS)

Sistem dirancang dengan 3 peran utama dan 2 peran spesifik operasional & pemasaran:

### 4.1. Super Admin (Tim Manajemen Inti BSC)
* **Definisi:** Pemilik platform atau tim operasional pusat Bali Stay Collection.
* **Hak Akses:** *Full Access* ke seluruh data dan modul sistem.
* **Fitur & Tanggung Jawab:**
  1. Mengelola katalog seluruh villa (menambah, mengubah harga, foto, fasilitas, dan status aktif).
  2. Mengontrol Master Calendar dan mengelola link iCal Airbnb/Tiket.com untuk seluruh villa.
  3. Mengelola seluruh transaksi reservasi (konfirmasi, pengembalian dana/refund, perubahan jadwal).
  4. Mengakses laporan keuangan global, omzet keseluruhan, dan performa okupansi per area.
  5. Membuat dan mengelola akun Pemilik Villa (*Owners*), akun Marketing, dan akun Staf Lapangan.

### 4.2. Marketing / Revenue Manager (Pengelola Tarif & Okupansi)
* **Definisi:** Tim pemasaran atau *Revenue Specialist* hotel/villa yang bertugas memantau okupansi pasar dan memaksimalkan pendapatan (*Yield Management*).
* **Hak Akses:** Khusus kalender tarif, aturan musim, promo, dan laporan performa okupansi.
* **Fitur Utama di Marketing Portal:**
  1. Mengatur aturan rentang tanggal *High Season* dan *Peak Season* serta persentase kenaikan harga per villa.
  2. Memasang *Custom Date Override* (harga khusus) pada tanggal-tanggal liburan atau event tertentu.
  3. Mengatur aturan *Minimum Stay* per musim (misal: Peak Season wajib minimal 5 malam).
  4. Menerbitkan kode promo / voucher diskon (*Early Bird* atau *Last-Minute Booking*).
  5. **Batasan Keamanan:** Tidak memiliki hak menghapus data villa dari database, tidak dapat mengubah nomor rekening pemilik, dan tidak dapat mengubah hak akses pengguna lain.

### 4.3. User / Tamu (Guest / Traveler)
* **Definisi:** Wisatawan lokal maupun internasional yang menyewa villa.
* **Pendekatan Akses:**
  - **Guest Checkout (Direkomendasikan):** Tamu dapat langsung reservasi tanpa wajib mendaftar akun baru (mengurangi hambatan transaksi/meningkatkan konversi). Cukup mengisi nama, email, dan nomor WhatsApp.
  - **Guest Portal:** Tamu menerima tautan aman khusus (*magic link*) atau kode booking untuk melihat status reservasi, mengunduh e-voucher PDF, rute peta Google Maps, dan panduan check-in.
* **Fitur & Hak Akses:**
  1. Menjelajahi katalog villa, melakukan filter ketersediaan tanggal, dan menghitung estimasi biaya.
  2. Memilih opsi layanan concierge ekstra (*Airport pickup*, *Chef dinner*, dll).
  3. Menyelesaikan pembayaran melalui gerbang pembayaran resmi (*Payment Gateway*).
  4. Menyimpan villa favorit ke dalam fitur Wishlist browser.

### 4.4. Pemilik Villa (Villa Owner / Host Partner)
* **Definisi:** Pemilik properti fisik yang menitipkan vilanya untuk dikelola oleh BSC.
* **Hak Akses:** Terbatas khusus pada unit villa miliknya sendiri (*Isolated Owner View*). Tidak dapat melihat data villa milik partner lain.
* **Fitur Utama di Owner Portal:**
  1. **Kalender Okupansi Real-time:** Memantau jadwal kapan saja vilanya terisi atau kosong.
  2. **Fitur "Owner Stay" (Blokir Tanggal Mandiri):** Pemilik dapat memblokir tanggal tertentu jika ingin menginap sendiri bersama keluarga, sehingga tanggal tersebut otomatis tertutup di website BSC, Airbnb, dan Tiket.com.
  3. **Laporan Keuangan & Bagi Hasil (*Owner Statement*):** Melihat rincian pendapatan kotor, potongan biaya operasional atau komisi manajemen BSC, serta nominal bagi hasil bersih yang dapat dicairkan.
  4. **Ulasan Tamu:** Membaca testimoni dan tingkat kepuasan tamu yang menginap di vilanya.

### 4.5. Staf Operasional Lapangan (Villa Butler / Housekeeping)
* **Definisi:** Tim operasional di lokasi villa (*villa manager*, *butler*, tim kebersihan).
* **Hak Akses:** Tampilan ramah ponsel (*mobile-first view*) khusus jadwal tugas harian.
* **Fitur Utama:**
  1. Melihat jadwal harian check-in dan check-out (misal: *"Villa A check-out jam 11:00, siap dibersihkan untuk check-in jam 14:00"*).
  2. Melihat catatan khusus tamu (*special requests*, *extra bed*, preferensi alergi/makanan).
  3. **Batasan:** Tidak memiliki akses ke data sensitif keuangan, omzet, maupun data rekening pemilik.

---

## 5. SKEMA BASIS DATA (DATABASE SCHEMA)

Berikut rancangan struktur tabel utama (menggunakan standar relasional SQL):

### 1. Tabel `users`
Menyimpan seluruh data pengguna (Admin, Marketing, Owner, Guest, Staff).
```sql
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,              -- 'USR-001'
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'marketing', 'villa_owner', 'guest', 'staff') NOT NULL,
    email_otp_code VARCHAR(10) NULL,         -- Kode 6 angka OTP via Gmail untuk login 2FA
    email_otp_expires_at TIMESTAMP NULL,     -- Batas waktu kedaluwarsa kode OTP (5 menit)
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Tabel `password_resets`
Menyimpan token reset kata sandi sementara yang dikirim ke Gmail.
```sql
CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    token VARCHAR(128) NOT NULL,
    expires_at TIMESTAMP NOT NULL,           -- Masa berlaku 15-30 menit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email),
    INDEX (token)
);
```

### 3. Tabel `villas`
Menyimpan konfigurasi, relasi pemilik (*owner*), dan metadata masing-masing villa.
```sql
CREATE TABLE villas (
    id VARCHAR(50) PRIMARY KEY,              -- 'st-lau-ubud', 'iconic-cliff-top-villa'
    owner_id VARCHAR(50) NULL,               -- Relasi ke tabel users (role: villa_owner)
    name VARCHAR(150) NOT NULL,              -- 'Villa St. Lau'
    slug VARCHAR(100) UNIQUE NOT NULL,       -- 'st-lau'
    location VARCHAR(100) NOT NULL,          -- 'Ubud, Gianyar'
    base_price_usd DECIMAL(10, 2) NOT NULL,  -- Tarif per malam (USD)
    cleaning_fee_usd DECIMAL(10, 2) DEFAULT 35.00,
    max_guests INT NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    airbnb_ical_url TEXT,                    -- URL iCal Airbnb
    tiket_ical_url TEXT,                     -- URL iCal Tiket.com
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### 4. Tabel `bookings`
Menyimpan seluruh transaksi reservasi tamu.
```sql
CREATE TABLE bookings (
    id VARCHAR(50) PRIMARY KEY,              -- 'BSC-202610-0482'
    villa_id VARCHAR(50) NOT NULL,
    guest_id VARCHAR(50) NULL,               -- Diisi jika tamu terdaftar, NULL jika guest checkout
    guest_name VARCHAR(150) NOT NULL,
    guest_email VARCHAR(150) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    guests_count INT NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',      -- 'USD' atau 'IDR'
    subtotal DECIMAL(12, 2) NOT NULL,
    cleaning_fee DECIMAL(12, 2) NOT NULL,
    extra_services_fee DECIMAL(12, 2) DEFAULT 0.00,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_status ENUM('hold', 'pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'hold',
    payment_method VARCHAR(50),              -- 'credit_card', 'qris', 'bank_transfer'
    payment_reference VARCHAR(150),          -- Transaksi ID dari Xendit/Midtrans/Stripe
    special_requests TEXT,
    hold_expires_at TIMESTAMP NULL,          -- Batas waktu hold 15 menit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (villa_id) REFERENCES villas(id) ON DELETE RESTRICT,
    FOREIGN KEY (guest_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### 5. Tabel `blocked_dates`
Menyimpan seluruh tanggal yang tidak dapat dipesan (baik dari booking BSC, sync Airbnb, Tiket.com, owner stay, maupun manual admin).
```sql
CREATE TABLE blocked_dates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    villa_id VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    source ENUM('direct_booking', 'airbnb_ical', 'tiket_ical', 'owner_stay', 'manual_admin') NOT NULL,
    booking_id VARCHAR(50) NULL,             -- Diisi jika sumber dari reservasi langsung BSC
    notes VARCHAR(255) NULL,                 -- Keterangan (misal: 'Owner holiday' atau UID iCal)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (villa_id) REFERENCES villas(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);
```

### 6. Tabel `extra_services`
Menyimpan rincian layanan concierge tambahan yang dipesan tamu.
```sql
CREATE TABLE extra_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    service_type VARCHAR(100) NOT NULL,      -- 'airport_pickup', 'floating_breakfast', dll.
    amount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
```

### 7. Tabel `seasonal_rates`
Menyimpan aturan tarif musiman (*Low/High/Peak Season*) dan syarat *minimum stay*.
```sql
CREATE TABLE seasonal_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    villa_id VARCHAR(50) NOT NULL,
    season_name VARCHAR(100) NOT NULL,       -- 'High Season July-August', 'Peak Season Festive'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_multiplier DECIMAL(4, 2) DEFAULT 1.00, -- Kenaikan otomatis (misal 1.25 untuk +25%, 1.60 untuk +60%)
    fixed_price_usd DECIMAL(10, 2) NULL,     -- Atau tarif flat khusus USD per malam
    min_stay_nights INT DEFAULT 1,           -- Syarat minimal menginap (misal 3 malam di High, 5 malam di Peak)
    weekend_surcharge DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (villa_id) REFERENCES villas(id) ON DELETE CASCADE
);
```

### 8. Tabel `custom_date_rates`
Menyimpan penyesuaian harga khusus pada tanggal tertentu oleh tim Marketing / Revenue Manager (*Custom Date Override*).
```sql
CREATE TABLE custom_date_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    villa_id VARCHAR(50) NOT NULL,
    target_date DATE NOT NULL,
    custom_price_usd DECIMAL(10, 2) NOT NULL, -- Harga khusus pada tanggal tersebut
    min_stay_nights INT DEFAULT 1,
    note VARCHAR(255) NULL,                  -- 'Event Savaya NYE', 'Promo Flash Sale'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (villa_id, target_date),
    FOREIGN KEY (villa_id) REFERENCES villas(id) ON DELETE CASCADE
);
```

### 9. Tabel `homepage_media`
Menyimpan konfigurasi foto, media banner, dan copywriting dinamis untuk seksi halaman depan (Destinasi, Experiences, dan Hero Banner) yang dapat diedit langsung melalui CMS `#editor`.
```sql
CREATE TABLE homepage_media (
    id VARCHAR(100) PRIMARY KEY,             -- 'dest_canggu', 'exp_chef', 'hero_main'
    section VARCHAR(50) NOT NULL,            -- 'destinations', 'experiences', 'hero'
    title VARCHAR(255) NOT NULL,             -- Nama kawasan / judul layanan
    subtitle VARCHAR(255) NULL,
    description TEXT NULL,                   -- Deskripsi kartu
    badge VARCHAR(100) NULL,                 -- '★ Most Popular Hub', 'Clifftops & Sunsets'
    image VARCHAR(500) NOT NULL,             -- URL foto lokal (/uploads/...) atau CDN
    fallback_image VARCHAR(500) NULL,
    display_order INT DEFAULT 0,
    meta_json LONGTEXT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 6. SPESIFIKASI REST API ENDPOINT

### 6.1. Endpoint Publik (Frontend Web Client)
* `GET /api/villas/:id/availability?month=2026-10`
  * Mengembalikan daftar tanggal yang tidak tersedia (*blocked dates*) untuk kalender villa.
* `POST /api/bookings/hold`
  * Melakukan *lock* sementara selama 15 menit saat tamu mulai mengisi form checkout.
* `POST /api/bookings/checkout`
  * Memvalidasi harga server-side dan membuat sesi pembayaran (*invoice / payment session*) ke payment gateway.
* `POST /api/auth/forgot-password`
  * Mengirim link reset kata sandi ke Gmail pengguna.
* `POST /api/auth/reset-password`
  * Menyimpan kata sandi baru menggunakan token reset yang valid.
* `POST /api/auth/verify-otp`
  * Memverifikasi kode 6 angka OTP yang dikirim ke Gmail untuk otentikasi login 2FA admin dan pemilik villa.
* `GET /api/ical/:villaSlug.ics`
  * Endpoint publik kalender BSC dalam format standar RFC 5545 `.ics` untuk diimpor oleh Airbnb dan Tiket.com.

### 6.2. Endpoint Webhook (Payment Gateway)
* `POST /api/webhooks/payment`
  * Menerima notifikasi callback saat pembayaran lunas.
  * Memverifikasi tanda tangan digital HMAC SHA-256 payment gateway.
  * Memperbarui status booking menjadi `confirmed`.
  * Memasukkan tanggal ke tabel `blocked_dates` secara permanen.
  * Memicu pengiriman email konfirmasi dan WhatsApp notifikasi.

### 6.3. Endpoint Admin & Owner Portal
* `GET /api/admin/bookings` (Melihat seluruh daftar reservasi - Super Admin)
* `POST /api/admin/villas/:id/sync-ical` (Memicu sinkronisasi instan iCal Airbnb/Tiket.com)
* `PUT /api/admin/villas/:id/ical-urls` (Menyimpan tautan link iCal Airbnb/Tiket.com)
* `POST /api/admin/villas/:id/manual-block` (Memblokir tanggal secara manual oleh admin)
* `GET /api/owner/my-villas` (Melihat data villa & laporan keuangan milik owner yang login)
* `POST /api/owner/villas/:id/owner-stay` (Memblokir tanggal untuk penggunaan pribadi pemilik villa)

---

## 7. PENANGANAN BUG KRITIS & PENGALAMAN PENGGUNA (EDGE CASES & UX)

### 7.1. Double Booking & Rebutan Tanggal di Detik yang Sama (*Race Condition*)
* **Masalah:** Tamu A dan Tamu B menekan tombol checkout untuk rentang tanggal yang sama di detik yang hampir bersamaan.
* **Solusi Back-End (Atomic Lock & Pessimistic Check):**
  1. Siapa yang menekan lebih awal (selisih milidetik), database mengeksekusi operasi atomik untuk mengunci baris (*row lock*) dan menetapkan status `HOLD` dengan batas kedaluwarsa 15 menit (`hold_expires_at = NOW() + INTERVAL 15 MINUTE`).
  2. **UX Tamu A (Pemenang Antrean):**
     - Muncul *Countdown Timer* 15:00 menit:  
       > ⏱️ *"Tanggal ini telah kami amankan untuk Anda selama 15 menit. Selesaikan pembayaran sebelum waktu habis."*
  3. **UX Tamu B (Tamu Kedua):**
     - Sistem menampilkan pesan sopan & edukatif (bukan error teknis yang menakutkan):  
       > 🔒 *"Tamu lain saat ini sedang menyelesaikan pembayaran untuk tanggal ini. Kami menahan tanggal tersebut selama beberapa menit."*
     - Ditampilkan opsi solutif:
       - **[Ingatkan Saya Jika Batal]** *(Mendaftarkan email/WA untuk auto-notifikasi jika Tamu A membatalkan).*
       - **[Lihat 3 Villa Serupa di Area Ini]** *(Menampilkan rekomendasi villa serupa yang masih kosong di tanggal yang sama).*
  4. **Jika Tamu A Batal / Waktu 15 Menit Habis (*Abandoned Cart*):**
     - Background worker otomatis membatalkan status `HOLD` dan mengembalikan tanggal menjadi `AVAILABLE`.
     - Tamu B yang masih membuka halaman menerima notifikasi otomatis:  
       > 🎉 *"Tanggal ini kembali tersedia! Pesan sekarang sebelum diambil tamu lain."*

### 7.2. Fitur Lupa Password & Reset Akun via Gmail
* **Alur Aman:**
  1. Pengguna memasukkan alamat Gmail di form lupa password.
  2. Server menghasilkan token kriptografi 64-karakter dengan masa kedaluwarsa 15–30 menit yang disimpan di tabel `password_resets`.
  3. Mengirimkan email HTML berdesain mewah BSC dengan tombol **[Atur Ulang Kata Sandi Saya]**.
  4. Pengguna memasukkan password baru di halaman `/reset-password?token=xxxx`.
  5. Password di-hash menggunakan **bcrypt (salt rounds 10)** dan token langsung dihapus dari database.
* **Keamanan Privasi:** Respons form selalu netral (*"Jika email Anda terdaftar, kami telah mengirimkan link reset"*), sehingga peretas tidak bisa menebak apakah suatu email terdaftar di sistem.

### 7.3. Format Email Konfirmasi Reservasi Resmi (Ala Airbnb / Traveloka)
Begitu pembayaran terverifikasi, sistem mengirimkan email konfirmasi resmi ke Gmail tamu:
* **Header:** Logo resmi Bali Stay Collection, stempel status *"Guaranteed Reservation"*, dan Kode Booking unik (`BSC-202610-0482`).
* **Jadwal Menginap Terperinci:**
  - **Check-in:** Hari, Tanggal, Jam (Contoh: *Jumat, 14 November 2026 — Mulai 14:00 WITA*).
  - **Check-out:** Hari, Tanggal, Jam (Contoh: *Rabu, 19 November 2026 — Maksimal 11:00 WITA*).
  - **Durasi & Tamu:** 5 Malam · 4 Tamu.
* **Navigasi Presisi:** Tombol **[Buka Rute di Google Maps]** (langsung memandu supir/tamu ke lokasi villa).
* **Rincian Pembayaran:** Tarif per malam, *cleaning fee*, pajak/layanan, total dibayar, dan status **LUNAS / DEPOSIT**.
* **Lampiran E-Voucher PDF:** Lampiran PDF resmi untuk ditunjukkan kepada butler saat tiba di villa.

### 7.4. Lifecycle Notifikasi Otomatis (H-1 Check-in & Pasca Check-out)
* **Pengingat H-1 Check-in (Pukul 09:00 WITA Sehari Sebelum Tiba):**
  - Dikirim via WhatsApp & Email:
    > *"Halo [Nama Tamu], besok adalah hari liburan Anda di [Nama Villa]! Tim BSC siap menyambut Anda.*  
    > *• Check-in: Mulai 14:00 WITA*  
    > *• Rute Peta: [Link Google Maps]*  
    > *• Kontak Butler/Manager Villa: Bli Wayan (+62 812-xxxx-xxxx)*  
    > *• Butuh penjemputan bandara atau floating breakfast besok pagi? Cukup balas pesan ini."*
* **Pesan Terima Kasih & Review Pasca Check-out (Pukul 14:00 WITA Hari Check-out):**
  - Dikirim via WhatsApp & Email:
    > *"Terima kasih telah menginap di [Nama Villa], Bali Stay Collection! Kami harap liburan Anda penuh kenangan indah.*  
    > *Bagaimana pengalaman Anda? Mohon berikan ulasan singkat di sini: [Link Review]*  
    > *Gunakan kode **BALIBACK10** untuk diskon 10% di liburan Anda berikutnya bersama kami."*

---

## 8. STANDAR KEAMANAN SIBER & PROTEKSI DATA PELANGGAN (CYBERSECURITY & ANTI-HACK)

Untuk menjamin sistem tidak dapat dibajak dan data pelanggan tidak bocor, arsitektur back-end menerapkan standar keamanan industri perbankan & perhotelan:

### 8.1. Nol Penyimpanan Data Kartu Kredit (PCI-DSS Zero-Liability)
* **Prinsip Utama:** Server dan database BSC **TIDAK PERNAH** menyimpan nomor kartu kredit, tanggal kedaluwarsa, maupun kode CVV tamu sama sekali!
* **Solusi Tokenization:** Penginputan kartu dilakukan melalui iframe/widget terenkripsi resmi milik Payment Gateway (Xendit / Stripe / Midtrans).
* Server BSC hanya menerima token referensi acak (misal: `tok_1N8xZa...`).
* **Hasilnya:** Sekalipun server atau database BSC berhasil ditembus pihak luar, **TIDAK ADA DATA KARTU KREDIT YANG BISA DICURI**. Kerugian finansial tamu tereliminasi 100%.

### 8.2. Enkripsi Data Pribadi (Data Protection & Privacy)
* **Enkripsi Saat Berpindah (*In-Transit*):** Wajib menggunakan koneksi HTTPS dengan sertifikat SSL/TLS modern (TLS 1.3). Seluruh komunikasi antara browser tamu dan server dienkripsi 256-bit, sehingga tidak dapat disadap di jaringan WiFi publik (kafe/bandara).
* **Password Hashing Kuat (*At-Rest*):** Kata sandi seluruh akun pengguna, admin, dan pemilik villa disimpan menggunakan algoritma **bcrypt** dengan *salt* acak. Tidak ada kata sandi yang disimpan dalam bentuk teks biasa.
* **Sanitisasi Data Kontak:** Nomor telepon dan alamat email tamu hanya dapat diakses oleh peran yang memiliki izin sah (Admin & Butler bertugas).

### 8.3. Perlindungan Dari Serangan Web Hacker Umum (OWASP Top 10)
* **Anti SQL Injection:** Seluruh kueri basis data wajib menggunakan *Prepared Statements / Parameterized Queries* (via ORM atau query builder). Peretas tidak dapat menyuntikkan perintah SQL perusak untuk mengekstrak data.
* **Anti XSS & Form Sanitization:** Semua input teks dari tamu (seperti *special requests* atau ulasan) dibersihkan dari tag HTML/JavaScript berbahaya (`strip_tags` / validator).
* **Proteksi CSRF & Cookie Aman:** Token sesi login admin menggunakan cookie dengan atribut `HttpOnly; Secure; SameSite=Strict`, mencegah pencurian cookie sesi melalui skrip luar.

### 8.4. Pertahanan Brute-Force & Pembatasan Request (*Rate Limiting*)
* **Proteksi Form Login:** Membatasi percobaan login maksimal 5 kali dalam 10 menit per alamat IP. Jika terdeteksi percobaan berulang, sistem mengunci sementara dan meminta verifikasi.
* **Proteksi API Rate Limiting:** Membatasi request ke endpoint booking publik (misal maksimal 30 request/menit per IP) untuk mencegah bot menyerbu kalender atau melakukan *scraping* massal.

### 8.5. Otentikasi Dua Langkah (2FA) via Gmail OTP (100% Gratis & Tanpa Biaya API)
* Untuk akun Super Admin dan Pemilik Villa yang mengelola keuangan, kalender, dan data properti, diterapkan **Otentikasi Dua Faktor (2FA) berbasis Gmail/Email**:
  - **Sistem Pengiriman Gratis:** Menggunakan modul Node.js `nodemailer` yang dihubungkan langsung ke akun Gmail resmi BSC (menggunakan fitur bawaan *Google App Password*) atau layanan email gratis (*Resend / SendGrid free tier* 3.000 email/bulan).
  - **Alur Login:** Setiap kali admin atau pemilik villa login dari perangkat/browser baru, server mengirimkan kode 6 angka acak ke kotak masuk Gmail mereka (berlaku 5 menit).
  - **Keunggulan:** **100% Gratis selamanya** tanpa perlu membayar biaya langganan WhatsApp API atau SMS gateway per pesan. Sangat stabil, resmi, dan tidak berisiko terblokir.
* Sekalipun kata sandi admin ditebak atau bocor, peretas tetap tidak dapat masuk ke sistem tanpa kode OTP rahasia yang masuk ke akun Gmail terverifikasi pemilik.

### 8.6. Verifikasi Tanda Tangan Webhook Pembayaran (HMAC SHA-256)
* Mencegah peretas menembakkan notifikasi pembayaran palsu ke server seolah-olah tamu sudah bayar padahal belum.
* Back-end memverifikasi *header signature* (HMAC SHA-256) pada setiap webhook masuk menggunakan *Secret Webhook Key* resmi dari Xendit/Midtrans/Stripe. Jika tanda tangan digital tidak cocok, server langsung membuang request tersebut.

### 8.7. Lapangan Pelindung Jaringan (Cloudflare WAF & DDoS Shield)
* Domain `balistaycollection.com` diproteksi melalui **Cloudflare**:
  - **DDoS Mitigation:** Menangkal serangan banjir traffic bot yang berniat melumpuhkan website.
  - **Web Application Firewall (WAF):** Otomatis memblokir IP mencurigakan, scanner kerentanan otomatis, dan penyerang dari luar negeri yang mencurigakan sebelum request mencapai server kita.

### 8.8. Pencadangan Otomatis & Pemulihan Bencana (*Daily Backup & Disaster Recovery*)
* Basis data di-backup otomatis setiap hari (pukul 02:00 pagi) dalam keadaan terenkripsi ke penyimpanan cloud terpisah (AWS S3 / Google Cloud Storage).
* Jika terjadi kendala fatal pada server hosting, sistem dapat dipulihkan (*restore*) secara utuh dalam hitungan menit tanpa kehilangan data reservasi.

---

## 9. ALUR TRANSAKSI & KEAMANAN

### Alur Lengkap Saat Tombol "Reserve" Ditekan:
```
1. Tamu memilih Check-in, Check-out, Tamu di halaman detail villa.
2. Tamu klik "Reserve" ──> Terbuka popup `BookingModal`.
3. Tamu mengisi Nama, Email, WhatsApp ──> POST /api/bookings/hold (Kunci tanggal 15 menit).
4. Tamu menekan "Confirm & Reserve":
   a. Back-end memvalidasi ulang kalender fisik (Pre-payment check).
   b. Back-end menghitung ulang harga riil di server (malam x tarif + cleaning fee).
   c. Back-end membuat Invoice via Payment Gateway (Xendit / Midtrans / Stripe).
5. Tamu menyelesaikan pembayaran di layar/popup Payment Gateway terenkripsi.
6. Webhook menerima konfirmasi pembayaran SUKSES:
   a. Server memverifikasi digital signature webhook (HMAC SHA-256).
   b. Status booking berubah menjadi `confirmed`.
   c. Tanggal terkunci permanen di tabel `blocked_dates`.
   d. Sistem mengirim Email Voucher PDF resmi ke Gmail tamu.
   e. Sistem mengirim pesan WhatsApp notifikasi ke admin BSC.
   f. Berkas iCal BSC terbarui otomatis ──> Airbnb & Tiket.com otomatis ikut terblokir.
```

---

## 10. RENCANA TAHAPAN PENGERJAAN (IMPLEMENTATION ROADMAP)

* **Fase 1: Fondasi Basis Data & Auth Roles**
  - Pembuatan tabel database (`users`, `password_resets`, `villas`, `bookings`, `blocked_dates`).
  - Setup autentikasi peran (Admin, Owner, Staff) & password hashing bcrypt.
* **Fase 2: Mesin Sinkronisasi iCal & Anti Double-Booking**
  - Implementasi parser iCal untuk membaca link Airbnb & Tiket.com.
  - Setup Cron Scheduler (berjalan tiap 5–10 menit) & Atomic 15-Minute Hold.
  - Pembuatan endpoint ekspor kalender BSC (`/api/ical/:villaSlug.ics`).
* **Fase 3: Integrasi Payment Gateway & Webhook Signature**
  - Integrasi SDK Xendit / Midtrans / Stripe (Nol penyimpanan kartu).
  - Pembuatan Webhook receiver terverifikasi HMAC SHA-256.
* **Fase 4: Notifikasi Otomatis & Email Engine (100% Bebas Biaya API)**
  - Integrasi layanan email (Nodemailer / Gmail SMTP / Resend) untuk voucher reservasi, kode OTP 2FA login, reset password, pengingat H-1, dan ucapan terima kasih pasca checkout.
  - Integrasi tombol Direct WhatsApp Link (`wa.me`) dengan pesan terformat otomatis untuk komunikasi concierge/butler langsung tanpa langganan API berbayar.
* **Fase 5: Dasbor Admin & Portal Pemilik (Owner Portal)**
  - Tampilan web untuk admin BSC (pantau booking & iCal).
  - Tampilan web untuk pemilik villa (fitur *Owner Stay* & laporan bagi hasil).
* **Fase 6: Pengerasan Keamanan (Security Hardening & Backup)**
  - Konfigurasi Cloudflare WAF, SSL/TLS, Rate Limiting, dan script automated backup harian.

---

*Cetak biru ini siap menjadi acuan implementasi kode back-end yang tangguh, aman, dan berstandar internasional.*
