import type { Metadata } from "next";
import { categories, getReports, reports as allReports } from "@/data";
import CategoryTabs from "@/components/article/CategoryTabs";
import PageHero from "@/components/layout/PageHero";
import { ReportCard } from "@/components/research/ReportCard";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Free Research",
  description:
    "Laporan riset Genesis Network — metodologi terbuka, sumber data disebutkan, gratis dibaca siapa saja.",
};

const principles = [
  {
    title: "Metodologi dibuka",
    body: "Setiap laporan menjelaskan cara menghitungnya, bukan hanya hasilnya. Kalau kamu tidak setuju dengan asumsinya, kamu bisa menghitung ulang sendiri.",
  },
  {
    title: "Batasan ditulis",
    body: "Kami menyebutkan apa yang tidak tercakup dalam data — termasuk ketika itu melemahkan kesimpulan kami sendiri.",
  },
  {
    title: "Tanpa kepentingan produk",
    body: "Genesis Network tidak menjual produk investasi. Tidak ada aset yang untung kalau kamu mengikuti laporan ini.",
  },
];

export default function ResearchIndexPage() {
  const reports = getReports();

  const counts: Record<string, number> = { "": allReports.length };
  for (const c of categories) {
    counts[c.slug] = allReports.filter((r) => r.category === c.slug).length;
  }

  return (
    <>
      <PageHero
        eyebrow="Free Research"
        title="Riset lengkap."
        accent="Gratis, seluruhnya."
        lead="Bukan ringkasan yang dipotong untuk menjual versi berbayar. Laporan utuh, metodologi terbuka, dan batasan yang kami sebutkan sendiri."
        aside={
          <div className="u-panel rounded-2xl p-6">
            <div className="u-eyebrow text-bone-600 text-[0.5625rem]">Cara kami bekerja</div>
            <ul className="mt-5 space-y-4">
              {principles.map((p) => (
                <li key={p.title}>
                  <div className="text-bone-100 text-[0.8125rem] font-semibold">{p.title}</div>
                  <p className="text-bone-500 mt-1.5 text-xs leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="mt-14">
          <CategoryTabs base="/research" counts={counts} />
        </div>
      </PageHero>

      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 3) * 90}>
              <ReportCard report={r} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
