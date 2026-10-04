# Bali Stay Collection - Project Progress & Architecture Documentation

Dokumentasi lengkap mengenai status proyek, arsitektur kode, fitur yang telah diimplementasikan, konvensi pengembangan, dan rencana selanjutnya. Dibuat agar siapa pun (termasuk AI agent berikutnya) dapat melanjutkan pengembangan tanpa kehilangan konteks.

---

## 1. Ringkasan Proyek (Overview)

- **Nama Proyek**: Bali Stay Collection (Aplikasi Web Reservasi Villa Mewah Bali ala Airbnb)
- **Teknologi Utama**: React 19, Vite, Vanilla CSS (`src/index.css`), Node.js ES Modules
- **Lokasi Workspace**: `C:\Users\Admin\Videos\Airbnb`
- **Referensi Desain / Mockup**:
  - `C:\Users\Admin\Videos\bali-stay-collection.html` (Katalog utama, Concierge finder, direct benefits)
  - `C:\Users\Admin\Videos\villa-kana-retreat-detail.html` (Detail layout, sticky card, kalender, reviews)
  - `C:\Users\Admin\Videos\bali-stay-collection-booking-ui.html`

> [!IMPORTANT]
> ### ATURAN WAJIB DARI PEMILIK PROYEK (USER STRICT RULES):
> 1. **SETIAP FUNGSI KODE WAJIB MEMILIKI KOMENTAR BAHASA INDONESIA (JSDoc)**:
>    - Setiap kali membuat atau memodifikasi fungsi di berkas `.jsx`, `.js`, maupun `.mjs`, **WAJIB menyertakan komentar JSDoc dalam Bahasa Indonesia** tepat di atas fungsinya.
>    - Komentar harus menjelaskan:
>      - **Tujuan / kegunaan** dari fungsi tersebut
>      - Keterangan setiap **parameter (`@param`)**
>      - Keterangan **nilai yang dikembalikan (`@returns`)**
>    - **Contoh Format Wajib**:
>      ```javascript
>      /**
>       * Menghitung total biaya reservasi berdasarkan jumlah malam dan biaya kebersihan
>       * @param {number} pricePerNight - Harga per malam dalam USD
>       * @param {number} nights - Jumlah malam menginap
>       * @param {number} cleaningFee - Biaya kebersihan satu kali
>       * @returns {number} Total harga akhir reservasi
>       */
>      function calculateTotal(pricePerNight, nights, cleaningFee) {
>        return (pricePerNight * nights) + cleaningFee;
>      }
>      ```
> 2. **FITUR LOGIN DITUNDA (*"login nanti aja"*)**:
>    - Pengguna secara eksplisit meminta autentikasi/login ditunda. Jangan membuat halaman login atau alur auth sebelum diminta langsung oleh pengguna.
> 3. **UKURAN HALAMAN SEJAJAR DENGAN HEADER & FOOTER (1120px)**:
>    - Bagian `.wrap-detail` memiliki `max-width: 1120px; margin: 0 auto; padding: 0 48px;` agar sejajar sempurna dari atas sampai bawah.
> 4. **STICKY BOOKING CARD HANYA SAMPAI BATAS KALENDER**:
>    - Booking card di sebelah kanan hanya melayang (*sticky*) saat di-scroll sampai bagian bawah kalender ketersediaan (*availability calendar*).
>    - Di bawah kalender (section ulasan tamu, peta, concierge finder, dan kebijakan), booking card tidak lagi mengunci/mengikuti scroll sehingga section-section tersebut mengambil lebar penuh (*full-width space*).

---

## 2. Aturan & Konvensi Wajib (Strict Guidelines)

1. **Komentar Fungsi (Indonesian JSDoc Comments)**:
   - **WAJIB**: Setiap fungsi di semua berkas kode (`.jsx`, `.js`, `.mjs`) **harus memiliki komentar JSDoc dalam Bahasa Indonesia** yang menjelaskan tujuan fungsi, parameter (`@param`), dan nilai kembalian (`@returns`). Dilarang membuat fungsi polos tanpa komentar penjelas.
2. **Fitur Login**:
   - **DITUNDA**: Pengguna secara eksplisit meminta fitur autentikasi/login ditunda terlebih dahulu (*"login nanti aja"*). Jangan membuat fitur login sampai diminta langsung oleh user.
3. **Lebar Kontainer Halaman Detail**:
   - `max-width: 1120px; margin: 0 auto; padding: 0 48px;` (`.wrap-detail`) sejajar presisi dengan header navbar dan footer.
