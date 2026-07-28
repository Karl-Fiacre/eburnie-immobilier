import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import { Home, ShieldCheck, TrendingUp, Users, Send } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { company } from "@/config/company";
import Breadcrumb from "@/components/Breadcrumb";

const advantages = [
  { icon: ShieldCheck, title: "Gestion sécurisée", desc: "Vos biens sont entre de bonnes mains. Nous gérons tout avec rigueur et professionnalisme." },
  { icon: TrendingUp, title: "Rendement optimisé", desc: "Maximisez vos revenus locatifs grâce à notre connaissance du marché de Bonoua et du Grand Abidjan." },
  { icon: Users, title: "Locataires vérifiés", desc: "Nous sélectionnons des locataires fiables et solvables pour votre tranquillité." },
  { icon: Home, title: "Suivi technique", desc: "Entretien, réparations et état des lieux réguliers pour préserver votre patrimoine." },
];

const ConfierBien = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nom: "", telephone: "", type_de_bien: "", localisation: "", description: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telephone.trim()) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages_immobilier").insert({
      message_type: "confier_bien" as const,
      nom: form.nom.trim(),
      telephone: form.telephone.trim(),
      type_de_bien: form.type_de_bien || null,
      localisation: form.localisation.trim() || null,
      message: form.description.trim() || null,
    });
    setSending(false);
    if (error) {
      toast({ title: "Erreur lors de l'envoi", variant: "destructive" });
    } else {
      toast({ title: "Demande envoyée avec succès ! Nous vous recontactons très vite." });
      setForm({ nom: "", telephone: "", type_de_bien: "", localisation: "", description: "" });
    }
  };

  return (
    <>
      <SEOHead
        title="Confier mon bien"
        description="Confiez la gestion de votre bien immobilier à Eburnie Immobilier, à Bonoua et dans tout le Grand Abidjan. Gestion locative, recherche de locataires et suivi technique professionnels."
        canonical="/confier-bien"
        keywords="gestion locative Bonoua, gestion locative Abidjan, confier bien immobilier Grand Abidjan, gérer propriété Côte d'Ivoire, rendement locatif Bonoua"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Gestion locative à Bonoua et dans le Grand Abidjan",
          "description": "Confiez la gestion de votre bien immobilier à Eburnie Immobilier. Recherche de locataires, suivi technique et rendement optimisé.",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Eburnie Immobilier",
            "address": { "@type": "PostalAddress", "addressLocality": "Bonoua", "addressCountry": "CI" }
          },
          "areaServed": company.serviceArea.cities.map((c) => ({ "@type": "City", "name": c })),
          "serviceType": ["Gestion locative", "Recherche de locataires", "Suivi technique", "Commercialisation"]
        }}
      />
      <Breadcrumb items={[{ label: "Confier mon bien" }]} />
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
        <div className="container relative z-10 text-center">
          <motion.h1
            className="font-display text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Confiez-nous votre bien
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-lg opacity-85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Propriétaire à Bonoua ou dans le Grand Abidjan ? Laissez-nous gérer, louer ou vendre votre bien en toute sérénité. Notre expertise locale est votre meilleur atout.
          </motion.p>
        </div>
      </section>

      {/* Advantages */}
      <AnimatedSection className="relative py-20 overflow-hidden bg-gradient-to-br from-muted/50 via-background to-accent/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,hsl(var(--secondary)/0.07),transparent_50%)]" />
        <div className="container relative">
          <AnimatedItem>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-secondary">Pourquoi nous confier votre bien ?</p>
            <h2 className="mt-2 text-center font-display text-3xl font-bold">Vos avantages</h2>
          </AnimatedItem>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <AnimatedItem key={a.title}>
                <motion.div className="text-center" whileHover={{ y: -5 }}>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                    <a.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Form */}
      <AnimatedSection className="relative py-20 overflow-hidden bg-gradient-to-t from-primary/[0.04] via-muted/40 to-secondary/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,hsl(var(--accent)/0.06),transparent_50%)]" />
        <div className="container max-w-lg">
          <AnimatedItem>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold text-center">Formulaire de demande</h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">Remplissez ce formulaire et nous vous recontactons sous 24h.</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Input placeholder="Nom complet *" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
                  <Input placeholder="Téléphone *" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} required />
                  <Select value={form.type_de_bien} onValueChange={(v) => setForm({ ...form, type_de_bien: v })}>
                    <SelectTrigger><SelectValue placeholder="Type de bien" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Terrain">Terrain</SelectItem>
                      <SelectItem value="Bureau">Bureau</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Localisation du bien" value={form.localisation} onChange={(e) => setForm({ ...form, localisation: e.target.value })} />
                  <Textarea placeholder="Décrivez votre bien (surface, état, nombre de pièces...)" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <Button type="submit" className="w-full cta-premium" disabled={sending}>
                    {sending ? "Envoi..." : <><Send className="mr-2 h-4 w-4" /> Envoyer ma demande</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </>
  );
};

export default ConfierBien;
