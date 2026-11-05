/**
 * Central site configuration. Edit these values to rebrand or change
 * the booking link / domain in one place.
 */
export const siteConfig = {
  name: "ATS Group",
  legalName: "ATS Group",
  tagline: "Software Engineering & AI, Built in Japan",
  description:
    "ATS Group (Alliance, Technology, Success) is a Tokyo-based software studio. We partner long-term with businesses across Japan and beyond, delivering full-stack engineering and applied AI that drive real revenue growth.",
  // Production domain (must be verified in Resend for email delivery).
  url: "https://atsgroup.world",
  locale: "en_US",
  calendly: "https://calendly.com/akiraiwata304/30min",
  location: {
    city: "Tokyo",
    region: "Tokyo",
    country: "JP",
  },
  cto: {
    name: "Daniel (Hiro Tanaka)",
    role: "Chief Technology Officer",
  },
  founders: [
    { name: "Daniel (Hiro Tanaka)", role: "Co-Founder & CTO" },
    { name: "Akira Iwata", role: "Co-Founder & CEO" },
  ],
  nav: [
    { href: "#services", label: "Services" },
    { href: "#approach", label: "Approach" },
    { href: "#stack", label: "Stack" },
    { href: "#team", label: "Team" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
