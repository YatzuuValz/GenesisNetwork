import Image from "@/components/ui/Img";
import { audienceStats, channels, instagramPosts, seriesList, site } from "@/data";
import type { InstagramPost } from "@/data";
import { Arrow, Bloom, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

const ratio = {
  "4/5": "aspect-[4/5]",
  "9/16": "aspect-[9/16]",
} as const;

const activeSeries = seriesList.filter((s) => s.slug !== "genesis-rankings");

/** Flagged posts float to the front of their group. */
const byTop = (a: InstagramPost, b: InstagramPost) =>
  Number(Boolean(b.top)) - Number(Boolean(a.top));

const reels = instagramPosts.filter((p) => p.kind === "reel").sort(byTop);
const posts = instagramPosts.filter((p) => p.kind === "post").sort(byTop);

const CARD_SIZES = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 19vw";

function PostCard({ post }: { post: InstagramPost }) {
  return (
    <a
      href={post.permalink ?? site.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <figure className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
        <div className={`relative ${ratio[post.aspect]}`}>
          <Image
            src={post.thumb}
            alt={post.caption}
            fill
            sizes={CARD_SIZES}
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="from-ink-950/92 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {post.kind === "reel" && (
            <span className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-black/45 backdrop-blur-sm">
              <PlayGlyph />
            </span>
          )}

          <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-bone-50 text-[0.8125rem] leading-snug font-semibold">
              {post.caption}
            </p>
            <span className="text-volt-400 mt-2 inline-flex items-center gap-1.5 text-[0.6875rem] font-medium">
              {post.permalink ? "Buka di Instagram" : "Lihat profil"}
              <Arrow className="size-3" />
            </span>
          </figcaption>
        </div>
      </figure>
    </a>
  );
}

function GroupHeading({ label, count, note }: { label: string; count: number; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/[0.07] pb-3.5">
      <h3 className="u-display text-bone-50 flex items-baseline gap-3 text-lg">
        {label}
        <span className="u-num text-bone-600 text-xs font-normal">
          {String(count).padStart(2, "0")}
        </span>
      </h3>
      <span className="text-bone-600 text-[0.6875rem]">{note}</span>
    </div>
  );
}

export default function InstagramShowcase() {
  return (
    <section id="karya" className="u-noise relative isolate scroll-mt-20 overflow-hidden">
      <Bloom className="top-[6%] left-[-8%] h-[30rem] w-[30rem]" opacity={0.2} />

      <div className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-28">
        {/* ---- heading ---- */}
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow dot>Sorotan konten</Eyebrow>
              <h2 className="u-display text-bone-50 mt-5 text-[clamp(2rem,4.6vw,3.4rem)]">
                Tujuh konten tiap minggu.
                <br />
                <span className="u-accent text-volt-400 font-normal">Rumah utamanya Instagram.</span>
              </h2>
              <p className="text-bone-400 mt-6 max-w-xl text-[0.975rem] leading-relaxed">
                Kami juga terbit di TikTok dan YouTube, tapi Instagram yang paling hidup — di sana
                percakapannya terjadi. Semua di bawah ini karya kami sendiri.
              </p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition-all duration-300 ${
                        c.primary
                          ? "border-volt-500/40 bg-volt-500/10 text-bone-100 hover:border-volt-500"
                          : "text-bone-400 hover:text-bone-100 border-white/10 hover:border-white/25"
                      }`}
                    >
                      {c.label}
                      <span
                        className={`text-[0.6875rem] ${c.primary ? "text-volt-400" : "text-bone-600"}`}
                      >
                        {c.primary ? "utama" : c.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-volt-500/45 bg-volt-500/10 text-bone-50 hover:border-volt-500 hover:bg-volt-500/20 inline-flex shrink-0 items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-300"
            >
              <InstagramGlyph />
              {site.instagramHandle}
              <Arrow className="text-volt-400 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        {/* ---- programmes ---- */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
          {activeSeries.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <div className="bg-ink-950 h-full p-6">
                <h3 className="u-display text-bone-50 text-base">{s.name}</h3>
                <div className="u-eyebrow text-volt-400 mt-2 text-[0.5rem]">{s.format}</div>
                <p className="text-bone-400 mt-3.5 text-[0.8125rem] leading-relaxed">{s.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---- top reels ---- */}
        {reels.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <GroupHeading
                label="Top Reels"
                count={reels.length}
                note="Genesis Unscripted · video"
              />
            </Reveal>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {reels.map((post, i) => (
                <Reveal key={post.src} delay={i * 70}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---- top feed ---- */}
        {posts.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <GroupHeading
                label="Top Feed"
                count={posts.length}
                note="Carousel · crypto & saham"
              />
            </Reveal>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {posts.map((post, i) => (
                <Reveal key={post.src} delay={(i % 5) * 60}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---- stats + follow ---- */}
        <Reveal>
          <div className="u-panel mt-14 flex flex-col gap-9 rounded-2xl p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div>
              <Eyebrow>Instagram · 30 hari terakhir</Eyebrow>
              <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
                {audienceStats.map((s) => (
                  <div key={s.label}>
                    <dd className="u-num text-bone-50 text-[clamp(1.4rem,2.6vw,2rem)] leading-none font-medium">
                      {s.value}
                    </dd>
                    <dt className="text-bone-300 mt-2.5 text-xs font-medium">{s.label}</dt>
                    <div className="text-bone-600 mt-1 text-[0.6875rem]">{s.note}</div>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-volt-500 hover:bg-volt-400 relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-14px_rgba(0,95,247,0.9)] transition-all duration-300"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
              <InstagramGlyph className="relative" />
              <span className="relative">Follow Genesis</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden>
      <path d="M0.5 0.8v8.4L8.2 5 0.5 0.8Z" fill="white" />
    </svg>
  );
}
