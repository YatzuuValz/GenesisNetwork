import Image from "next/image";
import { audienceStats, caseStudyAssets, revenueStreams } from "@/data";
import { Bloom, ButtonLink, Eyebrow, StatBlock } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function PartnershipTeaser() {
  return (
    <section className="u-noise relative isolate overflow-hidden">
      <div aria-hidden className="u-grid-field absolute inset-0 opacity-40" />
      <Bloom className="right-[-8%] bottom-[-10%] h-[32rem] w-[32rem]" opacity={0.24} />

      <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <div>
              <Eyebrow dot>Partnership</Eyebrow>

              <h2 className="u-display text-bone-50 mt-6 text-[clamp(2.1rem,4.8vw,3.5rem)]">
                Audiens yang datang untuk belajar,
                <br />
                <span className="u-accent text-volt-400 font-normal">bukan untuk scroll.</span>
              </h2>

              <p className="text-bone-400 mt-7 max-w-lg text-[0.975rem] leading-relaxed">
                Delapan dari sepuluh orang yang melihat konten kami belum mengikuti akun ini. Artinya
                jangkauan kami tumbuh dari kualitas materi, bukan dari basis pengikut yang sudah ada
                — dan brand yang masuk ikut menumpang pertumbuhan itu.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 lg:grid-cols-2">
                {audienceStats.map((s) => (
                  <StatBlock key={s.label} {...s} />
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-3.5">
                <ButtonLink href="/partnership">Lihat media kit</ButtonLink>
                <ButtonLink href="/partnership#contact" variant="outline">
                  Ajukan kerja sama
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div>
              <div className="u-panel rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Eyebrow>Studi kasus</Eyebrow>
                  <span className="u-eyebrow text-bone-600 text-[0.5625rem]">Tokocrypto</span>
                </div>

                <h3 className="u-display text-bone-50 mt-5 text-2xl">
                  Kampanye Tokenized Stocks
                </h3>
                <p className="text-bone-400 mt-3.5 text-sm leading-relaxed">
                  Satu alur cerita dalam empat tahap — teaser, launch, engagement, closing — dibuat
                  agar produk dijelaskan lebih dulu sebelum dijual.
                </p>

                <div className="mt-7 grid grid-cols-4 gap-2.5">
                  {caseStudyAssets.map((a, i) => (
                    <figure key={a.src} className="group">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/[0.07]">
                        <Image
                          src={a.src}
                          alt={`${a.label} — kampanye Tokocrypto`}
                          fill
                          sizes="(max-width: 640px) 22vw, 11vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="from-ink-950/70 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                      <figcaption className="u-eyebrow text-bone-600 mt-2.5 text-[0.5rem]">
                        {String(i + 1).padStart(2, "0")} {a.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
                {revenueStreams.slice(0, 4).map((r) => (
                  <div key={r.name} className="bg-ink-950 p-5">
                    <div className="text-bone-100 text-[0.8125rem] font-semibold">{r.name}</div>
                    <div className="text-bone-600 mt-1.5 text-[0.6875rem]">{r.product}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
