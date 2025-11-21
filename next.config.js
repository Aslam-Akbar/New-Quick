/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow all dev origins for Replit proxy compatibility
  experimental: {
    allowedDevOrigins: ['*'],
  },
};

module.exports = nextConfig;
