import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, LucideIcon } from "lucide-react";

interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

const defaultContactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "info@sunroboticsandai.in.",
    href: "mailto:info@sunroboticsandai.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8144426440",
    href: "tel:+918144426440",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Jawahar Tekri, Sinhasa, Indore, India",
    href: "https://www.google.com/maps/place/Sun+Robotics+And+AI/@22.696969,75.78662,17z/data=!3m1!4b1!4m6!3m5!1s0x3962fb12cafca601:0x786226d5dd84df3e!8m2!3d22.696969!4d75.78662!16s%2Fg%2F11xvsdzpc2",
  },
];

const extendedContactInfo: ContactInfoItem[] = [
  ...defaultContactInfo,
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Sat: 9:00 AM - 6:00 PM IST",
    href: null,
  },
];

interface ContactInfoProps {
  /** Show extended info including business hours */
  extended?: boolean;
  /** Enable animation */
  animate?: boolean;
  /** Is the parent section in view (for animations) */
  isInView?: boolean;
  /** Custom class name */
  className?: string;
}

export function ContactInfo({
  extended = false,
  animate = true,
  isInView = true,
  className = "",
}: ContactInfoProps) {
  const items = extended ? extendedContactInfo : defaultContactInfo;

  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((info, index) => {
        const content = (
          <>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <info.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
              <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                {info.value}
              </div>
            </div>
          </>
        );

        const baseClasses = "flex items-start gap-4 p-6 glass-card rounded-xl";
        const isExternalLink = info.label === "Address";

        if (animate) {
          if (info.href) {
            return (
              <motion.a
                key={info.label}
                href={info.href}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`${baseClasses} glow-card group cursor-pointer`}
              >
                {content}
              </motion.a>
            );
          }

          return (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className={baseClasses}
            >
              {content}
            </motion.div>
          );
        }

        // Non-animated version
        if (info.href) {
          return (
            <a
              key={info.label}
              href={info.href}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
              className={`${baseClasses} glow-card group cursor-pointer`}
            >
              {content}
            </a>
          );
        }

        return (
          <div key={info.label} className={baseClasses}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
