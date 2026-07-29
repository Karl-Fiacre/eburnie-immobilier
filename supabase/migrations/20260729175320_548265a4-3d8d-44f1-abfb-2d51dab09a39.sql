CREATE TABLE public.zones_immobilier (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  zone_group text NOT NULL DEFAULT 'Grand Abidjan',
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.zones_immobilier TO anon;
GRANT SELECT ON public.zones_immobilier TO authenticated;
GRANT ALL ON public.zones_immobilier TO service_role;

ALTER TABLE public.zones_immobilier ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active zones"
ON public.zones_immobilier FOR SELECT
USING (is_active = true);

CREATE TRIGGER update_zones_immobilier_updated_at
BEFORE UPDATE ON public.zones_immobilier
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.zones_immobilier (name, zone_group, description, sort_order) VALUES
('Bonoua', 'Siège & Sud-Comoé', 'Siège de l''agence : Yaou, Carrefour Maison Blanche.', 1),
('Grand-Bassam', 'Siège & Sud-Comoé', 'Ville balnéaire, résidences et terrains.', 2),
('Cocody', 'Abidjan Nord & Est', 'Villas, appartements haut de gamme et bureaux.', 10),
('Bingerville', 'Abidjan Nord & Est', 'Terrains et maisons familiales.', 11),
('Abobo', 'Abidjan Nord & Est', 'Locations accessibles et terrains.', 12),
('Anyama', 'Abidjan Nord & Est', 'Terrains et maisons en périphérie.', 13),
('Adjamé', 'Abidjan Centre', 'Commerces, bureaux et studios.', 20),
('Plateau', 'Abidjan Centre', 'Bureaux et locaux professionnels.', 21),
('Attécoubé', 'Abidjan Centre', 'Logements et terrains.', 22),
('Treichville', 'Abidjan Sud', 'Appartements et locaux commerciaux.', 30),
('Marcory', 'Abidjan Sud', 'Appartements et bureaux.', 31),
('Koumassi', 'Abidjan Sud', 'Locations résidentielles.', 32),
('Port-Bouët', 'Abidjan Sud', 'Maisons, terrains et proximité aéroport.', 33),
('Yopougon', 'Abidjan Ouest', 'Grand choix de locations et terrains.', 40),
('Songon', 'Abidjan Ouest', 'Terrains et projets de construction.', 41);