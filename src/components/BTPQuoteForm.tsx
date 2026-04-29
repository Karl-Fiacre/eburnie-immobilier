import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { company } from "@/config/company";

const PRESTATIONS = [
  "Maçonnerie",
  "Menuiserie",
  "Carrelage",
  "Peinture",
  "Ferronnerie",
  "Projet complet (clé en main)",
  "Autre",
];

const schema = z.object({
  nom: z.string().trim().min(2, "Nom trop court").max(80, "Nom trop long"),
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro invalide")
    .max(20, "Numéro trop long")
    .regex(/^[+\d\s().-]+$/, "Numéro invalide"),
  prestation: z.string().min(1, "Sélectionnez une prestation"),
  quartier: z.string().trim().min(2, "Quartier requis").max(80, "Quartier trop long"),
  description: z
    .string()
    .trim()
    .min(10, "Décrivez votre projet (10 caractères min.)")
    .max(800, "Description trop longue (800 max.)"),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = {
  nom: "",
  telephone: "",
  prestation: "",
  quartier: "",
  description: "",
};

const BTPQuoteForm = () => {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      result.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = iss.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Formulaire incomplet",
        description: "Merci de corriger les champs indiqués.",
        variant: "destructive",
      });
      return;
    }

    const v = result.data;
    const message =
      `Bonjour ${company.name},\n\n` +
      `Je souhaite un devis BTP.\n\n` +
      `• Nom : ${v.nom}\n` +
      `• Téléphone : ${v.telephone}\n` +
      `• Prestation : ${v.prestation}\n` +
      `• Quartier : ${v.quartier}\n\n` +
      `Description du projet :\n${v.description}\n\n` +
      `Merci.`;

    const url = `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast({
      title: "Demande prête !",
      description: "Vous êtes redirigé vers WhatsApp pour finaliser l'envoi.",
    });
    setValues(initial);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 shadow-xl md:p-10"
      noValidate
    >
      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
          Devis BTP
        </span>
        <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
          Demandez votre devis en 1 minute
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Remplissez le formulaire — votre demande sera envoyée directement sur WhatsApp.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom complet *</Label>
          <Input
            id="nom"
            value={values.nom}
            onChange={(e) => update("nom", e.target.value)}
            placeholder="Jean Kouassi"
            maxLength={80}
            aria-invalid={!!errors.nom}
          />
          {errors.nom && <p className="text-xs text-destructive">{errors.nom}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input
            id="telephone"
            type="tel"
            value={values.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            placeholder="+225 07 00 00 00 00"
            maxLength={20}
            aria-invalid={!!errors.telephone}
          />
          {errors.telephone && (
            <p className="text-xs text-destructive">{errors.telephone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="prestation">Type de prestation *</Label>
          <Select
            value={values.prestation}
            onValueChange={(v) => update("prestation", v)}
          >
            <SelectTrigger id="prestation" aria-invalid={!!errors.prestation}>
              <SelectValue placeholder="Choisir une prestation" />
            </SelectTrigger>
            <SelectContent>
              {PRESTATIONS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.prestation && (
            <p className="text-xs text-destructive">{errors.prestation}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quartier">Quartier / Localisation *</Label>
          <Input
            id="quartier"
            value={values.quartier}
            onChange={(e) => update("quartier", e.target.value)}
            placeholder="Yaou, Bonoua"
            maxLength={80}
            aria-invalid={!!errors.quartier}
          />
          {errors.quartier && (
            <p className="text-xs text-destructive">{errors.quartier}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description du projet *</Label>
          <Textarea
            id="description"
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Décrivez votre projet : surface, matériaux souhaités, délais, budget approximatif…"
            rows={5}
            maxLength={800}
            aria-invalid={!!errors.description}
          />
          <div className="flex items-center justify-between">
            {errors.description ? (
              <p className="text-xs text-destructive">{errors.description}</p>
            ) : (
              <span className="text-xs text-muted-foreground">
                Plus c'est précis, plus le devis sera juste.
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {values.description.length}/800
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button
          type="submit"
          size="lg"
          className="w-full bg-green-500 text-white hover:bg-green-600 sm:w-auto"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Envoyer via WhatsApp
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            setValues(initial);
            setErrors({});
          }}
        >
          Réinitialiser
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        <Send className="mr-1 inline h-3 w-3" />
        Vos données ne sont pas stockées — elles sont envoyées directement sur WhatsApp.
      </p>
    </motion.form>
  );
};

export default BTPQuoteForm;
