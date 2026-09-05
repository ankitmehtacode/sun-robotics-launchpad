import { FilmHero } from "@/components/FilmHero";
import { InteractiveArmScene } from "@/components/InteractiveArmScene";
import { ServicesSummary } from "@/components/ServicesSummary";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema, websiteSchema } from "@/lib/schema";

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
      <InteractiveArmScene />

      <ServicesSummary />
    </>
  );
};

export default Index;
