import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ArrowDown, ExternalLink } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import BorderGlow from "@/components/ui/BorderGlow";
import ExplorerShowcase from "@/components/ExplorerShowcase";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema, serviceSchema, clientProjectSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { portfolioProjects } from "@/components/ExplorerShowcase";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { LocomotiveHUD } from "@/components/it-solutions/LocomotiveHUD";
import { StackedSolutionsDeck } from "@/components/it-solutions/StackedSolutionsDeck";
import { KineticMarqueeStream } from "@/components/it-solutions/KineticMarqueeStream";
import { InteractiveArchitectureConsole } from "@/components/it-solutions/InteractiveArchitectureConsole";
import { GradientBlinds } from "@/components/ui/GradientBlinds";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

const structuredData = [
  organizationSchema(),
  serviceSchema({
    name: "Website Development in Indore",
    description:
      "High-speed custom website design and development for businesses in Indore, Madhya Pradesh, and across India, from corporate platforms to responsive e-commerce stores.",
    serviceType: "Website Development",
  }),
  serviceSchema({
    name: "Mobile App Development in Indore",
    description:
      "Native iOS and Android mobile app development, hybrid web apps, and enterprise management dashboards built in Indore.",
    serviceType: "Mobile Application Development",
  }),
  serviceSchema({
    name: "Custom Software & IT Solutions in Indore",
    description:
      "End-to-end custom software development, secure cloud infrastructure, high-throughput APIs, and smart AI dashboards engineered by Sun Robotics & AI in Indore.",
    serviceType: "Custom Software Development",
  }),
  clientProjectSchema(portfolioProjects),
  faqSchema([
    {
      question: "Which is the best website development company in Indore?",
      answer:
        "Sun Robotics & AI is a leading website and software development company based in Indore, Madhya Pradesh, specializing in high-speed web apps, React/Next.js platforms, mobile apps, and custom enterprise software.",
    },
    {
      question: "What software and web development services does Sun Robotics & AI provide in Indore?",
      answer:
        "Sun Robotics & AI provides custom website development, mobile application development (iOS & Android), smart AI dashboards, cloud hosting infrastructure, IoT device synchronization, and enterprise API engineering.",
    },
    {
      question: "Can Sun Robotics & AI develop custom mobile apps and web platforms for my business in Indore?",
      answer:
        "Yes, Sun Robotics & AI engineers custom, end-to-end web and mobile applications tailored to your specific business requirements with 24/7 reliability, bank-grade encryption, and seamless scaling.",
    },
  ]),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "IT Solutions", path: "/it-solutions" },
  ]),
];

const techStack = [
  { code: "SYS-01", name: "React & Next.js", domain: "Web Apps", desc: "Fast, modern websites and interactive web applications." },
  { code: "SYS-02", name: "Node.js & Python", domain: "Backend", desc: "Secure backends and high-speed data processing engines." },
  { code: "SYS-03", name: "iOS & Android", domain: "Mobile", desc: "Smooth, responsive mobile applications for all devices." },
  { code: "SYS-04", name: "AI & Machine Learning", domain: "AI Core", desc: "Smart data analytics, predictions, and automated insights." },
  { code: "SYS-05", name: "AWS & Google Cloud", domain: "Cloud", desc: "Reliable cloud hosting that keeps your services running 24/7." },
  { code: "SYS-06", name: "PostgreSQL & Redis", domain: "Databases", desc: "Secure, high-speed data storage with automated daily backups." },
  { code: "SYS-07", name: "Docker & Kubernetes", domain: "DevOps", desc: "Automated scaling to handle sudden traffic spikes smoothly." },
  { code: "SYS-08", name: "IoT & Hardware Sync", domain: "IoT", desc: "Connecting physical sensors and machinery to cloud dashboards." },
];

const categories = ["ALL", "Web Apps", "Backend", "Mobile", "AI Core", "Cloud", "Databases", "IoT"];

const engineeringServices = [
  {
    serial: "SRV-01",
    title: "Cloud Hosting & Management",
    category: "CLOUD // HOSTING",
    description:
      "Complete server setup, round-the-clock monitoring, automated backups, and instant scaling to keep your business running smoothly.",
    specs: ["24/7 Uptime Monitoring", "Automated Daily Backups", "Zero Setup Hassle"],
  },
  {
    serial: "SRV-02",
    title: "Database Design & Storage",
    category: "DATA // STORAGE",
    description:
      "Fast, organized, and secure data storage built to handle customer records, transactions, and live business analytics.",
    specs: ["Fast Search Queries", "Bank-Level Security", "Automated Archiving"],
  },
  {
    serial: "SRV-03",
    title: "Security & Data Protection",
    category: "SECURITY // PRIVACY",
    description:
      "Complete data encryption, vulnerability assessments, and strict access controls to keep your customer data 100% safe.",
    specs: ["End-to-End Encryption", "Access Control Rules", "Security Audited"],
  },
  {
    serial: "SRV-04",
    title: "Connected Devices & IoT",
    category: "DEVICES // HARDWARE",
    description:
      "Connect physical machines, smart devices, and sensors directly to clean mobile apps and management dashboards.",
    specs: ["Real-Time Sync", "Remote Device Controls", "Live Notifications"],
  },
];

const ITSolutionsPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const techRef = useRef(null);
  const additionalRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("ALL");

  const isHeaderInView = useInView(headerRef, { once: true });
  const isTechInView = useInView(techRef, { once: true, margin: "-100px" });
  const isAdditionalInView = useInView(additionalRef, { once: true, margin: "-100px" });

  const {
    velocity,
    speed,
    direction,
    progress,
    skew,
    activeNode,
    nodeIndex,
    scrollToSection,
  } = useLocomotiveScroll();

  const filteredTech =
    activeCategory === "ALL"
      ? techStack
      : techStack.filter((t) => t.domain === activeCategory);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}>
      <div ref={pageRef} className="bg-[#050608] text-foreground selection:bg-primary selection:text-black">
        <SEO
          title="Best Website & App Development Company in Indore | Custom IT Solutions"
          description="Sun Robotics & AI is Indore's top website and mobile app development company. We build high-speed web apps, AI dashboards, custom APIs, and secure cloud software for growing businesses."
          keywords="website development indore, best website company indore, app development company in indore, mobile app developers indore, custom software development indore, IT company in indore, web design indore, AI dashboards indore, react nextjs developers indore"
          canonical={`${SITE_URL}/it-solutions`}
          structuredData={structuredData}
        />

        {/* Floating Locomotive Telemetry Indicator */}
        <LocomotiveHUD
          velocity={velocity}
          speed={speed}
          progress={progress}
          skew={skew}
          activeNode={activeNode}
          nodeIndex={nodeIndex}
          direction={direction}
          onJumpToNode={scrollToSection}
        />

        {/* SECTION 1: HERO */}
        <section
          id="node-hero"
          ref={headerRef}
          className="pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden min-h-[100dvh] flex items-center justify-center"
        >
          {/* Gradient Blinds Dynamic Background */}
          <GradientBlinds
            color1="#F97316"
            color2="#534109"
            colorBackdrop="#050608"
            angle={35}
            blindCount={18}
            speed={0.6}
            noise={0.08}
            spotlightIntensity={1.25}
            interactive={true}
            className="opacity-75"
          />

          {/* Radial & Linear Contrast Masks to maintain razor-sharp text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/50 via-transparent to-[#050608] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050608_95%)] pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

          {/* Parallax Floating Depth Orbs */}
          <div
            aria-hidden
            data-scroll-speed="-0.3"
            className="absolute top-1/4 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-primary/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Kinetic Typography */}
            <div
              className="locomotive-skew text-center max-w-4xl mx-auto"
              style={{
                transform: `skewY(${skew * 0.35}deg)`,
              }}
            >
              <MaskedHeading
                heading={["Custom Software", "Built for Growth."]}
                subhead="We build high-speed websites, mobile apps, custom APIs, and smart AI dashboards that help your business scale effortlessly."
                as="h1"
                className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-display font-semibold tracking-[-0.035em] text-white"
                subheadClassName="text-sm sm:text-base md:text-lg text-white/65 font-normal tracking-[-0.01em] mb-6 sm:mb-8 max-w-xl mx-auto px-2 sm:px-0"
                delay={0.15}
                stagger={0.12}
                duration={0.8}
                interactive={true}
              />

              {/* Action Buttons (Mobile-first responsive layout) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2 w-full max-w-sm sm:max-w-none mx-auto"
              >
                <button
                  onClick={() => scrollToSection("node-pillars")}
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-primary text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-amber-400 shadow-[0_0_30px_hsl(32,95%,55%,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore What We Build</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <a
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-white/[0.03] border border-white/15 hover:border-primary/50 text-white font-display font-medium text-xs uppercase tracking-wider backdrop-blur-md hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2"
                >
                  <span>Start a Project</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: STACKED SOLUTIONS DECK */}
        <StackedSolutionsDeck />

        {/* KINETIC MARQUEE STREAM */}
        <KineticMarqueeStream velocity={velocity} />

        {/* SECTION 3: SHOWCASE RAIL */}
        <ExplorerShowcase />

        {/* SECTION 4: ARCHITECTURAL COMPARISON */}
        <InteractiveArchitectureConsole />

        {/* SECTION 5: TECH MATRIX (Editorial List) */}
        <section id="node-tech" className="py-28 relative overflow-hidden" ref={techRef}>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
                <span>[ 05 ] MODERN TOOLBOX</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
                Technologies We Use
              </h2>
              <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
                Industry-standard tools and frameworks chosen for speed, reliability, and security.
              </p>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-black font-bold shadow-[0_0_12px_hsl(32,95%,55%,0.5)]"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Sleek Editorial Rows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="divide-y divide-white/10 border-y border-white/10"
            >
              {filteredTech.map((tech) => (
                <div
                  key={tech.code}
                  className="py-5 px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <span className="text-[11px] font-mono text-primary font-bold w-16 shrink-0">
                      {tech.code}
                    </span>
                    <div>
                      <h3 className="text-lg font-display font-semibold text-white group-hover:text-primary transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-xs text-white/50 mt-0.5">
                        {tech.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-white/5 text-white/60">
                      {tech.domain}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      READY
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: SERVICES (Editorial Roster) */}
        <section id="node-services" className="py-28 relative overflow-hidden bg-[#06070a]" ref={additionalRef}>
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isAdditionalInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
                <span>[ 06 ] INFRASTRUCTURE & SUPPORT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
                Complete IT Services
              </h2>
              <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
                End-to-end technical support to keep your software fast, secure, and always operational.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {engineeringServices.map((service, index) => (
                <motion.div
                  key={service.serial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAdditionalInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex flex-col justify-between p-6 border-l border-white/15 hover:border-primary/60 transition-colors"
                >
                  <div>
                    <div className="text-[10px] font-mono text-primary font-bold mb-2">
                      {service.serial} · {service.category}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-white/10 text-[10px] font-mono text-white/70">
                    {service.specs.map((sp) => (
                      <div key={sp} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <CTABanner />
      </div>
    </ReactLenis>
  );
};

export default ITSolutionsPage;
