import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { company } from "@/config/company";

const contactInfo = [
  { icon: Phone, label: "Téléphone", value: company.phones[0]?.display, href: `tel:${company.phones[0]?.raw}` },
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: "Adresse", value: company.address.full, href: null },
  { icon: Clock, label: "Horaires", value: company.hours, href: null },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nom: "", telephone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom.trim() || !form.telephone.trim()) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      message_type: "contact" as const,
      nom: form.nom.trim(),
      telephone: form.telephone.trim(),
      email: form.email.trim() || null,
      message: form.message.trim() || null,
    });
    setSending(false);
    if (error) {
      toast({ title: "Erreur lors de l'envoi", variant: "destructive" });
    } else {
      toast({ title: "Message envoyé avec succès !" });
      setForm({ nom: "", telephone: "", email: "", message: "" });
    }
  };

  return (
    <>
      <SEOHead
        title="Contactez-nous"
        description="Contactez DIFA-CI & Business à Bouaké par téléphone, email ou WhatsApp. Notre équipe est disponible du lundi au samedi pour répondre à vos questions immobilières."
        canonical="/contact"
        keywords="contact DIFA-CI Bouaké, agence immobilière contact, téléphone immobilier Bouaké, WhatsApp DIFA-CI"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contactez DIFA-CI & Business",
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "DIFA-CI & Business",
            "telephone": ["+22527316144 78", "+2250787421119"],
            "email": "contact@difa-ci.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "AK Centre Commercial",
              "addressLocality": "Bouaké",
              "addressCountry": "CI"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "08:00",
              "closes": "18:00"
            }
          }
        }}
      />
      <Breadcrumb items={[{ label: "Contact" }]} />
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
        <div className="container relative z-10 text-center">
          <motion.h1
            className="font-display text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            className="mt-3 text-lg opacity-85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Notre équipe est prête à répondre à toutes vos questions
          </motion.p>
        </div>
      </section>

      <AnimatedSection className="relative py-20 overflow-hidden bg-gradient-to-br from-muted/50 via-background to-secondary/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,hsl(var(--accent)/0.06),transparent_50%)]" />
        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Info */}
            <div className="lg:col-span-2">
              <AnimatedItem>
                <h2 className="font-display text-2xl font-bold">Nos coordonnées</h2>
                <p className="mt-3 text-muted-foreground">
                  N'hésitez pas à nous contacter par téléphone, email ou en vous rendant directement à notre agence.
                </p>
              </AnimatedItem>
              <div className="mt-8 space-y-4">
                {contactInfo.map((c, i) => (
                  <AnimatedItem key={c.label}>
                    <motion.div whileHover={{ x: 4 }}>
                      <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                            <c.icon className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
                            {c.href ? (
                              <a href={c.href} className="text-sm font-medium hover:text-secondary">{c.value}</a>
                            ) : (
                              <p className="text-sm font-medium">{c.value}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </div>
              <AnimatedItem className="mt-8">
                <div className="flex gap-3">
                  <Button asChild className="bg-secondary hover:bg-secondary/90">
                    <a href="https://wa.me/2250787421119" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
                  </Button>
                </div>
              </AnimatedItem>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedItem>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="font-display text-2xl font-bold">Écrivez-nous</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Nous vous répondrons dans les meilleurs délais.</p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input placeholder="Nom *" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
                        <Input placeholder="Téléphone *" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} required />
                      </div>
                      <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      <Textarea placeholder="Votre message..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={sending}>
                        {sending ? "Envoi..." : <><Send className="mr-2 h-4 w-4" /> Envoyer le message</>}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedItem>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Contact;
