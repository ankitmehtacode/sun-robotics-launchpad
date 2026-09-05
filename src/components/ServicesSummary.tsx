import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Code, Package, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Bot,
    number: "01",
    title: "Robotics",
    description: "6-axis industrial arms and autonomous mobile platforms, engineered for continuous duty-cycle operation.",
    spec: "500kg payload · ±0.02mm repeatability",
    href: "/robotics",
  },
  {
    icon: Code,
    number: "02",
    title: "Sun IT Services",
    description: "Custom website development, iOS/Android apps, scalable cloud APIs, and AI business intelligence portals.",
    spec: "Sub-second load · Bank-grade security",
    href: "/sunitservices",
  },
  {
    icon: Package,
    number: "03",
    title: "Products",
    description: "The full SunBot line — from heavy manufacturing arms to vision-guided inspection systems.",
    spec: "4 platforms · built for 24/7 operation",
    href: "/products",
  },
];

export const ServicesSummary = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Headline — each line is masked by its overflow-hidden wrapper and
      // slides up into place as the section enters view.
      const lines = [headingLine1Ref.current, headingLine2Ref.current].filter(Boolean);
      if (reduceMotion) {
        gsap.set(lines, { yPercent: 0 });
      } else {
        gsap.set(lines, { yPercent: 110 });
        gsap.to(lines, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      }
    }, section);

    // Row reveals + differential parallax on the background numerals.
    const rowCtx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const content = row.querySelector<HTMLElement>("[data-row-content]");
        const line = row.querySelector<HTMLElement>("[data-row-line]");
        const numeral = row.querySelector<HTMLElement>("[data-row-numeral]");

        if (reduceMotion) {
          gsap.set([content, line].filter(Boolean), { clearProps: "all" });
          return;
        }

        gsap.set(content, { y: 32, opacity: 0 });
        gsap.set(line, { scaleX: 0 });

        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 88%" } })
          .to(line, { scaleX: 1, duration: 0.7, ease: "power3.inOut" })
          .to(content, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.45");

        if (numeral) {
          gsap.to(numeral, {
            yPercent: -16,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    }, section);

    return () => {
      ctx.revert();
      rowCtx.revert();
    };
  }, []);

  const handleRowMove = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const content = rowRefs.current[index]?.querySelector<HTMLElement>("[data-row-content]");
    const arrow = rowRefs.current[index]?.querySelector<HTMLElement>("[data-row-arrow]");
    if (!content) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(content, { x: relX * 14, y: relY * 8, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    if (arrow) {
      gsap.to(arrow, { x: 6, rotate: 45, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    }
  };

  const handleRowLeave = (index: number) => () => {
    const content = rowRefs.current[index]?.querySelector<HTMLElement>("[data-row-content]");
    const arrow = rowRefs.current[index]?.querySelector<HTMLElement>("[data-row-arrow]");
    if (content) gsap.to(content, { x: 0, y: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    if (arrow) gsap.to(arrow, { x: 0, rotate: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="md:col-span-8">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Capabilities
            </span>
            <h2 className="mt-5 font-display font-bold tracking-[-0.03em] text-[13vw] leading-[0.95] md:text-[5.5vw] md:leading-[0.95]">
              <span className="block overflow-hidden">
                <span ref={headingLine1Ref} className="block">
                  Three Disciplines.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span ref={headingLine2Ref} className="block gradient-text">
                  One Platform.
                </span>
              </span>
            </h2>
          </div>
          <div className="md:col-span-4 flex md:items-end">
            <p className="text-base md:text-lg text-muted-foreground md:text-right">
              Hardware, software, and the systems that connect them — built and supported by one team.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => (rowRefs.current[index] = el)}
              onClick={() => navigate(service.href)}
              onMouseMove={handleRowMove(index)}
              onMouseLeave={handleRowLeave(index)}
              className="group relative cursor-pointer"
            >
              <div data-row-line className="h-px w-full bg-border origin-left" />

              <div className="relative py-9 md:py-12">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <span
                    data-row-numeral
                    aria-hidden
                    className="select-none absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 font-display font-bold text-foreground/[0.04] text-[7rem] md:text-[10rem] leading-none tracking-tighter group-hover:text-primary/[0.08] transition-colors duration-500"
                  >
                    {service.number}
                  </span>
                </div>

                <div
                  data-row-content
                  className="relative flex flex-col md:flex-row md:items-center gap-3 md:gap-8"
                >
                  <span className="font-mono text-sm text-muted-foreground/50 md:w-10 shrink-0">
                    {service.number}
                  </span>

                  <div className="md:w-64 shrink-0 flex items-center gap-3">
                    <service.icon
                      className="w-5 h-5 text-primary shrink-0 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-2xl md:text-4xl font-display font-semibold text-foreground tracking-[-0.02em]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground flex-1 md:pr-8">{service.description}</p>

                  <div className="hidden lg:block font-mono text-xs text-muted-foreground/60 shrink-0 whitespace-nowrap">
                    {service.spec}
                  </div>

                  <ArrowUpRight
                    data-row-arrow
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 hidden md:block"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-border" />
        </div>
      </div>
    </section>
  );
};
