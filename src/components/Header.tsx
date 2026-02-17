"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/metadata";

const menuItems = [
  { label: "L'Appartement Rose", href: "/appartement" },
  { label: "Pricing", href: EXTERNAL_LINKS.pricing, external: true },
  { label: "Infos Techniques", href: "/#equipments" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/" className="flex-shrink-0">
            <Image
              src={isTransparent ? "/images/logo/logo-white.png" : "/images/logo/logo-black.png"}
              alt="Chez Les Plombiers"
              width={160}
              height={40}
              className="h-8 lg:h-10 w-auto transition-opacity duration-500"
              priority
            />
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:flex items-center space-x-8 lg:space-x-12">
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
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 min-h-12 min-w-12 flex items-center justify-center transition-colors ${
              isTransparent ? "text-white" : "text-black"
            }`}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
            <nav id="mobile-menu" aria-label="Menu mobile" className="px-6 py-6 space-y-4">
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
