/**
 * Shapes here intentionally mirror what the Payload collections will look like,
 * so swapping the local arrays for `payload.find({ collection: '...' })` is a
 * one-file change in `src/data/index.ts` and nothing in the components moves.
 */

export type CategorySlug = "crypto" | "saham" | "makro";

export type SeriesSlug =
  | "chain-horizon"
  | "equity-voyage"
  | "genesis-unscripted"
  | "genesis-rankings";

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Nav label, kept in English per the brand's nav convention. */
  navLabel: string;
  blurb: string;
}

export interface Series {
  slug: SeriesSlug;
  name: string;
  category: CategorySlug | "mixed";
  format: string;
  blurb: string;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string; note?: string };

export interface Author {
  name: string;
  role: string;
  initials: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Rendered in the serif italic accent face inside headlines. */
  accent?: string;
  deck: string;
  category: CategorySlug;
  series: SeriesSlug;
  cover: string;
  coverThumb: string;
  /** 4/5 for feed carousels, 9/16 for reels. */
  aspect: "4/5" | "9/16" | "16/9";
  publishedAt: string;
  readingMinutes: number;
  author: Author;
  tags: string[];
  featured?: boolean;
  body: Block[];
}

export interface ResearchReport {
  slug: string;
  title: string;
  accent?: string;
  deck: string;
  category: CategorySlug;
  edition: string;
  publishedAt: string;
  pages: number;
  cover: string;
  highlights: string[];
  body: Block[];
}

export interface Founder {
  name: string;
  role: string;
  initials: string;
  bio: string;
  focus: string;
  linkedin: string;
  /** Rendered when set; falls back to the initials monogram. */
  photo?: string;
  /** Smaller crop for the roster rows. */
  thumb?: string;
}

export interface Instrument {
  symbol: string;
  name: string;
  market: "crypto" | "idx";
  /** IDX rows are IDR; crypto rows are USD. Null only if a source was down. */
  price: number | null;
  /** Percent move: 24h for crypto, versus previous close for IDX. */
  change: number | null;
  /** Crypto only — carries the rupiah figure alongside the dollar one. */
  priceIdr?: number | null;
  /** CoinGecko id, present on crypto rows so the ticker can refresh them live. */
  coinId?: string;
  /** True when the last fetch failed and this is a retained older value. */
  stale?: boolean;
}

export interface MarketSnapshot {
  fetchedAt: string;
  instruments: Instrument[];
}

/** One Instagram post's artwork. Curated by hand — see README. */
export interface InstagramPost {
  src: string;
  thumb: string;
  caption: string;
  series: SeriesSlug;
  aspect: "4/5" | "9/16";
  /** Reels are vertical video; posts are the 4:5 feed carousels. */
  kind: "reel" | "post";
  /** Public permalink. Falls back to the profile when absent. */
  permalink?: string;
  /** Surfaced first inside its group. */
  top?: boolean;
}

export interface RevenueStream {
  name: string;
  product: string;
  detail: string;
}

export interface CaseStudyAsset {
  src: string;
  label: string;
  aspect: "4/5" | "9/16";
}
