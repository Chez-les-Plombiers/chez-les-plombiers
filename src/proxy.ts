import { NextResponse, type NextRequest } from "next/server";
import { frSlugs, enSlugs, getEnSlug, getFrSlug } from "@/lib/i18n";
import {
  SERVICE_FR_SLUGS,
  SERVICE_EN_SLUGS,
  getServiceEnSlug,
  getServiceFrSlug,
} from "@/lib/services-data";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * `/tarifs` appartient à une AUTRE application (le projet
   * `chez-les-plombiers-pricing`, servi ici par une réécriture déclarée dans
   * `next.config.ts`). Il faut sortir avant toute autre règle.
   *
   * ⚠️ Sans cette sortie, la règle de fin de fonction préfixerait le chemin
   * par `/fr` — y compris `/tarifs/_next/*` et `/tarifs/api/*` — et le pricing
   * s'afficherait en page blanche. Le test `_next` plus bas ne protège que la
   * racine du domaine, pas les assets d'une zone.
   */
  if (pathname === "/tarifs" || pathname.startsWith("/tarifs/")) {
    return NextResponse.next();
  }

  /**
   * `/admin` appartient a la meme autre application, et est reecrit vers
   * `/tarifs/admin` (26/09/2026). Etienne : « il faut qu'on soit directement
   * a la racine ». Meme sortie anticipee, meme raison — sans elle le chemin
   * partirait en `/fr/admin` et n'atteindrait jamais la reecriture.
   *
   * ⚠️ Les ASSETS et les API de l'administration restent sous `/tarifs/*`,
   * parce que l'application distante declare `basePath: "/tarifs"`. Seule la
   * PAGE change d'adresse. C'est pourquoi la sortie `/tarifs` ci-dessus doit
   * rester : la retirer viderait l'administration de son JavaScript.
   */
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  /**
   * Laisser passer les fichiers : routes techniques, puis TOUT chemin dont le
   * dernier segment contient un point.
   *
   * ⚠️ CETTE RÈGLE REMPLACE UNE LISTE D'EXTENSIONS, et c'est un correctif, pas
   * un raccourci. La liste énumérait `.ico .png .jpg .svg .pdf .xml .txt` —
   * donc **`.webp` renvoyait 404**, comme `.jpeg`, `.avif`, `.mp4`, `.woff2`
   * ou `.ics`. Le fichier existait bien dans `/public` : la requête était
   * simplement réécrite vers `/fr/...`, et l'application répondait « page
   * introuvable ». Symptôme trompeur — une image parfaitement déployée qui ne
   * s'affiche pas. Constaté le 21/09/2026 sur 1 388 vignettes WebP.
   *
   * ⚠️ Aucune route du site ne contient de point dans son dernier segment
   * (vérifié sur la liste des URL du `CLAUDE.md`). Si un jour c'était le cas,
   * il faudrait la sortir explicitement AVANT ce test.
   */
  const dernierSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    dernierSegment.includes(".")
  ) {
    return NextResponse.next();
  }

  // Case normalization: redirect uppercase paths to lowercase
  const lowered = pathname.toLowerCase();
  if (lowered !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lowered;
    return NextResponse.redirect(url, 301);
  }

  // Redirect /fr/ and /fr/xxx → / and /xxx (FR has no prefix)
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const newPath = pathname.replace(/^\/fr/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url, 301);
  }

  // Handle /en/ paths
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const enPath = pathname.replace(/^\/en\/?/, "");

    // Handle /en/services/{slug} — redirect FR slugs to EN slugs
    if (enPath.startsWith("services/")) {
      const serviceSlug = enPath.replace("services/", "");
      // If it's a FR slug under /en/, redirect to EN slug
      if (SERVICE_FR_SLUGS.includes(serviceSlug) && serviceSlug !== getServiceEnSlug(serviceSlug)) {
        const url = request.nextUrl.clone();
        url.pathname = `/en/services/${getServiceEnSlug(serviceSlug)}`;
        return NextResponse.redirect(url, 301);
      }
      return NextResponse.next();
    }

    // Check if an EN path uses a FR slug (e.g. /en/appartement → /en/apartment)
    for (const frSlug of frSlugs) {
      if (enPath === frSlug) {
        const url = request.nextUrl.clone();
        url.pathname = `/en/${getEnSlug(frSlug)}`;
        return NextResponse.redirect(url, 301);
      }
    }

    // Rewrite /en → /en (keep as-is, [locale] will handle it)
    return NextResponse.next();
  }

  // Handle FR paths (no prefix)
  const segments = pathname.split("/").filter(Boolean);

  // Handle /services/{slug} — redirect EN slugs to FR slugs
  if (segments[0] === "services" && segments[1]) {
    const serviceSlug = segments[1];
    // If it's an EN-only slug used under FR path, redirect to FR slug
    if (SERVICE_EN_SLUGS.includes(serviceSlug) && serviceSlug !== getServiceFrSlug(serviceSlug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/services/${getServiceFrSlug(serviceSlug)}`;
      return NextResponse.redirect(url, 301);
    }
    // Rewrite to /fr/services/{slug}
    const url = request.nextUrl.clone();
    url.pathname = `/fr${pathname}`;
    return NextResponse.rewrite(url);
  }

  const topSegment = segments[0];

  // Check if a FR path uses an EN slug (e.g. /apartment → /appartement)
  for (const enSlug of enSlugs) {
    if (topSegment === enSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${getFrSlug(enSlug)}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // Rewrite / → /fr/ internally (URL stays /)
  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
