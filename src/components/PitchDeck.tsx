"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PitchSlideView } from "./PitchSlideView";
import type { Leader, Milestone, PitchSlide, SiteSettings } from "@/sanity/types";

type Props = {
  slides: PitchSlide[];
  leaders: Leader[];
  milestones: Milestone[];
  settings: SiteSettings | null;
};

export function PitchDeck({ slides, leaders, milestones, settings }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = slides.length;

  const goTo = useCallback(
    (i: number) => {
      const container = containerRef.current;
      if (!container) return;
      const clamped = Math.max(0, Math.min(total - 1, i));
      const slide = container.children[clamped] as HTMLElement | undefined;
      if (slide) {
        container.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
      }
    },
    [total]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const i = Math.round(container.scrollTop / container.clientHeight);
      setActiveIndex(i);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(activeIndex + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(activeIndex - 1);
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo, total]);

  const counterTotal = useMemo(() => String(total).padStart(2, "0"), [total]);
  const counterIndex = useMemo(
    () => String(activeIndex + 1).padStart(2, "0"),
    [activeIndex]
  );

  const isDarkSlide = slides[activeIndex]?.kind
    ? ["cover", "stat", "quote", "contact", "closing"].includes(
        slides[activeIndex].kind
      )
    : false;
  const chromeText = isDarkSlide ? "text-paper/80" : "text-ink/70";
  const chromeStroke = isDarkSlide ? "border-white/30" : "border-black/30";

  return (
    <>
      {/* Top-left brand / back link */}
      <div
        className={`pointer-events-none fixed left-6 top-6 z-50 flex items-center gap-4 transition-colors md:left-10 md:top-8 ${chromeText}`}
      >
        <Link
          href="/"
          className={`pointer-events-auto inline-flex items-center gap-2 border ${chromeStroke} px-3 py-1.5 text-[10px] uppercase tracking-wider2 transition-opacity hover:opacity-60`}
        >
          <span aria-hidden>←</span>
          Back
        </Link>
        <span className="text-display text-lg tracking-tightest">
          Ham Group
        </span>
      </div>

      {/* Bottom-right counter + dots */}
      <div
        className={`pointer-events-none fixed bottom-6 right-6 z-50 flex items-center gap-4 transition-colors md:bottom-8 md:right-10 ${chromeText}`}
      >
        <div className="hidden flex-col gap-1.5 md:flex">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`pointer-events-auto h-[2px] w-6 transition-all ${
                i === activeIndex
                  ? isDarkSlide
                    ? "bg-paper"
                    : "bg-ink"
                  : isDarkSlide
                  ? "bg-white/30"
                  : "bg-black/25"
              }`}
            />
          ))}
        </div>
        <span className="number text-[11px] uppercase tracking-wider2">
          {counterIndex} <span className="opacity-50">/ {counterTotal}</span>
        </span>
        <Link
          href="/pitch/pdf"
          className={`pointer-events-auto inline-flex items-center gap-1.5 border ${chromeStroke} px-2 py-1 text-[10px] uppercase tracking-wider2 transition-opacity hover:opacity-60`}
          aria-label="Printable PDF version"
        >
          PDF
          <span aria-hidden>↓</span>
        </Link>
      </div>

      <div
        ref={containerRef}
        className="snap-deck h-screen w-full overflow-y-auto"
        tabIndex={0}
      >
        {slides.map((slide, i) => (
          <PitchSlideView
            key={slide._id}
            slide={slide}
            index={i}
            total={total}
            leaders={leaders}
            milestones={milestones}
            settings={settings}
          />
        ))}
      </div>
    </>
  );
}
