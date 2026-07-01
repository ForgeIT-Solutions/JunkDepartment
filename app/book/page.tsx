import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TrustBar } from "@/components/ui/TrustBar";
import { BookingForm } from "@/components/ui/BookingForm";
import { PROCESS_STEPS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Pickup",
  description: `Book your junk removal in ${SITE.city}. Pick a date and arrival window online — no payment required to book. We confirm your firm price before we start.`,
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Online"
        title="Pick a Time. We Haul It."
        subtext="Choose a date and arrival window that works for you. No payment required to book."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book" }]}
      />

      <TrustBar tone="green-dark" />

      <section className="bg-brand-charcoal py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Booking form */}
          <div className="lg:col-span-3 bg-brand-green-dark border-t-[3px] border-brand-gold p-5 sm:p-8 lg:p-10 rounded-sm">
            <h2 className="font-display font-black uppercase text-brand-cream text-2xl sm:text-3xl tracking-tight leading-none">
              Book Your Pickup
            </h2>
            <p className="mt-2 text-brand-cream/70 text-sm">
              Fill this out and pick your window — it takes about a minute.
            </p>
            <div className="mt-6 sm:mt-8">
              <BookingForm />
            </div>
          </div>

          {/* What happens next */}
          <aside className="lg:col-span-2">
            <h3 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-5">
              What Happens Next
            </h3>
            <ol className="space-y-5">
              {PROCESS_STEPS.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span
                    aria-hidden
                    className="font-display font-black text-2xl text-brand-gold/40 leading-none shrink-0 w-8"
                  >
                    {step.n}
                  </span>
                  <div>
                    <p className="font-display font-bold uppercase text-brand-cream text-sm tracking-wide">
                      {step.title}
                    </p>
                    <p className="mt-1 text-brand-mist text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
