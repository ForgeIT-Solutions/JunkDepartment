"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Service-area map (Google Maps JavaScript API).
 * Dark basemap + green service-area polygon + glowing markers for each city.
 * Reads the key from NEXT_PUBLIC_GOOGLE_MAPS_API_KEY. With no key set, it falls
 * back to a branded city grid so the page never shows a broken map.
 */

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { SERVICE_AREA } from "@/lib/constants";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

declare global {
  interface Window {
    google?: any;
    __gmapsPromise?: Promise<void>;
  }
}

function loadGoogleMaps(key: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps) return Promise.resolve();
  if (window.__gmapsPromise) return window.__gmapsPromise;
  window.__gmapsPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(s);
  });
  return window.__gmapsPromise;
}

// Dark basemap style so the green service area pops (matches the brand).
const DARK_STYLE: any[] = [
  { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a7a" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#3d3d3d" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#c8c8b8" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d0d0d" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
];

const GOLD = "#c49a35";
const GREEN = "#2a6040";

export function ServiceAreaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!KEY || !ref.current) return;
    let cancelled = false;

    loadGoogleMaps(KEY)
      .then(() => {
        if (cancelled || !ref.current) return;
        const g = window.google;
        const map = new g.maps.Map(ref.current, {
          center: SERVICE_AREA.center,
          zoom: SERVICE_AREA.zoom,
          styles: DARK_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
        });

        // Service-area polygon.
        new g.maps.Polygon({
          map,
          paths: SERVICE_AREA.boundary,
          strokeColor: "#3bd15a",
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillColor: GREEN,
          fillOpacity: 0.25,
        });

        // Glowing marker per city (soft halo circle + solid dot).
        SERVICE_AREA.cities.forEach((c) => {
          new g.maps.Circle({
            map,
            center: { lat: c.lat, lng: c.lng },
            radius: 2400,
            strokeOpacity: 0,
            fillColor: "#3bd15a",
            fillOpacity: 0.18,
          });
          new g.maps.Marker({
            map,
            position: { lat: c.lat, lng: c.lng },
            title: `${c.name}, IL`,
            icon: {
              path: g.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#3bd15a",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });
        });
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  // Fallback: no key configured (or load failed) — show a branded city grid.
  if (!KEY || failed) {
    return (
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-sm overflow-hidden bg-brand-charcoal border border-brand-ash flex items-center justify-center px-6">
        <div className="text-center">
          <MapPin size={40} className="mx-auto text-brand-gold" strokeWidth={1.5} aria-hidden />
          <p className="mt-3 font-display font-black uppercase text-brand-cream text-lg tracking-tight">
            {failed ? "Map unavailable" : "Interactive map coming soon"}
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2 max-w-md">
            {SERVICE_AREA.cities.map((c) => (
              <li
                key={c.name}
                className="border border-brand-gold/50 text-brand-gold text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full"
                style={{ borderColor: GOLD }}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-sm overflow-hidden border border-brand-ash"
      role="img"
      aria-label="Map of the Junk Dept. service area across the Illinois Fox Valley"
    />
  );
}
