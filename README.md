# ATS Group — "Looking for an American Partner"

A single-page partner-recruitment site for **ATS Group**, a Tokyo-based
software and AI studio looking for a US-based business development partner.

Built with **Next.js 16 (App Router) + React 19 + TypeScript**.

## The pitch, in three lines
> We bring the opportunities · You bring the local connections · We share the profit
>
> Simple agreement. Full transparency.

## Features
- ⚡ App Router, server + client components, `next/font` (no layout shift)
- 🎨 **Dark tech + gold theme** over a live 3D particle-wave background
  (see *Theme* below)
- 🌐 **Trilingual** — English (default), 日本語 and 中文, with a header language
  switcher; choice persists across visits (localStorage). All copy lives in
  [`lib/i18n.ts`](lib/i18n.ts), FAQ in [`lib/faq.ts`](lib/faq.ts)
- 🐯 **Tiger / eagle cast artwork** — cropped and optimised from the source
  illustrations (see *Brand images* below)
- 🔍 **SEO** — rich metadata, Open Graph + Twitter cards, dynamic OG image,
  JSON-LD (Organization / ProfessionalService / `seeks` Demand), `sitemap.xml`,
  `robots.txt`, web manifest
- 📱 Fully **responsive** — mobile menu, fluid type, mobile-first breakpoints
- ✉️ **Partner application form** with validation + honeypot spam protection,
  wired to **Resend**: team notification *and* applicant auto-confirmation
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

## Theme
Dark navy and gold, set over a live three.js particle wave. The token block
at the top of [`app/globals.css`](app/globals.css) drives everything:

| Token | Role |
|---|---|
| `--bg` `#05080f` | deep navy page |
| `--blue` → `--cyan` | **Technology** — focus rings, data, glow |
| `--gold` `#f5b942` | **Success** — CTAs, key numbers, the brand mark |
| `--surface` | translucent glass cards over the wave |

It matches the marketing artwork, which is itself navy and gold with sunset
light — the tiger/eagle images sit on this palette rather than fighting it.

Motion lives in three places:
- [`components/GsapEffects.tsx`](components/GsapEffects.tsx) — scroll reveals
  (`.reveal`, with `flip` and `zoom` variants) and magnetic hover on primary
  buttons.
- [`components/WaveBackground.tsx`](components/WaveBackground.tsx) — the
  ambient GLSL particle wave.
- [`components/Tilt3D.tsx`](components/Tilt3D.tsx) — pointer-driven tilt on
  `.tilt` cards, publishing `--rx`/`--ry` for the CSS to use.

All of it is gated on `prefers-reduced-motion` via `gsap.matchMedia()`.

**One pattern worth knowing:** `.gsap-animating` is added for the duration of
a tween and switches off the CSS `transform` transition underneath. Without
it the transition interpolates toward each of GSAP's per-frame writes and the
animation smears.

## Page structure
| Section | Component | Anchor |
|---|---|---|
| Hero — handshake artwork, headline, cast stamps, stats | `Hero` | — |
| The offer — we bring / you bring / we share | `Deal` | `#offer` |
| Who this is for — fit **and** not-a-fit lists | `Who` | `#who` |
| How it works — 4-step timeline | `How` | `#how` |
| Terms — transparency, no upfront payment | `Terms` | `#terms` |
| About ATS Group — credibility, A·T·S | `About` | `#about` |
| Company profile — fact tiles | `Company` | `#company` |
| FAQ — including the sceptical questions | `Faq` | `#faq` |
| Apply — form + Calendly | `Contact` | `#apply` |

## Brand images
Sources live in `brand-source/` (**gitignored**): the five original square
illustrations, plus every marketing image used so far in
`brand-source/marketing/` (numbered as supplied). The site serves cropped,
text-stripped WebP derivatives from `public/brand/`, ~680 KB in total:

| Served file | Size (px) | From | Used by |
|---|---|---|---|
| `hero.webp` | 1048 × 485 | `marketing/16.png` | Hero banner — the ridge |
| `tiger.webp` | 480 × 480 | `marketing/17.png` | `Deal` card 1 + hero cast stamp |
| `eagle.webp` | 480 × 480 | `marketing/16.png` | `Deal` card 2 + hero cast stamp |
| `shake.webp` | 480 × 480 | `marketing/16.png` | `Deal` card 3 |
| `duo.webp` | 1150 × 425 | `agreement.png` | `Terms` banner |
| `board.webp` | 730 × 560 | `boardroom.png` | `About` |
| `crowd.webp` | 700 × 545 | `ideas.png` | `Who` |

The outdoor mountain crops sit at the top of the page and the indoor city
ones at the bottom, so the imagery moves from the open air into the office as
you scroll.

### Resolution matters more than composition
`marketing/16.png` (1425 × 863) and `17.png` (1254 × 1254) are the only new
images large enough to crop from — the rest are ~515 × 515, which leaves a
clean text-free region of roughly 330 – 425 px. That is too small for any
slot on this page without visible softening. If you generate more, **aim for
1200 px or wider**; composition can be fixed with a crop, resolution cannot.

### Images deliberately not used
- `marketing/15.png` and `18.png` — cash fans, money bags, gold chains and a
  treasure chest. Flaunting money is the single strongest signal that makes a
  genuine partner offer read as a scam to US professionals. Same reason the
  original `success.png` was dropped.
- `marketing/14.png` and `15.png` also carry **"Tigaro"** and **"Atlas
  Goldpaw"** nameplates — AI-hallucinated brand names that contradict ATS
  Group.

