# Audit Google Analytics & Search Console — Chez Les Plombiers

**Date** : 22 mars 2026
**Site** : https://www.chezlesplombiers.fr
**Stack** : Next.js 16, App Router, SSG/SSR

---

## 1. Google Analytics (GA4) — G-P14K1RH61R

### 1.1 Chargement des scripts

| Script | Stratégie | Fichier |
|--------|-----------|---------|
| GTM (GTM-PXGXK94F) | `afterInteractive` via `<Script>` | `src/app/[locale]/layout.tsx` |
| GA4 gtag.js | `afterInteractive` via `<Script>` | `src/app/[locale]/layout.tsx` |
| GA4 config | `afterInteractive` via `<Script>` | `src/app/[locale]/layout.tsx` |
| Clarity (vju7iukwc9) | `dangerouslySetInnerHTML` (raw `<script>`) | `src/app/[locale]/layout.tsx` |
| Axeptio (699344885a2a098410f72b36) | `lazyOnload` via `<Script>` | `src/app/[locale]/layout.tsx` |

**Preconnect** : `<link rel="preconnect" href="https://www.googletagmanager.com" />` — OK

### 1.2 Typage TypeScript

`src/lib/analytics.ts` déclare proprement `window.gtag` et `window.dataLayer` avec des types stricts. La fonction `trackEvent<T>()` utilise des generics pour mapper chaque event name à ses paramètres. **Bien fait.**

### 1.3 Suivi des pages vues (Pageviews)

- `gtag('config', 'G-P14K1RH61R')` active le suivi automatique GA4 des pageviews.
- **Pas de tracking SPA custom** (pas de `usePathname()` + `gtag('event', 'page_view')`).
- GA4 Enhanced Measurement gère normalement les navigations SPA côté client, mais cela **dépend de la config dans l'interface GA4**.

### 1.4 Événements personnalisés (Custom Events)

| Événement | Défini | Implémenté | Composants |
|-----------|--------|------------|------------|
| `contact_click` | ✅ | ✅ | `ContactSection.tsx`, `ServicePageContent.tsx` |
| `cta_click` | ✅ | ❌ Non utilisé | — |
| `section_view` | ✅ | ❌ Non utilisé | — |
| `nav_click` | ✅ | ❌ Non utilisé | — |

**Constat** : seul `contact_click` est réellement tracké. 3 types d'événements sont définis mais jamais appelés.

### 1.5 Points non trackés (manques critiques)

| Action utilisateur | Tracking | Impact business |
|--------------------|----------|-----------------|
| Clic CTA Hero "Voir les tarifs" | ❌ | **Élevé** — conversion principale |
| Clic CTA Hero "Réserver une visite" | ❌ | **Élevé** — conversion principale |
| Clic CTA Footer "Voir les tarifs" | ❌ | **Élevé** |
| Clic CTA Footer "Réserver une visite" | ❌ | **Élevé** |
| Navigation Header (liens) | ❌ | Moyen |
| Clic service cards (ServicesSection) | ❌ | Moyen |
| Ouverture lightbox photo (Portfolio) | ❌ | Faible |
| Download ZIP photos | ❌ | Faible |
| Download plaquette PDF | ❌ | Moyen |
| Download plan (floor plan) | ❌ | Faible |
| Scroll sections (section_view) | ❌ | Moyen — comprendre l'engagement |
| Language switcher FR/EN | ❌ | Faible |
| FAQ accordion ouverture | ❌ | Faible |
| CTA services pages (Calendly/WhatsApp/Email) | ✅ | — |
| Contact section clics | ✅ | — |

### 1.6 Consent Management (RGPD)

| Critère | Statut | Détail |
|---------|--------|--------|
| CMP Axeptio intégré | ✅ | Client ID: `699344885a2a098410f72b36` |
| GA4/GTM chargés AVANT consentement | ⚠️ **Problème** | Scripts `afterInteractive`, Axeptio `lazyOnload` |
| Google Consent Mode v2 | ❌ **Absent** | Pas de `gtag('consent', 'default', {...})` |
| Axeptio cookiesVersion localisé | ⚠️ | Hardcodé `"chezlesplombiers-fr"` pour FR et EN |

