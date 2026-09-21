import { Barre, CADRE, Corps, LAITON, Page, Pied } from "./chrome";
import { ADRESSE } from "./data";

/**
 * `/visiter` — la visite, dans notre décor.
 *
 * ⚠️ Le calendrier est INTÉGRÉ, pas lié. Étienne voulait sortir de la
 * présentation de Calendly ; on ne reconstruit pas la prise de rendez-vous pour
 * autant. Derrière ce bouton il y a les disponibilités croisées sur six
 * calendriers Google, les confirmations, les rappels, les annulations et les
 * reports. Calendly fait tout ça et ça ne se voit pas. Ce qu'on récupère, c'est
 * l'adresse, la page et les couleurs — le client ne quitte jamais le site.
 *
 * ⚠️ Le `frame-src` de la CSP doit autoriser `calendly.com`, sinon l'iframe est
 * bloquée EN SILENCE : page blanche, aucune erreur. Fait le 20/09/2026 dans
 * `next.config.ts`.
 *
 * ⚠️ Un lien direct vers Calendly est gardé sous le calendrier. Si l'intégration
 * échoue — bloqueur de traceurs, réseau d'entreprise —, la visite reste
 * réservable. Ne pas le retirer parce qu'il fait doublon : il est le filet.
 */
/**
 * ⚠️ `hide_event_type_details=1` n'est pas un détail : c'est ce qui fait tenir
 * le calendrier dans la page. Le bandeau de Calendly (logo, titre, durée, lieu,
 * description) prend près de 400 px et répète mot pour mot la colonne de gauche
 * — durée, quand, prix, où. En le masquant, on supprime le doublon ET la barre
 * de défilement interne qu'Étienne a relevée : « on est obligé de scroller pour
 * voir les dates ».
 *
 * Les couleurs du lieu sont bien reprises par le widget. En revanche
 * `hide_gdpr_banner` reste sans effet : Calendly affiche sa propre bannière de
 * cookies au premier passage, et ce réglage dépend de son offre. Rien à
 * corriger côté site.
 */
const CALENDLY =
  "https://calendly.com/chezlesplombiers/visite" +
  "?hide_event_type_details=1&hide_gdpr_banner=1" +
  "&background_color=1A1A1A&text_color=E8E4DC&primary_color=C8A96E";

const REPERES: Array<[string, string]> = [
  ["Durée", "Une demi-heure, parfois trois quarts d'heure si vous avez un projet précis."],
  ["Quand", "Du lundi au samedi, de 10h à 18h."],
  ["Prix", "Gratuit, sans engagement."],
  ["Où", `${ADRESSE}. On se retrouve devant la grille du 39.`],
];

export function RefonteVisiter() {
  return (
    <Page>
      <Barre />
      <Corps>
        <div className="mt-3 border-b border-[#3A3A3A] pb-8 pt-4">
          <h1 className="font-clp uppercase">
            <span className="block text-sm font-bold leading-relaxed tracking-[0.1em]">
              Réserver une visite
            </span>
            <span className="mt-1 block text-[11px] font-normal tracking-[0.16em] text-[#A8A29A]">
              {ADRESSE}
            </span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#C9C4BC]">
            Le plus simple est de venir voir. On fait le tour des trois espaces,
            on regarde ce que votre projet demande, et vous repartez avec un
            ordre de prix.
          </p>
          {/*
            ⚠️ C'est ICI que la mention compte le plus. Les demandes de
            particuliers arrivent par la visite — Étienne : « très souvent on a
            des visites de particuliers ». Une ligne avant le calendrier coûte
            moins cher qu'une demi-heure sur place.
          */}
          <p
            className={`${CADRE} mt-5 max-w-[62ch] p-4 text-[14px] leading-relaxed`}
            style={{ borderLeft: `2px solid ${LAITON}` }}
          >
            Les visites sont réservées aux professionnels — marques, agences,
            entreprises. Nous n&apos;accueillons pas d&apos;événements pour des
            particuliers : ni anniversaires, ni mariages, ni fêtes familiales.
          </p>
        </div>

        <div className="mt-6 grid items-start gap-3 lg:grid-cols-[1fr_2fr]">
          <div className={`${CADRE} p-5 lg:sticky lg:top-8`}>
            <dl className="space-y-4">
              {REPERES.map(([quoi, valeur]) => (
                <div key={quoi}>
                  <dt className="font-mono text-[11px]" style={{ color: LAITON }}>
                    {quoi}
                  </dt>
                  <dd className="mt-0.5 text-[14px] leading-relaxed text-[#C9C4BC]">
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 border-t border-[#3A3A3A] pt-4">
              <p className="text-[13px] leading-relaxed text-[#8A8A8A]">
                Vous préférez écrire ? WhatsApp répond en quelques minutes.
              </p>
              <a
                href="https://wa.me/33761471073"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-mono text-[11px] uppercase tracking-wider"
                style={{ color: LAITON }}
              >
                Écrire sur WhatsApp →
              </a>
            </div>
          </div>

          <div className={`${CADRE} overflow-hidden`}>
            <iframe
              src={CALENDLY}
              title="Choisir un créneau de visite"
              loading="lazy"
              /*
                Ces hauteurs vont avec `hide_event_type_details` : sans lui, il
                faudrait 1 100 px et on ferait quand même défiler. Ne pas les
                réduire sans revérifier que la fin du mois reste visible.
              */
              className="h-[760px] w-full border-0 sm:h-[700px]"
            />
          </div>
        </div>

        {/* Le filet : si l'intégration est bloquée, la visite reste réservable. */}
        <p className="mt-4 px-1 text-[12px] text-[#5E5E5E]">
          Le calendrier ne s&apos;affiche pas ?{" "}
          <a
            href="https://calendly.com/chezlesplombiers/visite"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#5E5E5E] underline-offset-4 hover:text-[#C9C4BC]"
          >
            Ouvrir la page de réservation
          </a>
          .
        </p>
      </Corps>
      <Pied />
    </Page>
  );
}
