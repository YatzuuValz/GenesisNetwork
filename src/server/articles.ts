import "server-only";
import { randomUUID } from "node:crypto";
import { db, type Row } from "./db";
import type { Block, CategorySlug, SeriesSlug } from "@/data";

export type ArticleStatus = "draft" | "published" | "changed";

export interface StoredArticle {
  id: string;
  slug: string;
  title: string;
  accent: string;
  deck: string;
  category: CategorySlug;
  series: SeriesSlug;
  cover: string;
  coverThumb: string;
  coverAlt: string;
  status: ArticleStatus;
  featured: boolean;
  tags: string[];
  body: Block[];
  seoTitle: string;
  seoDesc: string;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
}

/** JSON columns are text in SQLite; a malformed one must not take the page down. */
function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

const str = (v: unknown) => (v == null ? "" : String(v));

function toArticle(row: Row): StoredArticle {
  return {
    id: str(row.id),
    slug: str(row.slug),
    title: str(row.title),
    accent: str(row.accent),
    deck: str(row.deck),
    category: str(row.category) as CategorySlug,
    series: str(row.series) as SeriesSlug,
    cover: str(row.cover),
    coverThumb: str(row.cover_thumb),
    coverAlt: str(row.cover_alt),
    status: str(row.status) as ArticleStatus,
    featured: Number(row.featured) === 1,
    tags: parseJson<string[]>(row.tags, []),
    body: parseJson<Block[]>(row.body, []),
    seoTitle: str(row.seo_title),
    seoDesc: str(row.seo_desc),
    authorName: str(row.author_name),
    publishedAt: str(row.published_at),
    updatedAt: str(row.updated_at),
  };
}

export async function listArticles(): Promise<StoredArticle[]> {
  const { rows } = await db.execute(
    "SELECT * FROM articles ORDER BY updated_at DESC",
  );
  return rows.map((r) => toArticle(r as Row));
}

export async function getArticleById(id: string): Promise<StoredArticle | null> {
  const { rows } = await db.execute({
    sql: "SELECT * FROM articles WHERE id = ?",
    args: [id],
  });
  return rows[0] ? toArticle(rows[0] as Row) : null;
}

/** Only published rows — what the public site would read. */
export async function listPublished(): Promise<StoredArticle[]> {
  const { rows } = await db.execute(
    "SELECT * FROM articles WHERE status IN ('published','changed') ORDER BY published_at DESC",
  );
  return rows.map((r) => toArticle(r as Row));
}

export type ArticleInput = Partial<Omit<StoredArticle, "id" | "updatedAt">>;

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 70) || "tanpa-judul"
  );
}

/** Slugs are unique in the schema, so collisions get a numeric suffix. */
async function uniqueSlug(base: string, exceptId?: string): Promise<string> {
  let candidate = base;
  for (let n = 2; n < 100; n++) {
    const { rows } = await db.execute({
      sql: "SELECT id FROM articles WHERE slug = ?",
      args: [candidate],
    });
    const taken = rows[0] && String(rows[0].id) !== exceptId;
    if (!taken) return candidate;
    candidate = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

export async function createArticle(input: ArticleInput, authorName: string): Promise<string> {
  const id = randomUUID();
  const now = new Date().toISOString();
  const title = input.title?.trim() || "Artikel baru";

  await db.execute({
    sql: `INSERT INTO articles
      (id, slug, title, accent, deck, category, series, cover, cover_thumb, cover_alt,
       aspect, status, featured, tags, body, seo_title, seo_desc, author_name,
       published_at, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      id,
      await uniqueSlug(slugify(title)),
      title,
      input.accent ?? null,
      input.deck ?? "",
      input.category ?? "crypto",
      input.series ?? "chain-horizon",
      input.cover ?? "/media/cz-ai-agents.webp",
      input.coverThumb ?? "/media/cz-ai-agents-sm.webp",
      input.coverAlt ?? title,
      "4/5",
      "draft",
      0,
      JSON.stringify(input.tags ?? []),
      JSON.stringify(input.body ?? []),
      input.seoTitle ?? null,
      input.seoDesc ?? null,
      authorName,
      input.publishedAt || now.slice(0, 10),
      now,
      now,
    ],
  });

  return id;
}

export async function updateArticle(id: string, input: ArticleInput): Promise<void> {
  const existing = await getArticleById(id);
  if (!existing) throw new Error("Artikel tidak ditemukan");

  const title = input.title?.trim() || existing.title;

  // The slug follows the title, but only while the article has never been
  // published — changing it afterwards would break every link already shared.
  const slug =
    existing.status === "draft" && title !== existing.title
      ? await uniqueSlug(slugify(title), id)
      : existing.slug;

  await db.execute({
    sql: `UPDATE articles SET
            slug = ?, title = ?, accent = ?, deck = ?, category = ?, series = ?,
            cover_alt = ?, status = ?, featured = ?, tags = ?, body = ?,
            seo_title = ?, seo_desc = ?, published_at = ?, updated_at = ?
          WHERE id = ?`,
    args: [
      slug,
      title,
      input.accent ?? existing.accent,
      input.deck ?? existing.deck,
      input.category ?? existing.category,
      input.series ?? existing.series,
      input.coverAlt ?? existing.coverAlt,
      input.status ?? existing.status,
      (input.featured ?? existing.featured) ? 1 : 0,
      JSON.stringify(input.tags ?? existing.tags),
      JSON.stringify(input.body ?? existing.body),
      input.seoTitle ?? existing.seoTitle,
      input.seoDesc ?? existing.seoDesc,
      input.publishedAt ?? existing.publishedAt,
      new Date().toISOString(),
      id,
    ],
  });
}

export async function deleteArticle(id: string): Promise<void> {
  await db.execute({ sql: "DELETE FROM articles WHERE id = ?", args: [id] });
}
