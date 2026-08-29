import type { ResearchReport } from "./types";

/**
 * Free Research is currently modelled as open long-form reports — free to read,
 * no email gate. `ResearchReport` already carries `pages`, so adding a gated PDF
 * download later is additive, not a rewrite.
 */
export const reports: ResearchReport[] = [
  {
    slug: "genesis-crypto-rank-q3",
    title: "Genesis Crypto Rank",
    accent: "Q3",
    deck: "Peringkat 20 aset kripto teratas berdasarkan likuiditas riil, aktivitas on-chain, dan ketergantungan pada insentif — bukan berdasarkan kapitalisasi pasar saja.",
    category: "crypto",
    edition: "Edisi Q3 2026",
    publishedAt: "2026-08-20",
    pages: 24,
    cover: "/media/tokoh-berpengaruh-kripto.webp",
    highlights: [
      "Kapitalisasi pasar adalah metrik yang paling mudah dimanipulasi dan paling sering dikutip.",
      "Tiga dari sepuluh aset teratas kehilangan lebih dari separuh aktivitasnya begitu insentif dikurangi.",
      "Likuiditas di jam pasar Asia rata-rata 40% lebih tipis dibanding jam pasar AS.",
    ],
    body: [
      {
        type: "p",
        text: "Peringkat aset kripto hampir selalu disusun berdasarkan kapitalisasi pasar. Masalahnya, kapitalisasi pasar dihitung dari harga dikali suplai beredar — dan kedua angka itu bisa dibentuk.",
      },
      { type: "h2", text: "Metodologi" },
      {
        type: "p",
        text: "Genesis Crypto Rank menyusun peringkat dari tiga komponen dengan bobot setara: kedalaman likuiditas pada order book, aktivitas on-chain yang tidak berasal dari insentif, dan konsentrasi kepemilikan.",
      },
      {
        type: "list",
        items: [
          "Likuiditas diukur dari kedalaman order book pada deviasi 2% dari harga tengah, dirata-rata sepanjang hari.",
          "Aktivitas on-chain dihitung setelah mengeluarkan transaksi yang berkaitan langsung dengan program insentif.",
          "Konsentrasi kepemilikan memakai pangsa suplai yang dipegang seratus alamat teratas, di luar alamat bursa.",
        ],
      },
      {
        type: "quote",
        text: "Kami memilih metrik yang mahal untuk dimanipulasi, bukan metrik yang mudah dikumpulkan.",
      },
      { type: "h2", text: "Temuan utama" },
      {
        type: "stat",
        value: "3 dari 10",
        label: "Aset teratas yang aktivitasnya anjlok >50% saat insentif dikurangi",
        note: "Diamati sepanjang kuartal berjalan",
      },
      {
        type: "p",
        text: "Temuan ini bukan tuduhan kecurangan. Insentif adalah alat pemasaran yang sah. Tapi bagi investor, penting membedakan mana permintaan yang bertahan tanpa subsidi dan mana yang tidak.",
      },
      { type: "h2", text: "Batasan" },
      {
        type: "p",
        text: "Data order book hanya mencakup bursa dengan API publik. Aktivitas di pasar over-the-counter tidak terlihat di sini, dan untuk beberapa aset besar porsinya bisa signifikan.",
      },
    ],
  },

  {
    slug: "outlook-makro-indonesia-semester-ii",
    title: "Outlook makro Indonesia",
    accent: "semester II",
    deck: "Suku bunga, nilai tukar, dan konsumsi rumah tangga — tiga variabel yang menentukan arah IHSG dalam enam bulan ke depan, dan apa yang harus kamu perhatikan di masing-masing.",
    category: "makro",
    edition: "Semester II 2026",
    publishedAt: "2026-08-11",
    pages: 18,
    cover: "/media/waktu-kunci-investasi.webp",
    highlights: [
      "Ruang pemangkasan suku bunga ada, tapi terikat pada stabilitas rupiah.",
      "Konsumsi rumah tangga masih jadi penopang utama, dengan tekanan di kelas menengah bawah.",
      "Arah dana asing lebih ditentukan selisih imbal hasil daripada cerita pertumbuhan.",
    ],
    body: [
      {
        type: "p",
        text: "Setiap outlook makro punya godaan yang sama: membuat prediksi angka yang terdengar presisi. Kami tidak melakukan itu. Yang lebih berguna adalah memetakan variabel mana yang benar-benar menggerakkan hasil, dan pada kondisi apa arahnya berubah.",
      },
      { type: "h2", text: "Suku bunga" },
      {
        type: "p",
        text: "Bank Indonesia punya ruang untuk melonggarkan, tapi ruang itu bersyarat. Selama tekanan pada rupiah masih ada, pemangkasan agresif berisiko memicu arus keluar yang justru memperburuk nilai tukar.",
      },
      {
        type: "stat",
        value: "5,50%",
        label: "Suku bunga acuan pada periode laporan",
        note: "Arah selanjutnya bergantung pada stabilitas nilai tukar",
      },
      { type: "h2", text: "Nilai tukar" },
      {
        type: "p",
        text: "Rupiah lebih sensitif terhadap selisih imbal hasil dibanding terhadap data pertumbuhan domestik. Artinya, keputusan bank sentral di luar negeri sering berdampak lebih besar ke kursmu dibanding rilis data dalam negeri.",
      },
      { type: "h2", text: "Konsumsi rumah tangga" },
      {
        type: "p",
        text: "Konsumsi menyumbang porsi terbesar ekonomi Indonesia. Yang perlu diamati bukan angka agregatnya, tapi komposisinya — apakah pertumbuhan datang dari kelas atas yang belanjanya diskresioner, atau merata sampai ke bawah.",
      },
      {
        type: "quote",
        text: "Angka agregat bisa tumbuh sementara mayoritas rumah tangga merasa lebih berat. Keduanya bisa benar sekaligus.",
      },
      { type: "h2", text: "Implikasi ke portofolio" },
      {
        type: "list",
        items: [
          "Sektor perbankan paling sensitif terhadap arah suku bunga dan kualitas kredit.",
          "Emiten dengan utang dolar dan pendapatan rupiah menanggung risiko kurs paling langsung.",
          "Konsumer primer cenderung lebih tahan ketika daya beli tertekan dibanding konsumer diskresioner.",
        ],
      },
    ],
  },

  {
    slug: "anatomi-tokenisasi-aset-di-indonesia",
    title: "Anatomi tokenisasi aset",
    accent: "di Indonesia",
    deck: "Peta lengkap: siapa penerbitnya, bagaimana strukturnya, di mana posisi regulasi hari ini, dan risiko apa yang belum punya jawaban.",
    category: "saham",
    edition: "Laporan khusus",
    publishedAt: "2026-07-28",
    pages: 31,
    cover: "/media/saham-global-onchain.webp",
    highlights: [
      "Sebagian besar produk tokenisasi menempatkan pembeli sebagai kreditur penerbit, bukan pemilik aset.",
      "Kerangka pengawasan masih terbagi antara otoritas pasar modal dan otoritas aset digital.",
      "Likuiditas di luar jam bursa asal jauh lebih tipis daripada yang tampak di materi pemasaran.",
    ],
    body: [
      {
        type: "p",
        text: "Tokenisasi aset dijual dengan janji yang menarik: akses lebih murah, jam lebih fleksibel, ukuran pembelian lebih kecil. Semua itu benar. Laporan ini membahas bagian yang jarang ditulis dengan huruf sebesar itu.",
      },
      { type: "h2", text: "Struktur hukum" },
      {
        type: "p",
        text: "Pada sebagian besar produk, pembeli token tidak tercatat sebagai pemegang saham. Yang dipegang adalah klaim kontraktual terhadap penerbit, yang menyimpan aset dasarnya melalui kustodian.",
      },
      {
        type: "p",
        text: "Konsekuensinya muncul ketika penerbit bermasalah. Urutan klaim saat itu ditentukan oleh dokumen penerbitan dan yurisdiksi tempat entitas itu berdiri — dua hal yang jarang dibaca investor ritel.",
      },
      {
        type: "quote",
        text: "Pertanyaan pertama sebelum membeli produk tokenisasi bukan 'berapa harganya', tapi 'kalau penerbitnya gagal, saya berdiri di antrean nomor berapa'.",
      },
      { type: "h2", text: "Posisi regulasi" },
      {
        type: "p",
        text: "Produk yang mereferensikan efek berada di wilayah abu-abu antara pengawasan pasar modal dan pengawasan aset digital. Arah kebijakan bergerak ke arah kejelasan, tapi belum selesai.",
      },
      { type: "h2", text: "Cara membaca produknya" },
      {
        type: "list",
        items: [
          "Cari nama penerbit dan yurisdiksinya, bukan hanya nama platform tempat kamu membeli.",
          "Periksa apakah ada bukti cadangan yang diaudit pihak ketiga, dan seberapa sering diperbarui.",
          "Uji likuiditas dengan order kecil di jam sepi sebelum menaruh posisi besar.",
        ],
      },
      {
        type: "p",
        text: "Tokenisasi bukan penipuan, dan bukan pula sihir. Dia struktur keuangan biasa dengan pembungkus baru — dan struktur keuangan selalu layak dibaca sampai halaman terakhir.",
      },
    ],
  },
];
