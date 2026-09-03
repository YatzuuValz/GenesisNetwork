import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categories,
  countByCategory,
  disabledRouteParams,
  features,
  getArticles,
  getCategory,
  articles as allArticles,
  type CategorySlug,
} from "@/data";
import { ArticleCard } from "@/components/article/ArticleCard";
import CategoryTabs from "@/components/article/CategoryTabs";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";

// `output: export` rejects an empty generateStaticParams, so while the section
// is switched off we emit a single throwaway route that immediately 404s. No
// real slug is built, and nothing links here.
export function generateStaticParams() {
  return features.artikel
    ? categories.map((c) => ({ category: c.slug }))
    : disabledRouteParams({ category: "segera-hadir" });
}

export async function generateMetadata({ params }: PageProps<"/artikel/kategori/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return { title: `Artikel ${cat.label}`, description: cat.blurb };
}

export default async function CategoryPage({ params }: PageProps<"/artikel/kategori/[category]">) {
  const { category } = await params;
  if (!features.artikel) notFound();

  const cat = getCategory(category);
  if (!cat) notFound();

  const articles = getArticles({ category: cat.slug as CategorySlug });
  const counts: Record<string, number> = { "": allArticles.length };
  for (const c of categories) counts[c.slug] = countByCategory(c.slug);

  return (
    <>
      <PageHero
        eyebrow={`Artikel · ${cat.label}`}
        title={cat.label}
        accent={`${articles.length} tulisan`}
        lead={cat.blurb}
      >
        <div className="mt-14">
          <CategoryTabs base="/artikel" active={cat.slug} counts={counts} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        {articles.length === 0 ? (
          <p className="text-bone-500 py-20 text-center text-sm">
            Belum ada tulisan di kategori ini.
          </p>
        ) : (
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 90}>
                <ArticleCard article={a} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
