import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 font-display text-lg font-bold">DIFA-CI & Business</h3>
          <p className="text-sm opacity-80">
            Votre partenaire immobilier de confiance à Bouaké. Location, gestion et commercialisation de biens.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-display text-lg font-bold">Navigation</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/biens" className="hover:opacity-100">Nos Biens</Link>
            <Link to="/confier-bien" className="hover:opacity-100">Confier mon bien</Link>
            <Link to="/a-propos" className="hover:opacity-100">À propos</Link>
            <Link to="/contact" className="hover:opacity-100">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-display text-lg font-bold">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +225 00 00 00 00 00</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@difa-ci.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> AK Centre Commercial, Bouaké</span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} DIFA-CI & Business. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
