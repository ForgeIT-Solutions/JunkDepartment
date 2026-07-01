import type { MetadataRoute } from "next";
import { SITE, SITEMAP_ROUTES } from "@/lib/constants";

export const dynamic = "force-static";

// The main nav is a single long-scroll page, but each section also exists as a
// standalone route (kept for SEO) — all of them are listed here so search
// engines can index them individually.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SITEMAP_ROUTES.map((route) => ({
    url: `${SITE.url}${route === "/" ? "/" : `${route}/`}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
