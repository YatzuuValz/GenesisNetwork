"use client";

import { useState } from "react";
import type { Lead, LeadStatus } from "@/server/leads";
import { toWaNumber, waLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/ui/primitives";

const statusLabel: Record<LeadStatus, string> = {
  new: "Baru",
  contacted: "Dihubungi",
  won: "Deal",
  archived: "Arsip",
};

const statusTone: Record<LeadStatus, string> = {
  new: "border-volt-500/40 bg-volt-500/12 text-volt-400",
  contacted: "border-white/15 bg-white/[0.06] text-bone-300",
  won: "border-bull/40 bg-bull/12 text-bull",
  archived: "border-white/10 bg-transparent text-bone-600",
};

const ORDER: LeadStatus[] = ["new", "contacted", "won", "archived"];

/** "9 Sep 2026 · 14:30" — same hand-formatting rule as the rest of the site. */
function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  // prettier-ignore
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function LeadList({ leads, onChanged }: { leads: Lead[]; onChanged: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fresh = leads.filter((l) => l.status === "new").length;

  async function patch(id: string, status: LeadStatus) {
    setBusyId(id);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    setBusyId(null);
    onChanged();
  }

  async function remove(id: string) {
    if (!confirm("Hapus lead ini? Tidak bisa dikembalikan.")) return;
    setBusyId(id);
    await fetch(`/api/leads/${id}`, { method: "DELETE" }).catch(() => null);
    setBusyId(null);
    onChanged();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-5">
        <div>
          <h1 className="u-display text-bone-50 text-2xl">Leads</h1>
          <p className="text-bone-500 mt-1.5 text-xs">
            Pengajuan dari form Partnership. Tercatat saat form dikirim, sebelum orangnya menekan
            kirim di WhatsApp.
          </p>
        </div>
        <div className="u-num text-bone-600 text-xs">
          {leads.length} total
          {fresh > 0 && <span className="text-volt-400"> · {fresh} baru</span>}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="border-white/[0.07] mt-8 rounded-2xl border border-dashed py-16 text-center">
          <p className="text-bone-400 text-sm">Belum ada pengajuan.</p>
          <p className="text-bone-700 mt-2 text-xs">
            Coba isi form di <span className="text-bone-500">/partnership</span> — leadnya muncul di
            sini.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {leads.map((lead) => {
            const open = openId === lead.id;
            const wa = toWaNumber(lead.phone);

            return (
              <li
                key={lead.id}
                className={`rounded-2xl border transition-colors ${
                  open ? "border-white/15 bg-white/[0.035]" : "border-white/[0.07] bg-white/[0.015]"
                } ${busyId === lead.id ? "opacity-50" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : lead.id)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 text-left"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="text-bone-100 truncate text-sm font-semibold">
                        {lead.company}
                      </span>
                      <span className="text-bone-500 truncate text-xs">{lead.name}</span>
                    </div>
                    <div className="text-bone-600 mt-1.5 flex flex-wrap items-center gap-x-2.5 text-[0.6875rem]">
                      <span className="u-num">{formatWhen(lead.createdAt)}</span>
                      {lead.stream && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="truncate">{lead.stream}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.625rem] font-medium ${statusTone[lead.status]}`}
                  >
                    {statusLabel[lead.status]}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-white/[0.07] px-5 py-5">
                    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      <div className="min-w-0">
                        <dt className="u-eyebrow text-bone-700 text-[0.5rem]">Email</dt>
                        <dd className="mt-1.5 truncate text-sm">
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-bone-200 hover:text-volt-400 transition-colors"
                          >
                            {lead.email}
                          </a>
                        </dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="u-eyebrow text-bone-700 text-[0.5rem]">WhatsApp</dt>
                        <dd className="text-bone-200 mt-1.5 truncate text-sm">
                          {wa ? (
                            <a
                              href={waLink(undefined, wa)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-volt-400 inline-flex items-center gap-2 transition-colors"
                            >
                              <WhatsAppGlyph className="size-3.5" />
                              {lead.phone}
                            </a>
                          ) : (
                            <span className="text-bone-700">tidak diisi</span>
                          )}
                        </dd>
                      </div>
                    </dl>

                    {lead.message && (
                      <p className="text-bone-300 mt-5 rounded-xl bg-black/25 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                        {lead.message}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {ORDER.filter((s) => s !== lead.status).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => patch(lead.id, s)}
                          className="text-bone-400 hover:text-bone-50 rounded-full border border-white/10 px-3 py-1.5 text-[0.6875rem] transition-colors hover:border-white/25"
                        >
                          Tandai {statusLabel[s].toLowerCase()}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => remove(lead.id)}
                        className="text-bear/70 hover:text-bear ml-auto text-[0.6875rem] transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
