import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { Link } from "react-router-dom";
import { ArrowDown, ExternalLink, Smartphone, Server, Database, Cloud, Sparkles, Layers, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import ExplorerShowcase from "@/components/ExplorerShowcase";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema, itServicesSchema, serviceSchema, clientProjectSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { portfolioProjects } from "@/components/ExplorerShowcase";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { LocomotiveHUD } from "@/components/it-solutions/LocomotiveHUD";
import { StackedSolutionsDeck } from "@/components/it-solutions/StackedSolutionsDeck";
import { KineticMarqueeStream } from "@/components/it-solutions/KineticMarqueeStream";
import { InteractiveArchitectureConsole } from "@/components/it-solutions/InteractiveArchitectureConsole";
import { GradientBlinds } from "@/components/ui/GradientBlinds";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const itFaqs = [
  {
    id: "faq-1",
    question: "What is Sun IT Services and how does it connect with Sun Robotics?",
    answer:
      "Sun IT Services is the specialized software engineering and digital technology division of Sun Robotics & AI, headquartered in Indore, India. While our robotics wing develops advanced hardware automation and industrial platforms, Sun IT Services engineers custom web applications, native & cross-platform mobile apps, cloud backends, and AI analytics portals for businesses worldwide.",
  },
  {
    id: "faq-2",
    question: "What custom website development services does Sun IT Services offer in Indore?",
    answer:
      "We build high-performance, responsive custom websites ranging from SaaS portals and enterprise corporate platforms to high-converting eCommerce stores. We specialize in modern frameworks like React 19, Next.js 15, TypeScript, and Tailwind CSS with sub-second page load times, bank-grade security, and top-tier SEO architecture.",
  },
  {
    id: "faq-3",
    question: "Can Sun IT Services build custom iOS and Android mobile apps?",
    answer:
      "Yes. We engineer production-ready mobile applications using React Native and Flutter for universal iOS and Android deployment, as well as native Swift and Kotlin for hardware-intensive applications. Every mobile app features offline caching, real-time cloud sync, push notifications, and biometric authentication.",
  },
  {
    id: "faq-4",
    question: "Do you provide custom ERP, CRM, and API integration for existing businesses?",
    answer:
      "Absolutely. We develop bespoke enterprise resource planning (ERP) systems, customer management (CRM) portals, automated billing systems, and high-throughput REST / GraphQL / gRPC APIs that seamlessly integrate with your existing databases, third-party services (payment gateways, WhatsApp API, logistics), and internal workflows.",
  },
  {
    id: "faq-5",
    question: "How does Sun IT Services incorporate AI and Machine Learning into software?",
    answer:
      "We integrate custom AI automation pipelines, intelligent LLM assistants, natural language processing tools, predictive analytics dashboards, and real-time computer vision models tailored to automate repetitive tasks, elevate customer support, and extract actionable intelligence from your business data.",
  },
  {
    id: "faq-6",
    question: "What is your software development process and typical timeline?",
    answer:
      "We follow an agile sprint-based engineering workflow: Discovery & Architecture Planning → UI/UX Prototyping in Figma → Full-Stack Engineering → Automated QA & Security Audits → Deployment & Post-Launch Support. Timelines range from 2–4 weeks for fast-launch web applications to 8–12 weeks for complex multi-platform enterprise ecosystems.",
  },
  {
    id: "faq-7",
    question: "Do you offer ongoing cloud hosting, server management, and 24/7 technical support?",
    answer:
      "Yes. Sun IT Services provides complete DevOps, AWS/GCP cloud infrastructure management, 24/7 uptime monitoring, automated daily database backups, security patches, and continuous feature updates to keep your software fast, secure, and scalable.",
  },
  {
    id: "faq-8",
    question: "Where is Sun IT Services located, and how can we start a project?",
    answer:
      "Sun IT Services is located at Indraprastha Tower, Rau, Indore, Madhya Pradesh, India (453331). You can start a project by clicking 'Start a Project', filling out our contact form, or reaching out via WhatsApp to schedule a free technical discovery call with our engineering team.",
  },
];

const structuredData = [
  organizationSchema(),
  itServicesSchema(),
  serviceSchema({
    name: "Sun IT Services - Website Development in Indore",
    description:
      "High-speed custom website design and development for businesses in Indore, Madhya Pradesh, and across India, from corporate platforms to responsive e-commerce stores.",
    serviceType: "Website Development",
    provider: "Sun IT Services",
    areaServed: "Indore, Madhya Pradesh, India",
    url: `${SITE_URL}/sunitservices`,
  }),
  serviceSchema({
    name: "Sun IT Services - App Development in Indore",
    description:
      "Native iOS and Android mobile app development with high performance, offline support, and seamless cloud integration.",
    serviceType: "Mobile App Development",
    provider: "Sun IT Services",
    areaServed: "Indore, Madhya Pradesh, India",
    url: `${SITE_URL}/sunitservices`,
  }),
  serviceSchema({
    name: "Sun IT Services - Custom Software & AI Solutions in Indore",
    description:
      "Custom enterprise software, API integrations, real-time IoT dashboards, and AI automation built to streamline your operations.",
    serviceType: "Software Development",
    provider: "Sun IT Services",
    areaServed: "Indore, Madhya Pradesh, India",
    url: `${SITE_URL}/sunitservices`,
  }),
  clientProjectSchema(portfolioProjects),
  faqSchema(itFaqs),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Sun IT Services", path: "/sunitservices" },
  ]),
];

