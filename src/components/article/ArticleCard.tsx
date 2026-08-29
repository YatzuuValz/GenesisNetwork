import Image from "next/image";
import Link from "next/link";
import { formatDateID, getSeries, type Article } from "@/data";
import { Arrow, Pill } from "@/components/ui/primitives";

const ratio = {
  "4/5": "aspect-[4/5]",
  "9/16": "aspect-[9/16]",
  "16/9": "aspect-[16/9]",
} as const;

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  const series = getSeries(article.series);

  return (
    <article className="group">
      <Link href={`/artikel/${article.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
          <div className={`relative ${ratio[article.aspect]}`}>
            <Image
              src={article.coverThumb}
              alt={article.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            {/* The series label is already burned into the artwork, so the card
                doesn't repeat it here — only a soft vignette to seat the image. */}
            <div className="from-ink-950/55 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-5">
          <div className="u-eyebrow text-bone-600 flex items-center gap-2.5 text-[0.625rem]">
            <span className="text-volt-400">{series?.name ?? article.category}</span>
            <span className="bg-bone-700 h-2.5 w-px" />
            <span>{formatDateID(article.publishedAt)}</span>
          </div>

          <h3 className="u-display text-bone-50 group-hover:text-bone-50 mt-3.5 text-[1.35rem] leading-[1.06]">
            {article.title}
            {article.accent && (
              <span className="u-accent text-volt-400 font-normal"> {article.accent}</span>
            )}
          </h3>

          <p className="text-bone-400 mt-3 line-clamp-2 text-[0.875rem] leading-relaxed">
            {article.deck}
          </p>

          <span className="text-bone-500 group-hover:text-volt-400 mt-4 inline-flex items-center gap-2 text-xs transition-colors duration-300">
            {article.readingMinutes} menit baca
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}

/** The lead story — full-bleed image with the headline sitting on top of it. */
export function LeadArticleCard({ article }: { article: Article }) {
  const series = getSeries(article.series);

  return (
    <article className="group relative">
      <Link href={`/artikel/${article.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/10]">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 96vw, 62vw"
              className="object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <div className="from-ink-950 via-ink-950/70 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="from-ink-950/80 absolute inset-0 bg-gradient-to-r to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="brand">{series?.name ?? article.category}</Pill>
              <span className="u-eyebrow text-bone-500 text-[0.625rem]">
                {formatDateID(article.publishedAt)}
              </span>
            </div>

            <h2 className="u-display text-bone-50 mt-5 max-w-[22ch] text-[clamp(1.75rem,4.2vw,3.1rem)]">
              {article.title}
              {article.accent && (
                <span className="u-accent text-volt-400 font-normal"> {article.accent}</span>
              )}
            </h2>

            <p className="text-bone-300 mt-4 max-w-[52ch] text-sm leading-relaxed sm:text-[0.95rem]">
              {article.deck}
            </p>

            <span className="text-bone-200 mt-6 inline-flex items-center gap-2.5 text-sm font-semibold">
              Baca selengkapnya
              <Arrow className="text-volt-400 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Compact row for sidebars and "more from this category" lists. */
export function ArticleRow({ article, index }: { article: Article; index?: number }) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex items-start gap-4 border-b border-white/[0.07] py-5 last:border-0"
    >
      {typeof index === "number" && (
        <span className="u-num text-bone-700 group-hover:text-volt-500 w-7 shrink-0 pt-0.5 text-sm transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="u-eyebrow text-bone-600 text-[0.5625rem]">
          {article.category} · {formatDateID(article.publishedAt)}
        </div>
        <h4 className="u-display text-bone-100 group-hover:text-bone-50 mt-2 text-[1.0625rem] leading-[1.15]">
          {article.title}
          {article.accent && (
            <span className="u-accent text-volt-400 font-normal"> {article.accent}</span>
          )}
        </h4>
      </div>

      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-white/[0.07]">
        <Image
          src={article.coverThumb}
          alt=""
          fill
          sizes="64px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}
