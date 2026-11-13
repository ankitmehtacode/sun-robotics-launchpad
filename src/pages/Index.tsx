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
        title="Robotics & Software Company in Indore"
        description="Sun Robotics & AI is an Indore company developing a modular robotic arm and a humanoid robot. We also make SunBot Vision AI inspection and build custom software through Sun IT Services."
        keywords="humanoid robot India, robotic arm Indore, robotics company Indore, vision inspection, AI robotics India, IT services Indore"
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
