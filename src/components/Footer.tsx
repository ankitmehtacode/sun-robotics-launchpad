import { motion } from "framer-motion";
import { Bot, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface FooterLink {
  name: string;
  href: string;
}

const footerLinks: Record<string, FooterLink[]> = {
  solutions: [
    { name: "Industrial Robotics", href: "/robotics#industrial" },
    { name: "IT Solutions", href: "/sunitservices" },
    { name: "AI Systems", href: "/robotics#ai-brain" },
    { name: "Products", href: "/products" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    // { name: "Cookie Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/sunroboticsandai/" },
  // { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  // { name: "GitHub", icon: Github, href: "https://github.com" },
];

// Helper to determine if link has hash
const isInternalHashLink = (href: string) => href.includes("#");

// Render a footer navigation link
const FooterNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const className = "text-muted-foreground hover:text-primary transition-colors";

  if (isInternalHashLink(href)) {
    return (
      <HashLink to={href} smooth className={className}>
        {children}
      </HashLink>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
                  <img
                      src="/logo.png"
                      alt="Sun Robotics Logo"
                      className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                <span className="text-xl font-display font-bold text-foreground">
                  Sun <span className="neon-text">Robotics</span> & AI
                </span>
              </motion.div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Building the future of industrial automation with cutting-edge AI
              and robotics solutions for enterprises worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page`}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Solutions
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <FooterNavLink href={link.href}>{link.name}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <FooterNavLink href={link.href}>{link.name}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <FooterNavLink href={link.href}>{link.name}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Sun Robotics & AI Private Limited. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with precision in Indore, India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};
