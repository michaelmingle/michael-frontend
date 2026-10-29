import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/data/siteConfig";

const SITE_URL = "https://michael.ofi-cia.com";

export function Seo({ title, description, image, path = "", type = "website", jsonLd }) {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.role}`;
  const desc = description ?? siteConfig.tagline;
  const url = `${SITE_URL}${path}`;
  const img = image ?? `${SITE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content={`${siteConfig.name} Portfolio`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
