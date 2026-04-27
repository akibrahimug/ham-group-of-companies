import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteSettings } from "@/sanity/queries";

export const revalidate = 60;

// TODO: paste your real Loom (or YouTube unlisted) embed URL here
const LOOM_EMBED_URL = ""; // e.g. "https://www.loom.com/embed/<id>"

const BRIEFING_DATE = "April 2026";

export const metadata: Metadata = {
  title: "For Dr. Hamis Kiggundu — Ham Group of Companies",
  description:
    "A personal briefing and proposal for the Ham Group executive team.",
  robots: { index: false, follow: false },
};

export default async function ForHamKiggunduPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Nav groupName="Ham Group" />

      <main>
        {/* Hero */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
            <Reveal>
              <SectionLabel
                index="PB"
                label={`Personal briefing · ${BRIEFING_DATE}`}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="hero-title mt-10 text-display text-6xl leading-[0.9] tracking-tightest md:text-9xl lg:text-10xl">
                For Dr. Hamis
                <br />
                <span className="italic">Kiggundu.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-12 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
                A working proposal for a purpose-built online presence — ready
                to replace hamzgroup.com. Every page on this site was built
                for you.
              </p>
            </Reveal>
          </div>
        </section>

        {/* The letter */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="01" label="A short letter" />
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-5">
                <Reveal>
                  <div className="space-y-6 text-lg leading-relaxed md:text-xl">
                    <p>Dr. Kiggundu,</p>
                    <p>
                      Over the past week I audited hamzgroup.com, scraped its
                      content into a modern content system, and rebuilt every
                      page of your web presence from scratch. You&apos;re
                      looking at the result.
                    </p>
                    <p>
                      What you have today is a WordPress site that struggles
                      on mobile and cannot be updated without a developer.
                      What you deserve — as the founder of East
                      Africa&apos;s largest privately held industrial
                      conglomerate — is a web presence that reads with the
                      same precision as the buildings you&apos;ve built.
                    </p>
                    <p>
                      This proposal is a working build, not a mock-up. Every
                      company, every number, every leader profile on this
                      site is driven by a content system your team can edit
                      in five minutes. An investor-grade pitch deck lives at{" "}
                      <Link
                        href="/pitch"
                        className="underline underline-offset-4"
                      >
                        /pitch
                      </Link>
                      , exportable as a PDF. A side-by-side audit of your
                      current site sits at{" "}
                      <Link
                        href="/audit"
                        className="underline underline-offset-4"
                      >
                        /audit
                      </Link>
                      .
                    </p>
                    <p>
                      I built this for you. I&apos;d like to finish it with
                      you.
                    </p>
                    <p className="pt-6 text-display text-3xl italic tracking-tightest md:text-4xl">
                      — Kasoma Ibrahim
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Loom walkthrough */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="02" label="A three-minute tour" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-4xl leading-[0.95] tracking-tightest md:text-6xl">
                    A short walk through every section.
                  </h2>
                </Reveal>
              </div>
            </div>
            <Reveal delay={0.1}>
              <div className="mt-16 aspect-video w-full overflow-hidden border hairline bg-ink">
                {LOOM_EMBED_URL ? (
                  <iframe
                    src={LOOM_EMBED_URL}
                    allow="fullscreen"
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-paper">
                    <span className="text-[11px] uppercase tracking-wider2 opacity-60">
                      Walkthrough
                    </span>
                    <p className="text-display text-2xl tracking-tightest md:text-4xl">
                      Loom embed goes here
                    </p>
                    <p className="max-w-sm text-center text-xs opacity-60">
                      Paste your Loom URL into
                      <code className="mx-1 opacity-90">LOOM_EMBED_URL</code>
                      at the top of this page.
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Three quick links */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
            <Reveal>
              <SectionLabel index="03" label="Three things to look at" />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-10">
              {[
                {
                  href: "/",
                  label: "The proposed site",
                  meta: "Public landing · home.tsx",
                  desc: "A living replacement for hamzgroup.com, rendered from Sanity content.",
                },
                {
                  href: "/audit",
                  label: "The audit",
                  meta: "Before / after · /audit",
                  desc: "A side-by-side of the current site and the proposed build, with metrics.",
                },
                {
                  href: "/pitch",
                  label: "The pitch deck",
                  meta: "27 slides · /pitch",
                  desc: "Scroll or keyboard-navigate an investor-grade deck of the full group.",
                },
              ].map((link, i) => (
                <Reveal key={link.href} delay={i * 0.06}>
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col justify-between border-t hairline px-6 py-6 transition-colors duration-500 hover:bg-ink hover:text-paper"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-wider2 opacity-50">
                        {link.meta}
                      </p>
                      <h3 className="mt-4 text-display text-3xl tracking-tightest md:text-5xl">
                        {link.label}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed opacity-80">
                        {link.desc}
                      </p>
                    </div>
                    <span className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider2">
                      Open
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter groupAddress={settings?.address} />
    </>
  );
}
