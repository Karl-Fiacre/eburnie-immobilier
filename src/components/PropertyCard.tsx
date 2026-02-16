import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <Card className="group overflow-hidden border-0 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images?.[0] || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-secondary text-secondary-foreground shadow-lg">{listing_type === "location" ? "Location" : "Vente"}</Badge>
          {status !== "disponible" && (
            <Badge variant="destructive">{status === "loue" ? "Loué" : "Vendu"}</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{property_type}</p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
        <p className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {quartier}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-secondary">{price.toLocaleString("fr-FR")} FCFA{listing_type === "location" ? "/mois" : ""}</p>
          <Button size="sm" asChild className="bg-secondary hover:bg-secondary/90">
            <Link to={`/biens/${id}`}>Détails</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default PropertyCard;
