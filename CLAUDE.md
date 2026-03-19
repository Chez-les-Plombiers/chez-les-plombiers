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
- **DNS**: Gandi (anycast.me NS), A `76.76.21.21`, CNAME www → `cname.vercel-dns.com`
- **Domaines Vercel**: `www.chezlesplombiers.fr` (principal) + `chezlesplombiers.fr` (redirect → www)

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
/services/evenements-auto-moto           → FR
/en/services/automotive-events           → EN
/mentions-legales                        → FR
/en/legal-notice                         → EN
/politique-confidentialite               → FR
/en/privacy-policy                       → EN
/guide                                   → FR (chatbot AI concierge)
/en/guide                                → EN (chatbot AI concierge)
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
    services/[slug]/page.tsx   # Pages services dynamiques (7 FR + 7 EN) — 3 JSON-LD (Service, BreadcrumbList, FAQPage)
  robots.ts          # robots.txt dynamique (AI bots autorisés)
  sitemap.ts         # sitemap.xml (22 URLs: 11 FR + 11 EN avec hreflang)
  globals.css        # Design tokens Tailwind v4

src/components/      # Tous "use client" — utilisent useI18n()
  Header.tsx         # Scroll state + mobile menu + logo swap + language switcher FR/EN
  Footer.tsx         # Liens + infos légales (converti en client component pour i18n)
  HeroSection.tsx    # Parallax + entrance animations
  ServicesSection.tsx # 7 cards + hover effects + liens "En savoir plus" → /services/{slug}
  AboutSection.tsx   # Texte + stats + image (dangerouslySetInnerHTML pour <strong>)
  PortfolioSection.tsx # 12 photos bento grid (3x8) + lightbox + download (JSZip)
  ReviewsSection.tsx # Google reviews carousel (textes FR, labels i18n) — réutilisé sur pages services + Appartement Rose
  EquipmentsSection.tsx # Specs techniques + floor plan + downloads
  FaqSection.tsx     # 11 Q&A accordion (données depuis dictionnaires)
  ContactSection.tsx # 4 contacts + CTA Calendly
  AppartementContent.tsx # Page Appartement Rose (galerie 10 photos bento + lightbox + ZIP download + reviews Google)
  ServicePageContent.tsx # Pages services (hero, specs, features, galerie bento + lightbox, FAQ accordion, CTA)
  GuideContent.tsx   # Chat AI concierge multi-turn (streaming, bulles user/assistant, markdown)
  ScrollAnimation.tsx # Wrapper réutilisable whileInView

src/lib/
  i18n.ts            # Config locales, slug mapping (pages + services), getDictionary(), getAlternatePath()
  i18n-context.tsx   # I18nProvider + useI18n() hook (React Context)
  metadata.ts        # Constantes SEO partagées + liens externes
  analytics.ts       # GA4 typed helper + GTM ID
  services-data.ts   # Slugs services FR↔EN, images, SERVICE_GALLERY, resolveServiceSlug()
  guide-knowledge.ts # Knowledge base AI concierge (system prompt FR/EN + infos lieu)

src/dictionaries/
  fr.json            # Dictionnaire français complet (~800 lignes, incl. servicePages)
  en.json            # Dictionnaire anglais complet (~800 lignes, incl. servicePages)

public/
  llms.txt           # Guide AI crawlers bilingue (GPTBot, ClaudeBot, PerplexityBot)
  photos/            # 12 photos portfolio (JPG, ~250-430 KB chacune, 1800px wide)
  photos/appartement/ # 10 photos Appartement Rose (JPG, ~400-680 KB, 1800px wide)
  images/services/gallery/  # Galeries photos services (JPG, ~340 KB, 1600px wide)
    diners-exception/       # 15 photos
    fashion-shows/          # 24 photos
    evenements-auto-moto/   # 23 photos
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
- **SITE_URL**: `https://www.chezlesplombiers.fr` (canonical www, non-www redirige 308)
- **hreflang**: chaque page a `alternates.languages: { fr, en }` dans `generateMetadata`
- **Canonical**: par langue (chaque version est sa propre canonical), toutes sous `www.`
- **og:locale**: `fr_FR` / `en_US`
- **JSON-LD**: EventVenue, Organization, LocalBusiness, FAQPage (homepage) + Service, BreadcrumbList, FAQPage (pages services) — tous avec `inLanguage`
- **robots.txt**: AI bots (GPTBot, ClaudeBot, PerplexityBot) autorisés
- **sitemap.xml**: 22 URLs (11 FR + 11 EN) avec alternates, toutes sous `www.`
- Open Graph + Twitter Cards sur toutes les pages
- **llms.txt**: fichier de guidage AI crawlers bilingue (URLs sous `www.`)
- **Meta titles**: keyword-first (ex: "Lieu Évènementiel Paris 1er — 200m² | Chez Les Plombiers")
- **Meta descriptions**: data points + CTA (ex: "Dès 1 000 € HT/jour. Visite gratuite sur rendez-vous.")
- **FAQ visible**: 11 Q&A en accordion, synchronisée avec le JSON-LD FAQPage
- **Alt texts enrichis**: descriptions contextuelles sur toutes les images
- **Downloads fonctionnels**: plan (floor-plan.png) + plaquette PDF hébergés sur Vercel
- **Maillage interne**: cross-links entre pages services, liens Appartement ↔ services, colonne services dans Footer
- **Redirections legacy**: /visiter, /histoire, /infos → 301 vers anchors homepage (ancien site Figma)

