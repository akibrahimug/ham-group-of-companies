# Ham Group of Companies

A unique, minimalist web presence and pitch deck for the Ham Group of Companies (Uganda), built on Next.js 15, TypeScript, TailwindCSS, and Sanity CMS.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 3
- **CMS:** Sanity
- **Motion:** Framer Motion

## Routes

- `/` — marketing site: hero, group overview, subsidiaries, leadership, footprint, milestones, contact.
- `/pitch` — scroll-snapped pitch deck, suitable for investor presentations.

## Setup

```bash
npm install
npm run dev
```

Visit <http://localhost:3000> and <http://localhost:3000/pitch>.

## Editing content

Content is managed in Sanity. The repo does not embed Studio — content is edited via:

- Sanity's hosted Studio (create one via the CLI if needed), or
- Sanity MCP tools / the Sanity Dashboard.

Schemas: `siteSettings` (singleton), `company`, `leader`, `milestone`, `pitchSlide`, `stat`.

## Environment

See `.env.example`. `SANITY_API_READ_TOKEN` grants read access to drafts for previews.
# ham-group-of-companies
