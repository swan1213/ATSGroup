import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { ScrollTop } from "@/components/ScrollTop";
import { Tilt3D } from "@/components/Tilt3D";
import { GsapEffects } from "@/components/GsapEffects";
import { SkyBackground } from "@/components/SkyBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

// Cartoon pairing: Baloo 2 (rounded, heavy) for headings, buttons and badges;
// Nunito for body copy. Nunito is bound to --font-sans, which the base
// stylesheet already uses everywhere. Noto Sans JP/SC (<link> below) covers
// the CJK glyphs neither Latin face has.
const display = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b1f3d",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "business partner wanted USA",
    "US sales partner software",
    "referral partner program",
    "revenue share partnership",
    "software development partner",
    "AI automation reseller",
    "channel partner opportunity",
    "introduce clients earn commission",
    "Tokyo software studio",
    "ATS Group partnership",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  category: "technology",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} · ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SkyBackground />
        <LanguageProvider>
          {children}
          <GsapEffects />
          <CustomCursor />
          <ScrollTop />
          <Tilt3D />
        </LanguageProvider>
      </body>
    </html>
  );
}
