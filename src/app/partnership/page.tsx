import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import {
  audienceGrowth,
  audienceStats,
  caseStudyAssets,
  kpiTargets,
  revenueStreams,
  seriesList,
  site,
} from "@/data";
import PageHero from "@/components/layout/PageHero";
import InquiryForm from "@/components/partnership/InquiryForm";
import { Bloom, Eyebrow, StatBlock } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Media kit Genesis Network — format kerja sama, data audiens, studi kasus, dan cara mengajukan kolaborasi.",
};

const process = [
  { step: "Brief", detail: "Kami dengar produk dan tujuan kampanye, lalu tentukan pilar konten yang paling relevan." },
  { step: "Konsep", detail: "Angle, format, dan jadwal disusun agar terasa seperti konten Genesis, bukan iklan tempelan." },
  { step: "Produksi", detail: "Naskah, desain, dan video dikerjakan in-house dengan satu putaran revisi terjadwal." },
  { step: "Publikasi", detail: "Tayang sesuai kalender editorial, di slot dengan performa historis terbaik." },
  { step: "Laporan", detail: "Rekap performa dengan angka mentah dari Instagram Insights — apa adanya." },
];

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Brand yang dijelaskan"
        accent="lebih diingat."
        lead="Audiens kami datang untuk mengerti sesuatu. Kerja sama yang berhasil di sini adalah yang ikut menjelaskan — bukan yang menyela."
        aside={
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {audienceStats.map((s) => (
              <StatBlock key={s.label} {...s} />
            ))}
          </div>
        }
      />

      {/* ---- why ---- */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <div>
              <Eyebrow>Kenapa di sini</Eyebrow>
              <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.8rem,3.6vw,2.7rem)]">
                80,4% jangkauan kami datang dari{" "}
                <span className="u-accent text-volt-400 font-normal">non-follower.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="text-bone-400 space-y-5 text-[0.975rem] leading-relaxed">
              <p>
                Artinya konten kami menyebar karena isinya, bukan karena jumlah pengikut yang sudah
                menumpuk. Untuk brand, ini bedanya besar: kamu tidak hanya menjangkau orang yang
                sudah mengenal kami, tapi orang baru yang sedang mencari penjelasan.
              </p>
              <p>
                Kami juga tidak menjual produk investasi apa pun. Tidak ada konflik kepentingan
                antara isi konten dan kantong kami sendiri — dan itu yang membuat penjelasan kami
                soal produkmu punya bobot.
              </p>
              <p className="text-bone-500">
                Semua angka di halaman ini berasal dari Instagram Insights periode 30 hari terakhir,
                yang secara praktik baru berjalan dua minggu. Kami tampilkan apa adanya.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- formats ---- */}
      <section id="formats" className="scroll-mt-24 border-y border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <Reveal>
            <Eyebrow dot>Format kerja sama</Eyebrow>
            <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.9rem,4vw,3rem)]">
              Enam cara bekerja bareng
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {revenueStreams.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 80}>
                <div className="bg-ink-950 group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-white/[0.025]">
                  <span className="u-num text-bone-700 group-hover:text-volt-500 text-xs transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="u-display text-bone-50 mt-5 text-lg">{r.name}</h3>
                  <div className="u-eyebrow text-volt-400 mt-2.5 text-[0.5rem]">{r.product}</div>
                  <p className="text-bone-400 mt-5 text-[0.8125rem] leading-relaxed">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {seriesList.map((s) => (
                <div key={s.slug} className="bg-ink-950 p-6">
                  <div className="text-bone-100 text-sm font-semibold">{s.name}</div>
                  <div className="u-eyebrow text-bone-600 mt-2 text-[0.5rem]">{s.format}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- case study ---- */}
      <section className="u-noise relative isolate overflow-hidden">
        <Bloom className="top-[10%] right-[-8%] h-[30rem] w-[30rem]" opacity={0.18} />

        <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Studi kasus</Eyebrow>
                <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.9rem,4vw,3rem)]">
                  Tokocrypto ·{" "}
                  <span className="u-accent text-volt-400 font-normal">Tokenized Stocks</span>
                </h2>
              </div>
              <p className="text-bone-500 max-w-sm text-sm leading-relaxed">
                Kampanye empat tahap: menjelaskan konsepnya dulu, baru menyebut produknya. Urutan itu
                yang membuat orang bertahan sampai slide terakhir.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudyAssets.map((a, i) => (
              <Reveal key={a.src} delay={i * 90}>
                <figure className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.07]">
                    <Image
                      src={a.src}
                      alt={`Materi kampanye Tokocrypto — tahap ${a.label}`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 23vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-center gap-2.5">
                    <span className="u-num text-volt-500 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="u-eyebrow text-bone-400 text-[0.5625rem]">{a.label}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- process ---- */}
      <section className="border-y border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <Reveal>
            <Eyebrow>Alur kerja</Eyebrow>
            <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)]">
              Lima langkah, tanpa kejutan
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 70}>
                <li className="bg-ink-950 flex h-full flex-col p-6">
                  <span className="u-num text-volt-500 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="u-display text-bone-50 mt-4 text-base">{p.step}</h3>
                  <p className="text-bone-400 mt-3 text-[0.8125rem] leading-relaxed">{p.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- targets ---- */}
      <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
        <Reveal>
          <Eyebrow>Target pertumbuhan</Eyebrow>
          <h2 className="u-display text-bone-50 mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)]">
            Ke mana kami menuju
          </h2>
          <p className="text-bone-500 mt-5 max-w-xl text-sm leading-relaxed">
            Target ini kami buka supaya partner tahu persis pertumbuhan seperti apa yang ikut
            mereka danai.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
              <div className="u-eyebrow text-bone-600 grid grid-cols-[1.6fr_1fr_1fr] gap-4 border-b border-white/[0.07] bg-white/[0.02] px-6 py-4 text-[0.5rem]">
                <span>Metrik konten</span>
                <span className="text-right">6 bulan</span>
                <span className="text-right">12 bulan</span>
              </div>
              {kpiTargets.map((k) => (
                <div
                  key={k.metric}
                  className="grid grid-cols-[1.6fr_1fr_1fr] gap-4 border-b border-white/[0.05] px-6 py-4 last:border-0"
                >
                  <span className="text-bone-300 text-[0.8125rem]">{k.metric}</span>
                  <span className="u-num text-bone-500 text-right text-[0.8125rem]">{k.six}</span>
                  <span className="u-num text-bone-50 text-right text-[0.8125rem]">{k.twelve}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
              <div className="u-eyebrow text-bone-600 grid grid-cols-[1.6fr_1fr_1fr] gap-4 border-b border-white/[0.07] bg-white/[0.02] px-6 py-4 text-[0.5rem]">
                <span>Audiens</span>
                <span className="text-right">6 bulan</span>
                <span className="text-right">12 bulan</span>
              </div>
              {audienceGrowth.map((a) => (
                <div
                  key={a.platform}
                  className="grid grid-cols-[1.6fr_1fr_1fr] gap-4 border-b border-white/[0.05] px-6 py-4 last:border-0"
                >
                  <span className="text-bone-300 text-[0.8125rem]">{a.platform}</span>
                  <span className="u-num text-bone-500 text-right text-[0.8125rem]">{a.six}</span>
                  <span className="u-num text-bone-50 text-right text-[0.8125rem]">{a.twelve}</span>
                </div>
              ))}
              <div className="text-bone-600 px-6 py-5 text-[0.6875rem] leading-relaxed">
                Angka pengikut, bukan tayangan. Kami sengaja menargetkan pertumbuhan yang bisa
                dipertanggungjawabkan tanpa membeli audiens.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- contact ---- */}
      <section
        id="contact"
        className="u-noise relative isolate scroll-mt-24 overflow-hidden border-t border-white/[0.07]"
      >
        <div aria-hidden className="u-grid-field absolute inset-0 opacity-40" />
        <Bloom className="bottom-[-12%] left-[8%] h-[30rem] w-[30rem]" opacity={0.22} />

        <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <div>
                <Eyebrow dot>Ajukan kerja sama</Eyebrow>
                <h2 className="u-display text-bone-50 mt-6 text-[clamp(2rem,4.4vw,3.2rem)]">
                  Ceritakan produkmu.
                  <br />
                  <span className="u-accent text-volt-400 font-normal">Kami balas dalam 2×24 jam.</span>
                </h2>

                <div className="mt-10 space-y-6">
                  <div className="border-t border-white/10 pt-5">
                    <div className="u-eyebrow text-bone-600 text-[0.5rem]">Email partnership</div>
                    <a
                      href={`mailto:${site.partnershipEmail}`}
                      className="text-bone-100 hover:text-volt-400 mt-2 block text-sm transition-colors"
                    >
                      {site.partnershipEmail}
                    </a>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <div className="u-eyebrow text-bone-600 text-[0.5rem]">Instagram</div>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bone-100 hover:text-volt-400 mt-2 block text-sm transition-colors"
                    >
                      {site.instagramHandle}
                    </a>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <div className="u-eyebrow text-bone-600 text-[0.5rem]">Basis</div>
                    <div className="text-bone-100 mt-2 text-sm">{site.city}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
