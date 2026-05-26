/**
 * Junk Dept. — Single source of truth for client-specific values.
 * Replace placeholders before launch.
 */

export const SITE = {
  name: "Junk Dept.",
  tagline: "Removal Services",
  phone: "(XXX) XXX-XXXX", // TODO client to fill
  email: "info@junkdept.com", // TODO client to fill
  address: "", // TODO client to fill
  city: "[City]", // TODO client to fill — replace all [City] references
  state: "[State]", // TODO client to fill
  url: "https://junkdept.com", // TODO client to fill — production URL
  serviceArea: "Serving the Greater [City] Area",
  hours: [
    { day: "Monday–Saturday", time: "7:00 AM – 7:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  social: {
    facebook: "https://facebook.com/junkdept", // TODO client to fill
    instagram: "https://instagram.com/junkdept", // TODO client to fill
    google: "https://g.page/junkdept", // TODO client to fill
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    icon: "Sofa",
    name: "Furniture Removal",
    desc: "Couches, beds, dressers — gone same day.",
    details:
      "From single-piece pickups to whole-room clearouts, we handle every kind of household furniture. Old or new, heavy or awkward — if you don't want it, we'll haul it.",
    includes: [
      "Couches & sectionals",
      "Mattresses & box springs",
      "Dressers, desks & tables",
      "Office chairs & seating",
    ],
    priceFrom: "$89",
  },
  {
    icon: "Zap",
    name: "Appliance Hauling",
    desc: "Fridges, washers, dryers, and more.",
    details:
      "Major appliances are bulky and tricky to dispose of properly. We disconnect (where safe), haul, and recycle metals and components responsibly.",
    includes: [
      "Refrigerators & freezers",
      "Washers & dryers",
      "Stoves & dishwashers",
      "Microwaves & small appliances",
    ],
    priceFrom: "$99",
  },
  {
    icon: "Trash2",
    name: "Junk Cleanouts",
    desc: "Garages, basements, storage units.",
    details:
      "Reclaim your space. We clear out garages, basements, attics, sheds, and storage units — sorting for donation and recycling along the way.",
    includes: [
      "Whole-garage cleanouts",
      "Basement & attic clearings",
      "Storage unit emptying",
      "Shed & outbuilding removal",
    ],
    priceFrom: "$199",
  },
  {
    icon: "Hammer",
    name: "Construction Debris",
    desc: "Drywall, lumber, tile — we handle it.",
    details:
      "Post-remodel or DIY mess? We haul away construction and demolition debris and take it to the right facility — no dump runs for you.",
    includes: [
      "Drywall & plaster",
      "Lumber & framing",
      "Tile, flooring & carpet",
      "Roofing & siding scrap",
    ],
    priceFrom: "$149",
  },
  {
    icon: "Leaf",
    name: "Yard Waste",
    desc: "Brush, stumps, and landscaping debris.",
    details:
      "Branches piling up after a storm or a big landscaping job? We clear yard waste and take it to local green-waste facilities.",
    includes: [
      "Brush & branches",
      "Leaves & grass clippings",
      "Stumps & root balls",
      "Fence & deck debris",
    ],
    priceFrom: "$129",
  },
  {
    icon: "Building2",
    name: "Commercial Cleanouts",
    desc: "Office and retail space cleared fast.",
    details:
      "Moving offices, closing a storefront, or clearing tenant leftovers? We work around your schedule — early mornings, evenings, weekends.",
    includes: [
      "Office furniture & cubicles",
      "Retail fixtures & shelving",
      "Restaurant equipment",
      "Tenant turnover cleanouts",
    ],
    priceFrom: "Quoted on-site",
  },
];

export const ADDITIONAL_SERVICES = [
  "Hot Tub Removal",
  "Piano & Heavy Item Removal",
  "Estate Cleanouts",
  "Hoarder Home Assistance",
  "Donation Drop-Off (Eco-Friendly)",
  "Garage Door Removal",
  "Shed Demolition",
  "Foreclosure Cleanouts",
];

export const SERVICE_AREA_CITIES = [
  "[City]",
  "[Nearby Town 1]",
  "[Nearby Town 2]",
  "[Nearby Town 3]",
  "[Nearby Town 4]",
  "[Nearby Town 5]",
];

export const STATS = [
  { value: "500+", label: "Loads Hauled" },
  { value: "Same-Day", label: "Available" },
  { value: "100%", label: "Licensed & Insured" },
  { value: "5★", label: "Customer Rated" },
];

export const VALUES = [
  {
    icon: "Clock",
    title: "On Time, Every Time",
    desc: "We respect your schedule and show up in the window we promise.",
  },
  {
    icon: "Sparkles",
    title: "Clean & Professional",
    desc: "We leave the space better than we found it — swept and tidy.",
  },
  {
    icon: "Recycle",
    title: "Eco-First Disposal",
    desc: "We donate and recycle before we ever consider the landfill.",
  },
];

export const TEAM = [
  /* TODO: Replace with real team photos in /public/images/team/ */
  { name: "[Founder Name]", role: "Founder & Lead Hauler", photo: null },
  { name: "[Crew Member]", role: "Crew Lead", photo: null },
  { name: "[Crew Member]", role: "Hauler", photo: null },
];

/**
 * FORMSPREE SETUP:
 * 1. Go to https://formspree.io and create a free account
 * 2. Create a new form and copy your Form ID
 * 3. Replace FORMSPREE_FORM_ID below with your ID
 * 4. Formspree free tier: 50 submissions/month — upgrade if needed
 */
export const FORMSPREE_FORM_ID = "YOUR_FORM_ID_HERE";

export const SERVICE_TYPE_OPTIONS = [
  "Furniture Removal",
  "Appliance Hauling",
  "Garage/Basement Cleanout",
  "Construction Debris",
  "Yard Waste",
  "Commercial Cleanout",
  "Other",
];

export const REFERRAL_SOURCE_OPTIONS = [
  "Google",
  "Facebook",
  "Instagram",
  "Referral",
  "Drove by",
  "Other",
];
