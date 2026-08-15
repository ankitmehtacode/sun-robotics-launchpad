import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, BarChart3, Cloud, Brain } from "lucide-react";

const solutions = [
  {
    icon: Code,
    title: "Custom Enterprise APIs",
    description: "Scalable backend solutions designed for high-throughput industrial operations.",
    color: "from-primary to-amber-600",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Dashboards",
    description: "Real-time KPI tracking with intelligent anomaly detection and insights.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Cloud,
    title: "Cloud & IoT Integration",
    description: "Edge computing solutions for low-latency robotic control systems.",
    color: "from-orange-500 to-secondary",
  },
  {
    icon: Brain,
    title: "Predictive Maintenance",
    description: "ML-driven anomaly detection that prevents failures before they happen.",
    color: "from-secondary to-primary",
  },
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "AWS", icon: "☁️" },
  { name: "TensorFlow", icon: "🧠" },
];

export const ITSolutions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="it-solutions" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            IT Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Enterprise-Grade IT for{" "}
            <span className="gradient-text">Smart Industries</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Custom APIs, Cloud Robotics, and ML-Driven Dashboards that power the
            factories of tomorrow.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 glow-card group cursor-pointer relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} p-0.5 mb-5`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <solution.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  {solution.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className={`absolute bottom-2 right-2 w-8 h-8 rounded-tl-lg border-l-2 border-t-2 border-primary/20 group-hover:border-primary/40 transition-colors`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 rounded-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              Our Technology Stack
            </h3>
            <p className="text-muted-foreground text-sm">
              Industry-leading tools for enterprise-scale solutions
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-default"
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="text-sm font-medium text-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
