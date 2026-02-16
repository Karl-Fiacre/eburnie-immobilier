import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";

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
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold">Nos Biens</h1>
          <p className="mt-2 opacity-80">Trouvez le bien idéal à Bouaké</p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-muted py-6">
        <div className="container">
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
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : properties && properties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Aucun bien ne correspond à vos critères.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default NosBiens;
