import Image from "next/image";
import type { Metadata } from "next";
import {
  Sofa,
  Zap,
  Trash2,
  Hammer,
  Leaf,
  Building2,
  ArrowRight,
  Recycle,
  Star,
  MessageSquare,
  Clock,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/ui/CTABanner";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TrustBar } from "@/components/ui/TrustBar";
import { ServiceAreaMap } from "@/components/ui/ServiceAreaMap";
import {
  SERVICES,
  STATS,
  PROCESS_STEPS,
  WHY_US,
  SITE,
} from "@/lib/constants";

const SERVICE_ICONS = { Sofa, Zap, Trash2, Hammer, Leaf, Building2 } as const;
const WHY_ICONS = { MessageSquare, Clock, Recycle } as const;

export const metadata: Metadata = {
  title: `${SITE.name} | Junk Removal Services in ${SITE.city}`,
  description: `Fast, affordable junk removal in ${SITE.city}. Furniture, appliances, cleanouts and more. Same-day service available. Get a free quote today!`,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: `Junk removal services in ${SITE.city}`,
  url: SITE.url,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.state,
    addressCountry: "US",
  },
  openingHours: ["Mo-Sa 07:00-19:00"],
  priceRange: "$$",
  image: `${SITE.url}/logos/JUNKDEPT-COLORED.png`,
};

