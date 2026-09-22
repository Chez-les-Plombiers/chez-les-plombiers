/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LES IMAGES DE PARTAGE — ce qu'on voit quand on colle un lien dans WhatsApp
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   node gen-og.mjs
 *
 * ── POURQUOI CE SCRIPT EXISTE ─────────────────────────────────────────────
 *
 * Avant lui, les onze pages du site partageaient UNE SEULE image : un PNG de
 * 4032 × 2268 pesant 1,8 Mo, déclaré dans le HTML comme faisant 1200 × 630.
 * Trois défauts qui s'additionnent :
 *
 *   1. Envoyer `/appartement` affichait une photo de L'ATELIER. Le lien ne
 *      montrait pas le lieu dont il parlait — exactement l'inverse de ce
 *      qu'un aperçu sert à faire.
 *   2. 1,8 Mo : WhatsApp renonce bien avant, et n'affiche alors aucune image.
 *      C'est le défaut le plus coûteux, parce qu'il est invisible côté
 *      expéditeur — Étienne voyait l'aperçu depuis son cache, pas le client.
 *   3. Ratio 1,78 au lieu de 1,91 : le peu qui passait était recadré.
 *
 * ── POURQUOI DES FICHIERS STATIQUES, ET PAS `ImageResponse` ───────────────
 *
 * ⚠️ Next sait fabriquer ces images à la volée (`opengraph-image.tsx`). On ne
 * s'en sert pas. Le 22/09/2026, le quota de transformations d'images du plan
 * Hobby a été épuisé et TOUTES les images du site sont tombées en 402. Une
 * image de partage doit être le dernier fichier du site à dépendre d'un
 * quota : elle est demandée par des robots qu'on ne contrôle pas, en rafale,
 * au pire moment — quand un lien circule. Un JPEG dans `public/` ne peut pas
 * échouer. Voir `NOTES-REFONTE.md`, incident du 22/09.
 *
 * ── LA COMPOSITION ────────────────────────────────────────────────────────
 *
 * Le bandeau blanc des key visuals Instagram, tranché par Étienne le
 * 20/09/2026 : photo en haut, bande blanche en dessous, monogramme à gauche,
 * trois lignes de capitales très espacées. On ne réinvente pas une identité
 * par-dessus celle qui tourne déjà sur le compte.
 *
 * ⚠️ LA TYPO EST CELLE DU SITE, pas une approximation. `src/fonts/*.ttf` est
 * donné à sharp par un fichier fontconfig temporaire — la police n'est PAS
 * installée sur le Mac, rien n'est modifié en dehors de ce dossier.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const RACINE = import.meta.dirname;
const SORTIE = path.join(RACINE, "public/og");

/* Le format qu'attendent WhatsApp, iMessage, Slack et les cartes Twitter. */
const L = 1200;
const H = 630;
const BANDE = 168; // hauteur du bandeau blanc
const MARGE = 52;

const BLANC = "#F2F0EC"; // le blanc cassé de la DA, qui fait écho au sol de L'ATELIER
const ENCRE = "#141414";
const GRIS = "#6E6A64";

/**
 * ⚠️ TROIS LIGNES, TOUJOURS, ET DANS CET ORDRE : le nom, la surface avec
 * l'adresse, puis la situation avec l'arrondissement. C'est la grille des
 * visuels Instagram. Une quatrième ligne, ou une ligne manquante, et l'aperçu
 * ne se lit plus comme les leurs.
 */
