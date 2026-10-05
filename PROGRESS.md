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
> 5. **PERINGATAN WAJIB: DILARANG ASAL PUSH KE GITHUB (STRICT PRE-PUSH PROTOCOL)**:
>    - **DILARANG KERAS** melakukan `git push` secara sembarangan, tanpa verifikasi, atau tanpa izin langsung!
>    - Sebelum melakukan push ke remote GitHub, **WAJIB memenuhi seluruh checklist pra-push berikut**:
>      1. **Wajib Build Lulus 100%**: Jalankan `npm run build` dan pastikan bundling Vite sukses tanpa ada error atau kegagalan compiler.
>      2. **Wajib Komentar JSDoc Bahasa Indonesia**: Pastikan setiap fungsi baru atau termodifikasi di `.jsx`, `.js`, `.mjs` telah dilengkapi penjelasan JSDoc lengkap (`@param`, `@returns`, deskripsi).
>      3. **Wajib Bersih dari File Sampah**: Pastikan tidak ada berkas temporer, file duplikat/sisa testing, kredensial/token rahasia, atau asset yang salah tempat.
>      4. **Wajib Cek Git Status & Diff**: Jalankan `git status` dan periksa `git diff` untuk memastikan hanya perubahan yang disepakati yang di-stage.
>      5. **Wajib Sinkronisasi Catatan PROGRESS.md**: Perbarui file `PROGRESS.md` ini terlebih dahulu agar seluruh riwayat pekerjaan, fitur, dan penyesuaian tercatat rapi sebelum commit.
>      6. **Pesan Commit Jelas & Informatif**: Gunakan pesan commit yang deskriptif dan mencerminkan apa yang dikerjakan secara transparan (dilarang menggunakan commit satu kata seperti *"update"* atau *"fix"*).

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
6. **Protokol Ketat Git Push (Peringatan Wajib)**:
   - Dilarang keras melakukan push secara asal atau tergesa-gesa. Setiap commit dan push ke repositori GitHub wajib melalui 6 tahap verifikasi (Build lulus 100%, JSDoc Bahasa Indonesia lengkap, repo bersih dari file sampah/sementara, pemeriksaan git diff/status, sinkronisasi `PROGRESS.md`, dan pesan commit yang rinci serta jelas).

---

## 3. Data Master Villa (Data Architecture)

Data villa menggunakan sistem hibrida:
- **`src/data/airbnbVillas.json`**: Data asli hasil scraping/import otomatis dari Airbnb (nama, rating, 100+ ulasan asli, breakdown rating, dan puluhan foto per villa yang disimpan lokal di `public/airbnb/`).
- **`src/data/villasData.js`**: Menggabungkan data Airbnb dengan rincian manual (`VILLA_DETAILS`) seperti harga USD/malam, cleaning fee, kebijakan pembatalan, fasilitas, dan detail kamar tidur.
- **Script Import**: `scripts/import-airbnb.mjs` (menggunakan Puppeteer untuk memperbarui data langsung dari Airbnb).

### Villa yang Saat Ini Terdaftar (Total 9 Villa):
#### A. 3 Villa Asli (DIKUNCI / LOCKED):
1. **St. Lau – Signature 3BR Hideaway in Ubud** *(Asli / Dikunci)*
   - ID: `st-lau-ubud` | Airbnb ID: `1517027661326621037`
   - Lokasi: Ubud | 3 Kamar Tidur | 8 Tamu | $220 / malam | Rating: 4.80
2. **Iconic 5BR Cliff Top Villa with 180° Ocean View** *(Asli / Dikunci)*
   - ID: `iconic-cliff-top-villa` | Airbnb ID: `1365727502132237034`
   - Lokasi: Balangan Beach (Uluwatu / Badung) | 5 Kamar Tidur | 10 Tamu | $450 / malam | Rating: 4.90
3. **Angkasa :5BR Ubud Villa with Infinity Pool & Views** *(Asli / Dikunci)*
   - ID: `angkasa-ubud` | Airbnb ID: `1634534758752754577`
   - Lokasi: Ubud | 5 Kamar Tidur | 10 Tamu | $380 / malam | Rating: 4.95

#### B. 6 Villa Tambahan Baru (Pelengkap Destinasi Populer):
4. **Villa Samudra – Bohemian Tropical Luxury in Canggu** *(Baru)*
   - ID: `villa-samudra-canggu` | Lokasi: Canggu (Echo Beach) | 3 Kamar Tidur | 6 Tamu | $280 / malam | Rating: 4.93
5. **The Palms Villa – Modern Architectural Haven in Batu Bolong** *(Baru)*
   - ID: `the-palms-villa-canggu` | Lokasi: Canggu (Batu Bolong) | 4 Kamar Tidur | 8 Tamu | $350 / malam | Rating: 4.90
