import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { api, Blog } from "@/lib/api";
import { SITE_URL } from "@/lib/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            try {
                const data = await api.getBlogById(id);
                setBlog(data);
            } catch (err) {
                setError("Failed to load blog post.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-32 max-w-4xl space-y-8">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                <Link to="/blog">
                    <Button>Return to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={blog.title}
                description={blog.excerpt}
                canonical={`${SITE_URL}/blog/${id}`}
            />

            <article className="min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Link */}
                    <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 mb-10"
                    >
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                {blog.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown Date"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {blog.readTime}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {blog.author}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                            {blog.title}
                        </h1>
                    </motion.div>

                    {/* Featured Image */}
                    {blog.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl overflow-hidden shadow-2xl mb-12 bg-muted"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                        </motion.div>
                    )}

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                    >
                        {/* SAFEGUARD: In a real app, use a library like 'dompurify'
                           to sanitize this HTML before rendering to prevent XSS.
                        */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </motion.div>
                </div>
            </article>
        </>
    );
};

export default BlogPost;