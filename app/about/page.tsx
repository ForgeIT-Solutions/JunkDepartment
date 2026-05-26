import Image from "next/image";
import type { Metadata } from "next";
import { Clock, Sparkles, Recycle, User } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <section className="bg-brand-charcoal py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-gold font-display font-black uppercase tracking-[0.3em] text-xs mb-4">
              Who We Are
            </p>
            <h2 className="font-display font-black uppercase text-brand-cream text-4xl md:text-5xl leading-[0.95] tracking-tight">
              Hauling Junk Shouldn&apos;t Be a Hassle.
            </h2>
            <div className="mt-6 space-y-4 text-brand-cream/80 text-lg leading-relaxed">
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

          <div className="relative bg-brand-green-dark border-t-[3px] border-brand-gold rounded-sm p-12 flex items-center justify-center min-h-[24rem]">
            <Image
              src="/logos/STACKED-COLORED.png"
              alt="Junk Dept. logo"
              width={400}
              height={400}
              className="w-full max-w-xs h-auto"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-green py-24 px-6">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Three Things We Don't Mess Up."
          centered
        />
        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((v) => {
            const Icon = ICONS[v.icon as IconKey];
            return (
              <div
                key={v.title}
                className="bg-brand-green-dark border-t-[3px] border-brand-gold p-8 rounded-sm text-center"
              >
                <Icon
                  size={40}
                  className="mx-auto text-brand-gold"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display font-black uppercase text-brand-cream text-2xl tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-brand-cream/70 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-brand-charcoal py-24 px-6">
        <SectionHeading eyebrow="The Crew" title="Meet The Crew" centered />
        {/* TODO: Replace with real team photos in /public/images/team/ */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="bg-brand-green-dark border border-brand-ash p-6 rounded-sm text-center"
            >
              <div className="mx-auto w-32 h-32 rounded-full bg-brand-green flex items-center justify-center">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User size={56} className="text-brand-gold/60" strokeWidth={1.5} />
                )}
              </div>
              <h3 className="mt-5 font-display font-black uppercase text-brand-cream text-xl tracking-tight">
                {member.name}
              </h3>
              <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mt-1">
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
