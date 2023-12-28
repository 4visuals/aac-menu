import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "dist",
    assetsDir: "",
    cssCodeSplit: false,
    sourcemap: true,
    minify: true,
    rollupOptions: {
      input: "./src/main.ts",
      output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        entryFileNames: "aac-menu.js",
        assetFileNames: "aac-menu.css",
      },
    },
  },
});
