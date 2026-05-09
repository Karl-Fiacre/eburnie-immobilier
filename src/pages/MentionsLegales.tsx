import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { company } from "@/config/company";

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-secondary/15 px-1.5 py-0.5 text-secondary">[{children}]</span>
);

const MentionsLegales = () => (
  <>
    <SEOHead
      title="Mentions légales"
      description={`Mentions légales de ${company.name} : identité, RCCM, NCC, agrément immobilier, hébergement et contact.`}
      canonical="/mentions-legales"
    />
    <Breadcrumb items={[{ label: "Mentions légales" }]} />
    <section className="container max-w-3xl py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 font-display text-3xl font-bold text-primary md:text-4xl">
          Mentions légales
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Dernière mise à jour : <Placeholder>JJ/MM/AAAA</Placeholder>
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/90 md:text-base">
          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">1. Éditeur du site</h2>
            <ul className="space-y-1.5">
              <li><strong>Raison sociale :</strong> {company.name} ({company.parentCompany})</li>
              <li><strong>Forme juridique :</strong> <Placeholder>SARL / SA / Entreprise individuelle…</Placeholder></li>
              <li><strong>Capital social :</strong> <Placeholder>Montant en FCFA</Placeholder></li>
              <li><strong>Siège social :</strong> {company.address.full}</li>
              <li><strong>RCCM :</strong> <Placeholder>Numéro RCCM</Placeholder></li>
              <li><strong>NCC (Numéro de Compte Contribuable) :</strong> <Placeholder>Numéro NCC</Placeholder></li>
              <li><strong>Agrément immobilier :</strong> <Placeholder>Numéro d'agrément délivré par le Ministère</Placeholder></li>
              <li><strong>Téléphone :</strong> {company.phones[0]?.display}</li>
              <li><strong>Email :</strong> {company.email}</li>
              <li><strong>Directeur de la publication :</strong> <Placeholder>Nom & qualité</Placeholder></li>
            </ul>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">2. Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Lovable</strong> (Lovable AB) — Suède.
              Site : <a href="https://lovable.dev" className="text-secondary underline" target="_blank" rel="noreferrer">lovable.dev</a>.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logos, vidéos, charte graphique) est la
              propriété exclusive de {company.name} ou de ses partenaires. Toute reproduction, représentation ou
              diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une
              contrefaçon sanctionnée par le code de la propriété intellectuelle.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">4. Responsabilité</h2>
            <p>
              {company.name} s'efforce d'assurer l'exactitude des informations diffusées. Toutefois, l'éditeur ne
              saurait être tenu responsable des erreurs, omissions ou résultats obtenus par l'usage de ces
              informations. Les biens présentés sont susceptibles d'évolution sans préavis.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">5. Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions, contactez-nous à&nbsp;
              <a href={`mailto:${company.email}`} className="text-secondary underline">{company.email}</a>.
            </p>
          </article>
        </div>
      </motion.div>
    </section>
  </>
);

export default MentionsLegales;
