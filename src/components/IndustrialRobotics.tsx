import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Clock, Wrench } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ultimate Power",
    description: "Industrial-grade performance for the most demanding manufacturing environments.",
    slot: "top-left",
  },
  {
    icon: Clock,
    title: "Maximum Uptime",
    description: "99.9% reliability with predictive maintenance and real-time monitoring.",
    slot: "bottom-left",
  },
  {
    icon: Shield,
    title: "Unmatched Accuracy",
    description: "Sub-millimeter precision in every operation, every time.",
    slot: "top-right",
  },
  {
    icon: Wrench,
    title: "Easy Integration",
    description: "Seamless deployment with existing infrastructure and workflows.",
    slot: "bottom-right",
  },
];

const slotClasses: Record<string, string> = {
  "top-left": "lg:absolute lg:left-0 lg:top-[10%] lg:w-60",
  "bottom-left": "lg:absolute lg:left-0 lg:bottom-[8%] lg:w-60",
  "top-right": "lg:absolute lg:right-0 lg:top-[10%] lg:w-60",
  "bottom-right": "lg:absolute lg:right-0 lg:bottom-[8%] lg:w-60",
};

export const IndustrialRobotics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industrial" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-6"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Industrial Robotics
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Power. Accuracy. <span className="gradient-text">Unmatched Uptime.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineered for maximum productivity in heavy manufacturing — from automotive
            assembly to precision machining.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto lg:aspect-[16/8] lg:mt-8">
          {/* Connector arcs linking each callout to the center — desktop only */}
          <svg
            viewBox="0 0 1000 500"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M 90 90 Q 500 -40 910 90" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="1.5" />
            <path d="M 90 410 Q 500 540 910 410" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeWidth="1.5" />
            <circle cx="90" cy="90" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <circle cx="910" cy="90" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <circle cx="90" cy="410" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
            <circle cx="910" cy="410" r="4" fill="hsl(var(--primary))" fillOpacity="0.7" />
          </svg>

          {/* Center illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center py-10 lg:py-0 lg:absolute lg:inset-0"
          >
            <motion.div
              animate={{ rotate: [0, 4, 0, -4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="origin-bottom relative"
            >
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75" />
              <svg viewBox="0 0 300 300" className="relative w-72 md:w-96 mx-auto" fill="none">
                <rect x="95" y="248" width="110" height="34" rx="6" className="fill-card stroke-primary" strokeWidth="2.5" />
                <rect x="132" y="148" width="36" height="102" rx="6" className="fill-muted stroke-primary/70" strokeWidth="2.5" />
                <circle cx="150" cy="150" r="22" className="fill-card stroke-primary" strokeWidth="2.5" />
                <circle cx="150" cy="150" r="8" className="fill-primary" />
                <rect x="132" y="58" width="36" height="92" rx="6" className="fill-card stroke-primary/70" strokeWidth="2.5" />
                <circle cx="150" cy="60" r="19" className="fill-muted stroke-primary" strokeWidth="2.5" />
                <circle cx="150" cy="60" r="7" className="fill-primary" />
                <path d="M128 33 L150 6 L172 33 L160 33 L150 15 L140 33 Z" className="fill-primary" />
                <circle cx="150" cy="150" r="30" className="fill-primary/25" filter="blur(10px)" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Feature callouts */}
          <div className="grid sm:grid-cols-2 gap-8 mt-12 lg:mt-0 lg:contents">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`flex flex-col gap-3 ${slotClasses[feature.slot]}`}
              >
                <div className="w-11 h-11 rounded-full border border-primary/30 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
