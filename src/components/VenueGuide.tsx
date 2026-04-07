"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowUpRight, Check, AlertTriangle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reusable primitives                                                */
/* ------------------------------------------------------------------ */

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-700 leading-relaxed text-[15px]">{children}</p>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-sm uppercase tracking-[0.15em] text-black mt-6 mb-3 font-medium">
      {children}
    </h4>
  );
}

function CheckList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5 mt-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[15px] text-gray-700 leading-relaxed"
        >
          <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[15px] text-gray-700 leading-relaxed"
        >
          <span className="text-gray-400 mt-1.5 flex-shrink-0">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-3 border-l-2 border-amber-400 bg-amber-50/70 px-4 py-3 text-[14px] text-amber-900 leading-relaxed">
      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-black border-b border-gray-300 hover:border-black transition-colors"
    >
      {children}
      <ArrowUpRight className="w-3 h-3" />
    </a>
  );
}

function MailLink({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="text-black border-b border-gray-300 hover:border-black transition-colors"
    >
      {email}
    </a>
  );
}

function PhoneLink({
  display,
  raw,
}: {
  display: string;
  raw: string;
}) {
  return (
    <a
      href={`https://wa.me/${raw}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black border-b border-gray-300 hover:border-black transition-colors"
    >
      {display}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion item                                                     */
/* ------------------------------------------------------------------ */

interface SectionProps {
  id: string;
  icon: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ id, icon, title, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={id} className="border-b border-gray-200 scroll-mt-24">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-4">
          <span
            aria-hidden
            className="text-2xl select-none w-8 flex-shrink-0 text-center"
          >
            {icon}
          </span>
          <span className="text-lg lg:text-xl font-light pr-8">{title}</span>
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12 pr-2 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */

const TOC: { id: string; icon: string; label: string }[] = [
  { id: "guide-lieu", icon: "🏛", label: "Le lieu" },
  { id: "guide-tarifs", icon: "💰", label: "Tarifs & réservation" },
  { id: "guide-inclus", icon: "🧚", label: "Ce qu'inclut la location" },
  { id: "guide-services", icon: "💪", label: "Services additionnels" },
  { id: "guide-horaires", icon: "🕑", label: "Amplitudes horaires" },
  { id: "guide-fumeurs", icon: "🚬", label: "Règles fumeurs & cour" },
  { id: "guide-securite", icon: "🛡", label: "Sécurité & SSIAP" },
  { id: "guide-reglement", icon: "💼", label: "Règlement & caution" },
  { id: "guide-restitution", icon: "🔁", label: "Restitution de la caution" },
  { id: "guide-non-respect", icon: "🚫", label: "Non-respect des conditions" },
  { id: "guide-dimensions", icon: "📐", label: "Dimensions & espaces" },
  { id: "guide-lumiere", icon: "💡", label: "Lumière" },
  { id: "guide-son", icon: "🔊", label: "Son" },
  { id: "guide-video", icon: "📽", label: "Vidéo-projection" },
  { id: "guide-cuisine", icon: "🍽", label: "Cuisine" },
  { id: "guide-mobilier", icon: "🪑", label: "Mobilier" },
  { id: "guide-acces", icon: "🚪", label: "Accès & logistique" },
  { id: "guide-visite", icon: "📅", label: "Visiter & réserver" },
  { id: "guide-wifi", icon: "📶", label: "WiFi — Jour J" },
  { id: "guide-resume", icon: "🌟", label: "En résumé" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function VenueGuide() {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-6">
            Guide complet
          </p>
          <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-tight">
            Toutes les informations pratiques
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Le guide détaillé du lieu : tarifs, équipements, dimensions, règles
            d&apos;usage et logistique pour préparer votre événement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
          {/* Sticky table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">
                Sommaire
              </p>
              <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-2">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-black transition-colors py-1"
                  >
                    <span aria-hidden className="text-base w-5 text-center">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Accordion sections */}
          <div className="border-t border-gray-200">
            {/* 🏛 LE LIEU */}
            <Section id="guide-lieu" icon="🏛" title="Le lieu" defaultOpen>
              <Para>
                Chez les Plombiers est un espace événementiel modulable de{" "}
                <strong>~200 m²</strong> au rez-de-chaussée, situé au cœur du 1er
                arrondissement de Paris.
              </Para>
              <Para>
                Le lieu se compose de <strong>trois espaces</strong> qui peuvent
                être utilisés en open space ou délimités par des rideaux.
              </Para>

              <H4>L&apos;entrée</H4>
              <Para>
                Espace d&apos;accueil avec 4 fauteuils Pangea et une table basse
                noire en métal. Accès aux sanitaires à droite, puis la grande
                cuisine en U full équipée avec un frigo, un congélateur, un four,
                un lave-vaisselle et une machine à glaçons. En face, une
                tisanerie avec la vaisselle pour une quinzaine de personnes
                (verres, assiettes, tasses, couverts), une machine à café à
                grain Jura, une bouilloire et un micro-ondes.
              </Para>

              <H4>L&apos;espace cyclo</H4>
              <Para>
                Espace central avec le mur cyclorama (mur incurvé blanc), idéal
                pour la projection vidéo, les shootings ou les scénographies de
                marque. Une alcôve (renfoncement blanc) offre un espace distinct
                dans cet espace.
              </Para>

              <H4>L&apos;espace canapé</H4>
              <Para>
                Espace en fond de salle avec le canapé Pierre Paulin, accessible
                également par la porte impasse.
              </Para>

              <H4>Sous-sol</H4>
              <Para>
                Un <strong>sous-sol de 100 m²</strong> est disponible pour le
                stockage.
              </Para>
            </Section>

            {/* 💰 TARIFS */}
            <Section id="guide-tarifs" icon="💰" title="Tarifs & réservation">
              <Para>
                Nos tarifs évoluent en fonction du jour de la semaine, de la
                période, du délai avant l&apos;événement et du format
                (demi-journée, journée, soirée).
              </Para>
              <Para>
                Consultez les disponibilités et tarifs actualisés ici :{" "}
                <ExternalLink href="https://pricing.chezlesplombiers.fr">
                  pricing.chezlesplombiers.fr
                </ExternalLink>
              </Para>
              <H4>✨ Fashion Week</H4>
              <Para>
                💎 <strong>Forfait semaine sur demande</strong> — mise à
                disposition complète sur toute la durée de la Fashion Week.
              </Para>
            </Section>

            {/* 🧚 INCLUS */}
            <Section
              id="guide-inclus"
              icon="🧚"
              title="Ce qu'inclut la location"
            >
              <CheckList
                items={[
                  "Ménage d'entrée et de sortie",
                  "Accueil des clients et prestataires en début d'événement",
                  "Espace de stockage en sous-sol (100 m²)",
                  "Mobilier (canapé, fauteuils, tables)",
                  "Cuisine équipée : réfrigérateur, congélateur, four, machine à glaçons, lave-vaisselle, machine à café, micro-ondes, vaisselle, couverts, verres",
                  "Système de rideaux pour moduler l'espace",
                  "Vidéo-projecteur + Apple TV et prise HDMI",
                  "Système audio Sonos, AirPlay ou XLR",
                  "4 micros HF",
                ]}
              />
              <Warning>
                Aucun régisseur permanent n&apos;est inclus dans la location.
                Une présence technique ou coordination sur place peut être
                proposée en option.
              </Warning>
            </Section>

            {/* 💪 SERVICES */}
            <Section id="guide-services" icon="💪" title="Services additionnels">
              <Bullets
                items={[
                  "🍽️ Service petit-déjeuner / catering",
                  "🧹 Passage supplémentaire du service de ménage",
                  "🚚 Manutention / retrait du mobilier (option à 250 €)",
                  "🎯 Direction et organisation d'événement",
                ]}
              />
            </Section>

            {/* 🕑 HORAIRES */}
            <Section id="guide-horaires" icon="🕑" title="Amplitudes horaires">
              <H4>⏰ Demi-journée</H4>
              <Bullets items={["7h00 → 13h00", "ou 13h00 → 19h00"]} />

              <H4>🗓 Journée complète</H4>
              <Bullets
                items={[
                  <>
                    Accès à partir de <strong>7h00</strong>
                  </>,
                  <>
                    Public autorisé jusqu&apos;à <strong>00h00</strong>
                  </>,
                  "Démontage possible après minuit sur validation préalable",
                ]}
              />

              <H4>⚠️ Contraintes</H4>
              <Bullets
                items={[
                  <>
                    🔇 Musique arrêtée impérativement à <strong>23h00</strong>
                  </>,
                  "À 00h00, le lieu doit être totalement vidé de ses invités",
                  "Les temps de montage et démontage peuvent être facturés selon disponibilité",
                ]}
              />
            </Section>

            {/* 🚬 FUMEURS & COUR */}
            <Section id="guide-fumeurs" icon="🚬" title="Règles fumeurs & cour">
              <Para>
                Il est possible de fumer dans la cour intérieure jusqu&apos;à{" "}
                <strong>22h00</strong>. Après 22h00, les fumeurs doivent se
                rendre sur la voie publique.
              </Para>
              <H4>🚚 Utilisation de la cour & de l&apos;impasse</H4>
              <Bullets
                items={[
                  "La cour peut être utilisée pour le déchargement rapide uniquement",
                  "Aucun stationnement autorisé dans la cour",
                  "Aucun montage ou démontage autorisé dans la cour",
                  "La deuxième porte donne sur l'impasse des Bourdonnais, qui peut être utilisée pour les opérations de montage et démontage",
                ]}
              />
            </Section>

            {/* 🛡 SÉCURITÉ */}
            <Section id="guide-securite" icon="🛡" title="Sécurité & SSIAP">
              <Para>
                Pour tout événement accueillant{" "}
                <strong>plus de 50 personnes</strong>, un{" "}
                <strong>agent SSIAP</strong> est requis. Pour les événements de{" "}
                <strong>plus de 100 personnes</strong>,{" "}
                <strong>deux agents SSIAP</strong> sont demandés.
              </Para>
              <Para>
                La réservation des agents SSIAP est à organiser{" "}
                <strong>en amont de l&apos;événement</strong>.
              </Para>
              <Para>Nous pouvons vous orienter vers :</Para>
              <div className="bg-gray-50 border border-gray-200 px-5 py-4 mt-2">
                <p className="font-medium text-black mb-1">Salim</p>
                <p className="text-sm text-gray-600">
                  📞{" "}
                  <PhoneLink display="+33 7 55 30 06 69" raw="33755300669" />
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Il travaille avec une équipe et peut mobiliser plusieurs
                  agents si nécessaire.
                </p>
              </div>
            </Section>

            {/* 💼 RÈGLEMENT */}
            <Section
              id="guide-reglement"
              icon="💼"
              title="Conditions de règlement & caution"
            >
              <H4>🕰 Validité des options</H4>
              <Para>
                Une option est valable <strong>7 jours</strong>. Passé ce
                délai, elle devient automatiquement caduque. La réservation ne
                peut être confirmée qu&apos;après réception du{" "}
                <strong>règlement intégral</strong>.
              </Para>

              <H4>💳 Location</H4>
              <Para>100 % exigible à la réservation par virement bancaire.</Para>

              <H4>💰 Caution</H4>
              <Bullets
                items={[
                  <>
                    <strong>5 000 €</strong>
                  </>,
                  "Virement bancaire uniquement",
                  "Aucune rentrée dans les lieux sans caution reçue",
                ]}
              />
            </Section>

            {/* 🔁 RESTITUTION */}
            <Section
              id="guide-restitution"
              icon="🔁"
              title="Restitution de la caution"
            >
              <Para>
                La restitution de la caution est conditionnée à la remise en
                état complète du lieu. Le mobilier doit être replacé exactement
                comme trouvé.
              </Para>
              <Para>
                Tant que cette remise en ordre n&apos;est pas effectuée, la
                caution reste bloquée. Si le mobilier n&apos;a pas été remis en
                place dans les <strong>24 heures</strong> suivant la fin de la
                location, une intervention sera organisée automatiquement et un{" "}
                <strong>forfait de 300 € HT</strong> sera retenu sur la caution.
              </Para>
              <Para>
                Toute dégradation importante pourra entraîner une retenue
                partielle ou totale.
              </Para>
            </Section>

            {/* 🚫 NON-RESPECT */}
            <Section
              id="guide-non-respect"
              icon="🚫"
              title="Non-respect des conditions"
            >
              <Para>
                En cas de non-paiement ou de non-respect du contrat, Chez les
                Plombiers se réserve le droit d&apos;annuler la réservation ou
                d&apos;effectuer une retenue sur la caution.
              </Para>
            </Section>

            {/* 📐 DIMENSIONS */}
            <Section
              id="guide-dimensions"
              icon="📐"
              title="Dimensions & espaces"
            >
              <H4>Rez-de-chaussée (~200 m²)</H4>
              <Para>
                Hauteur sous plafond : <strong>~4,10 m</strong>
              </Para>

              <H4>Sous-sol</H4>
              <Para>
                <strong>100 m²</strong> — stockage, avec accès depuis
                l&apos;intérieur du lieu.
              </Para>

              <H4>Mur cyclorama</H4>
              <Bullets
                items={[
                  <>
                    Largeur : <strong>4,63 m</strong>
                  </>,
                  <>
                    Hauteur : <strong>3,40 m</strong>
                  </>,
                ]}
              />

              <H4>Portes d&apos;accès</H4>
              <div className="overflow-x-auto mt-2 -mx-2">
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 border-b border-gray-200">
                        Accès
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 border-b border-gray-200">
                        Largeur
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600 border-b border-gray-200">
                        Hauteur
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                        Porte principale (rue des Bourdonnais)
                      </td>
                      <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                        2,19 m
                      </td>
                      <td className="px-4 py-3 text-gray-700 border-b border-gray-100">
                        3,66 m
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">
                        Porte secondaire (impasse des Bourdonnais)
                      </td>
                      <td className="px-4 py-3 text-gray-700">1,60 m</td>
                      <td className="px-4 py-3 text-gray-700">2,39 m</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Para>
                📐 Les plans complets sont disponibles dans la section{" "}
                <Link
                  href="/#equipments"
                  className="text-black border-b border-gray-300 hover:border-black transition-colors"
                >
                  Infos Techniques
                </Link>{" "}
                de la page d&apos;accueil (4 plans téléchargeables).
              </Para>
            </Section>

            {/* 💡 LUMIÈRE */}
            <Section id="guide-lumiere" icon="💡" title="Lumière">
              <Para>
                Le lieu dispose d&apos;une infrastructure lumière complète
                pilotée en <strong>DMX</strong>, avec des rails auxquels il est
                possible d&apos;ajouter des projecteurs supplémentaires.
              </Para>

              <H4>Rails & projecteurs</H4>
              <Para>
                Les rails sont compatibles avec des projecteurs{" "}
                <strong>3 allumages</strong> (DALI ou DMX). Il est possible
                d&apos;y accrocher des spots externes supplémentaires.
              </Para>

              <H4>Pilotage DMX</H4>
              <Para>
                L&apos;infrastructure est pilotée via un boîtier{" "}
                <strong>CueCore 3</strong>. Il est possible de s&apos;y
                connecter pour programmer ou contrôler l&apos;ensemble de
                l&apos;installation lumière.
              </Para>

              <Warning>
                Tout ajout de matériel ou connexion au système DMX doit être
                discuté et validé <strong>en amont</strong> avec notre équipe.
                <br />
                <span className="inline-block mt-2">
                  📩 <MailLink email="contact@chezlesplombiers.fr" />
                </span>
              </Warning>
            </Section>

            {/* 🔊 SON */}
            <Section id="guide-son" icon="🔊" title="Son">
              <Para>
                Le lieu est équipé d&apos;un système audio <strong>Sonos</strong>{" "}
                (installation Sonos Port), diffusé via des enceintes en plafond
                dans l&apos;ensemble de l&apos;espace.
              </Para>

              <H4>Connexion</H4>
              <Para>Quatre modes de connexion sont disponibles :</Para>
              <Bullets
                items={[
                  <>
                    <strong>Sonos Connect</strong> — via l&apos;application
                    Sonos
                  </>,
                  <>
                    <strong>Spotify Connect</strong> — directement depuis
                    Spotify
                  </>,
                  <>
                    <strong>AirPlay</strong> — depuis n&apos;importe quel
                    appareil Apple
                  </>,
                  <>
                    <strong>XLR</strong> — depuis les fiches XLR dans
                    l&apos;alcôve près du mur cyclo
                  </>,
                ]}
              />

              <Warning>
                Pour se connecter au système Sonos, il faut être connecté au
                réseau WiFi principal{" "}
                <strong>&laquo; Chez les Plombiers &raquo;</strong> (et non au
                réseau guest). Les identifiants de ce réseau sont communiqués
                sur place le jour J.
              </Warning>

              <Para>
                À noter : toute personne connectée à ce réseau peut prendre le
                contrôle du son. Nous recommandons de désigner un seul
                opérateur son pour l&apos;événement.
              </Para>
            </Section>

            {/* 📽 VIDÉO-PROJECTION */}
            <Section id="guide-video" icon="📽" title="Vidéo-projection">
              <Para>
                Le lieu est équipé d&apos;un{" "}
                <strong>vidéo-projecteur Optoma ZU820T (8800 lumens)</strong>{" "}
                fixe au plafond, projetant sur le mur cyclorama.
              </Para>

              <H4>Dimensions de projection (sur mur cyclo)</H4>
              <Bullets
                items={[
                  <>
                    Largeur : <strong>4,53 m</strong>
                  </>,
                  <>
                    Hauteur : <strong>2,55 m</strong> (format 16:9)
                  </>,
                ]}
              />

              <H4>Connexion</H4>
              <Para>
                La projection est pilotée via une <strong>Apple TV</strong>{" "}
                connectée au réseau &laquo; Chez les Plombiers &raquo;.
              </Para>

              <H4>Connexion AirPlay</H4>
              <ol className="space-y-2 mt-2 text-[15px] text-gray-700 leading-relaxed list-decimal pl-5">
                <li>
                  Connectez votre appareil au WiFi{" "}
                  <strong>&laquo; Chez les Plombiers &raquo;</strong>
                </li>
                <li>
                  Activez AirPlay et sélectionnez{" "}
                  <strong>&laquo; Apple TV des Plombiers &raquo;</strong>
                </li>
              </ol>

              <H4>Affichage d&apos;une image fixe (via Screen Canvas)</H4>
              <Para>
                Il est possible d&apos;afficher une image fixe (logo, visuel de
                marque) via l&apos;application Screen Canvas sur l&apos;Apple
                TV. Uploadez votre image sur{" "}
                <ExternalLink href="https://imgur.com/">imgur.com</ExternalLink>{" "}
                et entrez le code à 5 caractères dans l&apos;application.
              </Para>
            </Section>

            {/* 🍽 CUISINE */}
            <Section id="guide-cuisine" icon="🍽" title="Cuisine">
              <H4>Cuisine de jour</H4>
              <Para>
                Accessible en permanence, séparée de l&apos;espace principal
                par des rideaux :
              </Para>
              <Bullets
                items={[
                  "Évier + robinetterie",
                  "Machine à café",
                  "Micro-ondes",
                  "Poubelles sous plan (tri sélectif)",
                  "Rangements : couverts dans le placard gauche, verres dans le placard droit",
                ]}
              />

              <H4>Cuisine principale</H4>
              <Para>Cuisine professionnelle entièrement équipée :</Para>
              <Bullets
                items={[
                  "Réfrigérateur",
                  "Congélateur",
                  <>
                    Four <strong>Siemens</strong>
                  </>,
                  <>
                    Machine à glaçons <strong>ITV</strong>
                  </>,
                  "Lave-vaisselle",
                  "Plan de travail en U — vaisselle, ustensiles disponibles",
                ]}
              />
            </Section>

            {/* 🪑 MOBILIER */}
            <Section id="guide-mobilier" icon="🪑" title="Mobilier">
              <Para>Le mobilier inclus dans la location :</Para>
              <Bullets
                items={[
                  <>
                    <strong>Canapé Pierre Paulin</strong> (5,60 m de long,
                    orientable soit en S, soit en U, soit droit)
                  </>,
                  <>
                    <strong>4 Fauteuils Pangea</strong> (espace entrée)
                  </>,
                  <>
                    <strong>Table roulante Fluido</strong> — 166 × 106 × 75 cm,
                    structure noire, plateau laqué cappuccino, 4 roulettes
                  </>,
                  "Tables et chaises disponibles sur demande",
                ]}
              />
              <Warning>
                Le mobilier doit être remis en place exactement comme trouvé en
                fin de location.
              </Warning>
            </Section>

            {/* 🚪 ACCÈS */}
            <Section id="guide-acces" icon="🚪" title="Accès & logistique">
              <H4>Deux entrées</H4>
              <Para>
                <strong>Porte principale</strong> — rue des Bourdonnais (2,19 m
                × 3,66 m) — accès public et livraisons légères.
              </Para>
              <Para>
                <strong>Porte secondaire</strong> — impasse des Bourdonnais
                (1,60 m × 2,39 m, deux vantaux de 0,80 m) — accès
                montage/démontage.
              </Para>

              <H4>Cour intérieure</H4>
              <Para>
                La cour donne sur la rue des Bourdonnais et peut être utilisée
                uniquement pour le <strong>déchargement rapide</strong>. Aucun
                stationnement ni montage/démontage autorisé dans la cour.
              </Para>

              <H4>Sous-sol</H4>
              <Para>
                Accès depuis l&apos;intérieur du lieu. Surface de{" "}
                <strong>100 m²</strong> disponible pour le stockage pendant
                toute la durée de la location.
              </Para>
            </Section>

            {/* 📅 VISITER */}
            <Section id="guide-visite" icon="📅" title="Visiter & réserver">
              <H4>Visiter le lieu</H4>
              <Para>
                <ExternalLink href="https://calendly.com/chezlesplombiers/visite">
                  calendly.com/chezlesplombiers/visite
                </ExternalLink>
              </Para>

              <H4>Poser une option ou réserver</H4>
              <Para>
                <ExternalLink href="https://pricing.chezlesplombiers.fr">
                  pricing.chezlesplombiers.fr
                </ExternalLink>
              </Para>

              <H4>Nous contacter</H4>
              <Para>
                📩 <MailLink email="contact@chezlesplombiers.fr" />
                <br />
                📱{" "}
                <PhoneLink display="WhatsApp" raw="33688679981" />
              </Para>
            </Section>

            {/* 📶 WIFI */}
            <Section id="guide-wifi" icon="📶" title="WiFi — Jour J">
              <Para>
                <strong>Réseau guest (invités & prestataires) :</strong>
              </Para>
              <div className="bg-gray-50 border border-gray-200 px-5 py-4 mt-2 font-mono text-sm">
                <p className="text-gray-700">
                  <span className="text-gray-400">SSID : </span>
                  Chez les Plombiers Guest
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="text-gray-400">Mot de passe : </span>
                  bienvenue
                </p>
              </div>
            </Section>

            {/* 🌟 RÉSUMÉ */}
            <Section id="guide-resume" icon="🌟" title="En résumé">
              <Para>
                Chez les Plombiers, un lieu modulable et inspirant pour vos
                projets :
              </Para>
              <Para>
                📸 Shootings · 🍷 Dîners privés · 📰 Événements presse · 👔
                Réunions · 🪩 Expériences de marque · 🎬 Projections
              </Para>
              <div className="bg-gray-50 border border-gray-200 px-5 py-4 mt-4 space-y-2 text-[15px]">
                <p className="text-gray-700">
                  📍 39 rue des Bourdonnais — Paris 1er
                </p>
                <p className="text-gray-700">
                  ✉️ <MailLink email="contact@chezlesplombiers.fr" />
                </p>
                <p className="text-gray-700">
                  📞{" "}
                  <PhoneLink display="+33 6 88 67 99 81" raw="33688679981" />
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </section>
  );
}
