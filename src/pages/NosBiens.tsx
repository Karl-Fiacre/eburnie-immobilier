import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";

const NosBiens = () => {
  const [listingType, setListingType] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [quartier, setQuartier] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const { data: properties, isLoading } = useProperties({
    listing_type: listingType || undefined,
    property_type: propertyType || undefined,
    quartier: quartier || undefined,
    price_min: priceMin ? Number(priceMin) : undefined,
    price_max: priceMax ? Number(priceMax) : undefined,
  });

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
        <motion.div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container relative z-10 text-center">
          <motion.h1
            className="font-display text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos Biens Immobiliers
          </motion.h1>
          <motion.p
            className="mt-3 text-lg opacity-85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explorez notre catalogue de biens soigneusement sélectionnés à Bouaké
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <motion.section
        className="border-b bg-background py-6 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-foreground">Filtrer les résultats</span>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-full sm:w-auto">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Type d'annonce</label>
              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Tous" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="vente">Vente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Type de bien</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Tous" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="maison">Maison</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                  <SelectItem value="bureau">Bureau</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Quartier</label>
              <Input placeholder="Ex: Commerce" value={quartier} onChange={(e) => setQuartier(e.target.value)} className="w-full sm:w-40" />
            </div>
            <div className="w-full sm:w-auto">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Prix min (FCFA)</label>
              <Input type="number" placeholder="0" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full sm:w-32" />
            </div>
            <div className="w-full sm:w-auto">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Prix max (FCFA)</label>
              <Input type="number" placeholder="∞" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full sm:w-32" />
            </div>
            <Button variant="outline" onClick={() => { setListingType(""); setPropertyType(""); setQuartier(""); setPriceMin(""); setPriceMax(""); }}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Results */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-muted/40 via-background to-accent/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,hsl(var(--secondary)/0.06),transparent_50%)]" />
        <div className="container relative">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : properties && properties.length > 0 ? (
            <>
              <p className="mb-8 text-sm text-muted-foreground">{properties.length} bien(s) trouvé(s)</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((p) => (
                  <PropertyCard key={p.id} {...p} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg text-muted-foreground">Aucun bien ne correspond à vos critères.</p>
              <p className="mt-1 text-sm text-muted-foreground">Essayez de modifier vos filtres.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NosBiens;
