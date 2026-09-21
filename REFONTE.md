# Refonte du site — liste de chantier

Maquette : **https://www.chezlesplombiers.fr/refonte** (`noindex`, hors sitemap,
liée depuis nulle part). Le site en production ne bouge pas tant qu'on n'a pas
tout construit — la bascule sera un seul déploiement.

**Comment on travaille.** Étienne dicte en vrac quand ça lui vient ; Claude range
ici. Deux régimes : les *détails* (marge, mot, couleur, bloc déplacé) sont faits
sans demander ; les *choix* (page en plus, règle métier, texte public, prix)
donnent lieu à **une** question, et on attend la réponse. Les photos se
choisissent **une page à la fois**, sur planche contact numérotée.

---

## La direction, arrêtée le 20/09/2026

Le site ne cherche plus à être beau — Instagram s'en charge. Il répond à des
questions, complètement, à des adresses qu'on peut envoyer à un client.

Le dessin est **validé** : fond charbon, blocs encadrés, marges latérales,
plusieurs blocs de même largeur par ligne, Eurostile pour les titres.

⚠️ Règles nées d'un retour d'Étienne — les enfreindre, c'est refaire une erreur :

| Règle | Pourquoi |
|---|---|
| Rien ne touche le bord de l'écran | une photo pleine largeur « fait site des années 2010 » |
| Des contours, pas seulement des filets | un bloc encadré se lit comme une fiche |
| Pas de titre qui crie | « UNE VOITURE PEUT ENTRER » en capitales : « c'est too much » |
| Pas de monogramme répété | « ça se répète trop » |
| Pas de « tournages » | ce métier n'est pas recherché |
| Ne jamais dénigrer les concurrents | ni « la plupart des lieux facturent à part » |
| Ne pas écrire la référence RAL | demandé explicitement |
| Pas de « c'est moi qui fais les visites » | « ça me gêne » |
| Les prix vivent à un seul endroit | `/tarifs` |

