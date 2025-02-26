import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "www.slideegg.com" },
      { hostname: "www.slideplayer.com" },
      { hostname: "www.collidu.com" },
      { hostname: "www.docsity.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;