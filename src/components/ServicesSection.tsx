"use client";

import { motion } from "motion/react";
import { Sparkles, Briefcase, Music, Wine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Sparkles,
    title: "Fashion Shows & Brand Events",
    description:
      "Défilez dans un décor architectural fort, pensé comme un manifeste visuel. Un espace brut et modulable, idéal pour les défilés, showrooms et lancements de collections.",
  },
  {
    icon: Briefcase,
    title: "Événements Professionnels",
    description:
      "Séminaires, lancements de produits, conférences dans un espace modulable et équipé.",
  },
  {
    icon: Sparkles,
    title: "Dîners d\u2019exception",
    description:
      "Grandes tables et dîners de chef réunissant 40 à 80 convives dans un cadre industriel spectaculaire. Une expérience gastronomique immersive pensée comme un événement à part entière.",
  },
  {
    icon: Music,
    title: "Événements Culturels",
    description:
      "Vernissages, expositions et performances artistiques dans un lieu inspirant pensé comme une galerie contemporaine.",
  },
  {
    icon: Wine,
    title: "Prestations Premium",
    description:
      "Traiteur, décoration, sonorisation : nous coordonnons tous les services pour vous.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl mb-6">Nos Services</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Des prestations sur mesure pour tous vos événements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="mb-8 relative">
                <div className="w-16 h-16 border border-gray-300 flex items-center justify-center transition-all duration-500 group-hover:border-black group-hover:rotate-6">
                  <service.icon className="w-7 h-7 stroke-[1.5] transition-all duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute -bottom-2 left-0 w-0 h-px bg-black transition-all duration-700 group-hover:w-12" />
              </div>
              <h3 className="text-2xl lg:text-3xl mb-5 font-light tracking-[0.15em] uppercase transition-transform duration-500 group-hover:translate-x-2">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed tracking-wide transition-colors duration-300 group-hover:text-gray-900">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
