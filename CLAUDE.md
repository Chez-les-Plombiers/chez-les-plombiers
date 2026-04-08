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
- **Vercel Analytics** (`@vercel/analytics`) pour page views
- **DNS**: Gandi (anycast.me NS), A `216.198.79.1`, CNAME www → `afaeb59f7734cb3a.vercel-dns-017.com`
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
/infos                                   → FR (infos pratiques + accès)
/en/info                                 → EN (practical info)
/notre-chef                              → FR (chef partenaire Mathias Rouveure)
/en/our-chef                             → EN (partner chef)
```

## Structure
```
src/app/
  layout.tsx         # Root layout minimal (globals.css only)
  [locale]/
    layout.tsx       # I18nProvider + GA4/GTM/Clarity/Axeptio + <html lang={locale}>
    page.tsx         # Home — 12 sections + 4 JSON-LD (EventVenue, Organization, LocalBusiness, FAQPage)
    appartement/page.tsx        # L'Appartement Rose (FR)
    apartment/page.tsx          # The Pink Apartment (EN, re-export)
    infos/page.tsx              # Infos pratiques + accès (FR) — 3 JSON-LD (EventVenue, FAQPage, BreadcrumbList)
    info/page.tsx               # Practical info (EN, re-export)
    mentions-legales/page.tsx   # Mentions légales (FR) — JSON-LD WebPage + Organization + BreadcrumbList
    legal-notice/page.tsx       # Legal Notice (EN, re-export)
    politique-confidentialite/page.tsx  # RGPD (FR) — JSON-LD PrivacyPolicy + Organization + BreadcrumbList
    privacy-policy/page.tsx     # Privacy Policy (EN, re-export)
    notre-chef/page.tsx         # Chef partenaire Mathias Rouveure (FR)
    our-chef/page.tsx           # Partner chef (EN, re-export)
    not-found.tsx
    error.tsx
    services/[slug]/page.tsx   # Pages services dynamiques (7 FR + 7 EN) — 3 JSON-LD (Service, BreadcrumbList, FAQPage)
  robots.ts          # robots.txt dynamique (AI bots autorisés)
  sitemap.ts         # sitemap.xml (38 URLs: 19 FR + 19 EN avec hreflang)
  globals.css        # Design tokens Tailwind v4

src/components/      # Tous "use client" — utilisent useI18n()
  Header.tsx         # Scroll state + mobile menu + logo swap + language switcher FR/EN
  Footer.tsx         # Liens + infos légales (converti en client component pour i18n)
  HeroSection.tsx    # Parallax + entrance animations
  ServicesSection.tsx # 6 cards grille 3x2 + hover animation (scale, shadow, icon invert) — cartes entièrement cliquables
  AboutSection.tsx   # Texte + stats + image (dangerouslySetInnerHTML pour <strong>)
  PortfolioSection.tsx # 12 photos bento grid (3x8) + lightbox + download (JSZip)
  ReviewsSection.tsx # Google reviews carousel (textes FR, labels i18n) — réutilisé sur pages services + Appartement Rose
  EquipmentsSection.tsx # Specs techniques + floor plan + 4 PDF plans dropdown + plaquette download
  FaqSection.tsx     # 11 Q&A accordion (données depuis dictionnaires)
  ContactSection.tsx # 4 contacts + 3 CTA (Pricing + Calendly + WhatsApp) avec tracking cta_click
  AppartementContent.tsx # Page Appartement Rose (galerie 10 photos bento + lightbox + ZIP download + reviews Google)
  ServicePageContent.tsx # Pages services (hero + 2 CTA, specs, galerie bento, features, reviews, FAQ, cross-links animés, CTA footer)
  InfosContent.tsx   # Page /infos (hero adresse, 4 stats, 6 cards accès, Google Maps embed, 3 cards quartier avec liens cliquables, 4 cards contact, FAQ)
  ui/ripple-button.tsx # Bouton avec effet ripple hover (utilisé dans Hero)
  GuideContent.tsx   # Chat AI concierge multi-turn (streaming, bulles user/assistant, markdown)
  ScrollAnimation.tsx # Wrapper réutilisable whileInView

