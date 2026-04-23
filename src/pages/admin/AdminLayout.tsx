import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Building, MessageSquare, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem("admin_authenticated") === "true";
    if (!ok) {
      navigate("/admin/login");
      return;
    }
    setReady(true);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_authenticated_at");
    navigate("/admin/login");
  };

  if (!ready) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Chargement...</div>;


  const navItems = [
    { to: "/admin", icon: Building, label: "Biens", exact: true },
    { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r bg-sidebar text-sidebar-foreground">
        <div className="p-4">
          <Link to="/" className="font-display text-lg font-bold text-sidebar-primary">Eburnie Immobilier</Link>
        </div>
        <nav className="mt-4 space-y-1 px-2">
          {navItems.map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"}`}>
                <item.icon className="h-4 w-4" />{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t p-4">
          <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />Déconnexion
          </Button>
          <Button variant="ghost" size="sm" className="mt-1 w-full justify-start text-sidebar-foreground" asChild>
            <Link to="/"><Home className="mr-2 h-4 w-4" />Voir le site</Link>
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-muted p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
