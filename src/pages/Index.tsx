import { Link } from "react-router-dom";
import { Home, ClipboardList, Handshake, TrendingUp, ShieldCheck, Users, Eye, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import heroBg from "@/assets/hero-bg.jpg";

const services = [
  { icon: Home, title: "Location", desc: "Maisons & appartements à louer dans les meilleurs quartiers de Bouaké" },
  { icon: ClipboardList, title: "Gestion immobilière", desc: "Gestion complète de vos biens : locataires, entretien, loyers" },
  { icon: Handshake, title: "Mise en relation", desc: "Connecter propriétaires et locataires de confiance" },
  { icon: TrendingUp, title: "Commercialisation", desc: "Valorisation et promotion de vos biens immobiliers" },
];

const reasons = [
  { icon: Eye, title: "Expertise locale", desc: "Connaissance approfondie du marché immobilier de Bouaké" },
  { icon: Users, title: "Accompagnement", desc: "Un suivi personnalisé à chaque étape de votre projet" },
  { icon: ShieldCheck, title: "Transparence", desc: "Des transactions claires et sécurisées" },
  { icon: Network, title: "Réseau solide", desc: "Un large réseau de partenaires à Bouaké et environs" },
];

const Index = () => {
  const { data: properties } = useProperties();
  const recent = properties?.slice(0, 6) ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Immobilier à Bouaké" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container text-center text-primary-foreground">
          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl animate-fade-in">
            Votre partenaire immobilier<br />de confiance à Bouaké
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Location – Gestion – Commercialisation de biens immobiliers
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/biens">Voir les biens disponibles</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <a href="https://wa.me/22500000000" target="_blank" rel="noopener noreferrer">Contacter via WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">Nos Services</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Des solutions immobilières complètes pour vos besoins à Bouaké
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Card key={s.title} className="text-center transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20">
                    <s.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent properties */}
      <section className="bg-muted py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">Biens récents</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Découvrez nos dernières annonces immobilières à Bouaké
          </p>
          {recent.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-muted-foreground">Aucun bien disponible pour le moment.</p>
          )}
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link to="/biens">Voir toutes les annonces</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why DIFA-CI */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">Pourquoi choisir DIFA-CI ?</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <r.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Vous recherchez un bien ou souhaitez confier votre propriété ?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/contact">Demander une visite</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/confier-bien">Confier mon bien</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