4. **Perilaku Sticky Booking Card**:
   - Booking card di kolom kanan mengikuti scroll pengguna **hanya sampai batas bawah kalender ketersediaan** (*Availability calendar*). Di bawah batas kalender, section ulasan tamu, peta, concierge finder, dan kebijakan membentang penuh (*full width* 1120px) tanpa terhalang kolom booking card.
5. **Palet Warna Desain**:
   - Latar: `--bg: #FAF9F5`, `--bg-warm: #F3EFE4`
   - Teks: `--ink: #141413`, `--ink-soft: #55524A`, `--muted: #8A8779`
   - Aksen: Terracotta `--accent: #C96F4A`, Gold `--gold: #B6955D`, Sage Green `--sage: #DFE8DF` / `#2F7658`

---

## 3. Data Master Villa (Data Architecture)

Data villa menggunakan sistem hibrida:
- **`src/data/airbnbVillas.json`**: Data asli hasil scraping/import otomatis dari Airbnb (nama, rating, 100+ ulasan asli, breakdown rating, dan puluhan foto per villa yang disimpan lokal di `public/airbnb/`).
- **`src/data/villasData.js`**: Menggabungkan data Airbnb dengan rincian manual (`VILLA_DETAILS`) seperti harga USD/malam, cleaning fee, kebijakan pembatalan, fasilitas, dan detail kamar tidur.
- **Script Import**: `scripts/import-airbnb.mjs` (menggunakan Puppeteer untuk memperbarui data langsung dari Airbnb).

### Villa yang Saat Ini Terdaftar:
1. **St. Lau – Signature 3BR Hideaway in Ubud**
   - ID: `st-lau-ubud` | Airbnb ID: `1517027661326621037`
   - Lokasi: Ubud | 3 Kamar Tidur | 8 Tamu | $220 / malam
2. **Iconic 5BR Cliff Top Villa with 180° Ocean View**
   - ID: `iconic-cliff-top-villa` | Airbnb ID: `1365727502132237034`
   - Lokasi: Balangan Beach (Uluwatu / Badung) | 5 Kamar Tidur | 10 Tamu | $450 / malam
3. **Angkasa :5BR Ubud Villa with Infinity Pool & Views**
   - ID: `angkasa-ubud` | Airbnb ID: `1634534758752754577`
   - Lokasi: Ubud | 5 Kamar Tidur | 10 Tamu | $380 / malam

---

## 4. Struktur File & Komponen yang Telah Diimplementasikan

```
src/
├── App.jsx                     # State utama: router halaman, wishlist, params pencarian
├── index.css                   # Seluruh styling, CSS variables, dan media queries responsif
├── main.jsx                    # Entry point React
├── pages/
│   ├── ExplorePage.jsx         # Halaman katalog utama: Hero search, Destinasi, Grid villa, Filter
│   └── VillaDetailPage.jsx    # Halaman detail villa lengkap (1120px) dengan sticky booking card
├── components/
│   ├── Navbar.jsx              # Navigasi atas dengan logo, wishlist counter, dan tombol aksi
│   ├── Footer.jsx              # Footer situs
│   ├── HeroSearch.jsx          # Bar pencarian tanggal, destinasi, dan tamu di halaman utama
│   ├── Destinations.jsx        # Kartu destinasi populer (Ubud, Balangan Beach, dll)
│   ├── FilterSidebar.jsx       # Filter sidebar kategori, harga, kamar, fasilitas
│   ├── VillaCard.jsx           # Kartu villa untuk grid katalog
│   ├── WhyBookDirect.jsx       # Keuntungan pesan langsung (Direct Booking Benefits)
│   ├── CalendarPicker.jsx      # Kalender ketersediaan 2 bulan dengan blok tanggal terisi
│   ├── ReviewCard.jsx          # Kartu ulasan tamu dengan avatar, bintang, tanggal, respon host
│   ├── ReviewFormSection.jsx   # Form interaktif bagi tamu untuk menulis ulasan baru
│   ├── ReviewMentions.jsx      # Guest reviews mentions pills (filter ulasan per topik kata kunci)
│   ├── ConciergeFinder.jsx     # [BARU] Modul Concierge matching ("Not sure which villa?")
│   └── Modals/
│       ├── GalleryModal.jsx    # Modal galeri foto grouped per ruangan dengan horizontal pills drag
│       ├── ReviewsModal.jsx    # Modal "Show all reviews" ala Airbnb dengan filter bintang & topik
│       ├── BookingModal.jsx    # Modal konfirmasi reservasi / checkout
│       ├── ListVillaModal.jsx  # Modal pendaftaran villa oleh partner host
│       └── WishlistDrawer.jsx  # Drawer samping untuk villa yang disimpan (Wishlist)
├── data/
│   ├── airbnbVillas.json       # JSON data scraping Airbnb
│   └── villasData.js           # Penggabung data master dan fungsi helper
└── utils/
    └── reviewMentions.js       # Algoritma ekstraksi topik ulasan & pencocokan kata kunci
```