const VISUELS = [
  /*
   * ⚠️ `defaut.jpg` N'EST PLUS FABRIQUÉ ICI — NE PAS LE REMETTRE DANS CETTE
   * LISTE. Il l'était, au bandeau blanc comme les autres ; depuis le
   * 22/09/2026 c'est le triptyque d'Inès, et il a son propre script,
   * `gen-vignette.mjs`. Les deux écrivent dans `public/og/` : rajouter une
   * entrée « defaut » ici écraserait silencieusement le triptyque au prochain
   * passage, sans message d'erreur, et personne ne ferait le lien.
   *
   * Les visuels ci-dessous restent au bandeau : ils montrent UN lieu, et le
   * bandeau porte sa surface et sa situation. Le triptyque, lui, en montre
   * trois — il n'a pas de surface unique à annoncer.
   */
  {
    fichier: "atelier",
    photo: "public/photos/lieu/atelier-kv.jpg",
    lignes: ["L'Atelier", "200 m² — 39 rue des Bourdonnais", "Au fond de la cour — Paris 1er"],
  },
  {
    fichier: "boutique",
    photo: "public/photos/boutique/tuile-2.jpg",
    lignes: ["La Boutique", "40 m² — 39 rue des Bourdonnais", "Vitrine sur rue — Paris 1er"],
  },
  {
    fichier: "appartement",
    photo: "public/photos/galerie/lieu-appartement/014.webp",
    lignes: ["L'Appartement", "100 m² — 39 rue des Bourdonnais", "Premier étage — Paris 1er"],
  },
  {
    fichier: "photos",
    photo: "public/photos/lieu/photo-01.jpg",
    lignes: ["Photos", "Ce qui s'y est passé — 39 rue des Bourdonnais", "Paris 1er"],
  },
];

/* ── La police, sans rien installer sur la machine ─────────────────────── */
const fc = mkdtempSync(path.join(tmpdir(), "clp-og-"));
writeFileSync(
  path.join(fc, "fonts.conf"),
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>
  <dir>${path.join(RACINE, "src/fonts")}</dir>
  <dir>/System/Library/Fonts</dir>
  <dir>/Library/Fonts</dir>
  <cachedir>${path.join(fc, "cache")}</cachedir>
</fontconfig>`,
);
process.env.FONTCONFIG_FILE = path.join(fc, "fonts.conf");

const echapper = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "’");

/**
 * Le bandeau, en SVG.
 *
 * ⚠️ `textLength` n'est PAS utilisé pour justifier les lignes. L'interlettrage
 * de la DA est constant d'une ligne à l'autre ; étirer chaque ligne sur la
 * même largeur donnerait trois espacements différents et casserait justement
 * ce qui fait l'identité du visuel.
 */
function bandeau([titre, surface, situation], largeurMono) {
  const x = MARGE + largeurMono + 44;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${BANDE}">
  <rect width="${L}" height="${BANDE}" fill="${BLANC}"/>
  <g font-family="Eurostile ExtendedTwo" text-transform="uppercase">
    <text x="${x}" y="64"  font-size="30" font-weight="bold" letter-spacing="7.5" fill="${ENCRE}">${echapper(titre.toUpperCase())}</text>
    <text x="${x}" y="103" font-size="17" letter-spacing="4.2" fill="${ENCRE}">${echapper(surface.toUpperCase())}</text>
    <text x="${x}" y="131" font-size="17" letter-spacing="4.2" fill="${GRIS}">${echapper(situation.toUpperCase())}</text>
  </g>
</svg>`);
}

mkdirSync(SORTIE, { recursive: true });

const monoH = 52;
const mono = await sharp(path.join(RACINE, "public/images/logo/monogramme-noir.png"))
  .resize({ height: monoH })
  .toBuffer();
const monoL = (await sharp(mono).metadata()).width;

for (const v of VISUELS) {
  /*
   * ⚠️ `cover` + `position: attention` : sharp recadre là où l'image a le plus
   * de contraste, plutôt qu'au centre géométrique. Sur une photo de lieu, le
   * centre est souvent un mur vide.
   */
  const photo = await sharp(path.join(RACINE, v.photo))
    .resize(L, H - BANDE, { fit: "cover", position: sharp.strategy.attention })
    .toBuffer();

  const sortie = path.join(SORTIE, `${v.fichier}.jpg`);
  await sharp({ create: { width: L, height: H, channels: 3, background: BLANC } })
    .composite([
      { input: photo, top: 0, left: 0 },
      { input: bandeau(v.lignes, monoL), top: H - BANDE, left: 0 },
      { input: mono, top: H - BANDE + (BANDE - monoH) / 2, left: MARGE },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(sortie);

  const ko = Math.round(statSync(sortie).size / 1024);
  console.log(`  ${`${v.fichier}.jpg`.padEnd(20)} ${L}×${H}  ${ko} Ko   ${v.lignes[0]}`);
}

rmSync(fc, { recursive: true, force: true });
console.log(`\n✅ ${VISUELS.length} images dans public/og/`);
