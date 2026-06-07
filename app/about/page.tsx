import type { Metadata } from "next";
import { Clock, Sparkles, Recycle, Camera } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { VALUES, TEAM, SITE } from "@/lib/constants";

const ICONS = { Clock, Sparkles, Recycle } as const;
type IconKey = keyof typeof ICONS;

export const metadata: Metadata = {
  title: "About Us",
  description: `Local, licensed, and insured junk removal crew serving ${SITE.city}. Learn about our story, values, and eco-friendly disposal process.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Local Crew. Serious Work."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story section */}
      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div>
            <p className="text-brand-gold font-display font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-3 sm:mb-4">
              Who We Are
            </p>
            <h2 className="font-display font-black uppercase text-brand-cream text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight">
              Hauling Junk Shouldn&apos;t Be a Hassle.
            </h2>
            <div className="mt-5 sm:mt-6 space-y-4 text-brand-cream/80 text-base sm:text-lg leading-relaxed">
              <p>
                {SITE.name} was built on a simple idea: hauling junk shouldn&apos;t
                be a hassle.
              </p>
              <p>
                We started as a small local operation — a truck, a crew, and a
                commitment to showing up on time and doing the job right. Today,
                we&apos;ve cleared hundreds of homes, garages, and businesses
                across {SITE.city} and the surrounding area.
              </p>
              <p>
                We&apos;re licensed, insured, and serious about responsible
                disposal. Whenever possible, we donate usable items to local
                charities and recycle materials rather than sending them
                straight to the landfill.
              </p>
            </div>
          </div>

          <div className="order-first md:order-last">
            <ImagePlaceholder
              label="Truck & Crew Photo"
              hint="Recommended: landscape shot of your team & truck"
              aspect="aspect-[4/3]"
              className="border-t-[3px] border-t-brand-gold min-h-[16rem] sm:min-h-[24rem]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-green py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Three Things We Don't Mess Up."
          centered
        />
        <div className="mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {VALUES.map((v) => {
            const Icon = ICONS[v.icon as IconKey];
            return (
              <div
                key={v.title}
                className="bg-brand-green-dark border-t-[3px] border-brand-gold p-6 sm:p-8 rounded-sm text-center"
              >
                <Icon
                  size={36}
                  className="mx-auto text-brand-gold sm:hidden"
                  strokeWidth={1.5}
                />
                <Icon
                  size={40}
                  className="mx-auto text-brand-gold hidden sm:block"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 sm:mt-5 font-display font-black uppercase text-brand-cream text-xl sm:text-2xl tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 text-brand-cream/70 text-sm sm:text-base leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-brand-charcoal py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
        <SectionHeading eyebrow="The Crew" title="Meet The Crew" centered />
        {/* TODO: Replace with real team photos in /public/images/team/ */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="bg-brand-green-dark border border-brand-ash p-4 sm:p-6 rounded-sm text-center"
            >
              {/* TODO: add member photo to /public/images/team/ and set `photo` in lib/constants.ts */}
              <div
                role="img"
                aria-label={`Photo placeholder for ${member.name}`}
                className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-brand-green border-2 border-dashed border-brand-gold/40 flex flex-col items-center justify-center"
              >
                <Camera size={28} className="text-brand-gold/60 sm:hidden" strokeWidth={1.5} aria-hidden />
                <Camera size={34} className="text-brand-gold/60 hidden sm:block" strokeWidth={1.5} aria-hidden />
                <span className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-brand-mist">
                  Add Photo
                </span>
              </div>
              <h3 className="mt-4 sm:mt-5 font-display font-black uppercase text-brand-cream text-base sm:text-xl tracking-tight">
                {member.name}
              </h3>
              <p className="text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
