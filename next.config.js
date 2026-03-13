/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    unoptimized: false,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
