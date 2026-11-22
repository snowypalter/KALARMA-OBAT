import { ScenarioItem, FlashcardItem, QuizQuestion } from '../types/latihan';

export const SCENARIO_ITEMS: ScenarioItem[] = [
  {
    id: 'skenario-antibiotik',
    title: 'Demam & Godaan Sisa Antibiotik Teman',
    subtitle: 'Kasus Swamedikasi Flu & Batuk',
    badge: 'Antibiotik & AMR',
    patientProfile: {
      name: 'Rian (21 tahun)',
      age: 'Mahasiswa Teknik Semester 6',
      condition: 'Demam 38°C, tenggorokan sakit, bersin, dan pilek sejak kemarin.'
    },
    story: 'Rian sedang sibuk mempersiapkan tugas akhir. Karena badannya panas dingin dan tenggorokan nyeri saat menelan, teman satu kosnya menawarkan strip kapsul Amoksisilin 500 mg sisa resep dokter dari sakit giginya bulan lalu. Temannya berkata: "Minum ini aja Bro, kemarin gigiku langsung sembuh. Biar demammu cepat turun."',
    question: 'Berdasarkan etika dan keselamatan penggunaan obat, tindakan mana yang paling bijak dilakukan Rian?',
    options: [
      {
        id: 'opt-a',
        text: 'Meminum 1 kapsul amoksisilin tersebut segera untuk membunuh bakteri penyebab demam.',
        isBestPractice: false,
        consequence: 'Bahaya Resistensi Antimikroba (AMR) & Tidak Efektif',
        feedback: 'Tindakan ini sangat berbahaya! Demam dan flu sebagian besar disebabkan oleh virus, bukan bakteri, sehingga antibiotik tidak berkhasiat. Meminum antibiotik sisa secara sembarangan memicu bakteri di tubuh menjadi resisten (kebal obat).',
        scientificReason: 'Amoksisilin adalah golongan Obat Keras (Lingkaran Merah K) yang hanya boleh diperoleh dengan resep dokter setelah pemeriksaan klinis dan harus dihabiskan satu siklus penuh.'
      },
      {
        id: 'opt-b',
        text: 'Menolak sisa antibiotik, memilih parasetamol (obat bebas) untuk meredakan demam, beristirahat cukup, dan banyak minum air hangat.',
        isBestPractice: true,
        consequence: 'Tindakan Tepat & Sesuai Kaidah Swamedikasi Aman',
        feedback: 'Tepat sekali! Flu dan radang tenggorokan awal umumnya infeksi virus swasirna (self-limiting). Parasetamol bertindak sebagai antipiretik dan analgesik aman (lingkaran hijau), dibarengi istirahat untuk memulihkan daya tahan tubuh.',
        scientificReason: 'Obat bebas (logo hijau) dapat digunakan untuk meredakan gejala sementara (simtomatik). Apabila gejala demam menetap > 3 hari, barulah diperlukan pemeriksaan faskes.'
      },
      {
        id: 'opt-c',
        text: 'Menghaluskan kapsul amoksisilin lalu dicampur dengan susu hangat agar tidak pahit.',
        isBestPractice: false,
        consequence: 'Keliru Ganda: Penggunaan Salah & Potensi Interaksi Obat',
        feedback: 'Salah besar! Selain antibiotik tidak boleh diminum tanpa indikasi medis, membuka isi kapsul secara mandiri dapat merusak kestabilan zat aktif dan interaksi dengan senyawa kalsium pada susu dapat mengganggu penyerapan obat.',
        scientificReason: 'Kapsul gelatin dirancang melindungi mukosa lambung dan memastikan zat aktif lepas pada saluran cerna dengan laju yang tepat.'
      }
    ],
    redFlags: [
      'Demam tinggi > 39°C yang tidak turun setelah 3 hari mengonsumsi antipiretik.',
      'Disertai sesak napas berat, nyeri dada, atau batuk berdarah.',
      'Kesulitan membuka mulut atau menelan cairan sama sekali.',
      'Muncul ruam kulit merah atau bengkak pada bibir/wajah (tanda syok alergi).'
    ],
    referenceCitation: 'Pedoman Penggunaan Antibiotik Bijak Kemenkes RI & BPOM RI - Pencegahan Resistensi Antimikroba'
  },
  {
    id: 'skenario-sirup-sendok',
    title: 'Batuk Berdahak & Sendok Makan Dapur',
    subtitle: 'Kasus Takaran Sediaan Cair (Sirup)',
    badge: 'Sendok Takar vs Dapur',
    patientProfile: {
      name: 'Ibu Nisa & Faris (7 tahun)',
      age: 'Anak Usia Sekolah',
      condition: 'Batuk berdahak sejak 2 hari setelah kehujanan, tidak demam.'
    },
    story: 'Ibu Nisa membeli obat batuk sirup berlogo lingkaran biru (obat bebas terbatas) di apotek. Di rumah, sendok takar plastik bawaan kemasan hilang tercecer. Di label etiket tertulis: "Aturan Pakai: 3 kali sehari 1 sendok takar obat (5 mL)". Karena terburu-buru, Ibu Nisa hendak mengambil sendok makan stainless steel yang biasa dipakai makan sup di meja makan.',
    question: 'Apakah tindakan menggunakan sendok makan dapur untuk meminumkan sirup obat tersebut dibenarkan?',
    options: [
      {
        id: 'opt-a',
        text: 'Boleh, asalkan sendok makan dapur tersebut hanya diisi setengahnya saja.',
        isBestPractice: false,
        consequence: 'Risiko Dosis Tidak Akurat (Under/Overdose)',
        feedback: 'Kurang tepat! Sendok makan dapur tidak terkalibrasi. Memperkirakan "setengah sendok" memiliki variasi volume yang sangat tinggi (antara 4 mL hingga 9 mL tergantung kedalaman lekukan sendok).',
        scientificReason: 'Bentuk sediaan cair anak membutuhkan presisi dosis tinggi untuk menghindari toksisitas zat aktif mukolitik atau ekspektoran.'
      },
      {
        id: 'opt-b',
        text: 'Tidak boleh. Sendok makan dapur berkapasitas ~15 mL (3x lipat takaran 5 mL). Sebaiknya gunakan sendok takar obat 5 mL bawaan, syringe oral, atau pipet tetes berskala.',
        isBestPractice: true,
        consequence: 'Tindakan Tepat & Mencegah Bahaya Toksisitas Dosis',
        feedback: 'Benar sekali! Sendok makan (C = cochlear) bernilai ~15 mL, sedangkan sendok teh obat (cth = cochlear theae) adalah 5 mL. Menggunakan sendok makan dapur berisiko memberikan obat hingga 300% dari dosis lazim anak!',
        scientificReason: 'Farmakope Indonesia menetapkan sendok obat resmi: 1 sendok teh obat = 5 mL berskala, 1 sendok makan obat = 15 mL berskala.'
      },
      {
        id: 'opt-c',
        text: 'Boleh langsung diminum dari mulut botol secukupnya agar tidak repot mencuci sendok.',
        isBestPractice: false,
        consequence: 'Kontaminasi Bakteri & Kerusakan Cepat Sediaan Cair',
        feedback: 'Sangat dilarang! Meminum langsung dari botol memindahkan bakteri air liur ke dalam larutan sirup yang manis, mempercepat pembusukan dan pertumbuhan mikroba, serta dosis sama sekali tidak terukur.',
        scientificReason: 'Kemasan sirup mengandung pemanis yang menjadi medium subur mikroorganisme jika terpapar flora mulut.'
      }
    ],
    redFlags: [
      'Anak tampak lemas, tarikan dinding dada ke dalam (retraksi napas), atau napas berbunyi mengi (stridor).',
      'Batuk berdahak disertai muntah terus-menerus sehingga obat tidak masuk.',
      'Dahak berwarna kehijauan pekat atau bercampur darah.',
      'Batuk menetap lebih dari 7 hari tanpa perbaikan.'
    ],
    referenceCitation: 'Pedoman Pelayanan Farmasi Pediatrik Kemenkes RI & Tata Laksana Batuk Swamedikasi BPOM'
  },
  {
    id: 'skenario-salep-steroid',
    title: 'Gatal Selangkangan & Salep Milik Saudara',
    subtitle: 'Kasus Sediaan Semipadat (Salep Kulit)',
    badge: 'Obat Keras & Kulit',
    patientProfile: {
      name: 'Dimas (24 tahun)',
      age: 'Karyawan Swasta',
      condition: 'Gatal dan ruam merah melingkar di area lipatan paha setelah olahraga berulang.'
    },
    story: 'Dimas merasa tidak nyaman dengan gatal di lipatan pahanya yang makin meluas. Kakaknya menyodorkan sisa tube salep kulit berlabel "Kloramfenikol + Deksametason" atau salep Betametason dengan logo Lingkaran Merah K yang tertinggal di laci obat keluarga. Kakaknya berkata: "Pakai ini aja, salep dewa gatal langsung reda dalam 1 jam."',
    question: 'Bagaimana analisis farmasi terhadap langkah penggunaan salep kortikosteroid tersebut?',
    options: [
      {
        id: 'opt-a',
        text: 'Mengoleskan salep tersebut tebal-tebal 4 kali sehari di seluruh permukaan ruam agar gatal cepat tuntas.',
        isBestPractice: false,
        consequence: 'Fatal: Infeksi Jamur Meledak & Atrofi Kulit Menipis',
        feedback: 'Tindakan ini sangat berbahaya! Ruam melingkar di lipatan paha setelah olahraga lembap sering kali merupakan Tinea cruris (infeksi jamur kurap). Kortikosteroid menekan sistem imun lokal, sehingga jamur akan berkembang biak makin ganas!',
        scientificReason: 'Kortikosteroid potensi sedang/kuat tanpa antijamur pada infeksi mikosis menyebabkan Tinea Incognito dan penipisan lapisan dermis kulit (atrofi).'
      },
      {
        id: 'opt-b',
        text: 'Tidak mengoleskan salep steroid keras tersebut. Jaga area tetap kering, gunakan pakaian dalam bersih longgar, dan konsultasikan ke apoteker/dokter untuk membedakan alergi vs infeksi jamur.',
        isBestPractice: true,
        consequence: 'Tindakan Tepat & Rasional Mencegah Perburukan Penyakit',
        feedback: 'Luar biasa! Gejala gatal kulit memiliki etiologi sangat beragam (infeksi jamur, scabies, bakteri, atau dermatitis kontak). Salep berlogo K keras memerlukan diagnosis tepat agar tidak memperparah infeksi.',
        scientificReason: 'Sediaan semipadat berlogo Lingkaran Merah K wajib berdasarkan resep dan diagnosis dokter untuk memastikan agen kausatif (antifungi vs antiinflamasi).'
      },
      {
        id: 'opt-c',
        text: 'Mencampur salep tersebut dengan alkohol 70% sebelum dioleskan agar steril.',
        isBestPractice: false,
        consequence: 'Kerusakan Basis Salep & Iritasi Perih Berat',
        feedback: 'Sangat keliru! Alkohol 70% merusak basis sediaan salep dan akan menyebabkan sensasi terbakar yang menyiksa pada kulit yang sedang teriritasi atau lecet.',
        scientificReason: 'Sediaan salep dirancang dengan basis hidrokarbon/lemak yang tidak kompatibel dengan alkohol pelarut polar.'
      }
    ],
    redFlags: [
      'Ruam kulit meluas dengan nanah, luka lepuh, atau demam tinggi.',
      'Rasa perih menyengat hebat menyerupai luka bakar.',
      'Gatal menyebar ke seluruh anggota keluarga di rumah (waspada skabies/kudis).',
      'Tidak membaik setelah 5 hari perawatan kebersihan mandiri.'
    ],
    referenceCitation: 'Pedoman Penatalaksanaan Penyakit Kulit Perhimpunan Dokter Spesialis Kulit & Kelamin (PERDOSKI) & Farmakope Indonesia'
  },
  {
    id: 'skenario-antasida',
    title: 'Nyeri Lambung (Maag) & Waktu Minum Antasida',
    subtitle: 'Kasus Aturan Pakai & Waktu Minum Obat',
    badge: 'Aturan Pakai Optimal',
    patientProfile: {
      name: 'Maya (22 tahun)',
      age: 'Mahasiswi Arsitektur',
      condition: 'Nyeri perih di ulu hati, mual, dan rasa terbakar di dada karena sering terlambat makan.'
    },
    story: 'Maya membeli tablet kunyah Antasida di minimarket (logo hijau). Karena lapar dan perutnya perih, Maya segera makan nasi padang sampai kenyang. Tepat setelah suapan terakhir selesai, Maya langsung menelan utuh satu tablet antasida dengan segelas air es.',
    question: 'Apakah cara Maya mengonsumsi tablet antasida tersebut sudah tepat sesuai kaidah farmasi klinis?',
    options: [
      {
        id: 'opt-a',
        text: 'Sudah tepat karena semua obat lambung harus diminum saat perut kenyang agar lambung tidak teriritasi.',
        isBestPractice: false,
        consequence: 'Efek Netralisasi Asam Lambung Tidak Optimal',
        feedback: 'Kurang tepat! Antasida justru berkhasiat paling optimal saat diminum 1 jam sebelum makan atau 2 jam setelah makan (saat perut kosong), dan harus dikunyah lumat terlebih dahulu sebelum ditelan.',
        scientificReason: 'Antasida bekerja secara kimiawi lokal menetralisir asam lambung bebas (HCl). Makanan kenyang akan mempercepat pengosongan lambung sehingga antasida keluar sebelum sempat bekerja.'
      },
      {
        id: 'opt-b',
        text: 'Keliru. Tablet antasida wajib dikunyah halus terlebih dahulu, diminum 1 jam sebelum makan atau 2 jam setelah makan, atau menjelang tidur malam.',
        isBestPractice: true,
        consequence: 'Tindakan Tepat: Luas Permukaan Kontak Maksimal',
        feedback: 'Tepat sekali! Mengunyah tablet antasida bertujuan memperluas permukaan kontak partikel basa antasida (Al-hidroksida / Mg-hidroksida) dengan cairan asam lambung, memberikan peredaan nyeri ulu hati yang cepat.',
        scientificReason: 'Tablet kunyah (chewable tablet) diformulasikan khusus agar dihancurkan oleh gigi sehingga absorpsi dan reaksi netralisasi lokal di lambung berjalan seketika.'
      },
      {
        id: 'opt-c',
        text: 'Tablet antasida harus dilarutkan ke dalam air mendidih lalu diminum seperti teh herbal.',
        isBestPractice: false,
        consequence: 'Merusak Bentuk Sediaan Tablet Kunyah',
        feedback: 'Salah! Tablet kunyah antasida bukan tablet effervescent. Melarutkannya dalam air panas tidak dianjurkan dan menurunkan kenyamanan konsumsi.',
        scientificReason: 'Formulasi tablet kunyah mengandung zat perasa (peppermint/manis) yang ditujukan untuk mastikasi di rongga mulut.'
      }
    ],
    redFlags: [
      'Nyeri dada seperti tertindih beban berat menjalar ke lengan kiri atau leher (waspada serangan jantung/angina).',
      'Muntah cairan berwarna hitam seperti ampas kopi atau buang air besar hitam pekat (tanda perdarahan lambung).',
      'Penurunan berat badan drastis tanpa sebab jelas.',
      'Nyeri menetap lebih dari 14 hari meski rutin minum antasida.'
    ],
    referenceCitation: 'Pedoman Swamedikasi Gangguan Saluran Cerna BPOM RI & Farmakoterapi Dipiro'
  }
];

