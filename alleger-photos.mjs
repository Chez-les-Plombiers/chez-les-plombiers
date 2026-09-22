/**
 * Allège les images servies EN DIRECT, depuis que l'optimiseur de Vercel est
 * coupé (quota du plan Hobby épuisé le 22/09/2026 — voir `next.config.ts`).
 *
 * ⚠️ RÉENCODAGE SUR PLACE, MÊME NOM, MÊME EXTENSION. Les chemins sont écrits
 * dans une douzaine de fichiers de données : changer un nom, même pour passer
 * au WebP, casserait des références sans que rien ne le signale. Un JPEG de
 * 1 600 px en qualité 78 pèse le dixième de l'original et ne se distingue pas
 * à l'œil sur un écran.
 *
 * ⚠️ CE N'EST PAS LA SOURCE. Les originaux sont dans Dropbox, intacts.
 *
 *   node alleger-photos.mjs --essai   ne fait rien, dit ce qu'il ferait
 *   node alleger-photos.mjs           réencode
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RACINE = "public/photos";
const LARGEUR_MAX = 1600;
const SEUIL = 220 * 1024; // en dessous, on ne gagne rien qui vaille le risque
const essai = process.argv.includes("--essai");

function* fichiers(dossier) {
  for (const e of fs.readdirSync(dossier, { withFileTypes: true })) {
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) yield* fichiers(p);
    else if (/\.(jpe?g|png)$/i.test(e.name)) yield p;
  }
}

let avant = 0, apres = 0, n = 0;
for (const f of fichiers(RACINE)) {
  const taille = fs.statSync(f).size;
  if (taille < SEUIL) continue;
  const m = await sharp(f).metadata();
  const png = /\.png$/i.test(f);
  const pipeline = sharp(f)
    .resize(Math.min(m.width, LARGEUR_MAX), null, { withoutEnlargement: true })
    [png ? "png" : "jpeg"](png ? { compressionLevel: 9 } : { quality: 78, mozjpeg: true });
  const buf = await pipeline.toBuffer();
  if (buf.length >= taille) continue; // jamais alourdir
  avant += taille; apres += buf.length; n++;
  console.log(
    `  ${String(Math.round(taille / 1024)).padStart(5)} → ${String(Math.round(buf.length / 1024)).padStart(4)} Ko  ` +
    `${m.width}px→${Math.min(m.width, LARGEUR_MAX)}px  ${f.replace(RACINE + "/", "")}`
  );
  if (!essai) fs.writeFileSync(f, buf);
}
console.log(
  `\n${n} images ${essai ? "à réencoder" : "réencodées"} — ` +
  `${Math.round(avant / 1024 / 1024)} Mo → ${Math.round(apres / 1024 / 1024)} Mo`
);
