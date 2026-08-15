import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SITE_URL } from "@/lib/schema";

const Terms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms and conditions governing your use of Sun Robotics & AI products and services."
        canonical={`${SITE_URL}/terms`}
      />

      <section className="pt-32 pb-24 relative overflow-hidden" ref={ref}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-8">
              Terms of <span className="gradient-text">Service</span>
            </h1>

            <div className="glass-card p-8 md:p-12 space-y-8 text-muted-foreground">
              <p className="text-sm">Last updated: January 28, 2026</p>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing or using the Sun Robotics & AI website and
                  services, you agree to be bound by these Terms of Service. If
                  you do not agree to these terms, please do not use our
                  services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  2. Use of Services
                </h2>
                <p className="leading-relaxed">
                  You agree to use our services only for lawful purposes and in
                  accordance with these Terms. You are responsible for ensuring
                  that your use of our services complies with all applicable
                  laws and regulations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  3. Intellectual Property
                </h2>
                <p className="leading-relaxed">
                  All content, trademarks, and intellectual property on this
                  website are the property of Sun Robotics & AI or its
                  licensors. You may not reproduce, distribute, or create
                  derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  4. Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  Sun Robotics & AI shall not be liable for any indirect,
                  incidental, special, or consequential damages arising from
                  your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  5. Contact
                </h2>
                <p className="leading-relaxed">
                  For questions about these Terms, contact us at{" "}
                  <a
                    href="mailto:info@sunroboticsandai.in"
                    className="text-primary hover:underline"
                  >
                    info@sunroboticsandai.in
                  </a>
                  .
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Terms;
