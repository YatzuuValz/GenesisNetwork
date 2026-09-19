import "server-only";
import { execute } from "#db-driver";

/**
 * The one door every query goes through. Which database is behind it depends
 * on where the code runs, chosen at build time by package.json "imports":
 *
 *   inside Cloudflare's runtime (workerd)  →  D1          db-driver.d1.ts
 *   everywhere else (Node)                 →  libSQL      db-driver.libsql.ts
 *
 * Both speak SQLite, so the repositories never know the difference. Node never
 * even sees the D1 driver, whose `cloudflare:workers` import exists only in
 * workerd — that is what keeps the GitHub Pages build working.
 */
export const db = { execute };

/** Rows come back as plain objects; callers narrow via the mappers in ./articles. */
export type Row = Record<string, unknown>;