**Risque RGPD** : GA4 et GTM se chargent et collectent des données avant qu'Axeptio n'ait recueilli le consentement. Il faudrait :
1. Implémenter **Google Consent Mode v2** (requis depuis mars 2024)
2. Configurer `gtag('consent', 'default', { analytics_storage: 'denied' })` au chargement
3. Laisser Axeptio mettre à jour le consentement via `gtag('consent', 'update', {...})`

### 1.7 Clarity

- Utilise `dangerouslySetInnerHTML` au lieu de `<Script>` de Next.js.
- Pas de blocage par consentement non plus.
- **Recommandation** : migrer vers `<Script strategy="afterInteractive">` et conditionner au consentement.

---

## 2. Google Tag Manager (GTM) — GTM-PXGXK94F

### 2.1 Implémentation

- Snippet standard dans `<head>` via `<Script>` — ✅
- `<noscript>` iframe dans `<body>` — ✅
- DataLayer initialisé — ✅

### 2.2 Questions à vérifier dans l'interface GTM

- [ ] Tags GA4 configurés dans GTM ? (ou double comptage avec gtag.js direct)
- [ ] Tags Clarity configurés dans GTM ? (ou chargé en doublon)
- [ ] Triggers de consentement Axeptio configurés ?
- [ ] Conversion tracking (Google Ads) configuré ?
- [ ] Enhanced Conversions activé ?

**Risque de double comptage** : GA4 est chargé DEUX FOIS — une fois via `gtag.js` direct, et potentiellement une seconde fois via GTM si un tag GA4 y est configuré. **Vérifier dans GTM.**

---

## 3. Google Search Console — Audit SEO Technique

### 3.1 Vérification du site

| Critère | Statut |
|---------|--------|
| Meta tag `google-site-verification` | ❌ **Absent** |
| Fichier de vérification HTML | ❌ Non trouvé |
| Vérification DNS | ❓ À vérifier chez Gandi |

**Action requise** : ajouter la vérification GSC (meta tag dans layout.tsx ou vérification DNS).

### 3.2 Sitemap (`/sitemap.xml`)

| Critère | Statut | Détail |
|---------|--------|--------|
| Sitemap dynamique | ✅ | `src/app/sitemap.ts` |
| Nombre d'URLs | 27 | 2 home + 2 appart + 2 studio + 2 chef + 3 légal + 14 services + 2 légal EN |
| Alternates hreflang | ✅ | Paires FR/EN pour chaque page |
| baseUrl www | ✅ | `https://www.chezlesplombiers.fr` |
| lastModified | ⚠️ | `new Date()` — change à chaque build, pas optimal pour le crawl budget |
| changeFrequency | ✅ | `monthly` |
| Priority | ✅ | 1.0 (home) → 0.8 (pages) → 0.7 (services) |
| Pages `/guide` incluses | ✅ Non | Correct, elles sont `noindex` |

**Recommandation** : utiliser des dates fixes ou basées sur `git log` pour `lastModified` au lieu de `new Date()`.

### 3.3 Robots.txt (`/robots.txt`)

```
User-agent: *
Allow: /*

Sitemap: https://www.chezlesplombiers.fr/sitemap.xml
```

- AI bots explicitement autorisés (GPTBot, ClaudeBot, PerplexityBot) — ✅
- Pas de Disallow inutile — ✅
- Référence sitemap correcte — ✅

### 3.4 Metadata par page

| Page | generateMetadata | Canonical | hreflang | OG | Twitter | JSON-LD |
|------|-----------------|-----------|----------|-----|---------|---------|
| Homepage | ⚠️ Layout only | ✅ | ✅ | ✅ | ✅ | 4 schemas |
| Appartement | ✅ | ✅ | ✅ | ✅ | ✅ | 2 schemas |
| Studio | ✅ | ✅ | ✅ | ✅ | ✅ | 3 schemas |
| Notre Chef | ✅ | ✅ | ✅ | ✅ | ✅ | 3 schemas |
| Services (×14) | ✅ | ✅ | ✅ | ✅ | ✅ | 3 schemas |
| Mentions légales | ✅ | ✅ | ✅ | — | — | — (noindex) |
| Politique conf. | ✅ | ✅ | ✅ | — | — | — (noindex) |
| Guide | ✅ | ✅ | ✅ | — | — | — (noindex) |

