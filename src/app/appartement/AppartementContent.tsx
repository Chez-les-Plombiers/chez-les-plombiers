"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { EXTERNAL_LINKS } from "@/lib/metadata";

const VIDEO_URL =
  "https://www.dropbox.com/scl/fi/9m9pjrj837t1r19d7mp31/appartement-Rose-Slow.MP4?rlkey=dbwf002s38d9cmzoxts33wzmh&raw=1";

export function AppartementContent() {
  return (
    <main className="pt-0">
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/appartement-hero.png"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <Image
            src="/images/appartement-hero.png"
            alt="L'Appartement Rose — espace intime de 100 m² pour shootings et réunions, Chez Les Plombiers Paris 1er"
            fill
            className="object-cover -z-10"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center flex flex-col items-center"
          >
            <h1 className="text-5xl lg:text-8xl font-light mb-8 tracking-tight">
              L&apos;Appartement Rose
            </h1>
            <p className="text-xl lg:text-3xl text-white/90 mb-12 leading-relaxed max-w-2xl font-light">
              Un espace intime et lumineux, conçu pour des moments
              d&apos;exception. Découvrez une atmosphère unique alliant élégance
              et créativité.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black hover:bg-white/90 px-10 py-6 text-lg uppercase tracking-widest transition-all duration-300"
              >
                Réserver L&apos;Appartement Rose
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-6 tracking-tight">
                Une Atmosphère Unique
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                L&apos;Appartement Rose est pensé comme un écrin hors du temps.
                Avec sa lumière naturelle, ses textures soignées et son ambiance
                feutrée, il est idéal pour des shootings photo, des interviews,
                ou des réunions confidentielles.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-10 border-y border-gray-200 py-8">
                <div className="flex flex-col">
                  <span className="text-6xl font-light tracking-tighter mb-2">
                    100
                    <span className="text-2xl ml-1 align-top">m²</span>
                  </span>
                  <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    Surface
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-6xl font-light tracking-tighter mb-2">
                    50
                  </span>
                  <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                    Personnes
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4 font-semibold">
                  Équipements inclus
                </h3>
                <ul className="grid grid-cols-1 gap-3 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black mr-3 rounded-full" />
                    Cuisine équipée
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black mr-3 rounded-full" />
                    Mobilier design
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-black mr-3 rounded-full" />
                    Wi-Fi haut débit
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-[500px] overflow-hidden bg-gray-100 relative">
              <Image
                src="/images/appartement-detail.png"
                alt="Intérieur de L'Appartement Rose — lumière naturelle, mobilier design et ambiance feutrée, Chez Les Plombiers Paris"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
