"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/metadata";
import { useI18n } from "@/lib/i18n-context";
import { RippleButton } from "@/components/ui/ripple-button";
import ClientLogosSection from "@/components/ClientLogosSection";
import { useState } from "react";

const CHEF_LOGOS: { name: string; img?: string }[] = [
  { name: "Dior",                   img: "/images/chef-logos/dior.png" },
  { name: "Audemars Piguet",        img: "/images/chef-logos/audemars-piguet.png" },
  { name: "Land Rover",             img: "/images/chef-logos/land-rover.png" },
  { name: "Gagosian",               img: "/images/chef-logos/gagosian.png" },
  { name: "Chanel",                 img: "/images/chef-logos/chanel.png" },
  { name: "Piaget",                 img: "/images/chef-logos/piaget.png" },
  { name: "Cartier",                img: "/images/chef-logos/cartier.png" },
  { name: "Hermès",                 img: "/images/chef-logos/hermes.png" },
  { name: "Givenchy",               img: "/images/chef-logos/givenchy.png" },
  { name: "Selency",                img: "/images/chef-logos/selency.png" },
  { name: "Lalique",                img: "/images/chef-logos/lalique.png" },
  { name: "Pierre Frey",            img: "/images/chef-logos/pierre-frey.png" },
  { name: "Philharmonie de Paris",  img: "/images/chef-logos/philharmonie.png" },
  { name: "Nike",                   img: "/images/chef-logos/nike.png" },
  { name: "Philipp Plein",          img: "/images/chef-logos/philipp-plein.png" },
  { name: "TF1",                    img: "/images/chef-logos/tf1.png" },
  { name: "Slack",                  img: "/images/chef-logos/slack.png" },
  { name: "Equans",                 img: "/images/chef-logos/equans.png" },
  { name: "Salesforce",             img: "/images/chef-logos/salesforce.png" },
  { name: "Pernod Ricard",          img: "/images/chef-logos/pernod-ricard.png" },
  { name: "Revolut",                img: "/images/chef-logos/revolut.png" },
  { name: "Maison 123",             img: "/images/chef-logos/maison-123.png" },
  { name: "Birkenstock",            img: "/images/chef-logos/birkenstock.png" },
  { name: "Galion",                 img: "/images/chef-logos/galion.png" },
  { name: "Christie's",             img: "/images/chef-logos/christies.png" },
];

