
## Home 2 — la grande vue de respiration (décidé le 21/09/2026)

`public/photos/lieu/home-2.jpg` (2000 × 1125) — la grande salle vide, vue large,
sol clair, poteaux bruts, le canapé rose au fond. Étienne l'appelle **« Home 2 »**.

**Décision, portée par Céline et validée par Étienne** : elle **remplace la
section `Preuve`** — les deux photos côte à côte (dîner Maison 123 avec la
Triumph, et le lancement Porsche Cayenne Electric). Une seule image pleine
largeur, fine, placée **après les trois tuiles de lieux**.

Le motif est le rythme, pas le contenu : une page faite de blocs de même taille
fatigue, il lui faut une respiration. « Ça pourrait faire un peu une pause pour
le regard. » Étienne aime la photo du lancement Porsche — ce n'est pas elle
qu'on écarte, c'est le fait d'avoir deux blocs de plus au même format.

✅ **Fait le 21/09/2026** — `Preuve` dans `RefonteHome.tsx` ne porte plus qu'elle.
Les deux photos écartées ne sont pas perdues : elles restent dans la photothèque.


## La photothèque — deux axes, une seule page (21/09/2026)

`/photos` porte **deux rangées de filtres on/off** :

```
LES LIEUX        L'Atelier · La Boutique · L'Appartement
LES ÉVÉNEMENTS   Dîners · Showrooms · Défilés · Lancements · Expositions · Automobile
```

Deux axes parce que ce sont **deux questions posées par deux personnes
différentes** : « à quoi ça ressemble ? » (celle qui n'est jamais venue) et
« qu'est-ce qui s'y passe ? » (celle qui compare des lieux). Une seule page
parce qu'un visiteur ne doit pas deviner laquelle des deux ouvrir. L'accueil
ne porte donc qu'un lien, sous les vignettes de catégories.

⚠️ Tant qu'une planche de lieu n'est pas dépouillée, le lieu montre les vues
**déjà retenues** pour le site, pas la planche brute.

⚠️ **LA BOUTIQUE n'a pas de planche** : ouverte le 01/09/2026, jamais
photographiée. Ses 14 vues viennent du téléphone d'Étienne. Un événement est
prévu vers le 06/10/2026 — compléter à ce moment-là.

### Les vidéos
Dans la **même grille** que les photos, marquées d'un rond de lecture. La
grille ne charge que des affiches WebP ; le MP4 n'est demandé qu'à l'ouverture.

⚠️ **Réencodage obligatoire même depuis un MP4** : les vidéos d'iPhone sont en
HEVC, que Chrome et Firefox ne lisent pas — le fichier se téléchargerait et
resterait noir, sans erreur.

### Les planches en attente de tri
| Planche | Vues | État |
|---|---|---|
| `lieu-atelier` | 49 | à trier |
| `lieu-appartement` | 20 | à trier |
| `24-new-balance` | 5 (dont 1 vidéo) | en ligne, couverture 1 provisoire |

## À faire sur `/infos` — les parkings (noté le 22/09/2026)

Étienne : « il y a plusieurs parkings à côté, il y en a plus qu'on pense. Il
faut les trouver et les marquer. »

La page ne cite aujourd'hui qu'**Indigo Saint-Eustache**. Il en existe
plusieurs autres à moins de dix minutes à pied, et c'est une information que
cherche tout prestataire qui vient en camionnette. À vérifier sur place ou par
les sites des exploitants — ne pas se contenter d'une liste trouvée en ligne,
les parkings ferment.

⚠️ Mentionner aussi les **places de livraison en face du 39**, déjà citées dans
les conditions de location depuis le 22/09/2026.

## À faire — la page « mode d'emploi » du client (noté le 22/09/2026)

Décidé avec Étienne : le chatbot `/guide` **n'est pas repris**. Un moteur de
recherche sur un site de neuf pages est l'aveu que les pages ne répondent pas,
et personne ne s'en est servi.

⚠️ **Mais son contenu, lui, n'existe nulle part ailleurs.** `guide-knowledge.ts`
porte le code de la grille, les deux réseaux Wi-Fi, les cinq scénarios
d'éclairage Kiosc et le mode personnalisé, la sono (Sonos + XLR par l'UCP), le
chauffage Daikin, le vidéoprojecteur, le tri des poubelles, le vestiaire et la
fin d'événement.

