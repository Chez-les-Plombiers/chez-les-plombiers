import { NextResponse, type NextRequest } from "next/server";
import { frSlugs, enSlugs, getEnSlug, getFrSlug } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and special files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/documents") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".pdf") ||
    pathname.endsWith(".xml") ||
    pathname.endsWith(".txt") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt"
  ) {
    return NextResponse.next();
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
  const topSegment = pathname.split("/")[1];

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
