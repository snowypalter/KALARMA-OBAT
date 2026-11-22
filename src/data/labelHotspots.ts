import { PackagingData } from '../types';

export const PACKAGING_ITEMS: Record<string, PackagingData> = {
  tablet: {
    type: 'tablet',
    title: 'Strip / Blister Tablet',
    subtitle: 'Simulasi kemasan primer & sekunder sediaan padat',
    hotspots: [
      {
        id: 1,
        number: 1,
        title: 'Logo Golongan Obat',
        shortDescription: 'Tanda lingkaran penanda tingkat keamanan dan izin perolehan obat.',
        xPercent: 18,
        yPercent: 18,
        content: {
          meaning: 'Penandaan resmi golongan obat pada kemasan sesuai Permenkes RI: lingkaran hijau bergaris tepi hitam menandakan Obat Bebas (dapat dibeli tanpa resep untuk keluhan ringan); lingkaran biru menandakan Obat Bebas Terbatas / Daftar W (disertai tanda peringatan P.No. 1–6); dan lingkaran merah bertuliskan huruf K hitam menandakan Obat Keras / Daftar G (Buku Ajar Farmakologi HKI 2022, Bab VII: Penggolongan Jenis Obat).',
          tips: 'Sebelum membeli obat di apotek atau toko obat berizin, periksa warna lingkaran pada pojok kemasan. Obat Bebas Terbatas wajib dibeli dalam kemasan asli pabrik beserta kotak peringatan hitam berukuran 5 x 2 cm.',
          warning: 'Obat Keras berlogo lingkaran merah huruf K (seperti antibiotik, antihipertensi, antidiabetik, atau kortikosteroid) hanya boleh diperoleh dengan resep dokter di apotek—kecuali obat tertentu dalam daftar Obat Wajib Apotek (OWA) yang diserahkan langsung oleh apoteker (HKI 2022, Bab VII).'
        }
      },
      {
        id: 2,
        number: 2,
        title: 'Nama & Komposisi Zat Aktif',
        shortDescription: 'Nama dagang/generik dan jumlah zat aktif per tablet.',
        xPercent: 50,
        yPercent: 28,
        content: {
          meaning: 'Menunjukkan identitas kimia zat berkhasiat (nama generik/INN) beserta takaran kekuatannya per satuan tablet (misalnya Parasetamol 500 mg) dan bahan tambahan pengisi, pengikat, atau penghancur tablet (HKI 2022, Bab IX: Bentuk Sediaan Obat & Bab XI: Cara Pemberian Obat).',
          tips: 'Selalu baca nama zat aktif di bawah nama merek dagang! Obat dengan merek berbeda sering kali mengandung zat aktif generik yang sama persis. Pastikan juga melihat bobot per tablet (misalnya 250 mg vs 500 mg) sebelum diminum.',
          warning: 'Mengonsumsi dua obat bermerek berbeda yang ternyata sama-sama mengandung parasetamol atau AINS berisiko menyebabkan duplikasi dosis dan toksisitas organ hati maupun ginjal (Farmakologi dan Terapi Ed. 4 FKUI, Bab 52: Dasar Toksikologi & Bab 54: Interaksi Obat).'
        }
      },
      {
        id: 3,
        number: 3,
        title: 'Indikasi (Kegunaan)',
        shortDescription: 'Kondisi atau gejala medis yang telah disetujui untuk diobati.',
        xPercent: 50,
        yPercent: 46,
        content: {
          meaning: 'Keterangan khasiat farmakoterapi obat yang telah dibuktikan secara ilmiah melalui uji klinis untuk meredakan, mengobati, atau mencegah gejala tertentu—misalnya analgesik-antipiretik untuk nyeri ringan dan demam (HKI 2022, Bab I & Bab IV; Farmakologi dan Terapi Ed. 4 FKUI, Bab 1 & Bab 15).',
          tips: 'Cocokkan gejala yang dialami dengan indikasi resmi pada etiket atau brosur obat. Jika obat ditujukan hanya untuk gejala tertentu (misalnya penurun demam), jangan diminum untuk keluhan lain yang tidak sesuai.',
          warning: 'Pemakaian obat di luar indikasi resmi—terutama penggunaan antibiotik pada infeksi virus seperti flu biasa—tidak akan menyembuhkan dan justru memicu kegagalan terapi serta resistensi mikroba (Farmakologi dan Terapi Ed. 4 FKUI, Bab 39: Pengantar Antimikroba).'
        }
      },
      {
        id: 4,
        number: 4,
        title: 'Aturan Pakai & Peringatan',
        shortDescription: 'Frekuensi minum, hubungan dengan waktu makan, dan kontraindikasi.',
        xPercent: 50,
        yPercent: 64,
        content: {
          meaning: 'Pedoman posologi mencakup dosis sekali pakai, frekuensi/interval jam (misalnya 3 kali sehari = setiap 8 jam untuk menjaga kadar obat stabil di plasma), rute pemberian (oral ditelan, sublingual di bawah lidah, bukal di pipi), serta hubungan dengan makanan (HKI 2022, Bab VIII & Bab XI).',
          tips: 'Perhatikan apakah tablet harus diminum sebelum makan (1 jam sebelum makan agar absorpsi optimal, misalnya antasida atau antibiotik tertentu) atau sesudah makan untuk mencegah iritasi lambung (seperti asam mefenamat/AINS). Minumlah tablet dengan air putih, bukan susu jika terdapat peringatan interaksi kalsium (HKI 2022, Bab XI).',
          warning: 'Jangan menggerus atau membelah tablet salut selaput/lepas lambat tanpa arahan apoteker, dan perhatikan peringatan kontraindikasi bagi penderita tukak lambung, ibu hamil, gangguan hati, atau gangguan ginjal (Farmakologi dan Terapi Ed. 4 FKUI, Bab 1, Bab 54, & Bab 56).'
        }
      },
      {
        id: 5,
        number: 5,
        title: 'Tanggal Kedaluwarsa & No. Bets',
        shortDescription: 'Batas akhir obat dijamin mutu dan keamanannya (Exp. Date).',
        xPercent: 82,
        yPercent: 82,
        content: {
          meaning: 'Expired Date (ED) adalah batas waktu terakhir jaminan stabilitas, potensi, dan keamanan obat dalam kemasan asli pabrik yang belum rusak/terbuka, sedangkan Nomor Bets adalah kode identitas siklus produksi untuk penelusuran mutu atau penarikan produk (HKI 2022, Bab VIII & Bab XI; BPOM RI).',
          tips: 'Periksa cetakan tekan (emboss) atau tinta pada ujung lipatan strip atau blister tablet sebelum menelan obat. Jika kemasan strip tergunting dan tanggal ED terpotong tidak terbaca, jangan ragu menanyakan kepada apoteker atau memisahkan obat.',
          warning: 'Jangan pernah mengonsumsi obat yang telah melewati tanggal kedaluwarsa karena kadar zat aktif dapat menurun atau terurai menjadi senyawa toksik—seperti produk degradasi tetrasiklin berwarna cokelat yang berbahaya bagi ginjal (Farmakologi dan Terapi Ed. 4 FKUI, Bab 52: Dasar Toksikologi).'
        }
      },
      {
        id: 6,
        number: 6,
        title: 'Nomor Izin Edar (NIE BPOM)',
        shortDescription: 'Kode resmi 15 digit bukti obat terdaftar di BPOM RI.',
        xPercent: 25,
        yPercent: 82,
        content: {
          meaning: 'Kode registrasi 15 digit (huruf dan angka) dari BPOM RI yang menjamin obat telah dinilai mutu, khasiat, dan keamanannya. Tiga huruf awal menunjukkan kategori: DBL (Dagang Bebas Lokal), DTL (Dagang Bebas Terbatas Lokal), DKL (Dagang Keras Lokal), atau GBL/GTL/GKL untuk obat generik (BPOM RI; HKI 2022, Bab I).',
          tips: 'Verifikasi keaslian 15 digit NIE beserta nama produk dan pabrik pembuatnya melalui aplikasi resmi BPOM Mobile atau laman Cek BPOM sebelum digunakan.',
          warning: 'Hindari membeli atau mengonsumsi obat yang tidak mencantumkan Nomor Izin Edar BPOM maupun kemasan yang segelnya rusak karena berisiko merupakan produk ilegal, palsu, atau mengandung bahan kimia berbahaya tanpa pengawasan (HKI 2022, Bab I & Farmakologi dan Terapi Ed. 4 FKUI, Bab 52).'
        }
      }
    ]
  },
  sirup: {
    type: 'sirup',
    title: 'Botol Sirup / Suspensi',
    subtitle: 'Simulasi kemasan sediaan cair obat minum',
    hotspots: [
      {
        id: 1,
        number: 1,
        title: 'Logo Golongan Obat',
        shortDescription: 'Tanda lingkaran golongan obat pada label badan botol.',
        xPercent: 28,
        yPercent: 32,
        content: {
          meaning: 'Lingkaran berwarna pada label badan botol sirup menunjukkan status legalitas perolehan obat: Hijau untuk Obat Bebas, Biru untuk Obat Bebas Terbatas (Daftar W dengan kotak peringatan hitam P.No. 1–6), dan Merah huruf K untuk Obat Keras seperti sirup kering antibiotik (HKI 2022, Bab VII: Penggolongan Jenis Obat).',
          tips: 'Sirup batuk/flu bebas terbatas sering membawa peringatan P.No. 1 ("Awas! Obat Keras. Bacalah aturan memakainya"). Pastikan melihat logo golongan dan baca aturan pakai pada label botol maupun dus.',
          warning: 'Sirup kering antibiotik berlogo lingkaran merah huruf K hanya boleh digunakan sesuai resep dokter dan wajib dihabiskan sesuai durasi terapi untuk mencegah resistensi bakteri (Farmakologi dan Terapi Ed. 4 FKUI, Bab 39: Pengantar Antimikroba).'
        }
      },
      {
        id: 2,
        number: 2,
        title: 'Nama & Konsentrasi per Sendok (5 mL)',
        shortDescription: 'Contoh: Tiap 5 mL mengandung zat aktif ... mg.',
        xPercent: 52,
        yPercent: 42,
        content: {
          meaning: 'Menyatakan kekuatan kadar zat berkhasiat yang terlarut atau terdispersi dalam setiap 5 mililiter cairan (satu sendok takar obat standar), sebagaimana dijelaskan pada pengelompokan sediaan cair seperti sirup, eliksir, dan suspensi (HKI 2022, Bab IX: Bentuk Sediaan Obat).',
          tips: 'Selalu ukur obat cair menggunakan sendok takar berskala, gelas takar, atau pipet/spuit oral bawaan kemasan. Pegang wadah takar sejajar pandangan mata dan pastikan permukaan cairan berada tepat pada garis dasar meniskus sesuai takaran (HKI 2022, Bab XI: Cara Pemberian Obat).',
          warning: 'Jangan menggunakan sendok makan atau sendok teh dapur karena volumenya tidak seragam (sendok makan dapur berkisar 10–15 mL) sehingga berisiko menyebabkan kekurangan dosis atau kelebihan dosis berbahaya, terutama pada anak-anak (HKI 2022, Bab VIII & Bab XI).'
        }
      },
      {
        id: 3,
        number: 3,
        title: 'Indikasi & Peruntukan Usia',
        shortDescription: 'Kegunaan obat dan batasan usia yang diperbolehkan.',
        xPercent: 52,
        yPercent: 54,
        content: {
          meaning: 'Menjelaskan gejala yang ditangani oleh sirup serta rentang usia atau berat badan sasaran. Anak-anak bukan "orang dewasa mini" karena fungsi metabolisme hati, ekskresi ginjal, dan distribusi cairan tubuhnya berbeda (Farmakologi dan Terapi Ed. 4 FKUI, Bab 56: Faktor-Faktor yang Mempengaruhi Respons Penderita Terhadap Obat).',
          tips: 'Cocokkan usia pasien dengan tabel aturan pakai di kemasan dan perhatikan apakah sediaan ditujukan khusus untuk bayi (drops/guttae), anak, atau dewasa. Jika berat badan anak jauh di luar rata-rata usianya, konsultasikan kepada apoteker atau dokter.',
          warning: 'Pemberian obat bebas atau bebas terbatas pada bayi di bawah usia 2 tahun tidak boleh dilakukan sembarangan tanpa konsultasi dokter karena risiko toksisitas organ yang belum matang (Farmakologi dan Terapi Ed. 4 FKUI, Bab 56 & HKI 2022, Bab V).'
        }
      },
      {
        id: 4,
        number: 4,
        title: 'Instruksi Khusus: "Kocok Dahulu"',
        shortDescription: 'Pentingnya homogenisasi larutan sebelum diminum.',
        xPercent: 52,
        yPercent: 66,
        content: {
          meaning: 'Pada sediaan suspensi dan emulsi, bahan obat padat halus yang tidak larut terdispersi di dalam cairan pembawa dan cenderung mengendap saat disimpan. Mengocok botol secara perlahan bertujuan mendispersikan kembali endapan agar campuran kembali seragam/homogen sebelum dituang (HKI 2022, Bab IX: Bentuk Sediaan Obat & Bab XI).',
          tips: 'Kocok botol secara perlahan selama beberapa detik sebelum membuka tutup, pegang label botol menghadap telapak tangan saat menuang agar label tidak kotor, lalu bersihkan bibir botol sebelum menutup kembali (HKI 2022, Bab XI: Cara Pemberian Obat).',
          warning: 'Jika suspensi tidak dikocok dahulu, takaran pertama dari bagian atas botol hanya berisi cairan pembawa dengan dosis terlalu rendah (terapi gagal), sedangkan sisa cairan di dasar botol menjadi sangat pekat dan berisiko overdosis (HKI 2022, Bab IX).'
        }
      },
      {
        id: 5,
        number: 5,
        title: 'Batas Simpan Setelah Dibuka (BUD)',
        shortDescription: 'Beyond Use Date: batas waktu pakai setelah segel botol dibuka.',
        xPercent: 72,
        yPercent: 78,
        content: {
          meaning: 'Expired Date (ED) hanya berlaku selama segel botol belum dibuka. Setelah dibuka atau direkonstitusi dengan air (sirup kering), masa simpan aman turun menjadi Beyond Use Date (BUD)—misalnya sirup kering antibiotik umumnya hanya stabil 7–14 hari setelah dilarutkan (USP <795>; Kemenkes RI; HKI 2022, Bab VIII).',
          tips: 'Biasakan menulis tanggal pertama kali botol dibuka atau tanggal pencampuran air menggunakan spidol permanen langsung pada label botol, lalu pantau di fitur Lemari Obat Saya.',
          warning: 'Segera hentikan pemakaian dan buang sesuai prosedur DAGUSIBU apabila cairan berubah warna, menjadi keruh tidak wajar, berbau asam/menyimpang, menggumpal yang tak terdispersi saat dikocok, atau muncul kristal/jamur (HKI 2022, Bab IX & BPOM RI).'
        }
      },
      {
        id: 6,
        number: 6,
        title: 'Nomor Izin Edar (NIE BPOM)',
        shortDescription: 'Kode registrasi resmi izin edar cairan obat dalam negeri.',
        xPercent: 32,
        yPercent: 78,
        content: {
          meaning: 'Nomor registrasi 15 digit dari BPOM RI pada label botol yang memastikan formula, pelarut, takaran zat aktif, dan mutu sediaan cair telah memenuhi persyaratan izin edar resmi di Indonesia (BPOM RI).',
          tips: 'Pastikan segel tutup botol masih utuh saat dibeli, kemudian cek kode NIE 15 digit dan nomor bets melalui aplikasi Cek BPOM untuk memastikan produk asli dan tidak termasuk dalam daftar penarikan (recall).',
          warning: 'Waspadai produk sirup tanpa NIE resmi, tanpa segel pelindung, atau berlabel kabur yang tidak mencantumkan komposisi pelarut dan zat aktif secara jelas karena berisiko tinggi menimbulkan keracunan (Farmakologi dan Terapi Ed. 4 FKUI, Bab 52 & HKI 2022, Bab V).'
        }
      }
    ]
  },
  salep: {
    type: 'salep',
    title: 'Tube Salep / Krim',
    subtitle: 'Simulasi kemasan sediaan semipadat obat luar',
    hotspots: [
      {
        id: 1,
        number: 1,
        title: 'Peringatan: "Obat Luar - Tidak Untuk Ditelan"',
        shortDescription: 'Tanda khusus dan rute pemberian topikal/kulit.',
        xPercent: 20,
        yPercent: 42,
        content: {
          meaning: 'Salep, krim, pasta, dan gel adalah sediaan semipadat untuk pemakaian topikal pada kulit atau membran mukosa. Kemasan obat luar wajib mencantumkan peringatan "OBAT LUAR" dan sering disertai kotak peringatan hitam P.No. 3 ("Awas! Obat Keras. Hanya untuk bagian luar dari badan") (HKI 2022, Bab VII & Bab IX).',
          tips: 'Bedakan sediaan topikal kulit dari salep mata steril atau obat oral. Simpan tube salep terpisah dari obat minum agar tidak tertukar di rumah tangga.',
          warning: 'Jangan pernah menelan sediaan topikal atau mengoleskannya ke area selaput lendir (mata, mulut, hidung, luka terbuka dalam) kecuali produk tersebut memang diformulasikan dan diindikasikan khusus untuk area tersebut (HKI 2022, Bab XI; Farmakologi dan Terapi Ed. 4 FKUI, Bab 34: Obat Lokal).'
        }
      },
      {
        id: 2,
        number: 2,
        title: 'Nama Zat Aktif & Persentase (%)',
        shortDescription: 'Contoh: Hidrokortison 1% atau Ketokonazol 2%.',
        xPercent: 44,
        yPercent: 42,
        content: {
          meaning: 'Menunjukkan jenis bahan obat yang larut atau terdispersi homogen dalam dasar salep/krim beserta persentase kekuatannya—misalnya salep Hidrokortison 1% untuk peradangan kulit atau antijamur topikal untuk infeksi dermatofit (HKI 2022, Bab IX; Farmakologi dan Terapi Ed. 4 FKUI, Bab 33 & Bab 38).',
          tips: 'Perhatikan kadar persentase (%) dan jenis basisnya: salep (berbasis lemak/vaselin) lebih oklusif untuk kulit kering bersisik, sedangkan krim (emulsi dengan kadar air ≥ 60%) lebih ringan dan mudah dicuci untuk area lembap (HKI 2022, Bab IX).',
          warning: 'Kortikosteroid topikal (seperti hidrokortison, betametason, atau klobetasol) memiliki potensi berbeda-beda; pemakaian jangka panjang atau penutupan plastik oklusif dapat memperbesar absorpsi sistemik dan memicu efek samping lokal maupun sistemik (Farmakologi dan Terapi Ed. 4 FKUI, Bab 33).'
        }
      },
      {
        id: 3,
        number: 3,
        title: 'Indikasi Masalah Kulit',
        shortDescription: 'Kondisi kulit spesifik: gatal alergi, infeksi jamur, atau luka luar.',
        xPercent: 62,
        yPercent: 42,
        content: {
          meaning: 'Penyakit kulit memiliki penyebab yang berbeda: radang/alergi non-infeksi (diatasi antiinflamasi/kortikosteroid ringan), infeksi jamur kulit/kurap (memerlukan antijamur seperti ketokonazol atau mikonazol), dan infeksi bakteri (memerlukan antibakteri topikal) (Farmakologi dan Terapi Ed. 4 FKUI, Bab 33, Bab 34, & Bab 38: Obat Jamur).',
          tips: 'Jangan menyamaratakan semua "gatal kulit". Bila gatal berupa ruam melingkar berbatas tegas di lipatan tubuh yang lembap (dugaan infeksi jamur), konsultasikan ke apoteker atau dokter sebelum memilih salep.',
          warning: 'Mengoleskan salep kortikosteroid pada infeksi jamur kulit justru menekan sistem imun lokal, memperluas infeksi jamur (tinea incognito), serta berisiko menyebabkan penipisan kulit (atrofi) dan iritasi bila digunakan berkepanjangan (Farmakologi dan Terapi Ed. 4 FKUI, Bab 33 & Bab 38).'
        }
      },
      {
        id: 4,
        number: 4,
        title: 'Cara Pengolesan & Higienitas',
        shortDescription: 'Cuci tangan sebelum & sesudah, oleskan tipis merata.',
        xPercent: 78,
        yPercent: 42,
        content: {
          meaning: 'Prosedur aplikasi obat topikal yang benar meliputi mencuci tangan sebelum dan sesudah mengoles, membersihkan area kulit yang sakit dari kotoran/kerak lalu mengeringkannya, kemudian mengoleskan salep atau krim tipis merata sesuai petunjuk (HKI 2022, Bab XI: Cara Pemberian Obat).',
          tips: 'Gunakan ujung jari bersih atau aplikator berujung kapas/kasa steril saat mengoleskan obat, lalu segera bersihkan ujung leher tube sebelum menutupnya rapat kembali.',
          warning: 'Hindari menyentuhkan ujung mulut tube langsung ke permukaan kulit yang luka, bernanah, atau terinfeksi agar bakteri/jamur tidak masuk mengontaminasi isi salep di dalam tube (HKI 2022, Bab XI).'
        }
      },
      {
        id: 5,
        number: 5,
        title: 'Kedaluwarsa & Segel Lipatan Tube',
        shortDescription: 'Tanggal kedaluwarsa sering dicetak tekan pada lipatan belakang tube.',
        xPercent: 92,
        yPercent: 42,
        content: {
          meaning: 'Pada kemasan tube logam aluminium maupun plastik, Tanggal Kedaluwarsa (ED) dan Nomor Bets umumnya dicetak tekan (crimping/emboss) pada ujung lipatan belakang tube. Masa pakai setelah segel dibuka (BUD) sediaan semipadat umumnya lebih singkat daripada ED (BPOM RI; USP <795>).',
          tips: 'Biasakan memeriksa ujung lipatan belakang tube dan pastikan tutupan ulir selalu tertutup rapat setelah dipakai agar basis krim/salep tidak teroksidasi atau mengering (HKI 2022, Bab IX).',
          warning: 'Jangan gunakan salep atau krim apabila terjadi pemisahan fase air dan minyak (pecah emulsi), berubah warna menjadi kecokelatan, berbau tengik, atau bertekstur kasar/berpasir karena stabilitas sediaan sudah rusak (HKI 2022, Bab IX & BPOM RI).'
        }
      },
      {
        id: 6,
        number: 6,
        title: 'Nomor Izin Edar & Logo Golongan',
        shortDescription: 'Kode NIE dan tanda lingkaran (Hijau, Biru, atau Merah K).',
        xPercent: 32,
        yPercent: 65,
        content: {
          meaning: 'Menunjukkan apakah sediaan topikal termasuk Obat Bebas, Bebas Terbatas (misalnya antiseptik/antijamur tertentu), atau Obat Keras (misalnya salep antibiotik dan kortikosteroid potensi sedang-tinggi), lengkap dengan 15 digit Nomor Izin Edar resmi BPOM RI (HKI 2022, Bab VII; BPOM RI).',
          tips: 'Cocokkan 15 digit NIE pada badan tube dan dus luar melalui aplikasi Cek BPOM agar terhindar dari produk palsu.',
          warning: 'Waspadai krim atau salep racikan tanpa label jelas, tanpa komposisi zat aktif, dan tanpa NIE BPOM—sering kali produk ilegal mengandung kortikosteroid keras tersembunyi atau logam berat berbahaya yang merusak kulit dan organ tubuh (Farmakologi dan Terapi Ed. 4 FKUI, Bab 52 & Bab 53).'
        }
      }
    ]
  }
};
