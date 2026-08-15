import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// index.html ships static meta/canonical/JSON-LD tags for crawlers that never
// execute JS. Once React is actually running, per-page <SEO> data (see
// src/components/SEO.tsx) is authoritative — react-helmet-async only adds its
// own tags, it doesn't remove these, so drop them here to avoid duplicates.
document.querySelectorAll("[data-static-fallback]").forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
