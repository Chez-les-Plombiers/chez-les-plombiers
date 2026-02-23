"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n-context";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  { name: "Sami Guillermet", rating: 5, text: "Meilleur endroit du monde.", date: "Sept. 2025" },
  { name: "Antoine Alloin", rating: 5, text: "Voilà un superbe écrin qui a accueilli mon événement pendant la FW. Pour un événement qui sort du commun, l'endroit sort du commun aussi !!", date: "Fév. 2026" },
  { name: "Edouard Eyglunent", rating: 5, text: "Excellent accueil, local modulable et aménagements bien pensés ! C'est rare d'avoir un prestataire aussi arrangeant et impliqué. Merci !", date: "Fév. 2026" },
  { name: "Guillaume Alcan", rating: 5, text: "Super endroit atypique en plein cœur de Paris. Équipement au top !", date: "Fév. 2026" },
  { name: "Pierre Grvs", rating: 5, text: "Un accueil sur mesure pour un lieu exceptionnel au cœur de Paris. L'équipe a su répondre à toutes nos demandes avec réactivité et professionnalisme. Un vrai coup de cœur !", date: "Fév. 2026" },
  { name: "François Legris", rating: 5, text: "Très bel endroit pour recevoir et organiser des événements à Paris. L'équipe est très professionnelle.", date: "Fév. 2026" },
  { name: "Yann Rouveure", rating: 5, text: "Superbe dîner / superbe endroit ! Tout était orchestré d'une main de maître !", date: "Fév. 2026" },
  { name: "Ruben Oshogau", rating: 5, text: "Excellent lieu en plein centre de Paris permettant d'accueillir des événements premium. L'espace est modulable et magnifiquement aménagé. À découvrir absolument !", date: "Fév. 2026" },
  { name: "Sacha Benarrous", rating: 5, text: "Excellente prestation !", date: "Fév. 2026" },
  { name: "Mathieu Cohen", rating: 5, text: "Lieu premium pour personnes exigeantes. Rien à redire, et c'est rare. Bravo.", date: "Fév. 2026" },
  { name: "Henri Cochard", rating: 5, text: "Très belle adresse proche du Louvre, avec un vrai cachet 'atelier'. Super équipe, on se sent entre de bonnes mains. À recommander les yeux fermés.", date: "Fév. 2026" },
  { name: "Anne Lemaitre", rating: 5, text: "Parfait pour une soirée d'entreprise ou un séminaire dans Paris centre. Cadre unique et équipe très à l'écoute.", date: "Fév. 2026" },
  { name: "Gabriel Kunde", rating: 5, text: "Lieu exceptionnel, très rare proche du Louvre et de la Samaritaine. Équipe réactive et professionnelle.", date: "Déc. 2025" },
  { name: "Hortense Gaschignard", rating: 5, text: "Lieu évènementiel canon à Paris 1er. Le cadre est fou — on dirait un ancien atelier d'artiste avec les poutres métalliques. Vraiment unique.", date: "Fév. 2026" },
  { name: "Justin Personnaz", rating: 5, text: "Un lieu d'exception, au cœur de Paris. Exceptionnel.", date: "Fév. 2025" },
  { name: "Elise Louviot", rating: 5, text: "", date: "Fév. 2026" },
  { name: "Charles", rating: 5, text: "", date: "Fév. 2025" },
];

const displayReviews = reviews.filter((r) => r.text.length > 0);

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} ${label}`}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} className="w-4 h-4 text-amber-400" />
      ))}
    </div>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { dict } = useI18n();
  const rev = dict.reviews as Record<string, string>;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 360;
    el.scrollBy({ left: direction === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  const initial = (name: string) => {
    const parts = name.split(" ");
    return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0][0];
  };

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GoogleLogo className="w-8 h-8" />
            <span className="text-sm uppercase tracking-widest text-gray-500">{rev.googleLabel}</span>
          </div>
          <h2 className="text-4xl lg:text-6xl mb-6">{rev.title}</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-amber-400" />
              ))}
            </div>
            <p className="text-lg lg:text-xl text-gray-600">
              <span className="font-medium text-black">5.0</span> — {reviews.length} {rev.ratingLabel}
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className={`absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-white hover:border-black ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label={rev.prevLabel}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            className={`absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-black hover:text-white hover:border-black ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label={rev.nextLabel}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            role="region"
            aria-label={rev.carouselLabel}
          >
            {displayReviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className="flex-shrink-0 w-[320px] md:w-[360px] snap-start"
              >
                <div className="bg-white border border-gray-100 p-8 h-full flex flex-col transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
                  <Stars count={review.rating} label={rev.starsLabel} />
                  <p className="text-gray-700 leading-relaxed mt-5 mb-6 flex-1 text-[15px]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-medium uppercase">
                      {initial(review.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                    <GoogleLogo className="w-5 h-5 ml-auto" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
