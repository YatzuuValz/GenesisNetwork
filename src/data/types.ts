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
}

export interface Instrument {
  symbol: string;
  name: string;
  price: string;
  change: number;
  market: "crypto" | "idx" | "macro";
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
