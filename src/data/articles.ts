import type { Article, Author } from "./types";

const redaksi: Author = {
  name: "Tim Redaksi Genesis",
  role: "Editorial",
  initials: "GN",
};

const riset: Author = {
  name: "Genesis Research",
  role: "Riset & Data",
  initials: "GR",
};

export const articles: Article[] = [
  {
    slug: "cz-prediksi-ai-agents-tangani-pembayaran-crypto",
    title: "CZ prediksi AI agents segera tangani",
    accent: "pembayaran crypto",
    deck: "Pendiri Binance itu bilang agen AI akan jadi pengguna terbesar stablecoin — bukan manusia. Terdengar liar, tapi arsitekturnya sudah ada.",
    category: "crypto",
    series: "chain-horizon",
    cover: "/media/cz-ai-agents.webp",
    coverThumb: "/media/cz-ai-agents-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-24",
    readingMinutes: 5,
    author: redaksi,
    tags: ["AI", "Stablecoin", "Binance", "Payments"],
    featured: true,
    body: [
      {
        type: "p",
        text: "Changpeng Zhao punya satu tesis yang dia ulang terus belakangan ini: dalam beberapa tahun ke depan, sebagian besar transaksi crypto tidak akan dijalankan oleh manusia yang membuka aplikasi, tapi oleh software yang bertransaksi atas nama manusia.",
      },
      {
        type: "p",
        text: "Kedengarannya seperti jargon konferensi. Tapi kalau kamu lihat dari sisi infrastruktur, argumennya cukup membosankan — dan justru itu yang bikin masuk akal.",
      },
      { type: "h2", text: "Kenapa agen AI butuh rel yang beda" },
      {
        type: "p",
        text: "Sistem pembayaran yang kita pakai sekarang dibangun dengan asumsi ada manusia di ujungnya. Ada verifikasi identitas, ada limit harian, ada jam kerja bank, ada minimum transaksi yang bikin bayar Rp500 jadi tidak masuk akal karena biaya kliringnya lebih mahal dari nilai yang dikirim.",
      },
      {
        type: "p",
        text: "Agen AI bekerja dengan pola yang berlawanan: transaksinya sangat kecil, sangat sering, dan berjalan 24 jam tanpa peduli hari libur. Sebuah agen yang membeli akses data per permintaan bisa melakukan ribuan pembayaran mikro dalam sehari.",
      },
      {
        type: "quote",
        text: "Manusia bertransaksi puluhan kali sebulan. Agen bisa bertransaksi puluhan kali per menit. Itu dua kebutuhan infrastruktur yang sama sekali berbeda.",
      },
      {
        type: "p",
        text: "Di titik itu stablecoin punya keunggulan struktural yang sulit dilawan: settlement final dalam hitungan detik, biaya yang bisa turun ke pecahan sen, dan yang paling penting — akun bisa dibuat secara programatik tanpa perlu cabang bank.",
      },
      { type: "h2", text: "Yang sudah jalan, dan yang masih jauh" },
      {
        type: "list",
        items: [
          "Standar pembayaran agen-ke-agen sudah mulai muncul, tapi belum ada yang benar-benar jadi default industri.",
          "Volume stablecoin untuk settlement bisnis naik konsisten, meski mayoritas masih perdagangan, bukan pembayaran riil.",
          "Bagian tersulit bukan teknologi, tapi pertanggungjawaban: kalau agen salah kirim dana, siapa yang menanggung?",
        ],
      },
      {
        type: "p",
        text: "Pertanyaan terakhir itu yang belum punya jawaban rapi. Dan biasanya, di situlah regulasi masuk lebih dulu sebelum adopsi massal terjadi.",
      },
      { type: "h2", text: "Apa artinya buat kamu" },
      {
        type: "p",
        text: "Kalau kamu investor ritel, ini bukan sinyal untuk beli sesuatu besok pagi. Ini sinyal soal ke mana perhatian modal bergerak: dari spekulasi harga token ke infrastruktur yang menghasilkan biaya transaksi berulang.",
      },
      {
        type: "p",
        text: "Narasi yang tahan lama biasanya tumbuh di lapisan yang membosankan. Rel pembayaran adalah salah satu lapisan paling membosankan yang ada — dan itu justru poinnya.",
      },
    ],
  },

  {
    slug: "msci-umumkan-status-indonesia",
    title: "MSCI umumkan status RI bulan ini, dan",
    accent: "taruhannya besar",
    deck: "Hasil review keluar 24 Juni. Keputusannya menentukan apakah Indonesia tetap masuk kategori Emerging Market — dan berapa banyak dana asing yang wajib memegang saham kita.",
    category: "saham",
    series: "equity-voyage",
    cover: "/media/msci-status-ri.webp",
    coverThumb: "/media/msci-status-ri-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-21",
    readingMinutes: 6,
    author: riset,
    tags: ["MSCI", "IHSG", "Emerging Market", "Fund Flow"],
    featured: true,
    body: [
      {
        type: "p",
        text: "Sebagian besar orang tidak pernah dengar nama MSCI. Tapi kalau kamu pegang reksa dana saham atau ETF, keputusan lembaga ini pelan-pelan menentukan berapa banyak uang asing yang mendarat di Bursa Efek Indonesia.",
      },
      { type: "h2", text: "Apa yang sebenarnya dilakukan MSCI" },
      {
        type: "p",
        text: "MSCI menyusun indeks. Indeks itu dipakai ribuan manajer investasi global sebagai tolok ukur. Sebagian besar dari mereka mengelola dana pasif — artinya mereka wajib membeli saham dengan komposisi yang sama persis seperti indeks.",
      },
      {
        type: "p",
        text: "Kalau bobot Indonesia di indeks naik, dana pasif itu harus membeli saham Indonesia. Bukan karena mereka suka fundamentalnya, tapi karena mandat mereka mengharuskan.",
      },
      {
        type: "stat",
        value: "24 Juni",
        label: "Tanggal pengumuman hasil review",
        note: "Klasifikasi pasar ditinjau setahun sekali",
      },
      { type: "h2", text: "Tiga kelas, tiga konsekuensi" },
      {
        type: "list",
        items: [
          "Developed Market — pasar maju, likuiditas dalam, akses asing bebas.",
          "Emerging Market — posisi Indonesia sekarang; dana global masih wajib punya alokasi.",
          "Frontier Market — kelas di bawahnya, dengan kolam dana yang jauh lebih kecil.",
        ],
      },
      {
        type: "p",
        text: "Turun kelas bukan sekadar soal gengsi. Itu berarti sebagian dana yang selama ini otomatis masuk akan otomatis keluar, tanpa ada yang menekan tombol jual karena alasan fundamental.",
      },
      {
        type: "quote",
        text: "Aliran dana pasif tidak peduli valuasi. Dia hanya peduli apakah namamu ada di daftar.",
      },
      { type: "h2", text: "Kriteria yang dinilai" },
      {
        type: "p",
        text: "MSCI menilai tiga hal: ukuran dan likuiditas pasar, keterbukaan bagi investor asing, serta stabilitas kerangka operasional — mulai dari kemudahan buka rekening, konvertibilitas mata uang, sampai mekanisme settlement.",
      },
      {
        type: "p",
        text: "Kritik yang berulang untuk Indonesia biasanya jatuh di poin ketiga, terutama soal seberapa mudah dana asing masuk dan keluar tanpa gesekan.",
      },
      { type: "h2", text: "Yang perlu kamu perhatikan" },
      {
        type: "p",
        text: "Jangan menaruh posisi besar hanya dengan menebak hasil review. Yang lebih berguna adalah memperhatikan reaksi setelahnya: apakah dana asing benar-benar bergerak, dan apakah volume di saham berkapitalisasi besar berubah dalam beberapa hari sesudah pengumuman.",
      },
    ],
  },

  {
    slug: "saham-global-kini-bisa-on-chain",
    title: "Saham global kini bisa",
    accent: "on-chain?",
    deck: "Tokenized stocks membuat saham Amerika bisa diperdagangkan lewat blockchain. Ini penjelasan jujurnya — termasuk bagian yang jarang dibahas.",
    category: "crypto",
    series: "chain-horizon",
    cover: "/media/saham-global-onchain.webp",
    coverThumb: "/media/saham-global-onchain-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-18",
    readingMinutes: 7,
    author: redaksi,
    tags: ["Tokenized Stocks", "RWA", "Regulasi"],
    featured: true,
    body: [
      {
        type: "p",
        text: "Selama puluhan tahun, membeli saham Nvidia dari Jakarta berarti melewati rantai panjang: broker lokal, broker luar, kustodian, kliring, lalu bursa. Setiap lapisan menambah biaya dan jam operasional.",
      },
      {
        type: "p",
        text: "Tokenized stocks memangkas rantai itu dengan cara yang sederhana secara konsep: sebuah lembaga membeli saham aslinya, menyimpannya, lalu menerbitkan token di blockchain yang nilainya mengikuti saham tersebut.",
      },
      { type: "h2", text: "Yang kamu dapat, dan yang tidak" },
      {
        type: "p",
        text: "Yang kamu dapat: eksposur harga, akses hampir 24 jam, dan ukuran pembelian yang bisa sangat kecil. Kamu bisa punya pecahan saham senilai seratus ribu rupiah tanpa perlu membeli satu lembar penuh.",
      },
      {
        type: "p",
        text: "Yang biasanya tidak kamu dapat: hak suara sebagai pemegang saham. Secara hukum kamu memegang klaim terhadap penerbit token, bukan saham itu sendiri.",
      },
      {
        type: "quote",
        text: "Bedanya tipis tapi penting — kamu memegang janji dari sebuah lembaga, bukan lembar saham atas namamu.",
      },
      { type: "h2", text: "Risiko yang jarang ditulis besar-besar" },
      {
        type: "list",
        items: [
          "Risiko penerbit: kalau lembaga yang menyimpan saham aslinya bermasalah, tokenmu ikut bermasalah.",
          "Likuiditas tipis di jam pasar tutup — harga bisa melar jauh dari harga wajar.",
          "Status regulasi yang berbeda-beda antarnegara, dan bisa berubah.",
        ],
      },
      {
        type: "p",
        text: "Itu bukan alasan untuk menghindari sepenuhnya. Itu alasan untuk tahu persis apa yang kamu pegang sebelum menaruh uang di dalamnya.",
      },
      { type: "h2", text: "Kenapa ini tetap menarik" },
      {
        type: "p",
        text: "Karena hambatan terbesar investor Indonesia untuk memiliki aset global selama ini bukan minat, tapi biaya masuk. Kalau tokenisasi menekan biaya itu sampai mendekati nol, komposisi portofolio ritel Indonesia bisa berubah dalam satu dekade ke depan.",
      },
    ],
  },

  {
    slug: "elon-musk-kehilangan-200-miliar-dolar",
    title: "Elon Musk kehilangan $200 miliar",
    accent: "dalam 2 hari",
    deck: "Dari $1,4 triliun ke $1,2 triliun. Angkanya bikin pusing, tapi cara kekayaan itu dihitung jauh lebih menarik daripada angkanya sendiri.",
    category: "saham",
    series: "equity-voyage",
    cover: "/media/elon-musk-200-miliar.webp",
    coverThumb: "/media/elon-musk-200-miliar-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-15",
    readingMinutes: 4,
    author: redaksi,
    tags: ["Tesla", "Kekayaan", "Valuasi"],
    body: [
      {
        type: "p",
        text: "Judul seperti ini muncul beberapa kali setahun, dan hampir selalu disalahpahami. Musk tidak kehilangan $200 miliar dari rekening banknya. Dia tidak punya $200 miliar di rekening bank.",
      },
      { type: "h2", text: "Kekayaan di atas kertas" },
      {
        type: "p",
        text: "Sebagian besar kekayaannya adalah saham. Nilainya dihitung dengan mengalikan jumlah lembar yang dia pegang dengan harga penutupan hari itu. Harga bergerak, angka kekayaan ikut bergerak — tanpa ada satu transaksi pun terjadi.",
      },
      {
        type: "stat",
        value: "−$200 M",
        label: "Perubahan nilai kekayaan dalam 48 jam",
        note: "Dari sekitar $1,4 triliun ke $1,2 triliun",
      },
      {
        type: "p",
        text: "Kalau harga saham naik lagi minggu depan, angka itu kembali. Media akan menulis 'Musk menambah $200 miliar' dengan antusiasme yang sama.",
      },
      { type: "h2", text: "Pelajaran yang benar-benar berlaku untukmu" },
      {
        type: "p",
        text: "Konsentrasi memperbesar dua arah sekaligus. Portofolio yang isinya satu aset dominan akan naik lebih cepat saat benar, dan turun lebih dalam saat salah. Musk memilih hidup dengan volatilitas itu karena dia mengendalikan perusahaannya.",
      },
      {
        type: "quote",
        text: "Kamu tidak punya kendali atas perusahaan yang sahamnya kamu beli. Jadi jangan meniru ukuran taruhan orang yang punya.",
      },
      {
        type: "p",
        text: "Ini juga alasan kenapa daftar orang terkaya berubah urutan tiap kuartal. Yang berubah bukan produktivitas mereka, tapi selera risiko pasar.",
      },
    ],
  },

  {
    slug: "apa-itu-tokenized-stocks",
    title: "Apa itu",
    accent: "tokenized stocks?",
    deck: "Penjelasan paling sederhana yang bisa kami tulis, tanpa istilah yang bikin kamu berhenti membaca di paragraf kedua.",
    category: "crypto",
    series: "chain-horizon",
    cover: "/media/apa-itu-tokenized-stocks.webp",
    coverThumb: "/media/apa-itu-tokenized-stocks-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-12",
    readingMinutes: 4,
    author: redaksi,
    tags: ["Edukasi", "Tokenisasi", "Pemula"],
    body: [
      {
        type: "p",
        text: "Tokenized stocks adalah tokenized securities yang merepresentasikan saham global dalam bentuk token di blockchain, sehingga akses ke aset saham menjadi lebih fleksibel dan modern.",
      },
      {
        type: "p",
        text: "Kalimat itu benar, tapi tidak membantu siapa pun yang baru mulai. Jadi mari pakai analogi.",
      },
      { type: "h2", text: "Bayangkan tiket konser" },
      {
        type: "p",
        text: "Sebuah lembaga membeli seribu lembar saham, menaruhnya di brankas, lalu menerbitkan seribu 'tiket' digital. Tiap tiket mewakili satu lembar. Tiket itu bisa kamu beli, jual, dan pecah jadi seperseratus bagian — sesuatu yang tidak bisa dilakukan pada lembar saham fisik.",
      },
      {
        type: "list",
        items: [
          "Harga tiket mengikuti harga saham aslinya.",
          "Tiket bisa berpindah tangan kapan saja, termasuk saat bursa asal sedang tutup.",
          "Tiket tidak memberimu hak suara di rapat pemegang saham.",
        ],
      },
      { type: "h2", text: "Kenapa orang tertarik" },
      {
        type: "p",
        text: "Karena modal awalnya kecil dan jamnya fleksibel. Buat sebagian besar investor muda di Indonesia, dua hal itu lebih menentukan daripada hak suara yang toh tidak akan pernah mereka pakai.",
      },
      {
        type: "p",
        text: "Tapi tetap: pahami siapa penerbitnya, dan pahami bahwa kamu memegang klaim, bukan sertifikat saham.",
      },
    ],
  },

  {
    slug: "lima-tokoh-paling-berpengaruh-industri-kripto",
    title: "5 orang paling berpengaruh di",
    accent: "industri kripto",
    deck: "Dari pendiri exchange, investor awal Bitcoin, sampai tokoh besar di balik perkembangan stablecoin dan adopsi institusional.",
    category: "crypto",
    series: "chain-horizon",
    cover: "/media/tokoh-berpengaruh-kripto.webp",
    coverThumb: "/media/tokoh-berpengaruh-kripto-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-09",
    readingMinutes: 6,
    author: redaksi,
    tags: ["Profil", "Industri", "Sejarah"],
    body: [
      {
        type: "p",
        text: "Industri kripto suka bercerita bahwa ia tidak punya pusat. Kenyataannya, ada sekelompok kecil orang yang keputusannya menggerakkan harga, arah regulasi, dan ke mana modal institusional mengalir.",
      },
      { type: "h2", text: "Pendiri exchange" },
      {
        type: "p",
        text: "Mereka mengendalikan pintu masuk. Aset apa yang bisa diperdagangkan, di pasar mana, dengan likuiditas seberapa dalam — semua ditentukan di lapisan ini. Pengaruhnya sering lebih besar daripada pembuat protokolnya sendiri.",
      },
      { type: "h2", text: "Investor awal Bitcoin" },
      {
        type: "p",
        text: "Kelompok yang masuk sangat awal punya dua kekuatan: modal besar dan kredibilitas naratif. Ketika mereka bicara, sebagian pasar mendengarkan bukan karena analisisnya, tapi karena rekam jejaknya.",
      },
      { type: "h2", text: "Arsitek stablecoin" },
      {
        type: "p",
        text: "Ini bagian yang paling sedikit dibahas dan paling menentukan. Stablecoin adalah lapisan yang membuat perdagangan kripto berfungsi sehari-hari. Siapa yang menerbitkannya, dan aset apa yang menjadi cadangannya, adalah pertanyaan sistemik.",
      },
      { type: "h2", text: "Jembatan ke institusi" },
      {
        type: "p",
        text: "Sosok-sosok yang membawa dana pensiun dan manajer aset besar masuk ke kelas aset ini mengubah profil pembelinya — dari ritel yang emosional ke mandat yang metodis.",
      },
      {
        type: "quote",
        text: "Desentralisasi teknologi tidak otomatis berarti desentralisasi pengaruh.",
      },
      {
        type: "p",
        text: "Memahami siapa yang memegang tuas bukan sinisme. Itu bagian dari membaca pasar dengan jujur.",
      },
    ],
  },

  {
    slug: "pasar-yang-tidak-pernah-tutup",
    title: "Bayangin kamu mau belanja, tapi",
    accent: "tokonya malah tutup",
    deck: "Bursa saham punya jam kerja. Pasar kripto tidak. Perbedaan sederhana ini mengubah cara harga terbentuk — dan cara kamu seharusnya bersikap.",
    category: "crypto",
    series: "chain-horizon",
    cover: "/media/pasar-24-jam.webp",
    coverThumb: "/media/pasar-24-jam-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-06",
    readingMinutes: 5,
    author: redaksi,
    tags: ["Likuiditas", "Jam Pasar", "Psikologi"],
    body: [
      {
        type: "p",
        text: "Bursa Efek Indonesia buka pukul sembilan pagi dan tutup sore hari. Kalau ada kabar besar jam sebelas malam, kamu hanya bisa menunggu sampai besok pagi.",
      },
      {
        type: "p",
        text: "Menunggu itu terasa menyebalkan. Tapi jeda tersebut sebenarnya punya fungsi.",
      },
      { type: "h2", text: "Fungsi tersembunyi dari jam tutup" },
      {
        type: "list",
        items: [
          "Memberi waktu bagi informasi tersebar sebelum semua orang bereaksi sekaligus.",
          "Mengumpulkan likuiditas di jam pembukaan, sehingga harga pembukaan lebih mewakili konsensus.",
          "Mencegah keputusan panik jam dua pagi yang hampir selalu buruk.",
        ],
      },
      { type: "h2", text: "Apa yang terjadi ketika toko tidak pernah tutup" },
      {
        type: "p",
        text: "Pasar kripto berjalan terus. Kelebihannya jelas: kamu bisa keluar kapan saja. Tapi ada ongkos yang jarang dihitung — likuiditas paling tipis justru terjadi di jam-jam ketika sebagian besar orang tidur.",
      },
      {
        type: "quote",
        text: "Pasar 24 jam bukan berarti pasar yang selalu ramai. Sering kali justru sebaliknya.",
      },
      {
        type: "p",
        text: "Di jam sepi itulah pergerakan harga paling ekstrem sering terjadi, karena pesanan berukuran sedang saja sudah cukup untuk menggeser harga.",
      },
      { type: "h2", text: "Cara bersikap" },
      {
        type: "p",
        text: "Buat aturan jam untuk dirimu sendiri, meski pasarnya tidak punya. Tentukan kapan kamu boleh mengambil keputusan, dan kapan kamu hanya boleh mengamati. Disiplin itu yang membedakan investor dari orang yang sekadar tidak bisa tidur.",
      },
    ],
  },

  {
    slug: "waktu-menjadi-kunci-dalam-investasi",
    title: "Waktu menjadi kunci",
    accent: "dalam investasi",
    deck: "Bukan soal menebak titik terendah. Soal berapa lama kamu sanggup bertahan tanpa mengganggu posisimu sendiri.",
    category: "makro",
    series: "chain-horizon",
    cover: "/media/waktu-kunci-investasi.webp",
    coverThumb: "/media/waktu-kunci-investasi-sm.webp",
    aspect: "4/5",
    publishedAt: "2026-08-03",
    readingMinutes: 5,
    author: riset,
    tags: ["Compounding", "Horizon", "Perilaku"],
    body: [
      {
        type: "p",
        text: "Ada dua cara mendapatkan hasil dari pasar: benar soal arah, atau sabar soal durasi. Yang pertama sulit dan tidak konsisten. Yang kedua membosankan dan bisa diulang.",
      },
      { type: "h2", text: "Aritmetika yang tidak intuitif" },
      {
        type: "p",
        text: "Compounding terasa lambat di awal dan tiba-tiba curam di akhir. Itu sebabnya banyak orang berhenti tepat sebelum bagian yang penting dimulai — bukan karena strateginya salah, tapi karena grafiknya belum terlihat menarik.",
      },
      {
        type: "stat",
        value: "10 tahun",
        label: "Horizon minimum sebelum efek compounding terasa nyata",
        note: "Untuk portofolio berbasis ekuitas",
      },
      { type: "h2", text: "Musuh utamanya bukan pasar" },
      {
        type: "p",
        text: "Musuh utamanya adalah kebutuhan mendadak. Investor yang terpaksa menjual di titik terburuk hampir selalu melakukannya karena alasan di luar pasar: kehilangan pekerjaan, biaya darurat, utang jatuh tempo.",
      },
      {
        type: "quote",
        text: "Dana darurat bukan bagian dari portofolio. Dia adalah syarat supaya portofoliomu tidak perlu diganggu.",
      },
      {
        type: "p",
        text: "Karena itu, urutan yang benar selalu sama: amankan arus kas dulu, baru bicara alokasi aset. Membalik urutannya adalah cara paling umum untuk kalah bukan karena salah analisis.",
      },
      { type: "h2", text: "Kalau kamu baru mulai" },
      {
        type: "p",
        text: "Pilih jumlah yang bisa kamu setor tiap bulan tanpa terasa berat, dan yang penting — tanpa perlu kamu tarik selama beberapa tahun. Ukuran setoran bisa dinaikkan nanti. Konsistensinya tidak bisa dibeli belakangan.",
      },
    ],
  },

  {
    slug: "menurut-kalian-orang-ini-beneran-kaya",
    title: "Menurut kalian orang ini",
    accent: "beneran kaya?",
    deck: "Kami turun ke jalan dan bertanya. Jawabannya menunjukkan satu hal: kebanyakan orang menilai kekayaan dari yang terlihat, bukan dari yang dimiliki.",
    category: "makro",
    series: "genesis-unscripted",
    cover: "/media/unscripted-orang-kaya.webp",
    coverThumb: "/media/unscripted-orang-kaya-sm.webp",
    aspect: "9/16",
    publishedAt: "2026-07-30",
    readingMinutes: 3,
    author: redaksi,
    tags: ["Unscripted", "Literasi", "Video"],
    body: [
      {
        type: "p",
        text: "Kami menunjukkan foto seseorang ke puluhan orang di jalan dan bertanya satu hal sederhana: menurut kamu, orang ini beneran kaya?",
      },
      {
        type: "p",
        text: "Hampir semua jawaban berpijak pada hal yang sama — pakaian, jam tangan, mobil, latar belakang foto. Hampir tidak ada yang bertanya soal penghasilan bulanan, utang, atau aset produktif.",
      },
      { type: "h2", text: "Kenapa ini penting" },
      {
        type: "p",
        text: "Karena cara kita menilai kekayaan orang lain adalah cerminan cara kita mengejarnya sendiri. Kalau ukurannya penampilan, maka target yang kita kejar juga penampilan.",
      },
      {
        type: "quote",
        text: "Kekayaan adalah yang tidak kamu lihat. Yang kamu lihat itu pengeluaran.",
      },
      {
        type: "p",
        text: "Mobil yang terparkir bukan bukti kekayaan. Dia bukti bahwa uang sebesar itu sudah berubah bentuk menjadi barang yang nilainya turun tiap tahun.",
      },
      { type: "h2", text: "Pertanyaan yang lebih berguna" },
      {
        type: "list",
        items: [
          "Berapa lama orang ini bisa bertahan tanpa penghasilan?",
          "Berapa bagian dari asetnya yang menghasilkan uang sendiri?",
          "Berapa besar cicilan yang menempel di gaya hidupnya?",
        ],
      },
      {
        type: "p",
        text: "Tiga pertanyaan itu tidak bisa dijawab dari sebuah foto. Dan justru itu inti masalahnya.",
      },
    ],
  },

  {
    slug: "apa-arti-cukup-dalam-investasi-ferry-irwandi",
    title: "Apa arti cukup dalam investasi",
    accent: "menurut Ferry Irwandi?",
    deck: "Percakapan tentang angka yang jarang ditentukan orang sejak awal — dan kenapa tanpa angka itu, tidak ada jumlah yang akan terasa cukup.",
    category: "makro",
    series: "genesis-unscripted",
    cover: "/media/unscripted-ferry-irwandi.webp",
    coverThumb: "/media/unscripted-ferry-irwandi-sm.webp",
    aspect: "9/16",
    publishedAt: "2026-07-26",
    readingMinutes: 4,
    author: redaksi,
    tags: ["Unscripted", "Wawancara", "Mindset"],
    body: [
      {
        type: "p",
        text: "Hampir semua orang punya target menabung. Sangat sedikit yang punya definisi selesai. Itu dua hal yang berbeda, dan jarak di antaranya adalah tempat kebanyakan orang kelelahan.",
      },
      { type: "h2", text: "Angka yang tidak pernah ditulis" },
      {
        type: "p",
        text: "Ketika ditanya berapa jumlah yang membuat mereka berhenti merasa cemas soal uang, sebagian besar orang menjawab dengan kelipatan dari yang mereka punya sekarang. Bukan dengan angka tetap.",
      },
      {
        type: "quote",
        text: "Kalau definisi cukupmu selalu 'dua kali lipat dari sekarang', kamu tidak akan pernah sampai — karena garisnya ikut bergerak.",
      },
      { type: "h2", text: "Cara menentukannya" },
      {
        type: "p",
        text: "Mulai dari pengeluaran tahunanmu, bukan dari penghasilan orang lain. Hitung berapa biaya hidup setahun, lalu tentukan berapa tahun yang ingin kamu tutup tanpa bekerja. Hasilnya angka yang spesifik, personal, dan bisa diperiksa.",
      },
      {
        type: "p",
        text: "Angka itu akan terasa jauh lebih kecil dari yang kamu bayangkan sebelumnya. Itu bukan tanda targetmu terlalu rendah — itu tanda kamu akhirnya menghitung, bukan menebak.",
      },
      { type: "h2", text: "Bagian yang paling sulit" },
      {
        type: "p",
        text: "Menahan angka itu tetap di tempatnya ketika penghasilanmu naik. Karena kenaikan penghasilan hampir selalu diikuti kenaikan standar hidup, dan standar hidup yang naik menggeser definisi cukup tanpa kamu sadari.",
      },
    ],
  },
];

export const featuredArticles = articles.filter((a) => a.featured);
