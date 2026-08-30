"use client";

import { useState } from "react";
import Image from "@/components/ui/Img";
import { founders, site, teamPhoto } from "@/data";
import type { Founder } from "@/data";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

/**
 * Default state is the team as a whole: group photo plus the manifesto. Picking a
 * name swaps the panel to that person; "Kembali" returns to the default.
 *
 * Photos are optional on purpose — until real files land in public/team/, each
 * slot falls back to an initials monogram so the layout is already correct.
 */
export default function Founders() {
  const [selected, setSelected] = useState<Founder | null>(null);

  return (
    <section className="border-y border-white/[0.07] bg-white/[0.012]">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* ---- display ---- */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow dot>{selected ? "Tim" : "Founders"}</Eyebrow>

              {selected ? (
                <div key={selected.initials} className="mt-6">
                  <Portrait
                    src={selected.photo}
                    initials={selected.initials}
                    alt={selected.name}
                    sizes="(max-width: 1024px) 92vw, 384px"
                    className="aspect-[4/3] w-full max-w-sm"
                  />

                  <h2 className="u-display text-bone-50 mt-8 text-[clamp(1.9rem,4vw,2.9rem)]">
                    {selected.name}
                  </h2>
                  <div className="u-eyebrow text-volt-400 mt-3 text-[0.5625rem]">
                    {selected.role} · {selected.focus}
                  </div>

                  <p className="text-bone-400 mt-6 max-w-lg text-[0.975rem] leading-relaxed">
                    {selected.bio}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="group text-bone-300 hover:text-bone-50 inline-flex items-center gap-2.5 rounded-full border border-white/14 px-5 py-2.5 text-sm transition-all duration-300 hover:border-white/28 hover:bg-white/[0.05]"
                    >
                      <Arrow className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                      Kembali ke tim
                    </button>
                    <a
                      href={selected.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-bone-500 hover:text-volt-400 inline-flex items-center gap-2 text-xs transition-colors"
                    >
                      LinkedIn
                      <Arrow className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  {teamPhoto ? (
                    <Portrait
                      src={teamPhoto}
                      initials="GN"
                      alt="Tim Genesis Network"
                      className="aspect-[4/3] w-full max-w-md"
                    />
                  ) : (
                    // No group shot yet — the four portraits as a mosaic read
                    // better than four empty monograms.
                    <div className="grid w-full max-w-md grid-cols-2 gap-2.5">
                      {founders.map((f) => (
                        <Portrait
                          key={f.initials}
                          src={f.photo}
                          initials={f.initials}
                          alt={f.name}
                          sizes="(max-width: 1024px) 44vw, 220px"
                          className="aspect-square w-full"
                        />
                      ))}
                    </div>
                  )}

                  <h2 className="u-display text-bone-50 mt-8 text-[clamp(2rem,4.4vw,3.2rem)]">
                    Kami membangun ini karena
                    <br />
                    <span className="u-accent text-volt-400 font-normal">
                      penjelasan yang jujur itu langka.
                    </span>
                  </h2>

                  <div className="text-bone-400 mt-8 space-y-5 text-[0.975rem] leading-relaxed">
                    <p>
                      Sebagian besar konten finansial di Indonesia dibuat untuk menjual sesuatu.
                      Sisanya ditulis dengan bahasa yang hanya dimengerti orang yang sudah paham
                      sejak awal.
                    </p>
                    <p>
                      Genesis Network berdiri di antara keduanya: independen, tanpa produk investasi
                      untuk dijual, dan berkomitmen menjelaskan sampai orang benar-benar mengerti —
                      bukan sampai mereka merasa terkesan.
                    </p>
                  </div>

                  <div className="border-volt-500 mt-10 border-l-2 pl-6">
                    <p className="u-accent text-bone-100 text-xl leading-snug">{site.promise}</p>
                    <p className="u-eyebrow text-bone-600 mt-3 text-[0.5625rem]">
                      Bio Instagram Genesis Network
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* ---- roster ---- */}
          <Reveal delay={120}>
            <div>
              <div className="u-eyebrow text-bone-600 flex items-center justify-between border-b border-white/[0.07] pb-4 text-[0.5625rem]">
                <span>Empat co-founder</span>
                <span className="text-bone-700">{selected ? "pilih lain" : "pilih untuk lihat"}</span>
              </div>

              <ul className="mt-2">
                {founders.map((f) => {
                  const active = selected?.initials === f.initials;
                  return (
                    <li key={f.initials}>
                      <button
                        type="button"
                        onClick={() => setSelected(active ? null : f)}
                        aria-pressed={active}
                        className={`group flex w-full items-center gap-5 border-b border-white/[0.07] py-5 text-left transition-colors duration-300 ${
                          active ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <Portrait
                          src={f.thumb ?? f.photo}
                          initials={f.initials}
                          alt={f.name}
                          sizes="56px"
                          className={`size-14 shrink-0 rounded-xl transition-all duration-500 ${
                            active ? "ring-volt-500/60 ring-2" : ""
                          }`}
                          rounded
                        />

                        <span className="min-w-0 flex-1">
                          <span
                            className={`u-display block text-lg transition-colors duration-300 ${
                              active ? "text-volt-400" : "text-bone-50"
                            }`}
                          >
                            {f.name}
                          </span>
                          <span className="u-eyebrow text-bone-600 mt-1.5 block text-[0.5rem]">
                            {f.role} · {f.focus}
                          </span>
                        </span>

                        <Arrow
                          className={`shrink-0 transition-all duration-300 ${
                            active
                              ? "text-volt-400 translate-x-0 opacity-100"
                              : "text-bone-700 group-hover:text-bone-400 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {selected && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-bone-500 hover:text-bone-200 mt-6 text-xs transition-colors"
                >
                  ← Tampilkan tim lengkap
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Photo when one exists, initials monogram when it doesn't. */
function Portrait({
  src,
  initials,
  alt,
  className = "",
  rounded = false,
  sizes = "(max-width: 1024px) 90vw, 30vw",
}: {
  src?: string;
  initials: string;
  alt: string;
  className?: string;
  rounded?: boolean;
  /** Must match the rendered box — otherwise Next generates 3840px variants
   *  for a 56px avatar. */
  sizes?: string;
}) {
  const shape = rounded ? "rounded-xl" : "rounded-2xl";

  if (src) {
    return (
      <div className={`relative overflow-hidden border border-white/10 ${shape} ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`u-panel relative grid place-items-center overflow-hidden ${shape} ${className}`}
      role="img"
      aria-label={`${alt} — foto belum tersedia`}
    >
      <span className="u-num text-bone-500 text-sm">{initials}</span>
    </div>
  );
}
