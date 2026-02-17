import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Ruler, BedDouble, Bath, MessageCircle, ArrowLeft, Send, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProperty } from "@/hooks/useProperties";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading } = useProperty(id!);
  const { toast } = useToast();
  const [slideIndex, setSlideIndex] = useState(0);
  const [formData, setFormData] = useState({ nom: "", telephone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  if (isLoading) return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
    </div>
  );
  if (!property) return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground">Bien introuvable.</p>
      <Button asChild variant="outline"><Link to="/biens">Retour aux biens</Link></Button>
    </div>
  );

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
      toast({ title: "Demande de visite envoyée avec succès !" });
      setFormData({ nom: "", telephone: "", email: "", message: "" });
    }
  };

  return (
    <>
      <SEOHead
        title={`${property.title} - ${property.listing_type === "location" ? "Location" : "Vente"} à ${property.quartier}`}
        description={`${property.property_type} ${property.listing_type === "location" ? "à louer" : "à vendre"} à ${property.quartier}, Bouaké. ${property.price.toLocaleString("fr-FR")} FCFA${property.listing_type === "location" ? "/mois" : ""}. ${property.surface ? property.surface + " m²" : ""} ${property.chambres ? property.chambres + " chambres" : ""}`.trim()}
        canonical={`/biens/${property.id}`}
        keywords={`${property.property_type} ${property.quartier} Bouaké, ${property.listing_type} ${property.property_type}, immobilier ${property.quartier}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": property.title,
          "description": property.description || `${property.property_type} disponible à ${property.quartier}`,
          "url": `https://difa-ci.com/biens/${property.id}`,
          "image": images[0] !== "/placeholder.svg" ? images[0] : undefined,
          "offers": {
            "@type": "Offer",
            "price": property.price,
            "priceCurrency": "XOF",
            "availability": property.status === "disponible" ? "https://schema.org/InStock" : "https://schema.org/SoldOut"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": property.quartier,
            "addressRegion": "Bouaké",
            "addressCountry": "CI"
          }
        }}
      />
      <Breadcrumb items={[{ label: "Nos Biens", href: "/biens" }, { label: property.title }]} />
      <motion.div
        className="container py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link to="/biens" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-secondary">
          <ArrowLeft className="h-4 w-4" /> Retour aux biens
        </Link>
      </motion.div>

      <div className="container pb-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left: gallery + info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Gallery */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slideIndex}
                  src={images[slideIndex]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              {images.length > 1 && (
                <>
                  <button onClick={() => setSlideIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2.5 shadow-lg backdrop-blur transition-transform hover:scale-110">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => setSlideIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2.5 shadow-lg backdrop-blur transition-transform hover:scale-110">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="absolute left-3 top-3 flex gap-2">
                <Badge className="bg-secondary text-secondary-foreground shadow-lg">{property.listing_type === "location" ? "Location" : "Vente"}</Badge>
                {property.status !== "disponible" && (
                  <Badge variant="destructive">{property.status === "loue" ? "Loué" : "Vendu"}</Badge>
                )}
              </div>
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`h-2 w-2 rounded-full transition-all ${i === slideIndex ? "bg-secondary w-6" : "bg-background/60"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all ${i === slideIndex ? "ring-2 ring-secondary ring-offset-2" : "opacity-60 hover:opacity-100"}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Info */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{property.property_type}</p>
                  <h1 className="mt-1 font-display text-3xl font-bold">{property.title}</h1>
                  <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{property.quartier}</p>
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold text-secondary">
                {property.price.toLocaleString("fr-FR")} FCFA{property.listing_type === "location" ? "/mois" : ""}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {property.surface && (
                  <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
                    <Ruler className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Surface</p>
                      <p className="font-semibold">{property.surface} m²</p>
                    </div>
                  </div>
                )}
                {property.chambres && (
                  <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
                    <BedDouble className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Chambres</p>
                      <p className="font-semibold">{property.chambres}</p>
                    </div>
                  </div>
                )}
                {property.salles_de_bain && (
                  <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
                    <Bath className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Salles de bain</p>
                      <p className="font-semibold">{property.salles_de_bain}</p>
                    </div>
                  </div>
                )}
              </div>

              {property.description && (
                <div className="mt-8">
                  <h2 className="font-display text-xl font-semibold">Description</h2>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{property.description}</p>
                </div>
              )}
              {property.conditions && (
                <div className="mt-8">
                  <h2 className="font-display text-xl font-semibold">Conditions</h2>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">{property.conditions}</p>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="sticky top-20">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold">Demander une visite</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Remplissez ce formulaire pour planifier une visite.</p>
                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <Input placeholder="Nom *" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} required />
                    <Input placeholder="Téléphone *" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} required />
                    <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <Textarea placeholder="Message (optionnel)" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={sending}>
                      {sending ? "Envoi..." : <><Send className="mr-2 h-4 w-4" /> Envoyer la demande</>}
                    </Button>
                  </form>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://wa.me/22500000000" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" /> Contacter via WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
