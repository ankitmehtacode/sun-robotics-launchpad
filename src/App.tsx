//
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Robotics from "./pages/Robotics";
import ITSolutionsPage from "./pages/ITSolutionsPage";
import Products from "./pages/Products";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import AdminLayout from "@/components/layouts/AdminLayout";
import Login from "./pages/admin/Login";
import AdminBlogs from "./pages/admin/AdminBlogs";
import BlogPost from "./pages/BlogPost";
// Admin Imports
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminMessages from "./pages/admin/AdminMessages";

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
                <Routes>
                    {/* --- PUBLIC ROUTES (Wrapped in PublicLayout) --- */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} />
                        <Route path="/robotics" element={<Robotics />} />
                        <Route path="/it-solutions" element={<ITSolutionsPage />} />
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
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;