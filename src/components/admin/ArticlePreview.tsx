"use client";

import { useEffect } from "react";
import Image from "@/components/ui/Img";
import { formatDateID, getSeries } from "@/data";
import type { Block, CategorySlug, SeriesSlug } from "@/data";
import Prose from "@/components/article/Prose";
import { Pill } from "@/components/ui/primitives";
import { StatusBadge, type Status } from "./fields";

/**
 * Renders the draft with the real article components — the same `Prose` the
 * public page uses — so what an editor sees here is what readers get, not a
 * separate approximation that can drift.
 */
export default function ArticlePreview({
  title,
  accent,
  deck,
  cover,
  category,
  series,
  publishedAt,
  status,
  author,
  body,
  onClose,
}: {
  title: string;
  accent: string;
  deck: string;
  cover: string;
  category: CategorySlug;
  series: SeriesSlug;
  publishedAt: string;
  status: Status;
  author: string;
  body: Block[];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="bg-ink-950/95 fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
      {/* ---- preview chrome ---- */}
      <div className="bg-ink-950/90 sticky top-0 z-10 border-b border-white/[0.07] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="u-eyebrow text-bone-500 text-[0.5625rem]">Pratinjau</span>
            <StatusBadge status={status} />
            {status !== "published" && (
              <span className="text-bone-600 text-[0.6875rem]">belum tayang untuk pembaca</span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-bone-300 hover:text-bone-50 rounded-full border border-white/12 px-4 py-1.5 text-xs transition-colors hover:border-white/25"
          >
            Tutup pratinjau · Esc
          </button>
        </div>
      </div>

      {/* ---- the article, as readers would see it ---- */}
      <article className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
        <nav className="u-eyebrow text-bone-600 flex items-center gap-2.5 text-[0.5625rem]">
          <span>Artikel</span>
          <span>/</span>
          <span>{category}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="brand">{getSeries(series)?.name ?? category}</Pill>
              <span className="u-eyebrow text-bone-600 text-[0.5625rem]">
                {formatDateID(publishedAt)}
              </span>
            </div>

            <h1 className="u-display text-bone-50 mt-7 text-[clamp(2.2rem,5vw,3.9rem)]">
              {title || "Tanpa judul"}
              {accent && (
                <>
                  {" "}
                  <span className="u-accent text-volt-400 font-normal">{accent}</span>
                </>
              )}
            </h1>

            <p className="text-bone-300 mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed">
              {deck}
            </p>

            <div className="text-bone-500 mt-8 text-[0.8125rem]">{author}</div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07]">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(max-width: 1024px) 94vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="u-rule my-14" />

        {body.length === 0 ? (
          <p className="text-bone-600 py-12 text-sm">Belum ada isi.</p>
        ) : (
          <Prose blocks={body} />
        )}
      </article>
    </div>
  );
}
