/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'supabase.co', // Add your Supabase CDN domain if using image storage
      // Add other image CDN domains here
    ],
    // Optimize images for better Core Web Vitals
    formats: ['image/avif', 'image/webp'],
    // Set a generous cache for images
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Optimize for search engines
  reactStrictMode: true,

  // Compression for better performance
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Security and SEO headers
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), geolocation=(), gyroscope=()',
          },
        ],
      },
    ]
  },

  // Redirect for trailing slashes
  trailingSlash: false,
}

module.exports = nextConfig


