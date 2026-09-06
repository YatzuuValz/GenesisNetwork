/**
 * Creates the schema, then seeds articles from src/data/articles.ts on first run.
 *
 * Idempotent: safe to run repeatedly. Seeding only happens when the table is
 * empty, so it never overwrites edits made in the Studio.
 *
 *   node scripts/migrate.mjs
 */
import { createClient } from "@libsql/client";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const url = process.env.DATABASE_URL ?? "file:./data/genesis.db";

if (url.startsWith("file:")) {
  await mkdir(dirname(url.slice(5)), { recursive: true });
}

const db = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
     id            TEXT PRIMARY KEY,
     email         TEXT NOT NULL UNIQUE,
     name          TEXT NOT NULL,
     password_hash TEXT NOT NULL,
     created_at    TEXT NOT NULL
   )`,

  `CREATE TABLE IF NOT EXISTS sessions (
     token      TEXT PRIMARY KEY,
     user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     expires_at TEXT NOT NULL
   )`,

  `CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id)`,

  `CREATE TABLE IF NOT EXISTS articles (
     id           TEXT PRIMARY KEY,
     slug         TEXT NOT NULL UNIQUE,
     title        TEXT NOT NULL,
     accent       TEXT,
     deck         TEXT NOT NULL DEFAULT '',
     category     TEXT NOT NULL,
     series       TEXT NOT NULL,
     cover        TEXT NOT NULL DEFAULT '',
     cover_thumb  TEXT NOT NULL DEFAULT '',
     cover_alt    TEXT NOT NULL DEFAULT '',
     aspect       TEXT NOT NULL DEFAULT '4/5',
     status       TEXT NOT NULL DEFAULT 'draft',
     featured     INTEGER NOT NULL DEFAULT 0,
     tags         TEXT NOT NULL DEFAULT '[]',   -- JSON array
     body         TEXT NOT NULL DEFAULT '[]',   -- JSON array of Block
     seo_title    TEXT,
     seo_desc     TEXT,
     author_id    TEXT REFERENCES users(id),
     author_name  TEXT NOT NULL DEFAULT '',
     published_at TEXT,
     created_at   TEXT NOT NULL,
     updated_at   TEXT NOT NULL
   )`,

  `CREATE INDEX IF NOT EXISTS articles_status ON articles(status)`,
  `CREATE INDEX IF NOT EXISTS articles_updated ON articles(updated_at DESC)`,
];

for (const sql of statements) await db.execute(sql);
console.log(`migrate: schema siap di ${url}`);

// ---- seed ----------------------------------------------------------------

const { rows } = await db.execute("SELECT COUNT(*) AS n FROM articles");
if (Number(rows[0].n) > 0) {
  console.log(`migrate: ${rows[0].n} artikel sudah ada — seed dilewati`);
  process.exit(0);
}

// articles.ts is TypeScript; read it as text and pull the objects out via the
// same shape the app uses. Importing TS from plain node would need a loader.
const { articles } = await import("../src/data/articles.ts").catch(() => ({ articles: null }));

if (!articles) {
  console.log("migrate: tidak bisa membaca articles.ts — jalankan `npm run seed` sebagai gantinya");
  process.exit(0);
}

const now = new Date().toISOString();

for (const [i, a] of articles.entries()) {
  await db.execute({
    sql: `INSERT INTO articles
      (id, slug, title, accent, deck, category, series, cover, cover_thumb, cover_alt,
       aspect, status, featured, tags, body, author_name, published_at, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      crypto.randomUUID(),
      a.slug,
      a.title,
      a.accent ?? null,
      a.deck,
      a.category,
      a.series,
      a.cover,
      a.coverThumb,
      a.title,
      a.aspect,
      // Everything that shipped in the data file was live copy.
      i % 5 === 4 ? "draft" : "published",
      a.featured ? 1 : 0,
      JSON.stringify(a.tags),
      JSON.stringify(a.body),
      a.author.name,
      a.publishedAt,
      now,
      now,
    ],
  });
}

console.log(`migrate: ${articles.length} artikel di-seed`);