6. **Villa Kayu Raja – Elegant Tropical Oasis in Petitenget** *(Baru)*
   - ID: `villa-kayu-raja-seminyak` | Lokasi: Seminyak (Petitenget) | 3 Kamar Tidur | 6 Tamu | $320 / malam | Rating: 4.88
7. **Villa Cendana – Romantic Honeymoon Hideaway in Seminyak** *(Baru)*
   - ID: `villa-cendana-seminyak` | Lokasi: Seminyak (Kayu Aya) | 2 Kamar Tidur | 4 Tamu | $230 / malam | Rating: 4.96
8. **Cliffside Panorama – Oceanfront Infinity Villa in Uluwatu** *(Baru)*
   - ID: `cliffside-panorama-uluwatu` | Lokasi: Uluwatu (Bingin Beach) | 4 Kamar Tidur | 8 Tamu | $540 / malam | Rating: 4.98
9. **Mandapa Jungle Villa – Eco-Luxury Bamboo Sanctuary in Ubud** *(Baru)*
   - ID: `mandapa-jungle-villa` | Lokasi: Ubud (Sayan Ridge) | 2 Kamar Tidur | 4 Tamu | $290 / malam | Rating: 4.94

---

## 4. Struktur File & Komponen yang Telah Diimplementasikan

```
src/
├── App.jsx                     # State utama: router halaman, wishlist, params pencarian
├── index.css                   # Seluruh styling, CSS variables, dan media queries responsif
├── main.jsx                    # Entry point React
├── pages/
│   ├── ExplorePage.jsx         # Halaman katalog utama: Hero search, Destinasi, Grid villa, Filter
│   ├── VillaDetailPage.jsx    # Halaman detail villa lengkap (1120px) dengan sticky booking card
│   └── VillaContentEditor.jsx  # Halaman Editor Konten Villa khusus manajemen deskripsi & data villa
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
│   ├── ConciergeFinder.jsx     # Modul Concierge matching ("Not sure which villa?")
│   ├── NeighborhoodMap.jsx     # [BARU] Peta interaktif Leaflet 'Where you'll be' + search & nearby POI
│   └── Modals/
│       ├── GalleryModal.jsx    # Modal galeri foto grouped per ruangan dengan horizontal pills drag
│       ├── ReviewsModal.jsx    # Modal "Show all reviews" ala Airbnb dengan filter bintang & topik
│       ├── BookingModal.jsx    # Modal konfirmasi reservasi / checkout
│       ├── ListVillaModal.jsx  # Modal pendaftaran villa oleh partner host
│       └── WishlistDrawer.jsx  # Drawer samping untuk villa yang disimpan (Wishlist)
├── data/
│   ├── airbnbVillas.json       # JSON data scraping Airbnb
│   ├── villasData.js           # Penggabung data master dan fungsi helper
│   └── neighborhoodData.js     # [BARU] Data koordinat GPS villa dan kurasi tempat menarik sekitar (POI)
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

### E. Hero Banner Sinematik Latar Belakang Penuh (Opsi B)
- **Komponen**: `HeroSearch.jsx` dan `src/index.css`.
- **Foto**: Menggunakan foto Master Ultra-HD 2.5K (`2560 x 1707`) persis dari website asli `balistaycollection.com` (`/hero-angkasa.avif`, `/hero-angkasa.webp`, `/hero-angkasa.jpg`), bukan thumbnail scrape 960x640 yang pecah/blur saat diperbesar.
- **Visual & Unzoomed Quality**:
  - Foto dimuat optimal melalui tag `<picture>` dengan dukungan AVIF dan WebP modern.
  - Menghilangkan `transform: scale(1.03)` agar foto tampil dalam proporsi aslinya tanpa terpotong atau ter-zoom secara berlebihan.
  - Mengadopsi gradien navy mewah (`#101936`) berkarakter dari situs aslinya untuk mempertahankan warna alami langit senja dan air kolam renang.
  - Form pencarian (`search-bar`) melayang kontras di atas foto dengan bayangan halus.
  - Badge koleksi menggunakan efek kaca transparan (*glassmorphism*).
  - Dilengkapi tag eksklusif di sudut kanan bawah: `📍 Featured: Angkasa Villa, Ubud`.
### F. Integrasi Logo Brand Resmi (`logo.svg`)
- **Lokasi File**: Disimpan di `public/logo.svg` agar dapat diakses statis oleh browser dari root (`/logo.svg`).
- **Penerapan**:
  - **Favicon**: Diperbarui di `index.html` (`<link rel="icon" type="image/svg+xml" href="/logo.svg" />`).
  - **Navbar**: Menggantikan ikon placeholder sebelumnya dengan logo resmi (`.logo-img`), proporsional pada desktop (`38px`) dan mobile (`32px`).
  - **Footer**: Ditampilkan pada `.footer-brand` (`.footer-logo-img`) dengan filter monochrome putih elegan pada latar gelap footer.

