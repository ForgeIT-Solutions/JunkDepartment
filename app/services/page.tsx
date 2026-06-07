import type { Metadata } from "next";
import { Sofa, Zap, Trash2, Hammer, Leaf, Building2, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES, ADDITIONAL_SERVICES, SITE } from "@/lib/constants";

const ICONS = { Sofa, Zap, Trash2, Hammer, Leaf, Building2 } as const;
type IconKey = keyof typeof ICONS;

export const metadata: Metadata = {
  title: "Services",
  description: `Full-service junk removal: furniture, appliances, construction debris, yard waste, and commercial cleanouts in ${SITE.city}.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Full-Service Junk Removal"
        subtext="From single-item pickups to whole-property cleanouts — we've got the crew and the truck."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Detail grid */}
      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon as IconKey];
            return (
              <article
                key={service.name}
                className="bg-brand-green-dark border-t-[3px] border-brand-gold p-5 sm:p-8 lg:p-10 rounded-sm flex flex-col"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <Icon
                    size={40}
                    className="text-brand-gold flex-shrink-0 sm:hidden"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <Icon
                    size={48}
                    className="text-brand-gold flex-shrink-0 hidden sm:block"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <h2 className="font-display font-black uppercase text-brand-cream text-2xl sm:text-3xl tracking-tight leading-none">
                      {service.name}
                    </h2>
                    <p className="mt-1 text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold">
                      Free Quote
                    </p>
                  </div>
                </div>

                <p className="mt-4 sm:mt-5 text-brand-cream/80 text-sm sm:text-base leading-relaxed">
                  {service.details}
                </p>

                <ul className="mt-5 sm:mt-6 space-y-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-brand-cream/90 text-sm"
                    >
                      <Check
                        size={18}
                        className="text-brand-gold flex-shrink-0 mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* Additional services */}
      <section className="bg-brand-green py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="And Much More" title="Specialty Removals" centered />
          <ul className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-3 sm:gap-y-4 max-w-3xl mx-auto">
            {ADDITIONAL_SERVICES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-brand-cream border-b border-brand-gold/20 pb-3 text-sm sm:text-base"
              >
                <Check size={18} className="text-brand-gold flex-shrink-0" strokeWidth={2.5} />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