Ce n'est pas un argument de vente : c'est le **mode d'emploi qu'on envoie au
client une fois qu'il a réservé**. Il mérite sa page — non indexée, transmise
par lien, comme `/nouveau-client`.

⚠️ Ne pas supprimer `src/lib/guide-knowledge.ts` avant d'avoir transféré son
contenu. C'est la seule copie.

## La bascule — `src/lib/bascule.ts`

Un interrupteur, `BASCULE = false`, et tout ce qu'il commande au même endroit.
Ce que le fichier **ne couvre pas** et qui reste à faire à la main :

1. `lien()` dans `chrome.tsx` — retirer le préfixe `/refonte`
2. Les routes : faire pointer `/`, `/infos`, `/conditions`… sur la refonte
3. Retirer les `noindex` des pages `/refonte/*`
4. Réécrire `sitemap.ts` sur les nouvelles adresses
5. Supprimer les pages de tri et `public/photos/tri/` (19 Mo)

⚠️ Et vérifier `A_RETIRER_DE_NEXT_CONFIG` ligne à ligne : `/photos`,
`/visiter` et `/histoire` redirigent aujourd'hui vers des ancres de l'ancien
accueil. Les laisser rendrait les pages neuves injoignables, en 308 silencieux.

## Le reste à faire — relevé du 22/09/2026

| | Quoi | État |
|---|---|---|
| 1 | **Press kit** — logos, visuels, plaquette, en téléchargement | à faire |
| 2 | **Plan du site** — une page qui liste toutes les adresses, à envoyer telle quelle | à faire |
| 3 | **Album des photos extérieures** — la façade, la cour, l'impasse, le quartier | à faire |
| 4 | Les parkings sur `/infos` | ✅ 22/09 |
| 5 | « Hors Fashion Week et événements spéciaux » sous les prix | ✅ 22/09 |

**Le press kit et le plan du site vont ensemble** : ce sont deux pages qu'on
*envoie*, pas qu'on parcourt. Même famille que `/infos` — « fait pour être
envoyé tel quel à un prestataire ». Elles ont leur place dans le sommaire du
bas, pas dans la barre du haut.

⚠️ **L'album extérieur n'est pas une septième catégorie d'événement.** C'est le
LIEU vu du dehors — il relève du premier axe. Soit une quatrième entrée dans la
rangée « Les lieux » (« Le bâtiment »), soit le début de l'album de L'ATELIER.

## Où sont les sauvegardes (question d'Étienne, 22/09/2026)

| Quoi | Où | Sauvegardé ? |
|---|---|---|
| Le code et tous les textes | GitHub `Chez-les-Plombiers/chez-les-plombiers` | ✅ historique complet |
| Les photos publiées | dans le dépôt, donc GitHub | ✅ |
| Les originaux | Dropbox `CHEZ LES PLOMBIERS/PHOTOS` | ✅ |
| Le tri (`tri-selection.json`) | dans le dépôt | ✅ |

⚠️ **Vercel n'est PAS une sauvegarde.** Il ne garde que les dix derniers builds
de chaque projet, et on en a supprimé 68 le 21/09 pour rester sous le plafond de
10 Go. Ce qui y est déployé est une *copie compilée*, pas une source.

⚠️ **Deux choses n'existent nulle part ailleurs que sur Vercel / Upstash :**

1. **Les variables d'environnement** (clés Resend, Google Calendar, Pennylane,
   Notion…). Elles ne sont dans aucun dépôt — c'est voulu — mais il n'en existe
   pas non plus d'export. `vercel env pull` en fait une copie locale.
2. **Le KV Upstash du pricing** : les surcharges de prix saisies à la main, les
   demandes de devis reçues, et toutes les données du tableau de bord finances.
   Aucune sauvegarde, aucun export automatique. C'est le vrai trou.

