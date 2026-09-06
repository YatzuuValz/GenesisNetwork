"use client";

import { useState } from "react";
import Image from "@/components/ui/Img";
import { categories, seriesList } from "@/data";
import type { Block } from "@/data";
import BlockEditor from "./BlockEditor";
import ArticlePreview from "./ArticlePreview";
import { Arrow } from "@/components/ui/primitives";
import type { StoredArticle } from "@/server/articles";
import {
  AutoTextArea,
  Derived,
  Field,
  Panel,
  Select,
  StatusBadge,
  TextInput,
  Toggle,
  type Status,
} from "./fields";

/* Slug is derived, not typed — shown live so the behaviour is concrete. */

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 70);
}

export default function ArticleEditor({
  article,
  onBack,
  onSaved,
}: {
  article: StoredArticle;
  onBack: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(article.title);
  const [accent, setAccent] = useState(article.accent);
  const [deck, setDeck] = useState(article.deck);
  const [category, setCategory] = useState(article.category);
  const [series, setSeries] = useState(article.series);
  const [status, setStatus] = useState<Status>(article.status);
  const [featured, setFeatured] = useState(article.featured);
  const [tags, setTags] = useState(article.tags.join(", "));
  const [coverAlt, setCoverAlt] = useState(article.coverAlt);
  const [publishedAt, setPublishedAt] = useState(article.publishedAt);
  const [seoTitle, setSeoTitle] = useState(article.seoTitle);
  const [seoDesc, setSeoDesc] = useState(article.seoDesc);
  const [saved, setSaved] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);

  const [body, setBody] = useState<Block[]>(article.body);
  const slug = slugify(title);

  const notice = (msg: string) => {
    setSaved(msg);
    setTimeout(() => setSaved(null), 3000);
  };

  const [busy, setBusy] = useState(false);

  async function save(nextStatus: Status) {
    setBusy(true);
    const res = await fetch(`/api/articles/${article.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        accent,
        deck,
        category,
        series,
        status: nextStatus,
        featured,
        coverAlt,
        seoTitle,
        seoDesc,
        publishedAt,
        body,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    }).catch(() => null);

    setBusy(false);

    if (!res?.ok) {
      notice("Gagal menyimpan — perubahan masih ada di layar ini.");
      return;
    }

    setStatus(nextStatus);
    onSaved();
    notice(nextStatus === "published" ? "Tersimpan dan terbit." : "Draft tersimpan.");
  }

  async function remove() {
    if (!confirm(`Hapus "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const res = await fetch(`/api/articles/${article.id}`, { method: "DELETE" }).catch(() => null);
    if (res?.ok) onBack();
    else notice("Gagal menghapus.");
  }

  return (
    <div>
      {/* ---- action bar ---- */}
      <div className="bg-ink-950/90 sticky top-0 z-20 -mx-5 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-3.5 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group text-bone-400 hover:text-bone-100 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <Arrow className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            Artikel
          </button>
          <span className="bg-white/10 h-4 w-px" />
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewing(true)}
            className="text-bone-300 hover:text-bone-50 rounded-full border border-white/12 px-4 py-2 text-xs transition-colors hover:border-white/25"
          >
            Pratinjau
          </button>
          <button
            type="button"
            onClick={() => save("draft")}
            disabled={busy}
            className="text-bone-300 hover:text-bone-50 rounded-full border border-white/12 px-4 py-2 text-xs transition-colors hover:border-white/25"
          >
            {busy ? "Menyimpan…" : "Simpan draft"}
          </button>
          <button
            type="button"
            onClick={() => save("published")}
            disabled={busy}
            className="bg-volt-500 hover:bg-volt-400 rounded-full px-5 py-2 text-xs font-semibold text-white transition-colors"
          >
            Terbitkan
          </button>
        </div>
      </div>

      {saved && (
        <div
          role="status"
          className="border-volt-500/40 bg-volt-500/10 text-bone-100 mb-7 rounded-lg border px-4 py-3 text-[0.8125rem]"
        >
          {saved}
        </div>
      )}

      {/* min-w-0 on both columns: without it a grid track refuses to shrink below
          its content, and one long unbreakable string pushes the sidebar off-screen. */}
      <div className="grid min-w-0 gap-7 lg:grid-cols-[1.65fr_minmax(0,1fr)] lg:items-start">
        {/* ---- main column ---- */}
        <div className="min-w-0 space-y-7">
          <Panel title="Konten">
            <Field label="Judul">
              <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>

            <Field
              label="Frasa aksen"
              hint="Bagian judul yang tampil dengan serif miring biru. Kosongkan kalau tidak perlu."
            >
              <TextInput value={accent} onChange={(e) => setAccent(e.target.value)} />
            </Field>

            <Field label="Slug (URL)" derived hint="Dibuat dari judul. Bisa dikunci setelah terbit supaya link lama tidak rusak.">
              <Derived value={`/artikel/${slug || "…"}`} />
            </Field>

            <Field label="Deck" hint="Satu–dua kalimat untuk kartu dan hasil pencarian.">
              <AutoTextArea value={deck} onChange={setDeck} minRows={2} />
            </Field>
          </Panel>

          <Panel title="Cover">
            <div className="flex items-start gap-5">
              <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-lg border border-white/10">
                <Image src={article.coverThumb} alt="" fill sizes="112px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <button
                  type="button"
                  onClick={() => notice("Unggah file menyusul — pustaka media belum ada.")}
                  className="text-bone-300 hover:text-bone-50 w-full rounded-lg border border-dashed border-white/15 px-4 py-3 text-xs transition-colors hover:border-white/30"
                >
                  Ganti gambar
                </button>
                <Field label="Alt text" hint="Dibaca pembaca tunanetra dan mesin pencari.">
                  <TextInput value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} />
                </Field>
                <Field label="Ukuran turunan" derived hint="Dibuat otomatis dari satu file yang diunggah.">
                  <Derived value="1200px · 640px · 240px" />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel title={`Isi artikel · ${body.length} blok`}>
            <BlockEditor blocks={body} onChange={setBody} />
            <p className="text-bone-600 text-[0.6875rem] leading-relaxed">
              Di versi jadinya, paragraf dan subjudul digabung jadi satu editor teks
              mengalir. Blok berstruktur seperti kutipan dan angka tetap terpisah karena
              punya isian sendiri.
            </p>
          </Panel>
        </div>

        {/* ---- sidebar ---- */}
        <div className="min-w-0 space-y-7">
          <Panel title="Penerbitan">
            <Field label="Status">
              <Select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
                <option value="draft" className="bg-ink-900">
                  Draft
                </option>
                <option value="published" className="bg-ink-900">
                  Terbit
                </option>
                <option value="changed" className="bg-ink-900">
                  Ada perubahan
                </option>
              </Select>
            </Field>

            <Field label="Tanggal terbit" hint="Isi tanggal ke depan untuk terbit terjadwal.">
              <TextInput
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </Field>

            <Field label="Terakhir diubah" derived>
              <Derived value={article.updatedAt.slice(0, 10)} />
            </Field>

            <div className="border-t border-white/[0.07] pt-3">
              <Toggle checked={featured} onChange={setFeatured} label="Tampilkan sebagai unggulan" />
            </div>
          </Panel>

          <Panel title="Pengelompokan">
            <Field label="Kategori">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-ink-900">
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Seri">
              <Select value={series} onChange={(e) => setSeries(e.target.value as typeof series)}>
                {seriesList.map((s) => (
                  <option key={s.slug} value={s.slug} className="bg-ink-900">
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Tag" hint="Pisahkan dengan koma.">
              <TextInput value={tags} onChange={(e) => setTags(e.target.value)} />
            </Field>

            <Field label="Penulis" derived hint="Dari akun yang sedang login.">
              <Derived value={article.authorName} />
            </Field>

          </Panel>

          <Panel title="SEO">
            <Field label="Meta title" hint={`Kosong → pakai judul: "${title.slice(0, 40)}…"`}>
              <TextInput
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Ikuti judul"
              />
            </Field>

            <Field label="Meta description" hint="Kosong → pakai deck.">
              <AutoTextArea value={seoDesc} onChange={setSeoDesc} placeholder="Ikuti deck" />
            </Field>

            <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3.5">
              <div className="u-eyebrow text-bone-600 text-[0.5rem]">Pratinjau Google</div>
              <div className="mt-2.5 truncate text-[0.8125rem] text-[#8ab4f8]">
                {seoTitle || title} {accent && !seoTitle ? accent : ""}
              </div>
              <div className="text-bone-600 mt-0.5 text-[0.6875rem]">
                genesisnetwork.id › artikel › {slug.slice(0, 24)}…
              </div>
              <div className="text-bone-400 mt-1.5 line-clamp-2 text-[0.6875rem] leading-relaxed">
                {seoDesc || deck}
              </div>
            </div>
          </Panel>

          <button
            type="button"
            onClick={remove}
            className="text-bear/80 hover:text-bear hover:border-bear/30 w-full rounded-lg border border-white/[0.07] px-4 py-2.5 text-xs transition-colors"
          >
            Hapus artikel
          </button>
        </div>
      </div>

      {previewing && (
        <ArticlePreview
          title={title}
          accent={accent}
          deck={deck}
          cover={article.cover}
          category={category}
          series={series}
          publishedAt={publishedAt}
          status={status}
          author={article.authorName}
          body={body}
          onClose={() => setPreviewing(false)}
        />
      )}
    </div>
  );
}
