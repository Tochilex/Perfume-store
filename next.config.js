/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  // Allow the pages router to coexist with the app directory
  experimental: {},
};

module.exports = nextConfig;
