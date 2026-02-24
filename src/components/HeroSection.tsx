"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { useI18n } from "@/lib/i18n-context";

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { dict } = useI18n();
  const hero = dict.hero as Record<string, string>;
  const header = dict.header as { ctaQuote: string };

  const y = useTransform(scrollY, [0, 800], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.8, 0.3]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center text-white px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl tracking-tight mb-6">
              {hero.title}
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight mb-2 font-light text-white/90">
              {hero.subtitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-white/90"
            dangerouslySetInnerHTML={{ __html: hero.description }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href={EXTERNAL_LINKS.pricing}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-white text-black tracking-wider uppercase text-sm transition-all hover:bg-gray-100"
            >
              {header.ctaQuote}
            </a>
            <a
              href={EXTERNAL_LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 border border-white text-white tracking-wider uppercase text-sm transition-all hover:bg-white hover:text-black"
            >
              {hero.cta}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-white/80" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
