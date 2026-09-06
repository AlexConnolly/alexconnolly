import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is deferred (PLAN.md Q4): a custom domain and a user site both
// want "/", a project repo wants "/<repo>/". CI sets VITE_BASE.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
});
