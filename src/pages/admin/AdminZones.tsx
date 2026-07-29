import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useZones, type Zone } from "@/hooks/useZones";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";

const emptyForm = {
  id: "",
  name: "",
  zone_group: "Grand Abidjan",
  description: "",
  sort_order: 0,
  is_active: true,
};

const AdminZones = () => {
  const { data: zones, isLoading } = useZones();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const callAdmin = async (action: "create" | "update" | "delete", zone: Record<string, unknown>) => {
    const password = sessionStorage.getItem("admin_password") ?? "";
    const { data, error } = await supabase.functions.invoke("admin-zones", {
      body: { password, action, zone },
    });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const saveMutation = useMutation({
    mutationFn: async () =>
      callAdmin(form.id ? "update" : "create", {
        id: form.id || undefined,
        name: form.name,
        zone_group: form.zone_group,
        description: form.description,
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      setOpen(false);
      setForm(emptyForm);
      toast({ title: "Zone enregistrée" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => callAdmin("delete", { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      toast({ title: "Zone supprimée" });
    },
    onError: (e: Error) => toast({ title: "Erreur", description: e.message, variant: "destructive" }),
  });

  const openEdit = (z: Zone) => {
    setForm({
      id: z.id,
      name: z.name,
      zone_group: z.zone_group,
      description: z.description ?? "",
      sort_order: z.sort_order,
      is_active: z.is_active,
    });
    setOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Zones desservies</h1>
          <p className="text-sm text-muted-foreground">
            Gérez les communes affichées sur la page publique « Zones desservies ».
          </p>
        </div>
        <Button
          onClick={() => {
            setForm(emptyForm);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une zone
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-md bg-muted-foreground/10" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3">Zone</th>
                <th className="p-3">Groupe</th>
                <th className="p-3">Ordre</th>
                <th className="p-3">Statut</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(zones ?? []).map((z) => (
                <tr key={z.id} className="border-t">
                  <td className="p-3 font-medium">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-secondary" />
                      {z.name}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{z.zone_group}</td>
                  <td className="p-3 text-muted-foreground">{z.sort_order}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        z.is_active ? "bg-secondary/15 text-secondary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {z.is_active ? "Visible" : "Masquée"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(z)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(z.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
              {(zones ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-foreground">
                    Aucune zone enregistrée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Modifier la zone" : "Nouvelle zone"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nom de la commune / zone</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex : Cocody" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Groupe</label>
              <Input
                value={form.zone_group}
                onChange={(e) => setForm({ ...form, zone_group: e.target.value })}
                placeholder="Ex : Abidjan Sud"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Types de biens proposés dans cette zone"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium">Ordre d'affichage</label>
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <span className="text-sm">Visible sur le site</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending || !form.name.trim()}>
              {saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminZones;
