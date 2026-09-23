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
  /*
   * ⚠️ `.rotate()` SANS ARGUMENT, ET IL EST OBLIGATOIRE. Il applique aux
   * pixels l'orientation que le fichier ne portait que dans son EXIF.
   *
   * Sans lui, ce script était un piège silencieux : sharp ne redresse pas
   * tout seul, et `.jpeg()` jette les métadonnées. Une photo prise de côté ou
   * tête en bas — ce que fait un téléphone en permanence — s'affichait droite
   * grâce à son marqueur EXIF, et ressortait d'ici de travers, marqueur
   * effacé et pixels jamais tournés.
   *
   * Constaté le 23/09/2026 sur les quatre photos d'accès de `/infos` : la rue
   * à 180°, la cour et les deux portes à 90°. Rien ne pouvait le signaler —
   * le fichier est valide, la page se charge, le contrôle des liens passe.
   * Étienne : « là on a les photos à l'envers ».
   *
   * ⚠️ Le contrôle à faire après ce script n'est donc pas « les images
   * existent-elles » mais « sont-elles à l'endroit ». Comparer les
   * proportions avant/après le suffit dans la plupart des cas : une rotation
   * de 90° échange largeur et hauteur.
   */
  const pipeline = sharp(f)
    .rotate()
    .resize(Math.min(m.width, LARGEUR_MAX), null, { withoutEnlargement: true })
    [png ? "png" : "jpeg"](png ? { compressionLevel: 9 } : { quality: 78, mozjpeg: true });
  const buf = await pipeline.toBuffer();
  /*
   * ⚠️ UN GAIN MINIMAL, PAS SEULEMENT « PAS PLUS LOURD ». La condition était
   * `buf.length >= taille` : elle laissait passer un réencodage qui gagnait
   * 2 Ko sur 352. Or un JPEG se dégrade à chaque passage — on payait une
   * perte de qualité pour rien, et un lancement du script produisait à chaque
   * fois un diff de quatorze fichiers sans raison.
   *
   * En dessous de 15 % de gain, on laisse le fichier tranquille.
   */
  if (buf.length > taille * 0.85) continue;
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
