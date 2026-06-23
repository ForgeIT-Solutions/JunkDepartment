/**
 * Junk Dept. — Single source of truth for client-specific values.
 * Replace placeholders before launch.
 */

export const SITE = {
  name: "Junk Dept.",
  tagline: "Removal Services",
  phone: "(331) 213-9977",
  email: "info@getjunkdept.com",
  address: "", // TODO client to fill
  city: "Your City", // TODO client to fill — replace all "Your City" references
  state: "ST", // TODO client to fill
  url: "https://junkdept.com", // TODO client to fill — production URL
  serviceArea: "Serving the Greater Your City Area",
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

/**
 * Three service tiers (from owner discovery). Pricing is intentionally
 * quote-based — no hard numbers until the pricing model is built.
 * `BOOKING_URL` is the Jobber online-booking / embed link — drop it in once
 * Patrick provides it and every "Get a Quote" CTA points to it.
 */
export const BOOKING_URL = "/contact"; // TODO: replace with Jobber booking URL

export const TIERS = [
  {
    name: "Curbside",
    badge: "Tier 1",
    tagline: "You bring it out. We haul it off.",
    desc: "Leave your items at the curb or in the yard — we pull up, load, and go. The fastest, most affordable way to clear out.",
    features: [
      "Curbside or yard pickup",
      "Same-day availability",
      "You stage it, we haul it",
      "Licensed & fully insured",
    ],
    cta: "Get a Free Quote",
    featured: false,
  },
  {
    name: "Full-Service",
    badge: "Most Popular",
    tagline: "We come in and do the heavy lifting.",
    desc: "Don't lift a finger. Our crew comes inside, safely removes the items, and hauls everything away — digital waiver and supplies included.",
    features: [
      "In-home / on-site removal",
      "We do all the lifting",
      "Signed digital liability waiver",
      "Donation & recycling included",
    ],
    cta: "Get a Free Quote",
    featured: true,
  },
  {
    name: "Premium",
    badge: "White-Glove",
    tagline: "Maximum protection for high-value spaces.",
    desc: "Total care for luxury homes and sensitive jobs. Floor and door-jamb protection, shoe covers, a broom-clean finish, and extra crew — tailored to your property and custom quoted.",
    features: [
      "Full property protection",
      "Broom-clean / vacuum finish",
      "Extra crew when needed",
      "Guaranteed proper disposal",
    ],
    cta: "Request a Custom Quote",
    featured: false,
  },
];

// Safety is the backbone of the service — surfaced across the site.
export const SAFETY_POINTS = [
  {
    icon: "ShieldCheck",
    title: "Licensed & Insured",
    desc: "Fully licensed and carrying general liability coverage on every job — no risk to you.",
  },
  {
    icon: "HardHat",
    title: "Trained, Careful Crew",
    desc: "We protect your floors, walls, and doorways — booties, covers, and corner guards on premium jobs.",
  },
  {
    icon: "FileCheck",
    title: "Signed Before We Touch a Thing",
    desc: "A digital liability waiver is signed up front, so everyone's protected from the start.",
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

// TODO client to fill — swap for the real city + surrounding towns you serve
export const SERVICE_AREA_CITIES = [
  "Your City",
  "Surrounding Towns",
  "Nearby Suburbs",
  "Your County",
  "Neighboring Areas",
  "& Beyond",
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
  /* TODO: add Crew Lead + Hauler photos to /public/images/team/ and set `photo` */
  {
    name: "Patrick Sullivan",
    role: "Founder & Lead Hauler",
    photo: "/images/team/patrick-sullivan.jpg",
  },
  { name: "Jahames Strickland", role: "Crew Lead", photo: null },
  { name: "Marek Olympia", role: "Hauler", photo: null },
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
