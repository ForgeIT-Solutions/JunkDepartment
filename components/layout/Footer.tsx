import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <>
      <div className="footer-diagonal" aria-hidden />
      <footer className="bg-brand-charcoal pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pb-10 sm:pb-12 border-b border-brand-ash text-center md:text-left">
            {/* Col 1: Logo + tagline + social */}
            <div className="flex flex-col items-center md:items-start">
              <Image
                src="/logos/STACKED-GOLD.png"
                alt="Junk Dept."
                width={120}
                height={120}
                className="h-24 sm:h-28 w-auto"
              />
              <p className="mt-4 text-brand-mist text-sm leading-relaxed max-w-xs">
                Fast, reliable junk removal — {SITE.city}&apos;s most trusted hauling
                crew. Licensed, insured, and ready when you are.
              </p>
              <div className="mt-5 sm:mt-6 flex items-center justify-center md:justify-start gap-2">
                <a
                  href={SITE.social.facebook}
                  aria-label="Facebook"
                  className="text-brand-mist hover:text-brand-gold transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href={SITE.social.instagram}
                  aria-label="Instagram"
                  className="text-brand-mist hover:text-brand-gold transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href={SITE.social.google}
                  aria-label="Google Business Profile"
                  className="text-brand-mist hover:text-brand-gold transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={20} />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-3 sm:mb-4">
                Quick Links
              </h4>
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-brand-cream/80 hover:text-brand-gold transition-colors text-sm inline-block py-2 min-h-[44px]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h4 className="text-brand-gold font-display font-black uppercase tracking-[0.25em] text-xs mb-3 sm:mb-4">
                Contact Us
              </h4>
              <p className="text-brand-cream text-sm">
                <a
                  href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-brand-gold transition-colors inline-block py-1.5 min-h-[44px]"
                >
                  {SITE.phone}
                </a>
              </p>
              <p className="text-brand-cream text-sm mt-1 break-words">
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-brand-gold transition-colors inline-block py-1.5 min-h-[44px]"
                >
                  {SITE.email}
                </a>
              </p>
              <p className="text-brand-mist text-xs mt-3">{SITE.serviceArea}</p>
              <Link
                href="/#book"
                className="btn-primary mt-5 inline-flex text-xs min-h-[44px]"
              >
                Book a Pickup
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-5 sm:pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-brand-mist text-xs text-center">
              © {new Date().getFullYear()} {SITE.name} All rights reserved.
            </p>
            <p className="text-brand-mist text-xs text-center">
              Built by{" "}
              <a
                href="https://serviceflowpro.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:underline"
              >
                SERVICEFLOWPRO
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
