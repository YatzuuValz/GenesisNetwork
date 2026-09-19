import "server-only";
import { createClient, type Client, type InStatement } from "@libsql/client";

/**
 * The libSQL driver: a local SQLite file for `npm run dev` and the scripts,
 * and the one the GitHub Pages build resolves to (Node never sees the D1
 * driver — see the "#db-driver" entry in package.json).
 *
 *   DATABASE_URL=file:./data/genesis.db        (default, local)
 */
function resolveUrl(): string | undefined {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  // The static export only reads a database it is explicitly pointed at. Without
  // this, a local export quietly bakes in whatever is in data/, while CI — which
  // has no data/ — builds a different site. The two must be the same build.
  if (process.env.DEPLOY_TARGET === "github-pages") return undefined;

  return "file:./data/genesis.db";
}

declare global {
  // Dev hot-reload would otherwise open a new connection on every edit.
  var __genesisDb: Client | undefined;
}

let client: Client | undefined;

/**
 * Created on first use, never at import: opening a local file throws
 * synchronously when its directory is missing, and at import time that throw
 * escaped every try/catch and failed CI for two weeks.
 */
function getClient(): Client {
  client ??= globalThis.__genesisDb;
  if (client) return client;

  const url = resolveUrl();
  if (!url) throw new Error("db: no database configured for this build");

  client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  if (process.env.NODE_ENV !== "production") globalThis.__genesisDb = client;
  return client;
}

export async function execute(stmt: InStatement): Promise<{ rows: Record<string, unknown>[] }> {
  return getClient().execute(stmt);
}
