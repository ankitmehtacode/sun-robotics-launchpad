import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eye } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE_URL, productListSchema } from "@/lib/schema";

const products = [
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
];

const Products = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Robotics & AI Products — SunBot Series"
        description="SunBot Vision AI from Sun Robotics & AI: an AI-powered visual inspection system for quality control on the production line."
        keywords="robotics products, AI vision inspection, quality control, defect detection"
        canonical={`${SITE_URL}/products`}
        structuredData={productListSchema(products)}
      />

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
              AI-powered visual inspection, engineered to catch what the human eye can't.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 relative overflow-hidden" ref={gridRef}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 max-w-xl mx-auto">
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
    </>
  );
};

export default Products;