### G. Visual Gambar Kartu Destinasi Populer (`Destinations.jsx`)
- **Pembaruan**: Mengganti kotak warna polos dengan kartu berfoto lanskap estetik Bali untuk 5 destinasi utama:
  - **Ubud**: Kolam renang tropis dan pepohonan rimbun (`/destinations/ubud.jpg`).
  - **Balangan Beach**: Tebing pantai dan laut biru lepas (`/destinations/balangan.jpg`).
  - **Canggu**: Suasana sunset dan villa tepi pantai (`/destinations/canggu.jpg`).
  - **Seminyak**: Arsitektur villa modern dan area santai (`/destinations/seminyak.jpg`).
  - **Uluwatu**: Pesona tebing eksotis Samudra Hindia (`/destinations/uluwatu.jpg`).
- **Efek Interaktif**: Efek perbesaran foto halus saat hover (`transform: scale(1.08)`), bayangan lembut, badge jumlah villa, dan outline aksen saat destinasi sedang aktif dipilih.

### H. Bar Kategori Resmi Airbnb (Diadopsi dari Vista)
- **Komponen**: `Destinations.jsx`, `ExplorePage.jsx`, dan `src/index.css`.
- **Posisi**: Terletak tepat di bagian atas section `#destinations-section` (di atas *Popular Destinations*).
- **Aset Ikon**: Disimpan lokal di `public/categories/`.
- **Status Kategori**:
  - **6 Kategori Aktif**: `Beach` (`beach`), `Trending` (`trending`), `Luxe` (`luxe`), `Amazing View` (`amazingView`), `Pool` (`pool`), dan `WOW!` (`omg`).
  - **Kategori Nonaktif Sementara**: `Beachfront`, `Earth Home`, `Design`, `Tiny Home`, `Historic Home`, `Countryside`, dan `Surfing` dinonaktifkan melalui komentar kode di `src/data/villasData.js` (`//`) agar dapat diaktifkan kembali sewaktu-waktu dengan mudah saat dibutuhkan.
- **Fitur Interaktif & Tampilan**:
  - Posisi bar kategori terpusat secara simetris di tengah (*centered*) pada layar desktop dan tablet, serta otomatis beralih ke mode horizontal scroll yang mulus pada layar smartphone (<= 680px) tanpa terpotong.
  - Horizontal scroll halus tanpa scrollbar (*no-scrollbar*).
  - Indikator aktif (garis bawah solid) saat kategori dipilih.
  - Terintegrasi langsung dengan mesin filter katalog villa di `ExplorePage.jsx`.

### I. Perbaikan Tata Letak Filter Minimum Rating (`FilterSidebar.jsx`)
- **Masalah**: Nama class `.star-row` di pembungkus filter rating bertabrakan dengan styling review cards (`.star-row { display: inline-flex; }`), sehingga judul *"Minimum rating"* dan pilihan radio button berjejer ke samping secara horizontal.
- **Solusi**:
  - Mengubah class pembungkus menjadi `.rating-filter-group` dengan `display: flex; flex-direction: column; width: 100%;`.
  - Memberi class `.radio-row` pada setiap label radio button agar tersusun menurun ke bawah (*vertical stack*) secara teratur dan konsisten dengan kelompok filter lainnya.
  - Mengisolasi selector `.star-row` di `src/index.css` agar spesifik hanya untuk ikon bintang review (`span.star-row`, `.review-meta .star-row`, `.review-card .star-row`).

### J. Penambahan 6 Listing Villa Baru (Total Menjadi 9 Villa)
- **Instruksi Pengguna**: 3 villa asli (`st-lau-ubud`, `iconic-cliff-top-villa`, `angkasa-ubud`) **DIKUNCI DAN TIDAK DIUBAH**. Menambahkan 6 villa baru yang tersebar di Canggu, Seminyak, Uluwatu, dan Ubud.
- **Aset Foto**: 48 foto beresolusi tinggi (8 foto per villa) diunduh dan disimpan secara lokal di `public/airbnb/[id-villa]/photos/` sehingga aplikasi mandiri, cepat, dan tidak bergantung pada link eksternal.
- **Daftar Villa Baru**:
  1. `villa-samudra-canggu`: Villa bohemian tropical di Echo Beach, Canggu ($280/malam, 3 kamar, pool).
  2. `the-palms-villa-canggu`: Villa arsitektural modern di Batu Bolong, Canggu ($350/malam, 4 kamar, sunken lounge).
  3. `villa-kayu-raja-seminyak`: Oasis mewah tropis di Petitenget, Seminyak ($320/malam, 3 kamar, open garden bath).
  4. `villa-cendana-seminyak`: Romantic hideaway di Kayu Aya, Seminyak ($230/malam, 2 kamar, stone bathtub).
  5. `cliffside-panorama-uluwatu`: Villa tebing ultra-luxury di Bingin Beach, Uluwatu ($540/malam, 4 kamar, ocean infinity pool).
  6. `mandapa-jungle-villa`: Eco-luxury bamboo sanctuary di Sayan Ridge, Ubud ($290/malam, 2 kamar, valley plunge pool).
