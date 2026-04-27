import type { Company } from "@/sanity/types";
import { Photo } from "./Photo";

type Props = {
  company: Company;
  index: number;
};

export function CompanyRow({ company, index }: Props) {
  return (
    <article className="group relative border-t hairline photo-frame">
      <div className="grid grid-cols-12 gap-6 px-6 py-8 transition-colors md:px-10 md:py-12 hover:bg-ink hover:text-paper">
        <div className="col-span-12 flex items-baseline gap-6 md:col-span-1">
          <span className="number text-[12px] uppercase tracking-wider2 opacity-50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="col-span-12 md:col-span-3">
          {company.imageUrl ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden border hairline">
              <Photo
                src={company.imageUrl}
                alt={company.name}
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center border hairline bg-ash text-ink/30">
              <span className="text-display text-5xl tracking-tightest">
                {company.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-4">
          <h3 className="text-display text-4xl tracking-tightest md:text-5xl">
            {company.name}
          </h3>
          {company.sector ? (
            <p className="mt-3 text-[12px] uppercase tracking-wider2 opacity-60">
              {company.sector}
            </p>
          ) : null}
          {company.shortDescription ? (
            <p className="mt-4 text-base leading-relaxed opacity-80">
              {company.shortDescription}
            </p>
          ) : null}
        </div>
        <div className="col-span-12 flex flex-col items-start gap-3 md:col-span-3 md:items-end md:text-right">
          {company.highlightStat ? (
            <span className="text-display text-3xl tracking-tightest md:text-4xl">
              {company.highlightStat}
            </span>
          ) : null}
          {company.highlightStatLabel ? (
            <span className="text-[11px] uppercase tracking-wider2 opacity-60">
              {company.highlightStatLabel}
            </span>
          ) : null}
          {company.location ? (
            <span className="text-[11px] uppercase tracking-wider2 opacity-50">
              {company.location}
            </span>
          ) : null}
          {company.websiteUrl ? (
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider2 opacity-70 hover:opacity-100"
            >
              Visit <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