## ⏳ CHANTIER — sauvegarder ce qui n'existe qu'à un seul endroit

Demandé par Étienne le 22/09/2026 : « gérer les sauvegardes, en double backup ».

### Ce qui est déjà sûr, et n'a besoin de rien
Le code, les textes, le tri et les photos publiées sont dans **GitHub** avec
tout l'historique. Les originaux sont dans **Dropbox**. Deux endroits, déjà.

### Ce qui n'existe qu'à UN seul endroit

| Quoi | Où | Contenu |
|---|---|---|
| Variables d'environnement | Vercel, 3 projets | clés Resend, Google Calendar, Pennylane, Notion, Upstash, mots de passe admin |
| KV Upstash (pricing) | Upstash | surcharges de prix saisies à la main, **devis reçus**, données du tableau de bord finances |

⚠️ **Les deux contiennent des données sensibles** : des secrets d'un côté, des
coordonnées de clients — donc des données personnelles — de l'autre. Ça
gouverne tout le reste du dessin.

### Le dessin retenu

Un script dans `~/.config/clp-backups/` (hors Dropbox, `chmod 700`, même
convention que `gws-admin`, `ovh` et `clp-certs`) qui :

1. tire les variables des trois projets (`vercel env pull`) et vide le KV en JSON ;
2. **chiffre l'archive** (`age`, clé publique conservée à part) ;
3. écrit la copie chiffrée à **deux endroits** : `~/.config/clp-backups/archives/`
   et un dossier Dropbox. Chiffrée, elle peut vivre dans Dropbox sans risque ;
4. garde les N dernières et supprime les plus vieilles ;
5. tourne par un agent `launchd` hebdomadaire — reprendre le plist de
   `clp-certs`, y compris la déclaration du `PATH`, qui est le piège classique.

⛔ **Jamais en clair, jamais dans Git, jamais dans une conversation.** C'est la
règle déjà écrite pour les identifiants OVH et les passphrases Wi-Fi.

⚠️ Une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde :
prévoir une restitution d'essai dans un dossier jetable, et la dater ici.

## Expositions — ce qui reste à ajouter (22/09/2026)

### Caroline Faindt — l'expo de la peintre
Étienne dit « Caroline Fin » ; l'orthographe est **Caroline Faindt**, peintre
française née en 1981, installée à Paris. Une clé en métal est dissimulée dans
chacune de ses toiles — c'est sa signature. Présente sur Facebook
(`carolinefaindtartiste`), LinkedIn, Singulart, et une page Wikipédia.

⚠️ **Ne pas récupérer ses photos sur Instagram ou son site pour les publier.**
Ce sont ses œuvres et souvent ses visuels : les republier sur un site
commercial sans accord est un problème de droits, pas une question de
technique. Deux voies propres : retrouver les photos que **nous** avons prises
pendant le vernissage, ou lui demander ses fichiers — elle sera sans doute
ravie qu'on montre son expo.

### Les dossiers encore en attente dans `SELECTION PHOTOS SITE`
| Dossier | Contenu | État |
|---|---|---|
| `04. EVENTS PRO` | 21 photos | planche non faite |
| `05. EVENTS CULTURELS` | 20 photos, 3 vidéos | planche non faite |
| `05. EVENT CULTUREL — YANN` | HEIC + .mov | ⏳ Étienne doit le déposer |
| `06. PETITS DEJ` | vide | — |

## Les vues de rue de l'album Litkovska — fausse alerte (22/09/2026)

J'avais signalé une douzaine de photos de rue comme « probablement pas chez
nous », dont une avec une enseigne « PIZZA » que je prenais pour Milan.

**C'est faux, et Étienne a tranché : la pizzeria est en face du 39.** Ces vues
montrent les invités qui arrivent au défilé — et c'est justement ce qu'il faut
garder : « ça montre qu'il y a beaucoup de monde ».

⚠️ La leçon vaut pour la suite : je juge un lieu sur un plafond et une
enseigne, depuis un bureau. Signaler un doute est utile ; le présenter comme
un constat ne l'est pas. Étienne était sur place.

