"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { useI18n } from "@/lib/i18n-context";
import { getAlternatePath } from "@/lib/i18n";

interface MenuItem {
  label: string;
  href?: string;
  external?: boolean;
  comingSoon?: boolean;
  children?: MenuItem[];
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);

  const header = dict.header as {
    menuItems: MenuItem[];
    openMenu: string;
    closeMenu: string;
    navLabel: string;
    mobileNavLabel: string;
    comingSoonLabel: string;
  };

  // Resolve external hrefs (top-level items AND dropdown children) from
  // EXTERNAL_LINKS by key (e.g. href "pricing" → EXTERNAL_LINKS.pricing).
  const resolveExternal = (item: MenuItem): MenuItem =>
    item.external
      ? {
          ...item,
          href:
            EXTERNAL_LINKS[item.href as keyof typeof EXTERNAL_LINKS] ??
            EXTERNAL_LINKS.pricing,
        }
      : item;
  const menuItems: MenuItem[] = header.menuItems.map((item) => {
    const resolved = resolveExternal(item);
    return resolved.children
      ? { ...resolved, children: resolved.children.map(resolveExternal) }
      : resolved;
  });

  const otherLocale = locale === "fr" ? "en" : "fr";
  const switchPath = getAlternatePath(pathname, otherLocale);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdowns on Escape or outside click.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const isTransparent = !isScrolled;

  const triggerClasses = `text-sm tracking-wider uppercase transition-colors ${
    isTransparent ? "text-white hover:text-white/70" : "text-black hover:text-gray-600"
  }`;

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileGroup(null);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        !isTransparent ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
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
            ref={navRef}
            aria-label={header.navLabel}
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
          >
            {menuItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 ${triggerClasses}`}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    onFocus={() => setOpenDropdown(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full mt-3 min-w-56 bg-white shadow-lg ring-1 ring-black/5 py-2"
                      >
                        {item.children.map((child) =>
                          child.comingSoon ? (
                            <li
                              key={child.label}
                              className="flex items-center justify-between gap-3 px-5 py-2.5 text-sm text-gray-400 cursor-default select-none"
                            >
                              <span>{child.label}</span>
                              <span className="text-[10px] uppercase tracking-wider border border-gray-300 text-gray-400 px-1.5 py-0.5">
                                {header.comingSoonLabel}
                              </span>
                            </li>
                          ) : (
                            <li key={child.label}>
                              <Link
                                href={child.href ?? "#"}
                                target={child.external ? "_blank" : undefined}
                                rel={child.external ? "noopener noreferrer" : undefined}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-5 py-2.5 text-sm text-black hover:bg-gray-50 transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          )
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={triggerClasses}
                >
                  {item.label}
                </Link>
              )
            )}

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
            aria-label={isMobileMenuOpen ? header.closeMenu : header.openMenu}
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
              className="px-6 py-6 space-y-1"
            >
              {menuItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="py-1">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-2 text-sm tracking-wider uppercase hover:text-gray-600 transition-colors"
                      aria-expanded={openMobileGroup === item.label}
                      onClick={() =>
                        setOpenMobileGroup(
                          openMobileGroup === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openMobileGroup === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openMobileGroup === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4 border-l border-gray-200 ml-1"
                        >
                          {item.children.map((child) =>
                            child.comingSoon ? (
                              <div
                                key={child.label}
                                className="flex items-center gap-2 py-2 text-sm text-gray-400"
                              >
                                <span>{child.label}</span>
                                <span className="text-[10px] uppercase tracking-wider border border-gray-300 px-1.5 py-0.5">
                                  {header.comingSoonLabel}
                                </span>
                              </div>
                            ) : (
                              <Link
                                key={child.label}
                                href={child.href ?? "#"}
                                target={child.external ? "_blank" : undefined}
                                rel={child.external ? "noopener noreferrer" : undefined}
                                onClick={closeMobile}
                                className="block py-2 text-sm text-gray-700 hover:text-black transition-colors"
                              >
                                {child.label}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={closeMobile}
                    className="block py-2 text-sm tracking-wider uppercase transition-colors hover:text-gray-600"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Language switcher mobile */}
              <Link
                href={switchPath}
                onClick={closeMobile}
                className="block py-2 text-sm tracking-wider uppercase text-gray-400 hover:text-black transition-colors font-medium"
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
