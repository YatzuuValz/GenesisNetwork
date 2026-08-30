import market from "./market.json";
import type {
  Category,
  Founder,
  InstagramPost,
  Instrument,
  MarketSnapshot,
  RevenueStream,
  Series,
  CaseStudyAsset,
} from "./types";

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
  tiktokHandle: "@genesisnetworkid",
  youtubeHandle: "@GenesisNetworkID",
  email: "hello@genesisnetwork.id",
  partnershipEmail: "partnership@genesisnetwork.id",
  city: "Jakarta, Indonesia",
} as const;

/**
 * Artikel and Free Research are written and ready in src/data, but not published
 * yet — Genesis is Instagram-first for now. Flip a flag to switch a section back
 * on: nav, footer, home page and the routes themselves all read from here.
 */
export const features = {
  artikel: false,
  research: false,
} as const;

/**
 * Genesis publishes on three channels. Instagram is the primary one — the other
 * two are active but secondary.
 */
export const channels = [
  { label: "Instagram", handle: site.instagramHandle, href: site.instagram, primary: true },
  {
    label: "TikTok",
    handle: site.tiktokHandle,
    href: "https://www.tiktok.com/@genesisnetworkid",
    primary: false,
  },
  {
    label: "YouTube",
    handle: site.youtubeHandle,
    href: "https://www.youtube.com/@GenesisNetworkID",
    primary: false,
  },
];

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

/**
 * `format` describes the medium only. The deck states a total of 7 posts a week
 * but never a per-series cadence — do not add one here without a real number.
 */
export const seriesList: Series[] = [
  {
    slug: "chain-horizon",
    name: "Chain Horizon",
    category: "crypto",
    format: "Carousel · Crypto",
    blurb:
      "Pembacaan pergerakan on-chain, dari infrastruktur pembayaran sampai narasi yang sedang dihargai pasar.",
  },
  {
    slug: "equity-voyage",
    name: "Equity Voyage",
    category: "saham",
    format: "Carousel · Saham",
    blurb:
      "Bursa Indonesia dan pasar global, dibaca lewat aliran dana — bukan lewat headline.",
  },
  {
    slug: "genesis-unscripted",
    name: "Genesis Unscripted",
    category: "mixed",
    format: "Video · Wawancara",
    blurb:
      "Turun ke jalan, bertanya soal uang ke orang sungguhan. Tanpa naskah, tanpa jawaban yang sudah disiapkan.",
  },
  {
    slug: "genesis-rankings",
    name: "Genesis Rankings",
    category: "mixed",
    format: "Riset berkala",
    blurb:
      "Peringkat aset dan sektor yang kami susun sendiri, dengan metodologi yang dibuka penuh ke pembaca.",
  },
];

/**
 * All four are co-founders with equal standing — no single "Founder", by their
 * own description of how the team works.
 *
 * Names are taken from the LinkedIn slugs and the photo filenames Genesis
 * supplied; photos are their own LinkedIn portraits, provided for this use.
 * TODO(genesis): confirm the spelling of "Viandi" — the file is named "vian"
 * and the slug is "viandi", so it could be two words. Bios are placeholder copy.
 */
export const founders: Founder[] = [
  {
    name: "Raid Agil",
    role: "Co-Founder",
    initials: "RA",
    focus: "Editorial · Crypto",
    linkedin: "https://www.linkedin.com/in/raidagil/",
    photo: "/team/raid-agil.webp",
    thumb: "/team/raid-agil-sm.webp",
    bio: "Menentukan arah editorial dan menjaga standar yang sama untuk setiap konten: kalau kami tidak bisa menjelaskannya dengan sederhana, kami belum cukup paham.",
  },
  {
    name: "Viandi",
    role: "Co-Founder",
    initials: "VI",
    focus: "Riset · Saham & Makro",
    linkedin: "https://www.linkedin.com/in/viandi/",
    photo: "/team/viandi.webp",
    thumb: "/team/viandi-sm.webp",
    bio: "Menyusun kerangka riset dan metodologi Genesis Rankings, memastikan setiap angka yang kami terbitkan bisa ditelusuri sumbernya.",
  },
  {
    name: "Yahya Muhandar Fathana",
    role: "Co-Founder",
    initials: "YM",
    focus: "Visual · Produksi",
    linkedin: "https://www.linkedin.com/in/yahya-muhandar-fathana-2084b92b2/",
    photo: "/team/yahya.webp",
    thumb: "/team/yahya-sm.webp",
    bio: "Menerjemahkan riset jadi bahasa visual yang berhenti di jempol orang — tanpa mengorbankan akurasi isinya.",
  },
  {
    name: "Rieka Handayani",
    role: "Co-Founder",
    initials: "RH",
    focus: "Video · Distribusi",
    linkedin: "https://www.linkedin.com/in/riekahandayani/",
    photo: "/team/rieka.webp",
    thumb: "/team/rieka-sm.webp",
    bio: "Memimpin produksi Genesis Unscripted, dari menyusun pertanyaan sampai memastikan jawaban yang jujur tetap utuh saat diedit.",
  },
];

