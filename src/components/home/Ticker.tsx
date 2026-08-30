"use client";

import { formatChange, formatPrice } from "@/data";
import { useLiveCrypto } from "./useLiveCrypto";

/**
 * CSS-only marquee: the row is rendered twice and translated -50%, so the loop
 * is seamless without any JS measuring widths.
 */
export default function Ticker() {
  const rows = useLiveCrypto();
  const doubled = [...rows, ...rows];

  return (
    <div className="flex items-stretch border-y border-white/[0.07] bg-white/[0.015]">
      <div className="border-r border-white/[0.07] px-4 py-3.5 sm:px-6">
        <span className="u-eyebrow text-bone-500 flex items-center gap-2.5 text-[0.5625rem] whitespace-nowrap">
          <span className="bg-volt-500 u-live-dot size-1.5 rounded-full" />
          Pasar
        </span>
      </div>

      <div className="u-marquee u-mask-fade-x min-w-0 flex-1 overflow-hidden py-3.5">
        <div className="flex w-max items-center gap-9 pr-9">
          {doubled.map((i, idx) => (
            <div key={`${i.symbol}-${idx}`} className="flex shrink-0 items-center gap-2.5">
              <span className="u-eyebrow text-bone-500 text-[0.625rem]">{i.symbol}</span>
              <span className="u-num text-bone-200 text-[0.8125rem]">{formatPrice(i)}</span>
              <span
                className={`u-num text-[0.6875rem] ${
                  i.change === null || i.change === 0
                    ? "text-bone-600"
                    : i.change > 0
                      ? "text-bull"
                      : "text-bear"
                }`}
              >
                {i.change !== null && i.change !== 0 && (i.change > 0 ? "▲ " : "▼ ")}
                {formatChange(i.change)}
              </span>
              <span aria-hidden className="text-bone-600 ml-6 select-none">
                /
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
