
-- Table admin avec mot de passe haché
CREATE TABLE public.admin_immobilier (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS : personne n'a accès direct (même pas en lecture)
ALTER TABLE public.admin_immobilier ENABLE ROW LEVEL SECURITY;

-- Trigger updated_at
CREATE TRIGGER update_admin_immobilier_updated_at
  BEFORE UPDATE ON public.admin_immobilier
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction sécurisée : vérifie un mot de passe contre le hash stocké
CREATE OR REPLACE FUNCTION public.verify_admin_password(_password text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  _hash text;
  _input_hash text;
BEGIN
  SELECT password_hash INTO _hash FROM public.admin_immobilier LIMIT 1;
  IF _hash IS NULL THEN
    RETURN false;
  END IF;
  _input_hash := encode(extensions.digest(_password, 'sha256'), 'hex');
  RETURN _hash = _input_hash;
END;
$$;

-- S'assurer que pgcrypto (digest) est disponible
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Insérer un mot de passe par défaut (hash SHA-256 de "admin123") — À CHANGER ENSUITE
INSERT INTO public.admin_immobilier (password_hash)
VALUES (encode(extensions.digest('admin123', 'sha256'), 'hex'));
