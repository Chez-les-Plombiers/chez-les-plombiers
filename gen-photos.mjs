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
import sharp from "sharp";

const SOURCE = "/Users/Etienne/Library/CloudStorage/Dropbox-ChezlesPlombiers/CHEZ LES PLOMBIERS/PHOTOS";
const SORTIE = "public/photos/galerie";

const manifeste = JSON.parse(fs.readFileSync("src/components/refonte/tri-manifeste.json", "utf8"));
const selection = JSON.parse(fs.readFileSync("src/components/refonte/tri-selection.json", "utf8"));

let faites = 0, sautees = 0, ratees = 0;
const sortie = {};

for (const [slug, sel] of Object.entries(selection)) {
  const bloc = manifeste[slug];
  if (!bloc) { console.log(`⚠️ pas de manifeste : ${slug}`); continue; }
  const dest = path.join(SORTIE, slug);
  fs.mkdirSync(dest, { recursive: true });

  const gardees = sel.garde;
  const items = [];
  for (const n of gardees) {
    const item = bloc.items.find((i) => Number(i.n) === n);
    if (!item) { console.log(`  ✗ ${slug} n°${n} introuvable`); ratees++; continue; }
    const src = path.join(SOURCE, slug === "diners-vrac" ? "DINERS CHEZ LES PLOMBIERS" : "EVENTS", item.origine);
    const nom = `${String(n).padStart(3, "0")}.webp`;
    const out = path.join(dest, nom);
    if (fs.existsSync(out)) { sautees++; }
    else {
      try {
        await sharp(src).rotate().resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 72 }).toFile(out);
        faites++;
      } catch (e) { console.log(`  ✗ ${src}: ${e.message}`); ratees++; continue; }
    }
    const meta = await sharp(out).metadata();
    items.push({ n, src: `/photos/galerie/${slug}/${nom}`, l: meta.width, h: meta.height });
  }
  sortie[slug] = items;
  process.stdout.write(`${bloc.dossier.padEnd(54)} ${String(items.length).padStart(4)}\n`);
}

fs.writeFileSync("src/components/refonte/galerie.json", JSON.stringify(sortie, null, 2));
const ko = Number(
  (await import("node:child_process")).execSync(`du -sk ${SORTIE}`).toString().split("\t")[0]
);
console.log(`\n${faites} générées, ${sautees} déjà là, ${ratees} en échec — ${Math.round(ko / 1024)} Mo`);
