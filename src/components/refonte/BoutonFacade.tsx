"use client";

import { useEffect, useState } from "react";
import { CADRE } from "./chrome";
import { ScanFacade } from "./ScanFacade";

/**
 * « Regardez les trois lieux » — un bouton, et la façade en plein écran.
 *
 * ── POURQUOI UN BOUTON ET PAS UN BLOC ─────────────────────────────────────
 *
 * Deux emplacements ont été essayés le 22/09/2026 — un encart à droite du
 * titre, une image pleine largeur sur `/infos` — et Étienne n'a été convaincu
 * par aucun des deux. Il a proposé mieux : « un petit bouton, et ça ouvre en
 * pop-up ».
 *
 * Il a raison sur les trois plans :
 *
 * 1. Ça coûte UNE LIGNE. Les deux essais prenaient de la place à tout le
 *    monde pour répondre à une question que se pose une minorité — celle qui
 *    n'est jamais venue. Un bouton ne taxe que celui qui clique.
 * 2. Ça nomme la question, donc celui qui se la pose la reconnaît.
 * 3. LE PLEIN ÉCRAN RÈGLE LA GÉOMÉTRIE. C'est ce sur quoi je butais : la
 *    façade fait 1,2:1, impossible d'en faire un bandeau fin sans couper un
 *    lieu, et disproportionnée en pleine largeur. En superposition, l'image
 *    est grande, les étiquettes lisibles, et c'est identique sur les deux
 *    formats — la difficulté disparaît au lieu d'être arbitrée.
 *
 * ⚠️ « Regardez les trois lieux », et pas « Où sont les trois lieux ? » que
 * j'avais proposé. Étienne : « où sont, c'est pas assez précis. Regardez, ça
 * intrigue. » Il a raison : une question appelle une réponse, un impératif
 * appelle un geste — et c'est un geste qu'on attend ici.
 */
export function BoutonFacade() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    function touche(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }
    window.addEventListener("keydown", touche);
    /* Le fond ne défile pas derrière la superposition. */
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [ouvert]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        /*
           ⚠️ PAS DE FLÈCHE. Étienne : « la flèche indique qu'on va à droite,
           alors qu'en fait c'est un pop-up ». Il a raison — une flèche est une
           promesse de navigation, et ici rien ne se déplace : une couche
           s'ouvre par-dessus. Le cadre seul suffit à dire qu'on peut appuyer.
        */
        className={`${CADRE} px-4 py-2.5 font-mono text-[12px] text-[#C9C4BC] transition-colors hover:border-[var(--clp-accent)] hover:text-[#E8E4DC]`}
      >
        Regardez les trois lieux
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-modal
          aria-label="Les trois lieux sur la façade du 39 rue des Bourdonnais"
          onClick={() => setOuvert(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/93 p-3 sm:p-8"
        >
          {/*
            ⚠️ `stopPropagation` sur le contenu : sans lui, toucher une zone de
            la façade refermerait la superposition au lieu de l'ouvrir. Le clic
            sur le fond, lui, doit bien fermer — c'est le geste attendu.
          */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-[900px] overflow-y-auto"
          >
            <ScanFacade />
          </div>

          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOuvert(false)}
            className="absolute right-3 top-3 z-10 border border-white/25 bg-black/60 px-3 py-2 font-mono text-[12px] leading-none text-white transition-colors hover:border-white/60 sm:right-6 sm:top-6"
          >
            Fermer ✕
          </button>
        </div>
      )}
    </>
  );
}
