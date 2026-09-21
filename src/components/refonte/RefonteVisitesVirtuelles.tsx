import { Barre, CADRE, Corps, LAITON, Page, Pied, Retour, lien } from "./chrome";

/**
 * `/visites-virtuelles` — se promener dans les lieux sans venir.
 *
 * ⚠️ POURQUOI UNE PAGE, ET PAS UN BLOC SUR L'ACCUEIL. Sur le site de
 * production, la visite virtuelle est la cinquième section de la page
 * d'accueil : personne ne la trouve, et il n'y en a qu'une. Étienne, le
 * 21/09/2026 : « on pourrait retrouver toutes les visites virtuelles ici ».
 * Une adresse qu'on envoie à un client vaut mieux qu'une ancre à faire
 * défiler — c'est toute la thèse de cette refonte.
 *
 * ⚠️ L'IFRAME NE SE CHARGE QU'À LA DEMANDE. Une visite Matterport pèse
 * plusieurs mégaoctets et démarre un moteur 3D ; en charger deux d'un coup
 * ferait ramer un iPad et brûlerait le forfait d'un visiteur en 4G. On affiche
 * donc l'affiche du lieu, et le moteur ne démarre qu'au clic.
 *
 * ⏳ Il manque LA BOUTIQUE (ouverte le 01/09/2026, pas encore scannée) et le
 * lien de L'APPARTEMENT — sa visite existe, mais son URL n'est nulle part dans
 * le code. À demander à Étienne.
 */
const VISITES = [
  {
    lieu: "L'Atelier",
    detail: "200 m² de plain-pied, la cour et les deux cuisines",
    url: "https://my.matterport.com/show/?m=ucvB4GW2Go6",
  },
  {
    lieu: "L'Appartement",
    detail: "100 m² au premier étage",
    url: null,
  },
  {
    lieu: "La Boutique",
    detail: "Ouverte le 1er septembre 2026 — pas encore scannée",
    url: null,
  },
] as const;

export function RefonteVisitesVirtuelles() {
  return (
    <Page>
      <Barre />
      <Corps>
        <Retour href={lien("/")} texte="Accueil" />
        <h1 className="mt-3 font-clp text-sm font-bold uppercase tracking-[0.1em]">
          Visites virtuelles
        </h1>
        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
          Se promener dans les lieux à 360°, depuis un ordinateur ou un
          téléphone. C&apos;est le plus proche d&apos;une visite sans se
          déplacer — et ça se partage par lien, à toute une équipe.
        </p>

        <div className="mt-8 space-y-3">
          {VISITES.map((v) => (
            <div key={v.lieu} className={`${CADRE} p-5`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-clp text-[13px] font-bold uppercase tracking-[0.08em]">
                  {v.lieu}
                </h2>
                {v.url ? (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[12px] transition-opacity hover:opacity-70"
                    style={{ color: LAITON }}
                  >
                    Ouvrir la visite &rarr;
                  </a>
                ) : (
                  <span className="font-mono text-[11px] text-[#8A8A8A]">à venir</span>
                )}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#A8A29A]">
                {v.detail}
              </p>
            </div>
          ))}
        </div>
      </Corps>
      <Pied />
    </Page>
  );
}
