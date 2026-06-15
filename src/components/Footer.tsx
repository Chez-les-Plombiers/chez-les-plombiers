"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { locale, dict } = useI18n();
  const footer = dict.footer as {
    description: string;
    navTitle: string;
    navLinks: { label: string; href: string }[];
    servicesTitle: string;
    servicesLinks: { label: string; href: string }[];
    contactTitle: string;
    legalTitle: string;
    legalInfo: Record<string, string>;
    copyright: string;
    mentionsLegales: string;
    politiqueConfidentialite: string;
    navSecondaryLabel: string;
  };

  const mentionsPath =
    locale === "en" ? "/en/legal-notice" : "/mentions-legales";
  const privacyPath =
    locale === "en" ? "/en/privacy-policy" : "/politique-confidentialite";

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Image
              src="/images/logo/logo-white.png"
              alt="Chez Les Plombiers"
              width={120}
              height={32}
              className="h-8 w-auto mb-6"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              {footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">
              {footer.navTitle}
            </h4>
            <nav
              aria-label={footer.navSecondaryLabel}
              className="space-y-3"
            >
              {footer.navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">
              {footer.servicesTitle}
            </h4>
            <nav className="space-y-3">
              {footer.servicesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">
              {footer.contactTitle}
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                <a
                  href="https://wa.me/33761471073"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +33 7 61 47 10 73
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@chezlesplombiers.fr"
                  className="hover:text-white transition-colors"
                >
                  contact@chezlesplombiers.fr
                </a>
              </p>
              <p>39 rue des Bourdonnais, 75001 Paris</p>
            </div>
          </div>
        </div>

        <div className="pt-8 pb-8 border-t border-gray-800">
          <h4 className="text-sm uppercase tracking-wider mb-6 text-gray-400">
            {footer.legalTitle}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-xs text-gray-400">
            <p>{footer.legalInfo.company}</p>
            <p>{footer.legalInfo.capital}</p>
            <p>{footer.legalInfo.siren}</p>
            <p>{footer.legalInfo.siret}</p>
            <p>{footer.legalInfo.tva}</p>
            <p className="sm:col-span-2 lg:col-span-1">
              {footer.legalInfo.creation}
            </p>
            <p className="sm:col-span-2 lg:col-span-3">
              {footer.legalInfo.naf}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            <p>
              &copy; {currentYear} {footer.copyright}
            </p>
            <div className="flex space-x-6">
              <Link
                href={mentionsPath}
                className="hover:text-white transition-colors"
              >
                {footer.mentionsLegales}
              </Link>
              <Link
                href={privacyPath}
                className="hover:text-white transition-colors"
              >
                {footer.politiqueConfidentialite}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