### Keeping text out of the crops
The crops deliberately **exclude the headline text baked into the originals**,
so all copy stays in HTML and therefore translates, is selectable, and is
readable by screen readers. Every source image has text along the top, down
one side and across the bottom, so the usable region is the middle band —
check each crop by eye after cutting it, because the text sits close to the
characters and a 10 px error leaves a visible sliver.

Paths are centralised in `siteConfig.images` ([`lib/site.ts`](lib/site.ts));
alt text is per-locale in [`lib/i18n.ts`](lib/i18n.ts).

### Regenerating the artwork
Drop a replacement in at the same filename and size and nothing else needs to
change. The prompt below matches the style your existing images are already
in — glossy 3D-rendered anthropomorphic characters on a navy/sunset palette,
which is also the site's palette. **Keep the "no text" clause in every one**:
baked-in English words break the Japanese and Chinese versions of the page.

Paste this block **first**, then one composition line:

```
STYLE: Polished 3D-rendered illustration, cinematic lighting, glossy and
detailed, in the style of a high-end animated feature poster. Deep navy blue
and warm gold palette with golden-hour rim light; rich but not garish. Shallow
depth of field, clean uncluttered background. Confident and professional —
this is a business proposition, not a cartoon gag. ABSOLUTELY NO TEXT: no
letters, numbers, logos, signage, nameplates, labels, book spines, mugs with
writing, or watermarks anywhere in the image. NO money: no cash, banknotes,
coins, gold bars, treasure or money bags.

CAST: TIGER — an anthropomorphic Bengal tiger, orange fur with black stripes
and a cream muzzle, in a well-cut navy business suit; warm, competent,
confident. He represents the Tokyo software studio. EAGLE — an anthropomorphic
bald eagle, white head feathers, bright yellow beak, in a charcoal or navy
suit; upright, open, trustworthy. He represents the American partner. Keep
both characters' faces and proportions identical across every image.
```

| File | Composition line to append |
|---|---|
| `hero.webp` | Wide banner, 2100×970. The tiger and the eagle clasping hands centre frame, three-quarter view facing each other, mountains and an American flag behind them. Full upper bodies, open sky above their heads. |
| `tiger.webp` | Square, 960×960. Head-and-shoulders of the tiger, three-quarter view, confident. Centred, even margin on all four sides. |
| `eagle.webp` | Square, 960×960. Head-and-shoulders of the eagle, three-quarter view, open friendly expression. Centred, even margin on all four sides. |
| `shake.webp` | Square, 960×960. Close crop on a tiger paw and an eagle talon clasped in a firm handshake, both in suit cuffs, filling the frame. Heads not visible. |
| `duo.webp` | Wide banner, 2300×850. The tiger and the eagle side by side at a desk signing a blank sheet of paper — the paper must be completely blank. Calm and businesslike. |
| `board.webp` | Landscape, 1460×1120. The tiger leading a small team of animal engineers around a meeting table with blank laptops and a blank whiteboard. Tokyo office, warm light. |
| `crowd.webp` | Landscape, 1400×1090. The eagle in the foreground among a friendly crowd of varied animal business people shaking hands and talking — an American network. No signs or banners. |

Generate at **2× the listed size** where the generator allows it, then
downscale. The square images are rendered with `object-fit: cover`, so keep
faces away from the outer ~8% of the frame.

Save as PNG into `brand-source/`, then convert to the served size:

```bash
# sharp ships with Next.js, so no extra install is needed
node -e "require('sharp')('brand-source/hero.png').resize(1048,485,{fit:'cover'}).webp({quality:84}).toFile('public/brand/hero.webp')"
```

## Email (Resend)
Configured in [`.env.local`](.env.example) (gitignored):
```
RESEND_API_KEY=...                              # your Resend key
CONTACT_TO=akiraiwata304@gmail.com              # where applications land
CONTACT_FROM=ATS Group <noreply@atsgroup.world> # verified-domain sender
```
The domain `atsgroup.world` must be verified in Resend (Domains → add the DNS
records it shows) before mail will deliver. On submit, the API
([`app/api/contact/route.ts`](app/api/contact/route.ts)):
1. emails the application to `CONTACT_TO` (applicant set as reply-to), and
2. sends the applicant a confirmation that restates, in writing, that becoming
   a partner costs them nothing.

Form field names are kept stable for the API: `companyName` carries the
applicant's **location** and `service` carries their **network type**.

## Things to edit
- **Copy / translations** — [`lib/i18n.ts`](lib/i18n.ts) (all three languages).
- **FAQ** — [`lib/faq.ts`](lib/faq.ts) (all three languages).
- **Domain, Calendly, image paths** — [`lib/site.ts`](lib/site.ts).
- **Email recipients** — `.env.local`.
- **Colours** — the `:root` palette at the top of
  [`app/globals.css`](app/globals.css).

## Deliberate omissions
These were left out on purpose; re-adding them would weaken the page:
- **No revenue or earnings chart.** Projected partner income is an earnings
  claim, and an invented one reads as a red flag to the exact audience being
  recruited.
- **No specific profit-split percentage.** It is stated as negotiated and
  written down before work starts. Fill one in only once it is a real number.
- **No `JobPosting` structured data.** This is a profit-share partnership, not
  employment; marking it up as a job would misrepresent it.

## Note on this machine
Turbopack's native binary crashes here (SIGILL), so `dev`/`build` use the
**webpack** compiler (`--webpack`). On other machines you can drop that flag.

## Deploy
Optimised for **Vercel** (`npx vercel`). Add the three env vars in the Vercel
dashboard. Also runs on any Node host (`npm run build && npm start`).
