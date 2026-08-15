import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const results = [
  {
    name: "Rajesh Kumar",
    role: "CTO",
    company: "AutoTech Industries",
    quote: "Sun Robotics transformed our manufacturing line. The precision and uptime of their industrial robots exceeded all expectations.",
    tag: "Full line integration",
  },
  {
    name: "Priya Sharma",
    role: "Operations Director",
    company: "LogiFlow",
    quote: "Their logistics robots reduced our warehouse processing time by 60%. The AI-powered navigation is incredibly intelligent.",
    tag: "-60% processing time",
  },
  {
    name: "Michael Chen",
    role: "VP Engineering",
    company: "GlobalMfg",
    quote: "The integration was seamless. Their team provided exceptional support, and the ROI was visible within the first quarter.",
    tag: "ROI within Q1",
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Field Results
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            What Changed on the <span className="gradient-text">Floor</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Direct from the operations teams running these systems day to day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={result.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col"
            >
              <span className="font-mono text-xs tracking-wider text-primary uppercase mb-6">
                {result.tag}
              </span>

              <p className="text-foreground text-lg leading-relaxed mb-8 flex-1">
                "{result.quote}"
              </p>

              <div className="pt-6 border-t border-border">
                <div className="font-semibold text-foreground">{result.name}</div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-wide mt-1">
                  {result.role} · {result.company}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
