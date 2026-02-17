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
import { FileText, Calculator, Clock, CheckCircle, Send, Ruler, PaintBucket, Wrench, Building } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const devisTypes = [
  { icon: Building, title: "Construction", desc: "Estimation complète pour vos projets de construction neuve à Bouaké et environs." },
  { icon: PaintBucket, title: "Rénovation", desc: "Devis détaillé pour la rénovation, la peinture et la remise en état de vos biens." },
  { icon: Ruler, title: "Aménagement", desc: "Chiffrage pour l'aménagement intérieur et extérieur de vos espaces." },
  { icon: Wrench, title: "Maintenance", desc: "Budget prévisionnel pour l'entretien régulier et les réparations de vos propriétés." },
];

const steps = [
  { icon: FileText, title: "1. Décrivez votre projet", desc: "Remplissez le formulaire avec les détails de votre projet immobilier." },
  { icon: Calculator, title: "2. Analyse & Estimation", desc: "Notre équipe analyse votre demande et prépare un devis détaillé." },
  { icon: Clock, title: "3. Réponse sous 48h", desc: "Recevez votre devis personnalisé dans un délai de 48 heures." },
  { icon: CheckCircle, title: "4. Validation & Lancement", desc: "Validez le devis et nous lançons les travaux selon le planning convenu." },
];

const Devis = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    type_projet: "",
    localisation: "",
    budget: "",
    description: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telephone.trim() || !form.type_projet) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      message_type: "contact" as const,
      nom: form.nom.trim(),
      telephone: form.telephone.trim(),
      email: form.email.trim() || null,
      type_de_bien: form.type_projet || null,
      localisation: form.localisation.trim() || null,
      message: `[DEVIS] Budget: ${form.budget || "Non précisé"}\n${form.description.trim() || ""}`,
    });
    setSending(false);
    if (error) {
      toast({ title: "Erreur lors de l'envoi", variant: "destructive" });
    } else {
      toast({ title: "Demande de devis envoyée ! Nous vous recontactons sous 48h." });
      setForm({ nom: "", telephone: "", email: "", type_projet: "", localisation: "", budget: "", description: "" });
    }
  };

  return (
    <>
      <SEOHead
        title="Demande de Devis Gratuit"
        description="Obtenez un devis gratuit pour vos projets immobiliers à Bouaké : construction, rénovation, aménagement. Réponse sous 48h par DIFA-CI & Business."
        canonical="/devis"
        keywords="devis immobilier Bouaké, devis construction Côte d'Ivoire, devis rénovation Bouaké, estimation travaux"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Devis immobilier gratuit à Bouaké",
          "description": "Obtenez un devis gratuit pour vos projets de construction, rénovation ou aménagement immobilier à Bouaké.",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "DIFA-CI & Business",
            "address": { "@type": "PostalAddress", "addressLocality": "Bouaké", "addressCountry": "CI" }
          },
          "areaServed": { "@type": "City", "name": "Bouaké" },
          "serviceType": ["Construction", "Rénovation", "Aménagement", "Maintenance"]
        }}
      />
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.2),transparent_60%)]" />
        <motion.div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-primary-foreground/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary-foreground/3"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container relative z-10 text-center">
          <motion.div
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/8 px-5 py-2.5 text-sm backdrop-blur-md"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Calculator className="h-4 w-4 text-accent" />
            <span className="font-medium tracking-wide">Estimation gratuite</span>
          </motion.div>
          <motion.h1
            className="font-display text-4xl font-bold md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Demandez votre devis
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-lg opacity-85 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Obtenez une estimation personnalisée et gratuite pour tous vos projets immobiliers à Bouaké. Construction, rénovation, aménagement — nous chiffrons tout.
          </motion.p>
        </div>
      </section>

      {/* Types de devis */}
      <AnimatedSection className="relative py-24 overflow-hidden bg-gradient-to-br from-muted/60 via-background to-accent/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,hsl(var(--secondary)/0.08),transparent_50%)]" />
        <div className="container relative">
          <AnimatedItem>
            <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-secondary">Nos prestations</p>
            <h2 className="mt-3 text-center font-display text-3xl font-bold md:text-4xl">Types de devis</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground leading-relaxed">
              Nous réalisons des devis détaillés pour une large gamme de projets immobiliers.
            </p>
          </AnimatedItem>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {devisTypes.map((d, i) => (
              <AnimatedItem key={d.title}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Card className="group h-full border-0 bg-muted/40 text-center shadow-none transition-all duration-500 hover:shadow-2xl hover:bg-background">
                    <CardContent className="p-8">
                      <motion.div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-secondary-foreground shadow-lg shadow-secondary/20"
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <d.icon className="h-7 w-7" />
                      </motion.div>
                      <h3 className="mt-5 font-display text-xl font-semibold">{d.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Étapes */}
      <AnimatedSection className="relative py-24 overflow-hidden bg-gradient-to-t from-primary/[0.04] via-secondary/[0.06] to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,hsl(var(--accent)/0.07),transparent_50%)]" />
        <div className="container">
          <AnimatedItem>
            <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-secondary">Comment ça marche</p>
            <h2 className="mt-3 text-center font-display text-3xl font-bold md:text-4xl">Le processus</h2>
          </AnimatedItem>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <AnimatedItem key={s.title}>
                <motion.div
                  className="relative text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-500 group-hover:bg-primary"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 250 }}
                  >
                    <s.icon className="h-7 w-7 text-primary" />
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="absolute right-0 top-8 hidden h-px w-full bg-border lg:block" style={{ left: "60%", width: "80%" }} />
                  )}
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Formulaire de devis */}
      <AnimatedSection className="relative py-24 overflow-hidden bg-gradient-to-br from-muted/40 via-background to-secondary/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--secondary)/0.06),transparent_50%)]" />
        <div className="container relative max-w-2xl">
          <AnimatedItem>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <motion.div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <FileText className="h-7 w-7 text-secondary" />
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold">Formulaire de devis</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Remplissez ce formulaire et recevez votre devis gratuit sous 48h.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Nom complet *"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Téléphone *"
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Select value={form.type_projet} onValueChange={(v) => setForm({ ...form, type_projet: v })}>
                    <SelectTrigger><SelectValue placeholder="Type de projet *" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Rénovation">Rénovation</SelectItem>
                      <SelectItem value="Aménagement">Aménagement</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Localisation du projet"
                      value={form.localisation}
                      onChange={(e) => setForm({ ...form, localisation: e.target.value })}
                    />
                    <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                      <SelectTrigger><SelectValue placeholder="Budget estimé" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Moins de 1 000 000 FCFA">Moins de 1 000 000 FCFA</SelectItem>
                        <SelectItem value="1 000 000 - 5 000 000 FCFA">1 - 5 millions FCFA</SelectItem>
                        <SelectItem value="5 000 000 - 15 000 000 FCFA">5 - 15 millions FCFA</SelectItem>
                        <SelectItem value="15 000 000 - 50 000 000 FCFA">15 - 50 millions FCFA</SelectItem>
                        <SelectItem value="Plus de 50 000 000 FCFA">Plus de 50 millions FCFA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Décrivez votre projet en détail (surface, matériaux souhaités, délais...)"
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-base h-12" disabled={sending}>
                    {sending ? "Envoi en cours..." : <><Send className="mr-2 h-4 w-4" /> Demander mon devis gratuit</>}
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

export default Devis;
