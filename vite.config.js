import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // important: must match gh-pages -d path
  },
  base: "/docBot/", // important: repo name for GitHub Pages
});
