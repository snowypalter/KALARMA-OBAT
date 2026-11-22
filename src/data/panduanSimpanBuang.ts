import { StorageGuideItem } from '../types';

export const PANDUAN_SIMPAN_BUANG: StorageGuideItem[] = [
  {
    sediaan: 'Tablet',
    title: 'Tablet & Kapsul',
    simpanRules: [
      'Simpan di tempat kering, sejuk, dan terlindung dari cahaya matahari langsung pada suhu ruang terkendali (15–30°C) sesuai anjuran kemasan (Farmakope Indonesia VI; HKI 2022, Bab VIII).',
      'Pertahankan tablet dan kapsul tetap di dalam kemasan strip, blister, atau botol asli lengkap dengan etiketnya hingga sesaat sebelum diminum agar terlindung dari udara lembap dan tanggal kedaluwarsa tetap terbaca (HKI 2022, Bab IX & XI).',
      'Hindari menyimpan obat di kamar mandi, dekat wastafel, di atas kompor dapur, atau di dasbor mobil karena panas dan kelembapan mempercepat tablet hancur serta melunakkan cangkang kapsul gelatin (Kemenkes RI DAGUSIBU; BPOM RI).'
    ],
    buangRules: [
      'Keluarkan seluruh tablet atau isi kapsul dari kemasan strip, blister, atau botol aslinya agar kemasan utuh tidak disalahgunakan kembali (Kemenkes RI DAGUSIBU; BPOM RI).',
      'Gerus/hancurkan tablet atau buka cangkang kapsul, lalu campurkan ke dalam kantong plastik bersama bahan tidak menarik seperti ampas kopi, tanah, atau pasir kotor sebelum dibuang ke tempat sampah domestik (Kemenkes RI DAGUSIBU).',
      'Gunting atau rusak strip/blister serta coret/rusak informasi pribadi dan label obat pada dus atau botol sebelum dibuang ke wadah sampah tertutup (BPOM RI).'
    ],
    catatanPenting: 'Segera hentikan pemakaian dan musnahkan tablet atau kapsul apabila berubah warna, muncul bintik jamur, rapuh/hancur, berbau menyengat (seperti bau cuka/tengik), atau cangkang kapsul menjadi lembek dan saling menempel (FKUI Ed. 4, Bab 52; BPOM RI).'
  },
  {
    sediaan: 'Sirup / Cair',
    title: 'Sirup, Suspensi & Emulsi',
    simpanRules: [
      'Bersihkan bibir botol setelah menuang dan tutup ulir botol rapat-rapat agar cairan tidak menguap, mengkristal di leher botol, atau terkontaminasi mikroba (HKI 2022, Bab XI: Cara Pemberian Obat).',
      'Simpan pada suhu ruang terkendali (15–30°C) dan terhindar dari sinar matahari langsung; jangan dimasukkan ke dalam freezer karena pembekuan dapat memecah kestabilan emulsi atau suspensi (HKI 2022, Bab IX; Farmakope Indonesia VI).',
      'Catat tanggal pertama kali botol dibuka atau tanggal pencampuran air (sirup kering) pada label untuk memantau batas Beyond Use Date (BUD), misalnya sirup kering antibiotik umumnya hanya stabil 7–14 hari setelah direkonstitusi (USP <795>; Kemenkes RI).'
    ],
    buangRules: [
      'Untuk sisa cairan antibiotik atau obat khusus, JANGAN langsung dibuang ke wastafel/saluran air agar tidak mencemari lingkungan dan memicu resistensi bakteri; campurkan cairan dengan serbuk penyerap (ampas kopi/tanah/pasir) dalam wadah tertutup lalu buang ke sampah, atau kembalikan ke program pengumpulan di apotek/faskes (Kemenkes RI DAGUSIBU; FKUI Ed. 4, Bab 39).',
      'Untuk sirup obat bebas biasa yang tidak berbahaya terhadap lingkungan perairan, encerkan cairan dengan air secukupnya lalu tuang ke saluran pembuangan sesuai panduan pembuangan obat rumah tangga Kemenkes RI.',
      'Lepaskan atau rusak label pada botol serta pecahkan/rusak tutup botol sebelum membuang botol kosong agar tidak dipakai ulang oleh oknum pemalsu obat (BPOM RI).'
    ],
    catatanPenting: 'Jangan gunakan sirup, suspensi, atau emulsi apabila cairan berubah warna, keruh tidak normal, berbau asam/fermentasi, atau terbentuk endapan keras/gumpalan yang tidak mau menyebar kembali meski sudah dikocok perlahan (HKI 2022, Bab IX).'
  },
  {
    sediaan: 'Salep / Krim / Gel',
    title: 'Salep, Krim & Gel Kulit',
    simpanRules: [
      'Simpan pada suhu ruang yang sejuk dan kering serta jauhkan dari paparan panas atau sinar matahari langsung; jangan dibekukan karena suhu beku dapat memisahkan fase air dan lemak pada krim/emulsi (HKI 2022, Bab IX; Farmakope Indonesia VI).',
      'Setelah pemakaian, bersihkan sisa salep di sekitar ulir mulut tube dengan tisu bersih tanpa menyentuhkan ujung tube ke luka (HKI 2022, Bab XI).',
      'Pastikan tutup tube terpasang rapat guna mencegah oksidasi bahan dasar lemak serta penguapan kandungan air pada sediaan krim (≥ 60% air) dan gel (HKI 2022, Bab IX).'
    ],
    buangRules: [
      'Keluarkan seluruh sisa salep, krim, atau gel dari dalam tube ke dalam kantong plastik atau wadah sekali pakai terpisah (BPOM RI; Kemenkes RI DAGUSIBU).',
      'Campurkan massa salep/krim dengan bahan tidak menarik (tanah, pasir kucing, atau ampas kopi) lalu ikat rapat kantong plastik sebelum dibuang ke tempat sampah.',
      'Gunting, lipat, atau pipihkan badan tube plastik/aluminium dan rusak label komposisi agar kemasan tidak dapat diisi ulang oleh pihak tidak bertanggung jawab (BPOM RI).'
    ],
    catatanPenting: 'Waspadai tanda kerusakan sediaan semipadat seperti pemisahan lapisan minyak dan air, tekstur berair encer atau mengeras/mengerak, perubahan warna, maupun bau tengik akibat oksidasi dasar salep (HKI 2022, Bab IX).'
  },
  {
    sediaan: 'Tetes Mata / Telinga',
    title: 'Obat Tetes Mata & Telinga',
    simpanRules: [
      'Perhatikan batas Beyond Use Date (BUD) steril: sediaan tetes mata botol multidose umumnya hanya boleh dipakai maksimal 28 hari setelah segel pertama kali dibuka (atau sesuai petunjuk kemasan), meskipun tanggal Expired Date pabrik masih panjang (USP <797>; Kemenkes RI).',
      'Jaga sterilitas dengan tidak menyentuhkan ujung penetes (dropper) ke jari tangan, kelopak mata, bulu mata, atau liang telinga saat meneteskan obat (HKI 2022, Bab XI: Cara Pemberian Obat Tetes Mata & Telinga).',
      'Simpan botol dalam posisi tegak dengan tutup rapat sesuai suhu anjuran—beberapa tetes mata tertentu wajib disimpan di lemari pendingin (2–8°C, bukan freezer) sebelum atau sesudah dibuka (Farmakope Indonesia VI; BPOM RI).'
    ],
    buangRules: [
      'Tuang sisa cairan tetes mata atau telinga ke saluran pembuangan atau campur dengan bahan penyerap inert dalam wadah tertutup sesuai kategori obatnya (BPOM RI; Kemenkes RI DAGUSIBU).',
      'Lepaskan bagian penetes, rusak botol plastik/kaca dan tutupnya, serta sobek label kemasan agar tidak dapat digunakan kembali (Kemenkes RI).',
      'Buang botol dan tutup yang telah dirusak ke tempat sampah rumah tangga dalam kondisi terbungkus aman.'
    ],
    catatanPenting: 'Pemakaian tetes mata yang telah melewati masa BUD (> 28 hari setelah dibuka) berisiko tinggi terkontaminasi bakteri atau jamur sehingga dapat memicu infeksi mata serius hingga ancaman gangguan penglihatan (HKI 2022, Bab IX & XI; FKUI Ed. 4, Bab 39).'
  }
];
