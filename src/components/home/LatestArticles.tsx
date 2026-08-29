import Link from "next/link";
import { getArticles, getLeadArticle } from "@/data";
import { ArticleCard, ArticleRow, LeadArticleCard } from "@/components/article/ArticleCard";
import { Arrow, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function LatestArticles() {
  const lead = getLeadArticle();
  const rest = getArticles().filter((a) => a.slug !== lead.slug);
  const rail = rest.slice(0, 4);
  const grid = rest.slice(4, 7);

  return (
    <section className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Latest Articles"
          title="Yang terbaru dari"
          accent="ruang redaksi"
          lead="Tiga pilar, satu standar: kalau kami tidak bisa menjelaskannya dengan sederhana, kami belum cukup paham untuk menerbitkannya."
          action={
            <Link
              href="/artikel"
              className="group text-bone-300 hover:text-bone-50 inline-flex items-center gap-2.5 rounded-full border border-white/12 px-5 py-2.5 text-sm transition-all duration-300 hover:border-white/28 hover:bg-white/[0.04]"
            >
              Semua artikel
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.62fr_1fr] lg:gap-12">
        <Reveal>
          <LeadArticleCard article={lead} />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex h-full flex-col">
            <div className="u-eyebrow text-bone-600 flex items-center justify-between border-b border-white/[0.07] pb-4">
              <span>Sedang dibaca</span>
              <span className="text-bone-700">04</span>
            </div>
            {rail.map((a, i) => (
              <ArticleRow key={a.slug} article={a} index={i} />
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((a, i) => (
          <Reveal key={a.slug} delay={i * 90}>
            <ArticleCard article={a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
