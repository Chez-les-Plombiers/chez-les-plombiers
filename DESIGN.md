# Design System — Chez Les Plombiers (site vitrine)

> Direction : éditorial épuré, industriel chic. Hiérarchie portée par l'**échelle** et les **capitales**, pas par la graisse.

## Typographie

### Titres (h1–h4) — Wix Madefor Display
- **Font** : `Wix Madefor Display` chargée via `next/font/google` dans `src/app/[locale]/layout.tsx` (`weight: ["400"]`, `display: "swap"`, `variable: "--font-wix-madefor"`). Variable posée sur `<html>`.
- **Token** : `--font-display` exposé dans `@theme inline` (globals.css) → `var(--font-wix-madefor), ui-sans-serif, system-ui, sans-serif`.
- **Règle globale** (`@layer base` dans `globals.css`) :
  ```css
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 400;        /* graisse régulière — JAMAIS de bold */
    text-transform: uppercase; /* FULL CAPS partout */
  }
  ```
- **Important** : ne PAS ajouter de classe de poids (`font-light` / `font-medium` / `font-semibold`) sur un titre — une classe utilitaire Tailwind écrase la règle `@layer base` (cascade layers). Les titres restent en 400. La hiérarchie se fait via la **taille** (`text-8xl` héros … `text-2xl` cards) et le tracking.

### Corps de texte
- System font stack (`ui-sans-serif, system-ui, …`) sur `<body>` — inchangé. Max 2 familles (display + system).

### Sous-titres de section
- `text-balance` (`text-wrap: balance`) + largeur contrainte (`max-w-2xl/3xl`) → rendu équilibré sur **≤ 2 lignes**, sans troncature. Appliqué aux `<p>` sous-titres des sections home (Services, Portfolio, FAQ, Équipements, Contact).
- **Pas d'em-dash «—»** dans les sous-titres de section (ponctuation simple).

## Couleurs / tokens
- Définis dans `globals.css` (`:root` + `@theme inline`). Fond blanc, texte `oklch(0.145 0 0)`, surfaces sombres `bg-black` pour Contact/Footer.
- Pas de border-radius marqué (esthétique brute) ; accents via overlays et hover.

## Composants clés
- **Header** (`Header.tsx`) : nav + 2 dropdowns (Nos Espaces / Nos Services). Transparent en haut (texte blanc), blanc au scroll (texte noir). Panneau dropdown toujours sur fond blanc. Voir CLAUDE.md § Header.
- **Galeries services** : bento 3 colonnes par défaut ; **grille paysage 3:2** pour les slugs de `LANDSCAPE_GALLERY_SLUGS` (`diners-exception`, `evenements-culturels`).
- **CTA standardisés** : « Voir les tarifs » (plein) / « Réserver une visite » (outline) / « WhatsApp » (outline) — voir CLAUDE.md.

## Animations
- `Motion` (`motion/react`). Propriétés compositor-friendly (opacity / transform). Respect de `prefers-reduced-motion` (globals.css).

## Conventions
- Téléphone affiché au format international **+33 7 61 47 10 73** (lien WhatsApp `wa.me/33761471073`).
- Orthographe : « Événements » (é) pour les libellés nav/footer ; certains titres de page historiques restent en « Évènements » (è) — à harmoniser au fil de l'eau.
- Images : optimisées avant commit (héros ~2000px, galeries ~1600px, ~300–680 Ko). Jamais d'image source brute (Mo).
