/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true
  },
  images: {
    domains: ["pub-3de1c44a6b3a48f58ed7e67c5e67fdff.r2.dev"]
  }
};

module.exports = nextConfig;
