import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { SiteFooter } from "@/components/SiteFooter";
import { getCompanies, getSiteSettings } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Companies — Ham Group of Companies",
  description:
    "The full portfolio of Ham Group subsidiaries, from landmark real estate to agro-processing, education, technology and sport.",
};

export default async function CompaniesIndex() {
  const [companies, settings] = await Promise.all([
    getCompanies(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Nav groupName="Ham Group" />
      <main>
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
            <Reveal>
              <SectionLabel index="01" label="The full portfolio" />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 text-display text-5xl leading-[0.95] tracking-tightest md:text-8xl lg:text-9xl">
                All {companies.length} companies,
                <br />
                <span className="italic opacity-80">one group.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
                {settings?.tagline}
              </p>
            </Reveal>
          </div>
        </section>

        <section>
          <ul>
            {companies.map((company, i) => {
              const slug = company.slug?.current;
              const inner = (
                <article className="photo-frame group grid grid-cols-12 gap-6 border-t hairline px-6 py-8 transition-colors duration-500 md:px-10 md:py-12 hover:bg-ink hover:text-paper">
                  <span className="col-span-12 number text-[10px] uppercase tracking-wider2 opacity-40 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-12 md:col-span-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border hairline bg-ash">
                      {company.imageUrl ? (
                        <Photo
                          src={company.imageUrl}
                          alt={company.name}
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-display text-5xl tracking-tightest opacity-20">
                            {company.name
                              .split(" ")
                              .map((w) => w[0])
                              .slice(0, 2)
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <h2 className="text-display text-4xl tracking-tightest md:text-6xl">
                      {company.name}
                    </h2>
                    {company.sector ? (
                      <p className="mt-3 text-[11px] uppercase tracking-wider2 opacity-60">
                        {company.sector}
                      </p>
                    ) : null}
                    {company.shortDescription ? (
                      <p className="mt-5 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
                        {company.shortDescription}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-12 flex flex-col items-start gap-2 md:col-span-3 md:items-end md:text-right">
                    {company.highlightStat ? (
                      <span className="text-display text-3xl tracking-tightest md:text-4xl">
                        {company.highlightStat}
                      </span>
                    ) : null}
                    {company.highlightStatLabel ? (
                      <span className="text-[10px] uppercase tracking-wider2 opacity-60">
                        {company.highlightStatLabel}
                      </span>
                    ) : null}
                    {company.location ? (
                      <span className="mt-2 text-[10px] uppercase tracking-wider2 opacity-50">
                        {company.location}
                      </span>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-wider2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Explore <span aria-hidden>→</span>
                    </span>
                  </div>
                </article>
              );
              return (
                <li key={company._id}>
                  {slug ? (
                    <Link href={`/companies/${slug}`}>{inner}</Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-t hairline">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-6 py-10 text-[11px] uppercase tracking-wider2 opacity-60 md:flex-row md:items-center md:px-10">
            <Link href="/" className="hover:opacity-100">
              ← Back to overview
            </Link>
            <Link href="/pitch" className="hover:opacity-100">
              View the pitch deck →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter groupAddress={settings?.address} />
    </>
  );
}
