type Stat = { value?: string; label?: string };

type Props = {
  stats: Stat[];
  variant?: "light" | "dark";
};

const COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function StatGrid({ stats, variant = "light" }: Props) {
  const items = stats.filter((s) => s.value);
  if (!items.length) return null;
  const borderClr = variant === "dark" ? "border-white/15" : "border-black/10";
  const colsClass = COLS[Math.min(items.length, 4)] ?? "md:grid-cols-4";
  return (
    <div
      className={`grid grid-cols-1 divide-y ${colsClass} md:divide-x md:divide-y-0 ${
        variant === "dark" ? "divide-white/15" : "divide-black/10"
      } border-y ${borderClr}`}
    >
      {items.map((s, i) => (
        <div key={i} className="flex flex-col gap-3 px-6 py-12 md:px-8">
          <span className="text-display text-6xl tracking-tightest md:text-7xl">
            {s.value}
          </span>
          <span className="text-[11px] uppercase tracking-wider2 opacity-60">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
