import Image from "@/components/ui/Img";
import type { Block } from "@/data";
import InlineText from "./InlineText";

/**
 * Renders the block array from the CMS. Kept deliberately small — the type
 * union is the contract, so a new block type is a compile error here rather
 * than a silent blank on the page.
 */
export default function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[42rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="u-display text-bone-50 mt-14 mb-5 text-[1.65rem] first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "p":
            return (
              <p key={i} className="text-bone-300 mb-6 text-[1.0625rem] leading-[1.75]">
                <InlineText>{block.text}</InlineText>
              </p>
            );

          case "quote":
            return (
              <figure key={i} className="my-11">
                <blockquote className="border-volt-500 border-l-2 pl-7">
                  <p className="u-accent text-bone-100 text-[1.45rem] leading-[1.4]">
                    {block.text}
                  </p>
                </blockquote>
                {block.cite && (
                  <figcaption className="u-eyebrow text-bone-600 mt-4 pl-7 text-[0.5625rem]">
                    {block.cite}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            return (
              <ul key={i} className="mb-8 space-y-3.5">
                {block.items.map((item) => (
                  <li key={item} className="text-bone-300 flex gap-4 text-[1.0125rem] leading-[1.7]">
                    <span className="bg-volt-500 mt-[0.65em] size-1.5 shrink-0 rounded-full" />
                    <span>
                      <InlineText>{item}</InlineText>
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "stat":
            return (
              <div
                key={i}
                className="u-panel my-11 flex flex-col gap-1.5 rounded-xl p-7 sm:flex-row sm:items-center sm:gap-8"
              >
                <div className="u-num text-volt-400 shrink-0 text-[2.1rem] leading-none font-medium">
                  {block.value}
                </div>
                <div>
                  <div className="text-bone-100 text-sm font-medium">{block.label}</div>
                  {block.note && (
                    <div className="text-bone-500 mt-1 text-xs">{block.note}</div>
                  )}
                </div>
              </div>
            );

          case "image":
            return (
              <figure key={i} className="my-11">
                <div className="relative overflow-hidden rounded-xl border border-white/[0.07]">
                  {/* Height is unknown ahead of time, so the frame sets it and the
                      image covers — no layout shift when it loads. */}
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 42rem"
                      className="object-cover"
                    />
                  </div>
                </div>
                {block.caption && (
                  <figcaption className="text-bone-500 mt-3.5 text-[0.8125rem] leading-relaxed">
                    <InlineText>{block.caption}</InlineText>
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
