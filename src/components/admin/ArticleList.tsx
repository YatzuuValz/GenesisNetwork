"use client";

import { useMemo, useState } from "react";
import Image from "@/components/ui/Img";
import { categories, formatDateShort, getSeries } from "@/data";
import type { StoredArticle } from "@/server/articles";
import { Arrow } from "@/components/ui/primitives";
import { StatusBadge, type Status } from "./fields";

type SortKey = "updated" | "published" | "title";

export default function ArticleList({
  articles,
  busy,
  onOpen,
  onCreate,
}: {
  articles: StoredArticle[];
  busy?: boolean;
  onOpen: (id: string) => void;
  onCreate: () => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("updated");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: articles.length };
    for (const a of articles) c[a.status] = (c[a.status] ?? 0) + 1;
    return c;
  }, [articles]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = articles.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (category !== "all" && a.category !== category) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.deck.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      const key = sort === "updated" ? "updatedAt" : "publishedAt";
      return b[key].localeCompare(a[key]);
    });
  }, [articles, query, status, category, sort]);

  // Default is "all", not "published" — writers come here looking for drafts.
  const statusTabs: { value: Status | "all"; label: string }[] = [
    { value: "all", label: "Semua" },
    { value: "published", label: "Terbit" },
    { value: "draft", label: "Draft" },
    { value: "changed", label: "Ada perubahan" },
  ];

  return (
    <div>
      {/* ---- heading ---- */}
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="u-display text-bone-50 text-3xl">Artikel</h1>
          <p className="text-bone-500 mt-2 text-[0.8125rem]">
            {articles.length} tulisan · {counts.draft ?? 0} masih draft
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          disabled={busy}
          className="group bg-volt-500 hover:bg-volt-400 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 disabled:opacity-50"
        >
          {busy ? "Membuat…" : "Tulis artikel"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* ---- toolbar ---- */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul, deck, atau tag…"
            className="text-bone-100 placeholder:text-bone-700 focus:border-volt-500/60 w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pr-3 pl-9 text-sm transition-colors focus:outline-none"
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="text-bone-600 absolute top-1/2 left-3 -translate-y-1/2"
          >
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-bone-200 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none"
        >
          <option value="all" className="bg-ink-900">
            Semua kategori
          </option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug} className="bg-ink-900">
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="text-bone-200 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none"
        >
          <option value="updated" className="bg-ink-900">
            Terakhir diubah
          </option>
          <option value="published" className="bg-ink-900">
            Tanggal terbit
          </option>
          <option value="title" className="bg-ink-900">
            Judul A–Z
          </option>
        </select>
      </div>

      {/* ---- status tabs ---- */}
      <div className="mt-4 flex flex-wrap gap-2">
        {statusTabs.map((t) => {
          const active = status === t.value;
          const n = t.value === "all" ? counts.all : (counts[t.value] ?? 0);
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setStatus(t.value)}
              className={`u-eyebrow inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.5625rem] transition-all duration-200 ${
                active
                  ? "border-volt-500/50 bg-volt-500/12 text-volt-400"
                  : "text-bone-500 hover:text-bone-200 border-white/10 hover:border-white/25"
              }`}
            >
              {t.label}
              <span className={active ? "text-volt-400/60" : "text-bone-700"}>{n}</span>
            </button>
          );
        })}
      </div>

      {/* ---- table ---- */}
      <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07]">
        <div className="u-eyebrow text-bone-600 hidden grid-cols-[1fr_130px_120px_110px_90px] gap-4 border-b border-white/[0.07] bg-white/[0.02] px-5 py-3 text-[0.5rem] lg:grid">
          <span>Judul</span>
          <span>Status</span>
          <span>Kategori</span>
          <span>Diubah</span>
          <span className="text-right">Aksi</span>
        </div>

        {rows.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-bone-400 text-sm">Tidak ada artikel yang cocok.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setStatus("all");
                setCategory("all");
              }}
              className="text-volt-400 mt-3 text-xs hover:underline"
            >
              Hapus semua filter
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {rows.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => onOpen(a.id)}
                  className="group grid w-full grid-cols-1 gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[0.025] lg:grid-cols-[1fr_130px_120px_110px_90px] lg:items-center"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-md border border-white/10">
                      <Image
                        src={a.coverThumb}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-bone-100 group-hover:text-bone-50 truncate text-[0.875rem] font-semibold">
                        {a.title}
                      </div>
                      <div className="text-bone-600 mt-1 truncate text-[0.6875rem]">
                        {getSeries(a.series)?.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 lg:block">
                    <StatusBadge status={a.status} />
                    <span className="text-bone-700 text-[0.6875rem] lg:hidden">
                      {a.category}
                    </span>
                  </div>

                  <span className="u-eyebrow text-bone-500 hidden text-[0.5rem] lg:block">
                    {a.category}
                  </span>

                  <span className="u-num text-bone-500 hidden text-[0.6875rem] lg:block">
                    {formatDateShort(a.updatedAt.slice(0, 10))}
                  </span>

                  <span className="hidden justify-end lg:flex">
                    <span className="text-bone-700 group-hover:text-volt-400 text-[0.6875rem] transition-colors">
                      Edit →
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-bone-600 mt-4 text-[0.6875rem]">
        Menampilkan {rows.length} dari {articles.length} artikel.
      </p>
    </div>
  );
}
