/**
 * @type {import('next').NextConfig}
 */
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // reactStrictMode: true,
  images: {
    /* This is because imageSizes is only used when generating the 1x/2x/3x srcSet for layout="fixed" or layout="intrinsic".

    The deviceSizes are used for layout="responsive" and layout="fill" which generates a srcSet with all the device sizes. */
    imageSizes: [16, 32, 48, 64], // This array is concatenated to deviceSizes.
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Next.js default
    deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // default
    domains: [
      'api.radimercado.com',
      'source.unsplash.com',
      '45.177.127.117',
      '45.177.127.116',
      'wise.radimercado.com'
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      type: 'asset/inline'
    });
    return config;
  },
}

module.exports = withPlugins(
  [],
  nextConfig
);
