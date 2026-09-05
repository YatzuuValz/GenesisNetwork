"use client";

import { useState } from "react";
import type { Block } from "@/data";
import { AutoTextArea, TextInput } from "./fields";

/**
 * One editor per block type, so the inputs each type actually needs are visible
 * rather than described. This is the mockup of what the rich-text editor will
 * eventually replace for prose — the structured blocks (quote, stat) stay.
 */

export const BLOCK_TYPES: { type: Block["type"]; label: string; hint: string }[] = [
  { type: "p", label: "Paragraf", hint: "Teks biasa" },
  { type: "h2", label: "Subjudul", hint: "Pemisah bagian" },
  { type: "quote", label: "Kutipan", hint: "Kalimat menonjol + sumber" },
  { type: "list", label: "Daftar", hint: "Poin bernomor titik" },
  { type: "stat", label: "Angka", hint: "Angka besar + label" },
];

function emptyBlock(type: Block["type"]): Block {
  switch (type) {
    case "p":
      return { type: "p", text: "" };
    case "h2":
      return { type: "h2", text: "" };
    case "quote":
      return { type: "quote", text: "", cite: "" };
    case "list":
      return { type: "list", items: [""] };
    case "stat":
      return { type: "stat", value: "", label: "", note: "" };
  }
}

export default function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const [adding, setAdding] = useState(false);

  const update = (i: number, next: Block) =>
    onChange(blocks.map((b, idx) => (idx === i ? next : b)));

  const remove = (i: number) => onChange(blocks.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div
          key={i}
          className="group relative rounded-lg border border-white/[0.07] bg-white/[0.02] p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="u-eyebrow text-volt-400/70 text-[0.5rem]">
              {BLOCK_TYPES.find((t) => t.type === block.type)?.label}
            </span>

            <div className="flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
              <IconButton label="Naikkan" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </IconButton>
              <IconButton
                label="Turunkan"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
              >
                ↓
              </IconButton>
              <IconButton label="Hapus blok" onClick={() => remove(i)} danger>
                ×
              </IconButton>
            </div>
          </div>

          {block.type === "p" && (
            <AutoTextArea
              value={block.text}
              onChange={(text) => update(i, { ...block, text })}
              placeholder="Tulis paragraf…"
            />
          )}

          {block.type === "h2" && (
            <TextInput
              value={block.text}
              onChange={(e) => update(i, { ...block, text: e.target.value })}
              placeholder="Subjudul"
            />
          )}

          {block.type === "quote" && (
            <div className="space-y-2.5">
              <AutoTextArea
                value={block.text}
                onChange={(text) => update(i, { ...block, text })}
                placeholder="Kalimat kutipan…"
              />
              <TextInput
                value={block.cite ?? ""}
                onChange={(e) => update(i, { ...block, cite: e.target.value })}
                placeholder="Sumber (opsional)"
              />
            </div>
          )}

          {block.type === "list" && (
            <div className="space-y-2">
              {block.items.map((item, k) => (
                <div key={k} className="flex items-start gap-2">
                  <span className="bg-volt-500 mt-3 size-1.5 shrink-0 rounded-full" />
                  <AutoTextArea
                    value={item}
                    minRows={1}
                    onChange={(text) =>
                      update(i, {
                        ...block,
                        items: block.items.map((it, idx) => (idx === k ? text : it)),
                      })
                    }
                    placeholder="Poin…"
                  />
                  <IconButton
                    label="Hapus poin"
                    onClick={() =>
                      update(i, { ...block, items: block.items.filter((_, idx) => idx !== k) })
                    }
                    disabled={block.items.length === 1}
                  >
                    ×
                  </IconButton>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update(i, { ...block, items: [...block.items, ""] })}
                className="text-bone-500 hover:text-bone-200 text-xs transition-colors"
              >
                + Tambah poin
              </button>
            </div>
          )}

          {block.type === "stat" && (
            <div className="grid gap-2.5 sm:grid-cols-[minmax(0,140px)_1fr]">
              <TextInput
                value={block.value}
                onChange={(e) => update(i, { ...block, value: e.target.value })}
                placeholder="24 Juni"
              />
              <div className="space-y-2.5">
                <TextInput
                  value={block.label}
                  onChange={(e) => update(i, { ...block, label: e.target.value })}
                  placeholder="Label"
                />
                <TextInput
                  value={block.note ?? ""}
                  onChange={(e) => update(i, { ...block, note: e.target.value })}
                  placeholder="Catatan kecil (opsional)"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ---- add block ---- */}
      {adding ? (
        <div className="rounded-lg border border-dashed border-white/15 p-3">
          <div className="grid gap-2 sm:grid-cols-5">
            {BLOCK_TYPES.map((t) => (
              <button
                key={t.type}
                type="button"
                onClick={() => {
                  onChange([...blocks, emptyBlock(t.type)]);
                  setAdding(false);
                }}
                className="hover:border-volt-500/50 rounded-md border border-white/10 px-3 py-3 text-left transition-colors"
              >
                <span className="text-bone-100 block text-[0.8125rem] font-medium">{t.label}</span>
                <span className="text-bone-600 mt-1 block text-[0.625rem] leading-tight">
                  {t.hint}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAdding(false)}
            className="text-bone-600 hover:text-bone-300 mt-3 text-xs transition-colors"
          >
            Batal
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="text-bone-400 hover:text-bone-100 w-full rounded-lg border border-dashed border-white/15 px-4 py-3 text-xs transition-colors hover:border-white/30"
        >
          + Tambah blok
        </button>
      )}
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid size-6 shrink-0 place-items-center rounded text-sm transition-colors disabled:opacity-25 ${
        danger ? "text-bone-600 hover:text-bear" : "text-bone-600 hover:text-bone-100"
      }`}
    >
      {children}
    </button>
  );
}
