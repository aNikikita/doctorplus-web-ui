/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // Ensure proper routing for all pages
  trailingSlash: false,
  // Remove 'standalone' for Vercel - it's for self-hosted deployments
  // output: 'standalone',
}

module.exports = nextConfig
