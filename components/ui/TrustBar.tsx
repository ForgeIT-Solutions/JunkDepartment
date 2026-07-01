import { Star, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const BADGE_ICONS = { Star, ShieldCheck, Sparkles, MapPin } as const;

type Props = {
  /** Background tone — defaults to charcoal (homepage). Use "green-dark" under green heroes. */
  tone?: "charcoal" | "green-dark";
};

/** Trust-signal badge row. Mirrors the reference layout's under-hero strip. */
export function TrustBar({ tone = "charcoal" }: Props) {
  const bg = tone === "green-dark" ? "bg-brand-green-dark" : "bg-brand-charcoal";
  return (
    <section className={`${bg} border-b border-brand-ash/40 px-4 sm:px-6 py-6 sm:py-8`}>
      <ul className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {TRUST_BADGES.map((badge) => {
          const Icon = BADGE_ICONS[badge.icon as keyof typeof BADGE_ICONS];
          return (
            <li
              key={badge.title}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <Icon
                size={28}
                className="text-brand-gold shrink-0"
                strokeWidth={1.5}
                aria-hidden
              />
              <div className="leading-tight">
                <p className="font-display font-black uppercase text-brand-cream text-sm sm:text-base tracking-tight">
                  {badge.title}
                </p>
                <p className="text-brand-mist text-[10px] sm:text-xs uppercase tracking-[0.15em]">
                  {badge.sub}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
