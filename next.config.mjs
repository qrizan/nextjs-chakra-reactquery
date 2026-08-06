/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // `images` sengaja dihapus, bukan terlupa.
  // `next/image` tidak dipakai di mana pun, sementara pola lama
  // { protocol: 'https', hostname: '**', pathname: '**' } membuat
  // /_next/image jadi proxy gambar terbuka untuk siapa saja.
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
