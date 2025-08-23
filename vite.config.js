import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite';

// If you publish to GitHub Pages under username.github.io/repo, set base to './'
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
