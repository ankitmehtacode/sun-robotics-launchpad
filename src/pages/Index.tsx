import { lazy, Suspense } from "react";
import { FilmHero } from "@/components/FilmHero";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema, websiteSchema } from "@/lib/schema";

// Both sections sit below a 260–340vh pinned hero, so nobody sees them on
// first paint. Splitting them out keeps GSAP/ScrollTrigger and the Spline
// wrapper off the critical path — they download while the hero plays.
const InteractiveArmScene = lazy(() =>
  import("@/components/InteractiveArmScene").then((m) => ({ default: m.InteractiveArmScene })),
);
const ServicesSummary = lazy(() =>
  import("@/components/ServicesSummary").then((m) => ({ default: m.ServicesSummary })),
);

const Index = () => {
  return (
    <>
      <SEO
        title="India's Humanoid & Industrial Robotics Company"
        description="Sun Robotics & AI is building India's next generation of humanoid and industrial robots — precision robotic arms, computer-vision inspection, and enterprise IT solutions, engineered from Indore."
        keywords="humanoid robot India, humanoid robotics company, industrial robotics India, robotic arm manufacturer Indore, AI robotics company India, Make in India robotics, IT solutions Indore"
        canonical={`${SITE_URL}/`}
        structuredData={[organizationSchema(), websiteSchema()]}
      />

      <FilmHero />
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <InteractiveArmScene />
        <ServicesSummary />
      </Suspense>
    </>
  );
};

export default Index;
