import type { ReactNode } from "react";
import { Bloom, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="u-noise relative isolate overflow-hidden border-b border-white/[0.07] pt-[132px] pb-16 sm:pt-[152px] sm:pb-20">
      <div aria-hidden className="u-grid-field u-mask-fade-b absolute inset-0 opacity-50" />
      <Bloom className="-top-24 left-[12%] h-[26rem] w-[26rem]" opacity={0.24} />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow dot>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="u-display text-bone-50 mt-6 max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.2rem)]">
                {title}
                {accent && (
                  <>
                    <br />
                    <span className="u-accent text-volt-400 font-normal">{accent}</span>
                  </>
                )}
              </h1>
            </Reveal>
            {lead && (
              <Reveal delay={160}>
                <p className="text-bone-400 mt-7 max-w-xl text-[1.0125rem] leading-relaxed">
                  {lead}
                </p>
              </Reveal>
            )}
          </div>

          {aside && (
            <Reveal delay={200}>
              <div>{aside}</div>
            </Reveal>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