src/lib/
  i18n.ts            # Config locales, slug mapping (pages + services), getDictionary(), getAlternatePath()
  i18n-context.tsx   # I18nProvider + useI18n() hook (React Context)
  metadata.ts        # Constantes SEO partagées + liens externes
  analytics.ts       # GA4 typed helper + GTM ID — events: cta_click, contact_click, nav_click, section_view, form_submit
  services-data.ts   # Slugs services FR↔EN, images, SERVICE_GALLERY, FEATURED_SERVICE_SLUGS (6), resolveServiceSlug()
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
    plan-chez-les-plombiers.pdf       # Plan du lieu
    cotations-architecte-globales.pdf # Cotations architecte
    vues-mesures.pdf                  # Vues & mesures
    plan-implantation-lumieres.pdf    # Plan implantation lumières
```

## Analytics
- **GA4**: G-P14K1RH61R (property 524917305)
- **GTM**: GTM-PXGXK94F
- **Vercel Analytics**: `@vercel/analytics` (composant `<Analytics />` dans layout)
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
- **JSON-LD**: EventVenue, Organization, LocalBusiness, FAQPage (homepage) + Service, BreadcrumbList, FAQPage (pages services) + EventVenue, LocalBusiness, FAQPage, BreadcrumbList (pages SEO) + EventVenue, FAQPage, BreadcrumbList (/infos) + WebPage, Organization, BreadcrumbList (pages légales) + WebPage (/guide) — tous avec `inLanguage`
- **robots.txt**: AI bots (GPTBot, ClaudeBot, PerplexityBot) autorisés
- **sitemap.xml**: 40 URLs (20 FR + 20 EN) avec alternates, toutes sous `www.`
- Open Graph + Twitter Cards sur toutes les pages
- **llms.txt**: fichier de guidage AI crawlers bilingue (URLs sous `www.`)
- **Meta titles**: keyword-first (ex: "Lieu Évènementiel Paris 1er — 200m² | Chez Les Plombiers")
- **Meta descriptions**: data points + CTA (ex: "Dès 1 000 € HT/jour. Visite gratuite sur rendez-vous.")
- **FAQ visible**: 11 Q&A en accordion, synchronisée avec le JSON-LD FAQPage
- **Alt texts enrichis**: descriptions contextuelles sur toutes les images
- **Downloads fonctionnels**: 4 plans PDF (dropdown) + plaquette PDF hébergés sur Vercel
- **Maillage interne**: cross-links entre pages services, liens Appartement ↔ services, colonne services dans Footer, pages SEO ↔ services
- **Redirections legacy**: /visiter, /histoire → 308 vers anchors homepage (ancien site Figma). `/infos` est désormais une vraie page (créée 07/04/2026 pour capter les requêtes "39 rue des bourdonnais")
- **Redirect slug**: /services/diners-prives → /services/diners-exception (301)
- **Pages SEO (23/03/2026)**: 4 landing pages non-branded avec FAQ 6 Q&A + galerie photos + Reviews Google

## Page /infos (07/04/2026)
Page Infos pratiques + accès créée pour capter les 340 impressions/3 mois GSC sur "39 rue des bourdonnais" (auparavant en 404 sur l'ancienne URL `/infos`).

Structure : Hero (eyebrow + titre + adresse + 2 CTAs Calendly/Maps) → ClientLogosSection light → 4 stats (200m², 150/80, Lun-Sam, 36 KvA) → 6 cards d'accès (Métro Châtelet, RER, Voiture, À pied du Marais, PMR, Aéroports) → Google Maps embed → 3 cards "Le quartier" avec **liens cliquables vers sites officiels** (Restaurants, Hôtels, Lieux emblématiques) → 4 cards Contact dark (Tel/WhatsApp, Email, Adresse, Instagram) → ReviewsSection → FAQ 6 Q&A → ClientLogosSection compact → SeoPagesCrossLinks → CTA final.

Liens externes vérifiés (avril 2026) dans la section neighborhood :
- Restaurants : Frenchie, Verjus, Le Soufflé, Loulou (Tuileries)
- Hôtels : Hôtel du Louvre Hyatt, Hôtel Le Pradey, Hôtel Thérèse, Citadines Les Halles
- Lieux : Louvre, Notre-Dame, Tuileries, Pont Neuf, Westfield Forum des Halles
- ⚠️ Centre Pompidou retiré (fermé pour rénovation 2025-2030)
- ⚠️ Pirouette / Champeaux / Hôtel des Métiers retirés (fermés ou inexistants)

Composant : `InfosContent.tsx` — section neighborhood avec structure `categories[].items[]` (name + url) et tracking `nav_click` sur chaque clic externe (label `infos_neighborhood_<slug>`).

Dict keys : `infos.hero`, `infos.access`, `infos.details`, `infos.contact`, `infos.map`, `infos.neighborhood`, `infos.faq`, `infos.cta`

## Outreach agences événementielles
Pour la campagne B2B "présentation du lieu aux agences" (pas backlinks SEO).

Deux fichiers dans `data/outreach/` :
- `event-agencies-paris.csv` — 122 agences brut (source Google Maps, intact comme backup)
- `event-agencies-paris-clean.csv` — **113 agences** prêtes à l'outreach (08/04/2026)

**Clean pass appliqué le 08/04/2026 :**
- 6 non-cibles retirées (Transitions Pro non-profit, WESTOTEL hotel hors Paris, Home Striptease brand safety, Digitevent SaaS, Office de Tourisme institutionnel, Intercoiffure France syndicat coiffure)
- 3 plateformes de booking retirées (Privateaser, SnapEvent, Kactus) — Chez Les Plombiers est déjà listé dessus
- Nouvelles colonnes : `tier` (1/2/3), `email` (vide, à enrichir)
- Trié par tier asc, review_count desc

**Tier logic :**
- Tier 1 (12) : 200+ avis — hyper-perso recommandée
- Tier 2 (30) : 50-199 avis — semi-perso
- Tier 3 (71) : <50 avis — template générique

**Blocker actuel** : aucun email dans le CSV. Il faut enrichir la colonne `email` avant de pouvoir lancer la séquence. Options : workflow n8n de scraping (fetch /contact + /mentions-legales + Claude extract), Hunter.io, ou recherche manuelle.

**Objectif campagne** : présenter Chez Les Plombiers aux agences pour qu'elles le proposent à leurs clients. Envoi depuis `frederic@chezlesplombiers.fr` via workflow n8n séquentiel sur l'instance `chezlesplombiers.app.n8n.cloud`, avec personnalisation IA par lead, attachement de la plaquette PDF, et follow-ups automatiques.

**Top 12 Tier 1 (à prioriser) :**
L'Antichambre Escape Games Bd Saint-Martin (1355), L'Antichambre Blondel (829), Crazy EVG (596), Jardins du Pont Neuf (445), La Belle Equipe (372), Comet Meetings Victoires (263), Boulotte traiteur (260), Le Scarlett Paris (259), Qui Veut Pister Paris (256), LoL Evènements (242), Potel et Chabot (207), Comet Meetings Bourse (206).

## Pages SEO Landing Pages (racine)
4 pages ciblant le trafic non-branded, chacune avec page FR + EN (8 pages total) :
- Lieu Événementiel Paris (`lieu-evenementiel-paris` / `event-venue-paris`) — page pilier, 10 photos, priority 0.9
- Espace Atypique Paris (`espace-atypique-paris` / `unique-venue-paris`) — angle industriel/unique, 10 photos, Matterport 3D
- Séminaire Entreprise Paris (`seminaire-entreprise-paris` / `corporate-seminar-paris`) — intent corporate, 8 photos
- Shooting Voiture Paris (`shooting-voiture-paris` / `car-photoshoot-paris`) — niche auto, 10 photos portrait, grille aspect-[3/4]

Structure chaque page : Hero (image + overlay + 2 CTA Pricing/Calendly) → Section descriptive (2 cols) → 6 USPs grille 3x2 → Types d'événements (cards avec liens services) → [Matterport 3D si atypique] → Galerie photos + lightbox → ReviewsSection → FAQ accordion (6 Q&A) → CTA footer (Pricing + Calendly + WhatsApp)

Composants : `LieuEvenementielContent.tsx`, `EspaceAtypiqueContent.tsx`, `SeminaireEntrepriseContent.tsx`, `ShootingVoitureContent.tsx`

Dict keys : `lieuEvenementiel`, `espaceAtypique`, `seminaireEntreprise`, `shootingVoiture`

## Pages Services (/services/[slug])
7 services (routes), dont **6 featured** affichés sur homepage/cross-links/footer (Séminaires existe mais non mis en avant) :
- Dîners d'Exception (`diners-exception` / `exceptional-dinners`) — galerie 15 photos
- Fashion Shows (`fashion-shows` / `fashion-shows`) — galerie 24 photos
- Événements Auto & Moto (`evenements-auto-moto` / `automotive-events`) — galerie 23 photos
- Évènements Professionnels (`evenements-professionnels` / `professional-events`)
- Évènements Culturels (`evenements-culturels` / `cultural-events`)
- Petit-Déjeuners (`petit-dejeuners` / `corporate-breakfasts`)
- Séminaires & Formations (`seminaires-formations` / `seminars-training`) — route active mais retiré de homepage/footer/cross-links

Structure chaque page : Hero (image + overlay + 2 CTA Pricing/Calendly) → Description + descriptionExtended + Specs (2 cols) → [Galerie bento + lightbox si photos] → Features (3 cols) → ReviewsSection → FAQ accordion (3-6 Q&A) → Cross-links animés (5 services + Appartement Rose) → CTA footer (Pricing + Calendly + WhatsApp)

**CTA standardisés** sur toutes les pages (services, SEO, homepage) :
- CTA 1 (solid) : "Voir les tarifs" → pricing.chezlesplombiers.fr
- CTA 2 (outline) : "Réserver une visite" → Calendly
- CTA 3 (outline) : "WhatsApp" → wa.me
- Tous trackés en `cta_click` avec label contextuel (ex: `service_hero_pricing`, `lieu_calendly`)

`FEATURED_SERVICE_SLUGS` dans `services-data.ts` = les 6 services affichés (ordre : dîners, fashion, auto, pro, culturels, petits déj)

Middleware redirige les slugs mal localisés (ex: `/en/services/petit-dejeuners` → `/en/services/corporate-breakfasts`)

## Architecture Homepage
12 sections dans l'ordre :
1. HeroSection (parallax + vidéo autoplay avec fallback touch mobile + 2 CTA : "Voir les tarifs" → pricing + "Réserver une visite" → Calendly)
2. ServicesSection (6 cards grille 3x2 + hover animation : Dîners, Fashion, Auto, Pro, Culturels, Petits Déj)
3. SeoLandingPagesSection (cards des 4 pages SEO non-branded)
4. ClientLogosSection static (grille statique dark — 20 logos clients)
5. VirtualTour (iframe Matterport 3D — https://my.matterport.com/show/?m=ucvB4GW2Go6)
6. AboutSection (texte + stats + image)
7. PortfolioSection ("Découvrez Notre Lieu" — 12 photos bento grid + lightbox + download individuel/ZIP)
8. EquipmentsSection (specs + downloads + plan)
9. FaqSection (11 Q&A accordion)
10. ReviewsSection (Google reviews grille 3x3 + lien "Voir plus d'avis sur Google") — déplacée sous la FAQ le 07/04/2026
11. InstagramFeed
12. ContactSection (4 contacts + 2 CTA : "Voir les tarifs" → pricing + "Réserver une visite" → Calendly)

### CTA buttons (Hero + Contact) — tous trackés `cta_click`
- **"Voir les tarifs"** : bouton plein (bg-white) → `pricing.chezlesplombiers.fr` (external)
- **"Réserver une visite"** : bouton outline (border-white) → `calendly.com/chezlesplombiers/visite` (external)
- **"WhatsApp"** : bouton outline (Contact uniquement) → `wa.me/33688679981`
- Labels i18n : `header.ctaQuote` / `hero.cta` dans les dictionnaires FR/EN

### Footer (4 colonnes)
- Colonne 1 : Logo + description
- Colonne 2 : Navigation (Accueil, Appartement, Mentions, Confidentialité)
- Colonne 3 : Nos Espaces (6 services + 4 pages SEO + Studio + Notre Chef + Appartement Rose)
- Colonne 4 : Contact (WhatsApp `wa.me/33688679981`, email, adresse)

### Header — menu nav
Items dans l'ordre : Pricing (external) → Photos (#portfolio) → Infos Techniques (#equipments) → Studio → **Notre Chef** (`/notre-chef`) → L'Appartement Rose (`/appartement`) → langue switcher FR/EN.

Tous les `menuItems` sont définis dans `dict.header.menuItems` (FR/EN). Le bouton Pricing est externe (URL réécrite via `EXTERNAL_LINKS.pricing`).

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
