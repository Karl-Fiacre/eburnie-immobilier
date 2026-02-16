import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Ruler, BedDouble, Bath, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useProperty } from "@/hooks/useProperties";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading } = useProperty(id!);
  const { toast } = useToast();
  const [slideIndex, setSlideIndex] = useState(0);
  const [formData, setFormData] = useState({ nom: "", telephone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  if (isLoading) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Chargement...</div>;
  if (!property) return <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">Bien introuvable.</div>;

  const images = property.images?.length ? property.images : ["/placeholder.svg"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom.trim() || !formData.telephone.trim()) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      message_type: "visite" as const,
      nom: formData.nom.trim(),
      telephone: formData.telephone.trim(),
      email: formData.email.trim() || null,
      message: formData.message.trim() || null,
      property_id: property.id,
    });
    setSending(false);
    if (error) {
      toast({ title: "Erreur lors de l'envoi", variant: "destructive" });
    } else {
      toast({ title: "Demande envoyée avec succès !" });
      setFormData({ nom: "", telephone: "", email: "", message: "" });
    }
  };

  return (
    <>
      <div className="container py-6">
        <Link to="/biens" className="text-sm text-muted-foreground hover:text-foreground">← Retour aux biens</Link>
      </div>

      <div className="container pb-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left: gallery + info */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              <img src={images[slideIndex]} alt={property.title} className="h-full w-full object-cover" />
              {images.length > 1 && (
                <>
                  <button onClick={() => setSlideIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => setSlideIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="absolute left-3 top-3">
                <Badge className="bg-secondary text-secondary-foreground">{property.listing_type === "location" ? "Location" : "Vente"}</Badge>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSlideIndex(i)}
                    className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded border-2 ${i === slideIndex ? "border-secondary" : "border-transparent"}`}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="mt-8">
              <h1 className="font-display text-3xl font-bold">{property.title}</h1>
              <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{property.quartier}</p>
              <p className="mt-3 text-3xl font-bold text-secondary">
                {property.price.toLocaleString("fr-FR")} FCFA{property.listing_type === "location" ? "/mois" : ""}
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                {property.surface && <span className="flex items-center gap-1"><Ruler className="h-4 w-4 text-muted-foreground" />{property.surface} m²</span>}
                {property.chambres && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-muted-foreground" />{property.chambres} chambre(s)</span>}
                {property.salles_de_bain && <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-muted-foreground" />{property.salles_de_bain} salle(s) de bain</span>}
              </div>

              {property.description && (
                <div className="mt-6">
                  <h2 className="font-display text-xl font-semibold">Description</h2>
                  <p className="mt-2 whitespace-pre-line text-muted-foreground">{property.description}</p>
                </div>
              )}
              {property.conditions && (
                <div className="mt-6">
                  <h2 className="font-display text-xl font-semibold">Conditions</h2>
                  <p className="mt-2 whitespace-pre-line text-muted-foreground">{property.conditions}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold">Demander une visite</h2>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <Input placeholder="Nom *" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
                <Input placeholder="Téléphone *" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} required />
                <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <Textarea placeholder="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                <Button type="submit" className="w-full" disabled={sending}>{sending ? "Envoi..." : "Envoyer la demande"}</Button>
              </form>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://wa.me/22500000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
