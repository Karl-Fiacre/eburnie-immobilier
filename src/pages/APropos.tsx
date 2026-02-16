import { ShieldCheck, Eye, Users, Building } from "lucide-react";

const values = [
  { icon: Eye, title: "Vision", desc: "Devenir la référence immobilière de Bouaké en offrant des services de qualité accessibles à tous." },
  { icon: ShieldCheck, title: "Intégrité", desc: "Nous plaçons l'honnêteté et la transparence au cœur de chaque transaction." },
  { icon: Users, title: "Proximité", desc: "Un accompagnement humain et personnalisé pour chaque client." },
  { icon: Building, title: "Excellence", desc: "Des standards élevés dans la sélection et la gestion des biens." },
];

const APropos = () => (
  <>
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container text-center">
        <h1 className="font-display text-4xl font-bold">À propos de DIFA-CI & Business</h1>
        <p className="mx-auto mt-3 max-w-xl opacity-80">Votre partenaire immobilier de confiance à Bouaké</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Notre histoire</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          DIFA-CI & Business est née de la volonté de professionnaliser le secteur immobilier à Bouaké.
          Forte d'une connaissance approfondie du marché local, notre agence accompagne propriétaires et locataires
          dans toutes leurs démarches immobilières avec sérieux et dévouement.
        </p>
      </div>
    </section>

    <section className="bg-muted py-16">
      <div className="container">
        <h2 className="text-center font-display text-2xl font-bold">Nos valeurs</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20">
                <v.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl">
        <h2 className="font-display text-2xl font-bold">Nous trouver</h2>
        <p className="mt-4 text-muted-foreground">AK Centre Commercial – Bouaké, Côte d'Ivoire</p>
        <div className="mt-6 aspect-video overflow-hidden rounded-lg border">
          <iframe
            title="DIFA-CI Bouaké"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31589.42!2d-5.03!3d7.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfb57a0a7d5b3c3d%3A0x1c5e5e5e5e5e5e5e!2sBouak%C3%A9%2C+C%C3%B4te+d&#39;Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          />
        </div>
      </div>
    </section>
  </>
);

export default APropos;
