import Link from "next/link";
import { getReports } from "@/data";
import { ReportCard } from "@/components/research/ReportCard";
import { Arrow, Bloom, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function ResearchTeaser() {
  const reports = getReports({ limit: 3 });

  return (
    <section className="u-noise relative isolate overflow-hidden">
      <Bloom className="top-1/3 left-[-10%] h-[30rem] w-[30rem]" opacity={0.16} />

      <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Free Research"
            title="Riset lengkap, metodologi terbuka,"
            accent="tanpa biaya"
            lead="Setiap laporan menyebutkan sumber datanya, cara menghitungnya, dan batasannya. Termasuk bagian yang melemahkan kesimpulan kami sendiri."
            action={
              <Link
                href="/research"
                className="group text-bone-300 hover:text-bone-50 inline-flex items-center gap-2.5 rounded-full border border-white/12 px-5 py-2.5 text-sm transition-all duration-300 hover:border-white/28 hover:bg-white/[0.04]"
              >
                Semua riset
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((r, i) => (
            <Reveal key={r.slug} delay={i * 100}>
              <ReportCard report={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
