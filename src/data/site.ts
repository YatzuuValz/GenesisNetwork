import type { Category, Founder, Instrument, RevenueStream, Series, CaseStudyAsset } from "./types";

export const site = {
  name: "Genesis Network",
  legalName: "Genesis Network Indonesia",
  tagline: "Crypto · Saham · Makro",
  /** Straight from the IG bio. */
  promise: "Indonesia deserves better financial literacy.",
  description:
    "Media finansial independen untuk generasi muda Indonesia. Crypto, saham, dan makroekonomi — dijelaskan sederhana, jujur, dan tanpa jargon.",
  instagram: "https://www.instagram.com/genesisnetwork.id/",
  instagramHandle: "@genesisnetwork.id",
  tiktokHandle: "@genesisnetwork.id",
  youtubeHandle: "@genesisnetwork",
  email: "hello@genesisnetwork.id",
  partnershipEmail: "partnership@genesisnetwork.id",
  city: "Jakarta, Indonesia",
} as const;

export const categories: Category[] = [
  {
    slug: "crypto",
    label: "Crypto",
    navLabel: "Crypto",
    blurb:
      "Aset digital, infrastruktur on-chain, dan narasi yang benar-benar punya arus kas di baliknya.",
  },
  {
    slug: "saham",
    label: "Saham",
    navLabel: "Saham",
    blurb:
      "IHSG, emiten, dan aliran dana global yang menentukan arah bursa Indonesia.",
  },
  {
    slug: "makro",
    label: "Makro",
    navLabel: "Makro",
    blurb:
      "Suku bunga, inflasi, dan keputusan kebijakan yang pelan-pelan sampai ke rekeningmu.",
  },
];

export const seriesList: Series[] = [
  {
    slug: "chain-horizon",
    name: "Chain Horizon",
    category: "crypto",
    format: "Carousel · 2× seminggu",
    blurb:
      "Pembacaan mingguan atas pergerakan on-chain, dari infrastruktur pembayaran sampai narasi yang sedang dihargai pasar.",
  },
  {
    slug: "equity-voyage",
    name: "Equity Voyage",
    category: "saham",
    format: "Carousel · 2× seminggu",
    blurb:
      "Bursa Indonesia dan pasar global, dibaca lewat aliran dana — bukan lewat headline.",
  },
  {
    slug: "genesis-unscripted",
    name: "Genesis Unscripted",
    category: "mixed",
    format: "Video · 1× seminggu",
    blurb:
      "Turun ke jalan, bertanya soal uang ke orang sungguhan. Tanpa naskah, tanpa jawaban yang sudah disiapkan.",
  },
  {
    slug: "genesis-rankings",
    name: "Genesis Rankings",
    category: "mixed",
    format: "Riset · bulanan",
    blurb:
      "Peringkat aset dan sektor yang kami susun sendiri, dengan metodologi yang dibuka penuh ke pembaca.",
  },
];

/**
 * TODO(genesis): replace with the real founding team — names, roles, photos.
 * Left as role-first placeholders on purpose; nothing here is invented about
 * real people.
 */
export const founders: Founder[] = [
  {
    name: "Nama Founder",
    role: "Founder & Editor-in-Chief",
    initials: "01",
    bio: "Menentukan arah editorial dan menjaga standar yang sama untuk setiap konten: kalau kami tidak bisa menjelaskannya dengan sederhana, kami belum cukup paham.",
    focus: "Editorial · Crypto",
  },
  {
    name: "Nama Co-Founder",
    role: "Co-Founder & Head of Research",
    initials: "02",
    bio: "Menyusun kerangka riset dan metodologi Genesis Rankings, memastikan setiap angka yang kami terbitkan bisa ditelusuri sumbernya.",
    focus: "Riset · Saham & Makro",
  },
  {
    name: "Nama Co-Founder",
    role: "Co-Founder & Creative Director",
    initials: "03",
    bio: "Menerjemahkan riset jadi bahasa visual yang berhenti di jempol orang — tanpa mengorbankan akurasi isinya.",
    focus: "Visual · Produksi",
  },
];

