import { FilmHero } from "@/components/FilmHero";
import { InteractiveArmScene } from "@/components/InteractiveArmScene";
import { ServicesSummary } from "@/components/ServicesSummary";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema, websiteSchema } from "@/lib/schema";

const Index = () => {
  return (
    <>
      <SEO
        title="AI & Robotics Company in Indore, India"
        description="Sun Robotics & AI builds industrial robotics, AI automation, and enterprise IT solutions — including website and app development — for businesses in Indore and across India."
        keywords="AI and robotics, robotics company Indore, AI company India, industrial automation, IT solutions Indore, website development, app development"
        canonical={`${SITE_URL}/`}
        structuredData={[organizationSchema(), websiteSchema()]}
      />

      <FilmHero />
      <InteractiveArmScene />

      <ServicesSummary />
      <Testimonials />
      <CTABanner />
    </>
  );
};

export default Index;
