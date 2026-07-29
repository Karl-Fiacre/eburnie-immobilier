import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Requête invalide" }, 400);

    const { password, action, zone } = body as {
      password?: string;
      action?: string;
      zone?: Record<string, unknown>;
    };

    if (typeof password !== "string" || password.length === 0) {
      return json({ error: "Mot de passe requis" }, 401);
    }
    if (!["create", "update", "delete"].includes(action ?? "")) {
      return json({ error: "Action invalide" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { data: valid, error: authError } = await supabase.rpc("verify_admin_password", {
      _password: password,
    });
    if (authError || valid !== true) return json({ error: "Non autorisé" }, 401);

    const name = typeof zone?.name === "string" ? zone.name.trim() : "";
    const zoneGroup = typeof zone?.zone_group === "string" ? zone.zone_group.trim() : "";
    const description =
      typeof zone?.description === "string" ? zone.description.trim().slice(0, 500) : null;
    const sortOrder = Number.isFinite(Number(zone?.sort_order)) ? Number(zone?.sort_order) : 0;
    const isActive = zone?.is_active !== false;
    const id = typeof zone?.id === "string" ? zone.id : null;

    if (action === "delete") {
      if (!id) return json({ error: "Identifiant manquant" }, 400);
      const { error } = await supabase.from("zones_immobilier").delete().eq("id", id);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    if (!name || name.length > 120 || !zoneGroup || zoneGroup.length > 120) {
      return json({ error: "Nom et groupe requis (max 120 caractères)" }, 400);
    }

    const payload = {
      name,
      zone_group: zoneGroup,
      description,
      sort_order: sortOrder,
      is_active: isActive,
    };

    if (action === "update") {
      if (!id) return json({ error: "Identifiant manquant" }, 400);
      const { error } = await supabase.from("zones_immobilier").update(payload).eq("id", id);
      if (error) return json({ error: error.message }, 400);
      return json({ success: true });
    }

    const { error } = await supabase.from("zones_immobilier").insert(payload);
    if (error) return json({ error: error.message }, 400);
    return json({ success: true });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Erreur inconnue" }, 500);
  }
});
