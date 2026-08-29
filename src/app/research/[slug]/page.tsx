import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateID, getReport, getReports, reports, site } from "@/data";
import Prose from "@/components/article/Prose";
import { ReportCard } from "@/components/research/ReportCard";
import { Arrow, Bloom, Divider, Pill } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return {};
  const title = [report.title, report.accent].filter(Boolean).join(" ");
  return { title, description: report.deck, openGraph: { title, description: report.deck } };
}

export default async function ReportPage({ params }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  const others = getReports().filter((r) => r.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="u-noise relative isolate overflow-hidden pt-[124px] pb-16 sm:pt-[148px]">
          <div aria-hidden className="u-grid-field u-mask-fade-b absolute inset-0 opacity-45" />
          <Bloom className="-top-28 left-[10%] h-[28rem] w-[28rem]" opacity={0.22} />
          <Image
            src={report.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-top opacity-[0.1]"
          />

          <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
            <Reveal>
              <nav aria-label="Breadcrumb" className="u-eyebrow text-bone-600 flex items-center gap-2.5 text-[0.5625rem]">
                <Link href="/research" className="hover:text-bone-300 transition-colors">
                  Free Research
                </Link>
                <span>/</span>
                <Link
                  href={`/research/kategori/${report.category}`}
                  className="hover:text-bone-300 transition-colors"
                >
                  {report.category}
                </Link>
              </nav>
            </Reveal>

            <Reveal delay={70}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Pill tone="brand">{report.edition}</Pill>
                <span className="u-eyebrow text-bone-600 text-[0.5625rem]">
                  {formatDateID(report.publishedAt)}
                </span>
                <span className="u-eyebrow text-bone-600 text-[0.5625rem]">{report.pages} halaman</span>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <h1 className="u-display text-bone-50 mt-7 max-w-[16ch] text-[clamp(2.3rem,5.4vw,4.2rem)]">
                {report.title}
                {report.accent && (
                  <>
                    {" "}
                    <span className="u-accent text-volt-400 font-normal">{report.accent}</span>
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-bone-300 mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed">
                {report.deck}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="u-panel mt-12 rounded-2xl p-7 sm:p-8">
                <div className="u-eyebrow text-bone-600 text-[0.5625rem]">Temuan utama</div>
                <ul className="mt-6 grid gap-5 md:grid-cols-3">
                  {report.highlights.map((h, i) => (
                    <li key={h} className="border-t border-white/10 pt-4">
                      <span className="u-num text-volt-500 text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-bone-300 mt-3 text-[0.875rem] leading-relaxed">{h}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </header>

        <Divider />

        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-20">
            <Reveal>
              <Prose blocks={report.body} />
            </Reveal>

            <aside>
              <Reveal delay={100}>
                <div className="lg:sticky lg:top-28">
                  <div className="u-panel rounded-2xl p-6">
                    <div className="u-eyebrow text-volt-400 text-[0.5625rem]">Gratis, tanpa syarat</div>
                    <p className="text-bone-400 mt-4 text-[0.8125rem] leading-relaxed">
                      Laporan ini bisa dibaca penuh tanpa perlu mendaftar. Kalau berguna,
                      cara terbaik mendukung kami adalah membagikannya.
                    </p>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-bone-200 hover:text-volt-400 mt-6 inline-flex items-center gap-2 text-xs font-semibold transition-colors"
                    >
                      Ikuti {site.instagramHandle}
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/[0.07] p-6">
                    <p className="text-bone-500 text-xs leading-relaxed">
                      Laporan ini disusun untuk tujuan edukasi dan bukan rekomendasi jual/beli.
                      Data dapat berubah setelah tanggal terbit.
                    </p>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="u-display text-bone-50 text-[clamp(1.5rem,3vw,2.2rem)]">
              Laporan lain
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 90}>
                <ReportCard report={r} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
