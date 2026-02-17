"use client";

import { motion } from "motion/react";
import { Download, FileText } from "lucide-react";
import Image from "next/image";

const equipments = [
  {
    title: "Surface & Équipements",
    items: [
      "Surface totale : 200 m² + 100 m² de stockage en sous-sol",
      "Hauteur sous plafond : 4,5 m",
    ],
  },
  {
    title: "Cuisines",
    items: [
      "Petite cuisine de jour : micro-ondes, machine à café (grains), couverts, assiettes, verres, tasses, évier",
      "Cuisine traiteur en U : four, lave-vaisselle, machine à glaçons, frigo, congélateur, petit évier",
    ],
  },
  {
    title: "Sanitaires",
    items: ["2 WC (PMR & classique) + 2 vasques"],
  },
  {
    title: "Audio-visuel",
    items: [
      "Solution intuitive pilotée via iPad",
      "Vidéoprojecteur 4K Optima 8800 lumens (HDMI, Apple TV, AirPlay, Chromecast)",
      "Système Sonos",
      "Système XLR",
      "Lumières DMX (dimmables, chaud/froid & couleurs)",
    ],
  },
  {
    title: "Connexion",
    items: [
      "Fibre dédiée 1 Gb/s symétrique",
      "Wi-Fi invité (création de SSID possible)",
      "Prises RJ45 disponibles partout",
    ],
  },
  {
    title: "Capacité d\u2019accueil",
    items: [
      "Cocktail : 150 – 200 personnes",
      "Dîner : 60 – 80 personnes",
    ],
  },
];

const comfort = [
  "36 KvA triphasé",
  "Climatisation réversible",
  "Accès technique et livraisons facilité",
  "Vestiaire (portants + cintres)",
  "Accès PMR (+ WC PMR)",
  "Accès véhicules (charge ≤ 800 kg/m², visa BET structure sur demande)",
  "Rideaux modulables pour 3 espaces distincts",
];

const technical = [
  {
    title: "Mur cyclo",
    specs: [
      "Largeur : 4,63 m",
      "Hauteur : 3,40 m",
      "Image projetée (16:9) : 4,53 m × 2,55 m",
    ],
  },
  {
    title: "Entrées",
    specs: ["Entrée 1 : L 2,20 m / H 3,50 m", "Entrée 2 : L 1,40 m"],
  },
  {
    title: "Électricité & Suspensions",
    specs: [
      "Multiples prises électriques (classiques & triphasées, 36 KvA) au sol et en hauteur",
      "Grilles de support pour accroche lumières raccordées au système DMX",
    ],
  },
];

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-gray-700 leading-relaxed flex items-start group/item">
      <span className="inline-block w-6 h-px bg-gray-400 mt-3 mr-4 flex-shrink-0 transition-all duration-300 group-hover/item:w-8 group-hover/item:bg-black" />
      <span className="transition-colors duration-300 group-hover/item:text-black">
        {children}
      </span>
    </li>
  );
}

export function EquipmentsSection() {
  return (
    <section id="equipments" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-6xl mb-6">
            Équipements & Informations
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Toutes les informations techniques et pratiques
          </p>
        </motion.div>

        {/* Downloads Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-2xl lg:text-3xl mb-8">
            Téléchargements & Informations légales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white p-10 border border-gray-200 transition-all duration-500 hover:border-gray-400 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
              <Download className="w-8 h-8 mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h4 className="text-2xl mb-4 tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                Plans
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Accédez aux plans précis du lieu pour toutes vos mesures.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-sm uppercase tracking-wider hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Télécharger le plan
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white p-10 border border-gray-200 transition-all duration-500 hover:border-gray-400 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
              <FileText className="w-8 h-8 mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h4 className="text-2xl mb-4 tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                Plaquette commerciale
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Téléchargez notre plaquette commerciale (incluant toutes les
                informations et photos du lieu)
              </p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  PDF (FR)
                </a>
                <a
                  href="#"
                  className="block text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  PDF (ENG)
                </a>
              </div>
            </motion.div>
          </div>

          {/* Floor Plan */}
          <div className="mb-12">
            <div className="bg-white p-4 border border-gray-200 relative">
              <Image
                src="/images/floor-plan.png"
                alt="Plan technique du lieu - Chez Les Plombiers"
                width={1200}
                height={800}
                className="w-full h-auto"
                sizes="100vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {equipments.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white p-10 border border-gray-200 transition-all duration-500 hover:border-gray-400 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
              <div className="flex items-start justify-between mb-6">
                <h4 className="text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                  {section.title}
                </h4>
                <div className="w-8 h-8 border border-gray-300 flex items-center justify-center text-sm transition-all duration-500 group-hover:border-black group-hover:rotate-45">
                  {index + 1}
                </div>
              </div>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="text-gray-700 leading-relaxed flex items-start group/item"
                  >
                    <span className="inline-block w-6 h-px bg-gray-400 mt-3 mr-4 flex-shrink-0 transition-all duration-300 group-hover/item:w-8 group-hover/item:bg-black" />
                    <span className="transition-colors duration-300 group-hover/item:text-black">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comfort & Accessibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="group relative bg-white p-10 border border-gray-200 transition-all duration-500 hover:border-gray-400 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                Confort & Accessibilité
              </h4>
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center transition-all duration-500 group-hover:border-black group-hover:rotate-45">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comfort.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.03 }}
                  className="text-gray-700 leading-relaxed flex items-start group/item"
                >
                  <span className="inline-block w-6 h-px bg-gray-400 mt-3 mr-4 flex-shrink-0 transition-all duration-300 group-hover/item:w-8 group-hover/item:bg-black" />
                  <span className="transition-colors duration-300 group-hover/item:text-black">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {technical.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white p-10 border border-gray-200 transition-all duration-500 hover:border-gray-400 hover:shadow-lg"
            >
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
              <div className="flex items-start justify-between mb-6">
                <h4 className="text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                  {section.title}
                </h4>
                <div className="w-8 h-8 border border-gray-300 flex items-center justify-center text-sm transition-all duration-500 group-hover:border-black group-hover:rotate-45">
                  {index + 1}
                </div>
              </div>
              <ul className="space-y-4">
                {section.specs.map((spec, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="text-gray-700 leading-relaxed flex items-start group/item"
                  >
                    <span className="inline-block w-6 h-px bg-gray-400 mt-3 mr-4 flex-shrink-0 transition-all duration-300 group-hover/item:w-8 group-hover/item:bg-black" />
                    <span className="transition-colors duration-300 group-hover/item:text-black">
                      {spec}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
