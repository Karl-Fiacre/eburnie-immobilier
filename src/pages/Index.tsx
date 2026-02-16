import { Link } from "react-router-dom";
import { Home, ClipboardList, Handshake, TrendingUp, ShieldCheck, Users, Eye, Network, Building, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  { icon: Home, title: "Location", desc: "Trouvez la maison ou l'appartement idéal dans les quartiers prisés de Bouaké. Nous sélectionnons pour vous des biens de qualité." },
  { icon: ClipboardList, title: "Gestion locative", desc: "Confiez-nous la gestion complète de vos biens : recherche de locataires, perception des loyers, entretien et suivi technique." },
  { icon: Handshake, title: "Mise en relation", desc: "Notre réseau connecte propriétaires sérieux et locataires fiables. Chaque profil est vérifié avec soin." },
  { icon: TrendingUp, title: "Commercialisation", desc: "Valorisez votre patrimoine grâce à nos stratégies de promotion : photos pro, annonces ciblées et accompagnement à la vente." },
];

const reasons = [
  { icon: Eye, title: "Expertise locale", desc: "Plus de 5 ans d'expérience sur le marché immobilier de Bouaké et ses environs." },
  { icon: Users, title: "Suivi personnalisé", desc: "Un interlocuteur dédié vous accompagne de la première visite jusqu'à la remise des clés." },
  { icon: ShieldCheck, title: "Transparence totale", desc: "Des contrats clairs, des prix justes et aucun frais caché. Votre confiance est notre priorité." },
  { icon: Network, title: "Réseau étendu", desc: "Un large portefeuille de biens et un réseau de partenaires dans toute la région." },
];

const stats = [
  { value: "200+", label: "Biens gérés" },
  { value: "500+", label: "Clients satisfaits" },
  { value: "5+", label: "Années d'expertise" },
  { value: "98%", label: "Taux de satisfaction" },
];

const Index = () => {
  const { data: properties } = useProperties();
  const recent = properties?.slice(0, 6) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Immobilier à Bouaké" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-secondary/50" />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute left-10 top-20 h-32 w-32 rounded-full border border-primary-foreground/10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute right-20 bottom-40 h-48 w-48 rounded-2xl border border-primary-foreground/5"
          animate={{ scale: [1, 0.8, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute right-1/4 top-1/4 h-20 w-20 rounded-full bg-secondary/10"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10 container text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm backdrop-blur"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Building className="h-4 w-4" />
              <span>N°1 de l'immobilier à Bouaké</span>
            </motion.div>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="block"
              >
                Votre partenaire
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="block text-accent"
              >
                immobilier de confiance
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="block"
              >
                à Bouaké
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg opacity-90 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Location – Gestion – Commercialisation de biens immobiliers. Des solutions sur mesure pour vos projets.
          </motion.p>
          
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/30 px-8">
              <Link to="/biens">
                Voir les biens <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur">
              <a href="https://wa.me/22500000000" target="_blank" rel="noopener noreferrer">Contacter via WhatsApp</a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-10 w-6 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2">
            <motion.div
              className="h-2 w-1 rounded-full bg-primary-foreground/60"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 gap-4 rounded-2xl bg-background p-8 shadow-xl md:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-secondary md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <AnimatedSection className="py-24">
        <div className="container">
          <AnimatedItem>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-secondary">Ce que nous offrons</p>
            <h2 className="mt-2 text-center font-display text-3xl font-bold md:text-4xl">Nos Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Des solutions immobilières complètes et professionnelles pour répondre à tous vos besoins à Bouaké et dans ses environs.
            </p>
          </AnimatedItem>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <AnimatedItem key={s.title}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full border-0 bg-muted/50 text-center shadow-none transition-all duration-300 hover:bg-background hover:shadow-lg">
                    <CardContent className="p-6">
                      <motion.div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-secondary-foreground shadow-lg shadow-secondary/20"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <s.icon className="h-8 w-8" />
                      </motion.div>
                      <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Recent properties */}
      <AnimatedSection className="bg-muted/50 py-24">
        <div className="container">
          <AnimatedItem>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-secondary">Notre portefeuille</p>
            <h2 className="mt-2 text-center font-display text-3xl font-bold md:text-4xl">Biens récents</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Découvrez nos dernières annonces immobilières soigneusement sélectionnées à Bouaké.
            </p>
          </AnimatedItem>
          {recent.length > 0 ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <AnimatedItem>
              <p className="mt-14 text-center text-muted-foreground">Aucun bien disponible pour le moment.</p>
            </AnimatedItem>
          )}
          <AnimatedItem className="mt-12 text-center">
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 px-8 shadow-lg shadow-secondary/20">
              <Link to="/biens">Voir toutes les annonces <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </AnimatedItem>
        </div>
      </AnimatedSection>

      {/* Why DIFA-CI */}
      <AnimatedSection className="py-24">
        <div className="container">
          <AnimatedItem>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-secondary">La différence DIFA-CI</p>
            <h2 className="mt-2 text-center font-display text-3xl font-bold md:text-4xl">Pourquoi nous choisir ?</h2>
          </AnimatedItem>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <AnimatedItem key={r.title}>
                <motion.div className="group text-center" whileHover={{ y: -5 }}>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <r.icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonial */}
      <AnimatedSection className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <AnimatedItem>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="mx-auto max-w-3xl font-display text-2xl font-medium italic leading-relaxed md:text-3xl">
              "DIFA-CI & Business a su trouver le bien parfait pour notre famille. Leur professionnalisme et leur connaissance du marché de Bouaké sont remarquables."
            </blockquote>
            <p className="mt-6 text-sm opacity-70">— Un client satisfait à Bouaké</p>
          </AnimatedItem>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-24">
        <div className="container">
          <AnimatedItem>
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-12 text-center text-primary-foreground md:p-16"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-secondary" />
              </div>
              
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Prêt à concrétiser votre projet immobilier ?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg opacity-85">
                  Que vous cherchiez un logement ou souhaitiez confier votre bien, notre équipe est à votre service.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 shadow-lg">
                    <Link to="/contact">Demander une visite</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <Link to="/confier-bien">Confier mon bien</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Index;
