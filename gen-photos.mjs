/**
 * Fabrique les images d'affichage de /photos à partir de la sélection.
 *
 * ⚠️ UNE SEULE TAILLE, 1 200 px. Next/Image redimensionne à la volée pour les
 * grilles ; générer une seconde série de vignettes doublerait le poids pour
 * rien. Et le poids compte : le stockage de déploiement Vercel est plafonné à
 * 10 Go sur le plan Hobby, et on y a déjà fait le ménage une fois.
 *
 * ⚠️ Ce n'est PAS la source. Les originaux restent dans Dropbox, intacts. Ce
 * dossier se régénère à volonté depuis `tri-selection.json`.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const SOURCE = "/Users/Etienne/Library/CloudStorage/Dropbox-ChezlesPlombiers/CHEZ LES PLOMBIERS/PHOTOS";
const SORTIE = "public/photos/galerie";

const manifeste = JSON.parse(fs.readFileSync("src/components/refonte/tri-manifeste.json", "utf8"));
const selection = JSON.parse(fs.readFileSync("src/components/refonte/tri-selection.json", "utf8"));

/**
 * ⚠️ Chaque planche ne vient pas du même endroit. Les événements vivent dans
 * `PHOTOS/EVENTS`, mais quatre séries ont été ajoutées au fil de l'eau depuis
 * d'autres dossiers. Sans cette table, elles échouent en silence — le script
 * cherche `EVENTS/<nom de fichier>` et ne trouve rien.
 *
 * ⚠️ Elle ne concerne QUE les 22 planches d'origine. Celles fabriquées par
 * `gen-tri.mjs` portent `racineAbsolue: true` et déclarent leurs dossiers dans
 * `tri-sources.json` : leur `origine` part de la racine PHOTOS. C'est ce
 * doublon de vérité qui avait fait échouer quatre séries en silence.
 */
const DOSSIERS = {
  "diners-vrac": "DINERS CHEZ LES PLOMBIERS",
  "homemade-mix": "HOMEMADE : MIX DINERS CHEZ LES PLOMBIERS",
  "voitures": "SELECTION PHOTOS SITE/03. VOITURES",
  "voitures-videos": "SELECTION PHOTOS SITE/03. VOITURES/IMAGES EXTRAITES",
  "voitures-telephone": "EVENTS/23. VOITURES — TELEPHONE",
};
const dossierSource = (slug) => DOSSIERS[slug] ?? "EVENTS";

let faites = 0, sautees = 0, ratees = 0, orphelins = 0;
const sortie = {};

