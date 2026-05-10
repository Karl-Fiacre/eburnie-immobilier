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
        <div className="grid grid-cols-2 gap-4 md:contents [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="mb-3 font-display text-sm font-bold sm:text-lg md:mb-4">Navigation</h4>
          <div className="flex flex-col gap-1.5 text-xs text-primary-foreground/85 sm:gap-2 sm:text-sm">
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
          <h4 className="mb-3 font-display text-sm font-bold sm:text-lg md:mb-4">Services</h4>
          <div className="flex flex-col gap-1.5 text-xs text-primary-foreground/85 sm:gap-2 sm:text-sm">
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
          <h4 className="mb-3 font-display text-sm font-bold sm:text-lg md:mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-xs text-primary-foreground/85 sm:gap-3 sm:text-sm">
            {company.phones.map((p) => (
              <span key={p.raw} className="flex items-start gap-1.5 break-all sm:items-center sm:gap-2"><Phone className="h-3.5 w-3.5 shrink-0 text-secondary sm:h-4 sm:w-4" /> {p.display}</span>
            ))}
            <span className="flex items-start gap-1.5 break-all sm:items-center sm:gap-2"><Mail className="h-3.5 w-3.5 shrink-0 text-secondary sm:h-4 sm:w-4" /> {company.email}</span>
            <span className="flex items-start gap-1.5 sm:items-center sm:gap-2"><MapPin className="h-3.5 w-3.5 shrink-0 text-secondary sm:h-4 sm:w-4" /> {company.address.full}</span>
          </div>
        </motion.div>
        </div>
      </div>
      <div className="mt-8 border-t border-primary-foreground/20 pt-6">
        <div className="flex flex-col items-center gap-3 text-center text-xs text-primary-foreground/80 sm:flex-row sm:justify-between">
          <p className="opacity-70">© {new Date().getFullYear()} {company.name}. Tous droits réservés.</p>
          <nav aria-label="Liens légaux" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <Link to="/mentions-legales" className="transition-colors hover:text-secondary">Mentions légales</Link>
            <span className="opacity-40" aria-hidden>·</span>
            <Link to="/cgu" className="transition-colors hover:text-secondary">CGU</Link>
            <span className="opacity-40" aria-hidden>·</span>
            <Link to="/politique-confidentialite" className="transition-colors hover:text-secondary">Politique de confidentialité</Link>
          </nav>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
