/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  L'ARCHIVE DES PLANS — les quatre PDF en un seul téléchargement
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Demande d'Étienne, 23/09/2026 : « rajouter un bouton quelque part en bas
 * pour dire tout télécharger, et que ça télécharge un zip avec tous les
 * plans ». Un régisseur qui prépare une implantation les veut tous les
 * quatre ; quatre clics et quatre fichiers éparpillés dans le dossier de
 * téléchargements, c'est quatre occasions d'en oublier un.
 *
 * ── POURQUOI À LA CONSTRUCTION, ET PAS À LA DEMANDE ───────────────────────
 *
 * ⚠️ Ce script tourne en `prebuild` : l'archive est refaite à CHAQUE
 * déploiement. C'est la seule protection contre la dérive — un fichier
 * statique qu'on fabrique une fois à la main devient faux dès qu'un plan est
 * remplacé, sans que rien ne le signale, et c'est le genre de document qu'on
 * envoie à un prestataire.
 *
 * Et à la demande, ce serait une fonction serveur qui lit 10 Mo de PDF à
 * chaque clic. Une archive dans `public/` se sert comme une image.
 *
 * ── LA LISTE VIENT DE `data-technique.ts`, PAS D'ICI ──────────────────────
 *
 * ⚠️ NE PAS RECOPIER LES QUATRE CHEMINS DANS CE FICHIER. La page affiche les
 * plans depuis `PLANS` ; si l'archive avait sa propre liste, les deux
 * divergeraient au premier plan ajouté — et l'écart serait invisible, puisque
 * les deux continueraient de fonctionner. Le script lit donc la même source,
 * et s'arrête s'il n'y trouve rien.
 */
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { deflateRawSync } from "node:zlib";

const RACINE = import.meta.dirname;
const SORTIE = path.join(RACINE, "public/documents/plans-chez-les-plombiers.zip");

const source = readFileSync(path.join(RACINE, "src/components/refonte/data-technique.ts"), "utf8");
const bloc = source.slice(source.indexOf("export const PLANS"));
const fichiers = [...bloc.matchAll(/fichier: "(\/documents\/[^"]+\.pdf)"/g)].map((m) => m[1]);

if (fichiers.length === 0) {
  console.error("✗ Aucun plan trouvé dans `PLANS` de data-technique.ts — archive non produite.");
  process.exit(1);
}

const absolus = fichiers.map((f) => path.join(RACINE, "public", f));
const manquants = absolus.filter((f) => !existsSync(f));
if (manquants.length) {
  console.error("✗ Plans déclarés mais absents du dépôt :\n  " + manquants.join("\n  "));
  process.exit(1);
}

/*
 * ── L'ARCHIVE, ÉCRITE À LA MAIN ───────────────────────────────────────────
 *
 * ⚠️ PAS D'APPEL À LA COMMANDE `zip`, ET PAS DE DÉPENDANCE NON PLUS. Ce
 * script tourne en `prebuild`, donc sur la machine de construction de Vercel :
 * parier sur la présence d'un binaire système, c'est accepter qu'un
 * déploiement casse le jour où l'image change. Et ajouter une bibliothèque
 * pour produire quatre entrées serait disproportionné.
 *
 * Le format ZIP est simple quand on n'en utilise que le nécessaire : pour
 * chaque fichier un en-tête local puis les données, puis un répertoire
 * central, puis un enregistrement de fin. Ni chiffrement, ni Zip64 — on est
 * à 10 Mo, très loin des 4 Go qui l'imposeraient.
 *
 * ⚠️ Les chemins sont APLATIS volontairement : l'archive ne doit pas recréer
 * `public/documents/`, sinon celui qui la décompresse traverse deux dossiers
 * vides avant d'atteindre ses plans.
 */
const TABLE_CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = TABLE_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

/*
 * L'heure MS-DOS que le format réclame. On la fige au lieu de prendre
 * « maintenant » : sinon l'archive change d'octets à chaque construction, et
 * Git voit un fichier modifié à chaque déploiement sans que rien n'ait bougé.
 */
const DATE_DOS = 0x5a21; // 2025-01-01
const HEURE_DOS = 0x0000;

const entrees = [];
const morceaux = [];
let position = 0;

for (const abs of absolus) {
  const nom = Buffer.from(path.basename(abs), "utf8");
  const brut = readFileSync(abs);
  const compresse = deflateRawSync(brut, { level: 6 });
  /* Un PDF est déjà compressé : si le deflate n'y gagne rien, on stocke tel
     quel plutôt que de produire un fichier plus gros que l'original. */
  const stocker = compresse.length >= brut.length;
  const donnees = stocker ? brut : compresse;
  const methode = stocker ? 0 : 8;

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);            // version minimale
  local.writeUInt16LE(0x0800, 6);        // noms de fichiers en UTF-8
  local.writeUInt16LE(methode, 8);
  local.writeUInt16LE(HEURE_DOS, 10);
  local.writeUInt16LE(DATE_DOS, 12);
  local.writeUInt32LE(crc32(brut), 14);
  local.writeUInt32LE(donnees.length, 18);
  local.writeUInt32LE(brut.length, 22);
  local.writeUInt16LE(nom.length, 26);
  local.writeUInt16LE(0, 28);

  entrees.push({ nom, methode, crc: crc32(brut), compresse: donnees.length, brut: brut.length, offset: position });
  morceaux.push(local, nom, donnees);
  position += local.length + nom.length + donnees.length;
}

const debutCentral = position;
for (const e of entrees) {
  const c = Buffer.alloc(46);
  c.writeUInt32LE(0x02014b50, 0);
  c.writeUInt16LE(20, 4);                // version d'écriture
  c.writeUInt16LE(20, 6);                // version minimale
  c.writeUInt16LE(0x0800, 8);
  c.writeUInt16LE(e.methode, 10);
  c.writeUInt16LE(HEURE_DOS, 12);
  c.writeUInt16LE(DATE_DOS, 14);
  c.writeUInt32LE(e.crc, 16);
  c.writeUInt32LE(e.compresse, 20);
  c.writeUInt32LE(e.brut, 24);
  c.writeUInt16LE(e.nom.length, 28);
  c.writeUInt32LE(e.offset, 42);
  morceaux.push(c, e.nom);
  position += c.length + e.nom.length;
}

const fin = Buffer.alloc(22);
fin.writeUInt32LE(0x06054b50, 0);
fin.writeUInt16LE(entrees.length, 8);
fin.writeUInt16LE(entrees.length, 10);
fin.writeUInt32LE(position - debutCentral, 12);
fin.writeUInt32LE(debutCentral, 16);
morceaux.push(fin);

writeFileSync(SORTIE, Buffer.concat(morceaux));

const ko = statSync(SORTIE).size / 1024;
const poids = ko > 1024 ? `${(ko / 1024).toFixed(1).replace(".", ",")} Mo` : `${Math.round(ko)} Ko`;
console.log(`  ✓ ${fichiers.length} plans → public/documents/plans-chez-les-plombiers.zip (${poids})`);
