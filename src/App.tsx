import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NosBiens from "./pages/NosBiens";
import PropertyDetail from "./pages/PropertyDetail";
import ConfierBien from "./pages/ConfierBien";
import APropos from "./pages/APropos";
import ConstructionBTP from "./pages/ConstructionBTP";
import Devis from "./pages/Devis";
import Contact from "./pages/Contact";
import ZonesDesservies from "./pages/ZonesDesservies";
import MentionsLegales from "./pages/MentionsLegales";
import CGU from "./pages/CGU";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminZones from "./pages/admin/AdminZones";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/construction-btp" element={<ConstructionBTP />} />
            <Route path="/biens" element={<NosBiens />} />
            <Route path="/biens/:id" element={<PropertyDetail />} />
            <Route path="/confier-bien" element={<ConfierBien />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/zones-desservies" element={<ZonesDesservies />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProperties />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="zones" element={<AdminZones />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
