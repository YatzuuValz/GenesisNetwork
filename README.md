# Genesis Network — website

Front-end mockup for **Genesis Network Indonesia**, an independent financial media brand
covering crypto, stocks, and macroeconomics for Indonesian readers aged 18–35.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No backend — all
content lives in typed local data files, shaped to match the Payload collections that
will replace them.

```bash
npm run dev     # http://localhost:3000
npm run build   # 12 static pages while Artikel/Research are switched off
npm run lint
```

---

## Design system

Everything derives from the `gn.` mark.

| Token | Value | Use |
| --- | --- | --- |
| `volt-500` | `#005FF7` | The brand blue, sampled from the logo. Used as an accent only. |
| `volt-400` | `#3D86FF` | Hover / serif-italic accents |
| `ink-950` | `#050507` | Page canvas |
| `bone-*` | greys | Text ramp, `bone-50` brightest |
| `bull` / `bear` | green / red | Market direction only |

**The colour rule:** the site is roughly 95% monochrome. Blue marks one thing per view —
the accent phrase in a headline, an active state, a live dot. When blue is everywhere it
stops meaning anything.

**Type:** Plus Jakarta Sans (display + UI), Instrument Serif italic (the one editorial
flourish, used for the payoff phrase in a headline), JetBrains Mono (eyebrows, dates,
figures). Utilities live in `globals.css`: `.u-display`, `.u-accent`, `.u-eyebrow`,
`.u-num`, `.u-panel`, `.u-grid-field`, `.u-noise`, `.u-reveal`.

---

## Structure

```
src/
  app/
    page.tsx                          Home — hero, ticker, Instagram showcase, series, founders, partnership
    artikel/                          index · kategori/[category] · [slug]
    research/                         index · kategori/[category] · [slug]
    partnership/                      media kit, formats, case study, targets, inquiry form
    about/                            objective, purpose, principles, team
  components/
    layout/     Header, Footer, PageHero, ComingSoon
    home/       Hero, MarketPanel, Ticker, InstagramShowcase, SeriesStrip, Founders,
                PartnershipTeaser, useLiveCrypto
    article/    ArticleCard (card / lead / row), CategoryTabs, Prose
    research/   ReportCard
    partnership/InquiryForm
    ui/         primitives.tsx, Reveal.tsx
  data/         types.ts, articles.ts, research.ts, site.ts, market.json, index.ts
scripts/        fetch-market.mjs, flatten-rsc-payloads.mjs
public/
  brand/        gn-tile.png, gn-mark.png   (extracted from the supplied logo)
  media/        14 post images from the deck, as webp @1200px + @640px
  team/         4 founder portraits, webp @720px + @240px
_brief/         the original .docx and logo screenshot
```

---

## Content

The mockup runs on **real Genesis content**, not placeholder text. The 14 post images from
the deck were extracted, converted to webp, and used as article covers; their headlines
became the articles. The three named series — **Chain Horizon**, **Equity Voyage**,
**Genesis Unscripted** — drive the site's information architecture.

The four Tokocrypto tokenized-stocks posts are deliberately kept **out** of the article
feed and used as the branded-campaign case study on `/partnership`, which is what they
actually were.

Instagram figures on `/partnership` and `/about` (12,315 views · 2,408 reached · 385
interactions · 739 profile visits) come from the deck's 30-day snapshot and are labelled
as such.

### Publishing switches

Artikel and Free Research are written and ready, but **switched off** — Genesis is
Instagram-first for now. Both routes serve a Coming Soon page instead of 404ing, the nav
shows a "Soon" badge, and no detail pages are built.

```ts
// src/data/site.ts
export const features = { artikel: false, research: false } as const;
```

Flip a flag and everything comes back: nav dropdowns, footer columns, home sections, and
the prerendered detail pages. Nothing in `articles.ts` / `research.ts` was deleted.

### Market data

Quotes are real. `scripts/fetch-market.mjs` runs in CI before the build and writes
`src/data/market.json`:

- **IDX** (IHSG, BBCA, BBRI, TLKM) from Yahoo Finance — server-side only, because Yahoo
  sends no CORS headers. Delayed ~15 minutes, refreshed hourly during market hours by the
  workflow's `schedule` trigger.
- **Crypto** (BTC, ETH, SOL) from CoinGecko — also refreshed in the browser on page load
  via `useLiveCrypto`, since CoinGecko does send `access-control-allow-origin: *`.

The script never fails the build: if a source is unreachable the previous value is kept and
flagged `stale`. The UI carries a "per HH:MM WIB" timestamp rather than pretending the
numbers are instant.

> GitHub disables scheduled workflows after 60 days without repo activity — if quotes go
> stale, that's the first thing to check.

### Still to replace

- **Founder bios** — names and photos are real (supplied by Genesis); the bios are
  filler copy.
- **Instagram grid** — `instagramPosts` in `site.ts` is curated by hand, split into
  Top Reels and Top Feed. Pulling posts automatically needs the Graph API plus a token
  that expires every ~60 days, and Instagram CDN image URLs are signed and expire on
  their own — so images are downloaded, not hotlinked. Only the two reels deep-link so
  far; the rest fall back to the profile until public permalinks are supplied.
- **Instagram stats** — the four figures in `audienceStats` are typed in by hand from
  Instagram Insights, same reasoning.
- **Inquiry form** — posts nowhere; it shows a "not connected yet" state and points at the
  partnership email.
- **Per-series posting cadence** — deliberately absent. The deck states only "7 Content /
  Week" in total, so `format` describes the medium only. Don't add a frequency back
  without a real number.

---

## Moving to Payload

The data layer was built for this. Every read in the app goes through `src/data/index.ts`
— no component imports an array directly.

1. The interfaces in `src/data/types.ts` (`Article`, `ResearchReport`, `Category`,
   `Series`, `Founder`) are the collection schemas. `Block` is the rich-text block union
   that `Prose.tsx` renders.
2. Replace the bodies of `getArticles`, `getArticle`, `getReports`, `getReport` in
   `src/data/index.ts` with `payload.find({ collection: '...' })` and make them `async`.
3. Add `await` at the ~10 call sites in `src/app/**/page.tsx`. Components are untouched.
4. `generateStaticParams` in the `[slug]` routes becomes an async Payload query.

Because `Prose` switches exhaustively over the `Block` union, adding a block type in
Payload surfaces as a TypeScript error here rather than a blank space on the page.

---

## Notes

- All content is Indonesian; navigation labels stay English (`Home / Artikel / Free
  Research / Partnership / About Us`) to match the brand's existing convention.
- Free Research is currently open — full reports, no email gate. `ResearchReport.pages`
  is already in the schema if a gated PDF download is added later.
- All four are listed as **Co-Founder** with equal standing; there is no single "Founder".
- Every page carries the disclaimer that content is educational and not investment advice.
- Scroll reveals, the marquee, and the live dot all respect `prefers-reduced-motion`.

---

## Deploying

Currently on GitHub Pages (`.github/workflows/deploy-pages.yml`, hourly cron during IDX
hours). Vercel needs no code changes — all Pages-specific config is gated behind
`DEPLOY_TARGET=github-pages`, and `vercel.json` carries the build command. Import the repo
in Vercel and deploy; see [CLAUDE.md](CLAUDE.md) §8b for the quote-freshness caveat.

---

A fuller handoff — business context, decisions and their reasons, hosting notes, and
open items — lives in [CLAUDE.md](CLAUDE.md).
