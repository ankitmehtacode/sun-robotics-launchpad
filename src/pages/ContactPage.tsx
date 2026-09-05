import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { SEO } from "@/components/SEO";
import { SITE_URL, organizationSchema } from "@/lib/schema";

const quickActions = [
  { icon: Mail, label: "Email us", value: "info@sunroboticsandai.in", href: "mailto:info@sunroboticsandai.in" },
  { icon: Phone, label: "Call us", value: "+91 8144426440", href: "tel:+918144426440" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: "https://wa.me/918144426440" },
];

// Office is open Mon–Sat, 9:00–18:00 IST — matches the real hours shown in
// ContactInfo and on the verified Google Business Profile listing.
function isOfficeOpen(): boolean {
  const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay();
  const hour = ist.getHours() + ist.getMinutes() / 60;
  return day >= 1 && day <= 6 && hour >= 9 && hour < 18;
}

const ContactPage = () => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const [officeOpen, setOfficeOpen] = useState(isOfficeOpen);

  useEffect(() => {
    const id = setInterval(() => setOfficeOpen(isOfficeOpen()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <SEO
        title="Contact Us — Indore"
        description="Get in touch with Sun Robotics & AI at Jawahar Tekri, Sinhasa, Indore. Call +91 8144426440 or email info@sunroboticsandai.in for AI, robotics, and IT solutions inquiries."
        keywords="contact Sun Robotics, Sun Robotics Indore, AI robotics company contact"
        canonical={`${SITE_URL}/contact`}
        structuredData={organizationSchema()}
      />

      {/* Page Header */}
      <section className="pt-32 pb-20 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="text-primary text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />
                Get in Touch
              </span>
              <div className="mt-5">
                <MaskedHeading
                  heading={["Let's Build the"]}
                  accentText="Future Together"
                  subhead="Ready to transform your operations with AI and robotics? Our team is here to help you every step of the way."
                  as="h1"
                  variant="monochrome"
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight"
                  accentClassName="gradient-text"
                  subheadClassName="text-lg md:text-xl text-muted-foreground max-w-xl"
                  delay={0.1}
                  stagger={0.12}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-5"
            >
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className={`w-2 h-2 rounded-full ${officeOpen ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-muted-foreground/50"}`} />
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {officeOpen ? "Open now" : "Currently closed"} · Mon–Sat, 9AM–6PM IST
                  </span>
                </div>

                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <action.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{action.label}</div>
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {action.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
