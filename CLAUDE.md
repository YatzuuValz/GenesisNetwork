@AGENTS.md

# Genesis Network — project handoff

Everything an assistant (or a new teammate) needs to pick this up cold: what the
business is, what exists, how it works, what's real, and what's still fake.

Live: **https://yatzuuvalz.github.io/GenesisNetwork/**
Repo: **https://github.com/YatzuuValz/GenesisNetwork**

---

## 1. The business

**Genesis Network Indonesia** — an independent financial media brand covering
crypto, stocks (saham) and macroeconomics for Indonesian readers aged 18–35.
Social-first and early stage. Instagram is the primary channel; TikTok and
YouTube are also active but secondary.

| | |
| --- | --- |
| Instagram | [@genesisnetwork.id](https://www.instagram.com/genesisnetwork.id/) — primary |
| TikTok | [@genesisnetworkid](https://www.tiktok.com/@genesisnetworkid) |
| YouTube | [@GenesisNetworkID](https://www.youtube.com/@GenesisNetworkID) |
| Base | Jakarta, Indonesia |
| Team | Four co-founders, equal standing |

**Named programmes** (these drive the site's structure, they are not invented):

- **Chain Horizon** — crypto carousels
- **Equity Voyage** — stocks carousels
- **Genesis Unscripted** — street-interview video / reels
- **Genesis Rankings** — a research product (Genesis Crypto Rank), not yet shipped

**Revenue streams** from the brand deck: contract brand partnership, integrated
brand campaign, event media partner, community membership, YouTube AdSense, and
Genesis Rankings. This is why `/partnership` is the most substantial page.

---

## 2. Where the project stands

Built from scratch in this repo. Eight commits, all deployed. Current build ships
**12 static pages**.

| Page | State |
| --- | --- |
| `/` Home | Live — hero, market ticker, Instagram showcase, programmes, founders, partnership |
| `/partnership` | Live — media kit, formats, Tokocrypto case study, targets, inquiry form |
| `/about` | Live — objective, purpose, editorial principles, team |
| `/artikel` | **Coming soon** page (not 404) |
| `/research` | **Coming soon** page (not 404) |
| `/404` | Live |

Artikel and Free Research are **written and complete** (10 articles, 3 research
reports, all in Indonesian) but switched off — Genesis isn't ready to publish
long-form on the web yet. Nothing was deleted.

---

## 3. Stack and how it works

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.** No backend,
no database. Deployed as a fully static export to GitHub Pages.

### Data flow

```
src/data/*.ts  →  src/data/index.ts  →  app/**/page.tsx  →  components
(content)         (the ONLY reader)     (routes)            (presentation)
```

No component imports a content array directly. Every read goes through
`src/data/index.ts`. That indirection is the seam for a future CMS — see §7.

### Feature flags

```ts
// src/data/site.ts
export const features = { artikel: false, research: false } as const;
```

One flag drives everything: nav "Soon" badges, dropdown suppression, footer
columns, home page composition, the routes themselves, and whether detail pages
are prerendered. Flip to `true` and the full section returns.

> `output: export` rejects an empty `generateStaticParams()`, so while a section
> is off its dynamic routes emit one throwaway param (`segera-hadir`) that
> immediately `notFound()`s. No real slug is built.

### Deployment

`.github/workflows/deploy-pages.yml` runs on every push to `main` plus an hourly
cron during IDX market hours. Roughly 45 seconds end to end.

Three things in that workflow exist because of real bugs found during setup:

1. **`DEPLOY_TARGET=github-pages`** — gates `output: export`, `basePath`,
   `trailingSlash` and `images.unoptimized` so they never leak into local dev or
   a future server deploy.
2. **`scripts/flatten-rsc-payloads.mjs`** — the static export nests App Router
   prefetch payloads in directories the client requests dot-flattened. Without
   this every prefetch 404s and each link click degrades to a full page reload.
3. **`configure-pages` with `enablement: true`** — with the Actions source,
   GitHub doesn't provision the Pages site until a deploy succeeds, so the UI
   toggle and the workflow deadlock each other.

Also: `components/ui/Img.tsx` wraps `next/image` to prefix root-relative sources
with the base path. `images.unoptimized` bypasses Next's own prefixing, so
without it every image 404s under `/GenesisNetwork/`.

---

## 4. Market data — what's real

**All displayed prices are real.** This matters: the site previously shipped
invented numbers that were badly wrong (BTC $96,240 vs $78,250 actual; IHSG 7,284
vs 6,518; BBCA Rp9,775 vs Rp6,475). For a finance publication that's the most
expensive kind of placeholder.

Two sources, because of one constraint that dictates the whole design:

| Source | Browser-readable? | Used for |
| --- | --- | --- |
| **CoinGecko** | ✅ sends `access-control-allow-origin: *` | BTC, ETH, SOL |
| **Yahoo Finance** | ❌ no CORS headers at all | IHSG, BBCA, BBRI, TLKM |

So IDX quotes are fetched **server-side at build** by `scripts/fetch-market.mjs`
into `src/data/market.json`, refreshed hourly by cron. Crypto is baked in the
same way *and* refreshed **in the browser** on page load by `useLiveCrypto`.

The hero panel groups them separately (`Saham · IDX` / `Crypto`) because they
update on different clocks, and shows a "per HH:MM WIB" timestamp.

**Rate limiting matters here.** CoinGecko's free endpoint starts returning 429
after roughly three rapid requests from one IP. `useLiveCrypto` therefore uses a
single-flight promise (all components share one request) plus a 60s
sessionStorage cache. Three page reloads cost one API call, not six.

If a source is unreachable the script keeps the previous value and marks it
`stale` — the build never fails, and an old number is labelled rather than passed
off as current.

> Google Finance has no public API (shut down 2012) and scraping it hits the same
> CORS wall plus their ToS. Free IDX data has no better source than Yahoo.

---

## 5. Design system

Everything derives from the `gn.` logo mark.

| Token | Value | Use |
| --- | --- | --- |
| `volt-500` | `#005FF7` | Brand blue, sampled from the logo. Accent only. |
| `volt-400` | `#3D86FF` | Hover and serif-italic accents |
| `ink-950` | `#050507` | Page canvas |
| `bone-*` | greys | Text ramp, `bone-50` brightest |
| `bull` / `bear` | green / red | Market direction only |

**The colour rule:** the site is ~95% monochrome. Blue marks *one* thing per
view — the accent phrase in a headline, an active state, a live dot. When blue is
everywhere it stops meaning anything.

**Type:** Plus Jakarta Sans (display + UI), Instrument Serif italic (the single
editorial flourish, used for the payoff phrase in a headline), JetBrains Mono
(eyebrows, dates, figures).

Utilities in `globals.css`: `.u-display` `.u-accent` `.u-eyebrow` `.u-num`
`.u-panel` `.u-grid-field` `.u-noise` `.u-reveal`.

The brief was explicitly *"premium enough that people can't tell it's AI-made."*
The deliberate moves: asymmetric editorial hero rather than the centred
badge-headline-two-buttons stack; newspaper hierarchy; one typographic flourish;
hairline borders at 7% white; grain and bloom texture; real content instead of
lorem. Avoid the generic tells — purple gradients, three identical icon cards,
vague "empowering your journey" copy.

---

## 6. Content — real vs placeholder

**Real** (from the brand deck and Instagram):

- 14 post artworks, extracted from the deck's .docx and converted to webp
- Article headlines and the three programme names
- Instagram figures: 12,315 views · 2,408 reached · 385 interactions · 739
  profile visits (30-day snapshot, labelled as such)
- KPI targets and audience growth targets
- The four Tokocrypto tokenized-stocks posts, used as the `/partnership` case
  study — which is what they actually were, so they're kept out of the feed
- Founder names and photos, supplied by Genesis
- All market prices (§4)

**Placeholder — do not present as fact:**

- Founder **bios** are filler copy
- Article and research **bodies** were written for the mockup, not by Genesis
- The **inquiry form** posts nowhere; it shows a "not connected" state
- No group team photo yet — the founders default panel renders a 2×2 mosaic of
  the four portraits instead

**Deliberately removed because it was fabricated:** per-series posting cadence.
The deck states only *"7 Content / Week"* in total and never breaks it down, but
the site had claimed "Carousel · 2× seminggu" and "Video · 1× seminggu" as if
sourced. `format` now describes the medium only. **Do not add a cadence back
without a real number from Genesis.**

---

## 7. Moving to a CMS

The data layer was built for this, but note the trade-off discovered late:

**Payload needs a server and a database.** GitHub Pages has neither, so adopting
Payload means leaving free static hosting. If the only requirement is *"the team
can write without touching code"*, a **git-based CMS** (Pages CMS, Tina, Decap)
does that for free and keeps the site on Pages — it commits markdown to the repo
and the push triggers a rebuild. Payload only earns its cost once there are
reader logins, paid membership, or per-user content.

Either way the migration is the same shape:

1. Interfaces in `src/data/types.ts` (`Article`, `ResearchReport`, `Category`,
   `Series`, `Founder`, `InstagramPost`) are the collection schemas. `Block` is
   the rich-text union that `Prose.tsx` renders.
2. Replace the bodies of `getArticles`, `getArticle`, `getReports`, `getReport`
   in `src/data/index.ts` and make them async.
3. Add `await` at ~10 call sites in `src/app/**/page.tsx`. Components untouched.

Because `Prose` switches exhaustively over `Block`, a new block type surfaces as
a TypeScript error rather than a blank space on the page.

**Leads / CRM:** the partnership form can post to Formspree, Tally or a Payload
collection. A static site can absolutely collect leads via a third-party endpoint
— no server needed.

---

## 8. Hosting notes

Currently GitHub Pages: free, no expiry, custom domain + HTTPS supported at no
cost. Its rules prohibit e-commerce and SaaS on the free tier, but a content site
for a business is fine — **more permissive than Vercel Hobby**, which is
explicitly non-commercial.

Two caveats:

- Pages on the free plan requires a **public repo**, so the source is visible.
  Don't keep unpublished drafts here. To hide source: Cloudflare Pages (free,
  private repos, commercial use allowed) or GitHub Pro ($4/mo).
- GitHub **disables scheduled workflows after 60 days without repo activity** —
  first thing to check if quotes go stale.

When a custom domain is added, remove `basePath` from `next.config.ts`; the site
then serves from root instead of `/GenesisNetwork/`.

---

## 9. What can't be automated

Verified by testing, not assumed:

- **Instagram post/reel thumbnails** — a plain request returns a login wall with
  no `og:image`. Automatic fetching needs the Graph API plus a token that expires
  every ~60 days. Instagram CDN image URLs are signed and expire in hours, so
  hotlinking breaks by itself. Images must be downloaded and committed.
- **Instagram stats** — same API and token. Four numbers that change monthly are
  typed by hand in `audienceStats`.
- **LinkedIn names and photos** — a plain request 301s to the auth wall.

---

## 10. Open items

1. **Founder bios** — currently filler.
2. **Confirm "Viandi"** — the supplied file is `vian.png` and the LinkedIn slug
   is `viandi`, so it may be two words.
3. **Top Feed permalinks** — the links supplied were
   `instagram.com/insights/media/<id>/`, which are private, login-only Insights
   URLs. Public permalinks (`instagram.com/p/XXXX/`) are needed. Only the two
   reels currently deep-link.
4. **Confirm reel mapping** — `DcEF83HBP5F` is currently mapped to the Ferry
   Irwandi reel; `DcJsamQTVvE` to "beneran kaya" (confirmed).
5. **Group team photo** — set `teamPhoto` in `site.ts` and the mosaic is replaced
   automatically.
6. **Render performance, unresolved** — the site is light in bytes (417 KB home
   page) but carries five `blur(130px)` layers plus a `backdrop-filter` header.
   `filter: blur()` on static elements is a one-time paint cost;
   `backdrop-filter` re-blurs **every scroll frame**. This was measured
   structurally but **never confirmed as actual lag on a real device** — the FPS
   measurement attempt timed out. Deferred by choice, cheap to fix if it bites.
7. **Inquiry form backend.**

---

## 11. Conventions

- Content is **Indonesian**; nav labels stay **English** (`Home / Artikel / Free
  Research / Partnership / About Us`) to match the brand's existing convention.
- Every page carries the disclaimer that content is educational and not
  investment advice. Genesis sells no investment product — that independence is
  the pitch, so keep it visible.
- Scroll reveals, the marquee and the live dot all respect
  `prefers-reduced-motion`.
- Numbers are formatted by hand (`formatPrice`, `formatChange`, `formatFetchedAt`
  in `src/data/index.ts`) rather than `toLocaleString`, so server and client
  output match byte-for-byte and React doesn't report a hydration mismatch.

```bash
npm run dev                                  # localhost:3000
npm run build                                # 12 static pages
DEPLOY_TARGET=github-pages npm run build     # what CI ships
node scripts/fetch-market.mjs                # refresh quotes locally
```
