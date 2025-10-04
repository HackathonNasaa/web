// @ts-check
import db from "@astrojs/db";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [db(), icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true
  }
});
