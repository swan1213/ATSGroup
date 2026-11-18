/**
 * Central site configuration. Edit these values to rebrand or change
 * the booking link / domain in one place.
 */
export const siteConfig = {
  name: "ATS Group",
  legalName: "ATS Group",
  tagline: "Looking for an American Partner",
  description:
    "ATS Group is a Tokyo-based software and AI studio looking for a US-based partner. We bring the engineering work and deliver it; you bring the local connections. Profit is shared on terms agreed in writing before anything starts.",
  // Production domain (must be verified in Resend for email delivery).
  url: "https://atsgroup.world",
  locale: "en_US",
  calendly: "https://calendly.com/akiraiwata304/30min",
  location: {
    city: "Tokyo",
    region: "Tokyo",
    country: "JP",
  },
  /** Market the partner programme is aimed at. */
  targetMarket: "United States",
  founders: [
    { name: "Daniel (Hiro Tanaka)", role: "Co-Founder & CTO" },
    { name: "Akira Iwata", role: "Co-Founder & CEO" },
  ],
  /** Brand artwork derived from the tiger / eagle source images. */
  images: {
    hero: "/brand/hero.webp",
    tiger: "/brand/tiger.webp",
    eagle: "/brand/eagle.webp",
    shake: "/brand/shake.webp",
    duo: "/brand/duo.webp",
    board: "/brand/board.webp",
    crowd: "/brand/crowd.webp",
  },
} as const;

export type SiteConfig = typeof siteConfig;
