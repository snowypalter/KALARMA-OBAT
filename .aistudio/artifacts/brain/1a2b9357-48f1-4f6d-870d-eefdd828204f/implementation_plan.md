# Pembaruan Desain Editorial Medis Ruang Obat

Pembaruan menyeluruh antarmuka **Ruang Obat** menuju pengalaman **editorial medis yang hangat, tenang, dan mudah dipahami**, dengan tata letak responsif yang lebih lapang di desktop maupun ponsel, ilustrasi visual khusus pada Beranda, pembaruan tampilan grafik stok serta kemasan obat interaktif, dan transisi antarmuka yang lebih halus tanpa mengubah logika edukasi maupun batasan etika farmasi yang sudah berjalan.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Seluruh preferensi utama desain telah dikonfirmasi melalui wawancara awal. Poin-poin di bawah ini menjadi acuan baku pelaksanaan desain tanpa mengubah fungsi inti aplikasi (Cek Label 6 Titik, Lemari Obat lokal, Latihan Skenario/Flashcard/Kuis, Pustaka, Ekspor PDF, dan Chatbot AI berbasis isi web & buku `.zip`).

- **Arah Estetika Visual (Terkonfirmasi)**: **Editorial medis hangat dan tenang** (*warm & calm medical editorial*) — menjauhi kesan dashboard klinis yang dingin atau kaku, beralih ke nuansa apotek modern berlatar kertas alabaster hangat (`#F7F6F2`), hijau sage lembut (`#4A6D62`), hijau hutan tua (`#263F3A`), dan aksen pasir hangat (`#D8B99A`).
- **Cakupan Pembaruan (Terkonfirmasi)**: **Seluruh halaman dan komponen utama** diperbarui secara konsisten, mencakup Navigasi Atas & Bawah, Beranda, Cek Label Kemasan, Lemari Obat, Latihan & Evaluasi, Pustaka Rujukan, seluruh Modal Pendukung, Footer Penafian, serta Widget Chatbot AI.
- **Peningkatan Visual Pilihan (Terkonfirmasi)**:
  1. Tata letak lebih lapang dan tipografi editorial baru (*display serif* + *humanist sans* + *monospace* untuk angka/kode).
  2. Ilustrasi visual khusus bergaya editorial medis untuk memperkuat bagian pahlawan (*hero*) dan konteks edukasi pada Beranda.
  3. Animasi transisi halaman, kartu, dan dialog yang lebih halus dan ringan (*compositor-only* `<= 200ms`, menghormati `prefers-reduced-motion`).
  4. Pembaruan estetika grafik ringkasan stok obat (Recharts) serta ilustrasi kemasan interaktif Tablet, Sirup, dan Salep beserta pin interaktifnya.
- **Struktur Tata Letak (Terkonfirmasi)**: **Responsif penuh untuk desktop dan ponsel** — memperluas kanvas desktop dari satu kolom sempit menjadi tata letak editorial asimetris dua zona (`max-w-6xl`), sambil menjaga kenyamanan sentuh satu tangan (`>= 44px` target sentuh) dan bilah navigasi bawah yang ringkas pada layar ponsel.
- **Standar Etika & Privasi Skripsi (Dipertahankan Penuh)**: Penafian edukasi umum di footer, tanpa kalkulator dosis maupun diagnosis pribadi, rujukan resmi Kemenkes/BPOM/Farmakope tetap utuh, serta penyimpanan inventaris obat tetap 100% lokal di perangkat pengguna.

---

### 1. Overview & Core Concept

- **Apa yang Diperbarui**: Mengangkat **Ruang Obat** dari tampilan utilitas standar berbasis kartu abu-abu dingin menjadi sebuah publikasi edukasi kesehatan rumah tangga yang menenangkan, kredibel, dan berwibawa secara akademis. Setiap elemen disusun ulang menggunakan hierarki tipografi yang tegas, ruang bernapas yang luas (*whitespace*), ilustrasi khusus yang relevan, dan pemisahan visual yang jelas antara konten edukasi utama, pengingat keselamatan, dan alat interaktif.
- **Target Pengguna**:
  - **Masyarakat Umum & Keluarga**: Memerlukan antarmuka yang tidak mengintimidasi saat membaca label obat, memantau tanggal kedaluwarsa di rumah, atau bertanya kepada asisten edukasi.
  - **Dosen Penguji & Penilai Prototipe Skripsi S1 Farmasi**: Memerlukan kejelasan struktur akademis, visibilitas rujukan resmi, keakuratan simulasi 6 titik kemasan, serta akses mudah ke lembar peninjauan dan dokumen PDF.
