import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: false,
    minify: "esbuild",
    sourcemap: false,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
  },
  server: {
    port: 5174,
    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
