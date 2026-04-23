UPDATE public.admin_immobilier
SET password_hash = encode(extensions.digest('eburnie2026', 'sha256'), 'hex'),
    updated_at = now();