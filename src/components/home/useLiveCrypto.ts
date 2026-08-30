"use client";

import { useEffect, useState } from "react";
import { instruments, type Instrument } from "@/data";

type CoinGeckoRow = { usd?: number; idr?: number; usd_24h_change?: number };
type PriceMap = Record<string, CoinGeckoRow>;

/**
 * CoinGecko's free endpoint starts returning 429 after roughly three requests in
 * quick succession from one IP. Two things keep us well under that:
 *
 *  1. Single-flight — every component calling this hook shares one request, so a
 *     page with both the ticker and the market panel makes one call, not two.
 *  2. A sessionStorage cache with a short TTL, so reloading the page a few times
 *     in a row reuses the last response instead of hammering the API.
 *
 * On failure the build-time quotes stay on screen. They carry a visible "per
 * HH:MM WIB" timestamp, so an older number is labelled rather than passed off as
 * current.
 */
const CACHE_KEY = "gn:crypto";
const TTL_MS = 60_000;
const REFRESH_MS = 60_000;

const ENDPOINT = (ids: string) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,idr&include_24hr_change=true`;

/** Shared across every hook instance on the page. */
let inFlight: Promise<PriceMap | null> | null = null;

function readCache(): PriceMap | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: PriceMap };
    return Date.now() - at < TTL_MS ? data : null;
  } catch {
    // Private mode, disabled storage, or malformed entry — just refetch.
    return null;
  }
}

function writeCache(data: PriceMap) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable — the in-memory single-flight still helps */
  }
}

function fetchPrices(ids: string): Promise<PriceMap | null> {
  const cached = readCache();
  if (cached) return Promise.resolve(cached);
  if (inFlight) return inFlight;

  inFlight = fetch(ENDPOINT(ids))
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((data: PriceMap) => {
      writeCache(data);
      return data;
    })
    .catch(() => null)
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

function merge(rows: Instrument[], data: PriceMap): Instrument[] {
  return rows.map((row) => {
    const live = row.coinId ? data[row.coinId] : undefined;
    if (!live || typeof live.usd !== "number") return row;
    return {
      ...row,
      price: live.usd,
      priceIdr: live.idr ?? row.priceIdr,
      change: live.usd_24h_change ?? row.change,
      stale: false,
    };
  });
}

export function useLiveCrypto(): Instrument[] {
  const [rows, setRows] = useState<Instrument[]>(instruments);

  useEffect(() => {
    const ids = instruments
      .map((i) => i.coinId)
      .filter((id): id is string => Boolean(id))
      .join(",");
    if (!ids) return;

    let active = true;

    const load = () => {
      fetchPrices(ids).then((data) => {
        if (active && data) setRows((current) => merge(current, data));
      });
    };

    /** Polling only — a hidden tab shouldn't burn requests nobody will read. */
    const loadIfVisible = () => {
      if (document.visibilityState === "visible") load();
    };

    // The first load always runs: a tab opened in the background (cmd-click, or
    // a restored session) would otherwise sit on build-time numbers until
    // focused, and it costs a single cached-or-shared request.
    load();

    const timer = setInterval(loadIfVisible, REFRESH_MS);
    document.addEventListener("visibilitychange", loadIfVisible);

    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", loadIfVisible);
    };
  }, []);

  return rows;
}
