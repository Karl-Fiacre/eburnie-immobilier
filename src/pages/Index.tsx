import { Link } from "react-router-dom";
import { Home, ClipboardList, Handshake, TrendingUp, ShieldCheck, Users, Eye, Network, Building, ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { AnimatedSection, AnimatedItem, CountUp, ParallaxLayer } from "@/components/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import SEOHead from "@/components/SEOHead";
import { company } from "@/config/company";

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

const stats = company.stats;

const Index = () => {
  const { data: properties } = useProperties();
  const recent = properties?.slice(0, 6) ?? [];
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <>
      <SEOHead
        title="Agence Immobilière à Bouaké"
        description="DIFA-CI & Business, votre agence immobilière de confiance à Bouaké. Location, vente, gestion locative de maisons, appartements et terrains en Côte d'Ivoire."
        canonical="/"
        keywords="immobilier Bouaké, location maison Bouaké, agence immobilière Côte d'Ivoire, vente terrain Bouaké, gestion locative Bouaké, appartement Bouaké"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "DIFA-CI & Business",
          "description": "Agence immobilière de confiance à Bouaké spécialisée dans la location, vente et gestion de biens immobiliers.",
          "url": "https://difa-ci.com",
          "telephone": ["+22527316144 78", "+2250787421119"],
          "email": "contact@difa-ci.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "AK Centre Commercial",
            "addressLocality": "Bouaké",
            "addressCountry": "CI"
          },
          "areaServed": { "@type": "City", "name": "Bouaké" },
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          }
        }}
      />
      {/* Hero */}
      <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden">
        <motion.img
          src={heroBg}
          alt="Immobilier à Bouaké"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: heroScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-secondary/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.15),transparent_60%)]" />

        {/* Floating geometric shapes */}
        <ParallaxLayer speed={-0.15} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute left-[8%] top-[15%] h-40 w-40 rounded-full border-2 border-primary-foreground/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-[12%] top-[20%] h-24 w-24 rounded-2xl border border-primary-foreground/8 bg-primary-foreground/5 backdrop-blur-sm"
            animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[20%] bottom-[20%] h-16 w-16 rounded-full bg-secondary/15 backdrop-blur-sm"
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[25%] bottom-[30%] h-32 w-32 rounded-3xl border border-accent/10"
            animate={{ rotate: [-15, 15, -15], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[45%] top-[10%] h-6 w-6 rounded-full bg-accent/20"
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxLayer>

        <motion.div className="relative z-10 container text-center text-primary-foreground" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/8 px-5 py-2.5 text-sm backdrop-blur-md"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Building className="h-4 w-4 text-accent" />
              <span className="font-medium tracking-wide">N°1 de l'immobilier à {company.address.city}</span>
            </motion.div>
            <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
              <motion.span
                initial={{ opacity: 0, y: 60, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block"
              >
                Votre partenaire
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block text-gradient"
                style={{ WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundImage: "linear-gradient(135deg, hsl(207 55% 60%), hsl(211 58% 65%), hsl(207 55% 75%))" }}
              >
                immobilier de confiance
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block"
              >
                à Bouaké
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed opacity-85 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Location – Gestion – Commercialisation de biens immobiliers. Des solutions sur mesure pour vos projets.
          </motion.p>

          <motion.div
            className="mt-8 mb-28 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Button size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl shadow-secondary/25 px-8 text-base">
              <Link to="/biens">
                Voir les biens <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/40 text-primary hover:bg-primary/10 backdrop-blur-md text-base">
              <a href="https://wa.me/2250787421119" target="_blank" rel="noopener noreferrer">Contacter via WhatsApp</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-12 w-7 rounded-full border-2 border-primary-foreground/25 flex items-start justify-center pt-2.5">
            <motion.div
              className="h-2.5 w-1.5 rounded-full bg-primary-foreground/50"
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative -mt-20 z-20">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 gap-6 rounded-3xl glass-strong p-10 md:grid-cols-4"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="relative text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <p className="relative text-4xl font-bold text-secondary md:text-5xl font-display">
                  <CountUp end={s.value} suffix={s.suffix} duration={2.5} />
                </p>
                <p className="relative mt-2 text-sm font-medium text-muted-foreground tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <AnimatedSection className="relative py-28 overflow-hidden bg-gradient-to-br from-muted/80 via-background to-muted/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,hsl(var(--secondary)/0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,hsl(var(--accent)/0.06),transparent_50%)]" />
        <div className="container">
          <AnimatedItem>
            <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-secondary">Ce que nous offrons</p>
            <h2 className="mt-3 text-center font-display text-4xl font-bold md:text-5xl">Nos Services</h2>
            <p className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground leading-relaxed">
              Des solutions immobilières complètes et professionnelles pour répondre à tous vos besoins à Bouaké et dans ses environs.
            </p>
          </AnimatedItem>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <AnimatedItem key={s.title}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card className="group h-full border-0 bg-muted/40 text-center shadow-none transition-all duration-500 hover:glass-strong hover:shadow-2xl">
                    <CardContent className="p-8">
                      <motion.div
                        className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-secondary-foreground shadow-lg shadow-secondary/20"
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <s.icon className="h-8 w-8" />
                      </motion.div>
                      <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Recent properties */}
      <AnimatedSection className="relative py-28 overflow-hidden bg-gradient-to-b from-primary/[0.04] via-secondary/[0.06] to-primary/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--secondary)/0.1),transparent_60%)]" />
        <div className="container relative">
          <AnimatedItem>
            <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-secondary">Notre portefeuille</p>
            <h2 className="mt-3 text-center font-display text-4xl font-bold md:text-5xl">Biens récents</h2>
            <p className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground leading-relaxed">
              Découvrez nos dernières annonces immobilières soigneusement sélectionnées à Bouaké.
            </p>
          </AnimatedItem>
          {recent.length > 0 ? (
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <AnimatedItem>
              <p className="mt-16 text-center text-muted-foreground">Aucun bien disponible pour le moment.</p>
            </AnimatedItem>
          )}
          <AnimatedItem className="mt-14 text-center">
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 px-10 shadow-xl shadow-secondary/20 text-base">
              <Link to="/biens">Voir toutes les annonces <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </AnimatedItem>
        </div>
      </AnimatedSection>

      {/* Why DIFA-CI */}
      <AnimatedSection className="relative py-28 overflow-hidden bg-gradient-to-br from-muted/60 via-background to-accent/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,hsl(var(--accent)/0.08),transparent_50%)]" />
        <div className="container relative">
          <AnimatedItem>
            <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-secondary">La différence DIFA-CI</p>
            <h2 className="mt-3 text-center font-display text-4xl font-bold md:text-5xl">Pourquoi nous choisir ?</h2>
          </AnimatedItem>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <AnimatedItem key={r.title}>
                <motion.div
                  className="group text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-primary/8 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:shadow-xl group-hover:shadow-primary/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    <r.icon className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-primary-foreground" />
                  </motion.div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="relative py-32 overflow-hidden">
        {/* Rich layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,hsl(var(--accent)/0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,hsl(var(--secondary)/0.3),transparent_50%)]" />
        
        {/* Animated decorative elements */}
        <ParallaxLayer speed={-0.12} className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-primary-foreground/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-primary-foreground/3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[15%] top-[20%] h-3 w-3 rounded-full bg-accent/40"
            animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[10%] top-[60%] h-2 w-2 rounded-full bg-accent/30"
            animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </ParallaxLayer>

        <div className="container relative">
          <AnimatedItem>
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">Témoignages</p>
            <h2 className="text-center font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              Ce que disent nos clients
            </h2>
          </AnimatedItem>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "DIFA-CI & Business a su trouver le bien parfait pour notre famille. Leur professionnalisme et leur connaissance du marché de Bouaké sont remarquables.",
                name: "Kouamé Ange",
                role: "Propriétaire à Koko",
                rating: 5,
              },
              {
                quote: "Un accompagnement exceptionnel du début à la fin. L'équipe est réactive, transparente et toujours à l'écoute. Je recommande vivement !",
                name: "Diabaté Mariam",
                role: "Locataire à Air France",
                rating: 5,
              },
              {
                quote: "Grâce à DIFA-CI, j'ai pu confier mes biens en toute sérénité. La gestion locative est irréprochable et les rapports sont clairs.",
                name: "Traoré Ibrahim",
                role: "Investisseur immobilier",
                rating: 5,
              },
            ].map((t, i) => (
              <AnimatedItem key={i}>
                <motion.div
                  className="group relative h-full rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-accent/30 hover:bg-primary-foreground/10"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Quote icon */}
                  <motion.div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Quote className="h-6 w-6" />
                  </motion.div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 * i + 0.08 * j, type: "spring", stiffness: 250 }}
                      >
                        <Star className="h-4 w-4 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="font-display text-lg italic leading-relaxed text-primary-foreground/90">
                    "{t.quote}"
                  </p>

                  {/* Divider */}
                  <motion.div
                    className="my-6 h-px w-12 bg-accent/40 transition-all duration-500 group-hover:w-full group-hover:bg-accent/60"
                  />

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-primary-foreground tracking-wide">{t.name}</p>
                    <p className="mt-1 text-xs text-primary-foreground/50 uppercase tracking-widest">{t.role}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute -bottom-px -right-px h-16 w-16 rounded-tl-3xl border-t border-l border-accent/0 transition-all duration-500 group-hover:border-accent/30" />
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="relative py-28 overflow-hidden bg-gradient-to-t from-muted/50 via-background to-secondary/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,hsl(var(--primary)/0.06),transparent_50%)]" />
        <div className="container relative">
          <AnimatedItem>
            <motion.div
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-secondary p-14 text-center text-primary-foreground md:p-20"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent)/0.15),transparent_50%)]" />
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-secondary"
                  animate={{ scale: [1, 0.85, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-4xl font-bold md:text-5xl leading-tight">
                  Prêt à concrétiser votre<br />projet immobilier ?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg opacity-80 leading-relaxed">
                  Que vous cherchiez un logement ou souhaitiez confier votre bien, notre équipe est à votre service.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 shadow-xl text-base">
                    <Link to="/contact">Demander une visite</Link>
                  </Button>
                   <Button size="lg" variant="outline" asChild className="border-primary/40 text-primary hover:bg-primary/10 text-base">
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
