import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  images: {
  remotePatterns: [
    { hostname: 'cdn.sanity.io' },
    { hostname: 'picsum.photos' },
    { hostname: 'i.ytimg.com' },
  ],
},
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default config
