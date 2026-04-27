import type { Company } from "@/sanity/types";
import { CompanyCard } from "./CompanyCard";
import { Reveal } from "./Reveal";
import Link from "next/link";

type Props = {
  companies: Company[];
  totalCount: number;
};

export function FeaturedCompanies({ companies, totalCount }: Props) {
  if (!companies.length) return null;

  // Expected layout: 1 lead (large) + 1 wide beneath it on the left, 2 stacked
  // on the right, then 3 across the bottom row. 7 cards total.
  const [lead, ...rest] = companies;
  const wideSecondary = rest[0];
  const rightStack = rest.slice(1, 3);
  const bottomRow = rest.slice(3);

  return (
    <div className="px-6 md:px-10">
      <div className="grid grid-cols-12 gap-8 md:gap-10">
        {/* Left column: large hero + wide horizontal card */}
        <div className="col-span-12 flex flex-col gap-8 md:col-span-7 md:gap-10">
          {lead ? (
            <Reveal>
              <CompanyCard company={lead} index={0} variant="large" />
            </Reveal>
          ) : null}
          {wideSecondary ? (
            <Reveal delay={0.08}>
              <CompanyCard company={wideSecondary} index={1} variant="wide" />
            </Reveal>
          ) : null}
        </div>

        {/* Right column: two stacked default cards */}
        <div className="col-span-12 flex flex-col gap-8 md:col-span-5 md:gap-10">
          {rightStack.map((c, i) => (
            <Reveal key={c._id} delay={0.12 + i * 0.06}>
              <CompanyCard company={c} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </div>

      {bottomRow.length ? (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-10">
          {bottomRow.map((c, i) => (
            <Reveal key={c._id} delay={i * 0.05}>
              <CompanyCard company={c} index={i + 4} />
            </Reveal>
          ))}
        </div>
      ) : null}

      <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t hairline pt-10 md:mt-24 md:flex-row md:items-center">
        <p className="max-w-lg text-[13px] uppercase tracking-wider2 opacity-60">
          {totalCount > companies.length
            ? `${companies.length} of ${totalCount} — see the full group portfolio`
            : "The full group portfolio"}
        </p>
        <Link
          href="/companies"
          className="group inline-flex items-center gap-3 border border-ink px-6 py-3 text-[12px] uppercase tracking-wider2 transition-colors hover:bg-ink hover:text-paper"
        >
          View all {totalCount} companies
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