- **Integrasi**: Tersambung otomatis ke `GalleryModal.jsx` (dengan caption per ruangan), `ConciergeFinder.jsx`, mesin pencarian/filter di `ExplorePage.jsx`, dan `POPULAR_DESTINATIONS`.

### K. Penghapusan Bagian "Response from host" (`ReviewCard.jsx`)
- **Instruksi Pengguna**: Seluruh bagian balasan host (*Response from host*) dihilangkan dari tampilan ulasan web.
- **Perubahan**:
  - Menghapus blok render `review.hostResponse` dari komponen `ReviewCard.jsx`.
  - Kartu ulasan kini fokus menampilkan ulasan tamu (nama, foto avatar/inisial, info tamu, rating bintang, tanggal, dan isi ulasan) baik di halaman detail villa (`VillaDetailPage.jsx`) maupun di modal ulasan lengkap (`ReviewsModal.jsx`).

### L. Penempatan Concierge Matching Finder di Halaman Utama (`ExplorePage.jsx`)
- **Posisi**: Ditambahkan tepat di atas section `WhyBookDirect` (`section id="why-section"`), di bawah grid katalog villa pada halaman depan.
- **Fitur**: Membawa fitur pencocokan villa pintar (`ConciergeFinder`) ke beranda web dengan filter Area (Ubud, Canggu, Seminyak, Uluwatu, Sanur, All Bali), jumlah tamu, jumlah kamar, dan rentang budget per malam.
- **Interaktivitas**: Tamu dapat langsung memilih kriteria perjalanan mereka dan tombol "View Villa →" atau quick chip akan membuka halaman detail villa yang cocok secara instan.

### M. Halaman Editor Konten Villa (`VillaContentEditor.jsx`)
- **Tujuan**: Memfasilitasi kolaborasi langsung dengan tim/bos untuk menulis dan mempercantik deskripsi 6 villa baru tanpa harus menyentuh kode program atau berkas JSON mentah.
- **Akses & Navigasi**:
  - Dapat diakses secara langsung melalui URL hash rahasia: **`/#editor`** (misal: `http://localhost:5173/#editor` atau `https://balistaycollection.vercel.app/#editor`).
  - **Navbar tetap bersih dan eksklusif**: Tombol editor ditiadakan dari navbar publik agar pengunjung web umum tidak melihat tombol administratif/editor.
  - Beralih halaman secara mulus (*Single Page Application*) dengan fungsi `onOpenDetail` dan `onBackToHome`.
- **Fitur & Mekanisme Kerja**:
  - **Struktur & Kemudahan Akses Villa**:
    - **Posisi Paling Atas**: 3 villa utama (`St. Lau`, `Iconic 5BR Cliff Top`, dan `Angkasa 5BR`) secara default ditempatkan di **posisi paling atas** daftar villa sehingga bos langsung menemukannya saat membuka editor.
    - **Bebas Diedit Sepenuhnya**: Seluruh 9 villa (termasuk 3 villa teratas) dapat diedit secara bebas tanpa batasan/gembok.
    - **Tampilan Bersih**: Teks/label pembeda "villa asli" telah dihilangkan untuk menjaga antarmuka tetap bersih dan profesional.
  - **Formulir Pengeditan Lengkap**:
    - Nama/Judul Villa & Kategori utama.
    - Harga per malam (USD) & Biaya kebersihan (*cleaning fee*).
    - Lokasi wilayah & alamat spesifik.
    - Kapasitas menginap (jumlah tamu, kamar tidur, tempat tidur, kamar mandi).
    - *Short Description* dengan penghitung karakter langsung (*live character counter*).
    - *Full / Detailed Description* dengan textarea luas dan penghitung karakter.
    - Pemilihan fasilitas/amenities interaktif (*checkbox pill*) serta form penambahan fasilitas kustom baru.
  - **Persistensi Data Lokal (Auto-Save LocalStorage)**:
    - Setiap perubahan yang disimpan disimpan ke `localStorage.setItem('bsc_villas', ...)`.
    - Tulisan dan perubahan data tidak akan hilang meski tab/browser di-reload atau ditutup.
    - Data yang disimpan langsung otomatis menyinkronkan katalog dan halaman detail villa di website saat dites.
  - **Opsi Ekspor & Kolaborasi Praktis**:
    - **Salin Teks untuk Ardi**: Menyalin format teks rapi (nama villa, spesifikasi, short description, full description) langsung ke clipboard untuk dikirim lewat chat.
    - **Kirim ke WhatsApp Ardi**: Membuka tautan `https://wa.me/?text=...` berisi rangkuman deskripsi villa yang baru diedit sehingga bos dapat mengirim revisi sekali klik.
    - **Unduh File Data (JSON)**: Mengunduh berkas `villasData-updated.json` yang siap diintegrasikan langsung oleh developer ke dalam codebase.
    - **Lihat Tampilan di Web**: Tombol pintas untuk langsung beralih ke halaman detail villa terkait guna melihat hasil tampilan tulisan secara langsung.
  - **Kepatuhan Kode**: Seluruh fungsi di komponen ini dilengkapi dengan komentar JSDoc Bahasa Indonesia lengkap sesuai standar proyek.

