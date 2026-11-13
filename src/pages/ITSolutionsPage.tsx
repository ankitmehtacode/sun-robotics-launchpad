import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ExternalLink, Smartphone, Server, Database, Cloud, MessageCircle, ArrowRight } from "lucide-react";
import ExplorerShowcase from "@/components/ExplorerShowcase";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema, itServicesSchema, serviceSchema, clientProjectSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { portfolioProjects } from "@/components/ExplorerShowcase";
import { StackedSolutionsDeck } from "@/components/it-solutions/StackedSolutionsDeck";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const itFaqs = [
  {
    id: "faq-1",
    question: "What is Sun IT Services and how does it connect with Sun Robotics?",
    answer:
      "Sun IT Services is the software division of Sun Robotics & AI in Indore. The robotics team builds robots; Sun IT Services builds websites, mobile apps, backends and dashboards for client businesses.",
  },
  {
    id: "faq-2",
    question: "What custom website development services does Sun IT Services offer in Indore?",
    answer:
      "We build company websites, online stores and web apps such as customer portals. We usually work in React, Next.js, TypeScript and Tailwind CSS, and we set up SEO basics (page titles, structured data, sitemaps) as part of the build.",
  },
  {
    id: "faq-3",
    question: "Can Sun IT Services build custom iOS and Android mobile apps?",
    answer:
      "Yes. We build iOS and Android apps, usually with React Native or Flutter so one codebase covers both. When an app needs close access to device hardware, we write native Swift or Kotlin. Features like offline mode, push notifications and biometric login are added when the app needs them.",
  },
  {
    id: "faq-4",
    question: "Do you provide custom ERP, CRM, and API integration for existing businesses?",
    answer:
      "Yes. We build custom ERP and CRM tools, billing systems, and REST or GraphQL APIs, and we connect them to what you already use: your database, payment gateways, the WhatsApp API or logistics services.",
  },
  {
    id: "faq-5",
    question: "Do you offer dedicated development teams, staff augmentation, or fixed-scope contracts?",
    answer:
      "We work on fixed-scope projects, and we can also put developers on your team for longer work. Tell us what you need and we'll suggest the arrangement that fits. NDA and IP ownership terms are agreed in the contract.",
  },
  {
    id: "faq-6",
    question: "What is your software development process and typical timeline?",
    answer:
      "We start with a call to understand the job, then design screens in Figma, build in short sprints you can review, test, and launch. The timeline depends on the scope.",
  },
  {
    id: "faq-7",
    question: "Do you offer ongoing cloud hosting, server management, and 24/7 technical support?",
    answer:
      "Yes. We can host what we build on AWS or GCP and look after it: uptime monitoring, daily database backups, security patches and feature updates.",
  },
  {
    id: "faq-8",
    question: "Where is Sun IT Services located, and how can we start a project?",
    answer:
      "We are at 01, Jawahar Tekri, Sinhasa, Indore, Madhya Pradesh 452009, India. To start, use the contact form or message us on WhatsApp.",
  },
];

