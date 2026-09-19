import "server-only";
import { env } from "cloudflare:workers";
import type { InStatement } from "@libsql/client";

/**
 * The D1 driver, used whenever the code runs inside Cloudflare's runtime —
 * `vinext dev` locally and the deployed Worker. D1 is SQLite too, so every
 * query the repositories send works unchanged; only the call shape differs.
 *
 * The database is a binding (`DB` in wrangler.jsonc), not a URL: there is no
 * connection string or password that could leak.
 */

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  all(): Promise<{ results: Record<string, unknown>[] }>;
}

interface D1Database {
  prepare(query: string): D1Statement;
}

export async function execute(stmt: InStatement): Promise<{ rows: Record<string, unknown>[] }> {
  const { sql, args = [] } = typeof stmt === "string" ? { sql: stmt } : stmt;

  // Every call site passes positional `?` arguments; D1 has no named form.
  if (!Array.isArray(args)) throw new Error("db: named arguments are not supported on D1");

  const db = (env as unknown as { DB: D1Database }).DB;
  const { results } = await db.prepare(sql).bind(...args).all();
  return { rows: results };
}
