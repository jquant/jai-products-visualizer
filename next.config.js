/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en-US'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  images: {
    domains: ['myceliademo.blob.core.windows.net'],
  },
};

module.exports = nextConfig;
