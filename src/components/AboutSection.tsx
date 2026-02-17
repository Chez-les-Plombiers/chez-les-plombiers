"use client";

import { motion } from "motion/react";
import Image from "next/image";

const stats = [
  { value: "200m²", label: "Espace modulable" },
  { value: "200", label: "Capacité max" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl mb-8">À Propos</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                <strong>Chez Les Plombiers</strong> est un lieu événementiel
                d&apos;exception situé au cœur de Paris, alliant charme
                industriel et élégance contemporaine.
              </p>
              <p>
                Notre espace unique de 200m² peut accueillir jusqu&apos;à 200
                personnes et s&apos;adapte à tous vos événements. Anciennes
                installations industrielles transformées en un lieu raffiné,
                nous offrons un cadre authentique et modulable.
              </p>
              <p>
                Notre équipe vous accompagne pour créer des moments inoubliables
                avec un service personnalisé et une attention aux moindres
                détails.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-3xl lg:text-4xl mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gray-200 overflow-hidden relative">
              <Image
                src="/images/about.png"
                alt="Chez Les Plombiers - Notre lieu événementiel"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
