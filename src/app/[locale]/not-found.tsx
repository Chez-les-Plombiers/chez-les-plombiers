import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-[60vh] flex items-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-6xl lg:text-8xl font-light mb-6 tracking-tight">
            404
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Page not found / Page introuvable
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-4 bg-black text-white tracking-wider uppercase text-sm transition-all hover:bg-gray-900"
          >
            Home / Accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
