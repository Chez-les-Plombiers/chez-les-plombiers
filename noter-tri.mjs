/**
 * Enregistre une décision de tri, sans toucher aux originaux.
 *
 * Deux façons de dire la même chose, parce qu'Étienne dicte les deux :
 *   node noter-tri.mjs <slug> --retire 5,6,12,19
 *   node noter-tri.mjs <slug> --garde 1,2,4,8-12
 *   node noter-tri.mjs <slug> --couverture 12
 *
 * ⚠️ « --retire » part de TOUTES les photos et enlève les numéros donnés ;
 * « --garde » ne retient que ceux-là. Ne pas confondre : sur un dossier de
 * 247 photos, l'erreur ne se voit pas.
 */
import fs from "node:fs";

const [slug, ...args] = process.argv.slice(2);
const opt = (nom) => {
  const i = args.indexOf(`--${nom}`);
  return i === -1 ? null : args[i + 1];
};

/** « 1,2,8-12 » → [1,2,8,9,10,11,12] */
const plage = (s) =>
  s.split(",").flatMap((p) => {
    const [a, b] = p.split("-").map(Number);
    return b ? Array.from({ length: b - a + 1 }, (_, k) => a + k) : [a];
  });

const manifeste = JSON.parse(fs.readFileSync("src/components/refonte/tri-manifeste.json", "utf8"));
const total = manifeste[slug]?.items.length;
if (!total) { console.error(`✖ slug inconnu : ${slug}`); process.exit(1); }

const f = "src/components/refonte/tri-selection.json";
const sel = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {};
const e = (sel[slug] ??= { garde: [], couverture: null });

if (opt("retire")) {
  const out = new Set(plage(opt("retire")));
  e.garde = Array.from({ length: total }, (_, i) => i + 1).filter((n) => !out.has(n));
}
if (opt("garde")) e.garde = plage(opt("garde"));
if (opt("couverture")) {
  const c = Number(opt("couverture"));
  e.couverture = c;
  // Une couverture est forcement gardee, meme si elle etait tombee dans un
  // retrait en bloc : le choix regarde la planche, le retrait allait vite.
  if (!e.garde.includes(c)) { e.garde = [...e.garde, c].sort((a, b) => a - b); console.log(`  ↳ ${c} etait retiree : reintegree comme couverture.`); }
}

fs.writeFileSync(f, JSON.stringify(sel, null, 2));
console.log(`${manifeste[slug].dossier}\n  ${e.garde.length} gardees sur ${total}${e.couverture ? `, couverture ${String(e.couverture).padStart(3, "0")}` : " — couverture a definir"}`);
console.log(`  ${e.garde.join(", ")}`);

const faits = Object.keys(sel).length;
const restants = Object.keys(manifeste).length - faits;
console.log(`\n${faits} evenement(s) traite(s), ${restants} restant(s).`);