- **Nilai Utama Pembaruan**: Meningkatkan daya baca (*readability*), menurunkan beban kognitif (*cognitive load*) pada layar desktop maupun ponsel, serta memperjelas fokus interaktif pada grafik stok obat dan simulasi kemasan.

---

### 2. User Experience & Visual Design

#### A. Alur Pengguna Utama (Key User Flows)
1. **Beranda Editorial & Orientasi**: Pengguna disambut oleh *hero* dua kolom yang memadukan judul besar berkarakter editorial, pengantar singkat, tombol akses cepat, dan ilustrasi apotek rumah tangga yang hangat. Tepat di bawahnya, bilah pengingat kedaluwarsa (jika ada obat `<= 30 hari` atau kedaluwarsa), dua kartu fitur utama (*Cek Label* & *Lemari Obat*), ringkasan visual grafik stok obat, sorotan *Skenario Swamedikasi Hari Ini*, tautan belajar cepat (*Kamus* & *Flashcard*), serta kartu khusus dokumen peninjauan dosen tersusun dalam ritme visual yang lapang dan berimbang. Panduan tur fitur (*Walkthrough*) dan *tooltip* tetap terintegrasi harmonis dengan gaya editorial baru.
2. **Simulasi Cek Label Dua Zona**: Pada desktop, area kiri (`~58%`) menampilkan panggung kanvas kemasan interaktif (Tablet, Sirup, Salep) beserta pemilih cepat titik 1–6, sedangkan area kanan (`~42%`) menampilkan kartu penjelasan resmi 6 titik (Arti Resmi, Tips Membaca, Peringatan Keamanan) secara berdampingan sehingga pengguna tidak perlu menggulir naik-turun untuk membandingkan visual kemasan dengan penjelasannya. Di ponsel, keduanya tersusun vertikal secara alami dengan tinggi yang proporsional.
3. **Lemari Obat & Pemantauan Stok**: Bilah pencarian *real-time* (dengan sorotan kata kunci dan tombol hapus cepat), filter status berkode ganda (ikon + teks, bukan warna saja), dan kartu inventaris obat tampil dalam kisi responsif dua kolom pada desktop. Tombol tindakan berbahaya menggunakan dialog konfirmasi internal yang halus menggantikan pop-up peramban bawaan.
4. **Latihan, Pustaka, & Asisten AI**: Modul Skenario Kasus, Flashcard 3D, Kuis Pre/Post, Pustaka Rujukan, serta laci obrolan *Asisten Ruang Obat* mengikuti sistem warna, radius, dan tipografi yang seragam agar perpindahan antartab terasa menyatu dalam satu kesatuan produk.

#### B. Identitas Visual & Tema
- **Arah Estetika**: *Warm & Calm Medical Editorial* — hangat seperti jurnal kesehatan modern dan apotek keluarga yang rapi, jauh dari warna neon, latar belakang abu-abu dingin, atau dekorasi berlebihan.
- **Palet Warna & Token Semantik (Aturan 60-30-10)**:
  - **60% Kanvas & Permukaan Tenang**:
    - `--bg`: `#F7F6F2` (Alabaster hangat sebagai latar utama halaman).
    - `--surface`: `#FFFFFF` (Putih bersih untuk kartu baca dan panggung interaktif).
    - `--surface-muted`: `#EFEEE8` (Krem batu lembut untuk wadah sekunder, bilah tab tersegmentasi, dan kotak kutipan rujukan).
    - `--line`: `#E3E6DF` (Garis pemisah halus bertegangan rendah).
  - **30% Struktur Teks & Kedalaman Apotek**:
    - `--ink`: `#253530` (Hijau arang gelap untuk teks utama berketajaman tinggi).
    - `--ink-muted`: `#55665F` (Abu-hijau teduh untuk teks sekunder dan metadata).
    - `--forest`: `#263F3A` (Hijau apotek tua untuk kartu sorotan editorial, tajuk modal, dan aksen kontras tinggi).
    - `--secondary`: `#DCEAE6` (Sage pucat untuk sorotan lembut dan latar ikon).
  - **10% Aksen Utama & Kehangatan**:
    - `--brand`: `#4A6D62` & `--primary`: `#64877D` (Sage utama untuk tombol aksi primer, indikator aktif, dan batas fokus).
    - `--sand`: `#D8B99A` (Pasir hangat untuk aksen editorial halus, pembatas, dan detail kartu gelap).
  - **Status Klinis Berkode Ganda (Ikon + Teks + Kontras Teruji)**:
    - *Aman*: `--status-aman-text` (`#2F6B4F`) di atas `--status-aman-bg` (`#E4F1EA`).
    - *Segera Kedaluwarsa*: `--status-segera-text` (`#7A4B0C`) di atas `--status-segera-bg` (`#F8EBD3`).
    - *Kedaluwarsa*: `--status-kedaluwarsa-text` (`#8E2F2F`) di atas `--status-kedaluwarsa-bg` (`#F6E1DE`).
