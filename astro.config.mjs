// @ts-check
import db from "@astrojs/db";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import mkcert from "vite-plugin-mkcert";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    isr: {
      exclude: [/^\/api\/?.*/]
    }
  }),
  integrations: [db(), icon(), sitemap()],
  vite: {
    plugins: [tailwindcss(), mkcert()]
  },
  image: {
    domains: ["picsum.photos", "apod.nasa.gov"]
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true
  },
  site: "https://meteors-ten.vercel.app",
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
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
        name: "Glacial Indifference",
        cssVariable: "--font-text"
      }
    ]
  }
});
