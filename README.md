# 🏠 Template Site Immobilier – Lovable

Modèle professionnel de site web pour agence immobilière, construit avec React, Tailwind CSS et Lovable Cloud.

---

## 🚀 Démarrage rapide

1. **Remix** ce projet depuis Lovable (nom du projet → Settings → Remix)
2. Suivez le guide ci-dessous pour personnaliser le site pour votre client
3. Publiez via Lovable

---

## 🎨 Guide de personnalisation

### 1. Identité visuelle

| Élément | Fichier | Ce qu'il faut modifier |
|---------|---------|----------------------|
| **Logo** | `src/assets/logo.png` | Remplacer par le logo du client |
| **Image hero** | `src/assets/hero-bg.jpg` | Remplacer par la photo principale |
| **Favicon** | `index.html` | Modifier la balise `<link rel="icon">` |
| **Couleurs** | `src/index.css` | Variables CSS `:root` (voir section Couleurs) |

#### Couleurs (`src/index.css`)

Les couleurs principales à modifier dans `:root` (format HSL) :

```css
--primary: 216 50% 20%;        /* Couleur principale (bleu nuit) */
--secondary: 211 58% 44%;      /* Couleur secondaire (bleu moyen) */
--accent: 207 55% 60%;         /* Couleur d'accentuation (bleu clair) */
--background: 220 20% 98%;     /* Fond général */
--foreground: 216 40% 13%;     /* Texte principal */
```

> 💡 Pensez aussi à modifier le thème `.dark` si vous conservez le mode sombre.

#### Typographies (`src/index.css` + `tailwind.config.ts`)

- Police titres : `Cormorant Garamond` → remplacer dans `@import` et dans `h1-h4`
- Police corps : `Plus Jakarta Sans` → remplacer dans `@import` et `fontFamily.sans`

---

### 2. Informations de l'entreprise

| Information | Fichiers à modifier |
|-------------|-------------------|
| **Nom de l'entreprise** | `src/components/SEOHead.tsx` (`SITE_NAME`), `src/components/Footer.tsx`, `src/pages/Index.tsx`, `src/pages/APropos.tsx` |
| **Numéros de téléphone** | `src/components/Footer.tsx`, `src/pages/Contact.tsx` |
| **Email** | `src/components/Footer.tsx`, `src/pages/Contact.tsx` |
| **Adresse** | `src/components/Footer.tsx`, `src/pages/Contact.tsx`, `src/pages/APropos.tsx` |
| **WhatsApp** | `src/components/WhatsAppButton.tsx` (`WHATSAPP_NUMBER`) |
| **Domaine web** | `src/components/SEOHead.tsx` (`BASE_URL`) |

---

### 3. Contenu des pages

| Page | Fichier | Éléments à adapter |
|------|---------|-------------------|
| **Accueil** | `src/pages/Index.tsx` | Titre hero, services, arguments, statistiques, témoignages |
| **À propos** | `src/pages/APropos.tsx` | Historique, valeurs, jalons, description |
| **Nos Biens** | `src/pages/NosBiens.tsx` | Texte d'en-tête (les biens viennent de la BDD) |
| **Confier mon bien** | `src/pages/ConfierBien.tsx` | Texte d'accroche, avantages |
| **Devis** | `src/pages/Devis.tsx` | Étapes, textes du formulaire |
| **Contact** | `src/pages/Contact.tsx` | Coordonnées, horaires, lien Google Maps |

---

### 4. SEO & Référencement

| Élément | Fichier |
|---------|---------|
| **Nom du site / URL** | `src/components/SEOHead.tsx` → `SITE_NAME` et `BASE_URL` |
| **Meta descriptions** | Chaque page dans le composant `<SEOHead>` |
| **Mots-clés locaux** | Remplacer "Bouaké" par la ville du client dans tous les `keywords` |
| **JSON-LD Schema.org** | Objets `jsonLd` dans chaque page — adapter nom, adresse, téléphone |
| **Sitemap** | `public/sitemap.xml` — mettre à jour les URLs |
| **Robots.txt** | `public/robots.txt` — mettre à jour l'URL du sitemap |
| **Open Graph** | `index.html` — balises `og:image`, `og:url` |

---

### 5. Navigation

| Élément | Fichier |
|---------|---------|
| **Liens du menu** | `src/components/Navbar.tsx` → tableau `links` |
| **Liens du footer** | `src/components/Footer.tsx` |
| **Routes** | `src/App.tsx` → `<Routes>` |

---

### 6. Back-office admin

| Élément | Fichier |
|---------|---------|
| **Page de connexion** | `src/pages/admin/AdminLogin.tsx` |
| **Gestion des biens** | `src/pages/admin/AdminProperties.tsx` |
| **Messages reçus** | `src/pages/admin/AdminMessages.tsx` |