export const teamPhoto: string | undefined = undefined;

/**
 * Live quotes, fetched at build time by scripts/fetch-market.mjs. The crypto
 * rows are refreshed again client-side (CoinGecko allows cross-origin reads);
 * IDX rows stay as of the last build because Yahoo does not.
 */
export const marketSnapshot = market as MarketSnapshot;
export const instruments: Instrument[] = marketSnapshot.instruments;

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

/**
 * The Instagram grid. Curated by hand: pulling live posts needs the Instagram
 * Graph API plus a token that expires every ~60 days, which isn't worth the
 * upkeep for a feed that updates weekly. New post = add a row here.
 *
 * Each card links to the profile, not to the individual post — swap in the real
 * permalinks when they're available.
 */
export const instagramPosts: InstagramPost[] = [
  { src: "/media/cz-ai-agents.webp", thumb: "/media/cz-ai-agents-sm.webp", caption: "CZ prediksi AI agents segera tangani pembayaran crypto", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/msci-status-ri.webp", thumb: "/media/msci-status-ri-sm.webp", caption: "MSCI umumkan status RI Juni ini", series: "equity-voyage", aspect: "4/5", kind: "post" },
  {
    src: "/media/unscripted-orang-kaya.webp",
    thumb: "/media/unscripted-orang-kaya-sm.webp",
    caption: "Menurut kalian orang ini beneran kaya?",
    series: "genesis-unscripted",
    aspect: "9/16",
    kind: "reel",
    top: true,
    permalink: "https://www.instagram.com/reel/DcJsamQTVvE/",
  },
  { src: "/media/tokoh-berpengaruh-kripto.webp", thumb: "/media/tokoh-berpengaruh-kripto-sm.webp", caption: "5 orang berpengaruh di industri kripto", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/elon-musk-200-miliar.webp", thumb: "/media/elon-musk-200-miliar-sm.webp", caption: "Elon Musk kehilangan $200 miliar dalam 2 hari", series: "equity-voyage", aspect: "4/5", kind: "post" },
  { src: "/media/saham-global-onchain.webp", thumb: "/media/saham-global-onchain-sm.webp", caption: "Saham global kini bisa on-chain?", series: "chain-horizon", aspect: "4/5", kind: "post" },
  {
    src: "/media/unscripted-ferry-irwandi.webp",
    thumb: "/media/unscripted-ferry-irwandi-sm.webp",
    caption: "Apa arti cukup dalam investasi menurut Ferry Irwandi?",
    series: "genesis-unscripted",
    aspect: "9/16",
    kind: "reel",
    top: true,
    // TODO(genesis): confirm this is reel DcEF83HBP5F — matched on "gambar
    // dengan tulisan", which fits both reels we have.
    permalink: "https://www.instagram.com/reel/DcEF83HBP5F/",
  },
  { src: "/media/apa-itu-tokenized-stocks.webp", thumb: "/media/apa-itu-tokenized-stocks-sm.webp", caption: "Apa itu tokenized stocks?", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/waktu-kunci-investasi.webp", thumb: "/media/waktu-kunci-investasi-sm.webp", caption: "Waktu menjadi kunci dalam investasi", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/pasar-24-jam.webp", thumb: "/media/pasar-24-jam-sm.webp", caption: "Bayangin kamu mau belanja tapi tokonya malah tutup", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/tokocrypto-teaser.webp", thumb: "/media/tokocrypto-teaser-sm.webp", caption: "Segera hadir di Tokocrypto", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/tokocrypto-launch.webp", thumb: "/media/tokocrypto-launch-sm.webp", caption: "Trade tokenized stocks di Tokocrypto sekarang", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/tokocrypto-pilihan-24jam.webp", thumb: "/media/tokocrypto-pilihan-24jam-sm.webp", caption: "Tokenized stock tersedia 24 jam di Tokocrypto", series: "chain-horizon", aspect: "4/5", kind: "post" },
  { src: "/media/tokenized-hits-different.webp", thumb: "/media/tokenized-hits-different-sm.webp", caption: "Tokenized stocks hits different", series: "chain-horizon", aspect: "4/5", kind: "post" },
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
