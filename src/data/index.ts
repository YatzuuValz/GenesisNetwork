import { articles } from "./articles";
import { reports } from "./research";
import { categories, seriesList } from "./site";
import type { Article, CategorySlug, Instrument, ResearchReport } from "./types";

export * from "./types";
export * from "./site";
export { articles } from "./articles";
export { reports } from "./research";

/* ------------------------------------------------------------------
   Every read goes through this module. When Payload lands, these turn
   into async `payload.find(...)` calls and the pages become the only
   thing that needs `await` — components stay untouched.
   ------------------------------------------------------------------ */

const byNewest = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  b.publishedAt.localeCompare(a.publishedAt);

export function getArticles(opts?: { category?: CategorySlug; limit?: number }): Article[] {
  let list = [...articles].sort(byNewest);
  if (opts?.category) list = list.filter((a) => a.category === opts.category);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getLeadArticle(): Article {
  return getArticles({ limit: 1 })[0];
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return getArticles({ limit });
  const sameCategory = getArticles({ category: current.category }).filter((a) => a.slug !== slug);
  const rest = getArticles().filter(
    (a) => a.slug !== slug && !sameCategory.some((s) => s.slug === a.slug),
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getReports(opts?: { category?: CategorySlug; limit?: number }): ResearchReport[] {
  let list = [...reports].sort(byNewest);
  if (opts?.category) list = list.filter((r) => r.category === opts.category);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export function getReport(slug: string): ResearchReport | undefined {
  return reports.find((r) => r.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getSeries(slug: string) {
  return seriesList.find((s) => s.slug === slug);
}

export function countByCategory(slug: CategorySlug) {
  return articles.filter((a) => a.category === slug).length;
}

const monthsID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** Deterministic on server and client — avoids hydration drift from toLocaleDateString. */
export function formatDateID(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${monthsID[m - 1]} ${y}`;
}

export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${String(y).slice(2)}`;
}

/* ------------------------------------------------------------------
   Market formatting. Deliberately hand-rolled rather than
   toLocaleString(): the server and the browser must produce byte-identical
   output or React reports a hydration mismatch.
   ------------------------------------------------------------------ */

/** Indonesian convention: "." groups thousands, "," marks decimals. */
function groupID(value: number, decimals: number): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, frac] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const sign = value < 0 ? "-" : "";
  return frac ? `${sign}${grouped},${frac}` : `${sign}${grouped}`;
}

export function formatPrice(i: Instrument): string {
  if (i.price === null) return "—";
  if (i.market === "crypto") {
    return `$${groupID(i.price, i.price >= 1000 ? 0 : 2)}`;
  }
  // The composite index carries decimals; individual shares are whole rupiah.
  return i.symbol === "IHSG" ? groupID(i.price, 2) : `Rp${groupID(i.price, 0)}`;
}

export function formatChange(change: number | null): string {
  if (change === null) return "—";
  return `${change > 0 ? "+" : ""}${groupID(change, 2)}%`;
}

const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

/** "30 Agustus 2026, 15:12 WIB" — computed, not locale-dependent. */
export function formatFetchedAt(iso: string): string {
  const d = new Date(new Date(iso).getTime() + WIB_OFFSET_MS);
  const day = d.getUTCDate();
  const month = monthsID[d.getUTCMonth()];
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${day} ${month} ${d.getUTCFullYear()}, ${hh}:${mm} WIB`;
}

/**
 * `output: export` refuses a dynamic route that generates nothing, so a switched-off
 * section still has to emit one throwaway param (the page then 404s). A server
 * deploy — Vercel and friends — has no such rule, so it gets a genuinely empty
 * list and ships no placeholder URL at all.
 */
export function disabledRouteParams<T>(placeholder: T): T[] {
  return process.env.DEPLOY_TARGET === "github-pages" ? [placeholder] : [];
}