## 22/09/2026 — Les images ont disparu partout (résolu)

**Symptôme** : Étienne, sur iPhone, sur la fenêtre « Visualiser les 3 lieux » :
« ça a carrément planté, on ne voit même plus les photos derrière ». Les cadres
et les libellés flottaient sur du vide, avec une icône d'image cassée.

**Ce n'était pas le composant.** `curl` sur `/_next/image?url=…&w=828` renvoyait
**`402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED`** : le quota de transformations
d'images du plan Hobby, épuisé. La mise en ligne a publié 845 médias, et
`next/image` demande à Vercel de régénérer chacun en plusieurs largeurs — le
compteur est parti en quelques heures. Toutes les images du site tombaient, pas
seulement la façade ; c'est juste là qu'Étienne l'a vu en premier.

⚠️ **Le piège de diagnostic** : la page ne renvoie aucune erreur, le HTML est
correct, le composant est correct. Seules les requêtes d'images échouent, et
uniquement en production. Le réflexe est de relire le composant — c'est perdu.
**Interroger `/_next/image` directement** dit la vérité en une seconde.

**Correction, en deux temps :**
1. `images: { unoptimized: true }` dans les **deux** `next.config.ts`. Les deux
   applications partagent le domaine, donc le **même quota** : n'en corriger
   qu'une laisse l'autre le vider pour les deux.
2. `alleger-photos.mjs` — puisque Vercel ne redimensionne plus, c'est à nous de
   livrer des fichiers d'un poids raisonnable. Réencodage **sur place**, même nom
   et même extension (les chemins sont écrits en dur dans une dizaine de fichiers
   de données), 1600 px max, JPEG q78 mozjpeg, saute ce qui fait moins de 220 Ko,
   n'agrandit jamais. **55 images, 42 Mo → 10 Mo.**

**Vérifié après coup** : 50 pages parcourues, 845 médias, **0 passant encore par
l'optimiseur, 0 cassé**. La fenêtre façade est revenue, cadres bien placés.

⚠️ **Pour la suite** : chaque nouvel album passe par `alleger-photos.mjs` avant
d'être poussé. Sans l'optimiseur, une photo de 4 Mo est servie telle quelle.

## 22/09/2026 — Les aperçus de lien, et ce que la bascule avait laissé derrière

### Les images de partage (WhatsApp, iMessage, Slack)

Les quatorze pages partageaient **un seul** aperçu : l'ancien titre « Lieu
Évènementiel Paris 1er — 200m² » et un PNG de 4032 × 2268 pesant 1,8 Mo,
déclaré dans le HTML comme faisant 1200 × 630. Envoyer le lien de
L'APPARTEMENT montrait L'ATELIER — quand l'image passait, car 1,8 Mo est
au-delà de ce que WhatsApp télécharge.

⚠️ **La cause n'était pas un oubli page par page.** Les métadonnées de Next se
fusionnent **en surface** : une page qui écrit `title` sans écrire `openGraph`
hérite du bloc `openGraph` du layout, en entier. Chaque page avait bien son
titre ; aucune n'avait son aperçu. C'est documenté dans `generate-metadata.md`,
et c'est le genre de règle qu'on ne devine pas. D'où `src/lib/partage.ts`, qui
fabrique les trois blocs à partir du titre que la page écrit déjà.

⚠️ **Piège de diagnostic** : WhatsApp garde l'aperçu en cache par URL, et
l'expéditeur voit souvent autre chose que le destinataire. Ne pas se fier à un
essai depuis son propre téléphone — lire le HTML.

Cinq visuels 1200 × 630 de ~100 Ko dans `public/og/`, au bandeau blanc des key
visuals Instagram, composés par `gen-og.mjs` avec la **vraie police du site**
(les TTF sont donnés à sharp par un fichier fontconfig temporaire — rien n'est
installé sur le Mac).

⚠️ **Des fichiers statiques, pas `ImageResponse`.** Une image de partage est
réclamée par des robots qu'on ne contrôle pas, en rafale, au moment précis où
un lien circule. Après le 402 du matin, elle ne doit dépendre d'aucun quota.

