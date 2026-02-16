import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    const { error } = await supabase.from("messages").insert({
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
      toast({ title: "Demande envoyée avec succès !" });
      setForm({ nom: "", telephone: "", type_de_bien: "", localisation: "", description: "" });
    }
  };

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold">Confier mon bien</h1>
          <p className="mx-auto mt-3 max-w-xl opacity-80">
            Confiez-nous la gestion de votre bien en toute sérénité. Notre équipe s'occupe de tout.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Nom *" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} required />
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
            <Input placeholder="Localisation" value={form.localisation} onChange={(e) => setForm({ ...form, localisation: e.target.value })} />
            <Textarea placeholder="Description du bien" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Button type="submit" className="w-full" disabled={sending}>{sending ? "Envoi..." : "Envoyer"}</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ConfierBien;
