import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useZones, groupZones } from "@/hooks/useZones";
import { company } from "@/config/company";

const ZonesDesservies = () => {
  const { data: zones, isLoading } = useZones();
  const activeZones = (zones ?? []).filter((z) => z.is_active);
  const groups = groupZones(activeZones);

  return (
    <>
      <SEOHead
        title="Zones desservies : Bonoua & Grand Abidjan"
        description="Découvrez toutes les communes couvertes par Eburnie Immobilier : Bonoua, Grand-Bassam et l'ensemble du Grand Abidjan (Cocody, Yopougon, Marcory, Plateau...). Accédez directement aux annonces de chaque zone."
        canonical="/zones-desservies"
        keywords="zones desservies immobilier Grand Abidjan, agence immobilière Bonoua, immobilier Cocody, immobilier Yopougon, immobilier Marcory, communes Abidjan"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: company.name,
          areaServed: activeZones.map((z) => ({ "@type": "City", name: z.name })),
        }}
      />
      <Breadcrumb items={[{ label: "Zones desservies" }]} />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 text-primary-foreground">
        <motion.div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/10"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <div className="container relative z-10 text-center">
          <motion.h1
            className="font-display text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nos zones desservies
          </motion.h1>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-lg text-primary-foreground/85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Basés à {company.address.full}, nous intervenons sur {company.serviceArea.label}.
          </motion.p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-muted/40 via-background to-accent/[0.03] py-16">
        <div className="container relative">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : groups.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">
              Les zones desservies seront bientôt publiées.
            </p>
          ) : (
            <div className="space-y-12">
              {groups.map(([groupName, list], gi) => (
                <motion.div
                  key={groupName}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: gi * 0.05 }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/20 text-secondary ring-1 ring-secondary/30">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <h2 className="font-display text-2xl font-bold text-primary">{groupName}</h2>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((zone) => (
                      <motion.div key={zone.id} whileHover={{ y: -4 }} className="h-full">
                        <Link
                          to={`/biens?quartier=${encodeURIComponent(zone.name)}`}
                          className="group flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-secondary/50 hover:shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-display text-lg font-bold text-primary">{zone.name}</h3>
                            <Building2 className="h-4 w-4 text-secondary/70" />
                          </div>
                          {zone.description && (
                            <p className="mt-2 flex-1 text-sm text-muted-foreground">{zone.description}</p>
                          )}
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                            Voir les biens à {zone.name}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-14 rounded-2xl border bg-card p-8 text-center shadow-sm">
            <h2 className="font-display text-2xl font-bold text-primary">
              Votre commune n'apparaît pas ?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Contactez-nous : nous étudions chaque demande sur {company.serviceArea.short}.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="secondary" className="cta-premium">
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/biens">Voir tous les biens</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ZonesDesservies;
