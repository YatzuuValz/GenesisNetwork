"use client";

import { formatChange, formatFetchedAt, formatPrice, marketSnapshot, site } from "@/data";
import type { Instrument } from "@/data";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import { useLiveCrypto } from "./useLiveCrypto";

const tone = (change: number | null) =>
  change === null || change === 0 ? "text-bone-600" : change > 0 ? "text-bull" : "text-bear";

function Row({ row, lead = false }: { row: Instrument; lead?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <div
          className={`font-semibold ${lead ? "text-bone-50 text-[0.9375rem]" : "text-bone-100 text-[0.8125rem]"}`}
        >
          {row.symbol}
        </div>
        <div className="text-bone-600 truncate text-[0.6875rem]">{row.name}</div>
      </div>
      <div className="text-right">
        <div
          className={`u-num text-bone-200 ${lead ? "text-[0.9375rem] font-medium" : "text-[0.8125rem]"}`}
        >
          {formatPrice(row)}
        </div>
        <div className={`u-num text-[0.6875rem] ${tone(row.change)}`}>
          {formatChange(row.change)}
        </div>
      </div>
    </li>
  );
}

export default function MarketPanel() {
  const rows = useLiveCrypto();

  // Grouped rather than interleaved: two asset classes with different update
  // rules shouldn't read as one undifferentiated list.
  const saham = rows.filter((i) => i.market === "idx");
  const crypto = rows.filter((i) => i.market === "crypto");

  return (
    <div className="u-panel relative rounded-2xl p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <Eyebrow dot>Pasar hari ini</Eyebrow>
        <span className="text-bone-600 text-right text-[0.625rem] leading-tight">
          {formatFetchedAt(marketSnapshot.fetchedAt)}
        </span>
      </div>

      {saham.length > 0 && (
        <section className="mt-5">
          <div className="u-eyebrow text-bone-600 flex items-center justify-between border-b border-white/[0.07] pb-2.5 text-[0.5rem]">
            <span>Saham · IDX</span>
            <span className="text-bone-700">tertunda ±15 mnt</span>
          </div>
          <ul className="divide-y divide-white/[0.05]">
            {saham.map((row, i) => (
              <Row key={row.symbol} row={row} lead={i === 0} />
            ))}
          </ul>
        </section>
      )}

      {crypto.length > 0 && (
        <section className="mt-5">
          <div className="u-eyebrow text-bone-600 flex items-center justify-between border-b border-white/[0.07] pb-2.5 text-[0.5rem]">
            <span>Crypto</span>
            <span className="text-volt-400/70">langsung</span>
          </div>
          <ul className="divide-y divide-white/[0.05]">
            {crypto.map((row) => (
              <Row key={row.symbol} row={row} />
            ))}
          </ul>
        </section>
      )}

      <a
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group text-bone-400 hover:text-bone-50 mt-5 flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] px-3.5 py-2.5 text-xs transition-colors hover:border-white/20"
      >
        Kami bahas angka ini tiap minggu
        <Arrow className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
}
