"use client";

import { useState } from "react";
import { revenueStreams, site } from "@/data";
import { composeInquiry, MESSAGE_MAX, waLink, type Inquiry } from "@/lib/whatsapp";
import { Arrow, WhatsAppGlyph } from "@/components/ui/primitives";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-bone-100 placeholder:text-bone-600 transition-colors duration-300 focus:border-volt-500/60 focus:bg-white/[0.05] focus:outline-none";

const label = "u-eyebrow text-bone-600 text-[0.5625rem]";

const empty: Inquiry = { name: "", company: "", email: "", phone: "", stream: "", message: "" };

/** For someone who would rather just talk than fill anything in. */
const OPENER = "Halo Genesis Network 👋 Saya ingin membahas kerja sama.";

export default function InquiryForm() {
  const [values, setValues] = useState<Inquiry>(empty);
  const [trap, setTrap] = useState(""); // honeypot — see the hidden input below
  const [handedOff, setHandedOff] = useState<string | null>(null);

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const link = waLink(composeInquiry(values));

    // Record the lead first, but deliberately do NOT await it: awaiting ends
    // the user gesture and the browser then blocks the WhatsApp tab.
    // `keepalive` lets the request finish on its own after this handler returns.
    //
    // On the GitHub Pages build there is no /api/leads and this simply fails,
    // by design — the hand-off below is the part that must work everywhere.
    //
    // The honeypot travels with the payload rather than being checked here, so
    // the rule lives in one place and also catches a bot posting straight to
    // the endpoint.
    fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...values, website: trap }),
      keepalive: true,
    }).catch(() => {});

    window.open(link, "_blank", "noopener,noreferrer");
    setHandedOff(link);
  }

  if (handedOff) {
    return (
      <div className="u-panel rounded-2xl p-7 text-center sm:p-9">
        <div className="border-volt-500/40 bg-volt-500/10 mx-auto grid size-12 place-items-center rounded-full border">
          <WhatsAppGlyph className="text-volt-400 size-6" />
        </div>

        <h3 className="u-display text-bone-50 mt-6 text-xl">WhatsApp sudah dibuka</h3>
        <p className="text-bone-400 mx-auto mt-3 max-w-sm text-sm leading-relaxed">
          Pesanmu sudah tersusun di sana — tinggal tekan kirim. Kami balas di jam kerja, Senin
          sampai Jumat.
        </p>

        <a
          href={handedOff}
          target="_blank"
          rel="noopener noreferrer"
          className="text-volt-400 hover:text-volt-500 mt-6 inline-block text-xs underline underline-offset-4"
        >
          Tidak terbuka? Buka WhatsApp di sini
        </a>

        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setHandedOff(null);
          }}
          className="text-bone-600 hover:text-bone-200 mt-6 block w-full text-xs transition-colors"
        >
          Kirim pengajuan lain
        </button>
      </div>
    );
  }

  return (
    <div className="u-panel relative rounded-2xl p-7 sm:p-9">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Nama</span>
            <input
              required
              maxLength={120}
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Nama kamu"
              className={`${field} mt-2.5`}
            />
          </label>
          <label className="block">
            <span className={label}>Brand / perusahaan</span>
            <input
              required
              maxLength={120}
              value={values.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Nama brand"
              className={`${field} mt-2.5`}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Email</span>
            <input
              required
              type="email"
              maxLength={200}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="nama@perusahaan.com"
              className={`${field} mt-2.5`}
            />
          </label>
          <label className="block">
            <span className={label}>
              WhatsApp <span className="text-bone-700 normal-case">— opsional</span>
            </span>
            <input
              type="tel"
              inputMode="tel"
              maxLength={30}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="0812…"
              className={`${field} mt-2.5`}
            />
          </label>
        </div>

        <label className="block">
          <span className={label}>Jenis kerja sama</span>
          <select
            value={values.stream}
            onChange={(e) => set("stream", e.target.value)}
            className={`${field} mt-2.5`}
          >
            <option value="" disabled>
              Pilih salah satu
            </option>
            {revenueStreams.map((r) => (
              <option key={r.name} value={r.name} className="bg-ink-900">
                {r.name}
              </option>
            ))}
            <option value="Lainnya" className="bg-ink-900">
              Lainnya
            </option>
          </select>
        </label>

        <label className="block">
          <span className={label}>Ceritakan singkat</span>
          <textarea
            rows={4}
            maxLength={MESSAGE_MAX}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Produk apa yang ingin dibahas, target audiens, dan perkiraan waktu kampanye."
            className={`${field} mt-2.5 resize-none`}
          />
          <span className="u-num text-bone-700 mt-1.5 block text-right text-[0.625rem]">
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </label>

        {/* Honeypot: hidden from people, irresistible to form-filling bots.
            A submission that touches it is dropped instead of stored. */}
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          className="group bg-volt-500 hover:bg-volt-400 relative mt-2 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(0,95,247,0.9)] transition-all duration-300"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
          <WhatsAppGlyph className="relative size-4" />
          <span className="relative">Lanjut ke WhatsApp</span>
          <Arrow className="relative transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="text-bone-600 text-center text-[0.6875rem] leading-relaxed">
          Pesanmu tersusun otomatis di WhatsApp — kamu yang menekan kirim, jadi bisa diperiksa dulu.
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-5 text-[0.6875rem]">
          <span className="text-bone-700">Tidak mau isi form?</span>
          <a
            href={waLink(OPENER)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone-400 hover:text-volt-400 inline-flex items-center gap-1.5 transition-colors"
          >
            <WhatsAppGlyph className="size-3.5" />
            Chat langsung
          </a>
          <a
            href={`mailto:${site.partnershipEmail}`}
            className="text-bone-400 hover:text-volt-400 transition-colors"
          >
            Kirim email
          </a>
        </div>
      </form>
    </div>
  );
}
