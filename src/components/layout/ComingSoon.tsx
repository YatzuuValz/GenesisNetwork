import { site } from "@/data";
import { Arrow, Bloom, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

/**
 * Shown in place of Artikel / Free Research while `features` has them switched
 * off in src/data/site.ts. The routes stay live rather than 404ing, so links
 * shared anywhere keep working and visitors learn what's coming.
 */
export default function ComingSoon({
  eyebrow,
  title,
  accent,
  lead,
  bullets,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  bullets: { label: string; detail: string }[];
}) {
  return (
    <section className="u-noise relative isolate flex min-h-[78vh] items-center overflow-hidden pt-[132px] pb-24 sm:pt-[152px]">
      <div aria-hidden className="u-grid-field u-mask-fade-b absolute inset-0 opacity-50" />
      <Bloom className="-top-24 left-[10%] h-[28rem] w-[28rem]" opacity={0.26} />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{eyebrow}</Eyebrow>
                <span className="u-eyebrow border-volt-500/40 bg-volt-500/12 text-volt-400 rounded-full border px-2.5 py-1 text-[0.5625rem]">
                  Segera hadir
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="u-display text-bone-50 mt-7 text-[clamp(2.4rem,5.4vw,4.2rem)]">
                {title}
                <br />
                <span className="u-accent text-volt-400 font-normal">{accent}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-bone-400 mt-7 max-w-xl text-[1.0125rem] leading-relaxed">{lead}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-volt-500 hover:bg-volt-400 relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(0,95,247,0.9)] transition-all duration-300"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
                  <span className="relative">Sementara ini, ikuti Instagram</span>
                  <Arrow className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <ButtonLink href="/partnership" variant="outline">
                  Kerja sama
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="u-panel rounded-2xl p-7 sm:p-8">
              <div className="u-eyebrow text-bone-600 text-[0.5625rem]">Yang sedang disiapkan</div>
              <ul className="mt-7">
                {bullets.map((b, i) => (
                  <li
                    key={b.label}
                    className="flex gap-5 border-b border-white/[0.07] py-5 first:pt-0 last:border-0 last:pb-0"
                  >
                    <span className="u-num text-volt-500 shrink-0 pt-0.5 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-bone-100 text-[0.9rem] font-semibold">{b.label}</div>
                      <p className="text-bone-500 mt-1.5 text-[0.8125rem] leading-relaxed">
                        {b.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
