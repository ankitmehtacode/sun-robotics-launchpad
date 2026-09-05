//
import { motion } from "framer-motion";

interface MapPlaceholderProps {
    variant?: "mapPin" | "globe";
    animate?: boolean;
    isInView?: boolean;
    heightClass?: string;
    className?: string;
}

export function MapPlaceholder({
                                   animate = true,
                                   isInView = true,
                                   heightClass = "h-[400px]",
                                   className = "",
                               }: MapPlaceholderProps) {

    // This specific format works in iframes without an API key
    // q = Query (Location)
    // t = Map Type (m = map)
    // z = Zoom Level (14 is good for street/area view)
    // output = embed (CRITICAL: This makes it work in iframe)
    const mapSrc = "https://maps.google.com/maps?q=22.696969,75.78662(Sun+Robotics+And+AI)&t=m&z=16&ie=UTF8&iwloc=&output=embed";

    const content = (
        <div className={`w-full h-full rounded-xl overflow-hidden shadow-lg border border-border bg-muted ${heightClass} ${className}`}>
            <iframe
                title="Sun Robotics Location"
                width="100%"
                height="100%"
                id="gmap_canvas"
                src={mapSrc}
                frameBorder="0"
                scrolling="no"
                style={{ border: 0, filter: "grayscale(0.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );

    if (animate) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full h-full"
            >
                {content}
            </motion.div>
        );
    }

    return content;
}