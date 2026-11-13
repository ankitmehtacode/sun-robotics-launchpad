import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RoboticsRoadmap } from "@/components/RoboticsRoadmap";
import { SEO } from "@/components/SEO";
import { SITE_URL, serviceSchema, breadcrumbSchema } from "@/lib/schema";

const structuredData = [
  serviceSchema({
    name: "Robotics & Vision Inspection",
    description:
      "A modular robotic arm and a humanoid platform in development, and SunBot Vision AI camera-based defect inspection for production lines.",
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
        title="Robotic Arm, Humanoid & Vision Inspection"
        description="Sun Robotics & AI in Indore is developing a modular robotic arm and a humanoid platform, and makes SunBot Vision AI for camera-based defect inspection."
        keywords="industrial robotic arms India, robotic arm manufacturer Indore, multipurpose robotics platform, industrial automation India, robotics company Indore"
        canonical={`${SITE_URL}/robotics`}
        structuredData={structuredData}
      />

      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Robotics
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              What we're building
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Two robots in development and one inspection product. Here's where each one
              stands.
            </p>
          </motion.div>
        </div>
      </section>

      <RoboticsRoadmap />
    </>
  );
};

export default Robotics;
