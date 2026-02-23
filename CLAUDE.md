# Chez Les Plombiers — Site Vitrine Bilingue

## Projet
Site vitrine bilingue (FR/EN) pour **Chez Les Plombiers**, lieu événementiel de 200m² au 39 rue des Bourdonnais, 75001 Paris.

**Migré de Figma Sites → Next.js + Vercel le 17/02/2026.** L'ancien site était 100% JavaScript client-side (non crawlable par les AI bots). Le nouveau est SSR/SSG.

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

## i18n — Architecture bilingue
- **FR = locale par défaut** (pas de préfixe `/fr/` dans l'URL)
- **EN sous `/en/`** avec slugs traduits
- **JSON dictionaries** (`src/dictionaries/fr.json`, `en.json`) — pas de librairie i18n externe
- **React Context** (`useI18n()`) pour passer locale + dict aux composants client
- **Middleware** réécrit `/` → `/fr/` en interne, redirige les slugs mal localisés
- **Reviews Google** restent en français (avis authentiques)

### URLs
```
/                                        → FR (défaut)
/en/                                     → EN
/appartement                             → FR
/en/apartment                            → EN (slug traduit)
/services/fashion-shows                  → FR (same slug)
/en/services/fashion-shows               → EN
/services/petit-dejeuners                → FR
/en/services/corporate-breakfasts        → EN
/services/evenements-professionnels      → FR
/en/services/professional-events         → EN
/services/diners-exception               → FR
/en/services/exceptional-dinners         → EN
/services/evenements-culturels           → FR
/en/services/cultural-events             → EN
/services/seminaires-formations          → FR
/en/services/seminars-training           → EN
/mentions-legales                        → FR
/en/legal-notice                         → EN
/politique-confidentialite               → FR
/en/privacy-policy                       → EN
```

## Structure
```
src/app/
  layout.tsx         # Root layout minimal (globals.css only)
  [locale]/
    layout.tsx       # I18nProvider + GA4/GTM/Clarity/Axeptio + <html lang={locale}>
    page.tsx         # Home — 7 sections + 4 JSON-LD (EventVenue, Organization, LocalBusiness, FAQPage)
    appartement/page.tsx        # L'Appartement Rose (FR)
    apartment/page.tsx          # The Pink Apartment (EN, re-export)
    mentions-legales/page.tsx   # Mentions légales (FR)
    legal-notice/page.tsx       # Legal Notice (EN, re-export)
    politique-confidentialite/page.tsx  # RGPD (FR)
    privacy-policy/page.tsx     # Privacy Policy (EN, re-export)
    not-found.tsx
    error.tsx
    services/[slug]/page.tsx   # Pages services dynamiques (6 FR + 6 EN) — 3 JSON-LD (Service, BreadcrumbList, FAQPage)
  robots.ts          # robots.txt dynamique (AI bots autorisés)
  sitemap.ts         # sitemap.xml (20 URLs: 10 FR + 10 EN avec hreflang)
  globals.css        # Design tokens Tailwind v4

src/components/      # Tous "use client" — utilisent useI18n()
  Header.tsx         # Scroll state + mobile menu + logo swap + language switcher FR/EN
  Footer.tsx         # Liens + infos légales (converti en client component pour i18n)
  HeroSection.tsx    # Parallax + entrance animations
  ServicesSection.tsx # 6 cards + hover effects + liens "En savoir plus" → /services/{slug}
  AboutSection.tsx   # Texte + stats + image (dangerouslySetInnerHTML pour <strong>)
  PortfolioSection.tsx # 3 images + hover overlay
  ReviewsSection.tsx # Google reviews carousel (textes FR, labels i18n) — réutilisé sur pages services
  EquipmentsSection.tsx # Specs techniques + floor plan + downloads
  FaqSection.tsx     # 11 Q&A accordion (données depuis dictionnaires)
  ContactSection.tsx # 4 contacts + CTA Calendly
  AppartementContent.tsx # Page Appartement Rose
  ServicePageContent.tsx # Pages services (hero, specs, features, FAQ accordion, CTA)
  ScrollAnimation.tsx # Wrapper réutilisable whileInView

src/lib/
  i18n.ts            # Config locales, slug mapping (pages + services), getDictionary(), getAlternatePath()
  i18n-context.tsx   # I18nProvider + useI18n() hook (React Context)
  metadata.ts        # Constantes SEO partagées + liens externes
  analytics.ts       # GA4 typed helper + GTM ID
  services-data.ts   # Slugs services FR↔EN, images, resolveServiceSlug()

src/dictionaries/
  fr.json            # Dictionnaire français complet (~700 lignes, incl. servicePages)
  en.json            # Dictionnaire anglais complet (~700 lignes, incl. servicePages)

public/
  llms.txt           # Guide AI crawlers bilingue (GPTBot, ClaudeBot, PerplexityBot)
  documents/
    plaquette-chez-les-plombiers.pdf  # Plaquette commerciale (2.3 MB)
```

## Analytics
- **GA4**: G-P14K1RH61R
- **GTM**: GTM-PXGXK94F
- **Clarity**: vju7iukwc9 (raw `<script>` dans `<head>`, pas `<Script>` Next.js)
- **Axeptio**: 699344885a2a098410f72b36

## URLs externes
- Calendly: https://calendly.com/chezlesplombiers/visite
- Pricing: https://pricing.chezlesplombiers.fr
- WhatsApp: https://wa.me/33688679981
- Instagram: https://instagram.com/chezlesplombiers

## SEO/GEO
- **hreflang**: chaque page a `alternates.languages: { fr, en }` dans `generateMetadata`
- **Canonical**: par langue (chaque version est sa propre canonical)
- **og:locale**: `fr_FR` / `en_US`
- **JSON-LD**: EventVenue, Organization, LocalBusiness, FAQPage (homepage) + Service, BreadcrumbList, FAQPage (pages services) — tous avec `inLanguage`
- **robots.txt**: AI bots (GPTBot, ClaudeBot, PerplexityBot) autorisés
- **sitemap.xml**: 20 URLs (10 FR + 10 EN) avec alternates
- Open Graph + Twitter Cards sur toutes les pages
- **llms.txt**: fichier de guidage AI crawlers bilingue
- **FAQ visible**: 11 Q&A en accordion, synchronisée avec le JSON-LD FAQPage
- **Alt texts enrichis**: descriptions contextuelles sur toutes les images
- **Downloads fonctionnels**: plan (floor-plan.png) + plaquette PDF hébergés sur Vercel

## Pages Services (/services/[slug])
6 services, chacun avec page FR + EN (12 pages total) :
- Fashion Shows (`fashion-shows` / `fashion-shows`)
- Petit-Déjeuners (`petit-dejeuners` / `corporate-breakfasts`)
- Évènements Professionnels (`evenements-professionnels` / `professional-events`)
- Dîners d'Exception (`diners-exception` / `exceptional-dinners`)
- Évènements Culturels (`evenements-culturels` / `cultural-events`)
- Séminaires & Formations (`seminaires-formations` / `seminars-training`)

Structure chaque page : Hero (image + overlay) → Description + Specs (2 cols) → Features (3 cols) → ReviewsSection (réutilisé) → FAQ accordion (3-5 Q&A spécifiques) → CTA (Calendly + WhatsApp + email)

Middleware redirige les slugs mal localisés (ex: `/en/services/petit-dejeuners` → `/en/services/corporate-breakfasts`)

## Architecture Homepage
8 sections dans l'ordre :
1. HeroSection (parallax + vidéo)
2. ServicesSection (6 cards dont Petit Déjeuner)
3. AboutSection (texte + stats + image)
4. PortfolioSection (3 photos + hover)
5. ReviewsSection (Google reviews carousel)
6. EquipmentsSection (specs + downloads + plan)
7. FaqSection (11 Q&A accordion)
8. ContactSection (4 contacts + CTA Calendly)

## Informations légales
- Chez les Plombiers SAS — SIREN 928 788 157
- Capital: 5 000 € — TVA: FR04 928 788 157
- NAF/APE: 82 30Z