**Note Homepage** : la homepage n'exporte pas son propre `generateMetadata` — elle hérite du layout parent. Ce n'est pas bloquant car le layout génère des metadata dynamiques basées sur les dictionnaires, mais un export explicite donnerait plus de contrôle.

### 3.5 JSON-LD (Données structurées)

| Schema | Page(s) | Statut |
|--------|---------|--------|
| EventVenue | Home, Appartement, Studio | ✅ |
| Organization | Home | ✅ |
| LocalBusiness | Home | ✅ |
| FAQPage | Home, Services, Studio | ✅ |
| Service | Services (×14) | ✅ |
| BreadcrumbList | Appart, Services, Studio, Chef | ✅ |
| Person | Chef | ✅ |
| FoodService | Chef | ✅ |

**Complet et bien structuré.** Tous les schemas ont `inLanguage`, adresse, et données de contact.

### 3.6 Redirections & Canonicalisation

| Règle | Statut |
|-------|--------|
| non-www → www (308) | ✅ `next.config.ts` |
| vercel.app → www (308) | ✅ `next.config.ts` |
| Slugs mal localisés (301) | ✅ `middleware.ts` |
| Legacy paths (/visiter, /photos…) | ✅ 301 → anchors homepage |
| GSC 404 fixes (/lieu, /en/fr) | ✅ 301 → home |

### 3.7 Headers de sécurité

- `X-Content-Type-Options: nosniff` — ✅
- `X-Frame-Options: DENY` — ✅
- `Referrer-Policy: strict-origin-when-cross-origin` — ✅
- `Permissions-Policy` (camera/micro/geo disabled) — ✅
- PDFs : `X-Robots-Tag: noindex, nofollow` — ✅

---

## 4. Résumé des actions prioritaires

### Priorité haute (impact business / conformité)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | **Implémenter Google Consent Mode v2** | RGPD + données GA4 modélisées | Moyen |
| 2 | **Tracker les CTA Hero** (tarifs + visite) | Mesurer les conversions principales | Faible |
| 3 | **Vérifier double comptage GA4** (gtag.js + GTM) | Données faussées si doublon | Faible (config GTM) |
| 4 | **Ajouter vérification GSC** | Accès Search Console | Faible |

### Priorité moyenne (amélioration tracking)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 5 | Tracker les clics service cards | Comprendre intérêt par service | Faible |
| 6 | Tracker les CTA Footer | Attribution complète | Faible |
| 7 | Implémenter `section_view` (scroll tracking) | Engagement utilisateur | Faible |
| 8 | Tracker download plaquette PDF | Mesurer intérêt commercial | Faible |
| 9 | Localiser `cookiesVersion` Axeptio (FR/EN) | Consentement correct par langue | Faible |
| 10 | `lastModified` sitemap basé sur dates réelles | Optimisation crawl budget | Faible |

### Priorité basse (nice to have)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 11 | Migrer Clarity vers `<Script>` Next.js | Cohérence technique | Faible |
| 12 | Tracker lightbox, ZIP downloads, FAQ accordion | Analytics avancés | Moyen |
| 13 | Tracker language switcher | Comprendre audience EN | Faible |
| 14 | `generateMetadata` explicite sur la homepage | Contrôle SEO fin | Faible |

---

## 5. Checklist Search Console

À vérifier manuellement dans l'interface GSC :

- [ ] Propriété `https://www.chezlesplombiers.fr` ajoutée et vérifiée
- [ ] Sitemap soumis (`/sitemap.xml`)
- [ ] Aucune erreur d'indexation (Coverage report)
- [ ] Pages en statut "Valide" pour les 22+ URLs publiques
- [ ] Aucune erreur de données structurées (Rich Results)
- [ ] Core Web Vitals acceptables (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Mobile Usability : pas d'erreurs
- [ ] Aucune action manuelle
- [ ] Liens internes correctement détectés
- [ ] Requêtes de recherche pertinentes (événementiel Paris, lieu privatisable…)

---

*Audit réalisé par analyse statique du code source. Les vérifications côté interface GA4, GTM et GSC doivent être faites manuellement.*
