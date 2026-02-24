"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { useI18n } from "@/lib/i18n-context";
import { getAlternatePath } from "@/lib/i18n";

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, dict } = useI18n();
  const pathname = usePathname();

  const header = dict.header as {
    menuItems: MenuItem[];
    openMenu: string;
    closeMenu: string;
    navLabel: string;
    mobileNavLabel: string;
    ctaQuote: string;
    ctaVisit: string;
  };

  const menuItems = header.menuItems.map((item) =>
    item.external ? { ...item, href: EXTERNAL_LINKS.pricing } : item
  );

  const otherLocale = locale === "fr" ? "en" : "fr";
  const switchPath = getAlternatePath(pathname, otherLocale);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        !isTransparent
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link href={locale === "en" ? "/en" : "/"} className="flex-shrink-0">
            <Image
              src={
                isTransparent
                  ? "/images/logo/logo-white.png"
                  : "/images/logo/logo-black.png"
              }
              alt="Chez Les Plombiers"
              width={160}
              height={40}
              className="h-8 lg:h-10 w-auto transition-opacity duration-500"
              priority
            />
          </Link>

          <nav
            aria-label={header.navLabel}
            className="hidden md:flex items-center space-x-8 lg:space-x-12"
          >
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`text-sm tracking-wider uppercase transition-colors ${
                  isTransparent
                    ? "text-white hover:text-white/70"
                    : "text-black hover:text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA buttons */}
            <div className="flex items-center gap-3">
              <a
                href={EXTERNAL_LINKS.pricing}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-all ${
                  isTransparent
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                {header.ctaQuote}
              </a>
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
                  isTransparent
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}
              >
                {header.ctaVisit}
              </a>
            </div>

            {/* Language switcher */}
            <Link
              href={switchPath}
              className={`text-sm tracking-wider uppercase transition-colors font-medium ${
                isTransparent
                  ? "text-white/60 hover:text-white"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {otherLocale.toUpperCase()}
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 min-h-12 min-w-12 flex items-center justify-center transition-colors ${
              isTransparent ? "text-white" : "text-black"
            }`}
            aria-label={
              isMobileMenuOpen ? header.closeMenu : header.openMenu
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t"
          >
            <nav
              id="mobile-menu"
              aria-label={header.mobileNavLabel}
              className="px-6 py-6 space-y-4"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm tracking-wider uppercase transition-colors hover:text-gray-600"
                >
                  {item.label}
                </Link>
              ))}

              {/* CTA buttons mobile */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <a
                  href={EXTERNAL_LINKS.pricing}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-black text-white px-4 py-3 text-sm tracking-wider uppercase text-center transition-colors hover:bg-black/90"
                >
                  {header.ctaQuote}
                </a>
                <a
                  href={EXTERNAL_LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block border border-black text-black px-4 py-3 text-sm tracking-wider uppercase text-center transition-colors hover:bg-black hover:text-white"
                >
                  {header.ctaVisit}
                </a>
              </div>

              {/* Language switcher mobile */}
              <Link
                href={switchPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm tracking-wider uppercase text-gray-400 hover:text-black transition-colors font-medium"
              >
                {otherLocale === "en" ? "English" : "Français"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