for (const [slug, sel] of Object.entries(selection)) {
  /*
   * ⚠️ UN DOSSIER PEUT CONTENIR DEUX ÉVÉNEMENTS. `SELECTION PHOTOS SITE/03.
   * VOITURES` mélange la Triumph du dîner Maison 123 et le Cayenne Electric —
   * le dossier téléphone faisait déjà la même chose. `source` permet donc à
   * deux sélections de puiser dans une seule planche : chacune garde ses
   * numéros, et chacune devient son propre événement.
   */
  const bloc = manifeste[sel.source ?? slug];
  if (!bloc) { console.log(`⚠️ pas de manifeste : ${slug}`); continue; }
  const dest = path.join(SORTIE, slug);
  fs.mkdirSync(dest, { recursive: true });

  const gardees = sel.garde;
  const items = [];
  for (const n of gardees) {
    const item = bloc.items.find((i) => Number(i.n) === n);
    if (!item) { console.log(`  ✗ ${slug} n°${n} introuvable`); ratees++; continue; }
    const src = bloc.racineAbsolue
      ? path.join(SOURCE, item.origine)
      : path.join(SOURCE, dossierSource(slug), item.origine);
    const nom = `${String(n).padStart(3, "0")}.webp`;
    const out = path.join(dest, nom);

    /*
     * ── LES VIDÉOS ────────────────────────────────────────────────────────
     * Deux fichiers pour une vidéo : une affiche (le même WebP que pour une
     * photo, pour que la grille reste une grille) et un MP4 lisible partout.
     *
     * ⚠️ RÉENCODAGE OBLIGATOIRE, même quand la source est déjà un MP4 : les
     * vidéos d'iPhone sont en HEVC, que Chrome et Firefox ne lisent pas. Le
     * fichier se téléchargerait et resterait noir, sans erreur.
     */
    if (item.video) {
      const mp4 = path.join(dest, `${String(n).padStart(3, "0")}.mp4`);
      if (!fs.existsSync(mp4)) {
        try {
          execFileSync("ffmpeg", ["-y", "-i", src,
            /* Largeur paire imposée : H.264 refuse une dimension impaire. */
            "-vf", "scale='min(1280,iw)':-2",
            "-c:v", "libx264", "-preset", "slow", "-crf", "26",
            "-c:a", "aac", "-b:a", "128k",
            /* L'index en tête : sans ça, la lecture attend le fichier entier. */
            "-movflags", "+faststart", mp4], { stdio: "ignore" });
        } catch (e) { console.log(`  ✗ vidéo ${src} : ${e.message}`); ratees++; continue; }
      }
      if (!fs.existsSync(out)) {
        const aff = out.replace(/\.webp$/, ".tmp.png");
        execFileSync("ffmpeg", ["-y", "-ss", "1", "-i", src, "-frames:v", "1", aff], { stdio: "ignore" });
        /* ⚠️ Une vidéo de moins d'une seconde ne rend RIEN à `-ss 1`, et
           ffmpeg sort en succès : l'échec n'apparaît qu'au fichier manquant. */
        if (!fs.existsSync(aff)) {
          execFileSync("ffmpeg", ["-y", "-i", src, "-frames:v", "1", aff], { stdio: "ignore" });
        }
        await sharp(aff)
          .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 72 }).toFile(out);
        fs.unlinkSync(aff);
        faites++;
      } else sautees++;
      const m = await sharp(out).metadata();
      items.push({
        n, src: `/photos/galerie/${slug}/${nom}`, l: m.width, h: m.height,
        video: `/photos/galerie/${slug}/${String(n).padStart(3, "0")}.mp4`,
      });
      continue;
    }

    if (fs.existsSync(out)) { sautees++; }
    else {
      try {
        await sharp(src).rotate().resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 72 }).toFile(out);
        faites++;
      } catch {
        /*
         * ⚠️ Repli par `sips` pour les HEIC : sharp ne les lit pas sans
         * greffon, et le dossier HOMEMADE en contient. macOS les décode
         * nativement. On passe par un JPEG intermédiaire, puis sharp reprend
         * la main pour le WebP — inutile de perdre le gain de format.
         */
        const tmp = out.replace(/\.webp$/, ".tmp.jpg");
        try {
          execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "90",
                                "-Z", "1200", src, "--out", tmp], { stdio: "ignore" });
          await sharp(tmp).webp({ quality: 72 }).toFile(out);
          fs.unlinkSync(tmp);
          faites++;
        } catch (e2) { console.log(`  ✗ ${src}: ${e2.message}`); ratees++; continue; }
      }
    }
    const meta = await sharp(out).metadata();
    items.push({ n, src: `/photos/galerie/${slug}/${nom}`, l: meta.width, h: meta.height });
  }
  /*
   * ⚠️ LE MÉNAGE, SINON LE DOSSIER NE FAIT QUE GROSSIR. Retirer une photo de
   * la sélection ne supprimait pas son fichier : il restait déployé, invisible
   * et payant. Le stockage de déploiement Vercel est plafonné à 10 Go sur le
   * plan Hobby, et une vidéo pèse mille fois une vignette.
   */
  const gardes = new Set(items.flatMap((i) => [
    path.basename(i.src),
    ...(i.video ? [path.basename(i.video)] : []),
  ]));
  for (const f of fs.readdirSync(dest)) {
    if (!gardes.has(f)) { fs.unlinkSync(path.join(dest, f)); orphelins++; }
  }

  sortie[slug] = items;
  process.stdout.write(`${bloc.dossier.padEnd(54)} ${String(items.length).padStart(4)}\n`);
}

fs.writeFileSync("src/components/refonte/galerie.json", JSON.stringify(sortie, null, 2));
const ko = Number(execFileSync("du", ["-sk", SORTIE]).toString().split("\t")[0]);
console.log(
  `\n${faites} générées, ${sautees} déjà là, ${ratees} en échec, ` +
  `${orphelins} supprimées — ${Math.round(ko / 1024)} Mo`
);
