/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'static.vecteezy.com',
      'upload.wikimedia.org',
      'i.pinimg.com',
      'cdn.worldvectorlogo.com',
      'freelogopng.com'
    ],
  },
}

module.exports = nextConfig