### N. Penambahan Kategori Villa: Luxe, Family, dan Retreat
- **Kategori Baru**: `Luxe`, `Family`, dan `Retreat` telah ditambahkan ke dalam ekosistem kategori aplikasi.
- **Integrasi Penuh**:
  - **Halaman Editor Konten (`VillaContentEditor.jsx`)**: Dropdown pilihan kategori kini memiliki pilihan lengkap: `Standard`, `Deluxe`, `Premium`, `Luxe`, `Family`, `Retreat`, dan `Honeymoon`.
  - **Filter Sidebar (`FilterSidebar.jsx`)**: Checkbox filter kategori menyertakan ketiga opsi baru tersebut sehingga tamu dapat memfilter villa khusus tipe *Luxe*, *Family*, maupun *Retreat*.
  - **Mesin Filter Katalog (`ExplorePage.jsx`)**: State default dan fungsi reset filter telah diperbarui untuk mendukung seluruh 7 kategori, serta filter bar *Luxe* langsung menyaring villa dengan kategori *Luxe*, *Premium*, dan *Deluxe*.

### O. Peta Interaktif & Neighborhood Guide 'Where you'll be' (`NeighborhoodMap.jsx`)
- **Implementasi**: Menggantikan box peta statis dengan modul eksplorasi kawasan interaktif (*Neighborhood Guide*) ala Airbnb di halaman detail villa (`VillaDetailPage.jsx`).
- **Teknologi**: Menggunakan pustaka peta `leaflet` dan tile layer **OpenStreetMap Resmi** (`tile.openstreetmap.org`) yang 100% bebas API Key selamanya dan tidak pernah meminta biaya billing.
- **Fitur Utama**:
  - **Pin Villa & Lingkaran Privasi**: Marker custom terracotta beranimasi pulse dengan lingkaran radius privasi 350 meter khas Airbnb (*approximate location*).
  - **Pencarian Live Sekitar (*Search Nearby*)**: Input pencarian real-time untuk mencari pantai, cafe, beach club, warung, supermarket, atau tempat yoga.
  - **Filter Kategori Cepat**: 8 kategori filter pill (*All places, Beaches & Surf, Beach Clubs, Cafes & Coffee, Dining, Yoga & Wellness, Groceries, Airport & Transit*).
  - **Data POI Terkurasi Nyata**: Database tempat populer di sekitar masing-masing kawasan (Echo Beach, Batu Bolong, Petitenget, Kayu Aya, Balangan, Bingin, Ubud Center, Sayan Ridge).
  - **Sinkronisasi Interaktif 2 Arah**:
    - Mengeklik pin di peta memunculkan popup kartu info dan menyorot kartu tempat di panel daftar samping.
    - Mengeklik kartu di panel samping menggerakkan kamera peta secara halus (*smooth flyTo*) langsung ke lokasi dan membuka popupnya.
  - **Integrasi Google Maps Penuh (One-Click Navigation)**:
    - **Header Peta**: Tombol *"Buka di Google Maps ↗"* untuk membuka seluruh area villa di Google Maps.
    - **Tombol Melayang (Floating Map Button)**: Tombol *"Google Maps ↗"* di sudut kanan atas peta.
    - **Popup Marker Villa**: Tombol *"📍 Buka Lokasi di Google Maps ↗"* saat pin villa diklik.
    - **Popup Marker Tempat Sekitar**: Tombol *"🚗 Buka Rute di Google Maps ↗"* yang langsung mengarahkan rute GPS di Google Maps.
    - **Kartu Tempat di Panel Samping**: Tombol *"Buka Rute ↗"* untuk membuka navigasi rute instan.
  - **Tombol Fokus ke Villa**: Tombol *recenter* untuk mengembalikan fokus kamera peta ke titik villa utama.

