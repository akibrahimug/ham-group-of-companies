type Props = {
  items: string[];
  separator?: string;
};

export function Marquee({ items, separator = "—" }: Props) {
  if (!items.length) return null;
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y hairline py-8">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-display text-4xl md:text-6xl tracking-tightest"
          >
            {item}
            <span className="mx-10 text-iron">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