- **Tipografi & Hierarki**:
  - **Display & Tajuk Utama (`--font-heading`)**: *Fraunces* (serif editorial lembut dengan karakter hangat dan tepercaya) untuk judul halaman (`h1`), judul seksi utama (`h2`), serta kutipan skenario, dipadukan dengan *Plus Jakarta Sans* untuk label UI dan tombol yang tegas.
  - **Teks Bacaan (`--font-body`)**: *DM Sans* berukuran `16px–17px` dengan tinggi baris `1.65` untuk kenyamanan membaca paragraf edukasi farmasi tanpa kelelahan mata.
  - **Kode & Angka Presisi (`--font-mono`)**: *DM Mono* dengan `tabular-nums` khusus untuk Nomor Izin Edar (NIE), nomor bets, tanggal ED/BUD, jumlah stok pada grafik, serta skor kuis.
- **Disiplin Tata Letak, Navigasi, & Kebersihan Komponen**:
  - **Kontrak Navigasi Atas 3 Zona**: Zona 1 berisi tanda kata (*wordmark*) tunggal Ruang Obat; Zona 2 berisi tepat 5 tautan navigasi satu baris (*single-line* tanpa pembungkus teks); Zona 3 berisi **satu tombol CTA utama** (`Tinjau / Bagikan`) yang fokus dan bersih, sedangkan akses `Tentang Aplikasi` ditempatkan rapi pada tautan footer dan menu pengantar agar bilah atas tidak sesak.
  - **Disiplin Tanpa Pil Dekoratif (*Zero-Pill Discipline*)**: Menghapus pil/kapsul dekoratif pada label statis (seperti penanda *"Media Edukasi Farmasi Klinis & Komunitas"*, *"Tahap 2 Aktif"*, atau jumlah obat statis di kartu Beranda) dan menggantinya dengan tipografi penanda atas (*eyebrow text*) yang bersih dengan pemisah titik tengah (`·`). Bentuk pil/segmen hanya dipakai untuk kontrol yang benar-benar interaktif (filter status, pemilih kemasan, dan tab latihan).
  - **Tanpa Elemen Klise**: Menghilangkan garis aksen kiri tebal (`border-l-4`) serta titik dekoratif atau animasi berkedip (`animate-ping`) pada hotspot kemasan; diganti dengan cincin fokus presisi, elevasi permukaan lembut, dan pembedaan angka aktif yang tegas.

#### C. Ilustrasi, Grafik, & Pembaruan Kemasan
- **Ilustrasi Visual Khusus Beranda**: Menggunakan aset gambar ilustrasi bergaya editorial medis hangat (palet alabaster, sage, hijau tua, dan terakota/pasir lembut, bebas teks) untuk memperkaya area *hero* Beranda serta aksen visual panduan DAGUSIBU/kotak obat rumah tangga, dilengkapi pembungkus berbingkai rapi dan mekanisme *fallback* bergaya jika gambar belum termuat.
- **Pembaruan Grafik Stok Obat (Recharts)**: Menyelaraskan palet segmen *Donut* dan *Bar Chart* ke warna status semantik editorial (`#2F6B4F`, `#B46914`, `#A63A3A`), memperbaiki *tooltip* kustom berlatar `--forest` dengan sudut lembut, menambahkan tipografi angka `tabular-nums` di tengah *donut*, serta memastikan seluruh kartu rincian kategori di samping grafik tetap interaktif menuju filter Lemari Obat.
- **Pembaruan Ilustrasi Kemasan Obat (Tablet, Sirup, Salep)**: Memperbarui warna SVG kemasan dari abu-abu biru dingin menjadi palet editorial hangat (kertas label krim gading, tutup botol bertekstur halus, kaca botol amber yang hangat, dan foil blister yang bersih), serta menyempurnakan tombol pin angka 1–6 dengan target sentuh minimal `44px × 44px` dan sorotan cincin aktif yang tenang tanpa kedipan mengganggu.

