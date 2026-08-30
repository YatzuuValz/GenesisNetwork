import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categories,
  features,
  getCategory,
  getReports,
  reports as allReports,
  type CategorySlug,
} from "@/data";
import CategoryTabs from "@/components/article/CategoryTabs";
import PageHero from "@/components/layout/PageHero";
import { ReportCard } from "@/components/research/ReportCard";
import Reveal from "@/components/ui/Reveal";

// `output: export` rejects an empty generateStaticParams, so while the section
// is switched off we emit a single throwaway route that immediately 404s. No
// real slug is built, and nothing links here.
export function generateStaticParams() {
  return features.research
    ? categories.map((c) => ({ category: c.slug }))
    : [{ category: "segera-hadir" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/research/kategori/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return { title: `${cat.label} Research`, description: cat.blurb };
}

export default async function ResearchCategoryPage({
  params,
}: PageProps<"/research/kategori/[category]">) {
  const { category } = await params;
  if (!features.research) notFound();

  const cat = getCategory(category);
  if (!cat) notFound();

  const reports = getReports({ category: cat.slug as CategorySlug });

  const counts: Record<string, number> = { "": allReports.length };
  for (const c of categories) {
    counts[c.slug] = allReports.filter((r) => r.category === c.slug).length;
  }

  return (
    <>
      <PageHero
        eyebrow={`Free Research · ${cat.label}`}
        title={`${cat.label} Research`}
        lead={cat.blurb}
      >
        <div className="mt-14">
          <CategoryTabs base="/research" active={cat.slug} counts={counts} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        {reports.length === 0 ? (
          <p className="text-bone-500 py-20 text-center text-sm">
            Belum ada laporan di kategori ini.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 90}>
                <ReportCard report={r} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
