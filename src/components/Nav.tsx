import Link from "next/link";

type Props = {
  groupName?: string;
  variant?: "light" | "dark";
};

export function Nav({ groupName = "Ham Group", variant = "light" }: Props) {
  const isDark = variant === "dark";
  const textClass = isDark ? "text-paper" : "text-ink";
  const borderClass = isDark
    ? "border-white/15"
    : "border-black/10";
  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md ${
        isDark ? "bg-black/70" : "bg-white/70"
      } border-b ${borderClass}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className={`text-display text-xl md:text-2xl tracking-tightest ${textClass}`}
        >
          {groupName}
        </Link>
        <nav
          className={`hidden items-center gap-8 text-[13px] uppercase tracking-wider2 md:flex ${textClass}`}
        >
          <Link href="/#group" className="hover:opacity-60 transition-opacity">
            Group
          </Link>
          <Link
            href="/#companies"
            className="hover:opacity-60 transition-opacity"
          >
            Companies
          </Link>
          <Link
            href="/#leadership"
            className="hover:opacity-60 transition-opacity"
          >
            Leadership
          </Link>
          <Link
            href="/#footprint"
            className="hover:opacity-60 transition-opacity"
          >
            Footprint
          </Link>
          <Link href="/#contact" className="hover:opacity-60 transition-opacity">
            Contact
          </Link>
        </nav>
        <Link
          href="/pitch"
          className={`inline-flex items-center gap-2 border px-4 py-2 text-[12px] uppercase tracking-wider2 transition-colors ${
            isDark
              ? "border-white/30 text-paper hover:bg-white hover:text-ink"
              : "border-black/30 text-ink hover:bg-ink hover:text-paper"
          }`}
        >
          View Pitch
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
