import { articles } from "./articles";
import { reports } from "./research";
import { categories, seriesList } from "./site";
import type { Article, CategorySlug, ResearchReport } from "./types";

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
