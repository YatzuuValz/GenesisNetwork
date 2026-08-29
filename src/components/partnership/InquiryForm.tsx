"use client";

import { useState } from "react";
import { revenueStreams, site } from "@/data";
import { Arrow } from "@/components/ui/primitives";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-bone-100 placeholder:text-bone-600 transition-colors duration-300 focus:border-volt-500/60 focus:bg-white/[0.05] focus:outline-none";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="u-panel rounded-2xl p-7 sm:p-9">
      {submitted ? (
        <div className="py-10 text-center">
          <div className="border-volt-500/40 bg-volt-500/10 mx-auto grid size-12 place-items-center rounded-full border">
            <Arrow className="text-volt-400" />
          </div>
          <h3 className="u-display text-bone-50 mt-6 text-xl">Form belum terhubung</h3>
          <p className="text-bone-400 mx-auto mt-3 max-w-sm text-sm leading-relaxed">
            Ini masih tahap mockup, jadi tidak ada data yang terkirim ke mana pun. Untuk sekarang,
            kirim langsung ke{" "}
            <a
              href={`mailto:${site.partnershipEmail}`}
              className="text-volt-400 underline underline-offset-4"
            >
              {site.partnershipEmail}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-bone-500 hover:text-bone-200 mt-7 text-xs transition-colors"
          >
            Kembali ke form
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="u-eyebrow text-bone-600 text-[0.5625rem]">Nama</span>
              <input required name="name" placeholder="Nama kamu" className={`${field} mt-2.5`} />
            </label>
            <label className="block">
              <span className="u-eyebrow text-bone-600 text-[0.5625rem]">Brand / perusahaan</span>
              <input required name="company" placeholder="Nama brand" className={`${field} mt-2.5`} />
            </label>
          </div>

          <label className="block">
            <span className="u-eyebrow text-bone-600 text-[0.5625rem]">Email</span>
            <input
              required
              type="email"
              name="email"
              placeholder="nama@perusahaan.com"
              className={`${field} mt-2.5`}
            />
          </label>

          <label className="block">
            <span className="u-eyebrow text-bone-600 text-[0.5625rem]">Jenis kerja sama</span>
            <select name="stream" className={`${field} mt-2.5`} defaultValue="">
              <option value="" disabled>
                Pilih salah satu
              </option>
              {revenueStreams.map((r) => (
                <option key={r.name} value={r.name} className="bg-ink-900">
                  {r.name}
                </option>
              ))}
              <option value="other" className="bg-ink-900">
                Lainnya
              </option>
            </select>
          </label>

          <label className="block">
            <span className="u-eyebrow text-bone-600 text-[0.5625rem]">Ceritakan singkat</span>
            <textarea
              name="message"
              rows={4}
              placeholder="Produk apa yang ingin dibahas, target audiens, dan perkiraan waktu kampanye."
              className={`${field} mt-2.5 resize-none`}
            />
          </label>

          <button
            type="submit"
            className="group bg-volt-500 hover:bg-volt-400 relative mt-2 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(0,95,247,0.9)] transition-all duration-300"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
            <span className="relative">Kirim pengajuan</span>
            <Arrow className="relative transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="text-bone-600 text-center text-[0.6875rem]">
            Form demo — belum terhubung ke backend.
          </p>
        </form>
      )}
    </div>
  );
}
