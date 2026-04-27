# Ham Group of Companies

A bespoke web presence and investor pitch deck for the Ham Group of Companies (Uganda) — built as a working proposal to replace [hamzgroup.com](https://hamzgroup.com). Editorial black-and-white minimalism, 20 subsidiary detail pages, a 27-slide scroll-driven pitch deck, and a Sanity-backed content system editable by non-developers.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **TailwindCSS 3** for styling, **Framer Motion** for scroll-in animations
- **Sanity** as the headless CMS
- Statically pre-rendered (29 pages), ISR with 60s revalidation

## Routes

| Path | What's there |
| --- | --- |
| `/` | Marketing landing — hero, group stats, **7 featured companies**, leadership, footprint, milestones, contact |
| `/companies` | Full index of all 20 subsidiaries |
| `/companies/[slug]` | Per-subsidiary detail — hero image, long copy, gallery, related companies |
| `/pitch` | 27-slide scroll-snapped investor deck (keyboard nav, dot indicator) |
| `/pitch/pdf` | Print-optimised version of the deck — `Save as PDF` from any browser |
| `/audit` | Side-by-side audit of hamzgroup.com vs. this build |
| `/for-ham-kiggundu` | Bespoke landing for the CEO with a personal letter and Loom slot (`noindex`) |

## Setup

```bash
npm install
npm run dev          # http://localhost:3000
```

Available scripts:

```bash
npm run build        # production build
npm run start        # serve production build
npm run lint         # next lint
npm run typecheck    # tsc --noEmit
```

If `next dev` or `next build` reports `Cannot find module './vendor-chunks/motion-dom.js'` after a major edit (e.g. font swap, framer-motion update), clear the cache: `rm -rf .next && npm run build`.

## Environment

Copy `.env.example` to `.env.local` and fill in the Sanity project ID, dataset, API version, and read token. Values are not committed — get them from the project owner or the Sanity dashboard.

## Editing content

There is **no embedded Sanity Studio** in this repo. Content is edited via:

- A separately-hosted Sanity Studio: run `npx sanity init` in a sibling folder (use the project ID and dataset from `.env.local`), then `sanity dev` to run locally or `sanity deploy` for a hosted Studio at `<name>.sanity.studio`.
- The Sanity Manage dashboard at <https://www.sanity.io/manage>.
- The Sanity MCP tools when working alongside an AI agent.

**Schemas:** `siteSettings` (singleton), `company`, `leader`, `milestone`, `pitchSlide`, `stat`. Schemas live in the cloud and are deployed via Sanity's `deploy_schema` API rather than from local Studio files.

**Images:** stored in `public/images/` (29 photos scraped from the existing hamzgroup.com). Reference them in Sanity by path — e.g. `imageUrl: "/images/hamz-stadium.jpg"`. External URLs (`https://...`) also work and are routed through `next/image`'s remote-pattern allowlist (`hamzgroup.com`, `cdn.sanity.io`).

After any edit in Sanity, **publish** the draft for it to appear on the live site. CDN propagation takes up to ~60s.

## Customisation before sending the link

Three places to update before pitching to a client:

1. **`src/components/SiteFooter.tsx`** — the `DESIGNER` constant (name, email, WhatsApp).
2. **`src/app/page.tsx`** — the "Designed & built by" line in the home footer bar.
3. **`src/app/for-ham-kiggundu/page.tsx`** — the `LOOM_EMBED_URL` and `BRIEFING_DATE` constants, plus the salutation/signature in the letter copy.

## Architecture

```
src/
├── app/                    # App Router routes
│   ├── companies/          # /companies + /companies/[slug]
│   ├── pitch/              # /pitch + /pitch/pdf
│   ├── audit/
│   ├── for-ham-kiggundu/
│   ├── layout.tsx          # fonts (Inter + Instrument Serif), metadata
│   ├── globals.css         # design tokens & utilities (.hero-title, .hairline, .photo)
│   └── page.tsx            # /
├── components/             # shared UI
│   ├── PitchDeck.tsx       # client — scroll snap + keyboard nav + counter
│   ├── PitchSlideView.tsx  # client — per-slide motion-in-view rendering
│   ├── Reveal.tsx          # client — wraps content in a scroll-in fade
│   ├── Photo.tsx           # next/image wrapper (always use this, never <img>)
│   ├── CompanyCard.tsx     # default + large + wide variants
│   └── …
├── sanity/
│   ├── client.ts           # @sanity/client — useCdn: true, perspective: published
│   ├── queries.ts          # all GROQ queries (revalidate: 60)
│   └── types.ts            # TypeScript shapes for each schema
public/images/              # local imagery referenced from Sanity docs
```

Server components by default; client components limited to scroll/keyboard interactivity and motion-in-view. Custom Tailwind tokens live in `tailwind.config.ts` (`ink` / `paper` / `ash`, `tracking-wider2`, `tracking-tightest`, `text-8xl..10xl`, `ease-out-expo`).

## Deployment

The site is a standard Next.js app — deploy to Vercel with one command:

```bash
npx vercel --prod
```

Set the Sanity environment variables in the Vercel project settings (the same ones in `.env.example`). Add the deployed origin to Sanity CORS via `npx sanity cors add https://your-domain.com`.

## Credits

Site design and build: **Kasoma Ibrahim** · [kasomaibrahim@gmail.com](mailto:kasomaibrahim@gmail.com)

Content sources: [hamzgroup.com](https://hamzgroup.com), [Hamis Kiggundu — Wikipedia](https://en.wikipedia.org/wiki/Hamis_Kiggundu), [Ham Group — Wikipedia](https://en.wikipedia.org/wiki/Ham_Group), [Billionaires Africa](https://www.billionaires.africa/2023/08/14/7-companies-owned-by-ugandan-multi-millionaire-ham-kiggundu/).

# ham-group-of-companies
