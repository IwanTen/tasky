import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api/v1/tasks": "http://localhost:5000/",
    },
  },
  plugins: [react()],
});
