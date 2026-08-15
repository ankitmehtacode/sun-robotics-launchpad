import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Lightbulb, Shield, Zap, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE_URL } from "@/lib/schema";

const values = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description:
            "We push the boundaries of what's possible, constantly exploring new technologies and methodologies to deliver breakthrough solutions.",
    },
    {
        icon: Shield,
        title: "Safety",
        description:
            "Safety is non-negotiable. Every system we build prioritizes the wellbeing of operators and the integrity of operations.",
    },
    {
        icon: Users,
        title: "Integrity",
        description:
            "We build trust through transparency, honest communication, and delivering on our promises to clients and partners.",
    },
    {
        icon: Zap,
        title: "Agility",
        description:
            "In a rapidly evolving industry, we adapt quickly, iterate fast, and stay ahead of technological shifts.",
    },
];

const stats = [
    { value: "500+", label: "Robots Deployed" },
    { value: "98%", label: "Client Retention" },
    { value: "15+", label: "Countries Served" },
    { value: "24/7", label: "Support Coverage" },
];

const About = () => {
    const heroRef = useRef(null);
    const visionRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null); // Added Ref for Team Section
    const statsRef = useRef(null);

    const isHeroInView = useInView(heroRef, { once: true });
    const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });
    const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
    const isTeamInView = useInView(teamRef, { once: true, margin: "-100px" }); // Added InView for Team
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

    return (
        <>
            <SEO
                title="About Us"
                description="Learn about Sun Robotics & AI's mission to democratize advanced robotics and AI for enterprises worldwide."
                canonical={`${SITE_URL}/about`}
            />

            {/* Hero Section */}
            <section className="pt-32 pb-24 relative overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              About Us
            </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
                            Engineering the Future of{" "}
                            <span className="gradient-text">Automation</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                            Since our founding, we've been on a mission to transform how
                            industries operate through intelligent automation and
                            human-machine collaboration.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 relative" ref={visionRef}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="glass-card p-8 md:p-10 glow-card"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
                                <Eye className="w-7 h-7 text-primary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                                Our Vision
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                To become the{" "}
                                <span className="text-primary font-semibold">
                  global nervous system
                </span>{" "}
                                for industrial intelligence — a world where machines and humans
                                work in seamless harmony, driving unprecedented levels of
                                productivity, safety, and innovation.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isVisionInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="glass-card p-8 md:p-10 glow-card"
                        >
                            <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 border border-secondary/30">
                                <Target className="w-7 h-7 text-secondary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                                Our Mission
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-secondary font-semibold">
                  Democratizing access
                </span>{" "}
                                to advanced robotics and AI for enterprises of all sizes. We
                                believe cutting-edge automation shouldn't be reserved for
                                industry giants — every business deserves the tools to compete
                                globally.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 relative" ref={valuesRef}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              What Drives Us
            </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
                            Our Core <span className="gradient-text">Values</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            These principles guide every decision we make and every solution
                            we build.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="glass-card p-6 text-center glow-card group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20 group-hover:border-primary/50 transition-colors">
                                    <value.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW SECTION: Team Photo */}
            <section className="py-24 relative overflow-hidden" ref={teamRef}>
                <div className="container mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-2xl overflow-hidden glass-card border border-primary/20 group"
                    >
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none" />

                        {/* TO UPDATE PHOTO:
                1. Add your photo to the /public folder (e.g., /public/team-photo.jpg)
                2. Change the 'src' below to "/team-photo.jpg"
            */}
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
                            alt="The Sun Robotics Team"
                            className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-background/95 via-background/80 to-transparent z-20">
                            <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">
                                The Minds Behind the <span className="text-primary">Machines</span>
                            </h3>
                            <p className="text-muted-foreground text-lg max-w-2xl">
                                We are a diverse team of engineers, dreamers, and problem solvers united by a single passion: building the future.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 relative" ref={statsRef}>
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold neon-text mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm md:text-base text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;