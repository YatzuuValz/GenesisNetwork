import { instruments } from "@/data";

/**
 * CSS-only marquee: the row is rendered twice and translated -50%, so the loop
 * is seamless without any JS measuring widths.
 */
export default function Ticker() {
  const row = [...instruments, ...instruments];

  return (
    <div className="border-y border-white/[0.07] bg-white/[0.015]">
      <div className="u-marquee u-mask-fade-x overflow-hidden py-3.5">
        <div className="flex w-max items-center gap-9 pr-9">
          {row.map((i, idx) => (
            <div key={`${i.symbol}-${idx}`} className="flex shrink-0 items-center gap-2.5">
              <span className="u-eyebrow text-bone-500 text-[0.625rem]">{i.symbol}</span>
              <span className="u-num text-bone-200 text-[0.8125rem]">{i.price}</span>
              <span
                className={`u-num text-[0.6875rem] ${
                  i.change > 0 ? "text-bull" : i.change < 0 ? "text-bear" : "text-bone-600"
                }`}
              >
                {i.change > 0 ? "▲" : i.change < 0 ? "▼" : "—"}{" "}
                {Math.abs(i.change).toFixed(2).replace(".", ",")}%
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
