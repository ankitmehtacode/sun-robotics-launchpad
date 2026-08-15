import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { api, Blog as BlogType } from "@/lib/api";
import { SITE_URL } from "@/lib/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });
    const navigate = useNavigate();

    const [posts, setPosts] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await api.getBlogs();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <SEO
                title="Blog"
                description="Insights and updates from Sun Robotics & AI on industrial automation, AI research, and the future of robotics."
                canonical={`${SITE_URL}/blog`}
            />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden" ref={heroRef}>
                <div className="absolute inset-0 hero-gradient" />
                <div className="absolute inset-0 grid-bg opacity-40" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Blog
            </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
                            Insights & <span className="gradient-text">Updates</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground">
                            Stay updated with the latest in industrial automation, AI
                            research, and robotics innovation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 relative" ref={gridRef}>
                <div className="container mx-auto px-4 lg:px-8">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-48 w-full rounded-xl" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => navigate(`/blog/${post.id}`)} // ADDED: Navigation Handler
                                    className="glass-card overflow-hidden glow-card group cursor-pointer flex flex-col h-full"
                                >
                                    <div className="aspect-video bg-muted/30 relative overflow-hidden">
                                        <img
                                            src={post.imageUrl || "/placeholder.svg"}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full">
                        {post.category}
                      </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                          {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : "Recent"}
                      </span>
                                            <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                                                {post.readTime}
                      </span>
                                        </div>

                                        <h2 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all mt-auto">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Blog;