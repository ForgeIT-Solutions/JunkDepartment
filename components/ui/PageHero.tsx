import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  subtext?: string;
  breadcrumbs: Crumb[];
  variant?: "green" | "charcoal";
};

export function PageHero({
  eyebrow,
  title,
  subtext,
  breadcrumbs,
  variant = "green",
}: Props) {
  const bg = variant === "green" ? "bg-brand-green" : "bg-brand-charcoal";
  return (
    <section
      className={`relative ${bg} bg-grain px-4 sm:px-6 pt-20 sm:pt-24 pb-14 sm:pb-20 min-h-[40vh] sm:min-h-[50vh] flex items-end overflow-hidden`}
    >
      <div
        aria-hidden
        className="hidden sm:block absolute top-10 right-10 w-32 h-[2px] bg-brand-gold rotate-45 origin-right opacity-70"
      />
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-brand-cream/60 mb-5 sm:mb-6"
        >
          {breadcrumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="hover:text-brand-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-brand-gold">{c.label}</span>
              )}
              {i < breadcrumbs.length - 1 && (
                <ChevronRight size={12} aria-hidden />
              )}
            </span>
          ))}
        </nav>
        <p className="text-brand-gold font-display font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4">
          {eyebrow}
        </p>
        <h1 className="font-display font-black text-brand-cream uppercase leading-[0.95] tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {subtext && (
          <p className="mt-5 sm:mt-6 max-w-2xl text-brand-cream/80 text-base sm:text-lg md:text-xl leading-relaxed">
            {subtext}
          </p>
        )}
      </div>
    </section>
  );
}
