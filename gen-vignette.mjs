/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LA VIGNETTE DES TROIS LIEUX — d'après la composition d'Inès
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   node gen-vignette.mjs            → les variantes, dans .vignettes/
 *   node gen-vignette.mjs --poser    → écrit la variante `a` dans public/og/
 *
 * ── POURQUOI ON LA REFABRIQUE PLUTÔT QUE D'UTILISER SON FICHIER ───────────
 *
 * Inès a composé `MINIATURE WEB.psd` : trois panneaux verticaux, un par lieu,
 * le logotype au centre. La composition est juste — elle dit en une image ce
 * qu'une phrase met trois lignes à expliquer : il y a trois lieux, et les
 * voici. On la reprend telle quelle.
 *
 * ⚠️ MAIS LE DOCUMENT NE FAIT QUE 831 × 438. Ce n'est pas le JPEG exporté qui
 * est petit, c'est le PSD lui-même — il n'existe donc aucune version plus
 * grande à récupérer. Or WhatsApp, iMessage et LinkedIn attendent 1200 × 630
 * pour servir une grande carte. Agrandir de 1,44× ramollit le logotype, qui
 * est la seule chose nette de l'image.
 *
 * On reconstruit donc à la bonne taille, à partir des photos d'origine du
 * dépôt et du logotype vectorisé. Même composition, même cadrage, mais net —
 * et surtout, la ligne du bas redevient modifiable.
 *
 * ── LES TROIS PHOTOS ──────────────────────────────────────────────────────
 *
 * Identifiées en comparant chaque panneau du PSD aux photos du dépôt. Ce sont
 * les mêmes prises de vue, en pleine résolution.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const RACINE = import.meta.dirname;
const POSER = process.argv.includes("--poser");
const SORTIE = POSER
  ? path.join(RACINE, "public/og")
  : path.join(RACINE, ".vignettes");

const L = 1200;
const H = 630;

/**
 * Les trois panneaux, dans l'ordre d'Inès : L'ATELIER, LA BOUTIQUE,
 * L'APPARTEMENT. C'est aussi l'ordre de la façade et celui du site — du fond
 * de la cour vers la rue, puis l'étage.
 */
/*
 * ⚠️ CHAQUE PANNEAU PORTE SON ANCRAGE VERTICAL. Un panneau fait 400 × 630
 * (0,63) découpé dans une photo en 3:2 : on jette les deux tiers de la
 * largeur, et le choix de la bande retenue décide de tout. Centré, L'ATELIER
 * montrait surtout son plafond et coupait le canapé rose — le seul objet
 * mémorable de la pièce, et celui qu'Inès avait mis en avant.
 *
 * ⚠️ L'ANCRAGE EST HORIZONTAL, ET C'EST CONTRE-INTUITIF. Un panneau fait
 * 400 × 630, soit un rapport de 0,63 ; les photos sources sont en 3:2 ou 4:3,
 * donc BIEN PLUS LARGES que hautes. Pour remplir le panneau, l'image est mise
 * à la hauteur — et c'est alors la largeur qui déborde de plus du double. Il
 * n'y a aucune marge verticale à régler : tout se joue sur la bande verticale
 * qu'on choisit dans la largeur.
 *
 * J'ai d'abord réglé la verticale, ce qui ne pouvait rien donner — et pire,
 * mon calcul étirait une bande de 267 px sur 630. Le poids du fichier est ce
 * qui l'a trahi : 105 Ko devenus 65, parce qu'une image étirée n'a plus de
 * détail à coder.
 *
 * `ancrage` va donc de 0 (bord gauche de la photo) à 1 (bord droit).
 */
const PANNEAUX = [
  { fichier: "public/photos/lieu/atelier-kv.jpg", ancrage: 0.34 },
  { fichier: "public/photos/boutique/interieur.jpg", ancrage: 0.5 },
  { fichier: "public/photos/galerie/lieu-appartement/011.webp", ancrage: 0.62 },
];

/**
 * Les lignes candidates, à trancher par Étienne.
 *
 * Son intuition, le 22/09/2026 : « je me demande si on peut pas mettre
 * atelier / boutique / appartement en dessous de Chez les Plombiers au lieu
 * de l'adresse ». Elle est bonne, et pour une raison mesurable : l'adresse
 * figure DÉJÀ dans la description de chaque aperçu, juste sous l'image
 * (« Trois espaces à la même adresse, au 39 rue des Bourdonnais »). La
 * répéter dans l'image dépense la seule ligne disponible pour une information
 * que le lecteur a déjà sous les yeux.
 *
 * Alors que les trois panneaux montrent trois pièces sans dire que ce sont
 * trois LIEUX : on peut les lire comme trois coins du même endroit. Les
 * nommer fait le seul travail que l'image ne sait pas faire seule.
 */
const LIGNES = {
  a: "L'ATELIER · LA BOUTIQUE · L'APPARTEMENT",
  b: "39, RUE DES BOURDONNAIS 75001 PARIS",
  c: "L'ATELIER · LA BOUTIQUE · L'APPARTEMENT — PARIS 1ER",
};

/* ── La police du site, sans rien installer sur la machine ─────────────── */
const fc = mkdtempSync(path.join(tmpdir(), "clp-vig-"));
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

mkdirSync(SORTIE, { recursive: true });

