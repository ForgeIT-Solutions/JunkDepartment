import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name} ${SITE.tagline}`,
  },
  description: `Fast, reliable junk removal in ${SITE.city}. Furniture, appliances, cleanouts and more. Same-day service available.`,
  openGraph: {
    title: `${SITE.name} ${SITE.tagline}`,
    description: `Fast, reliable junk removal in ${SITE.city}.`,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/logos/JUNKDEPT-COLORED.png",
        width: 1200,
        height: 630,
        alt: "Junk Dept. Removal Services",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} ${SITE.tagline}`,
    description: `Fast, reliable junk removal in ${SITE.city}.`,
    images: ["/logos/JUNKDEPT-COLORED.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-brand-charcoal text-brand-cream antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-[200] btn-primary text-xs"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
