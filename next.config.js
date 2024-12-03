const fs = require('fs')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'open.spotify.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'shawnpander.com'],
    },
  },
  webpack: (config, { dev, isServer }) => {
    // Ensure cache directory exists
    const cacheDir = path.join(process.cwd(), '.next', 'cache', 'webpack')
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true })
    }

    // Optimize webpack caching
    config.cache = {
      type: 'filesystem',
      version: `${process.env.NODE_ENV}_${process.version}`,
      cacheDirectory: cacheDir,
      store: 'pack',
      buildDependencies: {
        config: [__filename]
      },
      compression: 'gzip'
    }

    return config
  },
  // Add cache management to build process
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig
