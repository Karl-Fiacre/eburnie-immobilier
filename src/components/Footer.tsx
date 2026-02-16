import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src={logo} alt="DIFA-CI" className="mb-4 h-20 w-auto" />
          <p className="text-sm opacity-80">
            Votre partenaire immobilier de confiance à Bouaké. Location, gestion et commercialisation de biens immobiliers.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="mb-4 font-display text-lg font-bold">Navigation</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/biens" className="transition-opacity hover:opacity-100">Nos Biens</Link>
            <Link to="/confier-bien" className="transition-opacity hover:opacity-100">Confier mon bien</Link>
            <Link to="/a-propos" className="transition-opacity hover:opacity-100">À propos</Link>
            <Link to="/contact" className="transition-opacity hover:opacity-100">Contact</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="mb-4 font-display text-lg font-bold">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span>Location de biens</span>
            <span>Gestion immobilière</span>
            <span>Mise en relation</span>
            <span>Commercialisation</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="mb-4 font-display text-lg font-bold">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +225 27 31 61 44 78</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +225 07 87 42 11 19</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +225 05 04 42 47 48</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@difa-ci.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> AK Centre Commercial, Bouaké</span>
          </div>
        </motion.div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} DIFA-CI & Business. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
