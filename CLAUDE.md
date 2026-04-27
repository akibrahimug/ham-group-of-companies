# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A bespoke marketing site + investor pitch deck for the **Ham Group of Companies** (Ugandan conglomerate). It is a *proposal artefact* — built to convince Ham Group to commission it as their actual web presence, replacing hamzgroup.com. Tone, copy and design decisions reflect that goal: editorial, B&W minimalist, content-rich, content-managed.

## Commands

```bash
npm run dev        # next dev — localhost:3000
npm run build      # next build — produces 29+ static/SSG pages
npm run start      # next start (after build)
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```

There are no tests — verification is `typecheck` + `build` + a curl/manual probe. After significant edits (especially anything touching `framer-motion` or font config), Next can leave a stale `.next/` cache that produces `Cannot find module './vendor-chunks/motion-dom.js'` or `PageNotFoundError`. **Fix:** `rm -rf .next && npm run build`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing — hero, stats, **7 featured companies**, leadership, footprint, milestones, contact |
| `/companies` | Index of all 20 subsidiaries as linked rows |
| `/companies/[slug]` | 20 SSG detail pages — hero, long copy, gallery, related |
| `/pitch` | Scroll-snapped 27-slide pitch deck (client, keyboard-nav, dot indicator) |
| `/pitch/pdf` | Print-optimised version of the deck — `window.print()` produces a PDF |
| `/audit` | Side-by-side audit of hamzgroup.com vs. this build |
| `/for-ham-kiggundu` | Bespoke landing for the CEO — personal letter + Loom slot. `noindex`. |

## Architecture

### Server-first

Every route is a server component by default and reads content via GROQ queries in `src/sanity/queries.ts`. Client components are isolated and clearly named:

- `PitchDeck.tsx` — scroll-snap container, keyboard nav, slide counter
- `PitchSlideView.tsx` — per-slide render with framer-motion in-view animations
- `PrintPitch.tsx` (under `app/pitch/pdf/`) — print-mode renderer with `@page` styles
- `Reveal.tsx` — `motion.div` wrapper for scroll-in fades
- `Photo.tsx` — `next/image` wrapper that handles local `/images/*` and remote URLs (CDN whitelist in `next.config.ts`)

Always use `<Photo>` for images, never a raw `<img>`. Always wrap content blocks in `<Reveal>` for the staggered scroll-in feel that pervades the site.

### Sanity content layer

- **Project ID:** `2nwnchxj` · **Dataset:** `production` · **Org:** `okC8ENKLs`
- Tokens in `.env.local` (gitignored); shape in `.env.example`.
- Client (`src/sanity/client.ts`) is `useCdn: true, perspective: "published"` — drafts won't appear on the site.
- Schemas live in the cloud (deployed via the Sanity MCP `deploy_schema` tool — there is **no** local Sanity Studio in this repo). Adding/changing schema fields means redeploying the schema declaration, not editing local files.
- Document types: `siteSettings` (singleton-ish), `company`, `leader`, `milestone`, `pitchSlide`, `stat`.
- Image fields (`imageUrl`, `gallery`, `heroImage`) are **strings**, not Sanity image assets — they store paths like `/images/hamz-stadium.jpg` pointing into `public/images/` (29 photos scraped from hamzgroup.com), or any external URL.
- All `sanity.fetch` calls use `{ next: { revalidate: 60 } }` for ISR. CDN propagation after a publish takes up to ~60s.

**When editing content via the Sanity MCP tools:** patches and creates produce drafts (`drafts.<id>`). They must be `publish_documents`'d to appear on the published site. Reference fields fail validation if the target document is still a draft — publish dependencies first.

### Design system (Tailwind extensions)

Custom tokens in `tailwind.config.ts` and globals:

- Palette: `ink` `paper` `ash` `smoke` `iron` (strict B&W with three greys)
- Fonts: `font-display` = Instrument Serif (loaded in `layout.tsx` via `next/font`); `font-sans` = Inter
- Sizes: `text-8xl/9xl/10xl` for hero typography
- Tracking: `tracking-tightest` (-0.045em) for display, `tracking-wider2` (0.18em) for the editorial uppercase labels
- Easing: `ease-out-expo`
- Utilities in `globals.css`: `.text-display`, `.hero-title` (text-stroke for the landing `<h1>` only), `.hairline` (rgba border), `.photo` (transform transition), `.snap-deck`, `.snap-slide`, `.marquee-track`

The card hover pattern site-wide is **fixed padding + colour invert**: `px-N py-N transition-colors duration-500 hover:bg-ink hover:text-paper`. Don't add padding via `hover:px-*` — it will shift layout.

### Routing/file conventions

- Path alias `@/*` → `src/*`
- App Router params are async in Next 15: `({ params }: { params: Promise<{ slug: string }> })` then `const { slug } = await params`
- Detail pages use `generateStaticParams()` from `getAllCompanySlugs()` to SSG every subsidiary
- `revalidate = 60` (or `3600` for static-ish pages like `/audit`) is set per route

## Editing content

Sanity Studio is **not** embedded. Edit content via:

1. The Sanity MCP tools available in this Claude Code session (`patch_document_from_json`, `create_documents_from_json`, `publish_documents`, `query_documents`).
2. A separately-hosted Sanity Studio (`npx sanity init --project 2nwnchxj --dataset production` in a sibling folder).
3. The hosted Sanity Manage dashboard.

After any content mutation, drafts must be published before they appear on `/`. Image content is added by either dropping a file into `public/images/` and putting its path in the doc's `imageUrl`/`gallery`, or by pasting an absolute URL.

## Designer credit

Two places hard-code "Kasoma Ibrahim" + `kasomaibrahim@gmail.com`:

- `src/components/SiteFooter.tsx` — `DESIGNER` constant (also has a `whatsapp` placeholder)
- `src/app/page.tsx` — bottom bar of the home Contact section

The `/for-ham-kiggundu` page also has a `LOOM_EMBED_URL` constant and a `BRIEFING_DATE` constant at the top — both are placeholders to swap before sending the link.

## Conventions to keep

- Strict B&W. Photography is now in colour but the chrome (rules, type, surfaces) stays monochrome — don't introduce a brand colour without a reason.
- No emoji in UI copy.
- No comments narrating what code does — the codebase reads itself. Comments only where intent is non-obvious (e.g., the `.photo` rule's history note).
- Server components first; reach for `"use client"` only for measurable interactivity (scroll snap, keyboard handlers, motion-in-view).
- Featured-company count on the landing is **7** (1 hero large + 1 wide + 2 stacked + 3 across). Changing the count requires updating the layout in `FeaturedCompanies.tsx` to match.
