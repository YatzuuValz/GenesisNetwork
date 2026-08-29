import Image from "next/image";
import Link from "next/link";
import { formatDateID, type ResearchReport } from "@/data";
import { Arrow, Pill } from "@/components/ui/primitives";

export function ReportCard({ report, compact = false }: { report: ResearchReport; compact?: boolean }) {
  return (
    <Link href={`/research/${report.slug}`} className="group block h-full">
      <article className="u-panel relative flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-500 hover:border-white/20">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.07]">
          <Image
            src={report.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 92vw, 32vw"
            className="object-cover object-top opacity-45 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-65"
          />
          <div className="from-ink-900 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <Pill tone="brand">{report.edition}</Pill>
            <span className="u-num text-bone-400 text-[0.6875rem]">{report.pages} hlm</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="u-eyebrow text-bone-600 text-[0.5625rem]">
            {report.category} · {formatDateID(report.publishedAt)}
          </div>

          <h3 className="u-display text-bone-50 mt-4 text-[1.3rem] leading-[1.08]">
            {report.title}
            {report.accent && (
              <span className="u-accent text-volt-400 font-normal"> {report.accent}</span>
            )}
          </h3>

          <p className="text-bone-400 mt-3.5 line-clamp-3 text-[0.875rem] leading-relaxed">
            {report.deck}
          </p>

          {!compact && (
            <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
              {report.highlights.slice(0, 2).map((h) => (
                <li key={h} className="text-bone-500 flex gap-2.5 text-xs leading-relaxed">
                  <span className="bg-volt-500 mt-1.5 size-1 shrink-0 rounded-full" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <span className="text-bone-300 group-hover:text-volt-400 mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold transition-colors duration-300">
            Baca laporan — gratis
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
