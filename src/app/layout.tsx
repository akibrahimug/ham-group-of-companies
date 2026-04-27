import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ham Group of Companies — A Ugandan Industrial Conglomerate",
  description:
    "A Ugandan-based multinational conglomerate operating across real estate, agro-processing, education, technology, logistics, sports and finance.",
  openGraph: {
    title: "Ham Group of Companies",
    description:
      "A Ugandan-based multinational conglomerate, founded by Dr. Hamis Kiggundu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
