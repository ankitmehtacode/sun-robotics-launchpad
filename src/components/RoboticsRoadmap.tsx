import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Only list what exists. Add specs here when they are measured on real hardware,
// not before.
const projects = [
  {
    name: "Modular robotic arm",
    status: "In development",
    description:
      "A robotic arm built from interchangeable modules. We will share details when it is revealed.",
    href: "/",
    linkLabel: "Sign up on the homepage to be notified",
  },
  {
    name: "Humanoid platform",
    status: "In development",
    description:
      "A full-body humanoid robot. The 3D model on our homepage shows the current design.",
    href: "/",
    linkLabel: "See the 3D model",
  },
  {
    name: "SunBot Vision AI",
    status: "Product",
    description:
      "Camera-based inspection that checks parts on a production line and flags defects for a person to review.",
    href: "/products",
    linkLabel: "Product details",
  },
];

export const RoboticsRoadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="divide-y divide-border border-y border-border">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10"
            >
              <div className="md:col-span-4">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                  {project.name}
                </h2>
                <span className="mt-2 inline-block font-mono text-xs uppercase tracking-wider text-primary">
                  {project.status}
                </span>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
                <Link
                  to={project.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {project.linkLabel}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-muted-foreground">
          Working on automation in your plant?{" "}
          <Link to="/contact" className="text-foreground underline underline-offset-4 hover:text-primary">
            Tell us about the job
          </Link>
          .
        </p>
      </div>
    </section>
  );
};
