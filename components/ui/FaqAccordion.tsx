"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/constants";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-10 sm:mt-14 max-w-3xl mx-auto divide-y divide-brand-ash/40 border-y border-brand-ash/40">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group"
              >
                <span className="font-display font-bold text-brand-cream text-base sm:text-lg leading-snug group-hover:text-brand-gold transition-colors">
                  {faq.q}
                </span>
                <span className="shrink-0 text-brand-gold" aria-hidden>
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 sm:pb-6 pr-8 text-brand-mist text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
