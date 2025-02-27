/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: process.env.NODE_ENV === 'production' ? '/habit-visualizer' : '',  // Set base path for GitHub Pages
  images: {
    unoptimized: true,  // Required for static export
  },
}

module.exports = nextConfig
