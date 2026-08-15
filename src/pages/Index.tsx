import { FilmHero } from "@/components/FilmHero";
import { InteractiveArmScene } from "@/components/InteractiveArmScene";
import { ServicesSummary } from "@/components/ServicesSummary";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";

const Index = () => {
  return (
    <>
      <FilmHero />
      <InteractiveArmScene />

      <ServicesSummary />
      <Testimonials />
      <CTABanner />
    </>
  );
};

export default Index;
