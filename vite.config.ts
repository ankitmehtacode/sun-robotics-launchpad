import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 5173, // Change this from 8080 to 5173
        hmr: {
            overlay: false,
        },
        // Add this Proxy so requests to /api go to the Backend
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    build: {
        rollupOptions: {
            output: {
                // Framework code changes far less often than app code; a
                // separate chunk keeps it cached across deploys.
                manualChunks: {
                    react: ["react", "react-dom", "react-router-dom"],
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));