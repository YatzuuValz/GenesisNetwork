import { founders, site } from "@/data";
import { Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function Founders() {
  return (
    <section className="border-y border-white/[0.07] bg-white/[0.012]">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow dot>Founders</Eyebrow>

              <h2 className="u-display text-bone-50 mt-6 text-[clamp(2rem,4.4vw,3.2rem)]">
                Kami membangun ini karena
                <br />
                <span className="u-accent text-volt-400 font-normal">
                  penjelasan yang jujur itu langka.
                </span>
              </h2>

              <div className="text-bone-400 mt-8 space-y-5 text-[0.975rem] leading-relaxed">
                <p>
                  Sebagian besar konten finansial di Indonesia dibuat untuk menjual sesuatu. Sisanya
                  ditulis dengan bahasa yang hanya dimengerti orang yang sudah paham sejak awal.
                </p>
                <p>
                  Genesis Network berdiri di antara keduanya: independen, tanpa produk investasi
                  untuk dijual, dan berkomitmen menjelaskan sampai orang benar-benar mengerti — bukan
                  sampai mereka merasa terkesan.
                </p>
              </div>

              <div className="mt-10 border-l-2 border-volt-500 pl-6">
                <p className="u-accent text-bone-100 text-xl leading-snug">
                  {site.promise}
                </p>
                <p className="u-eyebrow text-bone-600 mt-3 text-[0.5625rem]">
                  Bio Instagram Genesis Network
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06]">
            {founders.map((f, i) => (
              <Reveal key={f.role} delay={i * 90}>
                <div className="bg-ink-950 group flex gap-6 p-7 transition-colors duration-500 hover:bg-white/[0.025] sm:gap-8 sm:p-9">
                  <div className="relative shrink-0">
                    <div className="u-num text-bone-500 group-hover:border-volt-500/60 group-hover:text-volt-400 grid size-14 place-items-center rounded-xl border border-white/10 text-sm transition-all duration-500 sm:size-16">
                      {f.initials}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="u-display text-bone-50 text-lg">{f.name}</h3>
                    <div className="u-eyebrow text-volt-400 mt-2 text-[0.5625rem]">{f.role}</div>
                    <p className="text-bone-400 mt-4 text-[0.875rem] leading-relaxed">{f.bio}</p>
                    <div className="u-eyebrow text-bone-600 mt-5 text-[0.5625rem]">{f.focus}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
