"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Live service-area map (Leaflet + free CARTO dark tiles — no API key).
 * Draws the green service-area polygon and a glowing marker on each location.
 * Leaflet is loaded from CDN at runtime so it stays out of the static bundle;
 * if it fails to load, a branded city-list fallback renders instead.
 */

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { SERVICE_AREA } from "@/lib/constants";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

declare global {
  interface Window {
    L?: any;
    __leafletPromise?: Promise<void>;
  }
}

function loadLeaflet(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.L) return Promise.resolve();
  if (window.__leafletPromise) return window.__leafletPromise;
  window.__leafletPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    const s = document.createElement("script");
    s.src = LEAFLET_JS;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Leaflet failed to load"));
    document.head.appendChild(s);
  });
  return window.__leafletPromise;
}

export function ServiceAreaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then(() => {
        if (cancelled || !ref.current || mapRef.current) return;
        const L = window.L;

        const map = L.map(ref.current, {
          center: [SERVICE_AREA.center.lat, SERVICE_AREA.center.lng],
          zoom: SERVICE_AREA.zoom,
          scrollWheelZoom: false,
          zoomControl: true,
        });
        mapRef.current = map;

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            attribution: "&copy; OpenStreetMap &copy; CARTO",
            subdomains: "abcd",
            maxZoom: 19,
          }
        ).addTo(map);

        // Green service-area polygon.
        L.polygon(
          SERVICE_AREA.boundary.map((p) => [p.lat, p.lng]),
          {
            color: "#3bd15a",
            weight: 3,
            opacity: 0.9,
            fillColor: "#2a6040",
            fillOpacity: 0.3,
          }
        ).addTo(map);

        // Glowing marker per location.
        const glowIcon = (name: string) =>
          L.divIcon({
            className: "",
            html: `<div title="${name}, IL" style="width:14px;height:14px;border-radius:9999px;background:#3bd15a;border:2px solid #fff;box-shadow:0 0 14px 5px rgba(59,209,90,0.65)"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });

        SERVICE_AREA.cities.forEach((c) => {
          L.marker([c.lat, c.lng], { icon: glowIcon(c.name) })
            .addTo(map)
            .bindTooltip(`${c.name}, IL`, { direction: "top", offset: [0, -8] });
        });

        // Leaflet needs a size recalc once the container has painted.
        setTimeout(() => map.invalidateSize(), 0);
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (failed) {
    return (
      <div className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-sm overflow-hidden bg-brand-charcoal border border-brand-ash flex items-center justify-center px-6">
        <div className="text-center">
          <MapPin size={40} className="mx-auto text-brand-gold" strokeWidth={1.5} aria-hidden />
          <p className="mt-3 font-display font-black uppercase text-brand-cream text-lg tracking-tight">
            Map unavailable
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2 max-w-md">
            {SERVICE_AREA.cities.map((c) => (
              <li
                key={c.name}
                className="border border-brand-gold/50 text-brand-gold text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full"
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
      className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-sm overflow-hidden border border-brand-ash bg-brand-charcoal z-0"
      role="img"
      aria-label="Live map of the Junk Dept. service area across the Illinois Fox Valley"
    />
  );
}
