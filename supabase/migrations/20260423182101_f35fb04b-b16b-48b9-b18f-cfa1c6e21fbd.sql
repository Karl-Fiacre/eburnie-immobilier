
-- 1. Create new tables with _immobilier suffix (reuse existing enums)
CREATE TABLE public.properties_immobilier (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  property_type public.property_type NOT NULL DEFAULT 'appartement',
  listing_type public.listing_type NOT NULL DEFAULT 'location',
  price integer NOT NULL,
  quartier text NOT NULL,
  description text,
  conditions text,
  surface integer,
  chambres integer,
  salles_de_bain integer,
  status public.property_status NOT NULL DEFAULT 'disponible',
  images text[] DEFAULT '{}'::text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.messages_immobilier (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message_type public.message_type NOT NULL,
  nom text NOT NULL,
  telephone text NOT NULL,
  email text,
  message text,
  property_id uuid REFERENCES public.properties_immobilier(id) ON DELETE SET NULL,
  type_de_bien text,
  localisation text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles_immobilier (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 2. Enable RLS
ALTER TABLE public.properties_immobilier ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages_immobilier ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles_immobilier ENABLE ROW LEVEL SECURITY;

-- 3. Dedicated has_role function for the new user_roles table
CREATE OR REPLACE FUNCTION public.has_role_immobilier(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles_immobilier
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS policies — properties_immobilier
CREATE POLICY "Anyone can view properties"
  ON public.properties_immobilier FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert properties"
  ON public.properties_immobilier FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role_immobilier(auth.uid(), 'admin'));

CREATE POLICY "Admins can update properties"
  ON public.properties_immobilier FOR UPDATE
  TO authenticated
  USING (public.has_role_immobilier(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete properties"
  ON public.properties_immobilier FOR DELETE
  TO authenticated
  USING (public.has_role_immobilier(auth.uid(), 'admin'));

-- 5. RLS policies — messages_immobilier
CREATE POLICY "Anyone can submit messages"
  ON public.messages_immobilier FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view messages"
  ON public.messages_immobilier FOR SELECT
  TO authenticated
  USING (public.has_role_immobilier(auth.uid(), 'admin'));

CREATE POLICY "Admins can update messages"
  ON public.messages_immobilier FOR UPDATE
  TO authenticated
  USING (public.has_role_immobilier(auth.uid(), 'admin'));

-- 6. RLS policies — user_roles_immobilier
CREATE POLICY "Admins can view roles"
  ON public.user_roles_immobilier FOR SELECT
  TO authenticated
  USING (public.has_role_immobilier(auth.uid(), 'admin'));

-- 7. updated_at trigger on properties_immobilier
CREATE TRIGGER update_properties_immobilier_updated_at
  BEFORE UPDATE ON public.properties_immobilier
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Drop old tables
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.properties CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
