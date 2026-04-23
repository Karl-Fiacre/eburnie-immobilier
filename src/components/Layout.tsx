import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import IdentityPreview from "./IdentityPreview";

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
    <IdentityPreview />
  </div>
);

export default Layout;
