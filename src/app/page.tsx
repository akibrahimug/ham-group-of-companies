import { Nav } from "@/components/Nav";
import { SectionLabel } from "@/components/SectionLabel";
import { Marquee } from "@/components/Marquee";
import { StatGrid } from "@/components/StatGrid";
import { FeaturedCompanies } from "@/components/FeaturedCompanies";
import { LeaderBlock } from "@/components/LeaderBlock";
import { LeaderGrid } from "@/components/LeaderGrid";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import {
  getCompanies,
  getLeaders,
  getMilestones,
  getSiteSettings,
} from "@/sanity/queries";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, companies, leaders, milestones] = await Promise.all([
    getSiteSettings(),
    getCompanies(),
    getLeaders(),
    getMilestones(),
  ]);

  const groupName = settings?.groupName ?? "Ham Group of Companies";
  const tagline = settings?.tagline;
  const heroQuote = settings?.heroQuote;
  const yearFounded = settings?.yearFounded;
  const countries = settings?.countries ?? [];
  const heroImage = settings?.heroImage;

  const stats = [
    { value: settings?.employeesCount, label: "Employees" },
    { value: settings?.subsidiariesCount, label: "Companies" },
    { value: settings?.countriesCount, label: "Countries" },
    { value: settings?.assetsDisplay, label: "Assets" },
  ];

  const [principalLeader, ...otherLeaders] = leaders;

  const FEATURED_LIMIT = 7;
  const featuredCompanies = companies
    .filter((c) => c.featured)
    .slice(0, FEATURED_LIMIT);
  const landingCompanies = featuredCompanies.length
    ? featuredCompanies
    : companies.slice(0, FEATURED_LIMIT);

  return (
    <>
      <Nav groupName="Ham Group" />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
            <Reveal>
              <SectionLabel index="01" label="Established in Uganda" />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="hero-title mt-10 text-display text-6xl leading-[0.95] tracking-tightest md:text-9xl lg:text-10xl">
                {groupName.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>
            </Reveal>
            <div className="mt-16 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-5 md:col-start-8">
                <Reveal delay={0.2}>
                  {tagline ? (
                    <p className="text-lg leading-relaxed md:text-xl">
                      {tagline}
                    </p>
                  ) : null}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/pitch"
                      className="inline-flex items-center gap-3 border border-ink px-6 py-3 text-[12px] uppercase tracking-wider2 transition-colors hover:bg-ink hover:text-paper"
                    >
                      View the pitch deck
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="#companies"
                      className="inline-flex items-center gap-3 px-6 py-3 text-[12px] uppercase tracking-wider2 opacity-70 transition-opacity hover:opacity-100"
                    >
                      Our companies
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Hero bottom bar */}
          <div className="flex items-center justify-between border-t hairline px-6 py-6 text-[11px] uppercase tracking-wider2 md:px-10">
            <span className="opacity-60">
              Founded {yearFounded ?? "2005"} · Kampala, Uganda
            </span>
            <span className="hidden items-center gap-2 opacity-60 md:flex">
              <span className="h-[1px] w-6 bg-ink/40" />
              Scroll to explore
            </span>
          </div>
        </section>

        {/* Hero photograph — cinematic B&W */}
        {heroImage ? (
          <section className="relative border-b hairline">
            <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
              <Photo
                src={heroImage}
                alt={`${groupName} flagship development`}
                sizes="100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              <div className="absolute bottom-6 left-6 right-6 text-paper md:bottom-10 md:left-10 md:right-10">
                <p className="text-[11px] uppercase tracking-wider2 opacity-70">
                  Pictured — Hamz Stadium, Kampala
                </p>
                <p className="mt-3 max-w-2xl text-display text-2xl leading-snug tracking-tightest md:text-4xl">
                  Twenty years of compounding. A system, not a single company.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {/* Group at a glance */}
        <section id="group" className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="02" label="Group at a glance" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
                    A privately owned multinational conglomerate, built from
                    Kampala.
                  </h2>
                </Reveal>
                {heroQuote ? (
                  <Reveal delay={0.1}>
                    <p className="mt-10 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
                      {heroQuote}
                    </p>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-20 md:mt-28">
            <StatGrid stats={stats} />
          </div>
        </section>

        {/* Companies */}
        <section id="companies" className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="03" label="Our companies" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
                    <span>One group.</span>
                    <br />
                    <span className="italic">Many industries.</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-80">
                    From landmark real estate to agro-processing, education,
                    technology and sport — each subsidiary is a vertical in a
                    single, vertically integrated industrial system.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="mt-20 md:mt-28">
            {landingCompanies.length ? (
              <FeaturedCompanies
                companies={landingCompanies}
                totalCount={companies.length}
              />
            ) : (
              <p className="px-6 py-24 text-center text-[12px] uppercase tracking-wider2 opacity-60 md:px-10">
                Companies will appear here once published in Sanity.
              </p>
            )}
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="04" label="Leadership" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
                    Led by conviction.
                  </h2>
                </Reveal>
              </div>
            </div>
            <div className="mt-16">
              {principalLeader ? (
                <LeaderBlock leader={principalLeader} />
              ) : null}
              {otherLeaders.length ? (
                <div className="mt-20 md:mt-28">
                  <LeaderGrid leaders={otherLeaders} />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Footprint */}
        <section id="footprint" className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="05" label="Footprint" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
                    Rooted in Uganda.
                    <br />
                    <span className="italic opacity-70">
                      Reaching six continents of commerce.
                    </span>
                  </h2>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="mt-20 md:mt-28">
            <Marquee items={countries} />
          </div>
          <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6">
                <p className="text-display text-3xl leading-snug tracking-tightest md:text-5xl">
                  Headquartered in Kampala, with operations across Uganda and
                  international offices in five countries.
                </p>
              </div>
              <div className="col-span-12 md:col-span-6">
                <ul className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
                  {countries.map((c) => (
                    <li
                      key={c}
                      className="border-t hairline pt-3 text-[13px] uppercase tracking-wider2"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="06" label="Milestones" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <Reveal>
                  <h2 className="text-display text-5xl leading-[0.95] tracking-tightest md:text-7xl">
                    Two decades of building.
                  </h2>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-24">
            <ol className="divide-y hairline border-y hairline">
              {milestones.map((m) => (
                <li
                  key={m._id}
                  className="grid grid-cols-12 gap-6 py-8 md:py-10"
                >
                  <span className="col-span-4 text-display text-3xl tracking-tightest md:col-span-2 md:text-5xl">
                    {m.year}
                  </span>
                  <h3 className="col-span-8 text-xl font-medium md:col-span-4 md:text-2xl">
                    {m.title}
                  </h3>
                  <p className="col-span-12 text-base leading-relaxed opacity-75 md:col-span-6 md:text-lg">
                    {m.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
            <SectionLabel index="07" label="Contact" variant="dark" />
            <Reveal>
              <h2 className="mt-10 text-display text-6xl leading-[0.95] tracking-tightest md:text-9xl">
                Let&apos;s build.
              </h2>
            </Reveal>
            <div className="mt-16 grid grid-cols-12 gap-6 border-t border-white/15 pt-12">
              <div className="col-span-12 md:col-span-4">
                <p className="text-[11px] uppercase tracking-wider2 text-paper/60">
                  Head Office
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  {settings?.address}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p className="text-[11px] uppercase tracking-wider2 text-paper/60">
                  Contact
                </p>
                <p className="mt-4 text-lg">{settings?.phone}</p>
                <p className="mt-1 text-lg">{settings?.email}</p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <p className="text-[11px] uppercase tracking-wider2 text-paper/60">
                  Investor Relations
                </p>
                <p className="mt-4 text-lg leading-relaxed">
                  For partnership and investment inquiries, request the full
                  pitch deck.
                </p>
                <Link
                  href="/pitch"
                  className="mt-6 inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-[12px] uppercase tracking-wider2 transition-colors hover:bg-paper hover:text-ink"
                >
                  Open pitch <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/15">
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 px-6 py-8 text-[11px] uppercase tracking-wider2 text-paper/60 md:grid-cols-3 md:px-10">
              <span>
                © {new Date().getFullYear()} Ham Group of Companies
              </span>
              <span className="md:text-center">
                Designed & built by{" "}
                <a
                  href="mailto:kasomaibrahim@gmail.com"
                  className="underline underline-offset-4 hover:text-paper"
                >
                  Kasoma Ibrahim
                </a>
              </span>
              <span className="md:text-right">Kampala · Uganda</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
