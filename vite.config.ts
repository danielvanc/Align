import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
  build: { manifest: true },
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      manifest: true,
      ignoredRouteFiles: ["**/.*"],
    }),
    tsconfigPaths(),
  ],
});
