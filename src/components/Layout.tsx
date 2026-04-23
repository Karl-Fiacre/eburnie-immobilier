import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import IdentityPreview from "./IdentityPreview";
import ScrollProgress from "./ScrollProgress";
import CursorGlow from "./CursorGlow";
import PageTransition from "./PageTransition";

const Layout = () => (
  <div className="relative flex min-h-screen flex-col overflow-x-hidden">
    <ScrollProgress />
    <CursorGlow />
    <Navbar />
    <main className="relative flex-1">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
    <Footer />
    <WhatsAppButton />
    <IdentityPreview />
  </div>
);

export default Layout;
