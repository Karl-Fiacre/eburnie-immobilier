import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold">Contact</h1>
          <p className="mt-2 opacity-80">Nous sommes à votre écoute</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="font-display text-2xl font-bold">Nos coordonnées</h2>
              <div className="mt-6 space-y-4">
                <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-secondary" /> +225 00 00 00 00 00</p>
                <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-secondary" /> contact@difa-ci.com</p>
                <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-secondary" /> AK Centre Commercial, Bouaké</p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button asChild>
                  <a href="https://wa.me/22500000000" target="_blank" rel="noopener noreferrer">
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
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-bold">Écrivez-nous</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input placeholder="Nom *" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
                <Input placeholder="Téléphone *" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} required />
                <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Textarea placeholder="Votre message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <Button type="submit" className="w-full" disabled={sending}>{sending ? "Envoi..." : "Envoyer"}</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
