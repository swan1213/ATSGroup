import { siteConfig } from "@/lib/site";

/**
 * Structured data for rich search results.
 *
 * Organization + ProfessionalService describe ATS Group itself; JobPosting is
 * deliberately NOT used, because this is a profit-share partnership and not
 * employment — marking it up as a job would misrepresent the offer.
 */
export function JsonLd() {
  const address = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.region,
    addressCountry: siteConfig.location.country,
  };

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
        foundingLocation: { "@type": "Place", address },
        address,
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
        seeks: {
          "@type": "Demand",
          name: "US-based business development partner",
          description:
            "A partner based in the United States who introduces client opportunities to ATS Group and receives an agreed share of the profit on work that closes. No fee is payable by the partner at any stage.",
          areaServed: { "@type": "Country", name: siteConfig.targetMarket },
          businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        image: `${siteConfig.url}/opengraph-image`,
        url: siteConfig.url,
        description: siteConfig.description,
        areaServed: ["Japan", "United States", "Worldwide"],
        priceRange: "$$$",
        address,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            "Full-Stack Development",
            "AI Automation & LLM Systems",
            "CMS Solutions",
            "CRM & Internal Tooling",
            "Cloud Infrastructure & DevOps",
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
        inLanguage: ["en", "ja", "zh"],
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
