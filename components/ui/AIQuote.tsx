import Link from "next/link";
import { Camera, Sparkles, Clock, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

/**
 * AI Auto-Quote feature — the flagship differentiator.
 * Hook: "Get a quote in less than a minute." Customer snaps a photo + adds a
 * short description, our AI returns an instant ballpark (verified on-site).
 */
const STEPS = [
  {
    icon: Camera,
    title: "Snap a Photo",
    desc: "Upload a picture of the pile, the room, or the item you want gone.",
  },
  {
    icon: Sparkles,
    title: "AI Sizes It Up",
    desc: "Our AI — trained on hundreds of real jobs — reads it and estimates the haul.",
  },
  {
    icon: Clock,
    title: "Ballpark in Seconds",
    desc: "Get an instant price range. Final quote is confirmed on-site, free.",
  },
];

export function AIQuote() {
  return (
    <section className="relative bg-brand-green-dark bg-grain py-14 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 border border-brand-gold/60 text-brand-gold text-[10px] sm:text-xs font-display font-bold uppercase tracking-[0.25em] rounded-full">
            <Sparkles size={14} /> Powered by AI
          </span>
          <h2 className="mt-5 font-display font-black uppercase text-brand-cream leading-[0.95] tracking-tight text-3xl sm:text-5xl md:text-6xl">
            Get a Quote in
            <br />
            <span className="text-brand-gold">Less Than a Minute.</span>
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-brand-cream/80 text-base sm:text-lg leading-relaxed">
            No waiting on a callback. No salesman in your driveway. Just snap a
            photo, and our AI gives you an instant ballpark — so you know what to
            expect before we ever pull up.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-green border border-brand-gold/30">
                  <Icon size={30} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <span className="mt-1 block font-display font-black text-brand-gold/40 text-sm tracking-[0.3em]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display font-black uppercase text-brand-cream text-xl sm:text-2xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-brand-cream/70 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href={BOOKING_URL}
            className="btn-primary w-full sm:w-auto min-h-[52px] text-base px-8"
          >
            Get My Instant Quote <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-brand-mist text-xs max-w-md mx-auto">
            Estimates are based on the photos and details you provide. Your final
            price is always verified on-site before any work begins.
          </p>
        </div>
      </div>
    </section>
  );
}
