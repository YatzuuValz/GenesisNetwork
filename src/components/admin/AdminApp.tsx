"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "@/components/ui/Img";
import { site } from "@/data";
import type { SessionUser } from "@/server/auth";
import type { StoredArticle } from "@/server/articles";
import ArticleList from "./ArticleList";
import ArticleEditor from "./ArticleEditor";

export default function AdminApp({
  user,
  articles,
}: {
  user: SessionUser;
  articles: StoredArticle[];
}) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const current = articles.find((a) => a.id === openId) ?? null;

  /** Server is the source of truth: after any write, re-read rather than guess. */
  const refresh = () => router.refresh();

  async function createArticle() {
    setBusy(true);
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Artikel baru" }),
    }).catch(() => null);

    if (res?.ok) {
      const { id } = await res.json();
      refresh();
      setOpenId(id);
    }
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
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

            <div className="flex items-center gap-2.5">
              <span className="text-bone-500 hidden text-xs sm:block">{user.name}</span>
              <button
                type="button"
                onClick={logout}
                className="text-bone-500 hover:text-bone-100 rounded-full border border-white/10 px-3 py-1.5 text-xs transition-colors hover:border-white/25"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
        {current ? (
          <ArticleEditor
            article={current}
            onBack={() => {
              setOpenId(null);
              refresh();
            }}
            onSaved={refresh}
          />
        ) : (
          <ArticleList
            articles={articles}
            busy={busy}
            onOpen={setOpenId}
            onCreate={createArticle}
          />
        )}
      </main>
    </div>
  );
}
