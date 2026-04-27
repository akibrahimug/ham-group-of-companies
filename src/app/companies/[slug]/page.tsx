import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Photo } from "@/components/Photo";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getAllCompanySlugs,
  getCompanyBySlug,
  getRelatedCompanies,
  getSiteSettings,
} from "@/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCompanySlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: "Not found" };
  return {
    title: `${company.name} — Ham Group of Companies`,
    description: company.shortDescription ?? undefined,
  };
}

export default async function CompanyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [company, settings] = await Promise.all([
    getCompanyBySlug(slug),
    getSiteSettings(),
  ]);

  if (!company) notFound();

  const related = await getRelatedCompanies(slug, company.sector, 3);
  const gallery = (company.gallery ?? []).filter((u) => u !== company.imageUrl);

  return (
    <>
      <Nav groupName="Ham Group" />

      <main>
        {/* Hero */}
        <section className="border-b hairline">
          <div className="mx-auto max-w-[1440px] px-6 pt-16 md:px-10 md:pt-24">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-wider2 opacity-60">
                <Link href="/" className="hover:opacity-100">
                  Ham Group
                </Link>
                <span aria-hidden>/</span>
                <Link href="/companies" className="hover:opacity-100">
                  Companies
                </Link>
                <span aria-hidden>/</span>
                <span className="opacity-80">{company.name}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-10 text-display text-6xl leading-[0.9] tracking-tightest md:text-9xl lg:text-10xl">
                {company.name}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <dl className="grid grid-cols-2 gap-6 text-[11px] uppercase tracking-wider2 md:grid-cols-1">
                    {company.sector ? (
                      <div>
                        <dt className="opacity-50">Sector</dt>
                        <dd className="mt-2 text-sm normal-case tracking-normal opacity-90">
                          {company.sector}
                        </dd>
                      </div>
                    ) : null}
                    {company.location ? (
                      <div>
                        <dt className="opacity-50">Location</dt>
                        <dd className="mt-2 text-sm normal-case tracking-normal opacity-90">
                          {company.location}
                        </dd>
                      </div>
                    ) : null}
                    {company.highlightStat ? (
                      <div>
                        <dt className="opacity-50">
                          {company.highlightStatLabel ?? "Signal"}
                        </dt>
                        <dd className="mt-2 text-display text-3xl tracking-tightest md:text-4xl">
                          {company.highlightStat}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
                <div className="col-span-12 md:col-span-8">
                  {company.shortDescription ? (
                    <p className="text-display text-2xl leading-snug tracking-tightest md:text-4xl">
                      {company.shortDescription}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Cinematic hero image */}
          {company.imageUrl ? (
            <div className="relative mt-16 aspect-[4/3] w-full overflow-hidden md:mt-24 md:aspect-[21/9]">
              <Photo
                src={company.imageUrl}
                alt={company.name}
                sizes="100vw"
                priority
              />
            </div>
          ) : null}
        </section>

        {/* Long description */}
        {company.longDescription ? (
          <section className="border-b hairline">
            <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <SectionLabel index="01" label="In depth" />
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <Reveal>
                    <p className="text-xl leading-relaxed md:text-2xl">
                      {company.longDescription}
                    </p>
                  </Reveal>
                  {company.websiteUrl ? (
                    <Reveal delay={0.1}>
                      <a
                        href={company.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-10 inline-flex items-center gap-3 border border-ink px-6 py-3 text-[12px] uppercase tracking-wider2 transition-colors hover:bg-ink hover:text-paper"
                      >
                        Visit website
                        <span aria-hidden>↗</span>
                      </a>
                    </Reveal>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Gallery */}
        {gallery.length ? (
          <section className="border-b hairline">
            <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <SectionLabel index="02" label="Gallery" />
                </div>
                <div className="col-span-12 md:col-span-9">
                  <Reveal>
                    <h2 className="text-display text-4xl tracking-tightest md:text-6xl">
                      Inside {company.name}.
                    </h2>
                  </Reveal>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-2 md:mt-24 md:grid-cols-2">
              {gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.05}>
                  <div className="photo-frame relative aspect-[4/3] w-full overflow-hidden border hairline bg-ash">
                    <Photo
                      src={src}
                      alt={`${company.name} — gallery ${i + 1}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* Related companies */}
        {related.length ? (
          <section className="border-b hairline">
            <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <SectionLabel index="03" label="Also in the group" />
                </div>
                <div className="col-span-12 md:col-span-9">
                  <Reveal>
                    <h2 className="text-display text-4xl tracking-tightest md:text-6xl">
                      Neighbouring subsidiaries.
                    </h2>
                  </Reveal>
                </div>
              </div>
              <ul className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
                {related.map((r, i) => {
                  const rslug = r.slug?.current;
                  const card = (
                    <article className="photo-frame group flex h-full flex-col gap-4 border-t hairline px-5 py-5 transition-colors duration-500 hover:bg-ink hover:text-paper">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider2 opacity-50">
                        <span>{r.sector}</span>
                        <span aria-hidden>→</span>
                      </div>
                      <div className="relative aspect-[5/4] w-full overflow-hidden border hairline bg-ash">
                        {r.imageUrl ? (
                          <Photo
                            src={r.imageUrl}
                            alt={r.name}
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-display text-5xl tracking-tightest opacity-20">
                              {r.name
                                .split(" ")
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-display text-2xl tracking-tightest md:text-3xl">
                        {r.name}
                      </h3>
                      {r.shortDescription ? (
                        <p className="text-sm leading-relaxed opacity-75">
                          {r.shortDescription}
                        </p>
                      ) : null}
                    </article>
                  );
                  return (
                    <Reveal key={r._id} delay={i * 0.05}>
                      <li>
                        {rslug ? (
                          <Link href={`/companies/${rslug}`}>{card}</Link>
                        ) : (
                          card
                        )}
                      </li>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Footer CTA */}
        <section className="bg-ink text-paper">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-end md:px-10 md:py-32">
            <div>
              <SectionLabel
                index="04"
                label="Keep exploring"
                variant="dark"
              />
              <h2 className="mt-10 text-display text-5xl leading-[0.95] tracking-tightest md:text-8xl">
                One group. <span className="italic opacity-80">Many industries.</span>
              </h2>
              {settings?.address ? (
                <p className="mt-10 max-w-md text-sm leading-relaxed opacity-70">
                  {settings.address}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/companies"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[12px] uppercase tracking-wider2 transition-colors hover:bg-paper hover:text-ink"
              >
                All companies <span aria-hidden>→</span>
              </Link>
              <Link
                href="/pitch"
                className="inline-flex items-center gap-3 px-6 py-3 text-[12px] uppercase tracking-wider2 opacity-70 transition-opacity hover:opacity-100"
              >
                View the pitch deck
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="dark" groupAddress={settings?.address} />
    </>
  );
}
