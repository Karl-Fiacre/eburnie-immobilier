/**
 * ============================================================
 * CONFIGURATION CENTRALISÉE DE L'ENTREPRISE
 * ============================================================
 * Modifiez ce fichier pour personnaliser le site pour un nouveau client.
 * Toutes les informations de l'entreprise sont regroupées ici.
 */

export const company = {
  // ── Identité ──────────────────────────────────────────────
  name: "Eburnie Immobilier",
  shortName: "Eburnie Immobilier",
  parentCompany: "Eburnie Corporation",
  slogan: "Votre partenaire immobilier de confiance à Bonoua",
  description:
    "Eburnie Immobilier, section d'activité d'Eburnie Corporation, agence immobilière de confiance à Bonoua spécialisée dans la location, vente et gestion de biens immobiliers.",
  foundingYear: "2019",

  // ── Coordonnées ───────────────────────────────────────────
  phones: [
    { display: "+225 07 87 42 11 19", raw: "+2250787421119" },
  ],
  email: "contact@eburnie-immobilier.ci",
  hours: "Lun - Sam : 8h - 18h",

  // ── Adresse ───────────────────────────────────────────────
  address: {
    street: "Yaou, Carrefour Maison Blanche",
    city: "Bonoua",
    country: "Côte d'Ivoire",
    countryCode: "CI",
    full: "Yaou, Carrefour Maison Blanche, Bonoua",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31787.5!2d-3.59!3d5.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBonoua%2C+C%C3%B4te+d'Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000",
  },

  // ── WhatsApp ──────────────────────────────────────────────
  whatsapp: {
    number: "2250787421119",
    get url() {
      return `https://wa.me/${this.number}`;
    },
  },

  // ── Réseaux sociaux ───────────────────────────────────────
  social: {
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },

  // ── SEO ───────────────────────────────────────────────────
  seo: {
    baseUrl: "https://eburnie-immobilier.ci",
    defaultKeywords: "immobilier Bonoua, agence immobilière Côte d'Ivoire, Eburnie Immobilier, Eburnie Corporation, location maison Bonoua, vente terrain Bonoua",
    locale: "fr_CI",
  },

  // ── Statistiques (page d'accueil) ─────────────────────────
  stats: [
    { value: 200, suffix: "+", label: "Biens gérés" },
    { value: 500, suffix: "+", label: "Clients satisfaits" },
    { value: 5, suffix: "+", label: "Années d'expertise" },
    { value: 98, suffix: "%", label: "Taux de satisfaction" },
  ],
} as const;

export type Company = typeof company;
