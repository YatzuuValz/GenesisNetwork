/**
 * Serves the static export the way GitHub Pages does: under /GenesisNetwork/,
 * with trailing-slash directories and a 404.html fallback.
 *
 * Testing `out/` any other way hides base-path bugs — every one found so far
 * (images, prefetch payloads) passed at the root and failed on Pages.
 *
 *   DEPLOY_TARGET=github-pages npm run build && node scripts/flatten-rsc-payloads.mjs
 *   node scripts/serve-export.mjs            → http://localhost:4173/GenesisNetwork/
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const OUT = "out";
const BASE = "/GenesisNetwork";
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function isFile(path) {
  return stat(path).then(
    (s) => s.isFile(),
    () => false,
  );
}

async function resolve(urlPath) {
  if (!urlPath.startsWith(BASE + "/")) return null;
  // normalize() collapses `..`, so a request cannot climb out of out/.
  const rel = normalize(decodeURIComponent(urlPath.slice(BASE.length))).replace(/^([/\\])+/, "");
  if (rel.startsWith("..")) return null;

  const candidates = urlPath.endsWith("/")
    ? [join(OUT, rel, "index.html")]
    : [join(OUT, rel), join(OUT, rel + ".html"), join(OUT, rel, "index.html")];

  for (const c of candidates) if (await isFile(c)) return c;
  return null;
}

createServer(async (req, res) => {
  const urlPath = new URL(req.url, "http://localhost").pathname;

  // Pages redirects a directory without its slash; so do we. The root is not
  // this project's on Pages at all — redirecting it just saves a confusing
  // first load, where the 404 page hydrates outside the base path and React
  // reports a mismatch that real visitors can never hit.
  if (urlPath === BASE || urlPath === "/") {
    res.writeHead(301, { location: BASE + "/" }).end();
    return;
  }

  const file = await resolve(urlPath);
  if (file) {
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
    return;
  }

  const notFound = join(OUT, "404.html");
  res.writeHead(404, { "content-type": TYPES[".html"] });
  res.end((await isFile(notFound)) ? await readFile(notFound) : "404");
}).listen(PORT, () => console.log(`serve-export: http://localhost:${PORT}${BASE}/`));
