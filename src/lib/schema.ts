// schema.org JSON-LD builders. Values here are drawn from the same real
// business data rendered in ContactInfo.tsx — never invent NAP details,
// ratings, or pricing that can't be backed by something already on the site.

export const SITE_URL = "https://sunroboticsandai.in";

const ORG_ID = `${SITE_URL}/#organization`;
const ORG_NAME = "Sun Robotics & AI";
const ORG_LOGO = `${SITE_URL}/logo.png`;
const ORG_EMAIL = "info@sunroboticsandai.in";
const ORG_PHONE = "+91-8144426440";
const ORG_SAME_AS = ["https://www.linkedin.com/company/sunroboticsandai/"];

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: ORG_NAME,
  alternateName: "Sun Robotics",
  url: SITE_URL,
  logo: ORG_LOGO,
  image: ORG_LOGO,
  email: ORG_EMAIL,
  telephone: ORG_PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Indraprastha Tower, Rau",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Indore" },
    { "@type": "State", name: "Madhya Pradesh" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: ORG_SAME_AS,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: ORG_NAME,
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  serviceType: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  serviceType: service.serviceType,
  provider: { "@id": ORG_ID },
  areaServed: [
    { "@type": "City", name: "Indore" },
    { "@type": "Country", name: "India" },
  ],
});

export const productListSchema = (
  products: { name: string; category: string; description: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      category: product.category,
      description: product.description,
      brand: { "@type": "Brand", name: ORG_NAME },
      url: `${SITE_URL}/products`,
    },
  })),
});
