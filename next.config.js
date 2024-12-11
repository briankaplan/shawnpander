const fs = require('fs')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.mzstatic.com',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  }
}

module.exports = nextConfig
