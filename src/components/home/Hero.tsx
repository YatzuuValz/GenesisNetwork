import Link from "next/link";
import { instruments, site } from "@/data";
import { Arrow, Bloom, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

/** Deterministic sparkline — no RNG, so server and client render identically. */
const SPARK =
  "M0,44 L18,39 L36,42 L54,31 L72,34 L90,25 L108,28 L126,17 L144,21 L162,12 L180,15 L198,6";

const panelRows = instruments.slice(0, 5);

export default function Hero() {
  return (
    <section className="u-noise relative isolate overflow-hidden pt-[132px] pb-24 sm:pt-[152px] lg:pb-32">
      {/* backdrop layers */}
      <div aria-hidden className="u-grid-field u-mask-fade-b absolute inset-0 opacity-60" />
      <Bloom className="-top-32 left-[8%] h-[34rem] w-[34rem]" opacity={0.34} />
      <Bloom className="top-[18%] right-[-6%] h-[26rem] w-[26rem]" opacity={0.2} />
      <div
        aria-hidden
        className="from-ink-950 absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t to-transparent"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid items-end gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          {/* ---- headline column ---- */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="u-eyebrow text-bone-400 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
                  <span className="bg-volt-500 u-live-dot size-1.5 rounded-full" />
                  Media finansial independen
                </span>
                <span className="u-eyebrow text-bone-600">{site.city}</span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="u-display text-bone-50 mt-8 text-[clamp(2.6rem,5.5vw,4.5rem)]">
                Pasar bergerak cepat.
                <br />
                Penjelasannya
                <br />
                <span className="u-accent text-volt-400 font-normal">tidak harus rumit.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-bone-400 mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed">
                Crypto, saham, dan makroekonomi untuk generasi yang tumbuh bareng grafik harga.
                Kami baca datanya, buang jargonnya, dan tulis ulang jadi sesuatu yang benar-benar
                bisa kamu pakai.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <ButtonLink href="/artikel">Baca artikel terbaru</ButtonLink>
                <ButtonLink href="/research" variant="outline">
                  Free research
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.07] pt-7">
                {[
                  ["7", "konten / minggu"],
                  ["3", "pilar riset"],
                  ["0", "janji cuan"],
                ].map(([n, l]) => (
                  <div key={l} className="flex items-baseline gap-2.5">
                    <span className="u-num text-bone-50 text-xl leading-none font-medium">{n}</span>
                    <span className="text-bone-500 text-xs">{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---- market panel ---- */}
          <Reveal delay={220}>
            <div className="u-panel relative rounded-2xl p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <Eyebrow dot>Pasar hari ini</Eyebrow>
                <span className="text-bone-600 text-[0.625rem]">data ilustratif</span>
              </div>

              {/* featured instrument */}
              <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-bone-500 u-eyebrow text-[0.625rem]">IHSG</div>
                    <div className="u-num text-bone-50 mt-2 text-2xl leading-none font-medium">
                      7.284,15
                    </div>
                  </div>
                  <span className="u-num text-bull bg-bull/10 rounded-md px-2 py-1 text-xs">
                    +0,47%
                  </span>
                </div>

                <svg
                  viewBox="0 0 198 50"
                  fill="none"
                  aria-hidden
                  className="mt-4 h-14 w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#005FF7" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#005FF7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${SPARK} L198,50 L0,50 Z`} fill="url(#spark-fill)" />
                  <path
                    d={SPARK}
                    stroke="#3D86FF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="198" cy="6" r="3" fill="#3D86FF" />
                </svg>
              </div>

              <ul className="mt-2 divide-y divide-white/[0.06]">
                {panelRows.map((row) => (
                  <li key={row.symbol} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="text-bone-100 text-[0.8125rem] font-semibold">
                        {row.symbol}
                      </div>
                      <div className="text-bone-600 truncate text-[0.6875rem]">{row.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="u-num text-bone-200 text-[0.8125rem]">{row.price}</div>
                      <div
                        className={`u-num text-[0.6875rem] ${
                          row.change > 0
                            ? "text-bull"
                            : row.change < 0
                              ? "text-bear"
                              : "text-bone-600"
                        }`}
                      >
                        {row.change > 0 ? "+" : ""}
                        {row.change.toFixed(2).replace(".", ",")}%
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/research"
                className="group text-bone-400 hover:text-bone-50 mt-3 flex items-center justify-between rounded-lg border border-white/[0.07] px-3.5 py-2.5 text-xs transition-colors hover:border-white/20"
              >
                Baca riset di balik angka ini
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