function ChefLogoItem({ name, img }: { name: string; img?: string }) {
  const [failed, setFailed] = useState(false);
  if (img && !failed) {
    return (
      <div className="flex items-center justify-center h-20 px-2">
        <img
          src={img}
          alt={name}
          className="max-h-16 w-auto max-w-[160px] object-contain"
          style={{ filter: "invert(1)", mixBlendMode: "multiply" }}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-20 px-2">
      <span className="text-[10px] uppercase tracking-[2px] text-gray-700 font-semibold text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

interface GalleryItem {
  label: string;
  desc: string;
}

interface Prestation {
  number: string;
  title: string;
  description: string;
  capacity: string;
}

interface ChefDict {
  heroOvertitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageAlt: string;
  accrocheLabel: string;
  accrocheTitle: string;
  accrocheText: string;
  portraitMeta: string;
  portraitName: string;
  portraitBio1: string;
  portraitBio2: string;
  portraitSignature: string;
  portraitImageAlt: string;
  logosLabel: string;
  logosTitle: string;
  logos: string[];
  galleryLabel: string;
  galleryTitle: string;
  galleryItems: GalleryItem[];
  prestationsLabel: string;
  prestationsTitle: string;
  prestations: Prestation[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaContact: string;
  ctaHomemade: string;
}

export function ChefContent() {
  const { dict } = useI18n();
  const chef = dict.chef as unknown as ChefDict;

  return (
    <div className="pt-0">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Placeholder background — sera remplacé par la photo d'Etienne */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208] via-[#2a1a0a] to-[#0d0906]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(180,130,60,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[4px] text-white/50 mb-6"
          >
            {chef.heroOvertitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
          >
            <strong className="font-semibold">{chef.heroTitle.split(" ")[0]}</strong>{" "}
            {chef.heroTitle.split(" ").slice(1).join(" ")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl font-light text-white/70 max-w-xl mx-auto leading-relaxed"
          >
            {chef.heroSubtitle}
          </motion.p>
        </div>
      </section>

      <ClientLogosSection theme="light" title="" />

      {/* ACCROCHE */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[4px] text-gray-400 mb-4"
          >
            {chef.accrocheLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8 [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: chef.accrocheTitle }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            {chef.accrocheText}
          </motion.p>
        </div>
      </section>

      {/* PORTRAIT DU CHEF */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] overflow-hidden bg-gray-200"
              style={{
                backgroundImage:
                  "url('https://images.squarespace-cdn.com/content/v1/63468f09a3a3280f2aff6014/bffd5b91-06b9-4d0c-8e9d-3b897ca72b2c/Captura+de+pantalla+2025-03-27+a+las+14.04.55.png?format=2500w')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            >
              <span className="sr-only">{chef.portraitImageAlt}</span>
            </motion.div>
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-4">
                {chef.portraitMeta}
              </p>
              <h3 className="text-3xl lg:text-4xl font-light tracking-tight mb-8">
                <strong className="font-semibold">
                  {chef.portraitName.split(" ")[0]}
                </strong>{" "}
                {chef.portraitName.split(" ").slice(1).join(" ")}
              </h3>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-4">
                {chef.portraitBio1}
              </p>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                {chef.portraitBio2}
              </p>
              <p className="text-sm text-gray-500 italic pt-6 border-t border-gray-200">
                {chef.portraitSignature}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RÉFÉRENCES CLIENTS */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#F4F1EC" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[10px] uppercase tracking-[4px] text-gray-400 mb-2">
              Brands · Corporate · Press Events
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 uppercase">
              Références
            </h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-8 gap-y-10 items-center">
            {CHEF_LOGOS.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <ChefLogoItem name={logo.name} img={logo.img} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE PORTFOLIO */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <p className="text-xs uppercase tracking-[4px] text-gray-400 mb-4">
              {chef.galleryLabel}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: chef.galleryTitle }}
            />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {chef.galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`relative bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity ${
                  i === 0
                    ? "col-span-2 row-span-2 aspect-auto min-h-[300px] md:min-h-[400px]"
                    : "aspect-square"
                }`}
              >
                <span className="text-[10px] lg:text-xs uppercase tracking-wider text-gray-400 font-medium">
                  {item.label}
                </span>
                <span className="text-[9px] lg:text-[10px] text-gray-400">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <p className="text-xs uppercase tracking-[4px] text-gray-400 mb-4">
              {chef.prestationsLabel}
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: chef.prestationsTitle }}
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chef.prestations.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="border border-gray-200 bg-white p-8 lg:p-10 transition-colors duration-300 hover:border-gray-900"
              >
                <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-3">
                  {item.number}
                </p>
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-500 leading-relaxed mb-5">
                  {item.description}
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  {item.capacity}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4 [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: chef.ctaTitle }}
            />
            <p className="text-base lg:text-lg text-white/50 max-w-lg mx-auto mb-12">
              {chef.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RippleButton
                href={EXTERNAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-black"
                className="bg-white text-black hover:text-white px-10 py-5 text-xs uppercase tracking-[2px] font-semibold"
              >
                {chef.ctaContact}
                <ArrowRight className="w-4 h-4" />
              </RippleButton>
              <RippleButton
                href="https://www.homemadelab.fr/"
                target="_blank"
                rel="noopener noreferrer"
                rippleColor="bg-white"
                className="border border-white text-white hover:text-black px-10 py-5 text-xs uppercase tracking-[2px] font-semibold"
              >
                {chef.ctaHomemade}
                <ArrowRight className="w-4 h-4" />
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
