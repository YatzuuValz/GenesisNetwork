/**
 * Copies the articles from the local database (data/genesis.db) into D1.
 *
 * Every article arrives as a DRAFT, whatever its local status. The local set
 * holds sample copy written for the mockup; publishing it on the live site would
 * present it as Genesis's own writing. The team publishes what is real.
 *
 * Safe to run twice: an article whose slug already exists in D1 is skipped.
 *
 *   node scripts/d1-import-articles.mjs --d1=local     (the local Worker)
 *   node scripts/d1-import-articles.mjs --d1=remote    (the live database)
 */
import { createClient } from "@libsql/client";
import { d1Execute, d1Target, lit } from "./lib/d1.mjs";

const target = d1Target();
if (!target) {
  console.error("Pakai --d1=local atau --d1=remote");
  process.exit(1);
}

const local = createClient({ url: process.env.DATABASE_URL ?? "file:./data/genesis.db" });
const { rows } = await local.execute("SELECT * FROM articles ORDER BY created_at");

if (rows.length === 0) {
  console.log("d1-import: tidak ada artikel di database lokal");
  process.exit(0);
}

const columns = [
  "id", "slug", "title", "accent", "deck", "category", "series", "cover", "cover_thumb",
  "cover_alt", "aspect", "status", "featured", "tags", "body", "seo_title", "seo_desc",
  "author_id", "author_name", "published_at", "created_at", "updated_at",
];

const statements = rows.map((row) => {
  const values = columns.map((c) => {
    if (c === "status") return lit("draft");
    // Local user ids don't exist in D1; the display name travels in author_name.
    if (c === "author_id") return "NULL";
    const v = row[c];
    return lit(typeof v === "bigint" ? Number(v) : v);
  });
  return `INSERT INTO articles (${columns.join(", ")}) VALUES (${values.join(", ")}) ON CONFLICT(slug) DO NOTHING;`;
});

d1Execute(statements.join("\n"), target);
console.log(`d1-import: ${rows.length} artikel dikirim ke D1 (${target}) sebagai draft`);
