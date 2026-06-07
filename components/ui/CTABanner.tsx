import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "./Button";
import { SITE } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="bg-brand-gold py-14 sm:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-display text-brand-green-dark text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] sm:leading-none">
          Ready to Clear It Out?
        </h2>
        <p className="text-brand-green-dark/80 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-medium">
          Book online or give us a call. We&apos;ll take it from there.
        </p>
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <Button
            href="/contact"
            variant="dark"
            className="w-full sm:w-auto min-h-[48px] text-base"
          >
            Get a Free Quote <ArrowRight size={18} />
          </Button>
          <Link
            href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
            className="btn-outline-dark w-full sm:w-auto min-h-[48px] text-base"
          >
            <Phone size={16} /> {SITE.phone}
          </Link>
        </div>
      </div>
    </section>
  );
}
