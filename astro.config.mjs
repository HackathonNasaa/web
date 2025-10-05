// @ts-check
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import mkcert from "vite-plugin-mkcert";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    isr: {
      exclude: [/^\/api\/?.*/]
    }
  }),
  integrations: [db(), icon(), sitemap(), partytown()],
  vite: {
    plugins: [tailwindcss(), mkcert()],
  },
  image: {
    domains: ["picsum.photos", "apod.nasa.gov"]
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true
  },
  site: "https://meteors-ten.vercel.app",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Zen Dots",
        cssVariable: "--font-title"
      },
      {
        provider: fontProviders.google(),
        name: "Glacial Indifference",
        cssVariable: "--font-text"
      }
    ]
  }
});