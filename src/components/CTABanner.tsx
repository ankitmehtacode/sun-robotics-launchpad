import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollExpand } from "@/components/ui/ScrollExpand";
import BorderGlow from "@/components/ui/BorderGlow";

export interface CTABannerProps {
  /** Optional badge tag above heading */
  badge?: string;
  /** Custom heading */
  title?: React.ReactNode;
  /** Custom subtitle/description */
  subtitle?: string;
  /** Custom primary action button label */
  buttonText?: string;
  /** Primary button destination route (default '/contact') */
  buttonLink?: string;
  /** Optional secondary action label */
  secondaryButtonText?: string;
  /** Secondary button destination route */
  secondaryButtonLink?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  badge = "GET STARTED",
  title,
  subtitle = "Discuss your project directly with our core engineering team. We'll map out the architecture, tech stack, and deliver an actionable execution plan.",
  buttonText = "Start a Project",
  buttonLink = "/contact",
  secondaryButtonText,
  secondaryButtonLink = "/contact",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollExpand
          initialScale={0.86}
          initialRadius={36}
          finalRadius={24}
          initialWidth="86%"
          className="w-full"
        >
          <BorderGlow
            className="w-full rounded-[inherit] overflow-hidden"
            borderRadius={24}
            glowColor="32 95 55"
            colors={["#f59e0b", "#ea580c", "#d97706"]}
            glowIntensity={0.8}
            fillOpacity={0.4}
          >
            <div className="p-8 sm:p-12 md:p-16 text-center relative overflow-hidden bg-[#080a0f]/90 backdrop-blur-2xl">
              {/* Internal ambient laser light and mesh gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                {badge && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-5"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{badge}</span>
                  </motion.div>
                )}

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight mb-4 sm:mb-6"
                >
                  {title || (
                    <>
                      Ready to Build Something <span className="gradient-text">Exceptional?</span>
                    </>
                  )}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-sans"
                >
                  {subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                  <Button
                    size="lg"
                    onClick={() => navigate(buttonLink)}
                    className="glow-button bg-primary text-black font-display font-bold hover:bg-amber-400 text-xs sm:text-sm uppercase tracking-wider px-8 py-6 rounded-xl w-full sm:w-auto cursor-pointer shadow-[0_0_30px_hsl(32,95%,55%,0.35)]"
                  >
                    {buttonText}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  {secondaryButtonText && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate(secondaryButtonLink)}
                      className="bg-white/[0.03] border-white/15 hover:border-primary/50 text-white hover:bg-white/[0.06] font-display font-medium text-xs sm:text-sm uppercase tracking-wider px-8 py-6 rounded-xl w-full sm:w-auto cursor-pointer backdrop-blur-md"
                    >
                      {secondaryButtonText}
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </BorderGlow>
        </ScrollExpand>
      </div>
    </section>
  );
};

export default CTABanner;
