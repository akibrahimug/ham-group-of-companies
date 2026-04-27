"use client";

import Image from "next/image";
import Link from "next/link";
import type {
  Leader,
  Milestone,
  PitchSlide,
  SiteSettings,
} from "@/sanity/types";

type Props = {
  slides: PitchSlide[];
  leaders: Leader[];
  milestones: Milestone[];
  settings: SiteSettings | null;
};

const darkKinds = new Set(["cover", "stat", "quote", "contact", "closing"]);

export function PrintPitch({ slides, leaders, milestones, settings }: Props) {
  return (
    <>
      {/* Toolbar — hidden in print output */}
      <div className="print:hidden sticky top-0 z-50 flex items-center justify-between gap-4 border-b hairline bg-paper px-6 py-4 md:px-10">
        <div className="flex flex-col text-[11px] uppercase tracking-wider2">
          <span className="opacity-60">Ham Group · Investor Pitch</span>
          <span>Print-optimised view</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/pitch"
            className="hidden text-[11px] uppercase tracking-wider2 opacity-70 hover:opacity-100 md:inline"
          >
            ← Back to interactive deck
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 border border-ink px-4 py-2 text-[11px] uppercase tracking-wider2 transition-colors hover:bg-ink hover:text-paper"
          >
            Save as PDF
            <span aria-hidden>↓</span>
          </button>
        </div>
      </div>

      <main className="print-root">
        {slides.map((slide, i) => (
          <PrintSlide
            key={slide._id}
            slide={slide}
            index={i}
            total={slides.length}
            leaders={leaders}
            milestones={milestones}
            settings={settings}
          />
        ))}
      </main>

      <style jsx global>{`
        @page {
          size: A4 landscape;
          margin: 0;
        }
        @media print {
          html,
          body {
            background: #fff !important;
          }
          .print-root {
            padding: 0;
          }
          .print-slide {
            page-break-after: always;
            break-after: page;
            min-height: 100vh;
            height: 100vh;
          }
          .print-slide:last-child {
            page-break-after: auto;
          }
        }
        @media screen {
          .print-slide {
            min-height: 100vh;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </>
  );
}

function PrintSlide({
  slide,
  index,
  total,
  leaders,
  milestones,
  settings,
}: {
  slide: PitchSlide;
  index: number;
  total: number;
  leaders: Leader[];
  milestones: Milestone[];
  settings: SiteSettings | null;
}) {
  const isDark = darkKinds.has(slide.kind);
  const bg = isDark ? "bg-ink text-paper" : "bg-paper text-ink";
  const mute = isDark ? "text-paper/60" : "text-ink/60";
  const rule = isDark ? "bg-paper/40" : "bg-ink/40";

  return (
    <section className={`print-slide relative flex w-full items-center ${bg}`}>
      <div className="mx-auto w-full max-w-[1440px] px-10 py-16 md:px-16 md:py-20">
        <div
          className={`flex items-center gap-4 text-[11px] uppercase tracking-wider2 ${mute}`}
        >
          <span className="number">{String(index + 1).padStart(2, "0")}</span>
          <span className={`h-px w-8 ${rule}`} />
          <span>{slide.eyebrow ?? kindLabel(slide.kind)}</span>
        </div>
        <div className="mt-10">
          <Body
            slide={slide}
            leaders={leaders}
            milestones={milestones}
            settings={settings}
            isDark={isDark}
          />
        </div>
        <div
          className={`pointer-events-none absolute bottom-8 left-10 right-10 flex items-end justify-between text-[10px] uppercase tracking-wider2 md:bottom-10 md:left-16 md:right-16 ${mute}`}
        >
          <span>Ham Group of Companies · Investor Pitch</span>
          <span className="number">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

function kindLabel(kind: PitchSlide["kind"]) {
  switch (kind) {
    case "cover":
      return "Cover";
    case "intro":
      return "Introduction";
    case "stat":
      return "Key Figure";
    case "company":
      return "Subsidiary";
    case "quote":
      return "Founder";
    case "leader":
      return "Leadership";
    case "milestones":
      return "Milestones";
    case "contact":
      return "Contact";
    case "closing":
      return "Closing";
  }
}

function Body({
  slide,
  leaders,
  milestones,
  settings,
  isDark,
}: {
  slide: PitchSlide;
  leaders: Leader[];
  milestones: Milestone[];
  settings: SiteSettings | null;
  isDark: boolean;
}) {
  switch (slide.kind) {
    case "cover":
      return (
        <div>
          <h1 className="text-display text-6xl leading-[0.9] tracking-tightest md:text-[10rem]">
            {slide.heading ?? "Ham Group of Companies"}
          </h1>
          {slide.body ? (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-75">
              {slide.body}
            </p>
          ) : null}
        </div>
      );
    case "intro":
      return (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-display text-4xl leading-[0.95] tracking-tightest md:text-7xl">
              {slide.heading}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="text-lg leading-relaxed opacity-80 md:text-xl">
              {slide.body}
            </p>
          </div>
        </div>
      );
    case "stat":
      return (
        <div className="flex flex-col items-start gap-6 md:items-center md:text-center">
          <span className="text-display text-[14vw] leading-none tracking-tightest">
            {slide.statValue}
          </span>
          <span className="text-[12px] uppercase tracking-wider2 opacity-70">
            {slide.statLabel ?? slide.heading}
          </span>
          {slide.body ? (
            <p className="max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
              {slide.body}
            </p>
          ) : null}
        </div>
      );
    case "company": {
      const c = slide.company;
      return (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-6">
            {c?.imageUrl ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden border hairline">
                <Image
                  src={c.imageUrl}
                  alt={c.name}
                  fill
                  sizes="50vw"
                  className="photo object-cover"
                />
              </div>
            ) : null}
          </div>
          <div className="col-span-12 md:col-span-6">
            <h2 className="text-display text-4xl leading-[0.9] tracking-tightest md:text-7xl">
              {c?.name ?? slide.heading}
            </h2>
            {c?.sector ? (
              <p className="mt-4 text-[11px] uppercase tracking-wider2 opacity-60">
                {c.sector}
              </p>
            ) : null}
            {c?.longDescription || c?.shortDescription ? (
              <p className="mt-8 text-base leading-relaxed opacity-85 md:text-lg">
                {c?.longDescription || c?.shortDescription}
              </p>
            ) : null}
            {c?.highlightStat ? (
              <div
                className={`mt-8 border-t ${
                  isDark ? "border-white/15" : "border-black/10"
                } pt-4`}
              >
                <span className="text-display text-3xl tracking-tightest md:text-4xl">
                  {c.highlightStat}
                </span>
                {c.highlightStatLabel ? (
                  <span className="ml-3 text-[10px] uppercase tracking-wider2 opacity-60">
                    {c.highlightStatLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    case "quote":
      return (
        <div className="max-w-4xl">
          <p className="text-display text-3xl italic leading-[1.1] tracking-tightest md:text-6xl">
            &ldquo;{slide.body}&rdquo;
          </p>
          {slide.heading ? (
            <p className="mt-10 text-[11px] uppercase tracking-wider2 opacity-70">
              — {slide.heading}
            </p>
          ) : null}
        </div>
      );
    case "leader": {
      const leader = leaders[0];
      return (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            {leader?.imageUrl ? (
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden border ${
                  isDark ? "border-white/15" : "border-black/10"
                }`}
              >
                <Image
                  src={leader.imageUrl}
                  alt={leader.name}
                  fill
                  sizes="40vw"
                  className="photo object-cover"
                />
              </div>
            ) : null}
          </div>
          <div className="col-span-12 md:col-span-7">
            {leader?.title ? (
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                {leader.title}
              </p>
            ) : null}
            <h2 className="mt-3 text-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
              {leader?.name ?? slide.heading}
            </h2>
            {leader?.bio ? (
              <p className="mt-6 max-w-xl text-base leading-relaxed opacity-85 md:text-lg">
                {leader.bio}
              </p>
            ) : null}
            {leader?.quote ? (
              <blockquote className="mt-6 border-l-2 border-current pl-5 text-display text-xl italic leading-snug md:text-2xl">
                &ldquo;{leader.quote}&rdquo;
              </blockquote>
            ) : null}
          </div>
        </div>
      );
    }
    case "milestones":
      return (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
              {slide.heading ?? "Milestones"}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ol
              className={`divide-y border-y ${
                isDark
                  ? "divide-white/15 border-white/15"
                  : "divide-black/10 border-black/10"
              }`}
            >
              {milestones.slice(0, 6).map((m) => (
                <li key={m._id} className="grid grid-cols-12 gap-4 py-4">
                  <span className="col-span-3 text-display text-xl tracking-tightest md:text-2xl">
                    {m.year}
                  </span>
                  <span className="col-span-9 text-sm opacity-90 md:text-base">
                    {m.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      );
    case "contact":
      return (
        <div>
          <h2 className="text-display text-5xl leading-[0.9] tracking-tightest md:text-8xl">
            {slide.heading ?? "Let's build."}
          </h2>
          <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                Head Office
              </p>
              <p className="mt-3 text-base leading-relaxed">
                {settings?.address}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                Contact
              </p>
              <p className="mt-3 text-base">{settings?.phone}</p>
              <p className="text-base">{settings?.email}</p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                Reach
              </p>
              <p className="mt-3 text-base leading-relaxed">
                {settings?.countries?.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      );
    case "closing":
      return (
        <div className="flex flex-col gap-8">
          <h2 className="text-display text-5xl italic leading-[0.9] tracking-tightest md:text-[10rem]">
            {slide.heading ?? "Thank you."}
          </h2>
          {slide.body ? (
            <p className="max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
              {slide.body}
            </p>
          ) : null}
        </div>
      );
    default:
      return null;
  }
}
