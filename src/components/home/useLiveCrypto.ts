"use client";

import { useEffect, useState } from "react";
import { instruments, type Instrument } from "@/data";

type CoinGeckoRow = { usd?: number; idr?: number; usd_24h_change?: number };

/**
 * Returns the build-time quotes with the crypto rows refreshed from CoinGecko.
 *
 * CoinGecko is the only source here that can be read from a browser — it sends
 * `access-control-allow-origin: *`. Yahoo (the IDX rows) sends no CORS headers,
 * so those keep whatever scripts/fetch-market.mjs baked in at build time.
 *
 * Starts from the baked values so the first paint is already correct; a failed
 * request leaves them untouched rather than blanking the strip.
 */
export function useLiveCrypto(): Instrument[] {
  const [rows, setRows] = useState<Instrument[]>(instruments);

  useEffect(() => {
    const ids = instruments.filter((i) => i.coinId).map((i) => i.coinId);
    if (ids.length === 0) return;

    const controller = new AbortController();

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd,idr&include_24hr_change=true`,
      { signal: controller.signal },
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: Record<string, CoinGeckoRow>) => {
        setRows((current) =>
          current.map((row) => {
            const live = row.coinId ? data[row.coinId] : undefined;
            if (!live || typeof live.usd !== "number") return row;
            return {
              ...row,
              price: live.usd,
              priceIdr: live.idr ?? row.priceIdr,
              change: live.usd_24h_change ?? row.change,
              stale: false,
            };
          }),
        );
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return rows;
}
