import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { company } from "@/config/company";

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-secondary/15 px-1.5 py-0.5 text-secondary">[{children}]</span>
);

const PolitiqueConfidentialite = () => (
  <>
    <SEOHead
      title="Politique de confidentialité"
      description={`Politique de confidentialité de ${company.name} : collecte, finalités, durée de conservation et droits des utilisateurs (loi ivoirienne n°2013-450).`}
      canonical="/politique-confidentialite"
    />
    <Breadcrumb items={[{ label: "Politique de confidentialité" }]} />
    <section className="container max-w-3xl py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 font-display text-3xl font-bold text-primary md:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Dernière mise à jour : <Placeholder>JJ/MM/AAAA</Placeholder>
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-foreground/90 md:text-base">
          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données est <strong>{company.name}</strong>, sis à&nbsp;
              {company.address.full}. Pour toute question : <a href={`mailto:${company.email}`} className="text-secondary underline">{company.email}</a>.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">2. Données collectées</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>Formulaire contact :</strong> nom, téléphone, email, message.</li>
              <li><strong>Confier un bien :</strong> identité, coordonnées, informations sur le bien.</li>
              <li><strong>Demande de devis :</strong> coordonnées et détails du projet.</li>
              <li><strong>Données techniques :</strong> adresse IP, navigateur, pages visitées (cookies).</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">3. Finalités</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Répondre aux demandes des utilisateurs.</li>
              <li>Gérer la relation client (location, vente, gestion).</li>
              <li>Améliorer la qualité du site et des services.</li>
              <li>Respecter les obligations légales et fiscales.</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">4. Base légale</h2>
            <p>
              Les traitements reposent sur le consentement de l'utilisateur, l'exécution d'un contrat ou
              de mesures précontractuelles, et le respect des obligations légales applicables en Côte d'Ivoire
              (loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel).
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">5. Durée de conservation</h2>
            <p>
              Les données sont conservées pendant la durée strictement nécessaire aux finalités, et au maximum
              <Placeholder>3 ans</Placeholder> à compter du dernier contact, sauf obligation légale plus longue.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">6. Destinataires</h2>
            <p>
              Les données sont destinées aux services internes de {company.name} et, le cas échéant, à ses
              prestataires techniques (hébergement, emailing) soumis à des obligations de confidentialité.
              Aucune donnée n'est revendue à des tiers.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">7. Vos droits</h2>
            <p>
              Conformément à la loi ivoirienne, vous disposez d'un droit d'accès, de rectification, d'effacement,
              d'opposition, de limitation et de portabilité de vos données. Pour exercer ces droits, écrivez à&nbsp;
              <a href={`mailto:${company.email}`} className="text-secondary underline">{company.email}</a> en
              joignant une copie d'une pièce d'identité. Vous pouvez également saisir l'<strong>ARTCI</strong>
              {" "}(Autorité de Régulation des Télécommunications de Côte d'Ivoire).
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">8. Cookies</h2>
            <p>
              Le site utilise des cookies techniques nécessaires à son fonctionnement et, le cas échéant, des
              cookies de mesure d'audience. Vous pouvez configurer votre navigateur pour les refuser.
            </p>
          </article>

          <article>
            <h2 className="mb-3 font-display text-xl font-semibold text-primary">9. Sécurité</h2>
            <p>
              {company.name} met en œuvre les mesures techniques et organisationnelles appropriées pour protéger
              les données personnelles contre toute perte, altération ou accès non autorisé.
            </p>
          </article>
        </div>
      </motion.div>
    </section>
  </>
);

export default PolitiqueConfidentialite;
