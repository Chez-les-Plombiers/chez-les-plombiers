import { SITE_URL } from "@/lib/metadata";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  CE QUE LE SITE DÉCLARE AUX MOTEURS, EN CLAIR
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Les données structurées (JSON-LD) sont la seule partie du site qu'une
 * machine lit sans avoir à deviner : le nom, l'adresse, les coordonnées, le
 * téléphone, la surface de chaque lieu. C'est ce qui alimente la fiche Google,
 * Maps, et désormais les moteurs conversationnels.
 *
 * ── POURQUOI CE FICHIER EXISTE ────────────────────────────────────────────
 *
 * ⚠️ LE SITE N'EN AVAIT PLUS AUCUNE, ET PERSONNE NE L'AVAIT VU. Il y en avait,
 * mais uniquement sur `/guide` et `/notre-chef` — deux pages que la bascule du
 * 22/09/2026 redirige. En les supprimant on a emporté la seule chose que
 * Google savait lire de façon fiable, sans qu'aucun contrôle ne bronche :
 * les liens fonctionnaient, les pages répondaient, le sitemap était propre.
 *
 * ── LA RÈGLE, ET ELLE N'EST PAS NÉGOCIABLE ────────────────────────────────
 *
 * ⚠️ LE BLOC DOIT DIRE EXACTEMENT CE QUE LA PAGE AFFICHE. Une donnée
 * structurée qui contredit le texte visible est pire que pas de donnée du
 * tout : Google la traite comme une tentative de manipulation, et une capacité
 * annoncée à un chiffre puis à un autre finit dans un devis.
 *
 * C'est pour ça que les chiffres viennent d'ici et non d'ailleurs — et qu'on
 * n'invente RIEN. Pas de note moyenne (nous n'en avons pas), pas d'horaires
 * d'ouverture (le lieu se visite sur rendez-vous), pas de capacité pour
 * LA BOUTIQUE (elle n'est pas faite pour recevoir).
 *
 * ⚠️ CAPACITÉ DE L'ATELIER : 150. Le site l'annonce partout — « 150 pax
 * debout · 80 assis · 60 à table ». Le calendrier tarifaire, lui, dit 200.
 * Les deux ne peuvent pas avoir raison ; en attendant l'arbitrage d'Étienne on
 * reprend le chiffre DE LA PAGE, puisque c'est elle que le bloc décrit.
 */

const ADRESSE_POSTALE = {
  "@type": "PostalAddress",
  streetAddress: "39 rue des Bourdonnais",
  postalCode: "75001",
  addressLocality: "Paris",
  addressCountry: "FR",
} as const;

/**
 * Relevé sur l'API Adresse de l'État (score 0,96), pas pris sur une carte à
 * l'œil. Une coordonnée fausse déplace le point sur Maps.
 */
const GEO = {
  "@type": "GeoCoordinates",
  latitude: 48.860492,
  longitude: 2.345458,
} as const;

const TEL = "+33761471073";

function Bloc({ donnees }: { donnees: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}

/**
 * L'accueil : l'entreprise et son adresse.
 *
 * ⚠️ `priceRange` est une fourchette, pas un prix. Elle va du lundi à
 * LA BOUTIQUE (1 000 €) à la Fashion Week à L'ATELIER (6 000 €), ce que le
 * site affiche déjà. Ne pas y mettre un prix unique : il serait faux six jours
 * sur sept.
 */
export function DonneesMarque() {
  return (
    <Bloc
      donnees={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#lieu`,
        name: "Chez les Plombiers",
        description:
          "Trois espaces événementiels à la même adresse, au 39 rue des Bourdonnais, Paris 1er.",
        url: SITE_URL,
        telephone: TEL,
        image: `${SITE_URL}/og/defaut.jpg`,
        logo: `${SITE_URL}/images/logo/logo-black.png`,
        address: ADRESSE_POSTALE,
        geo: GEO,
        priceRange: "1000-6000 EUR",
        currenciesAccepted: "EUR",
        paymentAccepted: "Virement bancaire",
        areaServed: { "@type": "City", name: "Paris" },
        sameAs: [
          "https://instagram.com/chezlesplombiers",
          "https://www.google.com/maps/place/Chez+Les+Plombiers/@48.8602622,2.3454547,17z",
        ],
      }}
    />
  );
}

interface Lieu {
  nom: string;
  chemin: string;
  description: string;
  /** En mètres carrés. */
  surface: number;
  /** Debout, maximum. `null` quand le lieu n'est pas fait pour recevoir. */
  capacite: number | null;
  visuel: string;
}

/**
 * Un lieu.
 *
 * ⚠️ `containedInPlace` rattache les trois au même point. Sans ça, Google voit
 * trois établissements distincts à la même adresse — exactement la
 * configuration qui déclenche ses filtres anti-doublon, et le risque de n'en
 * afficher qu'un.
 */
export function DonneesLieu({ lieu }: { lieu: Lieu }) {
  return (
    <Bloc
      donnees={{
        "@context": "https://schema.org",
        "@type": "EventVenue",
        "@id": `${SITE_URL}${lieu.chemin}#lieu`,
        name: `${lieu.nom} — Chez les Plombiers`,
        description: lieu.description,
        url: `${SITE_URL}${lieu.chemin}`,
        telephone: TEL,
        image: `${SITE_URL}/og/${lieu.visuel}.jpg`,
        address: ADRESSE_POSTALE,
        geo: GEO,
        containedInPlace: { "@id": `${SITE_URL}/#lieu` },
        floorSize: {
          "@type": "QuantitativeValue",
          value: lieu.surface,
          unitCode: "MTK",
        },
        ...(lieu.capacite ? { maximumAttendeeCapacity: lieu.capacite } : {}),
      }}
    />
  );
}

/**
 * Les trois lieux, avec les chiffres QUE LEUR PAGE AFFICHE.
 * Les changer ici sans changer la page, ou l'inverse, crée la contradiction
 * que ce fichier existe pour éviter.
 */
export const LIEUX_STRUCTURES: Record<string, Lieu> = {
  atelier: {
    nom: "L'Atelier",
    chemin: "/atelier",
    description:
      "200 m² de plain-pied au fond de la cour, jusqu'à 150 personnes debout. Une voiture peut y entrer.",
    surface: 200,
    capacite: 150,
    visuel: "atelier",
  },
  boutique: {
    nom: "La Boutique",
    chemin: "/boutique",
    description:
      "40 m² avec vitrine sur la rue des Bourdonnais. Pop-up, showroom de presse, lancement.",
    surface: 40,
    // Pas de capacité : le lieu n'est pas fait pour recevoir, et
    // `venues.ts` le dit aussi (`maxGuests: null`).
    capacite: null,
    visuel: "boutique",
  },
  appartement: {
    nom: "L'Appartement",
    chemin: "/appartement",
    description:
      "100 m² au premier étage, jusqu'à 50 personnes. Dîners, réunions, shootings.",
    surface: 100,
    capacite: 50,
    visuel: "appartement",
  },
};
