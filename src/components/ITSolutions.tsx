import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, BarChart3, Cloud, Brain, ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import BorderGlow from "@/components/ui/BorderGlow";
import { GradientBlinds } from "@/components/ui/GradientBlinds";

const solutions = [
  {
    icon: Code,
    title: "Custom Enterprise APIs",
    description: "High-throughput backend solutions engineered for asynchronous hardware event ingestion and distributed services.",
    color: "from-primary to-amber-600",
    glowHSL: "32 95 55",
    glowColors: ["#e8930c", "#d4a017", "#f5a623"],
    tag: "STREAM CORE",
  },
  {
    icon: BarChart3,
    title: "AI-Powered Dashboards",
    description: "Real-time industrial telemetry monitoring with machine learning anomaly detection and predictive health analytics.",
    color: "from-amber-500 to-orange-600",
    glowHSL: "30 90 55",
    glowColors: ["#f59e0b", "#ea580c", "#fb923c"],
    tag: "NEURAL TELEMETRY",
  },
  {
    icon: Cloud,
    title: "Cloud & IoT Integration",
    description: "Edge computing gateways for deterministic hardware control loops and centralized fleet telemetry streaming.",
    color: "from-orange-500 to-secondary",
    glowHSL: "20 80 50",
    glowColors: ["#f97316", "#b34a20", "#e86c2c"],
    tag: "FLEET GATEWAY",
  },
  {
    icon: Brain,
    title: "Predictive Maintenance",
    description: "Machine learning diagnostics that detect mechanical micro-deviations early, ensuring uninterrupted production lines.",
    color: "from-secondary to-primary",
    glowHSL: "14 75 42",
    glowColors: ["#b34a20", "#e8930c", "#c05621"],
    tag: "PROACTIVE OPS",
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
    <section id="it-solutions" className="py-24 relative overflow-hidden bg-[#08090d]" ref={ref}>
      {/* Background effect */}
      <div className="absolute inset-0">
        <GradientBlinds
          color1="#F97316"
          color2="#534109"
          colorBackdrop="#08090d"
          angle={40}
          blindCount={20}
          speed={0.4}
          noise={0.06}
          spotlightIntensity={1.0}
          className="opacity-40"
        />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/80 via-transparent to-[#08090d] pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-2 mb-6">
            Enterprise-Grade IT for{" "}
            <span className="gradient-text">Smart Industries</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Custom APIs, Cloud Robotics, and ML-Driven Dashboards that power the
            factories and digital enterprises of tomorrow.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <BorderGlow
                className="group h-full rounded-2xl"
                borderRadius={18}
                glowColor={solution.glowHSL}
                colors={solution.glowColors}
                glowIntensity={0.7}
                fillOpacity={0.4}
              >
                <div className="p-6 h-full flex flex-col justify-between bg-[#0b0d12]/90 backdrop-blur-xl">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.color} p-0.5 shadow-lg`}>
                        <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                          <solution.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/20">
                        {solution.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-primary font-mono font-medium">
                    <span>Explore Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        {/* Action Link to Full Locomotive IT Experience */}
        <div className="text-center mb-16">
          <Link
            to="/it-solutions"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-black font-display font-bold text-sm hover:bg-amber-400 shadow-[0_0_24px_hsl(32,95%,55%,0.35)] transition-all group"
          >
            <span>Launch Locomotive Architecture Deck</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
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

