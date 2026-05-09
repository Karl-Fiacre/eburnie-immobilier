import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { company } from "@/config/company";

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-secondary/15 px-1.5 py-0.5 text-secondary">[{children}]</span>
);

const CGU = () => (
  <>
    <SEOHead
      title="Conditions Générales d'Utilisation"
      description={`Conditions Générales d'Utilisation du site ${company.name} : règles d'accès, usage du service, responsabilité et droit applicable.`}
      canonical="/cgu"
    />
    <Breadcrumb items={[{ label: "CGU" }]} />
    <section className="container max-w-3xl py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 font-display text-3xl font-bold text-primary md:text-4xl">
          Conditions Générales d'Utilisation
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          En vigueur au : <Placeholder>JJ/MM/AAAA</Placeholder>
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/90 md:text-base">
          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site
              {" "}<strong>{company.seo.baseUrl}</strong> édité par {company.name}. Toute navigation sur le site implique
              l'acceptation pleine et entière des CGU.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">2. Services proposés</h2>
            <p>
              Le site présente les activités de {company.name} : location, vente, gestion immobilière, mise en
              relation, devis et services de construction (BTP). Les informations relatives aux biens sont fournies
              à titre indicatif et ne constituent pas une offre contractuelle.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">3. Accès au site</h2>
            <p>
              Le site est accessible gratuitement 24h/24, sauf en cas de force majeure ou de maintenance.
              {company.name} ne saurait être tenue responsable d'une indisponibilité temporaire.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">4. Obligations de l'utilisateur</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Fournir des informations exactes lors des formulaires (contact, devis, confier un bien).</li>
              <li>Ne pas tenter de porter atteinte au fonctionnement du site.</li>
              <li>Ne pas reproduire le contenu sans autorisation.</li>
              <li>Respecter la législation ivoirienne en vigueur.</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">5. Propriété intellectuelle</h2>
            <p>
              Tous les éléments du site (textes, photos, logos, marques) sont protégés. Toute reproduction sans
              autorisation est strictement interdite.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">6. Responsabilité</h2>
            <p>
              {company.name} met tout en œuvre pour proposer des informations fiables, mais ne peut garantir
              l'absence d'erreurs. L'utilisateur est seul responsable de l'usage qu'il fait des informations.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">7. Données personnelles</h2>
            <p>
              Le traitement des données est détaillé dans notre&nbsp;
              <a href="/politique-confidentialite" className="text-secondary underline">Politique de confidentialité</a>.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">8. Droit applicable</h2>
            <p>
              Les présentes CGU sont soumises au droit ivoirien. Tout litige relèvera de la compétence exclusive
              des tribunaux d'<Placeholder>Abidjan / Grand-Bassam</Placeholder>.
            </p>
          </article>
        </div>
      </motion.div>
    </section>
  </>
);

export default CGU;
