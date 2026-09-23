/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  AJOUTER UN RELEVÉ SUR PLACE À « VUES MESURES »
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   node annoter-releve.mjs
 *
 * Étienne a mesuré le renfoncement blanc, à gauche du cyclorama : 1,93 × 3,52,
 * 43 cm de profondeur. Aucun des trois documents ne le cotait — vérifié page à
 * page. On l'ajoute donc à la page 15 de `vues-mesures.pdf`, celle qui montre
 * précisément cette vue.
 *
 * ── CE QUI EST PRÉSERVÉ, ET CE QUI NE L'EST PAS ───────────────────────────
 *
 * ⚠️ SEULE LA PAGE 15 EST RÉÉCRITE. Les dix-huit autres sont recopiées telles
 * quelles, vectorielles. La 15, elle, est rastérisée à 288 dpi — c'est le prix
 * d'une annotation sans outil de calque (ni qpdf ni pdftk ici). Le coût est
 * faible parce que cette page EST une photographie : seuls ses cotes et son
 * titre perdent leur nature vectorielle, à une résolution où ça ne se voit pas
 * à l'impression.
 *
 * ⚠️ C'EST LA COPIE DU SITE QUI EST MODIFIÉE, PAS LE MASTER. Le script écrit
 * dans `public/documents/`, d'où le site sert le PDF et d'où l'archive des
 * plans est fabriquée : le relevé arrive donc chez le client qui télécharge.
 * Le fichier du géomètre, lui, reste intact dans
 * `Dropbox/CHEZ LES PLOMBIERS/PLANS DES PLOMBIERS/VUES MESURES.pdf`.
 *
 * ⚠️ Le script n'est donc PAS idempotent : relancé, il annoterait une page
 * déjà annotée. Repartir de la version Git avant de le rejouer.
 *
 * ── POURQUOI UN ENCART, ET PAS DES FLÈCHES ────────────────────────────────
 *
 * ⚠️ Le coin est déjà occupé : la cote 3,97 tombe exactement le long du bord
 * gauche du renfoncement. Trois flèches de plus s'y croiseraient.
 *
 * ⚠️ Et surtout, ces trois chiffres N'ONT PAS LA MÊME ORIGINE que les autres.
 * Le reste de la page vient du géomètre ; ceux-ci d'un télémètre, un an plus
 * tard. Les fondre dans le même graphisme les ferait passer pour relevés en
 * même temps. L'encart le dit — « relevé sur place », avec sa date.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const RACINE = import.meta.dirname;
const SOURCE = path.join(RACINE, "public/documents/vues-mesures.pdf");
const SORTIE = path.join(RACINE, "public/documents/vues-mesures.pdf");
const PAGE = 15;

/** Le format de la page, en points PostScript. Lu dans le PDF : 1920 × 1080. */
const LP = 1920;
const HP = 1080;
const DPI = 288; // 4× les 72 pt/pouce du PDF

/**
 * L'emplacement de la photo dans la page, en fraction de la page.
 * Mesuré sur le rendu : x 2986→7488, y 742→3742 d'un rendu 7680 × 4320.
 */
const PHOTO = { x: 2986 / 7680, y: 742 / 4320, l: 4502 / 7680, h: 3000 / 4320 };

/** Le centre du renfoncement, en fraction de la PHOTO. */
const CIBLE = { x: 0.355, y: 0.55 };

const RELEVE = {
  titre: "Renfoncement",
  lignes: [
    ["Largeur", "1,93 m"],
    ["Hauteur", "3,52 m"],
    ["Profondeur", "0,43 m"],
  ],
  note: "Relevé sur place — 23/09/2026",
};

const ROUGE = "#E3262B";
const tmp = mkdtempSync(path.join(tmpdir(), "clp-pdf-"));

