import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Storybook збирається в public/storybook і відкривається за адресою /storybook.
  // Next.js не віддає index.html для теки, а Storybook вантажить файли відносними шляхами,
  // тому /storybook (і /storybook/) переадресовуємо прямо на /storybook/index.html.
  async redirects() {
    return [{ source: "/storybook", destination: "/storybook/index.html", permanent: false }];
  },
  cacheComponents: true,
  partialPrefetching: true,
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
