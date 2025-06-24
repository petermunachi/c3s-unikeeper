const { NEXT_PUBLIC_API_HOST } = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_HOST
  },
}

module.exports = nextConfig
