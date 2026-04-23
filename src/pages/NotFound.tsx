import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page introuvable"
        description="La page que vous recherchez n'existe pas. Retournez à l'accueil de Eburnie Immobilier."
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 font-display text-6xl font-bold text-primary">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oups ! Cette page n'existe pas.</p>
          <a href="/" className="text-secondary underline hover:text-secondary/90">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