**Le « lire plus » a été écarté** (proposé par Étienne, argumenté contre par
Claude, à rouvrir s'il insiste) : un site fait pour répondre ne met pas un clic
entre la question et la réponse. Les blocs sont courts ET complets ; le
développé est une vraie page qu'on peut envoyer.

⚠️ **Le H1 en texte n'est pas décoratif.** Le logotype à l'adresse est une
image : Google n'y lit rien. Cette page porte 81 % du trafic du site, sur le nom
et l'adresse. Ne pas supprimer le H1 en trouvant qu'il fait doublon avec le logo.

⚠️ **Eurostile est chargée depuis les .ttf desktop.** La licence web n'est pas
achetée. La maquette ne doit pas devenir publique avant. La fonte **n'a pas de
signe €** — c'est pour ça que les prix sont en `font-mono`.

---

## Fait

- [x] Home refondue — blocs charbon, logotype à l'adresse, preuve voiture en photo
- [x] Eurostile chargée sous `--font-clp` (le site en prod reste sur Wix Madefor)
- [x] Grille de logos clients retirée, noms gardés en toutes lettres
- [x] Logo décliné par lieu — composant `Logo.tsx`, pas de nouveaux PNG
- [x] Adresse retirée du logo d'en-tête (« trop petite »), gardée dans le H1
- [x] Contenu récupéré de la page Notion PRÉ-PROJET (poutres Eiffel, impasse,
      sous-sol backstage, recharge électrique sur le triphasé)
- [x] Trois photos défilables par tuile, et six sur la photo d'ouverture
- [x] Bouton « Appeler » dans la barre, à côté de Tarifs et Visiter
- [x] `/refonte/atelier` — la première page de lieu

## À construire

| Page | Ce qu'elle répond | État |
|---|---|---|
| `/atelier` | photos et infos du lieu | **faite** (sous `/refonte/atelier`) |
| `/boutique` · `/appartement` | idem — à décliner depuis L'ATELIER | à faire |
| `/atelier/technique` | fiche du régisseur **et** les 4 plans à télécharger | **faite** |
| `/visiter` | notre DA, Calendly intégré | **faite** |
| `/photos` | par **série** photographique, avec téléchargement | à faire |
| `/conditions` | ce qu'on vous demande, et pourquoi | **faite** (sous `/refonte/conditions`) |
| `/histoire` | comment on est arrivé là, photos des travaux | à faire |
| `/infos` | existe — à resserrer sur accès / livraison / quartier | à réviser |

## Détails notés, pas encore traités

- **Équipement de LA BOUTIQUE et de L'APPARTEMENT** : inconnu. Les deux cartes
  n'ont donc pas de ligne d'équipements, là où L'ATELIER en a une. Ne pas
  inventer : ça finirait dans un devis.
- La porte de L'ATELIER : **une porte à trois battants**, pas trois portes. À
  écrire correctement sur la page du lieu (ouvrir les trois élargit le passage).
- Le sol : « résine » est le mot retenu — c'est la question qu'on pose le plus.
- Petites pages à ajouter au pied de page (et d'autres à venir).
- **Photo des tuiles** : L'ATELIER est choisi. LA BOUTIQUE et L'APPARTEMENT
  attendent un numéro — planche contact sur `/refonte/tuiles` (temporaire).
- **Plaquette PDF** — Étienne est contre (« c'est un peu comme les cartes de
  visite »), mais des agences en réclament une pour leur direction. Piste à
  garder : plutôt qu'un PDF figé qui périme au premier changement de prix,
  une **feuille de style d'impression** sur la page du lieu — « imprimer en
  PDF » donne alors un document toujours à jour. Rien de décidé.
- **Vidéo du lieu** : il en existe une qu'Étienne aime bien, dans `PHOTOS/`.
  À placer plus tard.
- ⏳ **`/photos` : plusieurs SÉRIES, pas une photothèque** — à traiter quand on
  construira la page. Le lieu a été photographié plusieurs fois, par des
  personnes différentes (dont Justin, ami photographe, dont Étienne aime la
  série) : même lieu, traitements très différents — une série bleutée, une plus
  jaune. Ce n'est pas un détail d'archivage : **des clients téléchargent ces
  photos pour leurs propres présentations**, et chacun préfère une série. La
  page devra donc les laisser choisir par série, pas mélanger dans une grille
  unique, et permettre le téléchargement.
- Les 5 vignettes photos de la home sont des bouche-trous : « défilés » montre
  une salle vide, « expositions » montre la cour.
- Chercher une photo d'une voiture **en train d'entrer** (celle en place est la
  Triumph garée à l'intérieur, dîner Maison 123).
- Charbon froid (#1A1A1A) pour le site, charbon marron (#1C1A17) pour L'ATELIER.
  À confirmer, Étienne trouve le marron « plus chaud ».

## ⚠️ Le jour de la bascule

Tout tient dans **une fonction**, `lien()` dans `chrome.tsx`. Les données
portent les URL définitives (`/atelier`, `/infos`, `/visiter`) ; cette fonction
ajoute le préfixe `/refonte`. Le jour venu, elle renvoie `href` tel quel et tout
le site bascule d'un coup. `/tarifs` en est exempté : c'est l'autre zone Next,
déjà à son adresse définitive.

Restera à faire le même jour : le sitemap, les redirections depuis les anciennes
URL, le retrait du `noindex`, et la suppression de `/refonte/tuiles` et
`/refonte/photos` (planches contact temporaires).

## ⚠️ Fiche du lieu ou fiche technique ? Le test

Question posée par Étienne le 20/09/2026 : « on peut dire qu'il y a du son, il
y a de l'image, mais tout ça il faut peut-être le mettre dans un truc
technique ». Il avait raison. La règle qui tranche chaque ligne :

> **Est-ce que ça change ma DÉCISION de louer → la page du lieu.
> Est-ce que ça change mon PLAN d'installation → `/atelier/technique`.**

« On peut projeter 4,63 m de large » décide. « Optoma ZU820T, HDMI, RS232,
trigger 12 V » exécute. Les deux sont vrais et utiles, mais pas à la même
personne : un client qui compare trois lieux, contre un régisseur qui prépare
son camion.

⚠️ Ne pas rapatrier les modèles sur la page du lieu « pour faire complet ».
C'est ce qui en avait fait un mur, et c'est ce qui rend la fiche technique
inutile.

⏳ **Photos techniques** — à faire, sur `/atelier/technique` seulement : le coin
régie, le grill au plafond, la prise XLR murale, le tableau électrique. Ce sont
des photos de repérage, comme celles de `/infos`.

## ⚠️ NE PAS ÉCRIRE « ERP »

Le classement n'est **pas obtenu** au 20/09/2026 — Étienne : « je ne suis pas
encore ERP, il ne faut pas en parler ». Toutes les mentions ont été retirées du
site refondu (`data.ts`, `data-technique.ts`, `regles.ts`).
**L'accessibilité PMR et les WC PMR, eux, sont réels** et peuvent être annoncés.
⚠️ Le site EN PRODUCTION dit encore « lieu ERP » à plusieurs endroits —
à nettoyer à la bascule, ou avant si le sujet est sensible.

## ⚠️ Où écrire quoi — la règle à ne pas perdre

Trois registres, et ils ne se mélangent pas (distinction posée par Étienne le
20/09/2026) :

| Registre | Ce que c'est | Où ça vit |
|---|---|---|
| **La fiche** | ce que le lieu **est** — 4,63 m, 36 kVA | `data.ts` → pages de lieu |
| **Le mode d'emploi** | comment ça **marche** — venir, livrer, circuler | `data-infos.ts` → `/infos` |
| **Les règles** | ce qu'on vous **demande** — ranger, prévenir | `regles.ts` → `/conditions` |

*Si la phrase peut commencer par « merci de », c'est une règle.*

**`regles.ts` est la source unique.** Une règle ajoutée ailleurs n'arrive ni au
concierge `/guide` ni au contrat. Le fichier porte le principe qui gouverne les
autres : *le ménage nettoie, il ne range pas.*

⏳ **Reste à brancher** : `/guide` (le concierge IA) et le contrat doivent lire
`regles.ts` au lieu d'en garder une copie. Tant que ce n'est pas fait, il y a
deux copies — et on sait déjà ce que ça donne : la base du concierge portait
encore « Couvre-feu bruit : [À REMPLIR PAR FRED] » (corrigé le 20/09/2026).

**Pas de moteur de recherche sur `/infos`.** Sur sept sections, un sommaire bat
une recherche : on voit tout, on n'a pas à deviner le mot. Et le moteur
intelligent existe déjà — c'est `/guide`. Le brancher sur `regles.ts` plutôt que
d'en construire un second. À reconsidérer si la page dépasse ~50 entrées.

## ⚠️ TROIS CONTRADICTIONS À TRANCHER — relevées le 21/09/2026

Elles opposent la page Notion « FR — INFOS GÉNÉRALES » (le document envoyé aux
clients) à ce qu'Étienne a dicté. **Aucune n'a été tranchée en silence.**

| Sujet | Le Notion dit | Étienne dit | Retenu sur le site |
|---|---|---|---|
| **Agents de sécurité** | 1 agent SSIAP au-delà de **50** pers., 2 au-delà de **100** | 1 jusqu'à **30**, 2 au-delà de **30**, 3 au-delà de **80** | ni l'un ni l'autre — la page dit que le seuil est à confirmer |
| **Hauteur sous plafond** | **~4,10 m** | **4,50 m** | 4,50 m, avec une réserve affichée |
| **Ménage** | ménage **d'entrée ET de sortie** inclus | ménage **de sortie** seulement | « ménage de sortie compris » |

⚠️ Le seuil d'agents est le plus sérieux : c'est une obligation de sécurité, et
un chiffre faux engage la responsabilité. À trancher avant la mise en ligne.

⚠️ Autre écart, hors refonte : le Notion donne **+33 6 88 67 99 81** comme
numéro public, le site **+33 7 61 47 10 73**. Lequel fait foi ?

## À trancher par Étienne

- ✅ **Chiffres de L'ATELIER, tranchés par Étienne le 20/09/2026** : capacité
  **150 debout**, hauteur sous plafond **4,50 m**. L'ERP autorise 199, mais
  « 199 fait vachement rappel à l'ERP, c'est un chiffre qu'on donne que pour
  ça ; au-delà de 150 c'est trop ». La hauteur varie selon les poutres.
- ⚠️ **Le site EN PRODUCTION porte encore les anciens chiffres**, et se
  contredit : `fr.json` dit 11 fois « 150 personnes » mais 2 fois « 200
  personnes » et 6 fois « jusqu'à 200 » ; 3 fois « 4,5 mètres » et 4 fois
  « 4,11 ». `en.json` dit 9 fois « 200 guests ». Le pricing annonce aussi
  « jusqu'à 200 personnes ». **Question ouverte** : on aligne tout maintenant
  (une passe FR + EN + pricing, avec les balises meta et le JSON-LD), ou à la
  bascule ? Ce n'est pas anodin : plusieurs descriptions de référencement
  citent le chiffre.
- Équipement de L'APPARTEMENT (celui de LA BOUTIQUE a été dicté le 20/09).
- Photos de L'APPARTEMENT : celles en ligne datent d'avant la pose des rideaux.

- Licence web Eurostile — contacter le fondeur. ⚠️ Les fichiers en place sont
  `Eurostile ExtendedTwo`, **Adobe 1989-1990**, 352 glyphes, **sans €**. Monotype
  vend aujourd'hui deux familles différentes (`Eurostile®` et `Eurostile Next®`) :
  demander celle qui correspond au dessin du logotype, sinon le logo et les
  titres ne seront pas la même lettre.
- **Le régisseur devient facturé à part** (20/09/2026) : il n'est plus annoncé
  comme compris. Le site en production dit encore « ménage et régisseur
  compris » — à corriger à la bascule.
- **Hauteur sous plafond et capacité de LA BOUTIQUE et de L'APPARTEMENT** :
  inconnues. Leurs bandes « en bref » ne portent donc que le sûr.
- **Équipement de L'APPARTEMENT** : inconnu. Sa page saute la section plutôt que
  d'inventer — c'est visible, et c'est voulu.
- **Bannière de cookies Calendly** sur `/visiter` : les couleurs du lieu sont
  bien reprises par le widget, mais `hide_gdpr_banner` reste sans effet (cela
  dépend de l'offre Calendly). Rien à corriger côté site.
- Retirer le conteneur GTM pour arrêter le double comptage GA4.
- Accès admin Clarity (`vju7iukwc9`) et GTM (`GTM-PXGXK94F`) à demander à Frédéric.

---

## Où sont les choses

| Quoi | Où |
|---|---|
| Page d'accueil | `src/components/refonte/RefonteHome.tsx` |
| Page de lieu | `src/components/refonte/RefonteAtelier.tsx` |
| Charpente commune (barre, pied, cadres, palette) | `src/components/refonte/chrome.tsx` |
| Photos défilables | `src/components/refonte/TuilePhotos.tsx` |
| Logo et ses déclinaisons | `src/components/refonte/Logo.tsx` |
| Contenu (chiffres, pages, faits) | `src/components/refonte/data.ts` |
| Planche contact photos | `/refonte/photos` — **temporaire, à supprimer** |
| Planche contact des tuiles | `/refonte/tuiles` — **temporaire, à supprimer** |
| Photothèque | `Dropbox/CHEZ LES PLOMBIERS/PHOTOS/EVENTS/` (1514) et `INES/` (767) |
| Travaux | `Dropbox/CHEZ LES PLOMBIERS/TRAVAUX/` et `IMMEUBLE : TRAVAUX/` |
| Fontes | `src/fonts/eurostile-extended{,-bold}.ttf` |
| Logos | `public/images/logo/` — ⚠️ `logotype-noir.png` fait 2000×2000 avec d'énormes marges ; la version détourée est `logo-black.png` |
