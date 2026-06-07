import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { SectionHeading } from "./SectionHeading";
import { TIERS, BOOKING_URL } from "@/lib/constants";

/**
 * Three-tier offer (Curbside / Full-Service / Premium). Quote-based —
 * no prices until the pricing model exists. Every CTA points at BOOKING_URL.
 */
export function Tiers() {
  return (
    <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
      <SectionHeading
        eyebrow="Choose Your Level"
        title="Three Ways to Get It Gone."
        centered
      />
      <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-center text-brand-cream/70 text-sm sm:text-base">
        From a quick curbside grab to white-glove care for luxury homes — pick the
        level of service that fits the job. Every tier is licensed, insured, and
        quoted free.
      </p>

      <div className="mt-10 sm:mt-14 lg:mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className={clsx(
              "relative flex flex-col rounded-sm p-6 sm:p-8 transition-transform duration-300",
              tier.featured
                ? "bg-brand-green border-2 border-brand-gold md:-translate-y-3 shadow-[0_0_0_1px_var(--color-brand-gold)] shadow-brand-gold/30"
                : "bg-brand-green-dark border-t-[3px] border-brand-gold hover:-translate-y-1"
            )}
          >
            <span
              className={clsx(
                "self-start text-[10px] sm:text-xs font-display font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full",
                tier.featured
                  ? "bg-brand-gold text-brand-green-dark"
                  : "border border-brand-gold/50 text-brand-gold"
              )}
            >
              {tier.badge}
            </span>

            <h3 className="mt-4 font-display font-black uppercase text-brand-cream text-2xl sm:text-3xl tracking-tight leading-none">
              {tier.name}
            </h3>
            <p className="mt-2 text-brand-gold font-medium text-sm sm:text-base">
              {tier.tagline}
            </p>
            <p className="mt-3 text-brand-cream/75 text-sm leading-relaxed">
              {tier.desc}
            </p>

            <ul className="mt-5 sm:mt-6 space-y-2.5 flex-1">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-brand-cream/90 text-sm"
                >
                  <Check
                    size={18}
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={BOOKING_URL}
              className={clsx(
                "mt-6 sm:mt-8 w-full min-h-[48px] text-sm",
                tier.featured ? "btn-primary" : "btn-outline"
              )}
            >
              {tier.cta} <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-brand-mist text-xs sm:text-sm">
        Pricing is quoted per job — no surprises, no obligation. Final price is
        confirmed on-site before any work begins.
      </p>
    </section>
  );
}
