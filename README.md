# ATS Group — Company Website

A professional portfolio site for **ATS Group**, a Tokyo-based IT company:
full-stack engineering, applied AI, and hands-on AI training.

Built with **Next.js 16 (App Router) + React 19 + TypeScript**.

## Features
- ⚡ App Router, server + client components, `next/font` (no layout shift)
- 🌐 **Bilingual** — English (default) and Japanese, with a header language
  switcher; choice persists across visits (localStorage). All copy lives in
  [`lib/i18n.ts`](lib/i18n.ts)
- 🔍 **SEO** — rich metadata, Open Graph + Twitter cards, dynamic OG image,
  JSON-LD structured data (Organization / ProfessionalService), `sitemap.xml`,
  `robots.txt`, web manifest
- 📱 Fully **responsive** — mobile menu, fluid type, mobile-first breakpoints
- ✉️ **Contact form** with validation + honeypot spam protection, wired to
  **Resend**: sends a team notification *and* an auto-confirmation to the visitor
- 📅 Embedded **Calendly** booking widget
- ♿ Skip-link, accessible focus states, reduced-motion support, semantic markup

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
```
Production:
```bash
npm run build
npm start
```

## Email (Resend)
Configured in [`.env.local`](.env.example) (gitignored):
```
RESEND_API_KEY=...                                  # your Resend key
CONTACT_TO=akiraiwata304@gmail.com                     # where enquiries land
CONTACT_FROM=ATS Group <noreply@atsgroup.world> # verified-domain sender
```
The domain `atsgroup.world` must be verified in Resend (Domains → add the DNS
records it shows) before mail will deliver. On submit, the API ([`app/api/contact/route.ts`](app/api/contact/route.ts)):
1. emails the enquiry to `CONTACT_TO` (visitor set as reply-to), and
2. sends the visitor a branded confirmation.

## Project structure
```
app/
  layout.tsx            Root layout, global SEO metadata, fonts, providers
  page.tsx              Home page (assembles all sections)
  globals.css           Design system & responsive styles
  api/contact/route.ts  Contact form handler (Resend, dual email)
  opengraph-image.tsx   Dynamic 1200×630 social image
  sitemap.ts robots.ts manifest.ts icon.svg
components/             Header, Hero, Services, Approach, Stack, Team, Contact,
                       Footer, Calendly, JsonLd, Logo, ScrollReveal,
                       LanguageProvider, LanguageSwitcher
lib/site.ts            Site config (name, domain, Calendly, CTO)
lib/i18n.ts            EN + JA translation dictionary
```

## Things to edit
- **Copy / translations** — [`lib/i18n.ts`](lib/i18n.ts) (both languages).
- **Domain, Calendly, CTO** — [`lib/site.ts`](lib/site.ts).
- **Email recipients** — `.env.local`.
- **Colours** — the `:root` palette at the top of `app/globals.css`.

## Note on this machine
Turbopack's native binary crashes here (SIGILL), so `dev`/`build` use the
**webpack** compiler (`--webpack`). On other machines you can drop that flag.

## Deploy
Optimised for **Vercel** (`npx vercel`). Add the three env vars in the Vercel
dashboard. Also runs on any Node host (`npm run build && npm start`).
