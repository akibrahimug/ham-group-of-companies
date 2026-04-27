import Link from "next/link";
import type { Company } from "@/sanity/types";
import { Photo } from "./Photo";

type Variant = "default" | "large" | "wide";

type Props = {
  company: Company;
  index: number;
  variant?: Variant;
};

export function CompanyCard({ company, index, variant = "default" }: Props) {
  const slug = company.slug?.current;
  const href = slug ? `/companies/${slug}` : undefined;

  const content = variant === "wide" ? (
    <WideCard company={company} index={index} href={href} />
  ) : (
    <StackedCard company={company} index={index} variant={variant} href={href} />
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function StackedCard({
  company,
  index,
  variant,
  href,
}: {
  company: Company;
  index: number;
  variant: "default" | "large";
  href?: string;
}) {
  const isLarge = variant === "large";
  return (
    <article
      className={`photo-frame group relative flex h-full flex-col gap-4 border-t hairline px-5 py-5 transition-colors duration-500 ${
        href ? "hover:bg-ink hover:text-paper" : ""
      }`}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider2 opacity-60">
        <span className="number">{String(index + 1).padStart(2, "0")}</span>
        {company.sector ? <span>{company.sector}</span> : null}
      </div>
      <div
        className={`relative w-full overflow-hidden border hairline bg-ash ${
          isLarge ? "aspect-[4/3]" : "aspect-[5/4]"
        }`}
      >
        {company.imageUrl ? (
          <Photo
            src={company.imageUrl}
            alt={company.name}
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
          />
        ) : (
          <Initials name={company.name} />
        )}
        {href ? (
          <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 border border-paper bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-wider2 text-paper backdrop-blur">
              Explore <span aria-hidden>→</span>
            </span>
          </div>
        ) : null}
      </div>
      <div>
        <h3
          className={`text-display tracking-tightest ${
            isLarge ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
          }`}
        >
          {company.name}
        </h3>
        {company.shortDescription ? (
          <p
            className={`mt-3 leading-relaxed opacity-80 ${
              isLarge ? "text-base md:text-lg" : "text-sm md:text-base"
            }`}
          >
            {company.shortDescription}
          </p>
        ) : null}
      </div>
      <div className="mt-auto flex items-end justify-between pt-3">
        <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wider2 opacity-60">
          {company.location ? <span>{company.location}</span> : null}
          {company.highlightStat ? (
            <span className="text-display text-xl tracking-tightest text-ink/90">
              {company.highlightStat}
              {company.highlightStatLabel ? (
                <span className="ml-2 align-middle text-[10px] uppercase tracking-wider2 opacity-60">
                  {company.highlightStatLabel}
                </span>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function WideCard({
  company,
  index,
  href,
}: {
  company: Company;
  index: number;
  href?: string;
}) {
  return (
    <article
      className={`photo-frame group relative flex flex-col border-t hairline px-5 py-5 transition-colors duration-500 sm:flex-row sm:items-stretch sm:gap-6 md:gap-8 ${
        href ? "hover:bg-ink hover:text-paper" : ""
      }`}
    >
      <div className="relative w-full overflow-hidden border hairline bg-ash sm:w-1/2 md:w-[45%]">
        <div className="aspect-[4/3] w-full sm:h-full sm:aspect-auto">
          {company.imageUrl ? (
            <Photo
              src={company.imageUrl}
              alt={company.name}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <Initials name={company.name} />
          )}
        </div>
        {href ? (
          <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 border border-paper bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-wider2 text-paper backdrop-blur">
              Explore <span aria-hidden>→</span>
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-5 flex flex-1 flex-col justify-between sm:mt-0">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider2 opacity-60">
            <span className="number">{String(index + 1).padStart(2, "0")}</span>
            {company.sector ? <span>{company.sector}</span> : null}
          </div>
          <h3 className="mt-4 text-display text-3xl tracking-tightest md:text-4xl">
            {company.name}
          </h3>
          {company.shortDescription ? (
            <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">
              {company.shortDescription}
            </p>
          ) : null}
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wider2 opacity-60">
            {company.location ? <span>{company.location}</span> : null}
          </div>
          {company.highlightStat ? (
            <span className="text-display text-xl tracking-tightest text-ink/90 md:text-2xl">
              {company.highlightStat}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Initials({ name }: { name: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="text-display text-7xl tracking-tightest text-ink/15">
        {name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </span>
    </div>
  );
}
