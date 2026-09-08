import Image from "@/components/ui/Img";
import { formatDateID, getSeries } from "@/data";
import type { CategorySlug, SeriesSlug } from "@/data";
import { Pill } from "@/components/ui/primitives";

/**
 * The article header, shared by the public page and the Studio preview.
 *
 * It lives in one component on purpose: the preview previously re-implemented
 * this layout, which meant the two could drift apart — and they did.
 */
export default function ArticleHeader({
  title,
  accent,
  deck,
  cover,
  coverAlt,
  category,
  series,
  publishedAt,
  authorName,
  priority = false,
}: {
  title: string;
  accent?: string;
  deck: string;
  cover: string;
  coverAlt?: string;
  category: CategorySlug;
  series: SeriesSlug;
  publishedAt: string;
  authorName: string;
  priority?: boolean;
}) {
  return (
    <header>
      <figure className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
        {/* Taller on phones so a long headline still has room to sit on the
            image; wide and cinematic once there's width to spare. */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={cover}
            alt={coverAlt ?? title}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 96vw, 1180px"
            className="object-cover"
          />

          {/* Two scrims: a heavy one at the base for the headline, and a light
              wash over the whole frame so a bright photo can't wash out. */}
          <div className="from-ink-950 via-ink-950/55 absolute inset-0 bg-gradient-to-t via-45% to-transparent" />
          <div className="from-ink-950/70 absolute inset-0 bg-gradient-to-r to-transparent" />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="brand">{getSeries(series)?.name ?? category}</Pill>
            <span className="u-eyebrow text-bone-400 text-[0.5625rem]">
              {formatDateID(publishedAt)}
            </span>
          </div>

          <h1 className="u-display text-bone-50 mt-4 max-w-[22ch] text-[clamp(1.9rem,4.6vw,3.6rem)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            {title || "Tanpa judul"}
            {accent && (
              <>
                {" "}
                <span className="u-accent text-volt-400 font-normal">{accent}</span>
              </>
            )}
          </h1>
        </figcaption>
      </figure>

      <div className="mt-9 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="text-bone-300 max-w-[52ch] text-[1.0625rem] leading-relaxed">{deck}</p>

        <div className="text-bone-500 text-[0.8125rem] sm:text-right">{authorName}</div>
      </div>
    </header>
  );
}
