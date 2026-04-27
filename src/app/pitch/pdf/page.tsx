import type { Metadata } from "next";
import { PrintPitch } from "./PrintPitch";
import {
  getLeaders,
  getMilestones,
  getPitchSlides,
  getSiteSettings,
} from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ham Group — Pitch (print)",
  description:
    "Print-optimised version of the Ham Group pitch deck — use your browser's Save as PDF.",
  robots: { index: false, follow: false },
};

export default async function PitchPdfPage() {
  const [slides, leaders, milestones, settings] = await Promise.all([
    getPitchSlides(),
    getLeaders(),
    getMilestones(),
    getSiteSettings(),
  ]);

  return (
    <PrintPitch
      slides={slides}
      leaders={leaders}
      milestones={milestones}
      settings={settings}
    />
  );
}
