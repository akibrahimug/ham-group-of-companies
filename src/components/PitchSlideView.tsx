"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type {
  Leader,
  Milestone,
  PitchSlide,
  SiteSettings,
} from "@/sanity/types";

type Props = {
  slide: PitchSlide;
  index: number;
  total: number;
  leaders: Leader[];
  milestones: Milestone[];
  settings: SiteSettings | null;
};

const darkKinds = new Set(["cover", "stat", "quote", "contact", "closing"]);

const fadeIn = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.4, once: false },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export function PitchSlideView({
  slide,
  index,
  total,
  leaders,
  milestones,
  settings,
}: Props) {
  const isDark = darkKinds.has(slide.kind);
  const bg = isDark ? "bg-ink text-paper" : "bg-paper text-ink";
  const muted = isDark ? "text-paper/60" : "text-ink/60";
  const rule = isDark ? "bg-paper/40" : "bg-ink/40";

  const eyebrowLine = (
    <div
      className={`flex items-center gap-4 text-[11px] uppercase tracking-wider2 ${muted}`}
    >
      <span className="number">{String(index + 1).padStart(2, "0")}</span>
      <span className={`h-px w-8 ${rule}`} />
      <span>{slide.eyebrow || kindLabel(slide.kind)}</span>
    </div>
  );

  return (
    <section
      className={`snap-slide relative flex min-h-screen w-full items-center ${bg}`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-14 md:py-32">
        <motion.div {...fadeIn}>{eyebrowLine}</motion.div>
        <div className="mt-12 md:mt-16">
          {renderBody({ slide, leaders, milestones, settings, isDark })}
        </div>
        <div
          className={`pointer-events-none absolute bottom-10 left-6 right-6 flex items-end justify-between text-[11px] uppercase tracking-wider2 md:left-14 md:right-14 ${muted}`}
        >
          <span>Ham Group of Companies · Investor Pitch</span>
          <span className="number">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
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

function renderBody({
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
        <motion.div {...fadeIn}>
          <h1 className="text-display text-6xl leading-[0.9] tracking-tightest md:text-9xl lg:text-10xl">
            {slide.heading ?? "Ham Group of Companies"}
          </h1>
          {slide.body ? (
            <p className="mt-10 max-w-xl text-lg leading-relaxed opacity-75 md:text-xl">
              {slide.body}
            </p>
          ) : null}
        </motion.div>
      );

    case "intro":
      return (
        <motion.div {...fadeIn} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
              {slide.heading}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <p className="text-lg leading-relaxed opacity-80 md:text-xl">
              {slide.body}
            </p>
          </div>
        </motion.div>
      );

    case "stat":
      return (
        <motion.div
          {...fadeIn}
          className="flex flex-col items-start gap-8 md:items-center md:text-center"
        >
          <span className="text-display text-[18vw] leading-none tracking-tightest md:text-[22vw]">
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
        </motion.div>
      );

    case "company": {
      const c = slide.company;
      return (
        <motion.div {...fadeIn} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            {c?.imageUrl ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden border hairline">
                <Image
                  src={c.imageUrl}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="photo object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center border hairline">
                <span className="text-display text-[10rem] tracking-tightest opacity-15">
                  {(c?.name ?? slide.heading ?? "")
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-6 md:pl-4">
            <h2 className="text-display text-5xl leading-[0.9] tracking-tightest md:text-7xl lg:text-8xl">
              {c?.name ?? slide.heading}
            </h2>
            {c?.sector ? (
              <p className="mt-6 text-[12px] uppercase tracking-wider2 opacity-60">
                {c.sector}
              </p>
            ) : null}
            {c?.shortDescription || slide.body ? (
              <p className="mt-8 text-base leading-relaxed opacity-85 md:text-lg">
                {c?.longDescription || c?.shortDescription || slide.body}
              </p>
            ) : null}
            {c?.highlightStat ? (
              <div
                className={`mt-10 border-t ${
                  isDark ? "border-white/15" : "border-black/10"
                } pt-6`}
              >
                <span className="text-display text-4xl tracking-tightest md:text-5xl">
                  {c.highlightStat}
                </span>
                {c.highlightStatLabel ? (
                  <span className="ml-4 text-[11px] uppercase tracking-wider2 opacity-60">
                    {c.highlightStatLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
            {c?.location ? (
              <p className="mt-6 text-[12px] uppercase tracking-wider2 opacity-60">
                {c.location}
              </p>
            ) : null}
          </div>
        </motion.div>
      );
    }

    case "quote":
      return (
        <motion.div {...fadeIn} className="max-w-5xl">
          <p className="text-display text-4xl italic leading-[1.05] tracking-tightest md:text-7xl">
            &ldquo;{slide.body}&rdquo;
          </p>
          {slide.heading ? (
            <p className="mt-12 text-[12px] uppercase tracking-wider2 opacity-70">
              — {slide.heading}
            </p>
          ) : null}
        </motion.div>
      );

    case "leader": {
      const leader = leaders[0];
      return (
        <motion.div {...fadeIn} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden border ${
                isDark ? "border-white/15" : "border-black/10"
              }`}
            >
              {leader?.imageUrl ? (
                <Image
                  src={leader.imageUrl}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="photo object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-display text-[10rem] tracking-tightest opacity-20">
                    {leader?.name
                      ?.split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("") ?? "HK"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-6">
            <p className="text-[11px] uppercase tracking-wider2 opacity-60">
              {leader?.title ?? slide.eyebrow}
            </p>
            <h2 className="mt-4 text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
              {leader?.name ?? slide.heading}
            </h2>
            {leader?.bio || slide.body ? (
              <p className="mt-8 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
                {leader?.bio ?? slide.body}
              </p>
            ) : null}
            {leader?.quote ? (
              <blockquote className="mt-8 border-l-2 border-current pl-5 text-display text-2xl italic leading-snug opacity-90 md:text-3xl">
                &ldquo;{leader.quote}&rdquo;
              </blockquote>
            ) : null}
          </div>
        </motion.div>
      );
    }

    case "milestones":
      return (
        <motion.div {...fadeIn} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
              {slide.heading ?? "Milestones"}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ol
              className={`divide-y border-y ${
                isDark ? "divide-white/15 border-white/15" : "divide-black/10 border-black/10"
              }`}
            >
              {milestones.slice(0, 6).map((m) => (
                <li key={m._id} className="grid grid-cols-12 gap-4 py-5">
                  <span className="col-span-3 text-display text-2xl tracking-tightest md:text-3xl">
                    {m.year}
                  </span>
                  <span className="col-span-9 text-base opacity-90 md:text-lg">
                    {m.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      );

    case "contact":
      return (
        <motion.div {...fadeIn}>
          <h2 className="text-display text-6xl leading-[0.9] tracking-tightest md:text-9xl">
            {slide.heading ?? "Let's build."}
          </h2>
          <div className="mt-16 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                Head Office
              </p>
              <p className="mt-3 text-lg leading-relaxed">
                {settings?.address}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                Contact
              </p>
              <p className="mt-3 text-lg">{settings?.phone}</p>
              <p className="text-lg">{settings?.email}</p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-wider2 opacity-60">
                Reach
              </p>
              <p className="mt-3 text-lg leading-relaxed">
                {settings?.countries?.join(" · ")}
              </p>
            </div>
          </div>
        </motion.div>
      );

    case "closing":
      return (
        <motion.div {...fadeIn} className="flex flex-col gap-10">
          <h2 className="text-display text-6xl italic leading-[0.9] tracking-tightest md:text-10xl">
            {slide.heading ?? "Thank you."}
          </h2>
          {slide.body ? (
            <p className="max-w-xl text-lg leading-relaxed opacity-75 md:text-xl">
              {slide.body}
            </p>
          ) : null}
        </motion.div>
      );

    default:
      return null;
  }
}
