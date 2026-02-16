import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProperties = (filters?: {
  listing_type?: string;
  property_type?: string;
  quartier?: string;
  price_min?: number;
  price_max?: number;
}) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.listing_type) query = query.eq("listing_type", filters.listing_type as "location" | "vente");
      if (filters?.property_type) query = query.eq("property_type", filters.property_type as "appartement" | "maison" | "studio" | "terrain" | "bureau" | "autre");
      if (filters?.quartier) query = query.ilike("quartier", `%${filters.quartier}%`);
      if (filters?.price_min) query = query.gte("price", filters.price_min);
      if (filters?.price_max) query = query.lte("price", filters.price_max);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
