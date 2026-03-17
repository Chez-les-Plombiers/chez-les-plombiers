"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, RotateCcw, Trash2 } from "lucide-react";
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

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const markdownComponents = {
  img: ({ src, alt, ...props }: React.ComponentProps<"img">) => {
    const srcStr = typeof src === "string" ? src : "";
    const isVideo = srcStr.endsWith(".mp4") || srcStr.endsWith(".webm");
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
};

const proseClasses =
  "prose prose-invert prose-sm md:prose-base max-w-none prose-headings:font-light prose-headings:tracking-tight prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70 prose-li:marker:text-white/30 prose-strong:text-white prose-strong:font-medium prose-a:text-white/80 prose-a:underline prose-a:underline-offset-2 prose-img:rounded prose-img:my-4 prose-hr:border-white/10 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-white/90 prose-code:text-[0.85em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-h2:text-white/90 prose-h2:text-base prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10 prose-h3:text-white/80 prose-h3:text-sm prose-h3:mt-5 prose-h3:mb-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5";

export function GuideContent() {
  const { dict, locale } = useI18n();
  const guide = dict.guide as unknown as GuideDict;

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Auto-scroll on new content
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const askQuestion = useCallback(
    async (question: string) => {
      if (!question.trim() || isLoading) return;

      const userMessage: ChatMessage = { role: "user", content: question.trim() };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setQuery("");
      setIsLoading(true);
      setHasError(false);
      setStreamingContent("");

      try {
        const res = await fetch("/api/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages, locale }),
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
          setStreamingContent(accumulated);
        }

        setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
        setStreamingContent("");
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, locale, messages]
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
    setMessages([]);
    setStreamingContent("");
    setHasError(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header — compact when chat started */}
      <div
        className={`px-6 text-center transition-all duration-500 ${
          hasMessages ? "pt-28 md:pt-32 pb-4" : "pt-44 md:pt-56 pb-8"
        }`}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`font-light tracking-tight mb-2 transition-all duration-500 ${
            hasMessages
              ? "text-2xl md:text-3xl"
              : "text-4xl md:text-5xl lg:text-6xl mb-4"
          }`}
        >
          {guide.title}
        </motion.h1>
        <AnimatePresence>
          {!hasMessages && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="text-base md:text-lg text-white/40 max-w-md mx-auto font-light"
            >
              {guide.subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Chat messages */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-6">
        {/* Suggestions — only before first message */}
        <AnimatePresence>
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mb-8"
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

        {/* Message list */}
        <div className="space-y-4 pb-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "user" ? (
                <div className="max-w-[85%] bg-white/10 px-5 py-3 rounded-2xl rounded-br-sm">
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              ) : (
                <div className="max-w-[95%] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-5 py-4 md:px-6 md:py-5 rounded-2xl rounded-bl-sm shadow-lg shadow-black/20">
                  <div className={proseClasses}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Streaming response */}
          {(streamingContent || isLoading) && !hasError && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="max-w-[95%] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-5 py-4 md:px-6 md:py-5 rounded-2xl rounded-bl-sm shadow-lg shadow-black/20">
                <div className={proseClasses}>
                  {streamingContent ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {streamingContent}
                    </ReactMarkdown>
                  ) : null}
                  {isLoading && (
                    <span className="inline-block w-2 h-5 bg-white/50 animate-pulse ml-0.5" />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="border border-red-500/20 bg-red-500/5 px-5 py-4 rounded-2xl rounded-bl-sm">
                <p className="text-white/50 mb-3 text-sm">{guide.errorMessage}</p>
                <button
                  onClick={() => {
                    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
                    if (lastUserMsg) {
                      // Remove the last user message and retry
                      setMessages((prev) => prev.slice(0, -1));
                      askQuestion(lastUserMsg.content);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white/70 text-sm rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {guide.retryButton}
                </button>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar — always visible at bottom */}
      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-black/0 pt-6 pb-4 md:pb-6">
        <div className="max-w-2xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={guide.placeholder}
              disabled={isLoading}
              className="w-full bg-white/[0.06] border border-white/10 text-white placeholder-white/25 px-5 py-4 pr-14 text-sm md:text-base font-light tracking-wide rounded-xl focus:outline-none focus:border-white/30 transition-colors duration-300 disabled:opacity-50"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Envoyer"
            >
              {isLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <Send className="w-4.5 h-4.5" />
              )}
            </button>
          </form>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-[10px] uppercase tracking-[2px] text-white/15">
              {guide.poweredBy}
            </p>
            {hasMessages && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-white/20 text-[10px] uppercase tracking-[2px] hover:text-white/50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                {locale === "en" ? "New chat" : "Nouveau chat"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
