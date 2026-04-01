"use client";

import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const CLIENTS = [
  { name: "Prada", file: "prada.png" },
  { name: "Porsche", file: "porsche.png" },
  { name: "Publicis", file: "publicis.png" },
  { name: "CNN", file: "cnn.png" },
  { name: "New Balance", file: "new-balance.png" },
  { name: "Levi's", file: "levis.png" },
  { name: "Miu Miu", file: "miu-miu.png" },
  { name: "Oakley", file: "oakley.png" },
  { name: "Schwarzkopf", file: "schwarzkopf.png" },
  { name: "Maison 123", file: "maison-123.png" },
  { name: "GHD", file: "ghd.png" },
  { name: "ROC", file: "roc.png" },
  { name: "Philip Morris", file: "philip-morris.png" },
  { name: "Auditoire", file: "auditoire.png" },
  { name: "Backbone", file: "backbone.png" },
  { name: "Zmirov", file: "zmirov.png" },
  { name: "Magnetism", file: "magnetism.png" },
  { name: "Litkovska", file: "litkovska.png" },
  { name: "Spine", file: "spine.png" },
  { name: "Interlope", file: "interlope.png" },
];

interface ClientLogosSectionProps {
  title?: string;
  compact?: boolean;
  static?: boolean;
  theme?: "dark" | "light";
}

export default function ClientLogosSection({
  title = "Ils nous font confiance",
  compact = false,
  static: isStatic = false,
  theme = "dark",
}: ClientLogosSectionProps) {
  const logos = compact ? CLIENTS.slice(0, 10) : CLIENTS;
  const isDark = theme === "dark";

  if (isStatic) {
    return (
      <section className={`py-16 md:py-24 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
        <div className="container mx-auto px-6 md:px-12">
          <p className={`text-center text-xs font-medium uppercase tracking-[0.3em] mb-12 ${isDark ? "text-white/40" : "text-black/30"}`}>
            {title}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((client) => (
              <div
                key={client.name}
                className="relative h-8 md:h-10 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <Image
                  src={`/images/clients/${client.file}`}
                  alt={client.name}
                  width={120}
                  height={40}
                  className={`h-full w-auto object-contain ${isDark ? "invert brightness-200" : ""}`}
                  style={{ maxWidth: "120px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-10 md:py-14 ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}>
      <div className="container mx-auto px-6 md:px-12">
        {title && (
          <p className={`text-center text-xs font-medium uppercase tracking-[0.3em] mb-8 ${isDark ? "text-white/40" : "text-black/30"}`}>
            {title}
          </p>
        )}
        <div className={`mx-auto h-px max-w-sm ${isDark ? "bg-white/10" : "bg-black/10"} [mask-image:linear-gradient(to_right,transparent,white,transparent)] mb-6`} />
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InfiniteSlider gap={48} speed={80} speedOnHover={25}>
            {logos.map((client) => (
              <Image
                key={client.name}
                src={`/images/clients/${client.file}`}
                alt={client.name}
                width={120}
                height={40}
                className={`pointer-events-none h-5 md:h-7 w-auto select-none object-contain opacity-40 ${isDark ? "invert brightness-200" : ""}`}
                style={{ maxWidth: "120px" }}
              />
            ))}
          </InfiniteSlider>
        </div>
        <div className={`mx-auto h-px max-w-sm ${isDark ? "bg-white/10" : "bg-black/10"} [mask-image:linear-gradient(to_right,transparent,white,transparent)] mt-6`} />
      </div>
    </section>
  );
}