### Deux restes de chantier, en production depuis la bascule

- **Les pages photos étaient en `noindex`**, titrées « Maquette refonte ». Le
  sitemap déclarait ces adresses pendant que les pages disaient à Google de
  repartir — et c'est la partie la plus volumineuse du site.
- **Le pied de page affichait « Maquette de travail, non publiée »**, sur
  toutes les pages.

⚠️ Ni l'un ni l'autre n'était détectable par la passe de pré-lancement : elle
vérifiait les liens morts, le débordement et la typographie. **Un reste de
chantier ne se trouve qu'en lisant ce que la page affirme.** À ajouter à la
prochaine passe : chercher « maquette », « brouillon », « à venir », `noindex`
dans le **rendu**, pas dans les sources.

### `/nouveau-client`

Restée sur l'ancien site. Quatre défauts, du plus grave au moindre :

1. **LA BOUTIQUE n'existait pas dans le choix d'espace.** Le lieu a ouvert le
   01/09 ; un client qui l'avait visité cochait « Chez les Plombiers » faute de
   mieux. C'est une erreur de facturation qui commence, pas une coquille.
2. **Le formulaire contredisait `/conditions` sur l'argent** : deux dépôts
   (5 000 / 3 000) contre trois, dont **aucun** pour LA BOUTIQUE. Les montants
   sont désormais **importés** de `regles.ts`, la même source que
   `/conditions` — plus recopiés.
3. **Les créneaux étaient les mêmes pour les trois lieux.** On proposait une
   matinée à L'APPARTEMENT, qui ne se loue qu'à la journée. Le choix suit
   maintenant `venues.ts` du projet pricing. ⚠️ **Quand la bascule
   « matinée + soirée » sera faite côté tarifs, changer aussi `CRENEAUX` dans
   `RefonteNouveauClient.tsx`** — sinon le formulaire vendra un après-midi que
   le calendrier ne montre plus.
4. « Appartement Rose » était un alias historique, et « Chez les Plombiers »
   est le nom de la **marque**, pas de L'ATELIER.

La logique qui marchait est conservée : annuaire des entreprises,
autocomplétion d'adresse, calcul de la TVA depuis le SIREN, et la route d'API
avec ses noms de champs anglais — **la base Notion en dépend, ne pas les
traduire.**

⚠️ **Le formulaire n'a pas été soumis pour de vrai** : un envoi de test écrit
dans la base Notion et envoie un mail à Étienne et Céline. La route d'API est
inchangée et les noms de champs sont identiques à l'octet près.

## 22/09/2026 — L'espace insécable qui rend un grep aveugle

En corrigeant la surface de LA BOUTIQUE (45 → 40 m²), deux occurrences sur sept
ont survécu à la correction **et** au contrôle qui devait la valider. Je les ai
annoncées propres à Étienne avant de les retrouver.

**La cause** : ces deux-là s'écrivent `45 m²`, avec une **espace insécable**
— posée pendant la passe typographique d'avant la mise en ligne, et c'est la
bonne graphie. Mon remplacement comme ma vérification utilisaient une espace
ordinaire. Le même angle mort des deux côtés : le contrôle ne pouvait que
confirmer le défaut qu'il partageait.

⚠️ **C'est un piège propre à un texte bien composé.** Plus la typographie est
soignée, moins la chaîne affichée ressemble à celle qu'on tape dans un grep :
espace insécable avant `: ; ! ?` et `€ %`, espace fine, apostrophe courbe,
tirets cadratins. Chercher `45 m²` ou `l'atelier` trouve de moins en moins.

**Réflexe à prendre** : pour toute recherche ou tout remplacement portant sur du
texte destiné à l'écran, écrire le motif insensible à ces variantes.

```
45[\s  ]?m²      plutôt que   45 m²
[Ll]['’]Atelier            plutôt que   L'Atelier
```

Et vérifier **sur le rendu**, pas sur les sources — ce qui ne suffit pas non
plus si le motif de vérification reproduit l'erreur du motif de remplacement.
