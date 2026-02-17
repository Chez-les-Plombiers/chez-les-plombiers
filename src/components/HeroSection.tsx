"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { EXTERNAL_LINKS } from "@/lib/metadata";

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 800], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.8, 0.3]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        <Image
          src="/images/hero.png"
          alt="Chez Les Plombiers — lieu événementiel 200 m² au 39 rue des Bourdonnais, architecture industrielle, Paris 1er"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
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
              Lieu Événementiel Paris
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight mb-2 font-light text-white/90">
              Recevoir Autrement.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 text-white/90"
          >
            Un lieu d&apos;exception en plein cœur de Paris pour vos événements
            professionnels
            <br className="hidden md:block" />
            dans un cadre industriel unique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={EXTERNAL_LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-white text-black tracking-wider uppercase text-sm transition-all hover:bg-gray-100"
            >
              Réserver une visite
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
