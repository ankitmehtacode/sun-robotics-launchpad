import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Factory, Warehouse, Eye, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTABanner } from "@/components/CTABanner";

const products = [
  {
    id: 1,
    name: "SunBot Industrial X1",
    category: "Heavy Manufacturing",
    icon: Factory,
    specs: {
      payload: "500kg",
      reach: "3.2m",
      speed: "2.5m/s",
      accuracy: "±0.02mm",
    },
    description: "Our flagship industrial robot designed for heavy-duty manufacturing. Built for 24/7 operation in demanding environments with unmatched precision and reliability.",
    features: ["6-axis articulation", "Collision detection", "Remote monitoring", "Predictive maintenance"],
    gradient: "from-primary via-amber-500 to-orange-600",
  },
  {
    id: 2,
    name: "SunBot Logistics Pro",
    category: "Warehouse Automation",
    icon: Warehouse,
    specs: {
      payload: "200kg",
      battery: "12h",
      speed: "3.0m/s",
      navigation: "SLAM",
    },
    description: "Autonomous mobile robot for warehouse logistics. Features advanced navigation and fleet management capabilities for seamless operations.",
    features: ["Autonomous navigation", "Fleet coordination", "Dynamic obstacle avoidance", "Multi-floor support"],
    gradient: "from-amber-400 via-orange-500 to-red-500",
  },
  {
    id: 3,
    name: "SunBot Vision AI",
    category: "Quality Inspection",
    icon: Eye,
    specs: {
      resolution: "4K",
      accuracy: "99.8%",
      speed: "100fps",
      defects: "500+ types",
    },
    description: "AI-powered visual inspection system for quality control. Detects defects invisible to the human eye with industry-leading accuracy.",
    features: ["Deep learning detection", "Real-time analysis", "Defect classification", "Integration API"],
    gradient: "from-secondary via-orange-600 to-primary",
  },
  {
    id: 4,
    name: "SunBot Collaborative",
    category: "Human-Robot Interaction",
    icon: Users,
    specs: {
      payload: "15kg",
      certified: "ISO 10218",
      sensing: "Force",
      setup: "5 min",
    },
    description: "Safe collaborative robot designed to work alongside humans. Features advanced force sensing and intuitive programming for quick deployment.",
    features: ["Force-torque sensing", "No-code programming", "Safety certified", "Quick tool change"],
    gradient: "from-orange-400 via-amber-500 to-secondary",
  },
];

const Products = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Product Catalog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              Innovation in <span className="gradient-text">Motion</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our complete range of cutting-edge robotic solutions designed for every industry need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 relative overflow-hidden" ref={gridRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-card p-8 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedProduct === product.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-5`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                        {product.category}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-foreground">
                        {product.name}
                      </h3>
                    </div>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${product.gradient} p-0.5`}>
                      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                        <product.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {product.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          {key}
                        </div>
                        <div className="text-lg font-display font-semibold text-foreground">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Features */}
                  <motion.div
                    initial={false}
                    animate={{ height: selectedProduct === product.id ? "auto" : 0, opacity: selectedProduct === product.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      {/*<Button className="w-full mt-6 glow-button bg-primary text-primary-foreground">*/}
                      {/*  Request Quote*/}
                      {/*  <ArrowRight className="ml-2 w-4 h-4" />*/}
                      {/*</Button>*/}
                    </div>
                  </motion.div>

                  {/* Click indicator */}
                  {selectedProduct !== product.id && (
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Click to see more details
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Find Your <span className="gradient-text">Perfect Fit</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure which robot is right for you? Contact our team for a personalized consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl overflow-x-auto"
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-foreground font-display font-semibold">Model</th>
                  <th className="text-left py-4 px-4 text-foreground font-display font-semibold">Best For</th>
                  <th className="text-left py-4 px-4 text-foreground font-display font-semibold">Payload</th>
                  <th className="text-left py-4 px-4 text-foreground font-display font-semibold">Key Strength</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <product.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                    <td className="py-4 px-4 text-muted-foreground">{product.specs.payload || product.specs.resolution || "-"}</td>
                    <td className="py-4 px-4 text-muted-foreground">{product.features[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
};

export default Products;
