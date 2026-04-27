import Link from "next/link";

type Props = {
  variant?: "light" | "dark";
  groupAddress?: string;
};

// Designer credit — replace with your real details before shipping.
const DESIGNER = {
  name: "Kasoma Ibrahim",
  email: "kasomaibrahim@gmail.com",
  // TODO: replace with real WhatsApp / phone when ready
  whatsapp: "+256 — — —",
};

export function SiteFooter({ variant = "light", groupAddress }: Props) {
  const isDark = variant === "dark";
  const border = isDark ? "border-white/15" : "border-black/10";
  const mute = isDark ? "text-paper/60" : "text-ink/60";

  return (
    <footer
      className={`border-t ${border} ${
        isDark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <p className={`text-[11px] uppercase tracking-wider2 ${mute}`}>
              Ham Group of Companies
            </p>
            {groupAddress ? (
              <p className="mt-4 text-sm leading-relaxed">{groupAddress}</p>
            ) : null}
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className={`text-[11px] uppercase tracking-wider2 ${mute}`}>
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-1 text-sm">
              <li>
                <Link href="/" className="hover:underline underline-offset-4">
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="hover:underline underline-offset-4"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/pitch"
                  className="hover:underline underline-offset-4"
                >
                  Pitch deck
                </Link>
              </li>
              <li>
                <Link
                  href="/audit"
                  className="hover:underline underline-offset-4"
                >
                  Audit
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className={`text-[11px] uppercase tracking-wider2 ${mute}`}>
              Designed & built by
            </p>
            <p className="mt-4 text-display text-2xl tracking-tightest md:text-3xl">
              {DESIGNER.name}
            </p>
            <ul className="mt-3 flex flex-col gap-1 text-sm">
              <li>
                <a
                  href={`mailto:${DESIGNER.email}`}
                  className="hover:underline underline-offset-4"
                >
                  {DESIGNER.email}
                </a>
              </li>
              <li className={mute}>{DESIGNER.whatsapp}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`border-t ${border}`}>
        <div
          className={`mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-6 py-8 text-[11px] uppercase tracking-wider2 md:flex-row md:items-center md:px-10 ${mute}`}
        >
          <span>
            © {new Date().getFullYear()} Ham Group of Companies. All rights
            reserved.
          </span>
          <span>Kampala · Uganda</span>
        </div>
      </div>
    </footer>
  );
}
