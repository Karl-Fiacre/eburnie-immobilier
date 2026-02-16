import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  property_type: string;
  listing_type: string;
  price: number;
  quartier: string;
  images: string[];
  status: string;
}

const PropertyCard = ({ id, title, property_type, listing_type, price, quartier, images, status }: PropertyCardProps) => (
  <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={images?.[0] || "/placeholder.svg"}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute left-3 top-3 flex gap-2">
        <Badge className="bg-secondary text-secondary-foreground">{listing_type === "location" ? "Location" : "Vente"}</Badge>
        {status !== "disponible" && (
          <Badge variant="destructive">{status === "loue" ? "Loué" : "Vendu"}</Badge>
        )}
      </div>
    </div>
    <CardContent className="p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{property_type}</p>
      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" /> {quartier}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-bold text-secondary">{price.toLocaleString("fr-FR")} FCFA{listing_type === "location" ? "/mois" : ""}</p>
        <Button size="sm" asChild>
          <Link to={`/biens/${id}`}>Détails</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default PropertyCard;
