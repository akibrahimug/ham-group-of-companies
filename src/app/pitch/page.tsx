import { PitchDeck } from "@/components/PitchDeck";
import {
  getLeaders,
  getMilestones,
  getPitchSlides,
  getSiteSettings,
} from "@/sanity/queries";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ham Group — Investor Pitch",
  description:
    "A full-screen, scroll-driven investor pitch deck for the Ham Group of Companies.",
};

export default async function PitchPage() {
  const [slides, leaders, milestones, settings] = await Promise.all([
    getPitchSlides(),
    getLeaders(),
    getMilestones(),
    getSiteSettings(),
  ]);

  if (!slides.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper text-ink">
        <div className="max-w-xl px-6 text-center">
          <p className="text-[11px] uppercase tracking-wider2 opacity-60">
            Pitch deck
          </p>
          <h1 className="mt-6 text-display text-5xl tracking-tightest md:text-7xl">
            Deck is being prepared.
          </h1>
          <p className="mt-6 text-base leading-relaxed opacity-75">
            Publish pitch slides in Sanity and they will appear here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <PitchDeck
      slides={slides}
      leaders={leaders}
      milestones={milestones}
      settings={settings}
    />
  );
}
