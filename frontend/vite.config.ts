import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // frontend - port
    proxy: {
      // any api performed on frontend ...
      "/api": {
        target: "http://localhost:5000", // must hit to server port ...
        changeOrigin: true, // ie. by changing origin.
      },
    },
  },
});
