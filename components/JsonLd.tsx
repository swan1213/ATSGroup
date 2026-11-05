import { siteConfig } from "@/lib/site";

/**
 * Structured data for rich search results (Organization + ProfessionalService).
 * Injected as a JSON-LD script in the document head.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.location.city,
            addressRegion: siteConfig.location.region,
            addressCountry: siteConfig.location.country,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        founder: siteConfig.founders.map((p) => ({
          "@type": "Person",
          name: p.name,
          jobTitle: p.role,
        })),
        employee: siteConfig.founders.map((p) => ({
          "@type": "Person",
          name: p.name,
          jobTitle: p.role,
        })),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        image: `${siteConfig.url}/opengraph-image`,
        url: siteConfig.url,
        description: siteConfig.description,
        areaServed: ["Japan", "Worldwide"],
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            "Full-Stack Development",
            "Applied AI & LLM Systems",
            "AI Training for Teams",
            "Architecture & Consulting",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
