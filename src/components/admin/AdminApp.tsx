"use client";

import { useState } from "react";
import Image from "@/components/ui/Img";
import { articles, site } from "@/data";
import ArticleList, { type AdminArticle } from "./ArticleList";
import ArticleEditor from "./ArticleEditor";
import type { Status } from "./fields";

/**
 * Mockup only. No auth, no database, nothing persists — the point is to settle
 * the shape of the screens before a backend is built around them.
 *
 * `status` and `updatedAt` don't exist in the content model yet; they're the two
 * fields a real CMS would add, so they're derived here just to make the UI real.
 */
const STATUSES: Status[] = ["published", "published", "changed", "published", "draft"];

const adminArticles: AdminArticle[] = articles.map((a, i) => {
  const published = new Date(a.publishedAt);
  const updated = new Date(published.getTime() + ((i % 5) + 1) * 86_400_000);
  return {
    ...a,
    status: STATUSES[i % STATUSES.length],
    updatedAt: updated.toISOString().slice(0, 10),
  };
});

export default function AdminApp() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const current = adminArticles.find((a) => a.slug === openSlug) ?? null;

  return (
    <div className="min-h-screen">
      {/* ---- admin chrome ---- */}
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/gn-tile.png"
              alt=""
              width={512}
              height={512}
              className="size-7 rounded-lg ring-1 ring-white/10"
            />
            <span className="u-eyebrow text-bone-400 text-[0.5625rem]">
              {site.name} · Studio
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden gap-1 sm:flex">
              {["Artikel", "Riset", "Media", "Tim"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1.5 text-xs ${
                    i === 0 ? "bg-white/[0.06] text-bone-100" : "text-bone-600"
                  }`}
                >
                  {t}
                </span>
              ))}
            </nav>
            <span className="u-num text-bone-500 grid size-7 place-items-center rounded-full border border-white/12 text-[0.5625rem]">
              RA
            </span>
          </div>
        </div>
      </header>

      <div className="border-volt-500/25 bg-volt-500/[0.07] border-b">
        <p className="text-bone-300 mx-auto max-w-[1240px] px-5 py-2.5 text-[0.6875rem] sm:px-8">
          <strong className="text-bone-100 font-semibold">Mockup.</strong> Belum ada login
          maupun database — tombol simpan tidak menyimpan apa pun. Halaman ini hanya jalan
          di <code className="text-volt-400">npm run dev</code>, tidak ikut tayang di situs
          publik.
        </p>
      </div>

      <main className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
        {current ? (
          <ArticleEditor article={current} onBack={() => setOpenSlug(null)} />
        ) : (
          <ArticleList
            articles={adminArticles}
            onOpen={setOpenSlug}
            onCreate={() => setOpenSlug(adminArticles[0].slug)}
          />
        )}
      </main>
    </div>
  );
}
