import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { SITE, SERVICE_AREA_CITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free junk removal quote in ${SITE.city}. We respond within 24 hours. Call, text, or fill out our quick online form.`,
};

export default function ContactPage() {
  const telHref = `tel:${SITE.phone.replace(/[^0-9+]/g, "")}`;
  const mailHref = `mailto:${SITE.email}`;

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Haul It Away."
        subtext="Get a free, no-obligation quote in under 24 hours."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-brand-charcoal py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form column (60%) */}
          <div className="lg:col-span-3 bg-brand-green-dark border-t-[3px] border-brand-gold p-8 md:p-10 rounded-sm">
            <h2 className="font-display font-black uppercase text-brand-cream text-3xl tracking-tight leading-none">
              Request a Quote
            </h2>
            <p className="mt-2 text-brand-cream/70 text-sm">
              Tell us what you need hauled — we&apos;ll be back in touch within 24
              hours.
            </p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </div>

          {/* Contact info column (40%) */}
          <aside className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-3">
                Call or Text Us
              </h3>
              <Link
                href={telHref}
                className="flex items-center gap-3 text-brand-cream text-xl hover:text-brand-gold transition-colors"
              >
                <Phone size={20} className="text-brand-gold" />
                {SITE.phone}
              </Link>
            </div>

            <div>
              <h3 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-3">
                Email Us
              </h3>
              <Link
                href={mailHref}
                className="flex items-center gap-3 text-brand-cream text-base hover:text-brand-gold transition-colors break-all"
              >
                <Mail size={20} className="text-brand-gold" />
                {SITE.email}
              </Link>
            </div>

            <div>
              <h3 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-3">
                Hours
              </h3>
              <ul className="space-y-1.5">
                {SITE.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center gap-3 text-brand-cream/90 text-sm"
                  >
                    <Clock size={16} className="text-brand-gold/70" />
                    <span className="font-semibold">{h.day}:</span>
                    <span className="text-brand-cream/80">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-3">
                Service Area
              </h3>
              <p className="flex items-start gap-3 text-brand-cream/80 text-sm">
                <MapPin size={16} className="text-brand-gold/70 mt-0.5" />
                <span>{SITE.city} and surrounding communities</span>
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SERVICE_AREA_CITIES.map((c) => (
                  <li
                    key={c}
                    className="border border-brand-gold/50 text-brand-gold text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
