import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/schema";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  /** One or more schema.org JSON-LD objects to embed as <script type="application/ld+json"> tags. */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const defaultTitle = "Sun Robotics & AI";
const defaultDescription =
  "Building the future of industrial automation with cutting-edge AI and robotics solutions for enterprises worldwide.";

export const SEO = ({
  title,
  description = defaultDescription,
  keywords,
  canonical,
  ogImage = "/logo.png",
  noIndex = false,
  structuredData,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="en_IN" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={absoluteOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* No Index */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
