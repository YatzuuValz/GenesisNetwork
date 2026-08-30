"use client";

import { formatChange, formatFetchedAt, formatPrice, marketSnapshot, site } from "@/data";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import { useLiveCrypto } from "./useLiveCrypto";

export default function MarketPanel() {
  const rows = useLiveCrypto();
  const lead = rows.find((i) => i.symbol === "IHSG") ?? rows[0];
  const rest = rows.filter((i) => i.symbol !== lead?.symbol).slice(0, 5);

  const tone = (change: number | null) =>
    change === null || change === 0 ? "text-bone-600" : change > 0 ? "text-bull" : "text-bear";

  return (
    <div className="u-panel relative rounded-2xl p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <Eyebrow dot>Pasar hari ini</Eyebrow>
        <span className="text-bone-600 text-right text-[0.625rem] leading-tight">
          {formatFetchedAt(marketSnapshot.fetchedAt)}
        </span>
      </div>

      {lead && (
        <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="u-eyebrow text-bone-500 text-[0.625rem]">{lead.symbol}</div>
              <div className="u-num text-bone-50 mt-2 text-2xl leading-none font-medium">
                {formatPrice(lead)}
              </div>
              <div className="text-bone-600 mt-2 truncate text-[0.6875rem]">{lead.name}</div>
            </div>
            <span
              className={`u-num rounded-md px-2 py-1 text-xs ${tone(lead.change)} ${
                lead.change === null || lead.change === 0
                  ? "bg-white/5"
                  : lead.change > 0
                    ? "bg-bull/10"
                    : "bg-bear/10"
              }`}
            >
              {formatChange(lead.change)}
            </span>
          </div>
        </div>
      )}

      <ul className="mt-2 divide-y divide-white/[0.06]">
        {rest.map((row) => (
          <li key={row.symbol} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <div className="text-bone-100 text-[0.8125rem] font-semibold">{row.symbol}</div>
              <div className="text-bone-600 truncate text-[0.6875rem]">{row.name}</div>
            </div>
            <div className="text-right">
              <div className="u-num text-bone-200 text-[0.8125rem]">{formatPrice(row)}</div>
              <div className={`u-num text-[0.6875rem] ${tone(row.change)}`}>
                {formatChange(row.change)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <a
        href={site.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group text-bone-400 hover:text-bone-50 mt-3 flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] px-3.5 py-2.5 text-xs transition-colors hover:border-white/20"
      >
        Kami bahas angka ini tiap minggu
        <Arrow className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      <p className="text-bone-600 mt-3 text-[0.625rem] leading-relaxed">
        Crypto diperbarui saat halaman dibuka. Saham per waktu di atas, tertunda ±15 menit.
      </p>
    </div>
  );
}
