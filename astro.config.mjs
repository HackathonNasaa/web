// @ts-check
import db from "@astrojs/db";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
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
  image: {
    domains: ["picsum.photos"]
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Zen Dots",
        cssVariable: "--font-title"
      },
      {
        provider: fontProviders.google(),
        name: "Kanit",
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
        cssVariable: "--font-text"
      }
    ]
  }
});
