

# 🏠 Site Web Immobilier – DIFA-CI & Business

## Vue d'ensemble
Site vitrine immobilier professionnel pour DIFA-CI & Business basé à Bouaké, avec un back-office administrateur pour gérer les biens et un système de formulaires par email.

## Direction visuelle
- **Palette** : Bleu nuit (#1B2A4A), doré subtil (#C8A951), blanc, gris clair
- **Style** : Design épuré, mobile-first, typographie élégante, grandes photos, cartes modernes
- **Bouton WhatsApp flottant** permanent sur toutes les pages

---

## Pages publiques

### 1. Page d'accueil
- **Hero** : Grande image immobilière avec titre « Votre partenaire immobilier de confiance à Bouaké », sous-titre, et 2 CTA (Voir les biens / WhatsApp)
- **Nos Services** : 4 blocs icônes (Location, Gestion, Mise en relation, Commercialisation)
- **Biens récents** : Grille de cartes avec image, type, prix, quartier et bouton détails
- **Pourquoi DIFA-CI** : 4 arguments clés (Expertise locale, Accompagnement, Transparence, Réseau)
- **Appel à action** : Bannière avec boutons « Demander une visite » et « Confier mon bien »

### 2. Page « Nos Biens »
- Barre de filtres : Location/Vente, Prix min-max, Type (Studio/Appartement/Maison), Quartier
- Affichage en grille responsive des annonces avec pagination

### 3. Page Détail d'un bien
- Galerie photos avec slider
- Informations complètes (prix, localisation, description, conditions, caractéristiques)
- Formulaire de demande de visite (Nom, Téléphone, Email, Message) → envoi par email
- Bouton WhatsApp direct

### 4. Page « Confier mon bien »
- Texte de présentation pour attirer les propriétaires
- Formulaire : Nom, Téléphone, Type de bien, Localisation, Description → envoi par email

### 5. Page À propos
- Historique, Vision, Valeurs de DIFA-CI
- Adresse : AK Centre Commercial – Bouaké
- Carte Google Maps intégrée

### 6. Page Contact
- Coordonnées (téléphones, email)
- Formulaire de contact → envoi par email
- Bouton WhatsApp
- Liens Facebook & TikTok

---

## Back-office administrateur

### Authentification
- Page de connexion sécurisée (email/mot de passe)

### Gestion des biens
- Liste des biens avec recherche/filtres
- Ajout/Modification/Suppression d'un bien
- Upload de photos pour chaque bien
- Champs : titre, type, prix, quartier, description, caractéristiques, statut (disponible/loué/vendu)

### Messages reçus
- Consultation des demandes de visite, formulaires « confier mon bien » et contacts reçus par email (copies sauvegardées en base)

---

## Infrastructure technique
- **Base de données** (Lovable Cloud) : Tables pour les biens, les messages/demandes
- **Authentification** : Supabase Auth pour l'accès admin
- **Stockage** : Lovable Cloud Storage pour les photos des biens
- **Edge Function** : Envoi d'emails via un service d'email pour les formulaires
- **SEO** : Balises meta optimisées pour « Immobilier à Bouaké »

