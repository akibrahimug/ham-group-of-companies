type Props = {
  index?: string;
  label: string;
  variant?: "light" | "dark";
};

export function SectionLabel({ index, label, variant = "light" }: Props) {
  const color = variant === "dark" ? "text-paper/70" : "text-ink/60";
  const rule = variant === "dark" ? "bg-paper/40" : "bg-ink/40";
  return (
    <div
      className={`flex items-center gap-4 text-[11px] uppercase tracking-wider2 ${color}`}
    >
      {index ? <span className="number">{index}</span> : null}
      <span className={`h-px w-8 ${rule}`} />
      <span>{label}</span>
    </div>
  );
}
