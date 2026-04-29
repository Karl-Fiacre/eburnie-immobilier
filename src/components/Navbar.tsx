import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Info, Building2, KeyRound, ClipboardList, Mail, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import type { LucideIcon } from "lucide-react";

interface NavLinkDef {
  to: string;
  label: string;
  icon: LucideIcon;
}

const links: NavLinkDef[] = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/a-propos", label: "À propos", icon: Info },
  { to: "/construction-btp", label: "Construction & BTP", icon: HardHat },
  { to: "/biens", label: "Nos Biens", icon: Building2 },
  { to: "/confier-bien", label: "Confier mon bien", icon: KeyRound },
  { to: "/devis", label: "Devis", icon: ClipboardList },
  { to: "/contact", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Eburnie Immobilier" className="h-12 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-muted ${
                  isActive ? "text-secondary" : "text-foreground"
                }`}
              >
                <motion.span
                  className="inline-flex"
                  whileHover={{ scale: 1.15, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-secondary" : "text-muted-foreground group-hover:text-secondary"}`} />
                </motion.span>
                <span>{l.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute inset-0 rounded-full border border-secondary/20 bg-secondary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t bg-background md:hidden"
          >
            <div className="px-4 pb-4 space-y-1">
              {links.map((l, i) => {
                const isActive = location.pathname === l.to;
                const Icon = l.icon;
                return (
                  <motion.div
                    key={l.to}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 120, damping: 14 }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{l.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-indicator"
                          className="ml-auto h-2 w-2 rounded-full bg-secondary"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
