import Image from "next/image";
import clsx from "clsx";

/**
 * Tasteful, branded placeholder that marks where real photography will go.
 * Swap each instance for a <next/image> once the client provides photos —
 * the `label` tells you exactly what shot belongs in each slot.
 */
type Props = {
  /** What photo goes here, e.g. "Truck & Crew" or "Before / After" */
  label: string;
  /** Optional smaller hint, e.g. recommended orientation */
  hint?: string;
  /** Tailwind aspect ratio utility — defaults to a 4:3 frame */
  aspect?: string;
  className?: string;
};

export function ImagePlaceholder({
  label,
  hint,
  aspect = "aspect-[4/3]",
  className,
}: Props) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={clsx(
        "relative w-full overflow-hidden rounded-sm",
        "bg-brand-green-dark border-2 border-dashed border-brand-gold/40",
        "flex flex-col items-center justify-center text-center px-4",
        aspect,
        className
      )}
    >
      {/* Faint grid texture so the empty frame reads as intentional */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-brand-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-gold) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Image
        src="/logos/STACKED-GOLD.png"
        alt=""
        aria-hidden
        width={120}
        height={120}
        className="relative w-16 sm:w-20 h-auto opacity-80 select-none pointer-events-none"
      />
      <p className="relative mt-3 font-display font-black uppercase tracking-[0.18em] text-brand-cream text-sm sm:text-base">
        {label}
      </p>
      <p className="relative mt-1 text-brand-mist text-[10px] sm:text-xs uppercase tracking-[0.2em]">
        {hint ?? "Photo coming soon"}
      </p>
    </div>
  );
}
