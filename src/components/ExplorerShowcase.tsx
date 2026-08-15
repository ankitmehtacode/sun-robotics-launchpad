import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import "./ExplorerShowcase.css";

const projects = [
  {
    index: "01",
    name: "PRYME",
    category: "FinTech · Loan Matchmaking",
    description:
      "Bank-grade intelligent loan matchmaking platform connecting borrowers with 15+ lending partners.",
    image: "/portfolio/prymeloans.jpg",
    url: "https://prymeloans.in",
    displayUrl: "prymeloans.in",
  },
  {
    index: "02",
    name: "ProtoDesign",
    category: "E-Commerce · 3D Printing",
    description: "High-fidelity 3D printing storefront with instant custom-print quoting.",
    image: "/portfolio/protodesignstudio.jpg",
    url: "https://www.protodesignstudio.com/",
    displayUrl: "protodesignstudio.com",
  },
  {
    index: "03",
    name: "911 Fashion",
    category: "Retail · Fashion",
    description: "Fashion & lifestyle e-commerce platform for a leading Israeli retail brand.",
    image: "/portfolio/911fashion.jpg",
    url: "https://www.911fashion.co.il/",
    displayUrl: "911fashion.co.il",
  },
];

// Scroll-jacked horizontal filmstrip: the section's own height reserves
// enough vertical scroll distance to drag the track fully across, while a
// sticky inner viewport pins in place — see ExplorerShowcase.css. Below md,
// the pin/translate feels janky on touch, so a plain snap-scroll row (in JSX)
// takes over instead — that's a separate render path further down.
const ExplorerShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setScrollDistance(trackRef.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <>
      {/* Desktop / tablet: pinned horizontal filmstrip */}
      <section
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: `calc(100vh + ${scrollDistance}px)` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden explorer-stage">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 grid-bg opacity-30" />

          <span className="explorer-coordinate">( PORTFOLIO )</span>

          <motion.div ref={trackRef} style={{ x }} className="explorer-track">
            <div className="explorer-panel explorer-panel--intro">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                IT Solutions · Portfolio
              </span>
              <h2 className="explorer-headline">
                <span className="block text-foreground">Calling All</span>
                <span className="block gradient-text">Innovators</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mt-6 tracking-[-0.01em]">
                From fintech to fashion, we engineer the software backbone for
                teams who refuse to stand still.
              </p>
            </div>

            {projects.map((project) => (
              <div className="explorer-connector" key={`${project.name}-tick`} aria-hidden />
            ))}

            {projects.map((project) => (
              <div className="explorer-panel explorer-panel--project" key={project.name}>
                <span className="explorer-ghost-index" aria-hidden>
                  {project.index}
                </span>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explorer-mockup"
                >
                  <div className="explorer-mockup-bar">
                    <span className="explorer-mockup-dot" />
                    <span className="explorer-mockup-dot" />
                    <span className="explorer-mockup-dot" />
                    <span className="explorer-mockup-url">{project.displayUrl}</span>
                  </div>
                  <img src={project.image} alt={project.name} loading="lazy" />
                </a>

                <div className="explorer-panel-info">
                  <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-display font-semibold text-foreground mt-1 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explorer-visit-chip"
                  >
                    Visit Site <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}

            <div className="explorer-panel explorer-panel--outro">
              <div className="explorer-badge" aria-hidden>
                <svg viewBox="0 0 200 200" className="explorer-badge-ring">
                  <defs>
                    <path
                      id="explorer-badge-path"
                      d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#explorer-badge-path" startOffset="0%">
                      SUN ROBOTICS · IT SOLUTIONS · SUN ROBOTICS · IT SOLUTIONS ·
                    </textPath>
                  </text>
                </svg>
                <span className="explorer-badge-core" />
              </div>
              <p className="text-xl md:text-2xl font-display text-foreground mt-8">
                Your project could be next.
              </p>
              <a href="/contact" className="explorer-visit-chip mt-6">
                Start a Project <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <div className="explorer-progress">
            <motion.div className="explorer-progress-fill" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </section>

      {/* Mobile: plain snap-scroll row, no scroll-jacking */}
      <section className="md:hidden py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 relative z-10 mb-8">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            IT Solutions · Portfolio
          </span>
          <h2 className="text-3xl font-display font-bold mt-3">
            Calling All <span className="gradient-text">Innovators</span>
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 relative z-10 explorer-mobile-row">
          {projects.map((project) => (
            <div
              key={project.name}
              className="snap-center shrink-0 w-[85vw] glass-card p-4 rounded-2xl"
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="explorer-mockup">
                <div className="explorer-mockup-bar">
                  <span className="explorer-mockup-dot" />
                  <span className="explorer-mockup-dot" />
                  <span className="explorer-mockup-dot" />
                  <span className="explorer-mockup-url">{project.displayUrl}</span>
                </div>
                <img src={project.image} alt={project.name} loading="lazy" />
              </a>
              <span className="text-xs font-semibold tracking-wider uppercase text-primary mt-4 block">
                {project.category}
              </span>
              <h3 className="text-xl font-display font-semibold text-foreground mt-1 mb-1">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="explorer-visit-chip"
              >
                Visit Site <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ExplorerShowcase;
