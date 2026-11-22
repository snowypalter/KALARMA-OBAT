import { KamusItem } from '../types';

export const KAMUS_ITEMS: KamusItem[] = [
  {
    id: 'aturan-pakai',
    term: 'Aturan Pakai',
    category: 'Petunjuk Penggunaan',
    definition: 'Petunjuk resmi mengenai takaran dosis sekali minum, frekuensi dan selang waktu pemberian (misalnya 3 kali sehari = tiap 8 jam), rute pemakaian, serta kaitannya dengan waktu makan agar kadar obat di dalam plasma tetap efektif dan aman.',
    referenceSource: 'HKI 2022 (Bab VIII & XI) · BPOM RI'
  },
  {
    id: 'bentuk-sediaan',
    term: 'Bentuk Sediaan Obat (BSO)',
    category: 'Karakteristik Fisik',
    definition: 'Wujud fisik formulasi obat yang dirancang sesuai stabilitas dan rute pemakaiannya, meliputi sediaan padat (tablet, kapsul, pil, serbuk), cair (larutan, sirup, eliksir, suspensi, emulsi, guttae/tetes), dan semipadat (salep, krim, pasta, gel).',
    referenceSource: 'HKI 2022 (Bab IX: Bentuk Sediaan Obat) · Farmakope Indonesia VI'
  },
  {
    id: 'beyond-use-date',
    term: 'Beyond Use Date (BUD)',
    category: 'Masa Simpan',
    definition: 'Batas waktu aman penggunaan obat setelah segel kemasan primer dibuka atau setelah sediaan diracik/direkonstitusi dengan air (misalnya sirup kering antibiotik umumnya 7–14 hari dan tetes mata multidose maksimal 28 hari), yang waktunya lebih pendek daripada Expired Date pabrik.',
    referenceSource: 'USP <795>/<797> · Kemenkes RI · HKI 2022 (Bab VIII)'
  },
  {
    id: 'dosis',
    term: 'Dosis Obat',
    category: 'Petunjuk Penggunaan',
    definition: 'Jumlah atau takaran obat yang diberikan pada satu kali pemakaian atau dalam rentang waktu tertentu untuk menghasilkan efek terapi yang diinginkan tanpa melampaui batas aman toksisitas (dosis menentukan apakah suatu zat bekerja sebagai obat atau racun).',
    referenceSource: 'HKI 2022 (Bab I & X) · Farmakologi & Terapi Ed. 4 FKUI (Bab 1 & 52)'
  },
  {
    id: 'efek-samping',
    term: 'Efek Samping Obat (ESO)',
    category: 'Keamanan Pasien',
    definition: 'Setiap efek fisiologis atau respons yang tidak diinginkan dari suatu obat yang timbul pada dosis lazim terapeutik manusia—sifatnya umumnya dapat diprediksi dari mekanisme kerja obat tetapi tidak dapat dihindari sepenuhnya.',
    referenceSource: 'HKI 2022 (Bab I) · Farmakologi & Terapi Ed. 4 FKUI (Bab 1) · BPOM RI'
  },
  {
    id: 'expired-date',
    term: 'Expired Date (ED / Tanggal Kedaluwarsa)',
    category: 'Masa Simpan',
    definition: 'Batas tanggal terakhir produsen menjamin stabilitas mutu, potensi zat aktif, dan keamanan obat selama disimpan dalam kemasan asli yang masih tersegel rapat sesuai suhu anjuran. Obat lewat ED berisiko kehilangan khasiat atau terurai menjadi senyawa toksik.',
    referenceSource: 'BPOM RI · HKI 2022 (Bab VIII & XI) · FKUI Ed. 4 (Bab 52)'
  },
  {
    id: 'indikasi',
    term: 'Indikasi Medis',
    category: 'Informasi Terapi',
    definition: 'Daftar kondisi penyakit atau gejala spesifik yang secara ilmiah dan regulasi telah disetujui untuk diobati, diredakan, atau dicegah menggunakan obat tersebut sesuai mekanisme farmakodinamik zat aktifnya.',
    referenceSource: 'BPOM RI · HKI 2022 (Bab IV: Farmakoterapi)'
  },
  {
    id: 'kontraindikasi',
    term: 'Kontraindikasi',
    category: 'Keamanan Pasien',
    definition: 'Kondisi klinis, riwayat penyakit, atau status pasien tertentu (misalnya alergi zat aktif, tukak lambung aktif, kehamilan, atau gagal ginjal berat) di mana obat sama sekali tidak boleh diberikan karena risiko bahaya serius atau fatal.',
    referenceSource: 'Farmakologi & Terapi Ed. 4 FKUI (Bab 56) · HKI 2022 (Bab XI) · BPOM RI'
  },
  {
    id: 'logo-obat-bebas',
    term: 'Logo Obat Bebas (Lingkaran Hijau)',
    category: 'Golongan Obat',
    definition: 'Tanda khusus berupa lingkaran berwarna hijau dengan garis tepi hitam yang menandakan obat relatif paling aman untuk swamedikasi keluhan ringan dan dapat dibeli bebas di apotek maupun toko obat berizin tanpa resep dokter (contoh: parasetamol tablet, vitamin C).',
    referenceSource: 'HKI 2022 (Bab VII: Penggolongan Jenis Obat) · Permenkes RI'
  },
  {
    id: 'logo-obat-bebas-terbatas',
    term: 'Logo Obat Bebas Terbatas (Lingkaran Biru)',
    category: 'Golongan Obat',
    definition: 'Tanda lingkaran berwarna biru dengan garis tepi hitam untuk obat Daftar W ("Waarschuwing"), yaitu obat keras yang masih boleh diserahkan tanpa resep dokter asalkan dijual dalam bungkus asli pabrik dan wajib mencantumkan kotak tanda peringatan khusus P.No. 1 hingga P.No. 6.',
    referenceSource: 'HKI 2022 (Bab VII: Penggolongan Jenis Obat) · Kepmenkes RI'
  },
  {
    id: 'logo-obat-keras',
    term: 'Logo Obat Keras (Lingkaran Merah Huruf K)',
    category: 'Golongan Obat',
    definition: 'Tanda lingkaran berwarna merah bergaris tepi hitam dengan huruf K hitam menyentuh tepi lingkaran untuk obat Daftar G ("Gevaarlijk"/berbahaya) dan psikotropika. Hanya boleh diperoleh dengan resep dokter di apotek/faskes, kecuali item tertentu dalam daftar Obat Wajib Apotek (OWA).',
    referenceSource: 'HKI 2022 (Bab VII: Penggolongan Jenis Obat) · Permenkes RI'
  },
  {
    id: 'nomor-bets',
    term: 'Nomor Bets / Batch Number',
    category: 'Identifikasi Produk',
    definition: 'Kode identitas unik yang diberikan pabrik untuk menandai satu siklus atau kelompok produksi obat tertentu yang memiliki keseragaman mutu, sehingga memudahkan pelacakan apabila diperlukan audit atau penarikan produk (recall).',
    referenceSource: 'BPOM RI · Farmakope Indonesia VI'
  },
  {
    id: 'nomor-izin-edar',
    term: 'Nomor Izin Edar (NIE BPOM)',
    category: 'Legalitas',
    definition: 'Kode persetujuan resmi pendaftaran obat jadi dari BPOM RI terdiri atas 15 digit kombinasi huruf dan angka. Tiga huruf awal menunjukkan golongan dan status produksi (misalnya DBL: Dagang Bebas Lokal, DTL: Dagang Bebas Terbatas Lokal, DKL: Dagang Keras Lokal).',
    referenceSource: 'BPOM RI · HKI 2022 (Bab I)'
  },
  {
    id: 'obat-generik',
    term: 'Obat Generik',
    category: 'Nama Obat',
    definition: 'Obat yang penamaannya menggunakan nama resmi zat berkhasiat yang ditetapkan dalam Farmakope Indonesia maupun International Nonproprietary Names (INN) dari WHO—mengandung zat aktif, kekuatan dosis, dan khasiat yang setara dengan obat merek dagang.',
    referenceSource: 'HKI 2022 (Bab XI) · Kemenkes RI · Farmakope Indonesia VI'
  },
  {
    id: 'peringatan-khusus',
    term: 'Peringatan Khusus (Tanda P. No. 1 s/d P. No. 6)',
    category: 'Petunjuk Penggunaan',
    definition: 'Kotak berwarna hitam berukuran panjang 5 cm dan lebar 2 cm berisi tulisan putih pada kemasan Obat Bebas Terbatas (Daftar W): P.No.1 (Awas! Obat Keras, bacalah aturan memakainya), P.No.2 (hanya untuk kumur), P.No.3 (hanya untuk bagian luar), P.No.4 (hanya untuk dibakar), P.No.5 (tidak boleh ditelan), dan P.No.6 (obat wasir, jangan ditelan).',
    referenceSource: 'HKI 2022 (Bab VII: Penggolongan Jenis Obat) · Kepmenkes RI'
  },
  {
    id: 'rekonstitusi',
    term: 'Rekonstitusi (Sirup Kering)',
    category: 'Petunjuk Penggunaan',
    definition: 'Proses melarutkan serbuk/granul obat kering (umumnya antibiotik anak) dengan air matang bersuhu ruang tepat hingga batas tanda garis pada botol sebelum pertama kali diminum, lalu dikocok merata. Setelah direkonstitusi, botol wajib ditandai tanggal dan dihabiskan dalam batas BUD.',
    referenceSource: 'HKI 2022 (Bab IX) · Farmakope Indonesia VI'
  },
  {
    id: 'suhu-simpan',
    term: 'Suhu Penyimpanan Obat',
    category: 'Masa Simpan',
    definition: 'Ketentuan suhu lingkungan guna menjaga kestabilan fisika dan kimia obat menurut Farmakope Indonesia: suhu kamar/ruang terkendali (15–30°C), suhu sejuk (8–15°C), dan suhu dingin lemari es bukan freezer (2–8°C). Kelembapan berlebih dan paparan sinar matahari langsung mempercepat kerusakan obat.',
    referenceSource: 'Farmakope Indonesia VI · HKI 2022 (Bab VIII)'
  },
  {
    id: 'swamedikasi',
    term: 'Swamedikasi (Self-Medication)',
    category: 'Perilaku Pasien',
    definition: 'Upaya pengobatan mandiri oleh masyarakat untuk keluhan ringan menggunakan obat golongan Obat Bebas dan Obat Bebas Terbatas secara rasional sesuai informasi label, tanpa melampaui kewenangan diagnosis serta tetap berkonsultasi ke apoteker atau dokter bila gejala menetap atau muncul tanda bahaya.',
    referenceSource: 'WHO · Kemenkes RI · HKI 2022 (Bab IV & VII)'
  }
];
