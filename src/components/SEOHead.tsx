import { Helmet } from "react-helmet-async";
import { company } from "@/config/company";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  type?: string;
  jsonLd?: object;
}

const SEOHead = ({ title, description, canonical, keywords, type = "website", jsonLd }: SEOHeadProps) => {
  const fullTitle = `${title} | ${company.name}`;
  const url = canonical ? `${company.seo.baseUrl}${canonical}` : company.seo.baseUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={company.name} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
