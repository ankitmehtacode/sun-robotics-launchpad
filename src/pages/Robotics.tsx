import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AIBrain } from "@/components/AIBrain";
import { MultipurposeRobotics } from "@/components/MultipurposeRobotics";
import { SEO } from "@/components/SEO";
import { SITE_URL, serviceSchema, breadcrumbSchema } from "@/lib/schema";

const structuredData = [
  serviceSchema({
    name: "Industrial Robotics & AI Automation",
    description:
      "Heavy-duty industrial robotic arms, AI-driven automation, and intelligent multipurpose robotics platforms engineered for manufacturing, logistics, and quality control.",
    serviceType: "Industrial Automation",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Robotics", path: "/robotics" },
  ]),
];

const Robotics = () => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <>
      <SEO
        title="Industrial Robotics & AI Automation Solutions"
        description="Explore Sun Robotics & AI's industrial robotic arms, AI-driven automation, and multipurpose robotics platforms engineered for manufacturing, logistics, and quality control."
        keywords="industrial robotics, AI automation, robotics solutions India, robotic arms, multipurpose robotics"
        canonical={`${SITE_URL}/robotics`}
        structuredData={structuredData}
      />

      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Robotics Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              Next-Generation <span className="neon-text">Robotics</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From heavy-duty industrial arms to intelligent multipurpose platforms, 
              our robotics solutions are engineered for peak performance and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Brain Section */}
      <AIBrain />

      {/* Multipurpose Robotics Section */}
      <MultipurposeRobotics />
    </>
  );
};

export default Robotics;
