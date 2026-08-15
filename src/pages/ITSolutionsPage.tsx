import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { Code, BarChart3, Cloud, Brain, Server, Database, Shield, Cpu } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import BorderGlow from "@/components/ui/BorderGlow";
import ExplorerShowcase from "@/components/ExplorerShowcase";
import { SEO } from "@/components/SEO";
import { SITE_URL, serviceSchema, breadcrumbSchema } from "@/lib/schema";

const structuredData = [
  serviceSchema({
    name: "Website Development",
    description:
      "Custom website design and development for businesses in Indore and across India, from marketing sites to enterprise web platforms.",
    serviceType: "Website Development",
  }),
  serviceSchema({
    name: "App Development",
    description:
      "Native and web app development covering enterprise dashboards, IoT-connected apps, and customer-facing products.",
    serviceType: "App Development",
  }),
  serviceSchema({
    name: "IT Solutions",
    description:
      "Custom enterprise APIs, cloud & IoT integration, and AI-powered dashboards built for industrial and enterprise operations.",
    serviceType: "IT Consulting",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "IT Solutions", path: "/it-solutions" },
  ]),
];

const solutions = [
  {
    icon: Code,
    title: "Custom Enterprise APIs",
    description: "Scalable backend solutions designed for high-throughput industrial operations. Our APIs handle millions of requests with sub-millisecond latency.",
    features: ["RESTful & GraphQL", "Real-time WebSockets", "Auto-scaling", "99.99% Uptime SLA"],
    color: "from-primary to-amber-600",
    glowHSL: "32 95 55",
    glowColors: ["#e8930c", "#d4a017", "#f5a623"],
  },
  {
    icon: BarChart3,
    title: "AI-Powered Dashboards",
    description: "Real-time KPI tracking with intelligent anomaly detection and predictive insights. Visualize your entire operation in one place.",
    features: ["Live Data Streaming", "Custom Widgets", "Role-based Access", "Export & Reports"],
    color: "from-amber-500 to-orange-600",
    glowHSL: "30 90 55",
    glowColors: ["#f59e0b", "#ea580c", "#fb923c"],
  },
  {
    icon: Cloud,
    title: "Cloud & IoT Integration",
    description: "Edge computing solutions for low-latency robotic control systems. Connect your entire fleet to the cloud seamlessly.",
    features: ["Multi-cloud Support", "Edge Processing", "Device Management", "OTA Updates"],
    color: "from-orange-500 to-secondary",
    glowHSL: "20 80 50",
    glowColors: ["#f97316", "#b34a20", "#e86c2c"],
  },
  {
    icon: Brain,
    title: "Predictive Maintenance",
    description: "ML-driven anomaly detection that prevents failures before they happen. Reduce downtime and maintenance costs by up to 70%.",
    features: ["Failure Prediction", "Maintenance Scheduling", "Parts Inventory", "Cost Optimization"],
    color: "from-secondary to-primary",
    glowHSL: "14 75 42",
    glowColors: ["#b34a20", "#e8930c", "#c05621"],
  },
];

const techStack = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Python", icon: "🐍", category: "AI/ML" },
  { name: "Docker", icon: "🐳", category: "DevOps" },
  { name: "Kubernetes", icon: "☸️", category: "Orchestration" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "TensorFlow", icon: "🧠", category: "AI/ML" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
];

const additionalServices = [
  {
    icon: Server,
    title: "Infrastructure Management",
    description: "Complete infrastructure setup and management for your robotics operations.",
  },
  {
    icon: Database,
    title: "Data Warehousing",
    description: "Centralized data storage with analytics-ready architecture.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with industry compliance certifications.",
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    description: "Process data at the edge for real-time robotic decision making.",
  },
];

const ITSolutionsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const solutionsRef = useRef(null);
  const techRef = useRef(null);
  const additionalRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isSolutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });
  const isTechInView = useInView(techRef, { once: true, margin: "-100px" });
  const isAdditionalInView = useInView(additionalRef, { once: true, margin: "-100px" });

  // Locomotive Scroll's `data-scroll-speed` mechanic: on every Lenis scroll
  // tick, drift each marked element by its own speed factor so the decorative
  // layers read at different depths instead of moving 1:1 with the page.
  useLenis(() => {
    const container = pageRef.current;
    if (!container) return;
    const viewportCenter = window.innerHeight / 2;
    container.querySelectorAll<HTMLElement>("[data-scroll-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed ?? "0");
      const distance = el.getBoundingClientRect().top + el.offsetHeight / 2 - viewportCenter;
      el.style.transform = `translate3d(0, ${(distance * speed).toFixed(2)}px, 0)`;
    });
  });

  return (
    <ReactLenis root>
    <div ref={pageRef}>
      <SEO
        title="IT Solutions in Indore — Website & App Development"
        description="Custom website development, app development, and enterprise IT solutions from Sun Robotics & AI in Indore — APIs, cloud integration, and AI-powered dashboards built for growing businesses."
        keywords="IT solutions Indore, website development Indore, app development Indore, custom software development, enterprise IT solutions"
        canonical={`${SITE_URL}/it-solutions`}
        structuredData={structuredData}
      />

      {/* Page Header — revealed on scroll */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          aria-hidden
          data-scroll-speed="-0.2"
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow"
        />
        <div
          aria-hidden
          data-scroll-speed="0.15"
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              IT Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal tracking-[-0.03em] leading-tight mt-4 mb-6">
              Enterprise-Grade IT for <span className="gradient-text">Smart Industries</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto tracking-[-0.01em]">
              Custom APIs, Cloud Robotics, and ML-Driven Dashboards that power the factories of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Solutions Grid */}
      <section className="py-24 relative overflow-hidden" ref={solutionsRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isSolutionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BorderGlow
                  className="group relative"
                  borderRadius={16}
                  glowColor={solution.glowHSL}
                  colors={solution.glowColors}
                  glowIntensity={0.8}
                  fillOpacity={0.4}
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.color} p-0.5 mb-6`}>
                      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                        <solution.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display font-medium tracking-[-0.03em] text-foreground mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed tracking-[-0.01em]">
                      {solution.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {solution.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ExplorerShowcase />

      {/* Tech Stack */}
      <section className="py-24 relative overflow-hidden" ref={techRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div
          aria-hidden
          data-scroll-speed="-0.1"
          className="absolute top-8 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[110px]"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-normal tracking-[-0.03em] leading-none mb-4">
              Our <span className="gradient-text">Technology Stack</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto tracking-[-0.01em]">
              Industry-leading tools and frameworks for enterprise-scale solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTechInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isTechInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-default"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                  <span className="text-xs text-muted-foreground">{tech.category}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 relative overflow-hidden" ref={additionalRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAdditionalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-normal tracking-[-0.03em] leading-none mb-4">
              Additional <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto tracking-[-0.01em]">
              Comprehensive IT services to support your automation journey.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isAdditionalInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BorderGlow
                  className="group h-full"
                  borderRadius={16}
                  glowColor="32 95 55"
                  colors={['#e8930c', '#d35400', '#f39c12']}
                  glowIntensity={0.7}
                  fillOpacity={0.3}
                >
                  <div className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-medium tracking-[-0.03em] text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground tracking-[-0.01em]">
                      {service.description}
                    </p>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </div>
    </ReactLenis>
  );
};

export default ITSolutionsPage;