export const FLASHCARD_ITEMS: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'logo',
    categoryLabel: 'Logo Golongan',
    title: 'Logo Obat Bebas (Lingkaran Hijau)',
    frontPrompt: 'Apa arti lingkaran hijau dengan garis tepi hitam tebal pada kemasan obat?',
    frontHint: 'Tersedia di apotek, toko obat berizin, hingga minimarket.',
    backDefinition: 'Obat Bebas adalah obat yang dapat dibeli secara bebas tanpa resep dokter di apotek maupun toko obat berizin.',
    backRules: [
      'Tingkat keamanan relatif tinggi untuk swamedikasi gejala ringan.',
      'Tetap wajib dibaca aturan pakai, dosis, dan kontraindikasi di balik kemasan.',
      'Contoh: Parasetamol, Antasida, Vitamin C, Cairan Oralit.'
    ],
    warningNote: 'Meski berlogo hijau, konsumsi melebihi dosis maksimal tetap dapat merusak organ (contoh parasetamol berlebih merusak hati).',
    referenceSource: 'Permenkes RI & BPOM RI - Penandaan Golongan Obat'
  },
  {
    id: 'fc-2',
    category: 'logo',
    categoryLabel: 'Logo Golongan',
    title: 'Logo Obat Bebas Terbatas (Lingkaran Biru)',
    frontPrompt: 'Apa arti lingkaran biru dengan garis tepi hitam tebal pada kemasan?',
    frontHint: 'Disertai salah satu dari 6 tanda peringatan resmi P.No. 1 s/d P.No. 6.',
    backDefinition: 'Obat Bebas Terbatas adalah obat keras yang dalam jumlah dan takaran tertentu masih dapat dibeli tanpa resep dokter di apotek dan toko obat berizin.',
    backRules: [
      'Wajib menyertakan tanda peringatan khusus berupa kotak hitam berhuruf putih (P.No 1 - P.No 6).',
      'Pengguna harus memperhatikan secara saksama batas lama konsumsi.',
      'Contoh: CTM (antihistamin), Dextromethorphan (sirup batuk), Povidone Iodine (obat kumur/luar).'
    ],
    warningNote: 'Dapat menimbulkan efek samping mengantuk berat atau iritasi bila tidak mengindahkan tanda peringatan P.No 1-6.',
    referenceSource: 'Keputusan Menteri Kesehatan RI - Penandaan Khusus Obat Bebas Terbatas'
  },
  {
    id: 'fc-3',
    category: 'logo',
    categoryLabel: 'Logo Golongan',
    title: 'Tanda Peringatan P.No 1 (Awas! Obat Keras)',
    frontPrompt: 'Sebutkan bunyi teks resmi dan makna dari tanda peringatan P.No 1!',
    frontHint: 'Sering dijumpai pada obat batuk, flu, dan mabuk perjalanan.',
    backDefinition: 'Bunyi Resmi: "P.No. 1: Awas! Obat Keras. Bacalah aturan memakainya."',
    backRules: [
      'Menandakan obat memiliki efek farmakologis kuat yang dapat membahayakan bila disalahgunakan.',
      'Konsumen wajib membaca dosis maksimal dan batas waktu minum (maksimal 3-5 hari).',
      'Jika gejala belum reda, hentikan konsumsi dan periksakan diri ke dokter.'
    ],
    warningNote: 'Jangan melipatgandakan dosis bila gejala belum terasa membaik.',
    referenceSource: 'SK Menkes No. 6355/Dirjen/SK/69'
  },
  {
    id: 'fc-4',
    category: 'logo',
    categoryLabel: 'Logo Golongan',
    title: 'Tanda Peringatan P.No 2 (Obat Kumur)',
    frontPrompt: 'Apa bunyi dan konsekuensi keselamatan dari tanda P.No 2?',
    frontHint: 'Ditemukan pada antiseptik kumur (misal Povidone iodine gargle).',
    backDefinition: 'Bunyi Resmi: "P.No. 2: Awas! Obat Keras. Hanya untuk kumur, jangan ditelan."',
    backRules: [
      'Khusus untuk sediaan topikal rongga mulut dan faring.',
      'Zat aktif antiseptik/astringen tidak boleh masuk ke sistem lambung karena dapat menyebabkan keracunan atau iritasi mukosa.',
      'Minta anak didampingi orang dewasa saat berkumur agar tidak tertelan.'
    ],
    referenceSource: 'Pedoman Penandaan Kemasan BPOM RI'
  },
  {
    id: 'fc-5',
    category: 'logo',
    categoryLabel: 'Logo Golongan',
    title: 'Logo Obat Keras (Lingkaran Merah Huruf K)',
    frontPrompt: 'Apa implikasi hukum dan klinis dari lingkaran merah dengan huruf K hitam di tengahnya?',
    frontHint: 'Hanya boleh diserahkan oleh apoteker di apotek.',
    backDefinition: 'Obat Keras adalah obat berkhasiat kuat yang HANYA boleh diserahkan dengan Resep Dokter yang sah.',
    backRules: [
      'Tidak boleh dibeli bebas atau dioper ke teman/keluarga tanpa resep baru.',
      'Meliputi seluruh antibiotik oral/injeksi, obat hipertensi, antidiabetes, obat penenang, dan kortikosteroid.',
      'Dapat menimbulkan efek samping serius, interaksi fatal, atau resistensi mikroba bila dipakai sembarangan.'
    ],
    warningNote: 'Apoteker berhak menolak penyerahan obat keras bila tidak disertai resep dokter asli yang valid.',
    referenceSource: 'UU Farmasi RI & Peraturan BPOM RI'
  },
  {
    id: 'fc-6',
    category: 'titik-kritis',
    categoryLabel: 'Titik Kritis',
    title: 'Expired Date (ED) vs Beyond Use Date (BUD)',
    frontPrompt: 'Apa perbedaan mendasar antara Expired Date (ED) pabrik dan Beyond Use Date (BUD)?',
    frontHint: 'Satu dicetak pabrik, satu lagi dihitung sejak segel kemasan dibuka.',
    backDefinition: 'Expired Date adalah batas aman mutu dari pabrik saat kemasan MASIH TERSEGEL UTUH. Beyond Use Date adalah batas aman setelah wadah dibuka oleh pasien.',
    backRules: [
      'ED: Tertera pada strip/botol asli (misal: ED Feb 2028).',
      'BUD: Dihitung sejak tutup botol dibuka pertama kali atau sirup dilarutkan.',
      'Jika obat sudah dibuka, patokan keamanan adalah MANA YANG LEBIH PENDEK antara BUD dan ED.'
    ],
    warningNote: 'Sirup tetes mata yang sudah dibuka > 30 hari TIDAK BOLEH dipakai meski ED pabriknya masih 2 tahun lagi!',
    referenceSource: 'United States Pharmacopeia (USP) & Kemenkes RI'
  },
  {
    id: 'fc-7',
    category: 'titik-kritis',
    categoryLabel: 'Titik Kritis',
    title: 'Masa Simpan Sirup Antibiotik Rekonstitusi (Dry Syrup)',
    frontPrompt: 'Berapa lama batas aman (BUD) sirup kering antibiotik setelah dilarutkan air matang?',
    frontHint: 'Maksimal hitungan hari, bukan hitungan bulan.',
    backDefinition: 'Maksimal 7 hari (pada suhu kamar) atau 14 hari (dalam kulkas pendingin suhu 2–8°C), kecuali pabrik mencantumkan batas spesifik lain.',
    backRules: [
      'Wajib ditulis tanggal pelarutan pada badan botol.',
      'Larutan antibiotik mudah terhidrolisis dan kehilangan potensi membunuh kuman.',
      'Sisa sirup setelah masa pengobatan selesai WAJIB DIBUANG, tidak boleh disimpan untuk sakit berikutnya.'
    ],
    warningNote: 'Jangan pernah membekukan sirup antibiotik di freezer!',
    referenceSource: 'Farmakope Indonesia VI & Formularium Nasional'
  },
  {
    id: 'fc-8',
    category: 'titik-kritis',
    categoryLabel: 'Titik Kritis',
    title: 'Masa Simpan Tetes Mata Mini-Dose vs Botol Multi-Dosis',
    frontPrompt: 'Berapa batas waktu penggunaan (BUD) tetes mata mini-dose (tanpa pengawet) vs botol multi-dosis?',
    frontHint: 'Satu habis dalam 24 jam, satu lagi maksimal 28-30 hari.',
    backDefinition: 'Tetes mata botol multi-dosis maksimal 28–30 hari setelah dibuka. Tetes mata mini-dose (strip tube sekali pakai) maksimal 24 jam (3x24 jam jika ada tutup klik).',
    backRules: [
      'Tetes mata botol mengandung preservatif (pengawet antimikroba) yang menurun efektivitasnya setelah 1 bulan.',
      'Mini-dose tidak memakai pengawet sehingga risiko kontaminasi kuman mata sangat cepat.',
      'Jangan sampai ujung penetes menyentuh bola mata atau bulu mata.'
    ],
    referenceSource: 'Pedoman Beyond Use Date Kemenkes RI'
  },
  {
    id: 'fc-9',
    category: 'titik-kritis',
    categoryLabel: 'Titik Kritis',
    title: 'Arti 15 Digit Nomor Izin Edar (NIE BPOM)',
    frontPrompt: 'Apa arti kode 3 huruf pertama pada NIE BPOM (misal DBL atau DTL atau DKL)?',
    frontHint: 'Huruf 1 = Dagang/Generik, Huruf 2 = Golongan Obat, Huruf 3 = Asal Pabrik.',
    backDefinition: 'Huruf 1: D (Nama Dagang) / G (Generik). Huruf 2: B (Bebas) / T (Bebas Terbatas) / K (Keras). Huruf 3: L (Produksi Lokal) / I (Impor).',
    backRules: [
      'DBL: Obat dengan nama Dagang, golongan Bebas, diproduksi Dalam Negeri / Lokal.',
      'DTL: Obat nama Dagang, Bebas Terbatas, Lokal.',
      'DKL: Obat nama Dagang, Obat Keras, Lokal.',
      'Dapat dicek keasliannya via aplikasi BPOM Mobile atau situs cekbpom.pom.go.id.'
    ],
    referenceSource: 'Badan Pengawas Obat dan Makanan (BPOM RI)'
  },
  {
    id: 'fc-10',
    category: 'dagusibu',
    categoryLabel: 'Prinsip Dagusibu',
    title: 'Cara Aman Membuang Tablet & Kapsul Kedaluwarsa',
    frontPrompt: 'Bagaimana langkah merusak sediaan tablet dan kapsul sebelum dibuang ke tempat sampah rumah tangga?',
    frontHint: 'Cegah obat dipungut oknum pemalsu obat di tempat pembuangan akhir.',
    backDefinition: 'Keluarkan obat dari blister/strip, gerus tablet atau buka cangkang kapsul, campur dengan tanah/ampas kopi/kotoran, bungkus rapat dalam kantong plastik, lalu buang.',
    backRules: [
      'Lepaskan atau gunting label identitas dan nama pasien.',
      'Gunting blister/strip foil menjadi potongan kecil agar tidak dapat dipakai ulang sindikat pemalsu.',
      'Jangan membuang tablet utuh langsung ke saluran wastafel atau kloset (mencemari air tanah).'
    ],
    referenceSource: 'Gerakan Masyarakat Cerdas Menggunakan Obat (GeMa CerMO) Kemenkes RI'
  },
  {
    id: 'fc-11',
    category: 'dagusibu',
    categoryLabel: 'Prinsip Dagusibu',
    title: 'Cara Aman Membuang Sediaan Sirup & Botol Kaca',
    frontPrompt: 'Bagaimana cara membuang sediaan sirup obat batuk/demam yang sudah rusak atau kedaluwarsa?',
    frontHint: 'Pisahkan antara cairan obat dan botol kemasannya.',
    backDefinition: 'Encerkan cairan sirup dengan air mengalir banyak di saluran pembuangan, lepaskan label botol dan rusak/pecahkan botol kaca, lalu buang botol di tempat sampah daur ulang.',
    backRules: [
      'Buka tutup botol dan tuang cairan sirup ke kloset atau saluran air bersama siraman air berlimpah.',
      'Copot atau coret permanen label kemasan (nama merk dan nomor bets).',
      'Rusak botol plastik dengan cara digunting/dihancurkan, atau botol kaca dipecahkan secara hati-hati terbungkus kain.'
    ],
    warningNote: 'Untuk sirup antibiotik sisa: endapkan dan campur dengan tanah sebelum dibuang untuk meminimalkan residu antimikroba di saluran got.',
    referenceSource: 'Pedoman Penanganan Obat Rusak & Kedaluwarsa di Rumah Tangga - BPOM RI'
  },
  {
    id: 'fc-12',
    category: 'dagusibu',
    categoryLabel: 'Prinsip Dagusibu',
    title: 'Tempat Terlarang Menyimpan Obat di Rumah',
    frontPrompt: 'Sebutkan 3 tempat di rumah yang sering keliru dijadikan tempat menyimpan obat!',
    frontHint: 'Area dengan fluktuasi panas tinggi, kelembapan uap air, atau paparan sinar matahari langsung.',
    backDefinition: '1) Dashboard mobil / laci kendaraan (panas ekstrem hingga >50°C), 2) Lemari kamar mandi (kelembapan uap air tinggi), 3) Di atas kulkas / dekat kompor dapur (panas motor kulkas & uap memasak).',
    backRules: [
      'Suhu ruang aman: 15°C – 25°C (sejuk dan kering).',
      'Hindari paparan sinar matahari langsung yang mengoksidasi senyawa kimia aktif obat.',
      'Jauhkan dari jangkauan anak-anak dan simpan dalam wadah asli bersegel rapat.'
    ],
    referenceSource: 'Petunjuk Penyimpanan Obat Kemenkes RI'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Sebuah kemasan obat batuk cair menampilkan tanda lingkaran biru dengan garis tepi hitam. Berdasarkan penggolongan resmi BPOM, apakah golongan obat tersebut?',
    competency: 'Identifikasi Logo Golongan Obat',
    options: [
      'Obat Bebas yang dapat dibeli di mana saja tanpa peringatan khusus',
      'Obat Bebas Terbatas yang disertai salah satu tanda peringatan resmi P.No 1 s/d P.No 6',
      'Obat Keras yang mutlak membutuhkan resep dokter',
      'Narkotika dan Psikotropika dengan pengawasan ketat'
    ],
    correctIndex: 1,
    explanation: 'Lingkaran biru bergaris tepi hitam adalah tanda golongan Obat Bebas Terbatas. Obat ini tergolong obat keras namun dalam jumlah/takaran tertentu masih dapat dibeli tanpa resep dokter dan wajib memuat kotak peringatan P.No 1 s/d P.No 6.',
    referenceSource: 'Permenkes RI No. 917/Menkes/Per/X/1993 tentang Penggolongan Obat'
  },
  {
    id: 2,
    question: 'Di sisi strip obat pereda flu, terdapat kotak hitam bertuliskan: "P.No. 1: Awas! Obat Keras. Bacalah aturan memakainya." Apa tindakan paling tepat yang wajib dilakukan konsumen?',
    competency: 'Paham Peringatan Khusus',
    options: [
      'Langsung menelan 2 tablet sekaligus agar sakit flu segera tuntas',
      'Membaca seksama dosis maksimal per hari, jarak waktu konsumsi, dan batas maksimal 3 hari swamedikasi',
      'Mengabaikan peringatan karena obat tersebut dibeli di apotek tanpa resep dokter',
      'Menghaluskan tablet lalu mencampurnya ke dalam kopi panas'
    ],
    correctIndex: 1,
    explanation: 'Tanda Peringatan P.No 1 menegaskan bahwa obat memiliki kandungan zat aktif kuat. Konsumen wajib mematuhi dosis harian, batas waktu minum mandiri (maksimal 3 hari), serta tidak mengemudi bila ada efek sedatif (kantuk).',
    referenceSource: 'SK Menkes No. 6355/Dirjen/SK/69 tentang Tanda Peringatan Obat Bebas Terbatas'
  },
  {
    id: 3,
    question: 'Apa perbedaan paling mendasar antara Expired Date (ED) dan Beyond Use Date (BUD)?',
    competency: 'Perbedaan ED vs BUD',
    options: [
      'ED untuk obat cair, sedangkan BUD khusus untuk obat tablet dan kapsul',
      'ED adalah masa kedaluwarsa saat wadah masih segel utuh dari pabrik, sedangkan BUD adalah batas aman setelah wadah dibuka oleh pasien',
      'ED ditentukan oleh apoteker di apotek, sedangkan BUD ditentukan oleh pabrik farmasi',
      'ED dan BUD memiliki arti yang persis sama dan tidak ada perbedaannya'
    ],
    correctIndex: 1,
    explanation: 'Expired Date (ED) merupakan jaminan stabilitas mutu dari produsen selama kemasan masih tersegel primer. Begitu segel dibuka atau direkonstitusi, stabilitas obat dihitung berdasarkan Beyond Use Date (BUD) yang sering kali jauh lebih singkat daripada ED pabrik.',
    referenceSource: 'United States Pharmacopeia (USP) Compounding Compendium & Kemenkes RI'
  },
  {
    id: 4,
    question: 'Ibu memiliki botol sirup antibiotik kering (dry syrup) yang baru saja dilarutkan dengan air matang hari ini. Jika disimpan di suhu ruangan (25°C), berapa lama batas waktu penggunaan (BUD) sirup tersebut?',
    competency: 'Masa Simpan Sediaan Khusus (Sirup Kering)',
    options: [
      'Maksimal 7 hari setelah dilarutkan',
      'Hingga tanggal Expired Date yang tertera di kemasan (misal 2 tahun lagi)',
      'Selama 6 bulan jika ditaruh di tempat gelap',
      'Sampai warna sirup berubah menjadi hitam pekat'
    ],
    correctIndex: 0,
    explanation: 'Sirup antibiotik rekonstitusi memiliki kestabilan fisikokimia yang sangat pendek setelah dicampur air, yaitu maksimal 7 hari pada suhu ruangan sejuk (atau 14 hari di dalam lemari pendingin non-freezer 2-8°C). Melewati waktu tersebut, efektivitas antibiotik menurun drastis dan rentan kontaminasi mikroba.',
    referenceSource: 'Farmakope Indonesia Edisi VI & Pedoman Beyond Use Date Kemenkes RI'
  },
  {
    id: 5,
    question: 'Mengapa meminum sisa antibiotik milik orang lain saat Anda mengalami gejala demam dan flu dilarang keras dalam farmasi klinis?',
    competency: 'Patient Safety & Antimicrobial Resistance (AMR)',
    options: [
      'Karena rasa antibiotik sisa sudah pasti berubah menjadi sangat manis',
      'Karena sebagian besar flu disebabkan virus bukan bakteri, dan konsumsi antibiotik tanpa indikasi resep memicu Resistensi Antimikroba (AMR)',
      'Karena antibiotik hanya boleh diminum oleh orang yang berusia di atas 60 tahun',
      'Karena antibiotik sisa akan langsung menguap begitu dibuka dari stripnya'
    ],
    correctIndex: 1,
    explanation: 'Antibiotik hanya efektif melawan infeksi bakteri, bukan virus (penyebab flu/selesma umum). Mengonsumsi sisa antibiotik teman dengan dosis tidak tuntas adalah penyebab utama timbulnya superbug kuman resisten (AMR) yang berbahaya bagi diri sendiri dan masyarakat luas.',
    referenceSource: 'Pedoman Penatagunaan Antimikroba (PGA) Kemenkes RI & WHO Global AMR Framework'
  },
  {
    id: 6,
    question: 'Nomor Izin Edar obat di Indonesia terdiri dari 15 digit. Jika sebuah obat memiliki kode awal "DBL", apakah arti dari kode 3 huruf tersebut?',
    competency: 'Verifikasi Nomor Izin Edar (NIE BPOM)',
    options: [
      'Obat Dinas, Bebas terbatas, Luar negeri',
      'Obat dengan nama Dagang, Golongan Bebas (lingkaran hijau), Produksi Dalam Negeri / Lokal',
      'Obat Generik, Berbahaya, Luar negeri',
      'Obat Keras impor yang diedarkan oleh Badan POM'
    ],
    correctIndex: 1,
    explanation: 'Huruf ke-1 "D" = Merk Dagang (Trade Name); Huruf ke-2 "B" = Golongan Obat Bebas; Huruf ke-3 "L" = Diproduksi secara Lokal di dalam negeri. Keabsahan 15 digit ini dapat dicek di BPOM Mobile.',
    referenceSource: 'Peraturan Kepala BPOM RI tentang Tata Laksana Registrasi Obat'
  },
  {
    id: 7,
    question: 'Berapakah takaran volume resmi untuk "1 sendok teh obat" (bahasa resep: cochlear theae / cth) pada sediaan sendok takar sirup?',
    competency: 'Ketepatan Takaran Sediaan Cair',
    options: [
      '2 mL',
      '5 mL',
      '10 mL',
      '15 mL'
    ],
    correctIndex: 1,
    explanation: 'Dalam standar farmakope resmi, 1 sendok teh obat (cth) adalah tepat 5 mL. Sendok makan obat (C) bernilai 15 mL. Tidak boleh menyamakan sendok teh obat 5 mL dengan sendok makan dapur rumah tangga yang volumenya bervariasi luas antara 10-15 mL.',
    referenceSource: 'Farmakope Indonesia Edisi V & Pedoman Dagusibu Apoteker'
  },
  {
    id: 8,
    question: 'Berdasarkan pedoman DAGUSIBU Kemenkes RI, bagaimanakah cara memusnahkan sediaan tablet yang sudah kedaluwarsa sebelum dibuang ke tempat sampah rumah tangga?',
    competency: 'Prinsip DAGUSIBU (Cara Buang Obat Rusak)',
    options: [
      'Membuang blister utuh langsung ke saluran wastafel atau kloset',
      'Menjualnya ke pengepul barang rongsokan',
      'Keluarkan dari blister, hancurkan/gerus tablet, campur dengan tanah/ampas kopi, masukkan kantong plastik rapat, dan rusak kemasannya',
      'Membakar seluruh strip plastik di dalam kamar tidur'
    ],
    correctIndex: 2,
    explanation: 'Untuk mencegah penyalahgunaan obat rusak oleh sindikat daur ulang obat ilegal, tablet harus dikeluarkan dari kemasannya, dihancurkan, dan dicampur bahan menjijikkan/tanah/kopi agar tidak dapat dipungut. Strip/blister dipotong-potong kecil sebelum dibuang.',
    referenceSource: 'Gerakan Masyarakat Cerdas Menggunakan Obat (GeMa CerMO) Kemenkes RI'
  },
  {
    id: 9,
    question: 'Di manakah tempat di dalam rumah yang paling TIDAK Dianjurkan untuk menyimpan obat-obatan keluarga?',
    competency: 'Penyimpanan Obat Sesuai Karakteristik (Suhu & Kelembapan)',
    options: [
      'Kotak obat khusus yang tertutup di lemari ruang tamu yang sejuk dan kering',
      'Lemari gantung kamar mandi dan dashboard mobil yang terkena sinar matahari terik',
      'Rak meja belajar yang jauh dari jangkauan balita',
      'Laci lemari kamar tidur dengan suhu stabil ~25°C'
    ],
    correctIndex: 1,
    explanation: 'Kamar mandi memiliki kelembapan udara sangat tinggi yang mempercepat hidrolisis dan jamur pada tablet/salep, sedangkan mobil memiliki suhu ekstrem (bisa >50°C) yang merusak kestabilan zat aktif dan melelehkan kapsul/sirup.',
    referenceSource: 'Petunjuk Teknis Penyimpanan Obat di Rumah Tangga - Kemenkes RI'
  },
  {
    id: 10,
    question: 'Kapan saat yang paling tepat bagi seorang konsumen swamedikasi untuk segera menghentikan pengobatan mandiri dan menghubungi apoteker atau dokter?',
    competency: 'Kewaspadaan Swamedikasi & Patient Safety',
    options: [
      'Setelah minum obat 5 menit dan belum langsung sembuh seketika',
      'Bila gejala tidak membaik setelah 3 hari, timbul reaksi alergi (bengkak/ruam), atau muncul tanda bahaya seperti sesak napas berat',
      'Hanya boleh berkonsultasi jika persediaan obat di rumah sudah habis 100%',
      'Tidak perlu bertanya ke dokter jika obat yang diminum berlogo hijau'
    ],
    correctIndex: 1,
    explanation: 'Swamedikasi hanya dibatasi untuk keluhan ringan dan sementara (maksimal 3 hari). Timbulnya tanda bahaya (red flags), sesak napas, penurunan kesadaran, atau reaksi alergi akut merupakan indikasi rujukan medis mendesak.',
    referenceSource: 'Pedoman Pelayanan Kefarmasian untuk Pasien Swamedikasi Kemenkes RI'
  }
];
