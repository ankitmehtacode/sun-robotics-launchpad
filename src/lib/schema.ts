// schema.org JSON-LD builders for search dominance, local SEO authority in Indore, and entity mapping.

export const SITE_URL = "https://sunroboticsandai.in";

export const ORG_ID = `${SITE_URL}/#organization`;
export const ORG_NAME = "Sun Robotics & AI";
export const ORG_LOGO = `${SITE_URL}/logo.png`;
export const ORG_EMAIL = "info@sunroboticsandai.in";
export const ORG_PHONE = "+91-8144426440";
export const ORG_SAME_AS = [
  "https://www.linkedin.com/company/sunroboticsandai/",
  "https://twitter.com/SunRoboticsAI",
  "https://github.com/sunrobotics",
];

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness", "Corporation"],
  "@id": ORG_ID,
  name: ORG_NAME,
  alternateName: ["Sun Robotics", "Sun Robotics Indore", "Sun Robotics & AI Labs"],
  url: SITE_URL,
  logo: ORG_LOGO,
  image: ORG_LOGO,
  email: ORG_EMAIL,
  telephone: ORG_PHONE,
  priceRange: "$$",
  currenciesAccepted: "INR, USD, EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Indraprastha Tower, Rau",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "453331",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.7196,
    longitude: 75.8577,
  },
  hasMap: "https://maps.google.com/?q=Sun+Robotics+and+AI+Indore",
  areaServed: [
    { "@type": "City", name: "Indore" },
    { "@type": "City", name: "Bhopal" },
    { "@type": "City", name: "Ujjain" },
    { "@type": "City", name: "Dewas" },
    { "@type": "City", name: "Pithampur" },
    { "@type": "State", name: "Madhya Pradesh" },
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "Website Development",
    "Web Application Development",
    "Mobile App Development",
    "Custom Software Development in Indore",
    "UI/UX Design & Frontend Engineering",
    "AI Dashboards & Machine Learning",
    "Industrial Robotics & Automation",
    "IoT & Hardware Telemetry",
    "Cloud Architecture & AWS Services",
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
  inLanguage: "en-IN",
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
    { "@type": "State", name: "Madhya Pradesh" },
    { "@type": "Country", name: "India" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${service.name} Solutions`,
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      },
    ],
  },
});

export const clientProjectSchema = (projects: {
  name: string;
  category: string;
  description: string;
  url: string;
  clientLocation?: string;
}[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Client Software & Web Solutions Engineered by Sun Robotics & AI",
  itemListElement: projects.map((proj, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "CreativeWork",
      name: proj.name,
      genre: proj.category,
      description: proj.description,
      url: proj.url,
      creator: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: ORG_NAME,
        url: SITE_URL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
      },
      maintainer: {
        "@id": ORG_ID,
      },
    },
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
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
