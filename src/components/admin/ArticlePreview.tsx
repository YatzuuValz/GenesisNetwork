"use client";

import { useEffect } from "react";
import type { Block, CategorySlug, SeriesSlug } from "@/data";
import ArticleHeader from "@/components/article/ArticleHeader";
import Prose from "@/components/article/Prose";
import { Divider } from "@/components/ui/primitives";
import { StatusBadge, type Status } from "./fields";

/**
 * Renders the draft through the very components the public article page uses —
 * `ArticleHeader` and `Prose`, not lookalikes. What an editor sees here is what
 * a reader gets, and it stays that way because there is only one layout to change.
 */
export default function ArticlePreview({
  title,
  accent,
  deck,
  cover,
  coverAlt,
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
  coverAlt?: string;
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
    <div className="bg-ink-950 fixed inset-0 z-50 overflow-y-auto">
      <div className="bg-ink-950/90 sticky top-0 z-10 border-b border-white/[0.07] backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
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

      <article className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8">
        <nav className="u-eyebrow text-bone-600 flex items-center gap-2.5 text-[0.5625rem]">
          <span>Artikel</span>
          <span>/</span>
          <span>{category}</span>
        </nav>

        <div className="mt-7">
          <ArticleHeader
            title={title}
            accent={accent || undefined}
            deck={deck}
            cover={cover}
            coverAlt={coverAlt}
            category={category}
            series={series}
            publishedAt={publishedAt}
            authorName={author}
          />
        </div>

        <Divider className="my-14" />

        {body.length === 0 ? (
          <p className="text-bone-600 py-12 text-sm">Belum ada isi.</p>
        ) : (
          <Prose blocks={body} />
        )}
      </article>
    </div>
  );
}
