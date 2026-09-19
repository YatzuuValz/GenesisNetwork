/**
 * Runs SQL against the Cloudflare D1 database through wrangler, for the admin
 * and seed scripts. Local runs share state with `npm run start:vinext`, so what
 * a script writes is what the local Worker reads.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const DB_NAME = "genesis-network";

/** Where every local D1 command and the local Worker keep their data. */
export const LOCAL_STATE = ".wrangler/state";

/** `--d1=local` or `--d1=remote` from argv; undefined when not given. */
export function d1Target(argv = process.argv) {
  const flag = argv.find((a) => a.startsWith("--d1"));
  if (!flag) return undefined;
  const value = flag.split("=")[1];
  if (value !== "local" && value !== "remote") {
    console.error("Pakai --d1=local atau --d1=remote");
    process.exit(1);
  }
  return value;
}

/** A SQLite literal. Strings get their single quotes doubled; nothing else is special. */
export function lit(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
}

/**
 * Writes the SQL to a temporary file rather than passing it on the command line:
 * article bodies are long and full of quotes, and shells mangle both.
 */
export function d1Execute(sql, target) {
  const dir = mkdtempSync(join(tmpdir(), "gn-d1-"));
  const file = join(dir, "run.sql");
  writeFileSync(file, sql);

  const args = ["wrangler", "d1", "execute", DB_NAME, `--${target}`, "--file", `"${file}"`, "--yes"];
  if (target === "local") args.push("--persist-to", LOCAL_STATE);

  try {
    const run = spawnSync("npx", args, { stdio: "inherit", shell: true });
    if (run.status !== 0) throw new Error("wrangler d1 execute gagal");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
