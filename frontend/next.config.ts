import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com',
      'lh3.googleusercontent.com',
      'miro.medium.com',
      'avatar.vercel.sh',
      'ui-avatars.com',
      'www.popsci.com',
      'images.ctfassets.net'
    ],
  },
};

export default nextConfig;
