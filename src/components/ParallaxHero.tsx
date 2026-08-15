import { Server, Cloud, Database, Code, Brain, BarChart3, Cpu, Shield } from "lucide-react";
import "./Parallax.css";

const scatter1 = [
  { Icon: Server, top: "18%", left: "12%", size: 64, rotate: -12 },
  { Icon: Cloud, top: "62%", left: "82%", size: 72, rotate: 8 },
  { Icon: Database, top: "72%", left: "18%", size: 56, rotate: 15 },
  { Icon: Code, top: "22%", left: "78%", size: 60, rotate: -6 },
];

const scatter2 = [
  { Icon: Brain, top: "20%", left: "80%", size: 68, rotate: 10 },
  { Icon: BarChart3, top: "68%", left: "14%", size: 60, rotate: -14 },
  { Icon: Cpu, top: "16%", left: "16%", size: 52, rotate: 6 },
];

const IconScatter = ({ icons }: { icons: typeof scatter1 }) => (
  <>
    {icons.map(({ Icon, top, left, size, rotate }, i) => (
      <Icon
        key={i}
        className="absolute text-primary/10"
        style={{ top, left, width: size, height: size, transform: `rotate(${rotate}deg)` }}
        strokeWidth={1}
      />
    ))}
  </>
);

const ParallaxHero = () => {
  return (
    <div className="parallax">
      {/* Group 1 — headline */}
      <div className="parallax__group">
        <div className="parallax__layer parallax__layer--deep">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>
        <div className="parallax__layer parallax__layer--back">
          <IconScatter icons={scatter1} />
        </div>
        <div className="parallax__layer parallax__layer--base">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                IT Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-4 mb-6">
                Enterprise-Grade IT for <span className="gradient-text">Smart Industries</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Custom APIs, Cloud Robotics, and ML-Driven Dashboards that power the factories of tomorrow.
              </p>
            </div>
          </div>
        </div>
        <div className="parallax__layer parallax__layer--fore">
          <div className="absolute bottom-[28%] right-[14%] glass-card px-5 py-3 rounded-full border border-primary/20">
            <span className="text-sm font-semibold text-primary">99.99% Uptime SLA</span>
          </div>
          <div className="parallax__scroll-hint">
            <span>Scroll to explore</span>
            <div className="parallax__scroll-arrow" />
          </div>
        </div>
      </div>

      {/* Group 2 — supporting statement */}
      <div className="parallax__group">
        <div className="parallax__layer parallax__layer--deep">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(14, 75%, 42%, 0.16), transparent)",
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <div className="parallax__layer parallax__layer--back">
          <IconScatter icons={scatter2} />
        </div>
        <div className="parallax__layer parallax__layer--base">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8">
                The software layer behind every Sun Robotics deployment.
              </p>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                {[
                  { value: "70%", label: "Less unplanned downtime" },
                  { value: "sub-ms", label: "API response latency" },
                  { value: "99.99%", label: "Platform uptime" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-display font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="parallax__layer parallax__layer--fore">
          <Shield
            className="absolute top-[20%] left-[10%] text-primary/15"
            style={{ width: 56, height: 56 }}
            strokeWidth={1}
          />
        </div>
      </div>

      {/* Group 3 — transition into the page */}
      <div className="parallax__group">
        <div className="parallax__layer parallax__layer--deep">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </div>
        <div className="parallax__layer parallax__layer--base">
          <p className="text-xl md:text-2xl font-display text-muted-foreground">
            Let's build what's next.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