/*
 * Le triptyque. Trois panneaux de largeur égale, mis à la hauteur puis
 * découpés dans la largeur.
 *
 * ⚠️ PAS DE RECADRAGE AUTOMATIQUE PAR ZONE DE CONTRASTE ici. Il sert ailleurs,
 * sur une photo isolée ; les trois panneaux se regardent les uns les autres,
 * et trois cadrages décidés séparément cassent l'alignement des horizons.
 */
const LP = Math.round(L / 3);
const panneaux = [];
for (let i = 0; i < 3; i++) {
  const p = PANNEAUX[i];
  const largeur = i === 2 ? L - 2 * LP : LP;
  /*
   * `fit: cover` ne sait ancrer que par mots-clés (top/centre/bottom). Pour un
   * ancrage continu, on redimensionne sur la largeur voulue puis on extrait
   * soi-même la bande — c'est le même calcul que fait `cover`, avec le
   * décalage vertical sous la main.
   */
  const mis = await sharp(path.join(RACINE, p.fichier)).resize({ height: H }).toBuffer();
  const mm = await sharp(mis).metadata();
  const gauche = Math.round(Math.max(0, (mm.width - largeur) * p.ancrage));
  panneaux.push({
    input: await sharp(mis)
      .extract({ left: gauche, top: 0, width: Math.min(largeur, mm.width), height: H })
      .toBuffer(),
    left: i * LP,
    top: 0,
  });
}

/*
 * Le logotype, posé au centre.
 *
 * ⚠️ On part de `logotype-noir.png`, celui SANS l'adresse — l'asset officiel,
 * en 2000 px. Le PSD d'Inès utilise la variante avec adresse ; comme la ligne
 * du bas devient variable, il faut les deux séparés.
 *
 * Le PNG est carré avec beaucoup de vide autour : `trim()` ramène la boîte au
 * texte, sans quoi le centrage porterait sur la marge et non sur le mot.
 */
const logo = await sharp(path.join(RACINE, "public/images/logo/logotype-noir.png"))
  .trim({ threshold: 20 })
  .resize({ width: Math.round(L * 0.5) })
  .toBuffer();
const lm = await sharp(logo).metadata();

const echapper = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "’");

/*
 * ⚠️ LE LOGOTYPE EST NOIR, ET LES PHOTOS NE SONT PAS TOUTES CLAIRES. Chez
 * Inès, « CHEZ LES » déborde sur le panneau de L'ATELIER, en béton gris : le
 * texte y passe, mais de justesse, et une vignette WhatsApp se regarde à
 * 300 px de large. Un voile blanc très léger, dégradé sur les bords, rend la
 * lecture sûre sans se voir comme un bandeau — on garde la photo derrière.
 */
function voile() {
  const h = Math.round(H * 0.38);
  return {
    input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${h}">
      <defs><linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0"    stop-color="#F2F0EC" stop-opacity="0"/>
        <stop offset="0.35" stop-color="#F2F0EC" stop-opacity="0.72"/>
        <stop offset="0.65" stop-color="#F2F0EC" stop-opacity="0.72"/>
        <stop offset="1"    stop-color="#F2F0EC" stop-opacity="0"/>
      </linearGradient></defs>
      <rect width="${L}" height="${h}" fill="url(#v)"/>
    </svg>`),
    left: 0,
    top: Math.round(H * 0.31),
  };
}

/*
 * ⚠️ 15 px, ET PAS DAVANTAGE. J'étais passé à 19 px en jugeant la ligne trop
 * fine dans un aperçu à 320 px. Étienne, 22/09/2026 : « je préfère la version
 * avec les 3 lieux plus petits que le logo ».
 *
 * Il a raison, et c'est une question de hiérarchie, pas de lisibilité. Cette
 * ligne est une légende : elle nomme ce que l'image montre déjà. Grossie, elle
 * se met à peser autant que le logotype et l'ensemble devient une pancarte.
 * On ne lit pas une vignette de partage mot à mot — on reconnaît une marque,
 * et on devine qu'il y a trois choses en dessous.
 *
 * ⚠️ Le voile blanc répond au même besoin autrement, et mieux : il rend le
 * texte lisible sans lui donner d'importance. Ne pas le retirer en pensant
 * « rendre la photo » — c'est lui qui permet de garder cette ligne petite.
 */
function sousTitre(texte) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="60">
    <text x="${L / 2}" y="30" text-anchor="middle" font-family="Eurostile ExtendedTwo"
          font-weight="bold" font-size="15" letter-spacing="3.4" fill="#141414"
          >${echapper(texte.toUpperCase())}</text>
  </svg>`);
}

const hautLogo = Math.round(H / 2 - lm.height / 2 - 14);

for (const [cle, texte] of Object.entries(LIGNES)) {
  const nom = POSER ? "defaut.jpg" : `vignette-${cle}.jpg`;
  const sortie = path.join(SORTIE, nom);
  await sharp({ create: { width: L, height: H, channels: 3, background: "#ffffff" } })
    .composite([
      ...panneaux,
      voile(),
      { input: logo, left: Math.round((L - lm.width) / 2), top: hautLogo },
      { input: sousTitre(texte), left: 0, top: hautLogo + lm.height + 10 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(sortie);
  console.log(`  ${nom.padEnd(18)} ${Math.round(statSync(sortie).size / 1024)} Ko   ${texte}`);
  if (POSER) break; // en mode « poser », seule la variante `a` est écrite
}

rmSync(fc, { recursive: true, force: true });
console.log(`\n  → ${SORTIE}`);
