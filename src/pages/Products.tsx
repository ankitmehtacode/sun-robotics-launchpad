import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import { SEO } from "@/components/SEO";
import { SITE_URL, productListSchema } from "@/lib/schema";

const products = [
  {
    id: 3,
    name: "SunBot Vision AI",
    category: "Quality Inspection",
    icon: Eye,
    description:
      "A camera and software system for quality control. It checks each part as it passes on the line and flags the ones that look defective, so your inspectors review the exceptions instead of every part.",
    features: [
      "Deep learning defect detection",
      "Real-time analysis",
      "Defect classification",
      "Integration API",
    ],
  },
];

const Products = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <>
      <SEO
        title="SunBot Vision AI: Visual Inspection"
        description="SunBot Vision AI from Sun Robotics & AI: camera-based inspection that flags defective parts on a production line."
        keywords="robotics products, AI vision inspection, quality control, defect detection"
        canonical={`${SITE_URL}/products`}
        structuredData={productListSchema(products)}
      />

      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden" ref={headerRef}>
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
              What we sell
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              One product today: SunBot Vision AI, automated visual inspection for
              production lines.
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
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="text-primary text-sm font-medium mb-2">{product.category}</div>
                    <h2 className="text-2xl font-display font-bold text-foreground">{product.name}</h2>
                  </div>
                  <product.icon className="w-8 h-8 text-primary shrink-0" strokeWidth={1.5} />
                </div>

                <p className="text-muted-foreground mb-6">{product.description}</p>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">What it does</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Ask us about SunBot Vision AI
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
