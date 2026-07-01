import { SERVICE_AREA_MAP } from "@/lib/constants";

/*
 * Simple keyless Google Maps embed — no API key or billing required.
 * To recenter, change SERVICE_AREA_MAP.query in lib/constants.ts (a city,
 * a business name, or a full address once available).
 */
export function ServiceAreaMap() {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    SERVICE_AREA_MAP.query
  )}&z=${SERVICE_AREA_MAP.zoom}&output=embed`;

  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-sm overflow-hidden border border-brand-ash">
      <iframe
        src={src}
        title="Junk Dept. service area map"
        className="w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
