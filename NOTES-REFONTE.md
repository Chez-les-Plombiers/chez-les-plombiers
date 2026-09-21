
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
