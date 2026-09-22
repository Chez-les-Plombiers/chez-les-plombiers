import type { Metadata } from "next";
import { RefonteNouveauClient } from "@/components/refonte/RefonteNouveauClient";
import { partage } from "@/lib/partage";

/**
 * ⚠️ `noindex`, ET C'EST VOULU. Cette page n'est liée depuis nulle part : on
 * en envoie l'adresse à un client dont la date est déjà tenue. Elle n'a rien
 * à faire dans un résultat de recherche.
 *
 * ⚠️ MAIS L'APERÇU DE PARTAGE, LUI, COMPTE PLUS QUE PARTOUT AILLEURS. C'est
 * précisément la page qu'Étienne colle dans une conversation WhatsApp. Un
 * `noindex` n'empêche pas WhatsApp de lire les balises — il n'empêche que
 * l'indexation. On lui donne donc un vrai titre et une vraie image, au lieu
 * de l'aperçu générique de l'ancien site.
 */
export const metadata: Metadata = {
  ...partage({
    titre: "Vos informations de facturation — Chez Les Plombiers",
    description:
      "Le formulaire à remplir une fois votre date retenue : facturation, entreprise, créneau. Proposition tarifaire sous 24 heures.",
    visuel: "defaut",
    chemin: "/nouveau-client",
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RefonteNouveauClient />;
}
