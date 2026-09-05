import type { Metadata } from "next";
import Image from "@/components/ui/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articles,
  disabledRouteParams,
  features,
  formatDateID,
  getArticle,
  getRelatedArticles,
  getSeries,
  site,
} from "@/data";
import { ArticleCard } from "@/components/article/ArticleCard";
import Prose from "@/components/article/Prose";
import { Arrow, Bloom, Divider, Pill } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

// `output: export` rejects an empty generateStaticParams, so while the section
// is switched off we emit a single throwaway route that immediately 404s. No
// real slug is built, and nothing links here.
export function generateStaticParams() {
  return features.artikel
    ? articles.map((a) => ({ slug: a.slug }))
    : disabledRouteParams({ slug: "segera-hadir" });
}

export async function generateMetadata({ params }: PageProps<"/artikel/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const title = [article.title, article.accent].filter(Boolean).join(" ");
  return {
    title,
    description: article.deck,
    openGraph: { title, description: article.deck, images: [article.cover], type: "article" },
  };
}

export default async function ArticlePage({ params }: PageProps<"/artikel/[slug]">) {
  const { slug } = await params;
  if (!features.artikel) notFound();

  const article = getArticle(slug);
  if (!article) notFound();

  const series = getSeries(article.series);
  const related = getRelatedArticles(slug, 3);

  return (
    <>
      <article>
        {/* ---- header ---- */}
        <header className="u-noise relative isolate overflow-hidden pt-[124px] pb-14 sm:pt-[148px]">
          <div aria-hidden className="u-grid-field u-mask-fade-b absolute inset-0 opacity-45" />
          <Bloom className="-top-24 right-[6%] h-[26rem] w-[26rem]" opacity={0.2} />

          <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
            <Reveal>
              <nav aria-label="Breadcrumb" className="u-eyebrow text-bone-600 flex items-center gap-2.5 text-[0.5625rem]">
                <Link href="/artikel" className="hover:text-bone-300 transition-colors">
                  Artikel
                </Link>
                <span>/</span>
                <Link
                  href={`/artikel/kategori/${article.category}`}
                  className="hover:text-bone-300 transition-colors"
                >
                  {article.category}
                </Link>
              </nav>
            </Reveal>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end">
              <div>
                <Reveal delay={70}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Pill tone="brand">{series?.name ?? article.category}</Pill>
                    <span className="u-eyebrow text-bone-600 text-[0.5625rem]">
                      {formatDateID(article.publishedAt)}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={130}>
                  <h1 className="u-display text-bone-50 mt-7 text-[clamp(2.2rem,5vw,3.9rem)]">
                    {article.title}
                    {article.accent && (
                      <>
                        {" "}
                        <span className="u-accent text-volt-400 font-normal">{article.accent}</span>
                      </>
                    )}
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="text-bone-300 mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed">
                    {article.deck}
                  </p>
                </Reveal>

                <Reveal delay={260}>
                  <div className="mt-9 flex items-center gap-3.5">
                    <span className="u-num text-bone-400 grid size-10 place-items-center rounded-full border border-white/12 text-[0.6875rem]">
                      {article.author.initials}
                    </span>
                    <div>
                      <div className="text-bone-100 text-sm font-medium">{article.author.name}</div>
                      <div className="u-eyebrow text-bone-600 mt-0.5 text-[0.5rem]">
                        {article.author.role}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={180}>
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
                  <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 94vw, 40vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        <Divider />

        {/* ---- body ---- */}
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-20">
            <Reveal>
              <Prose blocks={article.body} />
            </Reveal>

            <aside className="lg:pt-2">
              <Reveal delay={100}>
                <div className="lg:sticky lg:top-28">
                  <div className="u-eyebrow text-bone-600 border-b border-white/[0.07] pb-4">
                    Topik
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="text-bone-400 rounded-full border border-white/10 px-3 py-1.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="u-panel mt-9 rounded-2xl p-6">
                    <div className="u-eyebrow text-volt-400 text-[0.5625rem]">
                      {series?.name}
                    </div>
                    <p className="text-bone-400 mt-3.5 text-[0.8125rem] leading-relaxed">
                      {series?.blurb}
                    </p>
                    <Link
                      href={`/artikel/kategori/${article.category}`}
                      className="group text-bone-200 hover:text-volt-400 mt-6 inline-flex items-center gap-2 text-xs font-semibold transition-colors"
                    >
                      Lihat semua {article.category}
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div className="mt-9 rounded-2xl border border-white/[0.07] p-6">
                    <p className="text-bone-500 text-xs leading-relaxed">
                      Tulisan ini bersifat edukatif dan bukan saran investasi. Selalu lakukan riset
                      sendiri sebelum mengambil keputusan.
                    </p>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-bone-300 hover:text-bone-50 mt-5 inline-flex items-center gap-2 text-xs transition-colors"
                    >
                      Ikuti {site.instagramHandle}
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </article>

      {/* ---- related ---- */}
      <section className="border-t border-white/[0.07] bg-white/[0.012]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="u-display text-bone-50 text-[clamp(1.5rem,3vw,2.2rem)]">
                Lanjut baca
              </h2>
              <Link
                href="/artikel"
                className="group text-bone-400 hover:text-bone-50 inline-flex items-center gap-2 text-sm transition-colors"
              >
                Semua artikel
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
