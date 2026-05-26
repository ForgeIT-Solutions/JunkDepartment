import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Sofa,
  Zap,
  Trash2,
  Hammer,
  Leaf,
  Building2,
  ArrowRight,
  Star,
  Truck,
  Recycle,
  PhoneCall,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/ui/CTABanner";
import { SERVICES, STATS, SERVICE_AREA_CITIES, SITE } from "@/lib/constants";

const ICONS = { Sofa, Zap, Trash2, Hammer, Leaf, Building2 } as const;
type IconKey = keyof typeof ICONS;

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* ============== 1. HERO ============== */}
      <section className="relative bg-brand-green bg-grain min-h-[88vh] flex items-center px-6 py-24 overflow-hidden">
        {/* Faint stacked logo watermark */}
        <Image
          src="/logos/STACKED-WHITE.png"
          alt=""
          aria-hidden
          width={600}
          height={600}
          className="absolute -bottom-20 -right-10 w-[40rem] max-w-[80vw] opacity-[0.04] pointer-events-none select-none"
        />
        {/* Decorative diagonal gold rule */}
        <div
          aria-hidden
          className="absolute top-12 right-12 w-40 h-[2px] bg-brand-gold rotate-45 origin-right opacity-80"
        />

        <div className="relative max-w-5xl mx-auto text-center w-full">
          <span
            className="fade-up inline-block px-4 py-1.5 border border-brand-gold/60 text-brand-gold text-xs font-display font-bold uppercase tracking-[0.3em] rounded-full"
            style={{ animationDelay: "0ms" }}
          >
            Fast · Reliable · Affordable
          </span>

          <h1
            className="fade-up mt-6 font-display font-black text-brand-cream uppercase leading-[0.9] tracking-tight text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ animationDelay: "150ms" }}
          >
            We Haul It.
            <br />
            <span className="text-brand-gold">You Forget It.</span>
          </h1>

          <p
            className="fade-up mt-6 mx-auto max-w-2xl text-brand-cream/80 text-lg md:text-xl leading-relaxed"
            style={{ animationDelay: "300ms" }}
          >
            {SITE.name} is {SITE.city}&apos;s go-to removal crew. Furniture,
            appliances, yard debris — we take it all.
          </p>

          <div
            className="fade-up mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animationDelay: "450ms" }}
          >
            <Button href="/contact">
              Get a Free Quote <ArrowRight size={18} />
            </Button>
            <Button href="/services" variant="outline">
              See Our Services
            </Button>
          </div>

          <ul
            className="fade-up mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-brand-cream/70 text-sm"
            style={{ animationDelay: "600ms" }}
          >
            <li className="flex items-center gap-2">
              <Star size={16} className="text-brand-gold" /> 500+ Happy Customers
            </li>
            <li className="flex items-center gap-2">
              <Truck size={16} className="text-brand-gold" /> Same-Day Available
            </li>
            <li className="flex items-center gap-2">
              <Recycle size={16} className="text-brand-gold" /> Eco-Friendly
              Disposal
            </li>
          </ul>
        </div>
      </section>

      {/* ============== 2. SERVICES OVERVIEW ============== */}
      <section className="bg-brand-charcoal py-24 px-6">
        <SectionHeading
          eyebrow="What We Remove"
          title="No Job Too Big. No Junk Too Heavy."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon as IconKey];
            return (
              <article
                key={service.name}
                className="group bg-brand-green-dark border-t-[3px] border-brand-gold p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--color-brand-gold)] hover:shadow-brand-gold/40"
              >
                <Icon
                  size={40}
                  className="text-brand-gold transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-5 font-display font-black uppercase text-brand-cream text-2xl tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-2 text-brand-mist text-sm leading-relaxed">
                  {service.desc}
                </p>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button href="/services" variant="outline">
            View All Services <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* ============== 3. HOW IT WORKS ============== */}
      <section className="relative bg-brand-green py-24 px-6 overflow-hidden">
        <SectionHeading
          eyebrow="How It Works"
          title="Three Steps. Done."
          centered
        />

        <div className="relative max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {/* Dashed gold connector — desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[16%] right-[16%] border-t-2 border-dashed border-brand-gold/40"
          />

          {[
            {
              n: "01",
              title: "Book Online or Call",
              desc: "Schedule in under 2 minutes — text, call, or fill out our quote form.",
              Icon: PhoneCall,
            },
            {
              n: "02",
              title: "We Show Up On Time",
              desc: "Our crew arrives in your 2-hour window — fully licensed and insured.",
              Icon: Clock,
            },
            {
              n: "03",
              title: "We Haul. You Relax.",
              desc: "We load, haul, and sweep up. You sit back and enjoy the space.",
              Icon: Truck,
            },
          ].map((step) => (
            <div
              key={step.n}
              className="relative bg-brand-green-dark/60 backdrop-blur-sm border border-brand-gold/20 p-8 text-center rounded-sm"
            >
              <span
                aria-hidden
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green flex items-center justify-center w-24 h-24 -mt-4 font-display font-black text-7xl text-brand-gold/30"
              >
                {step.n}
              </span>
              <step.Icon
                size={32}
                className="mx-auto text-brand-gold relative z-10 mt-6"
                strokeWidth={1.5}
              />
              <h3 className="mt-6 font-display font-black uppercase text-brand-cream text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-brand-cream/70 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== 4. WHY CHOOSE US ============== */}
      <section className="bg-brand-charcoal py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Local. Licensed. Loaded with Experience."
            centered
          />

          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-black text-brand-gold text-5xl md:text-6xl leading-none">
                  {s.value}
                </dd>
                <p className="mt-2 text-brand-mist text-xs uppercase tracking-[0.2em]">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>

          <p className="mt-16 max-w-3xl mx-auto text-center text-brand-cream/80 text-lg leading-relaxed">
            We&apos;re a local, family-run crew — licensed, insured, and serious
            about doing right by your home and the environment. Whenever
            possible, we donate usable items and recycle materials rather than
            sending them straight to the landfill.
          </p>

          <blockquote className="mt-12 max-w-3xl mx-auto border-l-4 border-brand-gold pl-6 py-2">
            <p className="text-brand-cream italic text-xl leading-relaxed">
              &ldquo;Junk Dept. cleared out my entire garage in under 2 hours.
              Unbelievable service — highly recommend.&rdquo;
            </p>
            <footer className="mt-3 text-brand-gold text-sm font-bold uppercase tracking-widest">
              — Sarah M.
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============== 5. SERVICE AREA BANNER ============== */}
      <section className="bg-brand-green py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display font-black uppercase text-brand-cream text-3xl md:text-5xl tracking-tight leading-none flex items-center justify-center gap-4 flex-wrap">
            Serving {SITE.city}, Surrounding Areas,
            <ArrowRight size={36} className="text-brand-gold inline" />
            <span>and Beyond.</span>
          </h2>
        </div>
        <div className="mt-6 overflow-hidden">
          <div className="marquee-track text-brand-gold/60 font-display font-bold uppercase tracking-[0.3em] text-sm">
            {[...SERVICE_AREA_CITIES, ...SERVICE_AREA_CITIES, ...SERVICE_AREA_CITIES, ...SERVICE_AREA_CITIES].map(
              (city, i) => (
                <span key={i} className="px-8 flex items-center gap-8">
                  {city}
                  <span aria-hidden className="text-brand-gold/40">★</span>
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============== 6. FINAL CTA ============== */}
      <CTABanner />
    </>
  );
}
