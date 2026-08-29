/**
 * Static-export fixup for GitHub Pages.
 *
 * `next build` with output:'export' writes App Router prefetch payloads into
 * nested directories:
 *
 *   out/artikel/__next.artikel/__PAGE__.txt
 *
 * but the client requests them with the segments dot-joined:
 *
 *   out/artikel/__next.artikel.__PAGE__.txt
 *
 * On a server that mismatch is invisible; on a plain static host every prefetch
 * 404s and each link click degrades to a full page reload. This copies each
 * payload to the flattened name the client actually asks for.
 *
 * It only ever *adds* files, so if Next changes this naming the script simply
 * stops matching — worst case we're back to today's behaviour, nothing breaks.
 */
import { readdir, copyFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";

/** Collect every file beneath `dir`. */
async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else found.push(full);
  }
  return found;
}

const files = await walk(OUT);
let copied = 0;

for (const file of files) {
  const parts = relative(OUT, file).split(sep);
  const marker = parts.findIndex((p) => p.startsWith("__next."));

  // Only payloads that Next nested inside a `__next.*` directory.
  if (marker === -1 || marker === parts.length - 1) continue;

  const base = join(OUT, ...parts.slice(0, marker));
  const flattened = parts.slice(marker).join(".");
  const target = join(base, flattened);

  if (target === file) continue;
  try {
    await stat(target);
    continue; // already present
  } catch {
    /* not there yet — copy it */
  }

  await copyFile(file, target);
  copied += 1;
}

console.log(`flatten-rsc-payloads: wrote ${copied} flattened payload(s)`);
