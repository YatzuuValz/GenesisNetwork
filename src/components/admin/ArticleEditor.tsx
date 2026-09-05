"use client";

import { useMemo, useState } from "react";
import Image from "@/components/ui/Img";
import { categories, seriesList } from "@/data";
import type { Block } from "@/data";
import { Arrow } from "@/components/ui/primitives";
import type { AdminArticle } from "./ArticleList";
import {
  Derived,
  Field,
  Panel,
  Select,
  StatusBadge,
  TextArea,
  TextInput,
  Toggle,
  type Status,
} from "./fields";

/* The three values a CMS should compute rather than ask for. Demonstrated live
   so the shape of the real thing is obvious before it's built. */

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 70);
}

function wordsIn(body: Block[]) {
  return body.reduce((n, b) => {
    const text =
      b.type === "list"
        ? b.items.join(" ")
        : b.type === "stat"
          ? `${b.value} ${b.label} ${b.note ?? ""}`
          : b.text;
    return n + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

const blockLabel: Record<Block["type"], string> = {
  p: "Paragraf",
  h2: "Subjudul",
  quote: "Kutipan",
  list: "Daftar",
  stat: "Angka",
};

export default function ArticleEditor({
  article,
  onBack,
}: {
  article: AdminArticle;
  onBack: () => void;
}) {
  const [title, setTitle] = useState(article.title);
  const [accent, setAccent] = useState(article.accent ?? "");
  const [deck, setDeck] = useState(article.deck);
  const [category, setCategory] = useState(article.category);
  const [series, setSeries] = useState(article.series);
  const [status, setStatus] = useState<Status>(article.status);
  const [featured, setFeatured] = useState(Boolean(article.featured));
  const [tags, setTags] = useState(article.tags.join(", "));
  const [publishedAt, setPublishedAt] = useState(article.publishedAt);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  const slug = useMemo(() => slugify(title), [title]);
  const readingMinutes = useMemo(
    () => Math.max(1, Math.round(wordsIn(article.body) / 200)),
    [article.body],
  );

  const notice = (msg: string) => {
    setSaved(msg);
    setTimeout(() => setSaved(null), 2600);
  };

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
            onClick={() => notice("Pratinjau akan membuka draft di situs.")}
            className="text-bone-300 hover:text-bone-50 rounded-full border border-white/12 px-4 py-2 text-xs transition-colors hover:border-white/25"
          >
            Pratinjau
          </button>
          <button
            type="button"
            onClick={() => {
              setStatus("draft");
              notice("Draft disimpan — di mockup ini tidak tersimpan ke mana pun.");
            }}
            className="text-bone-300 hover:text-bone-50 rounded-full border border-white/12 px-4 py-2 text-xs transition-colors hover:border-white/25"
          >
            Simpan draft
          </button>
          <button
            type="button"
            onClick={() => {
              setStatus("published");
              notice("Terbit — di mockup ini tidak tersimpan ke mana pun.");
            }}
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

      <div className="grid gap-7 lg:grid-cols-[1.65fr_1fr] lg:items-start">
        {/* ---- main column ---- */}
        <div className="space-y-7">
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
              <TextArea rows={3} value={deck} onChange={(e) => setDeck(e.target.value)} />
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
                  onClick={() => notice("Unggah file akan tersedia setelah backend ada.")}
                  className="text-bone-300 hover:text-bone-50 w-full rounded-lg border border-dashed border-white/15 px-4 py-3 text-xs transition-colors hover:border-white/30"
                >
                  Ganti gambar
                </button>
                <Field label="Alt text" hint="Dibaca pembaca tunanetra dan mesin pencari.">
                  <TextInput defaultValue={article.title} />
                </Field>
                <Field label="Ukuran turunan" derived hint="Dibuat otomatis dari satu file yang diunggah.">
                  <Derived value="1200px · 640px · 240px" />
                </Field>
              </div>
            </div>
          </Panel>

          <Panel title={`Isi artikel · ${article.body.length} blok`}>
            <ul className="space-y-2.5">
              {article.body.map((b, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-4 rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                >
                  <span className="u-eyebrow text-volt-400/70 w-16 shrink-0 pt-0.5 text-[0.5rem]">
                    {blockLabel[b.type]}
                  </span>
                  <span className="text-bone-300 min-w-0 flex-1 truncate text-[0.8125rem]">
                    {b.type === "list"
                      ? b.items[0]
                      : b.type === "stat"
                        ? `${b.value} — ${b.label}`
                        : b.text}
                  </span>
                  <span className="text-bone-700 shrink-0 text-[0.6875rem] opacity-0 transition-opacity group-hover:opacity-100">
                    ⋮⋮
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => notice("Editor teks kaya menyusul bersama backend.")}
              className="text-bone-400 hover:text-bone-100 w-full rounded-lg border border-dashed border-white/15 px-4 py-3 text-xs transition-colors hover:border-white/30"
            >
              + Tambah blok
            </button>

            <p className="text-bone-600 text-[0.6875rem] leading-relaxed">
              Di versi jadinya ini berupa editor teks mengalir, dengan blok khusus
              (kutipan, angka) yang bisa disisipkan di tengah tulisan.
            </p>
          </Panel>
        </div>

        {/* ---- sidebar ---- */}
        <div className="space-y-7">
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
              <Derived value={article.updatedAt} />
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
              <Derived value={article.author.name} />
            </Field>

            <Field label="Waktu baca" derived hint="Dihitung dari jumlah kata isi artikel.">
              <Derived value={`${readingMinutes} menit`} />
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
              <TextArea
                rows={3}
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                placeholder="Ikuti deck"
              />
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
            onClick={() => notice("Hapus akan minta konfirmasi dulu di versi jadinya.")}
            className="text-bear/80 hover:text-bear hover:border-bear/30 w-full rounded-lg border border-white/[0.07] px-4 py-2.5 text-xs transition-colors"
          >
            Hapus artikel
          </button>
        </div>
      </div>
    </div>
  );
}
