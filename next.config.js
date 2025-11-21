/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow all hosts for Replit proxy compatibility
  experimental: {
    allowedOrigins: ['*'],
  },
};

module.exports = nextConfig;
