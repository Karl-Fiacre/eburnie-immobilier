import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const typeLabels: Record<string, string> = {
  visite: "Demande de visite",
  confier_bien: "Confier un bien",
  contact: "Contact",
};

const AdminMessages = () => {
  const qc = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*, properties(title)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold">Messages reçus</h1>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Bien</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Lu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">Chargement...</TableCell></TableRow>
            ) : messages?.length ? messages.map((m) => (
              <TableRow key={m.id} className={m.is_read ? "opacity-60" : ""}>
                <TableCell><Badge variant="outline">{typeLabels[m.message_type] || m.message_type}</Badge></TableCell>
                <TableCell className="font-medium">{m.nom}</TableCell>
                <TableCell>{m.telephone}</TableCell>
                <TableCell className="max-w-xs truncate">{m.message || m.localisation || "—"}</TableCell>
                <TableCell>{(m.properties as any)?.title || "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(m.created_at).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>
                  {m.is_read ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => markRead.mutate(m.id)}>Marquer lu</Button>
                  )}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">Aucun message</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminMessages;
