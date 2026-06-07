"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-shadow duration-200",
        "bg-brand-green-dark/95 backdrop-blur supports-[backdrop-filter]:bg-brand-green-dark/80",
        scrolled && "shadow-lg shadow-black/40"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Junk Dept. home">
          <Image
            src="/logos/JUNKDEPT-WHITE.png"
            alt="Junk Dept."
            width={160}
            height={40}
            priority
            className="h-8 sm:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "uppercase tracking-[0.2em] text-xs font-semibold transition-colors",
                    active
                      ? "text-brand-gold"
                      : "text-brand-cream/80 hover:text-brand-gold"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="block h-px bg-brand-gold mt-1" aria-hidden />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex btn-primary text-xs px-5 py-2.5"
        >
          Get a Free Quote
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-brand-gold p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[100] bg-brand-green flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="Junk Dept. home"
            >
              <Image
                src="/logos/JUNKDEPT-WHITE.png"
                alt="Junk Dept."
                width={160}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="text-brand-gold p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          <ul className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-6 -mt-8 sm:-mt-12 px-6">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "overlay-link font-display font-black uppercase text-4xl sm:text-5xl tracking-tight block py-2",
                    isActive(link.href)
                      ? "text-brand-gold"
                      : "text-brand-cream hover:text-brand-gold"
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="w-full max-w-xs">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="overlay-link btn-primary mt-4 sm:mt-6 w-full min-h-[48px] text-base"
                style={{ animationDelay: `${NAV_LINKS.length * 80}ms` }}
              >
                Get a Free Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
