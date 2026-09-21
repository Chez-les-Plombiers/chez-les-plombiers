/**
 * Fabrique une PLANCHE CONTACT : les vignettes numérotées que regarde Étienne
 * pour dire « enlève la 12, couverture la 30 ».
 *
 * ⚠️ À ne pas confondre avec `gen-photos.mjs`. Celui-ci travaille en amont :
 * il montre TOUT ce qu'un dossier contient. `gen-photos` ne fabrique ensuite
 * que ce qui a survécu au tri.
 *
 * ── POURQUOI CE SCRIPT EXISTE ─────────────────────────────────────────────
 *
 * Les 22 premières planches ont été fabriquées à la main, une par une. La
 * table des dossiers sources vivait alors dans `gen-photos.mjs` seul — et
 * quatre séries ajoutées après coup y manquaient, donc échouaient en silence.
 * Les sources sont désormais déclarées UNE fois, dans `tri-sources.json`, et
 * les deux scripts la lisent.
 *
 *   node gen-tri.mjs                 toutes les planches déclarées
 *   node gen-tri.mjs lieu-atelier    celle-là seulement
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const SOURCE = "/Users/Etienne/Library/CloudStorage/Dropbox-ChezlesPlombiers/CHEZ LES PLOMBIERS/PHOTOS";
const SORTIE = "public/photos/tri";
const MANIFESTE = "src/components/refonte/tri-manifeste.json";

const sources = JSON.parse(fs.readFileSync("src/components/refonte/tri-sources.json", "utf8"));
const manifeste = JSON.parse(fs.readFileSync(MANIFESTE, "utf8"));

const IMAGE = /\.(jpe?g|png|heic|webp|tiff?)$/i;
const VIDEO = /\.(mp4|mov|m4v)$/i;

const voulus = process.argv.slice(2);
const aFaire = Object.entries(sources).filter(([slug]) => !voulus.length || voulus.includes(slug));

for (const [slug, bloc] of aFaire) {
  const dest = path.join(SORTIE, slug);
  fs.mkdirSync(dest, { recursive: true });

  /* Les fichiers de tous les dossiers déclarés, dans l'ordre des dossiers puis
     alphabétique. Pas de récursion : un sous-dossier se déclare, sinon on
     ramasse les `OLD` et les exports intermédiaires. */
  const fichiers = [];
  for (const dossier of bloc.dossiers) {
    const abs = path.join(SOURCE, dossier);
    if (!fs.existsSync(abs)) { console.log(`⚠️ introuvable : ${dossier}`); continue; }
    for (const f of fs.readdirSync(abs).sort()) {
      if (IMAGE.test(f) || VIDEO.test(f)) fichiers.push(path.join(dossier, f));
    }
  }

  const items = [];
  let n = 0;
  for (const relatif of fichiers) {
    n++;
    const num = String(n).padStart(3, "0");
    const out = path.join(dest, `${num}.webp`);
    const src = path.join(SOURCE, relatif);
    const estVideo = VIDEO.test(relatif);

    if (!fs.existsSync(out)) {
      try {
        if (estVideo) {
          /* Une image à 1 s : la première image d'une vidéo de téléphone est
             presque toujours floue ou noire.
             ⚠️ Repli sur 0 s : une vidéo de moins d'une seconde ne rend RIEN
             à `-ss 1`, et ffmpeg sort en succès — l'échec n'apparaît qu'après,
             sur le fichier manquant. */
          const tmp = out.replace(/\.webp$/, ".tmp.png");
          execFileSync("ffmpeg", ["-y", "-ss", "1", "-i", src, "-frames:v", "1", tmp], { stdio: "ignore" });
          if (!fs.existsSync(tmp)) {
            execFileSync("ffmpeg", ["-y", "-i", src, "-frames:v", "1", tmp], { stdio: "ignore" });
          }
          await sharp(tmp).resize(700, 700, { fit: "inside" }).webp({ quality: 70 }).toFile(out);
          fs.unlinkSync(tmp);
        } else {
          await vignette(src, out);
        }
      } catch (e) { console.log(`  ✗ ${relatif} : ${e.message}`); continue; }
    }
    items.push({
      n: num,
      src: `/photos/tri/${slug}/${num}.webp`,
      origine: relatif,
      ...(estVideo ? { video: true } : {}),
    });
  }

  manifeste[slug] = {
    dossier: bloc.nom,
    /* ⚠️ `origine` part de la racine PHOTOS, pas d'un dossier unique : une
       planche peut agréger plusieurs dossiers. Les 22 planches d'origine, non
       marquées, gardent l'ancienne résolution — voir `gen-photos.mjs`. */
    racineAbsolue: true,
    items,
  };
  console.log(`${bloc.nom.padEnd(40)} ${String(items.length).padStart(4)} vues`);
}

fs.writeFileSync(MANIFESTE, JSON.stringify(manifeste, null, 2));

/** Vignette de planche : 700 px suffit pour juger, et ça reste léger. */
async function vignette(src, out) {
  try {
    await sharp(src).rotate().resize(700, 700, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 70 }).toFile(out);
  } catch {
    /* Repli HEIC — sharp ne les lit pas, macOS si. Voir `gen-photos.mjs`. */
    const tmp = out.replace(/\.webp$/, ".tmp.jpg");
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "88",
                          "-Z", "700", src, "--out", tmp], { stdio: "ignore" });
    await sharp(tmp).webp({ quality: 70 }).toFile(out);
    fs.unlinkSync(tmp);
  }
}
