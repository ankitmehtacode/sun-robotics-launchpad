import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import "./Parallax.css";
import "./ParallaxPortfolio.css";

const portfolio = [
  {
    name: "PRYME",
    ghost: "FINTECH",
    category: "FinTech · Loan Matchmaking",
    description: "Bank-grade intelligent loan matchmaking platform connecting borrowers with 15+ lending partners.",
    image: "/portfolio/prymeloans.jpg",
    url: "https://prymeloans.in",
    displayUrl: "prymeloans.in",
  },
  {
    name: "ProtoDesign",
    ghost: "3D PRINT",
    category: "E-Commerce · 3D Printing",
    description: "High-fidelity 3D printing storefront with instant custom-print quoting.",
    image: "/portfolio/protodesignstudio.jpg",
    url: "https://www.protodesignstudio.com/",
    displayUrl: "protodesignstudio.com",
  },
  {
    name: "911 Fashion",
    ghost: "FASHION",
    category: "Retail · Fashion",
    description: "Fashion & lifestyle e-commerce platform for a leading Israeli retail brand.",
    image: "/portfolio/911fashion.jpg",
    url: "https://www.911fashion.co.il/",
    displayUrl: "911fashion.co.il",
  },
];

const ParallaxPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const alignedRef = useRef(false);

  // This container isn't the first thing on the page — unlike ParallaxHero,
  // a user scrolls normal content to reach it first. A single large wheel/
  // trackpad delta can carry the outer page scroll past this container's top
  // edge before the browser hands scroll control to its own overflow-y:auto,
  // landing mid-way through the groups instead of at the first one. Snap its
  // internal scroll back to the start the moment it becomes the active
  // full-viewport section, so it always opens on group 1.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const top = el.getBoundingClientRect().top;
      if (top <= 0 && !alignedRef.current) {
        alignedRef.current = true;
        el.scrollTop = 0;
        // A large single scroll delta can also carry the outer page past this
        // container's top edge, cropping group 1 from view even once its own
        // scrollTop is reset — realign the outer scroll to the container's
        // exact top so it always opens fully in frame.
        if (top < 0) window.scrollTo(0, window.scrollY + top);
      } else if (top > 0) {
        alignedRef.current = false;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // data-lenis-prevent: ITSolutionsPage runs a page-wide Lenis smooth-scroll
    // instance. Lenis intercepts wheel/touch at the window level, which would
    // stop the browser from ever handing scroll capture to this element's own
    // overflow-y:auto — this attribute tells Lenis to ignore events that
    // originate inside here so the native nested-scroll handoff above keeps working.
    <div className="parallax" data-lenis-prevent ref={containerRef}>
      {portfolio.map((project, index) => (
        <div className="parallax__group" key={project.name}>
          <div className="parallax__layer parallax__layer--deep">
            <img src={project.image} alt="" aria-hidden className="portfolio-backdrop" />
            <div className="portfolio-backdrop-overlay" />
          </div>

          <div className="parallax__layer parallax__layer--back">
            <span className="portfolio-ghost-text">{project.ghost}</span>
          </div>

          <div className="parallax__layer parallax__layer--base">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center text-center gap-4 mt-28">
              {index === 0 && (
                <div>
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    Portfolio
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mt-1">
                    Our <span className="gradient-text">Work</span>
                  </h2>
                </div>
              )}

              <a href={project.url} target="_blank" rel="noopener noreferrer" className="portfolio-mockup">
                <div className="portfolio-mockup-bar">
                  <span className="portfolio-mockup-dot" />
                  <span className="portfolio-mockup-dot" />
                  <span className="portfolio-mockup-dot" />
                  <span className="portfolio-mockup-url">{project.displayUrl}</span>
                </div>
                <img src={project.image} alt={project.name} loading="lazy" />
              </a>

              <div className="max-w-lg">
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  {project.category}
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground mt-1 mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          <div className="parallax__layer parallax__layer--fore">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-visit-chip absolute bottom-[16%] right-[12%]"
            >
              Visit Site <ExternalLink className="w-4 h-4" />
            </a>
            {index === 0 && (
              <div className="parallax__scroll-hint">
                <span>Scroll to explore</span>
                <div className="parallax__scroll-arrow" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParallaxPortfolio;
