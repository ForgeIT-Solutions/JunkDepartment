import clsx from "clsx";

type Props = {
  eyebrow?: string;
  title: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  centered = false,
  light = false,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        centered ? "text-center mx-auto" : "text-left",
        "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-brand-gold font-display font-black uppercase tracking-[0.3em] text-xs mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "font-display font-black uppercase leading-[0.95] tracking-tight",
          "text-4xl sm:text-5xl md:text-6xl",
          light ? "text-brand-green-dark" : "text-brand-cream"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