/** Static mock quotes for the ticker — no market feed in this mockup. */
export const instruments: Instrument[] = [
  { symbol: "BTC", name: "Bitcoin", price: "$96.240", change: 1.84, market: "crypto" },
  { symbol: "ETH", name: "Ethereum", price: "$3.412", change: -0.62, market: "crypto" },
  { symbol: "SOL", name: "Solana", price: "$204,80", change: 3.11, market: "crypto" },
  { symbol: "IHSG", name: "Jakarta Composite", price: "7.284,15", change: 0.47, market: "idx" },
  { symbol: "BBCA", name: "Bank Central Asia", price: "Rp9.775", change: -0.25, market: "idx" },
  { symbol: "BBRI", name: "Bank Rakyat Indonesia", price: "Rp4.180", change: 1.09, market: "idx" },
  { symbol: "USD/IDR", name: "Rupiah", price: "16.185", change: -0.18, market: "macro" },
  { symbol: "BI RATE", name: "Suku Bunga Acuan", price: "5,50%", change: 0, market: "macro" },
  { symbol: "GOLD", name: "Emas", price: "$2.688", change: 0.74, market: "macro" },
  { symbol: "TLKM", name: "Telkom Indonesia", price: "Rp2.910", change: 0.34, market: "idx" },
];

export const revenueStreams: RevenueStream[] = [
  {
    name: "Contract Brand Partnership",
    product: "Sponsored post · carousel · video",
    detail:
      "Kontrak berkala dengan jumlah slot tetap per bulan. Format menyesuaikan pilar konten yang paling relevan dengan produkmu.",
  },
  {
    name: "Integrated Brand Campaign",
    product: "Kampanye multi-format",
    detail:
      "Rangkaian teaser, launch, dan engagement yang dirancang sebagai satu alur cerita lintas Instagram, TikTok, dan YouTube.",
  },
  {
    name: "Event Media Partner",
    product: "Conference · investor night · meetup",
    detail:
      "Liputan sebelum, saat, dan sesudah acara — termasuk dokumentasi vertikal siap tayang untuk kanal penyelenggara.",
  },
  {
    name: "Community Membership",
    product: "YouTube membership",
    detail:
      "Video dan catatan pasar eksklusif untuk anggota, dengan ritme rilis terpisah dari kanal publik.",
  },
  {
    name: "YouTube AdSense",
    product: "Monetisasi kanal",
    detail:
      "Pendapatan dari iklan yang tayang di konten YouTube Genesis Network.",
  },
  {
    name: "Genesis Rankings",
    product: "Genesis Crypto Rank",
    detail:
      "Produk riset berkala dengan metodologi terbuka. Tersedia slot presenting partner per edisi.",
  },
];

export const caseStudyAssets: CaseStudyAsset[] = [
  { src: "/media/tokocrypto-teaser.webp", label: "Teaser", aspect: "4/5" },
  { src: "/media/tokocrypto-launch.webp", label: "Launch", aspect: "4/5" },
  { src: "/media/tokocrypto-pilihan-24jam.webp", label: "Engage", aspect: "4/5" },
  { src: "/media/tokenized-hits-different.webp", label: "Closing", aspect: "4/5" },
];

/** Numbers from the deck's 30-day Instagram snapshot (first two weeks live). */
export const audienceStats = [
  { value: "12.315", label: "Views", note: "30 hari terakhir" },
  { value: "2.408", label: "Accounts reached", note: "80,4% non-follower" },
  { value: "385", label: "Interactions", note: "Like, save, share, komentar" },
  { value: "739", label: "Profile visits", note: "Dari konten organik" },
];

export const kpiTargets = [
  { metric: "Total content views", six: "100K", twelve: "500K" },
  { metric: "Engagement rate", six: "5–8%", twelve: "10–16%" },
  { metric: "Konten viral / semi-viral", six: "3 / bulan", twelve: "6 / bulan" },
  { metric: "Frekuensi posting", six: "7 konten / minggu", twelve: "7 konten / minggu" },
];

export const audienceGrowth = [
  { platform: "Instagram", six: "300–500", twelve: "600–1.000" },
  { platform: "TikTok", six: "500–1.500", twelve: "1.000–3.000" },
  { platform: "YouTube", six: "50–150", twelve: "100–300" },
];
