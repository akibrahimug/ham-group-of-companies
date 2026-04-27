import type { Leader } from "@/sanity/types";
import { Photo } from "./Photo";

type Props = {
  leader: Leader;
  compact?: boolean;
};

export function LeaderBlock({ leader, compact = false }: Props) {
  return (
    <article
      className={`grid grid-cols-12 gap-6 border-t hairline ${
        compact ? "py-10 md:py-14" : "py-16 md:py-24"
      }`}
    >
      <div className={compact ? "col-span-12 md:col-span-3" : "col-span-12 md:col-span-4"}>
        <div className="photo-frame relative aspect-[3/4] w-full overflow-hidden border hairline bg-ash">
          {leader.imageUrl ? (
            <Photo
              src={leader.imageUrl}
              alt={leader.name}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-display text-7xl tracking-tightest text-ink/20">
                {leader.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={compact ? "col-span-12 md:col-span-9" : "col-span-12 md:col-span-8"}>
        {leader.title ? (
          <p className="text-[11px] uppercase tracking-wider2 opacity-60">
            {leader.title}
          </p>
        ) : null}
        <h3
          className={`mt-4 text-display tracking-tightest ${
            compact
              ? "text-3xl md:text-5xl"
              : "text-5xl md:text-7xl"
          }`}
        >
          {leader.name}
        </h3>
        {leader.bio ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
            {leader.bio}
          </p>
        ) : null}
        {leader.quote ? (
          <blockquote className="mt-6 border-l-2 border-ink pl-5 text-display text-xl italic leading-snug md:text-2xl">
            &ldquo;{leader.quote}&rdquo;
          </blockquote>
        ) : null}
      </div>
    </article>
  );
}
