import type { Leader } from "@/sanity/types";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

type Props = {
  leaders: Leader[];
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { first: full, last: "" };
  const last = parts.pop() ?? "";
  return { first: parts.join(" "), last };
}

export function LeaderGrid({ leaders }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
      {leaders.map((leader, i) => {
        const { first, last } = splitName(leader.name);
        const index = String(i + 2).padStart(2, "0");
        const initials = leader.name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("");

        return (
          <Reveal key={leader._id} delay={i * 0.1}>
            <article className="group/leader flex flex-col">
              {/* Index + rule header */}
              <div className="flex items-center gap-4">
                <span className="text-display text-4xl tracking-tightest opacity-90 md:text-5xl">
                  {index}
                </span>
                <span className="h-px flex-1 bg-ink/30 transition-colors duration-700 group-hover/leader:bg-ink" />
              </div>

              {/* Portrait */}
              <div className="photo-frame relative mt-5 aspect-[3/4] w-full overflow-hidden border hairline bg-ash">
                {leader.imageUrl ? (
                  <Photo
                    src={leader.imageUrl}
                    alt={leader.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="transition-transform duration-[1200ms] ease-out-expo group-hover/leader:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-display text-7xl tracking-tightest text-ink/15">
                      {initials}
                    </span>
                  </div>
                )}
                {/* Hover role tag, bottom-left */}
                {leader.title ? (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-full bg-ink/80 px-4 py-3 text-[10px] uppercase tracking-wider2 text-paper backdrop-blur transition-transform duration-500 ease-out-expo group-hover/leader:translate-y-0">
                    {leader.title}
                  </div>
                ) : null}
              </div>

              {/* Name cascade */}
              <div className="mt-6 flex flex-col">
                <h3 className="flex flex-col text-display leading-[0.95] tracking-tightest">
                  <span className="text-3xl italic opacity-90 md:text-4xl">
                    {first}
                  </span>
                  {last ? (
                    <span className="text-4xl md:text-5xl">{last}</span>
                  ) : null}
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-ink/40" />
                  {leader.title ? (
                    <p className="text-[10px] uppercase tracking-wider2 opacity-60">
                      {leader.title}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