### 5.8. Validasi Ketat Rentang Tanggal Reservasi (Strict Date Range Booking Validation)
- **Masalah Sebelumnya**:
  - Bila tanggal 2 sudah di-booking tamu lain, user masih dapat memilih rentang tanggal 1 sampai 7 sehingga sistem checkout masih mengizinkan reservasi meskipun di tengahnya ada tanggal yang sudah terisi.
- **Solusi & Implementasi**:
  1. **Fungsi Evaluasi `checkDateRangeAvailability(checkInStr, checkOutStr, bookedDays)`** di [`src/data/villasData.js`](file:///C:/Users/CSO%20KUTA%202/Documents/web/BaliStayCollection/src/data/villasData.js):
     - Menelusuri setiap malam menginap (*stay night*) dari hari Check-in hingga 1 hari sebelum Check-out.
     - Jika ada malam yang bertabrakan dengan `bookedDays`, sistem mengembalikan `isAvailable: false`, daftar `conflictDays`, dan pesan peringatan ramah pengguna.
  2. **Interaktivitas Kalender 2 Langkah (`CalendarPicker.jsx`)**:
     - **Langkah 1 (Check-in)**: Mengklik tanggal booked langsung dicegah dengan notifikasi peringatan. Mengklik tanggal valid otomatis mengarahkan ke mode pilih Check-out yang aman.
     - **Langkah 2 (Check-out)**: Jika user mengklik tanggal Check-out yang membentang melewati tanggal booked, sistem **menolak pilihan tersebut** dan menampilkan peringatan tanggal bentrok serta menyarankan tanggal yang kosong.
     - **Penandaan Warna**: Tanggal yang sudah di-book tetap konsisten berwarna **MERAH mencolok** (`.day.booked`) dan tidak pernah tertimpa warna pilihan biasa.
  3. **Pencegahan Checkout di Booking Card & Mobile Bar (`VillaDetailPage.jsx`)**:
     - Kotak input tanggal diberi status visual error border merah (`.date-grid.has-error`) bila rentang tidak valid.
     - Ditampilkan banner peringatan konflik di dalam kartu reservasi (`.booking-date-error-banner`).
     - Tombol **Reserve** dinonaktifkan (`disabled`, class `.btn-disabled`, teks berubah menjadi *"Dates Unavailable"*) baik pada kartu desktop maupun bar melayang mobile, sehingga modal checkout diblokir sepenuhnya sampai tanggal diganti ke tanggal yang valid.

### 5.9. Tata Letak Galeri Foto Mewah (Format contoh.jpeg)
- **Referensi Desain**: `contoh.jpeg` dari folder Downloads user.
- **Implementasi**:
  1. **Baris Atas (Hero Section - 3 Foto)**:
     - Sisi Kiri: 1 Foto Utama Besar (`.gallery-hero-main`), mengambil porsi ~65% lebar, tinggi 460px (pada desktop) dengan sudut melengkung halus `border-radius: 12px`.
     - Sisi Kanan: 2 Foto Sedang tersusun vertikal (`.gallery-hero-sub`), masing-masing 50% tinggi dengan gap 10px.
  2. **Baris Bawah (Thumbnail Row - 5 Foto Sejajar)**:
     - 5 Foto horizontal dengan ukuran proporsional sama rata (`repeat(5, 1fr)`).
     - Foto 1, 2, 3, dan 4 tampil normal.
     - Foto ke-5 (Total foto ke-8 di pojok kanan bawah) dilengkapi lapisan gelap (*dark overlay*) elegan dengan teks putih tebal bergaris bawah: **`+X photos`** (misal `+100 photos` atau `+61 photos`), yang secara dinamis menghitung sisa foto asli villa tersebut.
  3. **Interaktivitas Penuh & Sinkronisasi Modal Lightbox**:
     - Setiap foto memiliki transisi halus saat di-hover (`scale(1.008)`, `box-shadow`, dan sedikit redup).
     - Mengeklik foto mana pun (termasuk tombol overlay `+X photos`) akan membuka modal Lightbox `GalleryModal` lengkap.
     - Jika foto spesifik diklik (misal foto 2), modal langsung terbuka dalam mode fokus foto tersebut (`initialPhotoIndex`).
  4. **Adaptasi Layar Mobile & Tablet**:
     - Pada tablet: tinggi grid disesuaikan secara proporsional.
     - Pada ponsel: foto utama ditampilkan penuh dengan badge `1 / X`, dan baris bawah bertransformasi menjadi *swipeable thumbnail strip* yang halus dan intuitif.

### 5.10. Pembaruan Data Villa: Villa Habitas (4BR Pererenan Pool Villa)
- **Sumber Data**: Pembaruan konten resmi dari Coach untuk properti 4 kamar tidur di Canggu / Pererenan.
- **Rincian yang Diperbarui**:
  - **Nama Properti**: `Villa Habitas – 4BR Pererenan Pool Villa · Walk to Cafes & Bars`
  - **Harga**: `$290 / malam` (dari sebelumnya $350)
  - **Kategori**: `Premium`
  - **Lokasi & Alamat**: `Pererenan, Canggu, Badung, Bali`
  - **Kapasitas**: 8 tamu, 4 kamar tidur (masing-masing King Bed + En-suite Bathroom), 4 kasur, 4 kamar mandi
  - **Short Description**: Deskripsi ringkas mengenai villa 4 kamar di Pererenan dengan lagoon pool dan staf lokal ramah.
  - **Full Description (Expandable)**: Deskripsi komprehensif mencakup Living & Dining, Pool, Kitchen, Bedrooms & Bathrooms, Work & Connectivity (WiFi 200 Mbps), Extras, Guest Access, Your Local Team, Travelling with Family, The Neighbourhood, dan Other Things to Note (Check-in 14:00, Check-out 12:00, Min stay 2 nights, Pet friendly, Cut off date 21 Days).
  - **Fasilitas (Amenities)**: Private pool, Jungle view, River valley view, High-speed WiFi, Full kitchen, Air conditioning, Free parking.
  - **Peta & Points of Interest (POI)**: Koordinat dipusatkan di Pererenan dengan POI nyata: Pantai Pererenan, Echo Beach, Shelter Pererenan, Baked Pererenan, Touché Cafe, Pepito Supermarket Pererenan, dan Bandara DPS.

### 5.11. Revisi Bagian Destinasi (Sesuai revisi 1.png dari Bos)
- **Referensi**: Screenshot `revisi 1.png` dari folder Downloads user.
- **Perubahan yang Diterapkan**:
  1. **Judul Bagian**: Diubah dari *"Popular Destinations"* menjadi **"Prefer Villa Destination"** (atau *"Pefer Villa Distanition"*).
  2. **Jumlah Destinasi**: Disederhanakan dari 5 destinasi menjadi **3 destinasi utama**:
     - **Ubud** (3 villas) – `/destinations/ubud.jpg`
     - **Canggu** (2 villas) – `/destinations/canggu.jpg`
     - **Uluwatu** (2 villas) – `/destinations/uluwatu.jpg`
  3. **Layout & Grid CSS**:
     - Diubah menjadi `grid-template-columns: repeat(3, 1fr)` dengan `gap: 20px` dan tinggi kartu dinaikkan menjadi `180px` agar tampak lebih mewah, seimbang, dan proporsional di seluruh ukuran layar.
     - Terintegrasi penuh dengan filter klik: mengeklik salah satu kartu destinasi langsung menyaring katalog villa secara mulus.

---

### 5.12. Bagian "5 Most Prefer Villa By Guests" (Sesuai tambahan 1.png)
- **Referensi**: Screenshot `tambahan 1.png` dari folder Downloads user.
- **Tujuan & Desain**:
  - Menampilkan 5 villa pilihan terbaik dengan tata letak grid asimetris mewah:
    - **Baris Atas (2 Kartu Besar - 50% / 50%)**: Tinggi 270px, menampilkan villa unggulan:
      1. *St. Lau, Luxury 4 Bed Pool Villa in Ubud* (Ubud)
      2. *Iconic Cliff Top Luxury Villa* (Uluwatu)
    - **Baris Bawah (3 Kartu Sedang - 33.3% x 3)**: Tinggi 215px, menampilkan 3 villa populer:
      3. *Villa Habitas – 4BR Pererenan Pool Villa* (Canggu)
      4. *Angkasa Ubud Luxury Villa with Private Pool* (Ubud)
      5. *Villa Samudra – Ocean Breeze 3BR Canggu* (Canggu)
- **Fitur Khusus "Bisa Digeser-geser" (Modular Placement & Responsive Swipe)**:
  1. **Kemudahan Pindah Posisi (Modular Component)**:
     - Dibuat sebagai komponen independen terisolasi: `src/components/TopPreferredVillas.jsx`.
     - Di `src/pages/ExplorePage.jsx`, komponen ini diletakkan pada **Opsi 1** (tepat di bawah `Destinations` dan sebelum katalog filter/pencarian utama).
     - Jika bos meminta dipindahkan (misal ke bawah katalog sebelum Concierge Finder atau di tempat lain), cukup **cut & paste satu baris `<TopPreferredVillas />`** ke posisi baru tanpa perlu mengubah CSS maupun logic lainnya.
  2. **Interaktivitas Mobile (Swipeable Carousel)**:
     - Pada layar ponsel / mobile (`max-width: 768px`), tata letak otomatis berubah menjadi horizontal scroll carousel (`scroll-snap-type: x mandatory`).
     - Pengguna dapat menggeser-geser (*swipe*) kartu dengan jari secara mulus dan nyaman.
  3. **Visual & Interaksi**:
     - Dilengkapi badge lokasi berbendera Indonesia (`Location 🇮🇩 ★ Rating`) di pojok kiri atas.
     - Gradient overlay elegan dengan judul villa dan badge harga `$XXX / night` di pojok kanan bawah.
     - Mengeklik kartu langsung mengarahkan ke halaman detail villa yang bersangkutan.

---

### 5.13. Integrasi Seksi "Experiences" (Sesuai bali-stay-collection.html)
- **Sumber Data & Mockup**: Berkas `C:\Users\CSO KUTA 2\Downloads\bali-stay-collection.html`.
- **Elemen yang Diambil**: Blok `<section class="section alt" id="experiences">
  - Kicker: *"Beyond the stay"*
  - Judul: *"Make Bali part of the villa."*
  - Lead: *"Turn every reservation into a richer guest experience with optional services that can be added before arrival."*
  - 4 Kartu Pengalaman Unggulan:
    1. **Airport Transfer** (*"Private arrival and departure service."*)
    2. **Private Chef** (*"Breakfast, dinner and special occasions."*)
    3. **Wellness** (*"In-villa massage, yoga and spa rituals."*)
    4. **Explore Bali** (*"Drivers, day trips and local experiences."*)
- **Implementasi Komponen**: Dibuat sebagai modul terpisah di `src/components/Experiences.jsx` lengkap dengan JSDoc Bahasa Indonesia.
- **Penempatan**: Diletakkan di `src/pages/ExplorePage.jsx` tepat setelah `<section className="explore-finder-section" id="finder">`, sebelum seksi `<WhyBookDirect />`.
- **Integrasi Navigasi**: Ditambahkan tombol tautan cepat *"Experiences"* pada Navbar desktop dan menu drawer mobile untuk scroll halus langsung ke `#experiences`.
- **Styling & Responsivitas**: Ditambahkan CSS elegan di `src/index.css` dengan tata letak grid responsif (4 kolom desktop, 2 kolom tablet, 1 kolom smartphone), lapisan gradien halus, efek hover modern, dan pembungkus `max-width: 1344px` agar sejajar sempurna.
- **Penyelarasan Ukuran & Posisi Simetris (#finder & #experiences)**:
  - Memperbaiki pembungkus `.explore-finder-inner` dari yang sebelumnya `max-width: 1120px` menjadi `max-width: 1344px; margin: 0 auto; width: 100%` sehingga sisi kirinya tidak lagi menjorok ke kanan dan sejajar 100% dengan judul `Beyond the stay / Make Bali part of the villa.`.
  - Menyeragamkan ukuran tipografi judul (`clamp(24px, 2.6vw, 32px)`), lead description (`max-width: 560px`), margin bawah header (`28px`), serta padding vertikal (`padding: 64px 48px`) pada kedua seksi agar tampak konsisten dan seimbang.

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
- **Prosedur Aman Melakukan Push ke GitHub (Wajib Dipatuhi)**:
  ```powershell
  # Langkah 1: Pastikan build bundling 100% bebas error
  npm run build

  # Langkah 2: Periksa status berkas kerja dan pastikan tidak ada file sampah
  git status

  # Langkah 3: Stage semua perubahan yang sah
  git add .

  # Langkah 4: Buat commit dengan pesan yang deskriptif dan jelas
  git commit -m "feat: [deskripsi fitur atau perbaikan yang dikerjakan]"

  # Langkah 5: Push ke cabang remote utama
  git push origin main
  ```

---

## 7. Hal yang Dapat Dikerjakan Selanjutnya (Backlog / Future Ideas)

1. Menambahkan villa-villa baru ke dalam `airbnbVillas.json` untuk destinasi seperti Canggu, Seminyak, dan Sanur.
2. Integrasi sistem reservasi backend asli (API pembayaran Stripe / Midtrans / WhatsApp Booking Gateway).
3. Penyesuaian mata uang dinamis (toggle IDR / USD).
4. *(Jika nanti diminta user)* Pembuatan modul autentikasi akun tamu dan host.
