import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE_URL } from "@/lib/schema";

// Keep this page to facts a visitor can check elsewhere on the site.
const divisions = [
    {
        title: "Robotics",
        body: "We are developing a modular robotic arm and a humanoid platform. We also make SunBot Vision AI, a camera-based system that flags defective parts on a production line.",
        href: "/robotics",
        linkLabel: "Robotics",
    },
    {
        title: "Sun IT Services",
        body: "Our software team builds websites, mobile apps, APIs and dashboards for other businesses. Recent client work includes PRYME Loans, ProtoDesign Studio and 911 Fashion.",
        href: "/sunitservices",
        linkLabel: "Sun IT Services",
    },
];

const About = () => {
    const heroRef = useRef(null);
    const bodyRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isBodyInView = useInView(bodyRef, { once: true, margin: "-100px" });

    return (
        <>
            <SEO
                title="About Us"
                description="Sun Robotics & AI is a robotics and software company in Indore, India. We build robots and inspection products, and our Sun IT Services team builds software for clients."
                canonical={`${SITE_URL}/about`}
            />

            <section className="pt-32 pb-16 relative overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute inset-0 grid-bg opacity-40" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                            About us
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
                            Sun Robotics & AI
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground">
                            We are a robotics and software company in Indore, India. We build
                            robots, and we build software for other businesses.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="pb-24" ref={bodyRef}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-5xl divide-y divide-border border-y border-border">
                        {divisions.map((division, index) => (
                            <motion.div
                                key={division.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isBodyInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10"
                            >
                                <h2 className="md:col-span-4 text-2xl md:text-3xl font-display font-semibold text-foreground">
                                    {division.title}
                                </h2>
                                <div className="md:col-span-8">
                                    <p className="text-lg text-muted-foreground mb-4">{division.body}</p>
                                    <Link
                                        to={division.href}
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                    >
                                        {division.linkLabel}
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isBodyInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: divisions.length * 0.1 }}
                            className="grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10"
                        >
                            <h2 className="md:col-span-4 text-2xl md:text-3xl font-display font-semibold text-foreground">
                                Where we are
                            </h2>
                            <div className="md:col-span-8">
                                <p className="text-lg text-muted-foreground mb-4">
                                    01, Jawahar Tekri, Sinhasa, Indore, Madhya Pradesh 452009, India.
                                    Open Monday to Saturday, 9 AM to 6 PM IST.
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Contact us
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
