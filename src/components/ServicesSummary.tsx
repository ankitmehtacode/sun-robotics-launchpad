import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Code, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Bot,
    number: "01",
    title: "Robotics",
    description: "6-axis industrial arms and autonomous mobile platforms, engineered for continuous duty-cycle operation.",
    spec: "500kg payload · ±0.02mm repeatability",
    href: "/robotics",
  },
  {
    icon: Code,
    number: "02",
    title: "Sun IT Services",
    description: "Custom website development, iOS/Android apps, scalable cloud APIs, and AI business intelligence portals.",
    spec: "Sub-second load · Bank-grade security",
    href: "/sunitservices",
  },
  {
    icon: Package,
    number: "03",
    title: "Products",
    description: "The full SunBot line — from heavy manufacturing arms to vision-guided inspection systems.",
    spec: "4 platforms · built for 24/7 operation",
    href: "/products",
  },
];

export const ServicesSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Three Disciplines. <span className="gradient-text">One Platform.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hardware, software, and the systems that connect them — built and supported by one team.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto border-y border-border">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(service.href)}
              className={`group relative cursor-pointer py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-8 ${
                index !== services.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

              <span className="font-mono text-sm text-muted-foreground/50 md:w-10 shrink-0">
                {service.number}
              </span>

              <div className="md:w-56 shrink-0 flex items-center gap-3">
                <service.icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                <h3 className="text-xl font-display font-semibold text-foreground">{service.title}</h3>
              </div>

              <p className="text-muted-foreground flex-1">{service.description}</p>

              <div className="hidden lg:block font-mono text-xs text-muted-foreground/60 shrink-0 whitespace-nowrap">
                {service.spec}
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
