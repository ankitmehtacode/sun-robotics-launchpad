import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SITE_URL } from "@/lib/schema";

const Privacy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Sun Robotics & AI collects, uses, and protects your personal information."
        canonical={`${SITE_URL}/privacy`}
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>

            <div className="glass-card p-8 md:p-12 space-y-8 text-muted-foreground">
              <p className="text-sm">Last updated: January 28, 2026</p>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  1. Information We Collect
                </h2>
                <p className="leading-relaxed">
                  We collect information you provide directly to us, such as
                  when you fill out a contact form, apply for a job, or
                  subscribe to our newsletter. This may include your name, email
                  address, phone number, and company information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="leading-relaxed">
                  We use the information we collect to respond to your
                  inquiries, process job applications, send you updates about
                  our products and services, and improve our website and
                  offerings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  3. Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                  4. Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:info@sunroboticsandai.in."
                    className="text-primary hover:underline"
                  >
                      info@sunroboticsandai.in.
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

export default Privacy;
