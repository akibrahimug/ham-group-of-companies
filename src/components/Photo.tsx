import Image from "next/image";
import clsx from "clsx";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function Photo({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  fill = true,
  width,
  height,
}: Props) {
  if (!src) return null;

  const isRemote = /^https?:\/\//i.test(src);
  const commonProps = {
    src,
    alt,
    className: clsx("photo object-cover", className),
    priority,
    sizes,
    unoptimized: isRemote,
  } as const;

  if (fill) {
    return <Image {...commonProps} fill />;
  }
  return (
    <Image
      {...commonProps}
      width={width ?? 1200}
      height={height ?? 900}
    />
  );
}
