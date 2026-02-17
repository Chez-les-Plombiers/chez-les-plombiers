"use client";

import { useI18n } from "@/lib/i18n-context";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useI18n();
  const err = dict.error as Record<string, string>;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl lg:text-8xl font-light mb-6 tracking-tight">
          {err.title}
        </h1>
        <p className="text-xl text-gray-600 mb-10">{err.description}</p>
        <button
          onClick={reset}
          className="inline-block px-10 py-4 bg-black text-white tracking-wider uppercase text-sm transition-all hover:bg-gray-900"
        >
          {err.cta}
        </button>
      </div>
    </main>
  );
}