> Le back-office fonctionne avec Lovable Cloud (authentification + base de données). Chaque remix dispose de sa propre base.

---

### 7. Réseaux sociaux

Rechercher et remplacer les liens vers Facebook, TikTok, Instagram dans :
- `src/pages/Contact.tsx`
- `src/components/Footer.tsx`

---

## 📋 Checklist de contenu & SEO

| Élément | Où | Valeur attendue | Fichier concerné |
|---------|----|-----------------|------------------|
| **Nom entreprise (SEO title)** | `<title>` | Eburnie Immobilier | `index.html` + `<SEOHead>` sur chaque page |
| **Ville (SEO keywords)** | `keywords` | `immobilier Bonoua`, `agence immobilière Bonoua` | `index.html` + toutes les pages `<SEOHead>` |
| **OG title** | `og:title` | Eburnie Immobilier | `index.html` + `<SEOHead>` sur chaque page |
| **OG description** | `og:description` | Contient « Bonoua » et « Eburnie Immobilier » | `index.html` + `<SEOHead>` sur chaque page |
| **OG image** | `og:image` | Image cohérente avec l'identité Eburnie | `index.html` |
| **JSON-LD (Schema.org)** | `<script type="application/ld+json">` | `@context`: Eburnie Immobilier, address: Bonoua | Chaque page (`Index`, `Contact`, `APropos`, `NosBiens`) |
| **Sitemap URL** | `<loc>` | `https://eburnie-immobilier.ci/*` | `public/sitemap.xml` |
| **Robots sitemap** | `Sitemap:` | `https://eburnie-immobilier.ci/sitemap.xml` | `public/robots.txt` |
| **Canonical** | `<link rel="canonical">` | `https://eburnie-immobilier.ci/<page>` | `index.html` + toutes les pages |
| **Footer – nom** | Texte | Eburnie Immobilier | `src/components/Footer.tsx` |
| **Footer – ville** | Adresse | Bonoua | `src/components/Footer.tsx` |
| **Footer – coordonnées** | Téléphone / Email | Valeurs Eburnie Immobilier | `src/components/Footer.tsx` |
| **CTA WhatsApp** | Bouton flottant | `company.whatsapp.url` (depuis `company.ts`) | `src/components/WhatsAppButton.tsx` |
| **Composant WhatsApp** | Label aria / tooltip | « Contacter Eburnie Immobilier via WhatsApp » | `src/components/WhatsAppButton.tsx` |
| **Navbar – nom** | Logo texte | Eburnie Immobilier | `src/components/Navbar.tsx` |
| **Page Accueil – Hero** | H1 / sous-titre | Eburnie Immobilier + Bonoua | `src/pages/Index.tsx` |
| **Page À propos – adresse** | Texte | Yaou, Carrefour Maison Blanche, Bonoua | `src/pages/APropos.tsx` |
| **Page Contact – ville** | Coordonnées | Bonoua | `src/pages/Contact.tsx` |

---

## 📋 Checklist de personnalisation (originale)

- [ ] Remplacer le logo (`src/assets/logo.png`)
- [ ] Remplacer l'image hero (`src/assets/hero-bg.jpg`)
- [ ] Modifier les couleurs dans `src/index.css`
- [ ] Mettre à jour `SITE_NAME` et `BASE_URL` dans `SEOHead.tsx`
- [ ] Mettre à jour `WHATSAPP_NUMBER` dans `WhatsAppButton.tsx`
- [ ] Modifier les coordonnées dans `Footer.tsx` et `Contact.tsx`
- [ ] Adapter le contenu de la page À propos
- [ ] Adapter le contenu de la page d'accueil (hero, services, stats)
- [ ] Mettre à jour le `sitemap.xml` et `robots.txt`
- [ ] Mettre à jour les données JSON-LD dans chaque page
- [ ] Remplacer "Bouaké" par la ville du client partout
- [ ] Modifier les liens réseaux sociaux
- [ ] Créer un compte admin dans Lovable Cloud
- [ ] Tester sur mobile et publier

---

## 🛠 Technologies

- **React 18** + TypeScript + Vite
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** (animations)
- **Lovable Cloud** (base de données, auth, stockage photos)
- **react-helmet-async** (SEO dynamique)

---

## 📦 Structure du projet

```
src/
├── assets/          → Logo, images
├── components/      → Navbar, Footer, WhatsApp, SEOHead, PropertyCard...
├── hooks/           → useProperties, use-toast...
├── integrations/    → Client Lovable Cloud (ne pas modifier)
├── pages/           → Pages publiques + admin/
└── index.css        → Design tokens (couleurs, typos)
```
