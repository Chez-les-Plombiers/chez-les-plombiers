"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useI18n } from "@/lib/i18n-context";

interface GuideDict {
  title: string;
  subtitle: string;
  placeholder: string;
  suggestionsLabel: string;
  suggestions: string[];
  errorMessage: string;
  retryButton: string;
  poweredBy: string;
  contactFallback: string;
}

export function GuideContent() {
  const { dict, locale } = useI18n();
  const guide = dict.guide as unknown as GuideDict;

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const askQuestion = useCallback(
    async (question: string) => {
      if (!question.trim() || isLoading) return;

      setIsLoading(true);
      setHasError(false);
      setResponse("");
      setHasAsked(true);

      try {
        const res = await fetch("/api/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question.trim(), locale }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setResponse(accumulated);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, locale]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askQuestion(query);
  };

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    askQuestion(suggestion);
  };

  const handleReset = () => {
    setQuery("");
    setResponse("");
    setHasAsked(false);
    setHasError(false);
    inputRef.current?.focus();
  };

  // Auto-scroll response into view
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [response]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-44 md:pt-56 pb-8 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4"
        >
          {guide.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base md:text-lg text-white/40 max-w-md mx-auto font-light"
        >
          {guide.subtitle}
        </motion.p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl mx-auto px-6"
      >
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={guide.placeholder}
            disabled={isLoading}
            className="w-full bg-white/[0.06] border border-white/10 text-white placeholder-white/25 px-6 py-5 pr-14 text-base md:text-lg font-light tracking-wide focus:outline-none focus:border-white/30 transition-colors duration-300 disabled:opacity-50"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
            aria-label="Envoyer"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        {/* Suggestions — only before first ask */}
        <AnimatePresence>
          {!hasAsked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-6"
            >
              <p className="text-[10px] uppercase tracking-[3px] text-white/20 mb-3">
                {guide.suggestionsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] text-white/40 text-sm font-light hover:text-white/70 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Response */}
      <AnimatePresence mode="wait">
        {(response || isLoading || hasError) && (
          <motion.div
            ref={responseRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto px-6 mt-10 mb-20"
          >
            <div className="border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              {hasError ? (
                <div className="text-center py-4">
                  <p className="text-white/50 mb-4">{guide.errorMessage}</p>
                  <button
                    onClick={() => askQuestion(query)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {guide.retryButton}
                  </button>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:font-light prose-headings:tracking-tight prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70 prose-strong:text-white prose-a:text-white/80 prose-a:underline prose-img:rounded prose-img:my-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img: ({ src, alt, ...props }) => {
                        const isVideo = src?.endsWith(".mp4") || src?.endsWith(".webm");
                        if (isVideo) {
                          return (
                            <video
                              src={src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full rounded border border-white/10 my-4"
                            />
                          );
                        }
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt={alt || ""}
                            loading="lazy"
                            className="w-full max-w-lg rounded border border-white/10"
                            {...props}
                          />
                        );
                      },
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                  {isLoading && (
                    <span className="inline-block w-2 h-5 bg-white/50 animate-pulse ml-0.5" />
                  )}
                </div>
              )}
            </div>

            {/* Reset + Contact fallback */}
            {!isLoading && response && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <button
                  onClick={handleReset}
                  className="text-white/30 text-sm hover:text-white/60 transition-colors cursor-pointer"
                >
                  ← {locale === "en" ? "Ask another question" : "Poser une autre question"}
                </button>
                <p className="text-white/20 text-xs">
                  {guide.contactFallback}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-4 text-center bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <p className="text-[10px] uppercase tracking-[2px] text-white/15">
          {guide.poweredBy}
        </p>
      </div>
    </div>
  );
}
