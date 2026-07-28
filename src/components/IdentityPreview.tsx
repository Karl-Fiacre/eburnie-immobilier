import { useState } from "react";
import { Eye, X, Building2, MapPin, Search, Phone, Mail, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/config/company";

/**
 * Bouton flottant de prévisualisation des valeurs d'identité.
 * Permet de vérifier en temps réel le nom, l'adresse, les keywords SEO,
 * etc. depuis n'importe quelle page du site.
 */
const IdentityPreview = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/30"
        aria-label="Prévisualiser l'identité du site"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed bottom-24 left-6 z-50 w-[min(92vw,360px)] overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-2xl"
            role="dialog"
            aria-label="Résumé identité du site"
          >
            <header className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <h3 className="font-display text-sm font-semibold">Identité du site</h3>
              </div>
              <span className="rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                Aperçu
              </span>
            </header>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto px-4 py-4 text-sm">
              <Row icon={<Building2 className="h-4 w-4" />} label="Nom">
                {company.name}
              </Row>
              <Row icon={<Building2 className="h-4 w-4" />} label="Société mère">
                {company.parentCompany}
              </Row>
              <Row icon={<MapPin className="h-4 w-4" />} label="Adresse">
                {company.address.full}
                <span className="block text-xs text-muted-foreground">
                  {company.address.city}, {company.address.country}
                </span>
              </Row>
              <Row icon={<MapPin className="h-4 w-4" />} label="Zone d'intervention">
                {company.serviceArea.label}
              </Row>
              <Row icon={<Phone className="h-4 w-4" />} label="Téléphone">
                {company.phones.map((p) => p.display).join(" · ")}
              </Row>
              <Row icon={<Mail className="h-4 w-4" />} label="Email">
                {company.email}
              </Row>
              <Row icon={<Globe className="h-4 w-4" />} label="URL SEO">
                {company.seo.baseUrl}
              </Row>
              <Row icon={<Search className="h-4 w-4" />} label="Keywords SEO">
                <span className="block text-xs leading-relaxed text-muted-foreground">
                  {company.seo.defaultKeywords}
                </span>
              </Row>
              <Row icon={<Globe className="h-4 w-4" />} label="Locale">
                {company.seo.locale}
              </Row>
            </div>

            <footer className="border-t border-border bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
              Source : <code className="rounded bg-background px-1 py-0.5">src/config/company.ts</code>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const Row = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0">
    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 break-words font-medium text-foreground">{children}</div>
    </div>
  </div>
);

export default IdentityPreview;
