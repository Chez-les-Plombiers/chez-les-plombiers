# Chez Les Plombiers — Site Vitrine

## Projet
Site vitrine pour **Chez Les Plombiers**, lieu événementiel de 200m² au 39 rue des Bourdonnais, 75001 Paris.

## Stack
- **Next.js 16** App Router + TypeScript strict + React 19
- **Tailwind CSS v4** (`@theme inline`)
- **Motion** (framer-motion v12+ via `motion/react`) pour les animations
- **Lucide React** pour les icônes
- **Vercel** hosting, auto-deploy sur push main

## Commandes
```bash
npm run dev      # Dev server (port 3000)
npm run build    # Production build (SSG)
npm run lint     # ESLint
```

## Structure
```
src/app/             # Pages (App Router)
  page.tsx           # Home (SSG) — 6 sections + JSON-LD
  appartement/       # L'Appartement Rose
  mentions-legales/  # Mentions légales
  politique-confidentialite/  # RGPD
  robots.ts          # robots.txt dynamique (AI bots autorisés)
  sitemap.ts         # sitemap.xml (4 URLs)
  globals.css        # Design tokens Tailwind v4
  layout.tsx         # RootLayout + GA4/GTM/Axeptio scripts

src/components/      # Composants React
  Header.tsx         # "use client" — scroll state + mobile menu + logo swap
  Footer.tsx         # Server component — liens + infos légales
  HeroSection.tsx    # "use client" — parallax + entrance animations
  ServicesSection.tsx # "use client" — 5 cards + hover effects
  AboutSection.tsx   # "use client" — texte + stats + image
  PortfolioSection.tsx # "use client" — 3 images + hover overlay
  EquipmentsSection.tsx # "use client" — specs techniques + floor plan
  ContactSection.tsx # "use client" — 4 contacts + CTA Calendly
  ScrollAnimation.tsx # Wrapper réutilisable whileInView

src/lib/
  metadata.ts        # Constantes SEO partagées + liens externes
  analytics.ts       # GA4 typed helper + GTM ID
```

## Analytics
- **GA4**: G-P14K1RH61R
- **GTM**: GTM-PXGXK94F
- **Axeptio**: 699344885a2a098410f72b36

## URLs externes
- Calendly: https://calendly.com/chezlesplombiers/visite
- Pricing: https://pricing.chezlesplombiers.fr
- WhatsApp: https://wa.me/33688679981
- Instagram: https://instagram.com/chezlesplombiers

## SEO/GEO
- JSON-LD: EventVenue, Organization, FAQPage
- robots.txt: AI bots (GPTBot, ClaudeBot, PerplexityBot) autorisés
- sitemap.xml: 4 URLs
- Open Graph + Twitter Cards sur toutes les pages

## Informations légales
- Chez les Plombiers SAS — SIREN 928 788 157
- Capital: 5 000 € — TVA: FR04 928 788 157
- NAF/APE: 82 30Z
