//
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
// Index is the most common landing page — load it eagerly so the first
// visit doesn't pay an extra chunk round-trip. Every other route is
// fetched on demand so a homepage visitor never downloads the admin
// dashboard, blog editor, etc.
import Index from "./pages/Index";

const Robotics = lazy(() => import("./pages/Robotics"));
const ITSolutionsPage = lazy(() => import("./pages/ITSolutionsPage"));
const Products = lazy(() => import("./pages/Products"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLayout = lazy(() => import("@/components/layouts/AdminLayout"));
const Login = lazy(() => import("./pages/admin/Login"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));

const queryClient = new QueryClient();

// Create a layout wrapper for the public website to keep Navbar & Footer
// This ensures they don't appear on the Admin pages
const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={null}>
                    <Routes>
                        {/* --- PUBLIC ROUTES (Wrapped in PublicLayout) --- */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Index />} />
                            <Route path="/robotics" element={<Robotics />} />
                            <Route path="/sunitservices" element={<ITSolutionsPage />} />
                            <Route path="/it-solutions" element={<Navigate to="/sunitservices" replace />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogPost />} />
                            {/* Catch-all for public 404 */}
                            <Route path="*" element={<NotFound />} />
                        </Route>

                        {/* --- ADMIN LOGIN (Standalone - No Navbar/Footer, No Auth Check) --- */}
                        <Route path="/admin/login" element={<Login />} />

                        {/* --- ADMIN ROUTES (Wrapped in AdminLayout - Requires Auth) --- */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="jobs" element={<AdminJobs />} />
                            <Route path="applications" element={<AdminApplications />} />
                            <Route path="messages" element={<AdminMessages />} />
                            <Route path="blogs" element={<AdminBlogs />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;