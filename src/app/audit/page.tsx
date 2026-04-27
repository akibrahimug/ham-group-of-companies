import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteSettings } from "@/sanity/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Audit — hamzgroup.com vs. the proposed site",
  description:
    "A side-by-side audit of the existing hamzgroup.com and the proposed replacement — what breaks today, what changes.",
};

type CompareRow = {
  topic: string;
  current: string;
  proposed: string;
};

const ROWS: CompareRow[] = [
  {
    topic: "Navigation",
    current:
      "14+ scattered menu entries spanning subsidiaries, galleries, external apps and policy pages — difficult to scan.",
    proposed:
      "5 focused anchors (Group · Companies · Leadership · Footprint · Contact) plus a pitch-deck CTA.",
  },
  {
    topic: "Content model",
    current:
      "Hardcoded WordPress pages. Every edit needs a developer or a plugin dashboard few employees will use.",
    proposed:
      "Structured Sanity CMS with typed schemas (Company, Leader, Milestone, Site Settings) — your team edits copy in a single pane.",
  },
  {
    topic: "Mobile layout",
    current:
      "Tables and nested menus overflow the viewport on iPhone. Images do not resize. Type stays desktop-sized.",
    proposed:
      "Fluid responsive across every breakpoint — 1-col → 2-col → 4-col, typography scales, no horizontal scroll.",
  },
  {
    topic: "Page weight / performance",
    current:
      "Heavy WordPress theme with unbounded plugin scripts, multiple auto-playing assets, unoptimised images.",
    proposed:
      "Next.js 15, statically pre-rendered pages, grayscale-tuned imagery through next/image — ~149 kB first-load JS.",
  },
  {
    topic: "Typography & brand",
    current:
      "Three or four competing typefaces, inconsistent weights, decorative flourishes that clash with the gravitas of a $1.5B conglomerate.",
    proposed:
      "A single display serif + Inter body pair, strict B&W palette, editorial rhythm modelled on the best investor memos.",
  },
  {
    topic: "Pitch artefact",
    current:
      "No investor-facing material. Executives have to hand-compile slides each time they meet a partner.",
    proposed:
      "A 27-slide scroll-driven pitch at /pitch, keyboard- and touch-navigable, exportable as a PDF.",
  },
  {
    topic: "Leadership presence",
    current:
      "Thumbnail grid with minimal context, treated identically for the founder and the operations team.",
    proposed:
      "Dr. Kiggundu anchors the section as a full-width editorial feature; the team grid sits beneath as a distinct rhythm.",
  },
  {
    topic: "Per-company depth",
    current:
      "Every subsidiary links out to a barebones WordPress page with a logo and a paragraph.",
    proposed:
      "20 per-company detail pages with hero imagery, highlight stats, galleries and related-subsidiary navigation.",
  },
];

const METRICS = [
  { value: "149 kB", label: "First-load JS" },
  { value: "26", label: "Static pages prerendered" },
  { value: "20", label: "Company detail pages" },
  { value: "~0.6s", label: "Largest contentful paint *" },
];

export default async function AuditPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Nav groupName="Ham Group" />

      <main>
        {/* Hero */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
            <Reveal>
              <SectionLabel index="A" label="Audit · hamzgroup.com" />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-10 text-display text-5xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
                What the existing site does,
                <br />
                <span className="italic opacity-80">
                  and where it falls short.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-12 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
                A point-by-point comparison of the live hamzgroup.com and the
                proposed replacement you&apos;re currently browsing. No
                opinions — just what changes.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Metrics strip */}
        <section className="border-b hairline">
          <div className="grid grid-cols-2 divide-x divide-y divide-black/10 border-b hairline md:grid-cols-4 md:divide-y-0">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05}>
                <div className="flex flex-col gap-3 px-6 py-12 md:px-10">
                  <span className="text-display text-5xl tracking-tightest md:text-7xl">
                    {m.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider2 opacity-60">
                    {m.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto max-w-[1440px] px-6 py-6 text-[11px] uppercase tracking-wider2 opacity-50 md:px-10">
            * Measured on the proposed build. Run Lighthouse on the live URL
            to confirm.
          </div>
        </section>

        {/* Comparison rows */}
        <section>
          <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="01" label="Point by point" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
                    Eight things worth changing.
                  </h2>
                </Reveal>
              </div>
            </div>
          </div>
          <ol className="mt-16 md:mt-24">
            {ROWS.map((row, i) => (
              <li key={row.topic}>
                <Reveal delay={0.04}>
                  <div className="grid grid-cols-12 gap-6 border-t hairline px-6 py-10 md:px-10 md:py-14">
                    <div className="col-span-12 flex items-baseline gap-5 md:col-span-3">
                      <span className="number text-display text-3xl tracking-tightest opacity-60 md:text-4xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-display text-2xl tracking-tightest md:text-3xl">
                        {row.topic}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <p className="text-[10px] uppercase tracking-wider2 opacity-50">
                        Today — hamzgroup.com
                      </p>
                      <p className="mt-3 text-base leading-relaxed opacity-80 line-through decoration-black/25">
                        {row.current}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <p className="text-[10px] uppercase tracking-wider2 opacity-50">
                        Proposed
                      </p>
                      <p className="mt-3 text-base leading-relaxed">
                        {row.proposed}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Summary / CTA */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
            <SectionLabel index="02" label="In one sentence" variant="dark" />
            <Reveal>
              <h2 className="mt-8 text-display text-4xl leading-[0.95] tracking-tightest md:text-7xl">
                The existing site tells you Ham Group exists.
                <br />
                <span className="italic opacity-80">
                  The proposed site tells you why it matters.
                </span>
              </h2>
            </Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[12px] uppercase tracking-wider2 transition-colors hover:bg-paper hover:text-ink"
              >
                See the proposed site <span aria-hidden>→</span>
              </Link>
              <Link
                href="/pitch"
                className="inline-flex items-center gap-3 px-6 py-3 text-[12px] uppercase tracking-wider2 opacity-70 transition-opacity hover:opacity-100"
              >
                Open the pitch deck
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="dark" groupAddress={settings?.address} />
    </>
  );
}
