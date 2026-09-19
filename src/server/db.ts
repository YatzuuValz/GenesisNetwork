import "server-only";
import { createClient, type Client, type InStatement } from "@libsql/client";

/**
 * libSQL speaks SQLite. With a `file:` URL it's a local file needing no signup;
 * with a `libsql://` URL it's hosted Turso. Same client, same SQL — moving to a
 * serverless host later is two environment variables, not a rewrite.
 *
 *   DATABASE_URL=file:./data/genesis.db        (default, local)
 *   DATABASE_URL=libsql://…  DATABASE_AUTH_TOKEN=…   (hosted)
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
 * The client is created on first use, never at import.
 *
 * Opening a local file throws synchronously when its directory is missing. At
 * import time that throw escapes every try/catch and fails the whole build —
 * which is exactly what happened in CI, silently, for two weeks. Created here,
 * the failure lands in the caller, where the public reads already turn "no
 * database" into "no articles". Serverless runtimes forbid I/O at module scope
 * too, so this is also what a Workers deploy requires.
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

/** Same shape the repositories already call — `db.execute(...)` — just deferred. */
export const db = {
  execute: (stmt: InStatement) => getClient().execute(stmt),
};

/** Rows come back as `unknown`; callers narrow via the mappers in ./articles. */
export type Row = Record<string, unknown>;
