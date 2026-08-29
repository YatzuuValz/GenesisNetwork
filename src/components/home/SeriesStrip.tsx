import Link from "next/link";
import { seriesList } from "@/data";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

/**
 * The four named formats from the deck. This is the section that makes the site
 * read as a publication with a schedule rather than a generic blog.
 */
export default function SeriesStrip() {
  return (
    <section className="relative border-y border-white/[0.07] bg-white/[0.012]">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Program tetap</Eyebrow>
              <h2 className="u-display text-bone-50 mt-4 text-[clamp(1.5rem,3vw,2.2rem)]">
                Empat format, jadwal yang{" "}
                <span className="u-accent text-volt-400 font-normal">tidak bergeser</span>
              </h2>
            </div>
            <p className="text-bone-500 max-w-sm text-sm leading-relaxed">
              Tujuh konten setiap minggu, dirotasi lewat empat program yang punya sudut pandang
              masing-masing.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {seriesList.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <div className="bg-ink-950 group relative flex h-full flex-col p-7 transition-colors duration-500 hover:bg-white/[0.025]">
                <span className="u-num text-bone-700 group-hover:text-volt-500 text-xs transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="u-display text-bone-50 mt-6 text-xl">{s.name}</h3>
                <div className="u-eyebrow text-volt-400 mt-2.5 text-[0.5625rem]">{s.format}</div>

                <p className="text-bone-400 mt-5 flex-1 text-[0.8125rem] leading-relaxed">
                  {s.blurb}
                </p>

                <Link
                  href={s.category === "mixed" ? "/artikel" : `/artikel/kategori/${s.category}`}
                  className="text-bone-500 group-hover:text-bone-50 mt-7 inline-flex items-center gap-2 text-xs transition-colors duration-300"
                >
                  Lihat konten
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <span className="bg-volt-500 absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
