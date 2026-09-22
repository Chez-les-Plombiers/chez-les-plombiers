import type { MetadataRoute } from "next";
import { CATEGORIES_GALERIE, LIEUX_GALERIE } from "@/components/refonte/photos-data";

/**
 * Le plan du site, réécrit à la bascule du 22/09/2026.
 *
 * ⚠️ IL COMPTAIT 41 URL, DONT LA MOITIÉ EN ANGLAIS. Le site est désormais en
 * français seul et les adresses `/en/*` partent en 301 (voir `bascule.ts`) :
 * les annoncer ici enverrait Google sur des redirections, ce qui est le
 * meilleur moyen de faire douter de tout le reste du fichier.
 *
 * ⚠️ ET IL ÉNUMÉRAIT LES PAGES À LA MAIN. Les catégories de photos et les
 * lieux sont désormais lus depuis la photothèque : un événement ajouté au tri
 * apparaît tout seul. Une liste écrite à la main diverge, c'est mécanique.
 *
 * ⚠️ Les pages d'événement (`/photos/diners/kim-attaf`) n'y sont PAS : il y en
 * a une trentaine, elles n'ont ni texte propre ni intérêt de recherche, et
 * elles se découvrent par leur catégorie. Un plan de site n'est pas un
 * inventaire, c'est une liste de ce qu'on veut voir indexé.
 */
const SITE = "https://www.chezlesplombiers.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();
  const page = (
    chemin: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({ url: `${SITE}${chemin}`, lastModified: maintenant, changeFrequency, priority });

  return [
    page("/", 1),
    /* Les trois lieux : c'est ce qu'on loue. */
    page("/atelier", 0.9),
    page("/boutique", 0.9),
    page("/appartement", 0.9),
    /*
     * Les tarifs sont servis par l'autre zone Next, sous le domaine
     * principal. Hebdomadaire : la grille et les disponibilités bougent.
     */
    page("/tarifs", 0.9, "weekly"),
    page("/tarifs/boutique", 0.8, "weekly"),
    page("/tarifs/appartement", 0.8, "weekly"),
    /* Les pages qu'on envoie à quelqu'un. */
    page("/infos", 0.8),
    page("/atelier/technique", 0.8),
    page("/photos", 0.8, "weekly"),
    page("/conditions", 0.7),
    page("/visiter", 0.7),
    page("/partenaires", 0.6),
    page("/visites-virtuelles", 0.6),
    /* La photothèque, lue depuis le tri : rien à tenir à jour ici. */
    ...LIEUX_GALERIE.map((l) => page(`/photos/${l.slug.replace(/^lieu-/, "")}`, 0.6)),
    ...CATEGORIES_GALERIE.map((c) => page(`/photos/${c.slug}`, 0.6)),
    /* Obligatoires, mais personne ne les cherche. */
    page("/mentions-legales", 0.2, "yearly"),
    page("/confidentialite", 0.2, "yearly"),
  ];
}