/* ── La police du site, sans rien installer ────────────────────────────── */
writeFileSync(
  path.join(tmp, "fonts.conf"),
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig>
  <dir>${path.join(RACINE, "src/fonts")}</dir>
  <dir>/System/Library/Fonts</dir><dir>/Library/Fonts</dir>
  <cachedir>${path.join(tmp, "cache")}</cachedir>
</fontconfig>`,
);
process.env.FONTCONFIG_FILE = path.join(tmp, "fonts.conf");

/* ── 1. La page 15, en image ───────────────────────────────────────────── */
execFileSync("pdftoppm", ["-f", String(PAGE), "-l", String(PAGE), "-r", String(DPI), "-png", SOURCE, path.join(tmp, "page")]);
const rendu = path.join(tmp, readdirSync(tmp).find((f) => f.startsWith("page") && f.endsWith(".png")));
const { width: L, height: H } = await sharp(rendu).metadata();

/* ── 2. L'encart et son amorce ─────────────────────────────────────────── */
const px = (fx) => Math.round((PHOTO.x + fx * PHOTO.l) * L);
const py = (fy) => Math.round((PHOTO.y + fy * PHOTO.h) * H);

const cibleX = px(CIBLE.x);
const cibleY = py(CIBLE.y);

/*
 * ⚠️ L'ENCART EST DANS LA MARGE, PAS SUR LA PHOTO.
 *
 * Premier essai : posé sur le sol, en bas à gauche de l'image. Il masquait la
 * cote 8,98 et son amorce traversait la photo en diagonale, coupant deux
 * flèches existantes. Une annotation qui efface une cote est pire que pas
 * d'annotation du tout.
 *
 * La page a une grande réserve blanche à gauche, sous le plan de repérage :
 * l'encart y tient sans rien recouvrir, et l'amorce n'a qu'un court trajet
 * jusqu'au renfoncement. Sur blanc, le texte passe en noir.
 */
const encart = {
  x: Math.round(0.245 * L),
  y: Math.round(0.655 * H),
  l: Math.round(0.185 * L),
  h: Math.round(0.165 * H),
};

const T = (n) => Math.round(n * (L / 7680)); // tailles données pour un rendu 7680 de large
const echapper = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "\u2019");

const lignes = RELEVE.lignes
  .map(([quoi, valeur], i) => {
    const y = encart.y + T(190) + i * T(86);
    return `<text x="${encart.x + T(44)}" y="${y}" font-family="Eurostile ExtendedTwo" font-size="${T(42)}" letter-spacing="${T(3)}" fill="#55524E">${echapper(quoi.toUpperCase())}</text>
      <text x="${encart.x + encart.l - T(44)}" text-anchor="end" y="${y}" font-family="Eurostile ExtendedTwo" font-weight="bold" font-size="${T(56)}" letter-spacing="${T(2)}" fill="#141414">${echapper(valeur)}</text>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${H}">
  <!-- l'amorce : du coin haut-droit de l'encart vers le renfoncement -->
  <line x1="${encart.x + encart.l}" y1="${encart.y + T(40)}" x2="${cibleX}" y2="${cibleY}"
        stroke="${ROUGE}" stroke-width="${T(5)}"/>
  <circle cx="${cibleX}" cy="${cibleY}" r="${T(15)}" fill="${ROUGE}"/>

  <rect x="${encart.x}" y="${encart.y}" width="${encart.l}" height="${encart.h}"
        fill="#FFFFFF" stroke="${ROUGE}" stroke-width="${T(5)}"/>

  <text x="${encart.x + T(44)}" y="${encart.y + T(88)}" font-family="Eurostile ExtendedTwo"
        font-weight="bold" font-size="${T(48)}" letter-spacing="${T(7)}" fill="${ROUGE}"
        >${echapper(RELEVE.titre.toUpperCase())}</text>
  ${lignes}
  <text x="${encart.x + T(44)}" y="${encart.y + encart.h - T(44)}" font-family="Eurostile ExtendedTwo"
        font-size="${T(32)}" letter-spacing="${T(3)}" fill="#8A8A8A"
        >${echapper(RELEVE.note.toUpperCase())}</text>
</svg>`;

const annotee = path.join(tmp, "annotee.jpg");
await sharp(rendu)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(annotee);

/* ── 3. Cette image, en une page PDF au format exact ───────────────────── */
/*
 * ⚠️ ÉCRIT À LA MAIN, et pour une raison : `sips` sait convertir une image en
 * PDF mais lui donne la taille naturelle de l'image, pas les 1920 × 1080 pt de
 * la page d'origine. Les dix-neuf pages n'auraient plus le même format, et le
 * document s'ouvrirait en accordéon. Ici on impose le MediaBox.
 *
 * Le JPEG est embarqué tel quel (`DCTDecode`) : pas de recompression, pas de
 * dépendance.
 */
const jpeg = readFileSync(annotee);
const objets = [];
const pousser = (s) => objets.push(Buffer.isBuffer(s) ? s : Buffer.from(s, "latin1"));

pousser("<< /Type /Catalog /Pages 2 0 R >>");
pousser("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
pousser(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${LP} ${HP}] /Resources << /XObject << /I0 4 0 R >> >> /Contents 5 0 R >>`);
pousser(
  Buffer.concat([
    Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${L} /Height ${H} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`, "latin1"),
    jpeg,
    Buffer.from("\nendstream", "latin1"),
  ]),
);
const flux = `q ${LP} 0 0 ${HP} 0 0 cm /I0 Do Q`;
pousser(`<< /Length ${flux.length} >>\nstream\n${flux}\nendstream`);

const morceaux = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1")];
const offsets = [];
let pos = morceaux[0].length;
objets.forEach((o, i) => {
  const tete = Buffer.from(`${i + 1} 0 obj\n`, "latin1");
  const queue = Buffer.from("\nendobj\n", "latin1");
  offsets.push(pos);
  morceaux.push(tete, o, queue);
  pos += tete.length + o.length + queue.length;
});
let xref = `xref\n0 ${objets.length + 1}\n0000000000 65535 f \n`;
for (const o of offsets) xref += `${String(o).padStart(10, "0")} 00000 n \n`;
xref += `trailer\n<< /Size ${objets.length + 1} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF\n`;
morceaux.push(Buffer.from(xref, "latin1"));

const pagePdf = path.join(tmp, "page15.pdf");
writeFileSync(pagePdf, Buffer.concat(morceaux));

/* ── 4. Réassembler le document ────────────────────────────────────────── */
execFileSync("pdfseparate", [SOURCE, path.join(tmp, "src-%d.pdf")]);
const total = readdirSync(tmp).filter((f) => /^src-\d+\.pdf$/.test(f)).length;
const ordre = [];
for (let i = 1; i <= total; i++) ordre.push(i === PAGE ? pagePdf : path.join(tmp, `src-${i}.pdf`));
execFileSync("pdfunite", [...ordre, SORTIE]);

rmSync(tmp, { recursive: true, force: true });
console.log(`  ✓ page ${PAGE} annotée — ${total} pages, ${Math.round(statSync(SORTIE).size / 1024 / 1024 * 10) / 10} Mo`);
