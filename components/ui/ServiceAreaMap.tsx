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
          zoomControl: false, // no zoom buttons — clean display map
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          attributionControl: false, // credit moves to a subtle caption below
        });
        mapRef.current = map;

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          { subdomains: "abcd", maxZoom: 19 }
        ).addTo(map);

        // Green service-area polygon (glow via .svc-zone in globals.css).
        L.polygon(
          SERVICE_AREA.boundary.map((p) => [p.lat, p.lng]),
          {
            className: "svc-zone",
            color: "#3bd15a",
            weight: 3,
            opacity: 0.95,
            fillColor: "#2a6040",
            fillOpacity: 0.28,
          }
        ).addTo(map);

        // Modern glowing marker per location (pulse + hover via globals.css).
        const dot = L.divIcon({
          className: "map-pin",
          html: '<span class="map-dot"></span>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        SERVICE_AREA.cities.forEach((c) => {
          L.marker([c.lat, c.lng], { icon: dot, riseOnHover: true })
            .addTo(map)
            .bindTooltip(`${c.name}, IL`, {
              direction: "top",
              offset: [0, -10],
              className: "svc-tip",
            });
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
    <div className="group">
      <div
        ref={ref}
        className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-brand-charcoal z-0 ring-1 ring-brand-gold/20 shadow-2xl shadow-black/50 transition-shadow duration-300 group-hover:ring-brand-gold/40"
        role="img"
        aria-label="Live map of the Junk Dept. service area across the Illinois Fox Valley"
      />
      <p className="mt-2 text-right text-[10px] text-brand-mist/50">
        Map data © OpenStreetMap contributors, © CARTO
      </p>
    </div>
  );
}
