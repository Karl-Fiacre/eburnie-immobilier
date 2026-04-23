import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";

type PropertyForm = {
  title: string; property_type: string; listing_type: string; price: string;
  quartier: string; description: string; conditions: string; surface: string;
  chambres: string; salles_de_bain: string; status: string;
};

const emptyForm: PropertyForm = {
  title: "", property_type: "appartement", listing_type: "location", price: "",
  quartier: "", description: "", conditions: "", surface: "", chambres: "", salles_de_bain: "", status: "disponible",
};

const AdminProperties = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyForm>(emptyForm);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const { data: properties, isLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => {
      const { data, error } = await supabase.from("properties_immobilier").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadImages = async (files: File[]) => {
    const urls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("property-images").upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("property-images").getPublicUrl(path);
      urls.push(publicUrl);
    }
    return urls;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) imageUrls = await uploadImages(imageFiles);

      const payload = {
        title: form.title,
        property_type: form.property_type as any,
        listing_type: form.listing_type as any,
        price: Number(form.price),
        quartier: form.quartier,
        description: form.description || null,
        conditions: form.conditions || null,
        surface: form.surface ? Number(form.surface) : null,
        chambres: form.chambres ? Number(form.chambres) : null,
        salles_de_bain: form.salles_de_bain ? Number(form.salles_de_bain) : null,
        status: form.status as any,
        ...(imageUrls.length > 0 ? { images: imageUrls } : {}),
      };

      if (editId) {
        const { error } = await supabase.from("properties_immobilier").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("properties_immobilier").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-properties"] });
      toast({ title: editId ? "Bien modifié" : "Bien ajouté" });
      setDialogOpen(false);
      setForm(emptyForm);
      setEditId(null);
      setImageFiles([]);
    },
    onError: () => toast({ title: "Erreur", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("properties_immobilier").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-properties"] });
      toast({ title: "Bien supprimé" });
    },
  });

  const openEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      title: p.title, property_type: p.property_type, listing_type: p.listing_type,
      price: String(p.price), quartier: p.quartier, description: p.description || "",
      conditions: p.conditions || "", surface: p.surface ? String(p.surface) : "",
      chambres: p.chambres ? String(p.chambres) : "",
      salles_de_bain: p.salles_de_bain ? String(p.salles_de_bain) : "",
      status: p.status,
    });
    setImageFiles([]);
    setDialogOpen(true);
  };

  const openNew = () => { setEditId(null); setForm(emptyForm); setImageFiles([]); setDialogOpen(true); };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Gestion des biens</h1>
        <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Ajouter</Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Quartier</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Chargement...</TableCell></TableRow>
            ) : properties?.length ? properties.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="capitalize">{p.property_type}</TableCell>
                <TableCell>{p.price.toLocaleString("fr-FR")} FCFA</TableCell>
                <TableCell>{p.quartier}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "disponible" ? "default" : "secondary"} className="capitalize">{p.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Aucun bien</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "Modifier le bien" : "Nouveau bien"}</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
            <Input placeholder="Titre *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <div className="grid grid-cols-2 gap-4">
              <Select value={form.listing_type} onValueChange={(v) => setForm({ ...form, listing_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="vente">Vente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.property_type} onValueChange={(v) => setForm({ ...form, property_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="maison">Maison</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                  <SelectItem value="bureau">Bureau</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Prix (FCFA) *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <Input placeholder="Quartier *" value={form.quartier} onChange={(e) => setForm({ ...form, quartier: e.target.value })} required />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Surface m²" type="number" value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })} />
              <Input placeholder="Chambres" type="number" value={form.chambres} onChange={(e) => setForm({ ...form, chambres: e.target.value })} />
              <Input placeholder="SDB" type="number" value={form.salles_de_bain} onChange={(e) => setForm({ ...form, salles_de_bain: e.target.value })} />
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Textarea placeholder="Conditions" value={form.conditions} onChange={(e) => setForm({ ...form, conditions: e.target.value })} />
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="loue">Loué</SelectItem>
                <SelectItem value="vendu">Vendu</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <label className="mb-2 block text-sm font-medium">Photos</label>
              <Input type="file" accept="image/*" multiple onChange={(e) => setImageFiles(Array.from(e.target.files || []))} />
            </div>
            <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProperties;
