import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { company } from "@/config/company";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative mb-4 inline-block">
            <span className="absolute inset-0 -z-10 rounded-full bg-secondary/30 blur-2xl" aria-hidden />
            <img
              src={logo}
              alt={`${company.name} - Agence immobilière à ${company.address.city}`}
              className="h-28 w-28 sm:h-24 sm:w-24 rounded-full object-cover ring-2 ring-secondary/60 ring-offset-2 ring-offset-primary shadow-[0_0_30px_hsl(var(--secondary)/0.4)]"
            />
          </div>
          <p className="text-sm text-primary-foreground/90">
            {company.slogan}. Location, gestion et commercialisation de biens immobiliers.
          </p>
        </motion.div>
        <div className="grid grid-cols-3 gap-4 md:contents">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="mb-4 font-display text-lg font-bold">Navigation</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/85">
            <Link to="/" className="transition-colors hover:text-secondary">Accueil</Link>
            <Link to="/a-propos" className="transition-colors hover:text-secondary">À propos</Link>
            <Link to="/construction-btp" className="transition-colors hover:text-secondary">Construction & BTP</Link>
            <Link to="/biens" className="transition-colors hover:text-secondary">Nos Biens</Link>
            <Link to="/confier-bien" className="transition-colors hover:text-secondary">Confier mon bien</Link>
            <Link to="/devis" className="transition-colors hover:text-secondary">Devis</Link>
            <Link to="/contact" className="transition-colors hover:text-secondary">Contact</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="mb-4 font-display text-lg font-bold">Services</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/85">
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
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/85">
            {company.phones.map((p) => (
              <span key={p.raw} className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> {p.display}</span>
            ))}
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-secondary" /> {company.email}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" /> {company.address.full}</span>
          </div>
        </motion.div>
        </div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {company.name}. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
