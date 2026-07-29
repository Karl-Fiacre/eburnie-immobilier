import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/config/company";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    const { data, error } = await supabase.rpc("verify_admin_password", {
      _password: password,
    });
    setLoading(false);

    if (error || !data) {
      toast({ title: "Mot de passe incorrect", variant: "destructive" });
      setPassword("");
      return;
    }

    sessionStorage.setItem("admin_authenticated", "true");
    sessionStorage.setItem("admin_authenticated_at", Date.now().toString());
    sessionStorage.setItem("admin_password", password);
    toast({ title: "Bienvenue dans l'espace administrateur" });
    navigate("/admin");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.3),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-white/10 bg-card/95 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
              <ShieldCheck className="h-7 w-7 text-secondary" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold">Espace administrateur</h1>
            <p className="mt-1 text-sm text-muted-foreground">{company.name}</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Saisissez le mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  autoFocus
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full cta-premium"
              disabled={loading}
            >
              {loading ? "Vérification..." : "Accéder au back-office"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Accès réservé aux administrateurs du site.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
