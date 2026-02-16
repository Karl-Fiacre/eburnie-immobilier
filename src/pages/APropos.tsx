import { ShieldCheck, Eye, Users, Building, Target, Heart, Award, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";

const values = [
  { icon: Eye, title: "Vision", desc: "Devenir la référence immobilière de Bouaké en offrant des services d'excellence accessibles à tous les budgets." },
  { icon: ShieldCheck, title: "Intégrité", desc: "Nous plaçons l'honnêteté et la transparence au cœur de chaque transaction. Aucun frais caché, aucune surprise." },
  { icon: Users, title: "Proximité", desc: "Un accompagnement humain et personnalisé pour chaque client, du premier contact à la remise des clés." },
  { icon: Award, title: "Excellence", desc: "Des standards élevés dans la sélection et la gestion des biens pour garantir votre entière satisfaction." },
];

const milestones = [
  { year: "2019", title: "Création", desc: "Fondation de DIFA-CI & Business à Bouaké avec une vision claire : professionnaliser l'immobilier local." },
  { year: "2021", title: "Croissance", desc: "Développement du portefeuille avec plus de 100 biens gérés dans les principaux quartiers de Bouaké." },
  { year: "2023", title: "Expansion", desc: "Extension des services vers la commercialisation et la mise en relation propriétaires-locataires." },
  { year: "2025", title: "Innovation", desc: "Lancement de notre plateforme digitale pour faciliter la recherche et la gestion de biens immobiliers." },
];

const APropos = () => (
  <>
    <SEOHead
      title="À propos"
      description="Découvrez DIFA-CI & Business, agence immobilière à Bouaké depuis 2019. Notre mission, nos valeurs et notre expertise du marché immobilier en Côte d'Ivoire."
      canonical="/a-propos"
      keywords="à propos DIFA-CI, agence immobilière Bouaké, histoire DIFA-CI, valeurs immobilier Côte d'Ivoire"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "À propos de DIFA-CI & Business",
        "description": "Agence immobilière fondée en 2019 à Bouaké, Côte d'Ivoire.",
        "mainEntity": {
          "@type": "Organization",
          "name": "DIFA-CI & Business",
          "foundingDate": "2019",
          "foundingLocation": "Bouaké, Côte d'Ivoire"
        }
      }}
    />
    {/* Header */}
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
      <motion.div
        className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/10"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="container relative z-10 text-center">
        <motion.h1
          className="font-display text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          À propos de DIFA-CI & Business
        </motion.h1>
        <motion.p
          className="mx-auto mt-3 max-w-xl text-lg opacity-85"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Une agence immobilière enracinée à Bouaké, au service de votre réussite
        </motion.p>
      </div>
    </section>

    {/* Story */}
    <AnimatedSection className="relative py-20 overflow-hidden bg-gradient-to-br from-secondary/[0.06] via-muted/40 to-accent/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,hsl(var(--secondary)/0.08),transparent_50%)]" />
      <div className="container">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          <AnimatedItem>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Notre histoire</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Née de la passion pour l'immobilier à Bouaké</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              DIFA-CI & Business est née de la volonté de professionnaliser le secteur immobilier à Bouaké. 
              Face aux défis du marché local — manque de transparence, offres peu structurées, absence de suivi — 
              nous avons décidé de créer une agence qui place le client au centre de tout.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Forte d'une connaissance approfondie du marché local et d'un réseau solide, notre équipe accompagne 
              propriétaires et locataires dans toutes leurs démarches immobilières avec sérieux, dévouement et 
              une exigence de qualité qui fait notre réputation.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="rounded-xl bg-muted/50 p-5 transition-colors hover:bg-muted"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-2xl font-bold text-secondary">{m.year}</p>
                  <p className="mt-1 font-display font-semibold">{m.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedItem>
        </div>
      </div>
    </AnimatedSection>

    {/* Mission */}
    <AnimatedSection className="bg-primary py-20 text-primary-foreground">
      <div className="container text-center">
        <AnimatedItem>
          <Lightbulb className="mx-auto h-10 w-10 text-accent mb-4" />
          <h2 className="font-display text-3xl font-bold">Notre mission</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed opacity-85">
            Faciliter l'accès à des biens immobiliers de qualité à Bouaké, en offrant un service 
            professionnel, transparent et personnalisé. Nous croyons que chaque personne mérite un 
            logement adapté à ses besoins et à son budget.
          </p>
        </AnimatedItem>
      </div>
    </AnimatedSection>

    {/* Values */}
    <AnimatedSection className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/[0.03] via-background to-secondary/[0.05]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,hsl(var(--accent)/0.08),transparent_50%)]" />
      <div className="container relative">
        <AnimatedItem>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-secondary">Ce qui nous guide</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold">Nos valeurs</h2>
        </AnimatedItem>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <AnimatedItem key={v.title}>
              <motion.div className="text-center" whileHover={{ y: -5 }}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-secondary-foreground shadow-lg shadow-secondary/20">
                  <v.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Location */}
    <AnimatedSection className="relative py-20 overflow-hidden bg-gradient-to-t from-muted/60 via-secondary/[0.04] to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,hsl(var(--secondary)/0.06),transparent_50%)]" />
      <div className="container max-w-4xl">
        <AnimatedItem>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-secondary">Venez nous rencontrer</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold">Nous trouver</h2>
          <p className="mt-4 text-center text-muted-foreground">AK Centre Commercial – Bouaké, Côte d'Ivoire</p>
        </AnimatedItem>
        <AnimatedItem className="mt-8">
          <div className="aspect-video overflow-hidden rounded-2xl border shadow-lg">
            <iframe
              title="DIFA-CI Bouaké"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31589.42!2d-5.03!3d7.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfb57a0a7d5b3c3d%3A0x1c5e5e5e5e5e5e5e!2sBouak%C3%A9%2C+C%C3%B4te+d&#39;Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </AnimatedItem>
      </div>
    </AnimatedSection>
  </>
);

export default APropos;
