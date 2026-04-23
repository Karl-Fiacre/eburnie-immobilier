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
    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -10 }}
  >
    <Card className="group relative overflow-hidden border-0 shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images?.[0] || "/placeholder.svg"}
          alt={`${property_type} ${listing_type === "location" ? "à louer" : "à vendre"} à ${quartier}, Bonoua - ${title}`}
          className="h-full w-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        {/* Shine sweep */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-secondary text-secondary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">{listing_type === "location" ? "Location" : "Vente"}</Badge>
          {status !== "disponible" && (
            <Badge variant="destructive">{status === "loue" ? "Loué" : "Vendu"}</Badge>
          )}
        </div>
      </div>
      <CardContent className="relative p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{property_type}</p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground line-clamp-1 transition-colors duration-300 group-hover:text-secondary">{title}</h3>
        <p className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-125 group-hover:text-secondary" /> {quartier}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-secondary">{price.toLocaleString("fr-FR")} FCFA{listing_type === "location" ? "/mois" : ""}</p>
          <Button size="sm" asChild className="bg-secondary hover:bg-secondary/90 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-secondary/40 group-hover:translate-x-1">
            <Link to={`/biens/${id}`}>Détails</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default PropertyCard;
