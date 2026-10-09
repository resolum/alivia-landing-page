// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://alivia-landing-page.vercel.app/",

  image: {
    service: passthroughImageService(),
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/en": "/",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
