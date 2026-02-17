import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Image
              src="/images/logo/logo-white.png"
              alt="Chez Les Plombiers"
              width={120}
              height={32}
              className="h-8 w-auto mb-6"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Lieu événementiel d&apos;exception à Paris. Un espace unique pour
              vos événements privés et professionnels.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <nav aria-label="Navigation secondaire" className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/#services"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                À Propos
              </Link>
              <Link
                href="/#portfolio"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Notre Lieu
              </Link>
              <Link
                href="/#faq"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/#contact"
                className="block text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>
                <a href="tel:+33688679981" className="hover:text-white transition-colors">
                  06 88 67 99 81
                </a>
              </p>
              <p>
                <a href="mailto:contact@chezlesplombiers.fr" className="hover:text-white transition-colors">
                  contact@chezlesplombiers.fr
                </a>
              </p>
              <p>39 rue des Bourdonnais, 75001 Paris</p>
            </div>
          </div>
        </div>

        <div className="pt-8 pb-8 border-t border-gray-800">
          <h4 className="text-sm uppercase tracking-wider mb-6 text-gray-400">
            Informations légales
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-xs text-gray-400">
            <p>Chez les Plombiers SAS</p>
            <p>Capital social : 5 000 €</p>
            <p>SIREN : 928 788 157</p>
            <p>SIRET : 928 788 157 00016</p>
            <p>TVA : FR04 928 788 157</p>
            <p className="sm:col-span-2 lg:col-span-1">
              Création : 02/05/2024
            </p>
            <p className="sm:col-span-2 lg:col-span-3">
              Code NAF / APE : 82 30Z – Organisation de foires, salons
              professionnels et congrès
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
            <p>© {currentYear} Chez Les Plombiers. Tous droits réservés.</p>
            <div className="flex space-x-6">
              <Link
                href="/mentions-legales"
                className="hover:text-white transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="hover:text-white transition-colors"
              >
                Politique de Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
