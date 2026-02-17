"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl lg:text-8xl font-light mb-6 tracking-tight">
          Erreur
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Une erreur inattendue s&apos;est produite.
        </p>
        <button
          onClick={reset}
          className="inline-block px-10 py-4 bg-black text-white tracking-wider uppercase text-sm transition-all hover:bg-gray-900"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