const structuredData = [
  organizationSchema(),
  itServicesSchema(),
  serviceSchema({
    name: "Sun IT Services - Website Development in Indore",
    description:
      "Custom website design and development for businesses in Indore and across India, from company sites to online stores.",
    serviceType: "Website Development",
    provider: "Sun IT Services",
    areaServed: "Indore, Madhya Pradesh, India",
    url: `${SITE_URL}/sunitservices`,
  }),
  serviceSchema({
    name: "Sun IT Services - App Development in Indore",
    description:
      "iOS and Android app development, cross-platform or native, with cloud backends.",
    serviceType: "Mobile App Development",
    provider: "Sun IT Services",
    areaServed: "Indore, Madhya Pradesh, India",
    url: `${SITE_URL}/sunitservices`,
  }),
  serviceSchema({
    name: "Sun IT Services - Custom Software Solutions in Indore",
    description:
      "Custom business software, API integrations, and dashboards for connected devices.",
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
    title: "Frontend & mobile",
    desc: "Websites, web apps and mobile apps.",
    icon: Smartphone,
    tools: [
      { name: "Next.js 15" },
      { name: "React 19" },
      { name: "TypeScript" },
      { name: "React Native" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    serial: "02",
    title: "Backend",
    desc: "APIs and backend services.",
    icon: Server,
    tools: [
      { name: "Node.js & Bun" },
      { name: "Python / FastAPI" },
      { name: "GraphQL & REST" },
      { name: "gRPC" },
    ],
  },
  {
    serial: "03",
    title: "Data",
    desc: "Databases, caching and data access.",
    icon: Database,
    tools: [
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Prisma & Drizzle" },
    ],
  },
  {
    serial: "04",
    title: "Cloud & devices",
    desc: "Hosting, deployment and device messaging.",
    icon: Cloud,
    tools: [
      { name: "AWS & GCP" },
      { name: "Cloudflare" },
      { name: "Docker" },
      { name: "MQTT & WebSockets" },
    ],
  },
];

const ITSolutionsPage = () => {
  const headerRef = useRef(null);
  const techRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isTechInView = useInView(techRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-[#050608] text-foreground selection:bg-primary selection:text-black">
        <SEO
          title="Sun IT Services | Website & App Development in Indore"
          description="Sun IT Services, the software division of Sun Robotics & AI, builds custom websites, iOS and Android apps, APIs and dashboards for businesses in Indore and across India."
          keywords="Sun IT Services, Sun IT Services Indore, sun it services, website development company in indore, IT company in indore, app development company indore, mobile app developers indore, custom software development indore, web design indore, React Next.js developers indore, Sun Robotics IT services"
          canonical={`${SITE_URL}/sunitservices`}
          structuredData={structuredData}
        />

        {/* HERO */}
        <section
          id="node-hero"
          ref={headerRef}
          className="pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden min-h-[80dvh] flex items-center justify-center"
        >
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <MaskedHeading
                heading={["Websites, apps", "and software."]}
                subhead="Sun IT Services builds websites, iOS and Android apps, APIs and dashboards for businesses, and hosts and maintains them after launch."
                as="h1"
                className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-display font-semibold tracking-[-0.035em] text-white"
                subheadClassName="text-sm sm:text-base md:text-lg text-white/65 font-normal tracking-[-0.01em] mb-6 sm:mb-8 max-w-xl mx-auto px-2 sm:px-0"
                delay={0.15}
                stagger={0.12}
                duration={0.8}
                interactive={true}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2 w-full max-w-sm sm:max-w-none mx-auto"
              >
                <a
                  href="#node-pillars"
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-primary text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                >
                  <span>See what we build</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-white/[0.03] border border-white/15 hover:border-primary/50 text-white font-display font-medium text-xs uppercase tracking-wider hover:bg-white/[0.06] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Start a project</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <StackedSolutionsDeck />

        {/* CLIENT WORK */}
        <ExplorerShowcase />

        {/* TOOLS */}
        <section id="node-tech" className="py-24 sm:py-32 relative overflow-hidden" ref={techRef}>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
                Tools
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
                What we build with
              </h2>
              <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto font-sans">
                Widely used, well-supported tools, so another team can maintain your software
                later if you ever need them to.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTechInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {modernTechPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.serial}
                    className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-[#080a0f] h-full flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="flex items-center gap-2.5 text-xl sm:text-2xl font-display font-bold text-white mb-2 tracking-tight">
                        <IconComponent className="w-5 h-5 text-primary shrink-0" />
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/65 font-sans leading-relaxed mb-6">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {pillar.tools.map((tool) => (
                        <span
                          key={tool.name}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-sans font-medium text-white"
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
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
                <span>FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-3">
                Questions & Answers
              </h2>
              <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
                How we work, what we build, and how to start a project.
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
                  START A PROJECT
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                  Have a question we didn't answer?
                </h3>
                <p className="text-sm text-white/60 mt-1 max-w-lg">
                  Talk to the engineers who would build it. We're in Indore.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-black font-semibold text-sm hover:brightness-110 active:scale-95 transition-all "
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
  );
};

export default ITSolutionsPage;
