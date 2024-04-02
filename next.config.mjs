/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },  
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },  
    ];
  },
  async redirects() {
    return [
      {
        source: '/game',
        destination: '/',
        permanent: true,
      },
      {
        source: '/genre',
        destination: '/',
        permanent: true,
      },      
    ]
  },  
};

export default nextConfig;
