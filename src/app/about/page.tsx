import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import { audienceStats, founders, seriesList, site } from "@/data";
import PageHero from "@/components/layout/PageHero";
import { Arrow, Bloom, ButtonLink, Eyebrow, StatBlock } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Genesis Network Indonesia — media finansial independen untuk audiens 18–35, membahas crypto, saham, dan makroekonomi dengan bahasa yang sederhana.",
};

const purposes = [
  "Membangun media finansial yang independen dan tepercaya untuk anak muda Indonesia.",
  "Membuat topik keuangan yang rumit jadi lebih mudah dipahami lewat konten yang sederhana dan relatable.",
  "Meningkatkan kesadaran dan literasi finansial di bidang keuangan, saham, kripto, dan makroekonomi.",
  "Menghubungkan tren pasar dengan percakapan sehari-hari dan budaya populer.",
  "Membangun ekosistem media yang bisa tumbuh lewat audiens, komunitas, dan kolaborasi kreatif.",
];

const principles = [
  {
    title: "Jelaskan, jangan pamer",
    body: "Kalau sebuah kalimat hanya dimengerti orang yang sudah paham, kalimat itu gagal. Kami tulis ulang sampai lulus tes itu.",
  },
  {
    title: "Sebut yang tidak kami tahu",
    body: "Setiap analisis punya batas. Menyebut batasnya membuat sisanya lebih layak dipercaya.",
  },
  {
    title: "Tidak menjual mimpi",
    body: "Kami tidak menjual produk investasi dan tidak menjanjikan imbal hasil. Yang kami jual cuma kejelasan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Media finansial independen"
        accent="untuk yang baru mulai."
        lead={`${site.legalName} dibangun untuk audiens 18–35 yang ingin paham pasar tanpa harus lebih dulu belajar bahasanya. Crypto, saham, makro — disampaikan sederhana, menarik, dan menyenangkan.`}
        aside={
          <div className="u-panel rounded-2xl p-7">
            <div className="u-eyebrow text-bone-600 text-[0.5625rem]">Instagram · 30 hari</div>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
              {audienceStats.map((s) => (
                <StatBlock key={s.label} {...s} />
              ))}
            </div>
          </div>
        }
      />

      {/* ---- objective ---- */}
      <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Objective</Eyebrow>
              <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.8rem,3.8vw,2.8rem)]">
                Menjadi media finansial yang punya nama sendiri, bukan{" "}
                <span className="u-accent text-volt-400 font-normal">bayangan orang lain.</span>
              </h2>
              <p className="text-bone-400 mt-7 text-[0.975rem] leading-relaxed">
                Genesis Network berdiri sebagai platform independen di Indonesia yang membahas
                keuangan, saham, kripto, dan makroekonomi dengan cara yang sederhana, menarik, dan
                menyenangkan untuk audiens muda.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <Eyebrow>Purpose</Eyebrow>
              <ol className="mt-8">
                {purposes.map((p, i) => (
                  <li
                    key={p}
                    className="flex gap-6 border-b border-white/[0.07] py-6 last:border-0"
                  >
                    <span className="u-num text-volt-500 shrink-0 pt-1 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-bone-300 text-[0.975rem] leading-relaxed">{p}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- principles ---- */}
      <section className="border-y border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <Reveal>
            <Eyebrow dot>Prinsip redaksi</Eyebrow>
            <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)]">
              Tiga aturan yang tidak kami tawar
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="bg-ink-950 flex h-full flex-col p-8">
                  <span className="u-num text-bone-700 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="u-display text-bone-50 mt-6 text-xl">{p.title}</h3>
                  <p className="text-bone-400 mt-4 text-[0.875rem] leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- founders ---- */}
      <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
        <Reveal>
          <Eyebrow>Tim</Eyebrow>
          <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.9rem,4vw,3rem)]">
            Orang di balik Genesis
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {founders.map((f, i) => (
            <Reveal key={f.role} delay={i * 90}>
              <div className="u-panel group flex h-full flex-col rounded-2xl p-8 transition-colors duration-500 hover:border-white/20">
                <div className="u-num text-bone-500 group-hover:border-volt-500/60 group-hover:text-volt-400 grid size-16 place-items-center rounded-2xl border border-white/10 text-sm transition-all duration-500">
                  {f.initials}
                </div>
                <h3 className="u-display text-bone-50 mt-7 text-xl">{f.name}</h3>
                <div className="u-eyebrow text-volt-400 mt-2.5 text-[0.5625rem]">{f.role}</div>
                <p className="text-bone-400 mt-5 flex-1 text-[0.875rem] leading-relaxed">{f.bio}</p>
                <div className="u-eyebrow text-bone-600 mt-7 border-t border-white/[0.07] pt-5 text-[0.5rem]">
                  {f.focus}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- what we make ---- */}
      <section className="border-y border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <div>
                <Eyebrow>Yang kami produksi</Eyebrow>
                <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)]">
                  Tujuh konten setiap minggu
                </h2>
                <p className="text-bone-400 mt-6 text-[0.95rem] leading-relaxed">
                  Dirotasi lewat empat program tetap di Instagram, TikTok, dan YouTube. Jadwalnya
                  konsisten supaya pembaca tahu kapan harus kembali.
                </p>
                <div className="mt-9">
                  <ButtonLink href="/artikel">Lihat karyanya</ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
                {seriesList.map((s) => (
                  <div key={s.slug} className="bg-ink-950 p-7">
                    <h3 className="u-display text-bone-50 text-lg">{s.name}</h3>
                    <div className="u-eyebrow text-volt-400 mt-2.5 text-[0.5rem]">{s.format}</div>
                    <p className="text-bone-400 mt-4 text-[0.8125rem] leading-relaxed">{s.blurb}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- contact ---- */}
      <section className="u-noise relative isolate overflow-hidden">
        <Bloom className="top-0 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2" opacity={0.18} />

        <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
          <Reveal>
            <div className="u-panel flex flex-col items-start gap-9 rounded-2xl p-9 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-6">
                <Image
                  src="/brand/gn-tile.png"
                  alt=""
                  width={512}
                  height={512}
                  className="size-14 shrink-0 rounded-2xl ring-1 ring-white/10"
                />
                <div>
                  <h2 className="u-display text-bone-50 text-[clamp(1.5rem,3vw,2.2rem)]">
                    Punya cerita atau kerja sama?
                  </h2>
                  <p className="text-bone-400 mt-3 max-w-md text-sm leading-relaxed">
                    Kami terbuka untuk liputan, kolaborasi kreatif, dan media partner acara.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <ButtonLink href="/partnership#contact">Ajukan kerja sama</ButtonLink>
                <a
                  href={`mailto:${site.email}`}
                  className="group text-bone-200 hover:text-bone-50 inline-flex items-center gap-2.5 rounded-full border border-white/14 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-white/28 hover:bg-white/[0.05]"
                >
                  {site.email}
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
