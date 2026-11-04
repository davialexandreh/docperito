import type { NextConfig } from "next";

// Subcaminho onde o site é servido (ex.: "/docperito" no GitHub Pages sem domínio próprio).
// Vazio quando servido na raiz do domínio (www.docperito.com.br). Definido no build pela variável BASE_PATH.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta `out/`.
  output: "export",
  basePath,
  // Imagens em <img>/<picture> não recebem o basePath automaticamente; ver `asset()` em src/content/site.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Sem servidor não há otimização de imagem em tempo real;
  // as imagens são pré-geradas por `npm run images` (scripts/optimize-images.mjs).
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
