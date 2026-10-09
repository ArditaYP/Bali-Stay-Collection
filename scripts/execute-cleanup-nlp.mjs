import fs from 'fs';
import path from 'path';

// Master data copywriting NLP & Persuasive Mental Triggers
const NLP_VILLA_DATA = {
  'villa-habitas': {
    name: 'Villa Habitas – Serene 4BR Lagoon Sanctuary in Pererenan',
    why: "Ulasan tamu terbaik: 'Lokasi sempurna di Pererenan, sangat tenang, dan staf luar biasa hangat—surga tersembunyi yang membuat kami ingin kembali lagi.'",
    shortDesc: 'Bayangkan bangun setiap pagi disambut pemandangan sawah hijau zamrud dan berenang di laguna pribadi yang menenangkan jiwa. Hanya beberapa langkah santai menuju kafe artisan terbaik Pererenan, surga 4 kamar ini menghadirkan ketenangan mutlak dengan sentuhan pelayanan bintang lima.',
    fullDesc: `Bayangkan Anda membuka mata di pagi hari, disambut oleh semilir angin sepoi tropis yang bertiup lembut melintasi hamparan sawah hijau zamrud Pererenan. Di hadapan Anda, laguna renang pribadi berkilau jernih di bawah sinar mentari pagi, mengundang Anda untuk memulai hari dengan kesegaran yang hakiki.

Villa Habitas bukan sekadar tempat menginap—ini adalah tempat perlindungan jiwa di mana setiap detik terasa begitu berharga. Menghadirkan 4 kamar tidur berdesain arsitektur kontemporer yang elegan, kasur king-size yang luar biasa empuk, serta paviliun semi-terbuka yang mengalir alami, villa ini dirancang sempurna untuk menyatukan keluarga dan sahabat dalam kehangatan sejati.

Ulasan tamu terbaik kami:
"Villa ini benar-benar luar biasa! Lokasi sempurna, dekat dengan kafe artisan dan spa, sangat aman dan nyaman untuk keluarga. Staf villa sangat hangat, ramah, dan penuh perhatian membaca setiap kebutuhan kami. Kami tidak sabar untuk kembali lagi!"

Ketika Anda memilih tinggal di Villa Habitas, Anda mengamankan privasi eksklusif tanpa cela di salah satu kawasan paling bergengsi di Bali. Nikmati kemudahan berjalan kaki ke deretan restoran trendi Pererenan, sambil tetap menikmati kedamaian mutlak di sanctuary privat Anda.`,
    setting: ['Rice-field view', 'Walkable to cafés'],
    trips: ['Friends group', 'Family'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Walk to cafés']
  },

  'tranquil-sanctuary-pererenan': {
    name: 'Tranquil Sanctuary – Romantic 1BR Private Haven in Prime Pererenan',
    why: "Ulasan tamu terbaik: 'Sangat damai, indah, dan intim. Oase privat terbaik untuk melepaskan penat berdua di Bali.'",
    shortDesc: 'Rasakan kehangatan sinar matahari pagi yang menembus celah dedaunan tropis saat Anda menikmati kopi di tepi plunge pool pribadi. Sanctuary 1 kamar intim ini dirancang khusus untuk pasangan yang mendambakan privasi tanpa batas dan kedamaian sejati.',
    fullDesc: `Izinkan diri Anda melarikan diri dari kebisingan dunia dan melangkah ke dalam oase romantis yang didedikasikan sepenuhnya untuk Anda berdua. Tersembunyi di sudut paling tenang Pererenan, Tranquil Sanctuary menawarkan kemewahan intim yang jarang ditemukan.

Setiap sudut villa 1 kamar tidur ini memancarkan ketenangan. Dari kolam renang pribadi yang jernih, kamar mandi terbuka bernuansa spa batu alam, hingga kamar tidur berpenyejuk udara dengan linen premium, Anda akan merasakan bagaimana tubuh dan pikiran Anda seketika rileks.

Ulasan tamu terbaik kami:
"Villa yang luar biasa cantik, sangat tenang, bersih, dan komunikasi tim tuan rumah sangat cepat dan membantu. Pengalaman menginap yang benar-benar memulihkan energi kami!"

Hanya beberapa menit berjalan kaki dari kafe artisan dan pantai Pererenan yang memesona, tempat ini adalah kanvas sempurna untuk merajut kenangan cinta terindah Anda di Bali.`,
    setting: ['Garden setting', 'Walkable to cafés'],
    trips: ['Couples', 'Honeymoon', 'Quiet retreat'],
    am: ['Private pool', 'Walk to cafés', 'High-speed WiFi', 'Kitchenette', 'Daily housekeeping']
  },

  'tropical-canggu-villa': {
    name: 'Casa Kameeyla – Vibrant 4BR Tropical Villa in Central Canggu',
    why: "Ulasan tamu terbaik: 'Sangat bersih, luas, dan lokasinya tak tertandingi di pusat Canggu. Pilihan sempurna untuk liburan keluarga.'",
    shortDesc: 'Biarkan diri Anda tenggelam dalam pesona hidup tropis modern di jantung Canggu. Paviliun terbuka yang lapang, kolam renang berkilau, dan 4 kamar tidur mewah menanti Anda dan orang-orang tercinta untuk merayakan momen berharga bersama.',
    fullDesc: `Selamat datang di Casa Kameeyla, di mana energi dinamis Canggu berpadu mesra dengan ketenangan rumah peristirahatan tropis yang privat. Begitu Anda melangkahkan kaki melewati pintu masuk, suasana riang dan elegan seketika menyambut Anda.

Villa 4 kamar tidur ini dirancang untuk menciptakan kebersamaan yang hangat. Kolam renang pribadi yang berkilau diapit dek berjemur yang luas, sementara ruang keluarga terbuka menjadi tempat ideal untuk berbagi tawa, bersantap bersama, atau sekadar bersantai menikmati koktail sore.

Ulasan tamu terbaik kami:
"Casa Kameeyla melampaui seluruh ekspektasi kami! Sangat bersih tanpa cela, lokasinya sangat strategis di pusat Canggu, dan stafnya sangat responsif. Pilihan terbaik untuk liburan rombongan!"

Jadikan liburan Anda di Canggu penuh gaya dan kenyamanan tanpa kompromi. Semua kafe terbaik, butik fashion, dan pantai selancar hanya sepelemparan batu dari sanctuary pribadi Anda.`,
    setting: ['Village setting', 'Walkable to cafés'],
    trips: ['Friends group', 'Family'],
    am: ['Private pool', 'Walk to cafés', 'Full kitchen', 'Air conditioning', 'High-speed WiFi']
  },

  'luxe-beach-villa-seminyak': {
    name: 'Luxe Beach Villa – Chic 3BR Coastal Hideaway Steps from Seminyak Beach',
    why: "Ulasan tamu terbaik: 'Hanya beberapa langkah dari deburan ombak dan beach club ternama, namun di dalam terasa begitu hening dan eksklusif.'",
    shortDesc: 'Dengarkan bisikan deburan ombak pantai Seminyak yang hanya sepelemparan batu dari pintu villa Anda. Perpaduan desain pesisir kontemporer dan kenyamanan mewah yang memastikan liburan tropis Anda terasa istimewa sejak detik pertama.',
    fullDesc: `Bayangkan berjalan kaki tanpa alas kaki di atas pasir pantai Seminyak yang hangat hanya dua menit setelah melangkah keluar dari villa Anda. Luxe Beach Villa menghadirkan impian liburan pesisir Bali yang sesungguhnya.

Menampilkan 3 kamar tidur mewah ber-AC dengan kamar mandi en-suite, ruang keluarga terbuka yang menghadap langsung ke kolam renang pribadi, dan tata cahaya hangat di malam hari, villa ini adalah perpaduan harmonis antara gaya hidup kosmopolitan Seminyak dan ketenangan privat.

Ulasan tamu terbaik kami:
"Lokasi yang luar biasa langka—begitu dekat dengan pantai dan Ku De Ta, namun saat pintu ditutup, suasana di dalam villa begitu damai dan tenang. Pelayanan concierge dan kebersihan kamar tidur sangat mengesankan!"

Rasakan kemewahan berada di pusat magnet kuliner dan hiburan terbaik Bali dengan jaminan ketenangan dan privasi mutlak untuk Anda dan keluarga.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Friends group', 'Beach lovers', 'Family'],
    am: ['Private pool', 'Walk to cafés', 'Near the beach', 'Full kitchen', 'Air conditioning']
  },

  'tropical-elegance-seseh': {
    name: 'Tropical Elegance – Breezy 2BR Ocean-Air Villa by Seseh Beach',
    why: "Ulasan tamu terbaik: 'Kombinasi langka antara kedamaian desa Bali asli dan akses pantai langsung tanpa hiruk-pikuk macet.'",
    shortDesc: 'Hirup segarnya angin laut yang berhembus lembut melintasi teras terbuka villa 2 kamar yang elegan ini. Tersembunyi di desa pesisir Seseh yang asri, nikmati kemewahan ruang privat di mana waktu seakan melambat hanya untuk Anda.',
    fullDesc: `Tinggalkan hiruk-pikuk perkotaan dan temukan kembali kedamaian sejati di pesisir pantai Seseh yang masih alami. Tropical Elegance dirancang bagi jiwa-jiwa yang menghargai ketenangan, keasrian alam, dan sentuhan kemewahan yang bersahaja.

Villa 2 kamar tidur yang menawan ini menangkap semilir angin laut Samudra Hindia sepanjang hari. Kolam renang pribadi yang jernih dikelilingi taman hijau, sementara interior berkonsep terbuka memberikan rasa lapang dan kebebasan yang membebaskan pikiran Anda dari segala beban.

Ulasan tamu terbaik kami:
"Pengalaman menginap yang luar biasa brilian! Berada di desa Seseh yang tenang tanpa kemacetan, hanya beberapa langkah dari pantai berpasir hitam eksotis. Kami merasa sangat segar dan bugar setelah menginap di sini."

Saat Anda memilih Tropical Elegance, Anda memilih untuk merasakan Bali yang autentik, tenang, dan menyegarkan jiwa.`,
    setting: ['Coastal village', 'Walk to the beach'],
    trips: ['Couples', 'Quiet retreat', 'Friends group'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Air conditioning', 'High-speed WiFi']
  },

  'balangan-cliff-villa': {
    name: 'Balangan Cliff Villa – Iconic 5BR Cliff-Edge Oceanfront Estate',
    why: "Ulasan tamu terbaik: 'Panorama matahari terbenam 180° langsung di atas tebing laut lepas yang tiada duanya di seluruh Bali.'",
    shortDesc: 'Tataplah cakrawala Samudra Hindia yang membentang tanpa batas tepat di depan mata Anda. Bertengger megah di atas tebing kapur Balangan, estate 5 kamar tidur ini menyuguhkan kemegahan matahari terbenam spektakuler dan akses pantai eksklusif yang tak terlupakan.',
    fullDesc: `Berdirilah di tepi tebing kapur megah dan rasakan energi magis samudra lepas yang terbentang sejauh mata memandang. Balangan Cliff Villa adalah mahakarya oceanfront yang dirancang bagi mereka yang hanya menginginkan pengalaman terbaik di Bali.

Dengan 5 kamar tidur megah yang menghadap langsung ke lautan biru, kolam renang infinity di bibir tebing, dan akses tangga eksklusif menuju pantai pasir putih di bawahnya, setiap momen di sini terasa seperti lukisan hidup. Saksikan para peselancar menari di atas ombak kelas dunia saat matahari terbenam mewarnai langit dengan palet jingga keemasan.

Ulasan tamu terbaik kami:
"Pemandangannya benar-benar mencengangkan dan tidak ada tandingannya di Bali! Menikmati sarapan sambil menatap lautan lepas dan berjalan langsung ke pantai pribadi membuat seluruh keluarga kami takjub. Tempat yang sangat berkesan!"

Manjakan diri Anda dengan kemewahan tanpa batas dan layanan privat berkelas tinggi di atas puncak tebing paling ikonik di Uluwatu.`,
    setting: ['Ocean view', 'Cliff top', 'Walk to the beach'],
    trips: ['Friends group', 'Family', 'Celebration'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Villa manager', 'Wellness facilities']
  },

  'yellow-moon-uluwatu': {
    name: 'Yellow Moon – Sun-Drenched 3BR Tropical Sanctuary in Uluwatu',
    why: "Ulasan tamu terbaik: 'Tempat paling cantik yang pernah kami tinggali! Rasanya ingin tinggal di sini selamanya bersama keluarga.'",
    shortDesc: 'Tenggelamkan diri Anda di sunken lounge luar ruangan seraya menikmati semilir angin perbukitan Uluwatu. Desain kayu hangat, kolam renang yang mengundang, dan pelayanan tulus staf kami akan membuat Anda jatuh cinta sejak hari pertama.',
    fullDesc: `Ketika keindahan arsitektur tropis bertemu dengan kehangatan matahari Uluwatu, lahirlah Yellow Moon—sebuah sanctuary yang memancarkan aura kebahagiaan dan kenyamanan total.

Setiap sudut villa 3 kamar tidur ini dirancang dengan penuh cinta dan perhatian pada detail. Sunken lounge berdesain unik di samping kolam renang menjadi magnet favorit untuk berkumpul, bercengkerama, dan menikmati minuman dingin di bawah langit tropis yang cerah.

Ulasan tamu terbaik kami:
"Cantik, cantik, sangat cantik! Kami benar-benar jatuh cinta pada tempat ini dan rasanya ingin tinggal di sini selamanya. Tim tuan rumah sangat luar biasa membantu dan ramah. Tempat terbaik di Uluwatu!"

Dekat dengan pantai-pantai selancar terbaik dunia dan kafe-kafe trendi tebing kapur, Yellow Moon adalah rumah kedua impian Anda di Bali.`,
    setting: ['Hillside breezes', 'Walkable to cafés'],
    trips: ['Friends group', 'Surf & Sunsets', 'Family'],
    am: ['Private pool', 'Walk to cafés', 'Ocean breeze', 'Full kitchen', 'High-speed WiFi']
  },

  'st-lau': {
    name: 'St. Lau – Timeless 3BR Jungle Sanctuary in Ubud',
    why: "Ulasan tamu terbaik: 'Suasana hening yang magis di Ubud. Stafnya sangat penuh perhatian, membuat kami merasa dimanjakan seutuhnya.'",
    shortDesc: 'Biarkan ketenangan hutan tropis Ubud memeluk seluruh panca indera Anda. Dengan dek kolam renang privat yang menghadap rerimbunan hijau dan sentuhan arsitektur khas Bali, villa 3 kamar ini adalah tempat di mana pikiran Anda menemukan kedamaian mutlak.',
    fullDesc: `Dengarkan simfoni alam hutan hujan tropis Ubud yang menenangkan saat kabut pagi perlahan menyingkap keindahan lembah hijau di hadapan Anda. St. Lau adalah oasis ketenangan abadi bagi jiwa yang merindukan relaksasi mendalam.

Menghadirkan 3 kamar tidur bernuansa hangat dengan lantai kayu jati dan balkon privat, villa ini menyatu selaras dengan alam sekitarnya. Dek kolam renang pribadi menjadi tempat meditasi sempurna untuk melepas penat seraya menghirup udara pegunungan yang sejuk dan bersih.

Ulasan tamu terbaik kami:
"Pengalaman menginap yang begitu indah dan magis! Terletak di kawasan yang sangat hening dan damai. Staf villa begitu penuh perhatian dan melayani kami dengan tulus dari hati. Kami merasa benar-benar dimanjakan!"

Hanya beberapa menit dari pusat kebudayaan Ubud dan Hutan Monyet yang legendaris, St. Lau memberikan Anda keseimbangan sempurna antara petualangan budaya dan kedamaian retret privat.`,
    setting: ['Garden setting', 'Rice-field view'],
    trips: ['Friends group', 'Family', 'Wellness retreat'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Villa manager', 'Wellness facilities']
  },

  'casa-kaya-bingin': {
    name: 'CASA KĀYA – Bohemian 1BR Design Villa in Bingin',
    why: "Ulasan tamu terbaik: 'Desain Mediterania tropis yang begitu estetik dan romantis, hanya hitungan menit dari pantai Bingin.'",
    shortDesc: 'Temukan pelarian romantis berdesain Mediterania tropis yang memesona di tebing Bingin. Lengkungan arsitektur yang anggun dan kolam renang privat menciptakan suasana intim yang sempurna bagi Anda berdua untuk merajut kenangan manis.',
    fullDesc: `Masuki dunia estetika Mediterania berpadu eksotisme tropis di CASA KĀYA. Terletak di kawasan Bingin yang trendi dan berjiwa bebas, villa 1 kamar tidur ini diciptakan khusus bagi para pencinta desain dan pasangan yang mencari keintiman romantis.

Dinding semen bertekstur hangat, lengkungan kurva arsitektural yang lembut, dan kolam renang pribadi berwarna toska menciptakan latar belakang sempurna untuk liburan santai Anda. Nikmati sore yang tenang di daybed empuk sebelum melangkah santai menuju pantai Bingin untuk menyaksikan matahari terbenam.

Ulasan tamu terbaik kami:
"Kami sangat menyukainya! Suasananya luar biasa romantis dan estetik. Stafnya sangat ramah, komunikatif, dan memastikan seluruh kebutuhan kami terpenuhi dengan sempurna. Destinasi bulan madu impian!"

Hanya beberapa menit dari tangga menuju pantai selancar Bingin dan deretan kafe organik trendi, CASA KĀYA adalah definisi sejati dari liburan berkelas yang santai.`,
    setting: ['Cliffside village', 'Walkable to cafés'],
    trips: ['Couples', 'Honeymoon'],
    am: ['Private pool', 'Walk to cafés', 'High-speed WiFi', 'Kitchenette', 'Air conditioning']
  },

  'luxury-tropical-bingin': {
    name: 'Luxury Tropical Bingin – Elegant 3BR Palm Villa Near Beach',
    why: "Ulasan tamu terbaik: 'Lokasi luar biasa, kasur super nyaman, kolam renang menawan, dan dekat dengan butik serta kafe terbaik.'",
    shortDesc: 'Bayangkan bersantai di tepi kolam yang teduh dinaungi pepohonan palem setelah seharian menikmati pantai Bingin. Villa 3 kamar tidur mewah ini memberikan kenyamanan paripurna bagi keluarga atau sahabat yang menginginkan relaksasi tingkat tinggi.',
    fullDesc: `Rasakan sensasi hidup mewah di pesisir Bingin di mana kenyamanan hotel bintang lima berpadu dengan kehangatan rumah pribadi. Luxury Tropical Bingin adalah perwujudan villa liburan yang diidamkan setiap pelancong cerdas.

Dikelilingi taman palem yang rimbun, villa 3 kamar tidur ini memiliki ruang keluarga berkonsep terbuka dengan furnitur desainer pilihan. Kasur berstandar premium di setiap kamar menjamin kualitas tidur yang nyenyak dan menyegarkan, sementara kolam renang berkilau menjadi pusat keceriaan sepanjang hari.

Ulasan tamu terbaik kami:
"Penginapan yang fantastis! Lokasinya luar biasa dekat dengan kafe-kafe terbaik, restoran enak, dan butik belanja. Kolam renangnya sangat indah dan kasurnya luar biasa empuk. Rombongan kami sangat bahagia menginap di sini!"

Dekat dengan pantai-pantai ikonik Uluwatu dan Padang Padang, villa ini adalah gerbang terbaik Anda menuju gaya hidup pulau dewata yang sesungguhnya.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Family', 'Friends group'],
    am: ['Private pool', 'Walk to cafés', 'Villa manager', 'Full kitchen', 'Air conditioning', 'High-speed WiFi']
  },

  'chic-tropical-bingin': {
    name: 'Chic Tropical Bingin – Polished 2BR Concrete Oasis Near Beach',
    why: "Ulasan tamu terbaik: 'Nilai 10 sempurna! Jauh lebih indah daripada foto, dan pelayanan manajernya benar-benar tiada tanding.'",
    shortDesc: 'Rasakan harmoni antara semen ekspos modern yang elegan dan kehangatan kayu alami di oase 2 kamar tidur ini. Pelayanan manajer villa yang penuh dedikasi memastikan setiap keinginan Anda terpenuhi bahkan sebelum Anda memintanya.',
    fullDesc: `Bersiaplah untuk terpukau oleh keanggunan arsitektur kontemporer di Chic Tropical Bingin. Villa 2 kamar tidur ini membuktikan bahwa kesederhanaan desain semen ekspos yang dipadukan dengan kayu jati alami mampu menghadirkan kemewahan visual yang tiada duanya.

Setiap ruang dirancang dengan kecermatan tinggi untuk kenyamanan maksimal. Dari kamar tidur utama yang megah dengan pencahayaan temaram, kamar mandi semi-terbuka bernuansa zen, hingga kolam renang privat yang menyegarkan, setiap momen di sini terasa istimewa.

Ulasan tamu terbaik kami:
"Nilai 10 dari 10! Villanya jauh lebih spektakuler daripada di foto, dan pelayanan manajer villanya benar-benar luar biasa tak tertandingi. Beliau sangat perhatian pada setiap detail kecil. Tempat yang sempurna!"

Hanya beberapa menit dari pantai selancar Bingin yang terkenal dan titik matahari terbenam paling magis di Bali, Chic Tropical Bingin siap menyambut Anda dengan kehangatan tak tertandingi.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Friends group', 'Couples'],
    am: ['Private pool', 'Walk to cafés', 'Full kitchen', 'Air conditioning', 'High-speed WiFi']
  },

  'five-bedroom-designer-umalas': {
    name: 'Umalas Estate – Grand 5BR Designer Haven Bordering Berawa',
    why: "Ulasan tamu terbaik: 'Kemewahan skala resor pribadi dengan kolam renang 18 meter dan tim staf berdedikasi tinggi.'",
    shortDesc: 'Ketika ukuran dan privasi menjadi prioritas tertinggi Anda, mahakarya arsitektur 5 kamar tidur di perbatasan Umalas dan Berawa ini siap memukau rombongan besar Anda dengan kolam renang 18 meter dan layanan concierge berkelas.',
    fullDesc: `Keluasan ruang, kemewahan tanpa batas, dan privasi paripurna mendefinisikan Umalas Estate. Terletak di perbatasan strategis antara ketenangan pedesaan Umalas dan gemerlap gaya hidup Berawa, properti megah 5 kamar tidur ini adalah standar tertinggi villa grup di Bali.

Di atas lahan estate yang luas terbentang kolam renang pribadi sepanjang 18 meter yang memesona, dikelilingi halaman rumput hijau terawat dan sunken lounge yang megah. Lima kamar tidur utama berukuran luas dilengkapi kamar mandi mewah marmer, menjamin kenyamanan setara suite hotel bintang lima bagi setiap tamu.

Ulasan tamu terbaik kami:
"Mahakarya arsitektur yang luar biasa! Kolam renang 18 meter dan tamannya sangat luas, membuat seluruh rombongan kami betah berhari-hari. Tim staf dan concierge sangat sigap melayani segala kebutuhan kami!"

Nikmati layanan butler dan concierge berdedikasi tinggi yang siap mengatur santap malam chef privat, transportasi eksklusif, dan seluruh kebutuhan liburan Anda dengan kesempurnaan mutlak.`,
    setting: ['Garden estate'],
    trips: ['Large group', 'Celebration', 'Family'],
    am: ['Private pool', 'Dedicated staff', 'Chef on request', 'Villa manager', 'Air conditioning']
  },

  'villa-angkasa': {
    name: 'Villa Angkasa – Majestic 5BR Rainforest Infinity Villa in Ubud',
    why: "Ulasan tamu terbaik: 'Berenang di infinity pool yang seakan melayang di atas kanopi lembah Sungai Ayung adalah pengalaman spiritual.'",
    shortDesc: 'Rasakan sensasi melayang di atas kanopi lembah Sungai Ayung dari infinity pool spektakuler villa 5 kamar ini. Udara pegunungan Ubud yang sejuk dan suara alam yang menenteramkan akan memulihkan energi tubuh dan jiwa Anda secara menyeluruh.',
    fullDesc: `Bayangkan Anda berada di surga tersembunyi di mana infinity pool pribadi Anda membentang dramatis di atas kanopi hijau lembah Sungai Ayung. Villa Angkasa adalah tempat perlindungan megah bagi mereka yang mencari keagungan alam Ubud dalam balutan kemewahan modern.

Dirancang untuk rombongan besar dan keluarga, villa 5 kamar tidur ini memiliki paviliun ruang tamu dan ruang makan terbuka yang luas dengan tiang-tiang kayu ulin kokoh. Pemandangan lembah sungai yang spektakuler dapat dinikmati dari setiap kamar, menghadirkan kedamaian mendalam setiap kali Anda membuka mata.

Ulasan tamu terbaik kami:
"Rumah yang luar biasa indah persis seperti di foto! Pemandangan lembah Sungai Ayung yang spektakuler dan keramahan staf lokal kami membuat liburan keluarga kami di Ubud menjadi pengalaman yang tak terlupakan seumur hidup."

Manjakan diri Anda dengan layanan spa in-villa, sarapan lezat yang disiapkan hangat setiap pagi, dan kedamaian spiritual yang hanya bisa ditemukan di dataran tinggi Ubud.`,
    setting: ['Rice-field view'],
    trips: ['Friends group', 'Family', 'Celebration'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Wellness facilities']
  },

  'villa-imala': {
    name: 'Villa Imala – Ultra-Luxury 6BR Ocean-View Spa & Gym Estate in Uluwatu',
    why: "Ulasan tamu terbaik: 'Villa termewah di Uluwatu! Kolam 80m², gym kaca panorama laut, dan ruang spa privat yang tak tertandingi.'",
    shortDesc: 'Kemewahan tanpa batas menanti Anda di estate 6 kamar prestisius ini. Mulai hari Anda dengan sesi kebugaran di gym berdinding kaca panorama samudra, manjakan diri di ruang spa privat, dan saksikan senja keemasan dari kolam renang 80m² Anda.',
    fullDesc: `Selamat datang di puncak kemewahan Uluwatu. Villa Imala bukan sekadar villa mewah biasa—ini adalah resor privat pribadi bintang lima dengan fasilitas terlengkap di pesisir selatan Bali.

Bertengger anggun menghadap Samudra Hindia yang biru pekat, properti spektakuler 6 kamar tidur ini memiliki kolam renang raksasa seluas 80 meter persegi, rooftop terrace dengan daybed empuk untuk menikmati sunset, gym berdinding kaca dengan peralatan lengkap berpanorama laut, serta ruang spa privat khusus untuk perawatan tubuh Anda.

Ulasan tamu terbaik kami:
"Villa Imala tidak ada tandingannya di seluruh Uluwatu! Kolam 80m², gym panorama laut, dan pemandangan rooftop benar-benar memukau seluruh rombongan kami. Pelayanan stafnya berkelas dunia dan memenuhi setiap permintaan kami dengan sempurna!"

Hanya beberapa menit dari Savaya Beach Club dan Pantai Melasti, Villa Imala menawarkan privasi absolut, prestise tanpa tanding, dan pengalaman liburan yang akan dikenang selamanya.`,
    setting: ['Ocean view', 'Cliff top'],
    trips: ['Friends group', 'Family', 'Celebration', 'Wellness retreat'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Wellness facilities', 'Villa manager']
  },

  'villa-mahina': {
    name: 'Villa Mahina – Contemporary 3BR Luxury Villa 400m from Berawa Beach',
    why: "Ulasan tamu terbaik: 'Hanya 400 meter jalan kaki ke Pantai Berawa dan Finns Club, namun di dalam villa sangat tenang dan privat berkat jendela kedap suara.'",
    shortDesc: 'Nikmati kemewahan berada di pusat gaya hidup Berawa tanpa mengorbankan ketenangan tidur Anda. Dilengkapi jendela kedap suara total, sunken lounge elegan, dan kolam renang privat, villa 3 kamar ini adalah santuari modern terbaik Anda.',
    fullDesc: `Berada di salah satu lokasi paling dicari di seluruh Bali, Villa Mahina menawarkan kemewahan langka: Anda hanya 400 meter berjalan kaki dari Pantai Berawa dan Finns Beach Club yang legendaris, namun di dalam villa Anda menikmati keheningan total berkat teknologi jendela kedap suara ganda.

Villa 3 kamar tidur kontemporer ini memiliki sunken lounge modern yang elegan menghadap langsung ke kolam renang pribadi. Setiap kamar tidur dirancang dengan kenyamanan kelas atas, dilengkapi kasur empuk, pendingin ruangan presisi, dan kamar mandi en-suite bergaya hotel butik.

Ulasan tamu terbaik kami:
"Pengalaman menginap yang luar biasa memuaskan! Lokasi di Berawa benar-benar tak tertandingi—bisa jalan kaki ke pantai dan kafe terbaik. Kolam renang privatnya sangat bersih dan suasananya sangat tenang dan aman."

Rasakan perpaduan sempurna antara kehidupan pantai yang berkelas dan privasi rumah mewah di jantung Berawa.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Friends group', 'Family', 'Celebration'],
    am: ['Private pool', 'Walk to cafés', 'Near the beach', 'Air conditioning', 'High-speed WiFi', 'Daily housekeeping']
  },

  'khaleela-villas': {
    name: 'Khaleela Villas – Desert-Inspired 2BR Sunlit Oasis in Canggu',
    why: "Ulasan tamu terbaik: 'Estetika gurun yang eksotis dan menenangkan di tengah Canggu. Kamar mandi terbukanya sangat luar biasa!'",
    shortDesc: 'Biarkan diri Anda terhanyut dalam kehangatan nuansa gurun pasir yang eksotis di jantung Canggu. Nikmati kesegaran berenang di bawah sinar mentari tropis dan sensasi mandi terbuka bernuansa spa alami yang merelaksasi setiap jengkal tubuh Anda.',
    fullDesc: `Temukan pelarian eksotis bernuansa padang pasir yang menawan di Khaleela Villas. Membawa inspirasi oasis gurun ke tengah semaraknya Canggu, villa 2 kamar tidur satu lantai ini menawarkan ketenangan visual yang jarang ditemui di tempat lain.

Dinding bernuansa terakota hangat dan lengkungan kurva khas timur tengah berpadu anggun dengan tanaman kaktus dan kolam renang pribadi yang jernih. Kamar mandi terbuka tropis dengan shower pancuran batu alam menghadirkan ritual mandi yang menyegarkan jiwa di bawah langit terbuka Bali.

Ulasan tamu terbaik kami:
"Desainnya luar biasa memukau dan sangat menenangkan! Konsep oasis gurunnya sangat unik, stafnya sangat ramah dan sigap, dan lokasinya dekat dengan kafe-kafe favorit di Canggu. Liburan yang sangat menyenangkan!"

Hanya beberapa menit berkendara dari pantai selancar Batu Bolong dan Echo Beach, Khaleela Villas adalah tempat di mana estetika fotografi dan kenyamanan relaksasi berpadu sempurna.`,
    setting: ['Garden setting', 'Walkable to cafés'],
    trips: ['Couples', 'Honeymoon', 'Friends group'],
    am: ['Private pool', 'Walk to cafés', 'Daily staff', 'Air conditioning', 'High-speed WiFi', 'Daily housekeeping']
  },

  'beyond-the-palms': {
    name: 'Beyond the Palms – High-Tech 4BR Luxury Villa with Rooftop Jacuzzi',
    why: "Ulasan tamu terbaik: 'Villa berteknologi tercanggih di Bali! Rooftop jacuzzi saat sunset dan bioskop outdoor menjadikannya liburan impian.'",
    shortDesc: 'Rasakan masa depan liburan mewah di mana kecanggihan teknologi berpadu dengan kemegahan tropis. Bersantailah di rooftop jacuzzi, nikmati bioskop proyektor luar ruangan, dan dengarkan alunan musik jernih dari sistem suara Sonos di seluruh sudut villa.',
    fullDesc: `Selamat datang di Beyond the Palms, villa 4 kamar tidur berteknologi tinggi paling spektakuler di Canggu. Dirancang bagi pelancong modern yang menginginkan hiburan kelas atas, privasi total, dan kemewahan arsitektur tanpa kompromi.

Masuki gerbang villa dan Anda langsung disambut taman tropis megah dengan kolam renang seluas 45 meter persegi. Di dalam, nikmati TV 4K Smart 86 inci dengan sound system Sonos, dapur gourmet lengkap dengan peralatan SMEG, dan proyektor bioskop luar ruangan. Puncaknya adalah rooftop terrace yang dilengkapi jacuzzi hangat dan dek yoga dengan panorama matahari terbenam yang memukau.

Ulasan tamu terbaik kami:
"Villa terbaik yang pernah kami sewa di Bali! Hiburannya luar biasa lengkap—dari jacuzzi di rooftop, sound system Sonos di setiap ruangan, hingga bioskop outdoor. Staf dan keamanannya sangat profesional. Pengalaman yang tak terlupakan!"

Amankan pengalaman liburan paling canggih dan menyenangkan di Bali sekarang juga bersama keluarga dan sahabat terbaik Anda.`,
    setting: ['Garden setting'],
    trips: ['Friends group', 'Celebration', 'Family'],
    am: ['Private pool', 'Wellness facilities', 'Villa manager', 'Daily staff', 'Air conditioning', 'High-speed WiFi']
  },

  'villa-akar': {
    name: 'Villa Akar – Guest Favorite 4BR Architectural Hideaway in Berawa',
    why: "Ulasan tamu terbaik: 'Predikat Guest Favorite 5.0 sempurna! Ruang keluarga fleksibel ber-AC dan layanan staf yang membuat kami merasa seperti raja.'",
    shortDesc: 'Masuki mahakarya desain kontemporer berpredikat Guest Favorite bintang 5.0 di Berawa. Fleksibilitas ruang keluarga ber-AC yang dapat dibuka menyatu dengan kolam renang asri memberikan kebebasan dan kenyamanan tak tertandingi bagi seluruh keluarga.',
    fullDesc: `Raih kedamaian batin di Villa Akar, sebuah karya arsitektur kontemporer oleh Teduh yang meraih predikat prestisius Guest Favorite dengan ulasan sempurna bintang 5.0 di Airbnb.

Terletak di salah satu kantong paling tenang di Berawa, villa 4 kamar tidur ini menawarkan fleksibilitas luar biasa: ruang keluarga dan ruang makan ber-AC dapat ditutup rapat untuk kenyamanan sejuk, atau dibuka lebar-lebar untuk menyatu dengan angin sepoi tropis dan kolam renang asri. Empat kamar tidur utama en-suite menjamin privasi maksimal bagi seluruh anggota keluarga.

Ulasan tamu terbaik kami:
"Pantas saja mendapat predikat Guest Favorite 5.0! Villanya sangat terawat, pencahayaan alaminya luar biasa, dan tim staf selalu hadir dengan senyum hangat membantu segala kebutuhan kami. Dekat pantai dan kafe-kafe lezat!"

Izinkan diri Anda merasakan standar baru kenyamanan liburan di Berawa bersama tim pelayanan yang berdedikasi tinggi.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Friends group', 'Family'],
    am: ['Private pool', 'Walk to cafés', 'Villa manager', 'Daily staff', 'Air conditioning', 'High-speed WiFi']
  },

  'villa-golden': {
    name: 'Villa Golden – Modern Chic 2BR Villa Opposite FINNS Club',
    why: "Ulasan tamu terbaik: 'Tepat di seberang FINNS Recreation Club, desain chic yang sangat instagramable, dan pelayanan harian yang sempurna.'",
    shortDesc: 'Kemudahan akses gaya hidup premium Berawa berada tepat di depan pintu Anda. Berada persis di seberang FINNS Recreation Club, villa 2 kamar modern chic ini menyuguhkan interior menawan dan kolam renang privat yang memanjakan liburan Anda.',
    fullDesc: `Nikmati kenyamanan tinggal di titik nol gaya hidup Berawa. Villa Golden terletak tepat di seberang FINNS Recreation Club, memberikan Anda akses instan ke arena olahraga terbaik, kafe kelas dunia, waterpark, dan lapangan tenis, sembari tetap menikmati privasi villa pribadi Anda.

Villa 2 kamar tidur bergaya modern chic ini memancarkan pesona interior mewah dengan sentuhan kayu hangat dan marmer elegan. Kedua kamar tidur memiliki kamar mandi en-suite berkelas, dan ruang tamu terbuka mengarah langsung ke kolam renang pribadi yang jernih.

Ulasan tamu terbaik kami:
"Lokasi yang sangat sempurna di Berawa! Tinggal menyeberang jalan sudah sampai di FINNS Club, sangat dekat dengan kafe-kafe trendi. Villanya bersih berkilau, kolam renangnya sejuk, dan stafnya sangat membantu!"

Pilihan ideal bagi pasangan atau sahabat yang ingin menikmati dinamika terbaik Berawa tanpa repot bermacet-macetan.`,
    setting: ['Walkable to cafés'],
    trips: ['Couples', 'Friends group'],
    am: ['Private pool', 'Walk to cafés', 'Air conditioning', 'High-speed WiFi', 'Daily housekeeping']
  },

  'villa-surga': {
    name: 'Villa Surga – Serene 4BR Valley-View Sanctuary in Ubud',
    why: "Ulasan tamu terbaik: 'Ketenangan sejati di lembah tropis Ubud. Pemandangan hijau sejauh mata memandang dan staf yang melayani dari hati.'",
    shortDesc: 'Sesuai namanya, temukan serpihan surga tersembunyi di kawasan asri Ubud. Infinity pool pribadi yang menghadap lembah tropis rimbun dan keramahan staf lokal kami akan mengantarkan Anda pada dimensi relaksasi yang belum pernah Anda rasakan sebelumnya.',
    fullDesc: `Ketika Anda melangkahkan kaki melewati gapura batu tradisional Bali di Villa Surga, Anda seketika tahu bahwa Anda telah tiba di tempat yang istimewa. Sesuai namanya, villa ini adalah surga privat di mana keheningan alam Ubud menjadi pelindung Anda dari kepenatan dunia.

Menghadirkan 4 kamar tidur luas dengan kamar mandi terbuka en-suite, villa ini dirancang untuk menyerap keindahan alam sekitarnya. Infinity pool pribadi membentang menghadap lembah hijau tropis yang rimbun, menjadi tempat terbaik untuk bermeditasi, membaca buku, atau sekadar berendam menikmati udara segar pegunungan.

Ulasan tamu terbaik kami:
"Ketenangan yang sesungguhnya di Ubud! Pemandangan lembah hijaunya begitu menenangkan mata dan jiwa. Seluruh staf melayani kami dengan tulus dari hati, menyiapkan sarapan lezat, dan menjaga villa tetap bersih berkilau. Liburan yang sangat damai!"

Rasakan keajaiban spiritual dan kenyamanan total di jantung budaya Bali bersama orang-orang tercinta Anda.`,
    setting: ['Rice-field view'],
    trips: ['Family', 'Wellness retreat', 'Friends group'],
    am: ['Private pool', 'Chef on request', 'Wellness facilities', 'Daily staff', 'Air conditioning', 'High-speed WiFi']
  },

  'house-terra': {
    name: 'House Terra – Biombo-Designed 5BR Tropical Pool Estate in Pererenan',
    why: "Ulasan tamu terbaik: 'Mahakarya arsitektur Biombo dengan nilai 10 sempurna! Kolam renang spektakuler, piano klasik, dan privasi mutlak di Pererenan.'",
    shortDesc: 'Bayangkan melangkah masuk ke dalam mahakarya arsitektur tropis Biombo di mana kemewahan modern melebur sempurna dengan alam Pererenan. Dilengkapi 5 kamar tidur mewah, piano klasik, kolam renang luas, dan lounge outdoor, nikmati privasi eksklusif tanpa cela.',
    fullDesc: `Bayangkan Anda melangkah masuk ke dalam mahakarya arsitektur tropis di mana batas antara alam dan kemewahan modern melebur sempurna. Dirancang oleh Biombo Architects yang tersohor, House Terra bukan sekadar villa—ini adalah tempat perlindungan pribadi Anda di Pererenan yang dirancang untuk mengembalikan ketenangan batin Anda.

Begitu Anda menginjakkan kaki di atas lantai batu alam yang sejuk, gemericik air kolam renang pribadi dan aroma frangipani seketika menyambut indera Anda, menghapus segala penat perjalanan. Dengan 5 kamar tidur en-suite yang luas, ruang santai beralaskan kayu jati hangat, piano klasik, dan area lounge outdoor yang teduh, setiap sudut dirancang untuk menciptakan momen tak terlupakan bersama keluarga dan sahabat tercinta.

Ulasan tamu terbaik kami:
"Sebuah mahakarya arsitektur di Pererenan di mana setiap detail memancarkan kemewahan yang effortless dan kedamaian total. Kolam renang, ruang terbuka yang lapang, dan kehangatan tim staf membuat liburan Bali kami benar-benar sempurna. Nilai 10 dari 10!"

Ketika Anda memilih tinggal di House Terra, Anda mengamankan privasi eksklusif di lokasi paling diminati di Pererenan—hanya beberapa menit berjalan kaki dari kafe artisan terbaik dan pesisir pantai eksotis, namun terisolasi damai dari kebisingan dunia luar.`,
    setting: ['Garden setting', 'Walkable to cafés'],
    trips: ['Friends group', 'Family', 'Celebration'],
    am: ['Private pool', 'Wellness facilities', 'Villa manager', 'Daily staff', 'Air conditioning', 'High-speed WiFi']
  },

  'villa-samudra-canggu': {
    name: 'Villa Samudra – Bohemian Tropical Luxury in Echo Beach Canggu',
    why: "Ulasan tamu terbaik: 'Hanya beberapa langkah dari ombak Echo Beach, desain bohemian mewah yang sangat menenangkan jiwa.'",
    shortDesc: 'Rasakan ritme santai pesisir Canggu dalam pelukan kemewahan bohemian tropis. Kolam renang privat yang asri dan kamar tidur yang luas siap menyambut kepulangan Anda setelah menikmati sunset di pantai.',
    fullDesc: `Temukan harmoni antara gaya hidup selancar berjiwa bebas dan kenyamanan resor mewah di Villa Samudra. Terletak di kawasan prestisius Echo Beach Canggu, villa ini menghadirkan estetika bohemian modern dengan furnitur rotan dan kayu alami pilihan. Kolam renang pribadi yang dikelilingi tanaman tropis rimbun menjamin relaksasi tanpa batas.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Friends group', 'Beach lovers'],
    am: ['Private pool', 'Walk to cafés', 'Near the beach', 'Daily staff', 'Air conditioning', 'High-speed WiFi']
  },

  'villa-kayu-raja-seminyak': {
    name: 'Villa Kayu Raja – Elegant Tropical Oasis in Petitenget Seminyak',
    why: "Ulasan tamu terbaik: 'Dekat dengan Ku De Ta dan pantai Petitenget, namun di dalam villa terasa begitu hening dan damai.'",
    shortDesc: 'Temukan oase ketenangan di tengah kawasan paling bergengsi Seminyak. Mandi berendam di bathtub batu alam outdoor di bawah langit berbintang dan nikmati kemewahan privasi di pusat denyut kuliner Bali.',
    fullDesc: `Terletak di jantung kawasan kuliner dan butik Petitenget Seminyak, Villa Kayu Raja menghadirkan kemewahan arsitektur kayu jati tradisional berpadu fasilitas modern. Bathtub batu alam terbuka dan kolam renang privat menciptakan sanctuary sempurna untuk melepas penat di Seminyak.`,
    setting: ['Walk to the beach', 'Walkable to cafés'],
    trips: ['Friends group', 'Family'],
    am: ['Private pool', 'Walk to cafés', 'Daily staff', 'Chef on request', 'Air conditioning', 'High-speed WiFi']
  },

  'villa-cendana-seminyak': {
    name: 'Villa Cendana – Romantic Honeymoon Hideaway in Seminyak',
    why: "Ulasan tamu terbaik: 'Bulan madu kami di sini sangat magis! Floating breakfast dan kolam renang privat yang tak terlupakan.'",
    shortDesc: 'Ciptakan momen romantis paling berkesan dalam hidup Anda di sanctuary bulan madu privat ini. Dikelilingi taman tropis yang rimbun dan suasana intim, cinta Anda akan mekar lebih indah di Seminyak.',
    fullDesc: `Diciptakan khusus untuk merayakan cinta, Villa Cendana adalah tempat perlindungan romantis berfasilitas lengkap di Seminyak. Plunge pool privat, floating breakfast yang memanjakan, dan kamar tidur mewah berkanopi menghadirkan atmosfer bulan madu yang magis dan tak terlupakan.`,
    setting: ['Walkable to cafés'],
    trips: ['Couples', 'Honeymoon'],
    am: ['Private pool', 'Walk to cafés', 'Daily housekeeping', 'Air conditioning', 'High-speed WiFi']
  },

  'cliffside-panorama-uluwatu': {
    name: 'Cliffside Panorama – Oceanfront Infinity Villa in Uluwatu',
    why: "Ulasan tamu terbaik: 'Tak ada kata yang sanggup melukiskan keindahan sunset dari infinity pool ini. Menatap ombak Bingin sambil menikmati koktail sungguh magis.'",
    shortDesc: 'Biarkan pesona lautan biru lepas Uluwatu menghipnotis hari-hari Anda. Duduklah di tepi infinity pool saat matahari perlahan tenggelam, dan nikmati kemewahan hakiki yang hanya dimiliki segelintir orang di dunia.',
    fullDesc: `Bertengger di bibir tebing Uluwatu yang legendaris, Cliffside Panorama menawarkan pemandangan samudra tanpa batas 180 derajat. Saksikan para peselancar dunia menari di atas ombak dari kenyamanan infinity pool privat Anda, ditemani koktail segar saat langit senja Bali menyala keemasan.`,
    setting: ['Ocean view', 'Cliff top'],
    trips: ['Friends group', 'Celebration', 'Couples'],
    am: ['Private pool', 'Daily staff', 'Chef on request', 'Villa manager', 'Wellness facilities']
  },

  'mandapa-jungle-villa': {
    name: 'Mandapa Jungle Villa – Eco-Luxury Bamboo Sanctuary in Sayan Ubud',
    why: "Ulasan tamu terbaik: 'Tidur ditemani suara gemericik Sungai Ayung di mahakarya bambu ini adalah retret spiritual yang tak terlupakan.'",
    shortDesc: 'Rasakan keselarasan sejati dengan alam di mahakarya arsitektur bambu ramah lingkungan yang melayang di atas lembah Sungai Ayung. Hirup kesegaran udara Ubud dan temukan kembali kedamaian batin Anda yang paling murni.',
    fullDesc: `Karya seni arsitektur bambu berkelanjutan yang memukau di atas punggung bukit Sayan, Ubud. Melayang di atas lembah Sungai Ayung, Mandapa Jungle Villa mengajak Anda merasakan kemewahan ramah lingkungan yang memulihkan raga dan jiwa di tengah pelukan hutan tropis Bali.`,
    setting: ['Rice-field view'],
    trips: ['Nature getaway', 'Wellness retreat', 'Couples'],
    am: ['Private pool', 'Wellness facilities', 'Daily staff', 'Air conditioning', 'High-speed WiFi']
  }
};

/** Pemetaan alias ID untuk airbnbVillas.json */
const AIRBNB_ALIAS_LOOKUP = {
  'st-lau-ubud': 'st-lau',
  'iconic-cliff-top-villa': 'balangan-cliff-villa',
  'angkasa-ubud': 'villa-angkasa',
  'the-palms-villa-canggu': 'villa-habitas'
};

/** Data Airbnb untuk House Terra */
const houseTerraAirbnb = {
  id: "house-terra",
  airbnbId: "1181432015759859101",
  airbnbUrl: "https://www.airbnb.com/rooms/1181432015759859101",
  name: "House Terra – Biombo-Designed 5BR Tropical Pool Estate in Pererenan",
  location: "Pererenan, Canggu",
  guests: 10,
  bedroomsCount: 5,
  beds: 10,
  bathrooms: 5.5,
  rating: 5.0,
  reviewsCount: 18,
  isGuestFavorite: true,
  ratingsBreakdown: {
    cleanliness: 5.0,
    accuracy: 5.0,
    checkIn: 5.0,
    communication: 5.0,
    location: 4.95,
    value: 4.95
  },
  images: [
    "/airbnb/house-terra/photos/photo-01.jpg",
    "/airbnb/house-terra/photos/photo-02.jpg",
    "/airbnb/house-terra/photos/photo-03.jpg",
    "/airbnb/house-terra/photos/photo-04.jpg",
    "/airbnb/house-terra/photos/photo-05.jpg",
    "/airbnb/house-terra/photos/photo-06.jpg",
    "/airbnb/house-terra/photos/photo-07.jpg",
    "/airbnb/house-terra/photos/photo-08.jpg"
  ],
  photoCaptions: [
    "Kolam renang pribadi luas yang dikelilingi taman tropis rimbun karya Biombo Architects",
    "Ruang keluarga terbuka bergaya tropis kontemporer dengan piano dan sofa empuk",
    "Kamar tidur utama dengan kasur king-size mewah dan pencahayaan hangat menenangkan",
    "Kamar mandi en-suite terbuka bernuansa spa batu alam",
    "Area makan semi-terbuka dengan pemandangan langsung ke kolam renang",
    "Dapur modern berperalatan lengkap untuk santap malam bersama keluarga",
    "Kamar tidur kedua yang elegan dengan akses langsung ke teras taman",
    "Area santai luar ruangan yang tenang untuk menikmati semilir angin sore Pererenan"
  ],
  shortDesc: NLP_VILLA_DATA['house-terra'].shortDesc,
  description: NLP_VILLA_DATA['house-terra'].shortDesc,
  fullDesc: NLP_VILLA_DATA['house-terra'].fullDesc,
  reviews: [
    {
      author: "Charlotte",
      date: "September 2026",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: "An architectural masterpiece in Pererenan! Every detail breathes effortless luxury and total peace. The pool, the spacious open layout, and the attentive team made our family holiday completely magical. We did not want to leave!"
    },
    {
      author: "Maximilian",
      date: "August 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment: "The best villa stay we have ever had in Bali. The design by Biombo is world-class, the beds are heavenly, and the location is quiet yet close to top Pererenan cafés. Truly a 10 out of 10 experience."
    }
  ]
};

/**
 * Memperbarui berkas airbnbVillas.json dengan menambahkan House Terra dan mengaplikasikan copywriting NLP
 * @returns {void}
 */
function updateAirbnbVillasJson() {
  const filePath = path.resolve('src/data/airbnbVillas.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  let villas = JSON.parse(raw);

  // 1. Tambahkan House Terra jika belum ada
  const hasHouseTerra = villas.some(v => v.id === 'house-terra');
  if (!hasHouseTerra) {
    villas.push(houseTerraAirbnb);
    console.log('✓ Menambahkan house-terra ke airbnbVillas.json');
  }

  // 2. Terapkan copywriting NLP & Mental Trigger ke semua villa
  villas = villas.map(villa => {
    const nlpKey = AIRBNB_ALIAS_LOOKUP[villa.id] || villa.id;
    const nlp = NLP_VILLA_DATA[nlpKey];
    if (!nlp) return villa;

    return {
      ...villa,
      name: nlp.name || villa.name,
      shortDesc: nlp.shortDesc || villa.shortDesc,
      description: nlp.shortDesc || villa.description,
      fullDesc: nlp.fullDesc || villa.fullDesc
    };
  });

  fs.writeFileSync(filePath, JSON.stringify(villas, null, 2), 'utf8');
  console.log(`✓ Berhasil memperbarui airbnbVillas.json (${villas.length} entri dengan NLP copy)`);
}

/**
 * Memperbarui berkas villasData.js dengan menambahkan House Terra ke VILLA_DETAILS dan menyinkronkan copywriting NLP
 * @returns {void}
 */
function updateVillasDataJs() {
  const filePath = path.resolve('src/data/villasData.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Tambahkan entri house-terra jika belum ada di VILLA_DETAILS
  if (!content.includes("'house-terra': {")) {
    const houseTerraEntry = `  'house-terra': {
    category: 'Luxury',
    price: 550, // Patokan menengah (USD / malam)
    cleaningFee: 50,
    freeCancel: true,
    cardBg: '#CBB9C9',
    bookedDays: [4, 5, 18, 19],
    address: 'Pererenan, Canggu, Badung, Bali',
    shortDesc: '${NLP_VILLA_DATA['house-terra'].shortDesc.replace(/'/g, "\\'")}',
    description: '${NLP_VILLA_DATA['house-terra'].shortDesc.replace(/'/g, "\\'")}',
    amenities: ['Private pool', 'Dedicated staff', 'Chef on request', 'Villa manager', 'Air conditioning', 'High-speed WiFi']
  },
`;
    content = content.replace("const VILLA_DETAILS = {", `const VILLA_DETAILS = {\n${houseTerraEntry}`);
    console.log('✓ Menambahkan house-terra ke VILLA_DETAILS di villasData.js');
  }

  // 2. Perbarui shortDesc dan description untuk setiap villa yang ada di VILLA_DETAILS
  Object.keys(NLP_VILLA_DATA).forEach(id => {
    const nlp = NLP_VILLA_DATA[id];
    const targetKeys = [id];
    if (id === 'st-lau') targetKeys.push('st-lau-ubud');
    if (id === 'balangan-cliff-villa') targetKeys.push('iconic-cliff-top-villa');
    if (id === 'villa-angkasa') targetKeys.push('angkasa-ubud');
    if (id === 'villa-habitas') targetKeys.push('the-palms-villa-canggu');

    targetKeys.forEach(key => {
      const regexShort = new RegExp(`('${key}':\\s*{[\\s\\S]*?shortDesc:\\s*')([\\s\\S]*?)(')`, 'm');
      if (regexShort.test(content)) {
        content = content.replace(regexShort, `$1${nlp.shortDesc.replace(/'/g, "\\'")}$3`);
      }
    });
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Berhasil menyinkronkan villasData.js dengan copywriting NLP');
}

/**
 * Memperbarui bscVillasData.js:
 * 1. Menghapus seluruh 40+ mock villa (yang tidak punya listing Airbnb asli).
 * 2. Hanya menyisakan 26 villa autentik dengan data Airbnb nyata.
 * 3. Menyinkronkan headline (name), deskripsi (desc), kutipan ulasan (why), dan foto House Terra.
 * 4. Memperbarui AIRBNB_ONLY_VILLA_IDS dan ACTIVE_AIRBNB_VILLA_IDS.
 * @returns {void}
 */
function updateBscVillasDataJs() {
  const filePath = path.resolve('src/data/bscVillasData.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Daftar 26 ID villa autentik Airbnb yang dipertahankan
  const AUTHENTIC_AIRBNB_IDS = [
    'villa-habitas',
    'tranquil-sanctuary-pererenan',
    'tropical-canggu-villa',
    'luxe-beach-villa-seminyak',
    'tropical-elegance-seseh',
    'balangan-cliff-villa',
    'yellow-moon-uluwatu',
    'st-lau',
    'casa-kaya-bingin',
    'luxury-tropical-bingin',
    'chic-tropical-bingin',
    'five-bedroom-designer-umalas',
    'villa-angkasa',
    'villa-imala',
    'villa-mahina',
    'khaleela-villas',
    'beyond-the-palms',
    'villa-akar',
    'villa-golden',
    'villa-surga',
    'house-terra',
    'villa-samudra-canggu',
    'villa-kayu-raja-seminyak',
    'villa-cendana-seminyak',
    'cliffside-panorama-uluwatu',
    'mandapa-jungle-villa'
  ];

  // 1. Ekstrak objek BSC_VILLAS dari string file
  const bscVillasMatch = content.match(/export const BSC_VILLAS = (\[[\s\S]*\]);/);
  if (!bscVillasMatch) {
    console.error('Gagal menemukan BSC_VILLAS di bscVillasData.js');
    return;
  }

  // Gunakan Function untuk mengevaluasi array objek BSC_VILLAS
  const evalFn = new Function(`return ${bscVillasMatch[1]}`);
  const currentBscVillas = evalFn();

  // 2. Filter HANYA villa autentik dan urutkan sesuai AUTHENTIC_AIRBNB_IDS
  const filteredVillas = [];
  const villaMap = new Map();
  currentBscVillas.forEach(v => {
    if (AUTHENTIC_AIRBNB_IDS.includes(v.id)) {
      villaMap.set(v.id, v);
    }
  });

  AUTHENTIC_AIRBNB_IDS.forEach(id => {
    const villa = villaMap.get(id);
    if (!villa) return;

    const nlp = NLP_VILLA_DATA[id];
    const updatedVilla = { ...villa };

    // Terapkan copywriting NLP & mental triggers
    if (nlp) {
      updatedVilla.name = nlp.name;
      updatedVilla.desc = nlp.shortDesc;
      updatedVilla.why = nlp.why;
      if (nlp.setting) updatedVilla.setting = nlp.setting;
      if (nlp.trips) updatedVilla.trips = nlp.trips;
      if (nlp.am) updatedVilla.am = nlp.am;
    }

    // Koreksi khusus House Terra: foto asli
    if (id === 'house-terra') {
      updatedVilla.img = '/airbnb/house-terra/photos/photo-01.jpg';
      updatedVilla.images = [
        '/airbnb/house-terra/photos/photo-01.jpg',
        '/airbnb/house-terra/photos/photo-02.jpg',
        '/airbnb/house-terra/photos/photo-03.jpg',
        '/airbnb/house-terra/photos/photo-04.jpg',
        '/airbnb/house-terra/photos/photo-05.jpg',
        '/airbnb/house-terra/photos/photo-06.jpg',
        '/airbnb/house-terra/photos/photo-07.jpg',
        '/airbnb/house-terra/photos/photo-08.jpg'
      ];
      updatedVilla.price = 550;
      updatedVilla.beds = 5;
      updatedVilla.baths = 5;
      updatedVilla.guests = 10;
    }

    filteredVillas.push(updatedVilla);
  });

  console.log(`✓ Menyaring BSC_VILLAS dari ${currentBscVillas.length} menjadi ${filteredVillas.length} villa autentik`);

  // 3. Format kembali array menjadi string rapi
  const newBscVillasJson = JSON.stringify(filteredVillas, null, 2);

  // 4. Update AIRBNB_ONLY_VILLA_IDS dan ACTIVE_AIRBNB_VILLA_IDS di content
  const idArrayStr = JSON.stringify(AUTHENTIC_AIRBNB_IDS, null, 2);
  content = content.replace(
    /export const AIRBNB_ONLY_VILLA_IDS = \[[\s\S]*?\];/,
    `export const AIRBNB_ONLY_VILLA_IDS = ${idArrayStr};`
  );
  content = content.replace(
    /export const ACTIVE_AIRBNB_VILLA_IDS = \[[\s\S]*?\];/,
    `export const ACTIVE_AIRBNB_VILLA_IDS = [...AIRBNB_ONLY_VILLA_IDS];`
  );

  // 5. Ganti blok BSC_VILLAS
  content = content.replace(
    /export const BSC_VILLAS = \[[\s\S]*\];/,
    `export const BSC_VILLAS = ${newBscVillasJson};`
  );

  // 6. Sinkronkan jumlah villa per kawasan pada DESTINATIONS_SUMMARY
  content = content.replace(
    /(name: 'Pererenan',[\s\S]*?count: )\d+/,
    '$13'
  );
  content = content.replace(
    /(name: 'Canggu & Berawa',[\s\S]*?count: )\d+/,
    '$18'
  );
  content = content.replace(
    /(name: 'Uluwatu & Bukit',[\s\S]*?count: )\d+/,
    '$16'
  );
  content = content.replace(
    /(name: 'Umalas & Seminyak',[\s\S]*?count: )\d+/,
    '$14'
  );
  content = content.replace(
    /(name: 'Seseh',[\s\S]*?count: )\d+/,
    '$11'
  );
  content = content.replace(
    /(name: 'Ubud',[\s\S]*?count: )\d+/,
    '$14'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Berhasil memperbarui bscVillasData.js (40+ mock villa berhasil dihapus)');
}

/**
 * Memperbarui VILLA_ALIAS_MAP di src/App.jsx untuk memastikan house-terra terpetakan
 * @returns {void}
 */
function updateAppJs() {
  const filePath = path.resolve('src/App.jsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes("'house-terra': 'house-terra'")) {
    content = content.replace(
      "const VILLA_ALIAS_MAP = {",
      "const VILLA_ALIAS_MAP = {\n  'house-terra': 'house-terra',"
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Menambahkan house-terra ke VILLA_ALIAS_MAP di App.jsx');
  }
}

// Jalankan seluruh pembaruan
console.log('=== MEMULAI EKSEKUSI PEMBERSIHAN VILLA & NLP COPYWRITING ===');
updateAirbnbVillasJson();
updateVillasDataJs();
updateBscVillasDataJs();
updateAppJs();
console.log('=== SEMUA TAHAP EKSEKUSI SELESAI DENGAN SUKSES ===');

