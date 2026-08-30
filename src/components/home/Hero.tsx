import { site } from "@/data";
import { Arrow, Bloom, ButtonLink } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import MarketPanel from "./MarketPanel";

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
                bisa kamu pakai — tujuh konten tiap minggu, dari Instagram sampai YouTube.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-volt-500 hover:bg-volt-400 relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-[0_0_0_1px_rgba(0,95,247,0.5),0_14px_40px_-14px_rgba(0,95,247,0.85)] transition-all duration-300"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
                  <span className="relative">Ikuti di Instagram</span>
                  <Arrow className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <ButtonLink href="#karya" variant="outline">
                  Lihat karyanya
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.07] pt-7">
                {[
                  ["7", "konten / minggu"],
                  ["3", "program tetap"],
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
            <MarketPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
