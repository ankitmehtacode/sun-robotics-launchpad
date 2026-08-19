import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Robotics",
    href: "/robotics",
    dropdown: [
      { name: "Industrial Robots", href: "/robotics#industrial" },
      { name: "AI Vision Systems", href: "/robotics#ai-brain" },
    ],
  },
  { name: "IT Solutions", href: "/sunitservices" },
  { name: "Products", href: "/products" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  const isActive = (href: string) => {
    const basePath = href.split("#")[0];
    if (basePath === "/") return location.pathname === "/";
    return location.pathname.startsWith(basePath);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const isHashLink = (href: string) => href.includes("#");

  const renderNavLink = (
    href: string,
    children: React.ReactNode,
    className: string,
    onClick?: () => void,
    key?: string
  ) => {
    const commonProps = {
      className,
      onClick: () => {
        onClick?.();
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      },
    };

    if (isHashLink(href)) {
      return (
        <HashLink key={key ?? href} to={href} smooth {...commonProps}>
          {children}
        </HashLink>
      );
    }

    return (
      <Link key={key ?? href} to={href} {...commonProps}>
        {children}
      </Link>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 py-5"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Sun Robotics Logo"
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg font-display font-bold text-foreground hidden sm:inline">
                Sun <span className="text-primary">Robotics</span> & AI
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation — floating pill capsule */}
          <nav
            className="hidden lg:flex items-center gap-1 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md px-1 py-1"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    aria-expanded={activeDropdown === link.name}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 text-xs font-medium tracking-wide rounded-lg px-4 py-2 transition-colors cursor-pointer ${
                      isActive(link.href)
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  renderNavLink(
                    link.href,
                    link.name,
                    `block text-xs font-medium tracking-wide rounded-lg px-4 py-2 transition-colors ${
                      isActive(link.href)
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  )
                )}

                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      role="menu"
                      aria-label={`${link.name} submenu`}
                      className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-white/10 bg-black/90 backdrop-blur-md p-1.5"
                    >
                      {link.dropdown.map((item) =>
                        renderNavLink(
                          item.href,
                          item.name,
                          "block w-full text-left px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-xl bg-primary text-primary-foreground text-xs font-semibold tracking-wide px-5 py-2.5 hover:bg-primary/90 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-black/60 backdrop-blur-md text-foreground cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-2 mx-4 rounded-xl border border-white/10 bg-black/90 backdrop-blur-md overflow-hidden"
          >
            <div className="p-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        aria-expanded={activeDropdown === link.name}
                        aria-haspopup="true"
                        className={`flex items-center justify-between w-full rounded-lg px-3 py-3 text-sm font-medium cursor-pointer ${
                          isActive(link.href) ? "bg-white/10 text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            role="menu"
                            className="pl-3 space-y-1"
                          >
                            {link.dropdown.map((item) =>
                              renderNavLink(
                                item.href,
                                item.name,
                                "block w-full text-left rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    renderNavLink(
                      link.href,
                      link.name,
                      `block w-full text-left rounded-lg px-3 py-3 text-sm font-medium ${
                        isActive(link.href) ? "bg-white/10 text-foreground" : "text-muted-foreground"
                      }`
                    )
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full mt-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold px-4 py-3 hover:bg-primary/90 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