## Pages Services (/services/[slug])
7 services, chacun avec page FR + EN (14 pages total) :
- Fashion Shows (`fashion-shows` / `fashion-shows`) — galerie 24 photos
- Petit-Déjeuners (`petit-dejeuners` / `corporate-breakfasts`)
- Évènements Professionnels (`evenements-professionnels` / `professional-events`)
- Dîners d'Exception (`diners-exception` / `exceptional-dinners`) — galerie 15 photos
- Évènements Culturels (`evenements-culturels` / `cultural-events`)
- Séminaires & Formations (`seminaires-formations` / `seminars-training`)
- Événements Auto & Moto (`evenements-auto-moto` / `automotive-events`) — galerie 23 photos

Structure chaque page : Hero (image + overlay) → Description + descriptionExtended + Specs (2 cols) → Features (3 cols) → [Galerie bento + lightbox si photos] → ReviewsSection (réutilisé) → FAQ accordion (3-5 Q&A spécifiques) → Cross-links (6 autres services + Appartement Rose) → CTA (Calendly + WhatsApp + email)

Chaque service a un champ `descriptionExtended` (~100 mots) en plus de `description` (~70 mots) pour enrichir le contenu SEO (total ~180 mots par page).

Middleware redirige les slugs mal localisés (ex: `/en/services/petit-dejeuners` → `/en/services/corporate-breakfasts`)

## Architecture Homepage
9 sections dans l'ordre :
1. HeroSection (parallax + vidéo autoplay avec fallback touch mobile + 2 CTA : "Voir les tarifs" → pricing + "Réserver une visite" → Calendly)
2. ServicesSection (7 cards dont Petit Déjeuner et Auto & Moto)
3. VirtualTour (iframe Matterport 3D — https://my.matterport.com/show/?m=ucvB4GW2Go6)
4. AboutSection (texte + stats + image)
5. PortfolioSection ("Découvrez Notre Lieu" — 12 photos bento grid + lightbox + download individuel/ZIP)
6. ReviewsSection (Google reviews grille 3x3 + lien "Voir plus d'avis sur Google")
7. EquipmentsSection (specs + downloads + plan)
8. FaqSection (11 Q&A accordion)
9. ContactSection (4 contacts + 2 CTA : "Voir les tarifs" → pricing + "Réserver une visite" → Calendly)

### CTA buttons (Hero + Contact)
- **"Voir les tarifs"** : bouton plein (bg-white) → `pricing.chezlesplombiers.fr` (external)
- **"Réserver une visite"** : bouton outline (border-white) → `calendly.com/chezlesplombiers/visite` (external)
- Labels i18n : `header.ctaQuote` / `hero.cta` dans les dictionnaires FR/EN

### Footer (4 colonnes)
- Colonne 1 : Logo + description
- Colonne 2 : Navigation (Accueil, Appartement, Mentions, Confidentialité)
- Colonne 3 : Nos Espaces (7 services + Studio + Appartement Rose)
- Colonne 4 : Contact (WhatsApp `wa.me/33688679981`, email, adresse)

## Guide AI Concierge (/guide)
Page chatbot pour les clients ayant réservé le lieu. Interface de chat multi-turn avec streaming.

- **Route API** : `/api/guide` (POST) — envoie l'historique de conversation à Claude Haiku 4.5
- **Knowledge base** : `src/lib/guide-knowledge.ts` — system prompt FR/EN avec toutes les infos pratiques du lieu
- **Composant** : `GuideContent.tsx` — chat avec bulles user/assistant, suggestions initiales, markdown riche
- **Règles du chatbot** :
  - Vouvoiement obligatoire (FR), ton formel poli (EN)
  - WhatsApp toujours en lien cliquable → `wa.me/33688679981`
  - Réponses uniquement sur le lieu et son utilisation pratique
  - Max 20 turns de conversation
- **Infos renseignées** : grille/portail cour (code 5409), Wi-Fi (2 réseaux), éclairage (Kiosc, 5 scénarios, mode custom), cuisine (café, lave-vaisselle, verres), sono (Sonos + XLR via UCP), chauffage (Daikin), vidéoprojecteur (Optoma ZU820T, fiche technique complète), poubelles tri, vestiaire, toilettes, fin d'événement
- **Infos encore manquantes** : couvre-feu bruit, responsable du lieu (nom + tel)

## Informations légales
- Chez les Plombiers SAS — SIREN 928 788 157
- Capital: 5 000 € — TVA: FR04 928 788 157
- NAF/APE: 82 30Z
