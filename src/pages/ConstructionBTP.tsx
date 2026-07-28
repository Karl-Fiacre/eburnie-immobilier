import { motion } from "framer-motion";
import { HardHat, Hammer, Brush, PaintBucket, Wrench, Layers, MessageCircle, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import BTPQuoteForm from "@/components/BTPQuoteForm";
import { company } from "@/config/company";

import heroImg from "@/assets/btp-hero.jpg";
import imgMaconnerie from "@/assets/btp-maconnerie.jpg";
import imgMenuiserie from "@/assets/btp-menuiserie.jpg";
import imgCarrelage from "@/assets/btp-carrelage.jpg";
import imgPeinture from "@/assets/btp-peinture.jpg";
import imgFerronnerie from "@/assets/btp-ferronnerie.jpg";

const services = [
  {
    icon: Hammer,
    title: "Maçonnerie",
    image: imgMaconnerie,
    description:
      "Construction de villas, immeubles et ouvrages en béton armé. Fondations, élévations, dalles, enduits — exécutés selon les règles de l'art.",
    bullets: ["Gros œuvre & fondations", "Murs en agglos / briques", "Dalles & poteaux béton armé", "Enduits & finitions"],
  },
  {
    icon: Layers,
    title: "Menuiserie",
    image: imgMenuiserie,
    description:
      "Menuiserie bois, aluminium et PVC sur mesure : portes, fenêtres, placards, dressings et mobilier intégré pour vos espaces.",
    bullets: ["Portes & fenêtres sur mesure", "Placards & dressings", "Cuisines équipées", "Mobilier intégré"],
  },
  {
    icon: Brush,
    title: "Carrelage",
    image: imgCarrelage,
    description:
      "Pose de carrelage sols et murs, faïence, grès cérame et marbre. Préparation des supports, calepinage soigné, joints parfaits.",
    bullets: ["Sols intérieurs & extérieurs", "Faïence salle de bain & cuisine", "Grès cérame grand format", "Marbre & pierres naturelles"],
  },
  {
    icon: PaintBucket,
    title: "Peinture",
    image: imgPeinture,
    description:
      "Peinture intérieure et extérieure, décorative et technique. Préparation des supports, application multicouches, finitions impeccables.",
    bullets: ["Peinture intérieure & extérieure", "Enduits décoratifs", "Vernis & laques", "Traitement façade"],
  },
  {
    icon: Wrench,
    title: "Ferronnerie",
    image: imgFerronnerie,
    description:
      "Conception et fabrication d'ouvrages métalliques : portails, grilles, garde-corps, escaliers, vérandas et éléments décoratifs.",
    bullets: ["Portails & grilles", "Garde-corps & rampes", "Escaliers métalliques", "Vérandas & marquises"],
  },
];

const galerie = [
  { src: imgMaconnerie, label: "Villa R+1 — Bonoua" },
  { src: imgMenuiserie, label: "Aménagement intérieur sur mesure" },
  { src: imgCarrelage, label: "Salle de bain — pose grand format" },
  { src: imgPeinture, label: "Rénovation séjour — finitions" },
  { src: imgFerronnerie, label: "Portail ferronnerie d'art" },
  { src: heroImg, label: "Chantier villa contemporaine" },
];

const ConstructionBTP = () => {
  return (
    <>
      <SEOHead
        title="Construction & BTP — Maçonnerie, Menuiserie, Carrelage"
        description="Eburnie Immobilier — services Construction & BTP à Bonoua et dans tout le Grand Abidjan : maçonnerie, menuiserie, carrelage, peinture et ferronnerie. Devis et galerie de projets réalisés."
        canonical="/construction-btp"
        keywords="construction Bonoua, construction Abidjan, BTP Grand Abidjan, BTP Côte d'Ivoire, maçonnerie Bonoua, menuiserie Bonoua, carrelage, peinture, ferronnerie, Eburnie Immobilier"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Construction et BTP",
          "provider": {
            "@type": "GeneralContractor",
            "name": company.name,
            "telephone": company.phones.map((p) => p.raw),
            "address": {
              "@type": "PostalAddress",
              "streetAddress": company.address.street,
              "addressLocality": company.address.city,
              "addressCountry": company.address.countryCode,
            },
          },
          "areaServed": company.serviceArea.cities.map((c) => ({ "@type": "City", "name": c })),
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services BTP",
            "itemListElement": services.map((s) => ({
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": s.title },
            })),
          },
        }}
      />
      <Breadcrumb items={[{ label: "Construction & BTP" }]} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Chantier de construction d'une villa à Bonoua"
            className="h-full w-full object-cover"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/70" />
        </div>
        <div className="container relative py-24 text-primary-foreground md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              <HardHat className="h-3.5 w-3.5" /> Construction & BTP
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              Bâtir avec exigence,<br /> livrer avec excellence.
            </h1>
            <p className="mt-5 max-w-2xl text-lg opacity-90">
              De la première pierre aux finitions, {company.name} pilote vos projets de construction
              et rénovation à {company.address.city} et dans toute la Côte d'Ivoire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="cta-premium">
                <Link to="/devis">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                <a href={company.whatsapp.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <AnimatedSection className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedItem>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Une expertise complète du gros œuvre aux finitions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Notre cellule Construction & BTP réunit maçons, menuisiers, carreleurs, peintres et
                ferronniers expérimentés. Nous coordonnons l'ensemble des corps de métier pour vous
                livrer un ouvrage durable, conforme et esthétique.
              </p>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>

      {/* SERVICES DETAIL */}
      <section className="bg-gradient-to-b from-muted/40 to-background py-16">
        <div className="container space-y-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={s.image}
                    alt={`${s.title} — projets ${company.name}`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-96"
                  />
                  <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                    Service {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.description}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-secondary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* GALERIE */}
      <AnimatedSection className="py-20">
        <div className="container">
          <AnimatedItem className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Réalisations</span>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Galerie de projets réalisés</h2>
            <p className="mt-3 text-muted-foreground">
              Quelques-uns de nos chantiers récents — de la construction neuve à la rénovation complète.
            </p>
          </AnimatedItem>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galerie.map((g, i) => (
              <motion.div
                key={g.label + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold">{g.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FORMULAIRE DEVIS */}
      <AnimatedSection className="bg-muted/30 py-20">
        <div className="container">
          <BTPQuoteForm />
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Un projet de construction ou de rénovation ?
            </h2>
            <p className="mt-3 max-w-2xl opacity-90">
              Décrivez-nous votre besoin — nous revenons vers vous avec un devis détaillé et transparent.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
              {company.phones.map((p) => (
                <a key={p.raw} href={`tel:${p.raw}`} className="inline-flex items-center gap-2 hover:opacity-100">
                  <Phone className="h-4 w-4" /> {p.display}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="cta-premium">
              <Link to="/devis">Demander un devis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
              <a href={company.whatsapp.url} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConstructionBTP;
