import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { TrustBar } from "@/components/ui/TrustBar";
import { ServiceAreaMap } from "@/components/ui/ServiceAreaMap";
import { CTABanner } from "@/components/ui/CTABanner";
import { SERVICE_AREA_CITIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "Junk Dept. serves the Illinois Fox Valley and southwest Chicago suburbs — Oswego, Naperville, Plainfield, Aurora, Plano, Joliet, and Sugar Grove.",
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We Work"
        title="Our Service Area"
        subtext="Proudly serving the Fox Valley and the southwest Chicago suburbs. If you're near one of these towns, we've got you covered."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service Area" }]}
      />

      <TrustBar tone="green-dark" />

      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Map */}
          <div className="lg:col-span-2">
            <ServiceAreaMap />
          </div>

          {/* City list */}
          <aside>
            <h2 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-5">
              Towns We Serve
            </h2>
            <ul className="space-y-2">
              {SERVICE_AREA_CITIES.map((city) => (
                <li
                  key={city}
                  className="flex items-center gap-3 text-brand-cream border-b border-brand-ash/40 pb-2.5 text-base"
                >
                  <MapPin size={18} className="text-brand-gold shrink-0" aria-hidden />
                  <span className="font-medium">{city}, IL</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-brand-mist text-sm leading-relaxed">
              Don&apos;t see your town? We often travel just outside these limits —
              reach out and we&apos;ll let you know.
            </p>
          </aside>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