const modernTechPillars = [
  {
    serial: "01",
    category: "FRONTEND & MOBILE",
    title: "Client & Mobile Platforms",
    desc: "Sub-second SSR, native mobile runtimes, and silky 120 FPS component architecture.",
    metric: "< 12ms TTFB",
    icon: Smartphone,
    tools: [
      { name: "Next.js 15", tag: "App Router / SSR" },
      { name: "React 19", tag: "Concurrent UI" },
      { name: "TypeScript", tag: "Strict Types" },
      { name: "React Native", tag: "iOS & Android" },
      { name: "Tailwind CSS", tag: "Design Tokens" },
    ],
  },
  {
    serial: "02",
    category: "BACKEND & CORE",
    title: "High-Throughput Services",
    desc: "Non-blocking event loops, type-safe API contracts, and low-latency microservices.",
    metric: "45,000 req/s",
    icon: Server,
    tools: [
      { name: "Node.js & Bun", tag: "Async Runtimes" },
      { name: "Python / FastAPI", tag: "AI Inference" },
      { name: "GraphQL & REST", tag: "Strict Schema" },
      { name: "gRPC", tag: "Protobuf RPC" },
    ],
  },
  {
    serial: "03",
    category: "DATA & PERSISTENCE",
    title: "Relational & Real-Time Storage",
    desc: "ACID-compliant storage, sub-millisecond in-memory caching, and vector search embeddings.",
    metric: "Sub-ms Cache",
    icon: Database,
    tools: [
      { name: "PostgreSQL", tag: "Relational Core" },
      { name: "Redis", tag: "In-Memory Cache" },
      { name: "Vector DBs", tag: "AI Embeddings" },
      { name: "Prisma & Drizzle", tag: "Type-Safe ORM" },
    ],
  },
  {
    serial: "04",
    category: "CLOUD & EDGE",
    title: "Cloud Security & IoT Telemetry",
    desc: "Multi-region serverless deployment, automated Docker orchestration, and deterministic IoT control.",
    metric: "99.99% Uptime",
    icon: Cloud,
    tools: [
      { name: "AWS & GCP", tag: "Multi-AZ Cloud" },
      { name: "Cloudflare", tag: "Global CDN Edge" },
      { name: "Docker", tag: "Micro-Containers" },
      { name: "MQTT & WebSockets", tag: "Hardware Sync" },
    ],
  },
];

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

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}>
      <div ref={pageRef} className="bg-[#050608] text-foreground selection:bg-primary selection:text-black">
        <SEO
          title="Sun IT Services | Best Website & App Development Company in Indore"
          description="Sun IT Services by Sun Robotics & AI is Indore's leading IT company for custom website development, iOS & Android mobile apps, AI dashboards, and enterprise cloud software."
          keywords="Sun IT Services, Sun IT Services Indore, sun it services, best website development company in indore, best IT company in indore, app development company indore, mobile app developers indore, custom software development indore, web design indore, React Next.js developers indore, Sun Robotics IT services"
          canonical={`${SITE_URL}/sunitservices`}
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

        {/* SECTION 5: MODERN TOOLBOX & TECH ECOSYSTEM */}
        <section id="node-tech" className="py-24 sm:py-32 relative overflow-hidden" ref={techRef}>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
                <span>[ 05 ] MODERN TOOLBOX</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
                Modern Tech Ecosystem
              </h2>
              <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto font-sans">
                Curated, industry-standard frameworks and distributed cloud tools chosen for deterministic speed and security.
              </p>
            </motion.div>

            {/* 2x2 Bento Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {modernTechPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <BorderGlow
                    key={pillar.serial}
                    className="rounded-2xl overflow-hidden shadow-xl"
                    borderRadius={16}
                    glowColor="32 95 55"
                    colors={["#f59e0b", "#ea580c", "#d97706"]}
                    glowIntensity={0.5}
                    fillOpacity={0.4}
                  >
                    <div className="p-5 sm:p-7 bg-[#080a0f]/90 backdrop-blur-xl h-full flex flex-col justify-between relative group hover:bg-[#0a0d14] transition-colors">
                      {/* Top Row: Category + Metric badge */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-mono text-primary font-bold uppercase tracking-wider">
                              // {pillar.category}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[9px] sm:text-[10px] font-mono text-emerald-400 font-semibold">
                            {pillar.metric}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2 tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/65 font-sans leading-relaxed mb-6">
                          {pillar.desc}
                        </p>
                      </div>

                      {/* Tool Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {pillar.tools.map((tool) => (
                          <div
                            key={tool.name}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/8 hover:border-primary/40 hover:bg-white/[0.06] transition-all flex items-center gap-1.5"
                          >
                            <span className="text-xs font-sans font-medium text-white">
                              {tool.name}
                            </span>
                            <span className="text-[9px] font-mono text-white/40">
                              · {tool.tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </BorderGlow>
                );
              })}
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

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        <section id="node-faqs" className="py-28 relative overflow-hidden bg-[#050608] border-t border-white/5">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
                <HelpCircle className="w-3 h-3 text-primary" />
                <span>[ 07 ] FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
                Questions & Answers
              </h2>
              <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
                Everything you need to know about Sun IT Services, custom software engineering, technologies, and partnering with us.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {itFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="group border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm px-6 py-1 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.04] data-[state=open]:border-primary/50 data-[state=open]:bg-white/[0.05]"
                  >
                    <AccordionTrigger className="text-left text-base sm:text-lg font-display font-medium text-white hover:no-underline py-5 group-hover:text-primary transition-colors">
                      <span className="flex items-center gap-3 pr-4">
                        <span className="font-mono text-xs text-primary/70 shrink-0">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <span>{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-white/70 leading-relaxed pb-5 pl-7 pt-1 font-sans">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Direct Project Consultation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 p-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-black/60 to-black/90 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold mb-1">
                  // NEED A CUSTOM ARCHITECTURE?
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                  Have a specific question or custom requirement?
                </h3>
                <p className="text-sm text-white/60 mt-1 max-w-lg">
                  Speak directly with our senior software engineers in Indore to discuss scoping, technology stacks, or architecture design.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-black font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(249,115,22,0.3)]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/918144426440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/15 text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default ITSolutionsPage;