---

## 5. Fitur-Fitur Khusus yang Telah Diselesaikan

### A. Concierge Matching Finder (`ConciergeFinder.jsx`)
- Diletakkan di `VillaDetailPage.jsx` tepat di antara section **"Where you'll be"** (Peta) dan **"Things to know"** (Kebijakan).
- Mengimplementasikan section `#finder` dari `bali-stay-collection.html`:
  - *Header*: Kicker `Concierge matching`, Title `Not sure which villa?`, Lead text.
  - *Dropdowns*:
    - **Area** (`#fArea`): `Uluwatu`, `Canggu`, `Seminyak`, `Ubud`, `Sanur`, `All Bali`
    - **Guests** (`#fGuests`): `2`, `4`, `6`, `8`, `10`, `12+`
    - **Bedrooms** (`#fBeds`): `1+`, `2+`, `3+`, `4+`, `5+`
    - **Budget / Night** (`#fBudget`): `Under Rp 3M`, `Rp 3–5M`, `Rp 5–8M`, `Rp 8M+`
  - *Tombol*: `.btn.btn-gold` dengan teks `Find My Villa →`.
  - *Hasil Pencocokan*:
    - Menampilkan konfirmasi kecocokan dengan warna sage green.
    - Quick chips button (`[Nama Villa] · [X]BR`).
    - Kartu pratinjau villa dengan tombol `View Villa →` yang menggulir halus (*smooth scroll*) ke atas dan membuka villa tersebut.
    - Jika tidak ada villa yang persis cocok, menampilkan pesan concierge profesional dan rekomendasi alternatif terbaik.

### B. Sticky Booking Card Batas Scroll
- `.booking-card` berada di kolom kanan sejajar dengan informasi villa dan kalender ketersediaan.
- Menggunakan CSS sticky `position: sticky; top: 100px;` di dalam container `.main-grid`.
- Agar `position: sticky` tidak terhenti oleh overflow global, `body` menggunakan `overflow-x: clip;` (bukan `hidden`).
- Begitu user melakukan scroll melewati kalender (`6 nights in Balangan Beach` / `2 nights in Ubud`), booking card berhenti di bagian bawah kolom kalender. Section di bawahnya (Reviews, Map, Concierge Finder, Policies) mengambil lebar penuh kontainer 1120px.

### C. Guest Reviews Mention (Airbnb Style)
- Diterapkan pada ulasan di halaman detail dan di dalam `ReviewsModal`.
- Menganalisis kata kunci dari review asli tamu (misal: *location*, *breakfast*, *staff*, *pool*, *view*, *clean*, *peaceful*, *bed*, dll.).
- Tamu dapat mengeklik topik untuk memfilter review yang hanya membahas topik tersebut.
- Teks yang sesuai kata kunci topik disorot otomatis dengan `<mark className="review-highlight">`.

### D. Galeri Foto Berkelompok (Grouped by Room) dengan Scroll Horizontal
- Galeri foto di `GalleryModal.jsx` dikelompokkan berdasarkan ruangan: *All photos*, *Living room*, *Kitchen*, *Bedrooms*, *Pool & outdoor*.
- Bar navigasi pill ruangan dapat digeser ke kiri/kanan dengan tombol panah `<` `>` dan *drag to scroll* (mouse grab/touch swipe).

---

## 6. Perintah Menjalankan Aplikasi

- **Menjalankan Dev Server**:
  ```powershell
  npm run dev
  ```
  *(Default URL: `http://localhost:5173`)*
- **Memverifikasi Build**:
  ```powershell
  npm run build
  ```
- **Menjalankan Linter / Oxlint**:
  ```powershell
  npx oxlint
  ```

---

## 7. Hal yang Dapat Dikerjakan Selanjutnya (Backlog / Future Ideas)

1. Menambahkan villa-villa baru ke dalam `airbnbVillas.json` untuk destinasi seperti Canggu, Seminyak, dan Sanur.
2. Integrasi sistem reservasi backend asli (API pembayaran Stripe / Midtrans / WhatsApp Booking Gateway).
3. Penyesuaian mata uang dinamis (toggle IDR / USD).
4. *(Jika nanti diminta user)* Pembuatan modul autentikasi akun tamu dan host.
