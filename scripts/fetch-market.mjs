/**
 * Fetches real market quotes at build time and writes src/data/market.json.
 *
 * Runs on the server (GitHub Actions), not in the browser, because Yahoo's
 * endpoint sends no CORS headers — a browser request to it is blocked. CoinGecko
 * does send `access-control-allow-origin: *`, so the ticker component refreshes
 * the crypto rows client-side on top of whatever this bakes in.
 *
 * Never fails the build: if a source is unreachable the previous value is kept
 * and the row is marked stale, so the site shows an honest older number instead
 * of a blank or a crash.
 */
import { readFile, writeFile } from "node:fs/promises";

const OUT = "src/data/market.json";

const IDX = [
  { symbol: "IHSG", name: "Jakarta Composite", yahoo: "^JKSE" },
  { symbol: "BBCA", name: "Bank Central Asia", yahoo: "BBCA.JK" },
  { symbol: "BBRI", name: "Bank Rakyat Indonesia", yahoo: "BBRI.JK" },
  { symbol: "TLKM", name: "Telkom Indonesia", yahoo: "TLKM.JK" },
];

const CRYPTO = [
  { symbol: "BTC", name: "Bitcoin", coinId: "bitcoin" },
  { symbol: "ETH", name: "Ethereum", coinId: "ethereum" },
  { symbol: "SOL", name: "Solana", coinId: "solana" },
];

/** Yahoo rejects requests without a browser-ish UA. */
const UA = "Mozilla/5.0 (compatible; GenesisNetworkBot/1.0)";

async function getJson(url, headers = {}) {
  const res = await fetch(url, { headers: { "user-agent": UA, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function loadPrevious() {
  try {
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return { instruments: [] };
  }
}

const previous = await loadPrevious();
const prevBySymbol = new Map((previous.instruments ?? []).map((i) => [i.symbol, i]));

/** Reuse the last known figure rather than dropping the row entirely. */
function fallback(symbol, name, market, reason) {
  const old = prevBySymbol.get(symbol);
  console.warn(`  ! ${symbol}: ${reason} — memakai nilai sebelumnya`);
  return old
    ? { ...old, stale: true }
    : { symbol, name, market, price: null, change: null, stale: true };
}

const instruments = [];

// ---- IDX via Yahoo ----
for (const { symbol, name, yahoo } of IDX) {
  try {
    const data = await getJson(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahoo)}?interval=1d&range=1d`,
    );
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.chartPreviousClose ?? meta?.previousClose;

    if (typeof price !== "number" || typeof prevClose !== "number" || prevClose === 0) {
      instruments.push(fallback(symbol, name, "idx", "bentuk respons tidak dikenali"));
      continue;
    }

    instruments.push({
      symbol,
      name,
      market: "idx",
      price,
      change: ((price - prevClose) / prevClose) * 100,
      stale: false,
    });
    console.log(`  ${symbol.padEnd(6)} ${price}`);
  } catch (err) {
    instruments.push(fallback(symbol, name, "idx", err.message));
  }
}

// ---- crypto via CoinGecko ----
try {
  const ids = CRYPTO.map((c) => c.coinId).join(",");
  const data = await getJson(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,idr&include_24hr_change=true`,
  );

  for (const { symbol, name, coinId } of CRYPTO) {
    const row = data?.[coinId];
    if (!row || typeof row.usd !== "number") {
      instruments.push(fallback(symbol, name, "crypto", "tidak ada di respons"));
      continue;
    }
    instruments.push({
      symbol,
      name,
      market: "crypto",
      coinId,
      price: row.usd,
      priceIdr: row.idr ?? null,
      change: row.usd_24h_change ?? 0,
      stale: false,
    });
    console.log(`  ${symbol.padEnd(6)} $${row.usd}`);
  }
} catch (err) {
  for (const { symbol, name, coinId } of CRYPTO) {
    instruments.push({ ...fallback(symbol, name, "crypto", err.message), coinId });
  }
}

const payload = {
  fetchedAt: new Date().toISOString(),
  instruments,
};

await writeFile(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");

const stale = instruments.filter((i) => i.stale).length;
console.log(
  `fetch-market: ${instruments.length} instrumen ditulis ke ${OUT}` +
    (stale ? ` (${stale} memakai nilai lama)` : ""),
);
