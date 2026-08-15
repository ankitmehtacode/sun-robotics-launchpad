import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema } from "@/lib/schema";

const ContactPage = () => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <>
      <SEO
        title="Contact Us — Indore"
        description="Get in touch with Sun Robotics & AI at Indraprastha Tower, Rau, Indore. Call +91 8144426440 or email info@sunroboticsandai.in for AI, robotics, and IT solutions inquiries."
        keywords="contact Sun Robotics, Sun Robotics Indore, AI robotics company contact"
        canonical={`${SITE_URL}/contact`}
        structuredData={organizationSchema()}
      />

      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              Let's Build the Future <span className="gradient-text">Together</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your operations with AI and robotics?
              Our team is here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative overflow-hidden" ref={formRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-8 md:p-10 rounded-2xl">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <ContactForm extended />
              </div>
            </motion.div>

            {/* Contact Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <ContactInfo extended isInView={isFormInView} />
              <MapPlaceholder
                variant="globe"
                isInView={isFormInView}
                heightClass="h-64"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
