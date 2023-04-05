/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/web3/:path*",
        destination: "https://edu-nft-demo.onrender.com/api/auth/web3/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