#### D. Umpan Balik Interaktif & Gerak
- Transisi antarhalaman, bukaan modal/*bottom-sheet*, putaran *flashcard* 3D, dan efek sorot kartu menggunakan properti ramah *compositor* (`transform`, `opacity`) berdurasi ringkas (`150ms–200ms`) dengan kurva perlambatan alami (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Seluruh animasi otomatis tunduk pada aturan aksesibilitas `prefers-reduced-motion`.
- Bilah navigasi bawah pada layar ponsel dipertahankan tetap ringkas (`<= 15%` tinggi layar) dengan penyangga ruang aman di atasnya agar tidak menutupi tombol aksi ataupun tombol mengambang *Tanya Ruang Obat*.

---

### 3. Key Product Decisions & Trade-Offs

- **Keputusan 1: Menyeragamkan Semua Warna ke Token Tema Semantik Editorial**
  - *Pendekatan*: Menghapus kelas warna dingin yang tertanam keras (`slate-*`, `teal-700` lama) di seluruh tampilan dan komponen UI, lalu mengikat seluruh permukaan, batas, teks, dan status ke token CSS tema hangat (`bg`, `surface`, `surface-muted`, `brand`, `forest`, `sand`, `ink`).
  - *Mengapa*: Menjamin konsistensi visual di seluruh aplikasi (termasuk modal, grafik, dan chatbot) serta memudahkan penyesuaian kontras aksesibilitas secara terpusat.
  - *Alternatif yang Dipertimbangkan*: Memperbarui hanya halaman Beranda saja. Ditolak karena pengguna memilih pembaruan seluruh halaman dan percampuran dua tema akan merusak kohesi pengalaman membaca.

- **Keputusan 2: Tata Letak Cek Label 2-Zona di Desktop & Tumpukan Proporsional di Ponsel**
  - *Pendekatan*: Pada layar `lg` ke atas, tampilan simulasi kemasan (kiri) dan panel rincian 6 titik (kanan) ditampilkan sejajar dalam satu bidang pandang; pada layar kecil, keduanya tersusun vertikal berurutan.
  - *Mengapa*: Pengguna desktop tidak perlu menggulir ke bawah setiap kali mengetuk titik 1–6 pada gambar kemasan, sementara pengguna ponsel tetap mendapat lebar panggung kemasan yang maksimal dan nyaman disentuh.
  - *Alternatif yang Dipertimbangkan*: Mempertahankan satu kolom sempit (`max-w-4xl`) di semua ukuran layar. Ditolak karena menyisakan ruang kosong berlebih di sisi kiri-kanan layar desktop dan memaksa pengguliran berulang.

- **Keputusan 3: Penyederhanaan Zona Aksi Header & Pemindahan Konfirmasi Hapus ke Dialog Internal**
  - *Pendekatan*: Menjaga zona kanan header tetap menampilkan 1 CTA utama (`Tinjau / Bagikan`) dan memindahkan akses informasi `Tentang` ke area footer serta kartu pengantar yang jelas; sekaligus mengganti `window.confirm` saat menghapus obat di Lemari Obat dengan komponen dialog konfirmasi internal bertema editorial.
  - *Mengapa*: Memenuhi disiplin navigasi atas yang bersih dan menghindari pemblokiran antarmuka `iFrame` oleh dialog bawaan peramban.
  - *Alternatif yang Dipertimbangkan*: Mempertahankan dua tombol di pojok kanan atas dan `confirm()` bawaan. Ditolak karena membuat header sempit di ponsel dan dialog bawaan tidak konsisten secara visual.

- **Keputusan 4: Aset Ilustrasi Editorial Khusus Disajikan di Sisi Klien Tanpa Menyentuh Server Pengetahuan**
  - *Pendekatan*: Menghasilkan aset ilustrasi khusus beresolusi bersih untuk Beranda melalui proses pembuatan gambar terpisah dan menyimpannya sebagai aset statis aplikasi yang dirender langsung oleh antarmuka Beranda, tanpa mengubah mekanisme indeks dokumen atau server AI.
  - *Mengapa*: Menjaga keamanan kompilasi dan eksekusi *backend* agar server Node/Express dan indeksasi buku `.zip` tetap ringan serta bebas ketergantungan aset visual.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

#### Arsitektur Sistem & Alur Komponen
```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Lapisan Tema & Tipografi Global                      │
│   Token Editorial (bg, surface, forest, brand, sand, status-*)          │
│   Fraunces (Display) · DM Sans / Plus Jakarta Sans (Body) · DM Mono     │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   Kerangka Aplikasi & Navigasi Responsif                │
│   Header 3-Zona (Desktop/Mobile) ──► Area Konten (max-w-6xl)            │
│   BottomNav Ringkas (Mobile)     ──► Footer Penafian & Akses Tentang    │
└───────┬───────────────┬──────────────┬───────────────┬──────────────────┘
        │               │              │               │
        ▼               ▼              ▼               ▼
┌──────────────┐ ┌────────────┐ ┌────────────┐ ┌─────────────────────────┐
│ Beranda      │ │ Cek Label  │ │ Lemari     │ │ Latihan & Pustaka       │
│ · Hero +     │ │ · Split    │ │ · Pencarian│ │ · Skenario (tanpa       │
│   Ilustrasi  │ │   2-Zona   │ │   & Sorotan│ │   aksen garis kiri)     │
│ · Chart Stok │ │ · Kemasan  │ │ · Kisi Obat│ │ · Flashcard 3D & Kuis   │
│ · Walkthrough│ │   SVG Baru │ │ · Dialog   │ │ · Daftar Pustaka Resmi  │
│   & Tooltip  │ │ · Kartu 6  │ │   Konfirm. │ │   & Panduan Simpan/Buang│
└──────────────┘ │   Titik    │ └─────┬──────┘ └─────────────────────────┘
                 └────────────┘       │
                                      ▼
                        ┌──────────────────────────┐
                        │ Penyimpanan Lokal Klien  │
                        │ localStorage (Stok Obat, │
                        │ Tur Beranda, Chat, Kuis) │
                        └──────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                Asisten Chatbot & Indeks Pengetahuan (Server)            │
│   ChatbotWidget (Tema Editorial) ◄── SSE ──► Server Express + Gemini AI │
│   Unggah/Baca Buku (.zip/.pdf/.txt) ◄──────► Indeks Isi Web + Buku      │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Model Data & Pengelolaan State
- **Entitas Utama (Tidak Berubah)**:
  - *Inventaris Obat*: ID, nama obat, bentuk sediaan, tanggal kedaluwarsa (`expiryDate`), tanggal pertama dibuka (`openedDate`), catatan, dan stempel waktu pembuatan; status (`aman`, `segera`, `kedaluwarsa`) dihitung otomatis secara dinamis berdasarkan sisa hari.
  - *Titik Kemasan Interaktif*: Tiga jenis sediaan (`tablet`, `sirup`, `salep`), masing-masing memiliki 6 koordinat persentase *hotspot*, judul, deskripsi singkat, fungsi resmi, tips membaca, dan peringatan keamanan dengan rujukan resmi.
  - *Latihan & Pustaka*: Kumpulan skenario bercabang, kartu *flashcard* bolak-balik, butir kuis Pre/Post beserta skor tersimpan, serta pustaka rujukan farmasi terstruktur.
- **Penyimpanan State**:
  - Data obat pengguna, status selesainya panduan tur Beranda, riwayat percakapan chatbot, dan skor kuis tetap tersimpan pada `localStorage` peramban.
  - Basis pengetahuan chatbot (potongan teks website dan arsip buku `.zip`/`.pdf`/`.txt`/`.md`) tetap dikelola oleh server Express dan dapat dimuat ulang atau ditambah lewat unggahan pengguna.

#### Pemetaan Interaksi Komponen & State
- **Navigasi & Lintas Fitur**: Mengetuk kartu peringatan atau segmen grafik Recharts pada Beranda memperbarui state filter awal Lemari Obat (`segera`, `kedaluwarsa`, atau `semua`) sekaligus memindahkan tab aktif ke Lemari Obat; mengetuk kartu *Flashcard Cepat* langsung membuka sub-tab `flashcard` pada Latihan.
- **Cek Label 2-Zona**: Pergantian jenis kemasan mereset `activeHotspotId` ke titik `1`; mengetuk pin angka pada SVG kemasan, memilih baris cepat 1–6, atau menekan *Sebelumnya/Lanjut* menyinkronkan penyorotan cincin pada gambar dan konten kartu rincian secara instan.
- **Lemari Obat & Validasi Aman**: Masukan pencarian menyaring daftar berdasarkan nama, sediaan, dan catatan sekaligus menyorot kecocokan teks; aksi hapus memicu state konfirmasi dialog internal sebelum menghapus item dari state dan `localStorage`; formulir tambah/ubah memvalidasi nama dan tanggal wajib sebelum menyimpan.
- **Integrasi AI Chatbot & Ekspor PDF**: Widget obrolan mempertahankan percakapan multi-giliran berbasis *Server-Sent Events (SSE)* dengan pilihan mode *Lengkap* dan *Cepat*, panel pengelolaan sumber buku `.zip`, serta tombol unduh PDF prototipe skripsi tetap tersedia di kartu Beranda dan modal peninjauan dosen.
