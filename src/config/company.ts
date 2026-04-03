/**
 * ============================================================
 * CONFIGURATION CENTRALISÉE DE L'ENTREPRISE
 * ============================================================
 * Modifiez ce fichier pour personnaliser le site pour un nouveau client.
 * Toutes les informations de l'entreprise sont regroupées ici.
 */

export const company = {
  // ── Identité ──────────────────────────────────────────────
  name: "DIFA-CI & Business",
  shortName: "DIFA-CI",
  slogan: "Votre partenaire immobilier de confiance à Bouaké",
  description:
    "Agence immobilière de confiance à Bouaké spécialisée dans la location, vente et gestion de biens immobiliers.",
  foundingYear: "2019",

  // ── Coordonnées ───────────────────────────────────────────
  phones: [
    { display: "+225 27 31 61 44 78", raw: "+22527316144 78" },
    { display: "+225 07 87 42 11 19", raw: "+2250787421119" },
    { display: "+225 05 04 42 47 48", raw: "+2250504424748" },
  ],
  email: "contact@difa-ci.com",
  hours: "Lun - Sam : 8h - 18h",

  // ── Adresse ───────────────────────────────────────────────
  address: {
    street: "AK Centre Commercial",
    city: "Bouaké",
    country: "Côte d'Ivoire",
    countryCode: "CI",
    full: "AK Centre Commercial, Bouaké",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31589.42!2d-5.03!3d7.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfb57a0a7d5b3c3d%3A0x1c5e5e5e5e5e5e5e!2sBouak%C3%A9%2C+C%C3%B4te+d'Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000",
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
    // instagram: "",
    // linkedin: "",
  },

  // ── SEO ───────────────────────────────────────────────────
  seo: {
    baseUrl: "https://difa-ci.com",
    defaultKeywords: "immobilier Bouaké, agence immobilière Côte d'Ivoire",
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