export default function Home() {
  const telHref = `tel:${SITE.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* ============== 1. HERO (split: hook left, image right) ============== */}
      <section className="relative bg-brand-green-dark bg-grain overflow-hidden px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-20">
        <Image
          src="/logos/STACKED-WHITE.png"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="absolute -bottom-24 -right-16 w-[42rem] max-w-[85vw] opacity-[0.04] pointer-events-none select-none"
        />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: hook */}
          <div className="text-center lg:text-left">
            <span
              className="fade-up inline-flex items-center gap-2 px-3 py-1.5 border border-brand-gold/60 text-brand-gold text-[10px] sm:text-xs font-display font-bold uppercase tracking-[0.25em] rounded-full"
              style={{ animationDelay: "0ms" }}
            >
              <Star size={12} className="fill-brand-gold" /> 5-Star Rated Junk Removal
            </span>

            <h1
              className="fade-up mt-5 font-display font-black text-brand-cream uppercase leading-[0.92] tracking-tight text-[2.75rem] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Junk Removal in {SITE.city}
              <br />
              <span className="text-brand-gold">Done Right.</span>
            </h1>

            <p
              className="fade-up mt-5 mx-auto lg:mx-0 max-w-xl text-brand-cream/80 text-base sm:text-lg leading-relaxed"
              style={{ animationDelay: "240ms" }}
            >
              {SITE.name} is {SITE.city}&apos;s go-to removal crew: licensed,
              insured, and careful with your space. Get a free quote and pick a
              time that works for you.
            </p>

            <div
              className="fade-up mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center"
              style={{ animationDelay: "360ms" }}
            >
              <Button href="/book" className="w-full sm:w-auto min-h-[52px] text-base">
                Book a Pickup <ArrowRight size={18} />
              </Button>
              <a href={telHref} className="btn-outline w-full sm:w-auto min-h-[52px] text-base">
                <Phone size={16} /> {SITE.phone}
              </a>
            </div>
          </div>

          {/* Right: hero image slot */}
          <div className="fade-up" style={{ animationDelay: "300ms" }}>
            <ImagePlaceholder
              label="Truck & Crew"
              hint="Hero shot: the crew + truck on a job"
              aspect="aspect-[4/3]"
              className="border-t-[3px] border-t-brand-gold shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ============== 1.5 TRUST BADGE BAR ============== */}
      <TrustBar />

      {/* ============== 2. INTRO / VALUE PROP ============== */}
      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div className="order-first md:order-last">
            <ImagePlaceholder
              label="On the Job"
              hint="Crew loading the truck"
              aspect="aspect-[4/3]"
              className="border-t-[3px] border-t-brand-gold"
            />
          </div>
          <div>
            <p className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-3">
              Why Homeowners Call Us
            </p>
            <h2 className="font-display font-black uppercase text-brand-cream text-3xl sm:text-4xl lg:text-5xl leading-[0.95] tracking-tight">
              Hauling Junk Shouldn&apos;t Be a Hassle.
            </h2>
            <div className="mt-5 space-y-4 text-brand-cream/80 text-base sm:text-lg leading-relaxed">
              <p>
                We started as a small local crew with one promise: show up on
                time and do the job right. Today we&apos;ve cleared hundreds of
                homes, garages, and businesses across {SITE.city}.
              </p>
              <p>
                You get a firm, upfront price before we lift a thing, a crew that
                respects your home, and responsible disposal that keeps usable
                items out of the landfill.
              </p>
            </div>
            <div className="mt-7">
              <Button href="/about" variant="outline" className="min-h-[48px]">
                More About Us <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 3. SERVICES GRID ============== */}
      <section className="bg-brand-green py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Haul"
          title={`Junk Removal Services in ${SITE.city}`}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 mt-10 sm:mt-14 max-w-6xl mx-auto">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS];
            return (
              <article
                key={service.name}
                className="group bg-brand-green-dark border-t-[3px] border-brand-gold p-5 sm:p-7 lg:p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--color-brand-gold)] hover:shadow-brand-gold/40"
              >
                <Icon
                  size={38}
                  className="text-brand-gold transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-4 sm:mt-5 font-display font-black uppercase text-brand-cream text-xl sm:text-2xl tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-brand-mist text-sm leading-relaxed">
                  {service.desc}
                </p>
                <a
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-brand-gold text-xs sm:text-sm font-display font-bold uppercase tracking-[0.15em] hover:gap-2.5 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============== 4. OUR PROCESS (4 steps) ============== */}
      <section className="relative bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Process"
          title={`How to Work With ${SITE.name}`}
          centered
        />

        <div className="relative max-w-6xl mx-auto mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.n}
              className="relative bg-brand-green-dark border border-brand-gold/20 p-7 sm:p-8 rounded-sm"
            >
              <span
                aria-hidden
                className="font-display font-black text-5xl sm:text-6xl text-brand-gold/30 leading-none"
              >
                {step.n}
              </span>
              <h3 className="mt-3 font-display font-black uppercase text-brand-cream text-lg sm:text-xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-brand-cream/70 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== 5. WHY CHOOSE US (3 columns) ============== */}
      <section className="bg-brand-green py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={`Why ${SITE.name}`}
            centered
          />

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {WHY_US.map((item) => {
              const Icon = WHY_ICONS[item.icon as keyof typeof WHY_ICONS];
              return (
                <div
                  key={item.title}
                  className="bg-brand-green-dark border-t-[3px] border-brand-gold p-7 sm:p-8 rounded-sm text-center"
                >
                  <Icon size={40} className="mx-auto text-brand-gold" strokeWidth={1.5} aria-hidden />
                  <h3 className="mt-4 sm:mt-5 font-display font-black uppercase text-brand-cream text-xl sm:text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-brand-cream/70 text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats strip */}
          <dl className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-black text-brand-gold text-4xl sm:text-5xl md:text-6xl leading-none">
                  {s.value}
                </dd>
                <p className="mt-2 text-brand-cream/70 text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============== 6. GALLERY ============== */}
      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading eyebrow="Our Work" title="See the Difference" centered />
        <p className="mt-4 max-w-2xl mx-auto text-center text-brand-mist text-sm sm:text-base">
          Real jobs, real results. Swap these in for the crew&apos;s own
          before-and-after photos.
        </p>
        <div className="mt-10 sm:mt-14 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <ImagePlaceholder label="Before / After" hint="Garage cleanout" />
          <ImagePlaceholder label="Before / After" hint="Furniture haul" />
          <ImagePlaceholder
            label="Before / After"
            hint="Yard debris"
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </section>

      {/* ============== 7. SERVICE AREA (live map) ============== */}
      <section className="bg-brand-green py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Service Area"
          title="Where We Work"
          centered
        />
        <p className="mt-4 max-w-2xl mx-auto text-center text-brand-cream/80 text-sm sm:text-base">
          Proudly serving the Fox Valley and the southwest Chicago suburbs. If
          you&apos;re near one of these towns, we&apos;ve got you covered.
        </p>
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
          <ServiceAreaMap />
        </div>
        <div className="text-center mt-8">
          <Button href="/service-area" variant="outline" className="min-h-[48px]">
            View Full Service Area <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* ============== 8. FAQ ============== */}
      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading eyebrow="FAQs" title={`${SITE.name} FAQs`} centered />
        <FaqAccordion />
      </section>

      {/* ============== 9. FINAL CTA ============== */}
      <CTABanner />
    </>
  );
}
