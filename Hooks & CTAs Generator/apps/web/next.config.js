/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@my-mvps/api'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true
  },
  // Ensure static export works properly
  distDir: 'build'
}

module.exports = nextConfig
