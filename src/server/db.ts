import "server-only";
import { createClient, type Client } from "@libsql/client";

/**
 * libSQL speaks SQLite. With a `file:` URL it's a local file needing no signup;
 * with a `libsql://` URL it's hosted Turso. Same client, same SQL — moving to a
 * serverless host later is two environment variables, not a rewrite.
 *
 *   DATABASE_URL=file:./data/genesis.db        (default, local)
 *   DATABASE_URL=libsql://…  DATABASE_AUTH_TOKEN=…   (hosted)
 */
const url = process.env.DATABASE_URL ?? "file:./data/genesis.db";

declare global {
  // Dev hot-reload would otherwise open a new connection on every edit.
  var __genesisDb: Client | undefined;
}

export const db =
  globalThis.__genesisDb ??
  createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

if (process.env.NODE_ENV !== "production") globalThis.__genesisDb = db;

/** Rows come back as `unknown`; callers narrow via the mappers in ./articles. */
export type Row = Record<string, unknown>;
