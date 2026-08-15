import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Eye, Route, Cog } from "lucide-react";

const capabilities = [
  {
    icon: Truck,
    title: "Autonomous Delivery",
    description: "Self-navigating robots for last-mile delivery and internal logistics.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "Advanced object recognition and scene understanding for complex environments.",
  },
  {
    icon: Route,
    title: "Path Planning",
    description: "Dynamic route optimization with obstacle avoidance and traffic management.",
  },
  {
    icon: Cog,
    title: "Modular Design",
    description: "Interchangeable end-effectors for multi-task adaptability.",
  },
];

export const MultipurposeRobotics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="multipurpose" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Hexagon grid background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
                  <defs>
                    <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                      <polygon
                        points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-primary"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#hexagons)" />
                </svg>
              </div>

              {/* Central robot visualization */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-16 glass-card rounded-3xl flex items-center justify-center"
              >
                <div className="relative">
                  {/* Robot body */}
                  <div className="w-32 h-40 bg-gradient-to-b from-muted to-card rounded-2xl border border-primary/30 relative">
                    {/* Head */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-12 bg-card rounded-xl border border-primary/30">
                      {/* Eyes */}
                      <div className="flex gap-4 justify-center pt-3">
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-3 h-3 rounded-full bg-primary"
                        />
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                          className="w-3 h-3 rounded-full bg-primary"
                        />
                      </div>
                    </div>

                    {/* Chest display */}
                    <div className="mt-8 mx-3 h-16 bg-muted rounded-lg border border-primary/20 flex items-center justify-center">
                      <motion.div
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-3/4 h-2 rounded-full bg-gradient-to-r from-primary via-amber-300 to-primary bg-[length:200%_100%]"
                      />
                    </div>

                    {/* Arms */}
                    <motion.div
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -left-4 top-8 w-4 h-20 bg-muted rounded-full border border-primary/20"
                    />
                    <motion.div
                      animate={{ rotate: [5, -5, 5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -right-4 top-8 w-4 h-20 bg-muted rounded-full border border-primary/20"
                    />
                  </div>

                  {/* Wheels */}
                  <div className="flex justify-center gap-8 -mt-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 rounded-full bg-muted border-2 border-primary/40"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 rounded-full bg-muted border-2 border-primary/40"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating capability badges */}
              {capabilities.map((cap, index) => {
                const positions = [
                  "top-0 left-0",
                  "top-0 right-0",
                  "bottom-0 left-0",
                  "bottom-0 right-0",
                ];
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className={`absolute ${positions[index]} w-12 h-12 glass-card rounded-full flex items-center justify-center`}
                  >
                    <cap.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Versatile Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              One Machine.{" "}
              <span className="gradient-text">Endless Potential.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our multipurpose robotic platform adapts to your needs. Whether it's
              autonomous delivery, visual inspection, or collaborative assembly,
              the same core platform handles it all.
            </p>

            {/* Capability cards */}
            <div className="space-y-4">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {cap.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{cap.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
