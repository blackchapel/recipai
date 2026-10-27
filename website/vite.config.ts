import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// SITE_BASE: the path the site is served from. "/" for a domain of its own
// (the default); "/recipai/" for a GitHub Pages project site.
export default defineConfig({
  base: process.env.SITE_BASE || "/",
  plugins: [react()],
  build: { target: "es2022" },
});
