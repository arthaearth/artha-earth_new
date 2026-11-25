import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Storybook лежить у public/storybook; без цього /storybook дає 404.
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
