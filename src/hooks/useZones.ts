import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Zone {
  id: string;
  name: string;
  zone_group: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

export const useZones = (opts?: { includeInactive?: boolean }) => {
  return useQuery({
    queryKey: ["zones", opts?.includeInactive ?? false],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zones_immobilier")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Zone[];
    },
  });
};

export const groupZones = (zones: Zone[]) => {
  const map = new Map<string, Zone[]>();
  zones.forEach((z) => {
    const list = map.get(z.zone_group) ?? [];
    list.push(z);
    map.set(z.zone_group, list);
  });
  return Array.from(map.entries());
};
