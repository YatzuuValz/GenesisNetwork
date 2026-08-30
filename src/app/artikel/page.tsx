import type { Metadata } from "next";
import { categories, countByCategory, features, getArticles, articles as allArticles } from "@/data";
import { ArticleCard, LeadArticleCard } from "@/components/article/ArticleCard";
import CategoryTabs from "@/components/article/CategoryTabs";
import ComingSoon from "@/components/layout/ComingSoon";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Artikel",
  description:
    "Crypto, saham, dan makroekonomi — dijelaskan sederhana untuk pembaca yang tidak punya waktu untuk jargon.",
};

export default function ArtikelIndexPage() {
  if (!features.artikel) {
    return (
      <ComingSoon
        eyebrow="Artikel"
        title="Tulisan panjangnya"
        accent="masih kami masak."
        lead="Kami sedang menyiapkan versi tulisan dari apa yang selama ini kami bahas di Instagram — crypto, saham, dan makro, dengan ruang yang cukup untuk menjelaskan sampai tuntas."
        bullets={[
          { label: "Chain Horizon", detail: "Pembacaan pergerakan on-chain dan narasi yang sedang dihargai pasar." },
          { label: "Equity Voyage", detail: "Bursa Indonesia dan pasar global, dibaca lewat aliran dana — bukan lewat headline." },
          { label: "Genesis Unscripted", detail: "Percakapan soal uang dengan orang sungguhan, tanpa naskah." },
        ]}
      />
    );
  }

  const articles = getArticles();
  const [lead, ...rest] = articles;

  const counts: Record<string, number> = { "": allArticles.length };
  for (const c of categories) counts[c.slug] = countByCategory(c.slug);

  return (
    <>
      <PageHero
        eyebrow="Artikel"
        title="Bacaan pasar yang"
        accent="tidak bikin pusing."
        lead="Tiga pilar — crypto, saham, dan makro — ditulis ulang dari sumber primer, tanpa jargon dan tanpa janji cuan."
        aside={
          <dl className="grid grid-cols-3 gap-6">
            {categories.map((c) => (
              <div key={c.slug} className="border-t border-white/10 pt-4">
                <dt className="u-eyebrow text-bone-600 text-[0.5625rem]">{c.navLabel}</dt>
                <dd className="u-num text-bone-50 mt-2 text-2xl">
                  {String(countByCategory(c.slug)).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>
        }
      >
        <div className="mt-14">
          <CategoryTabs base="/artikel" counts={counts} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        <Reveal>
          <LeadArticleCard article={lead} />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 90}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
