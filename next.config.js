/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === "production";

const config = {
  productionBrowserSourceMaps: true, //to enable browser source map generation during the production build
  eslint: {
    dirs: ["src"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: ["res.cloudinary.com", "localhost", "drive.google.com"],
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error'],
  //   },
  // },
  reactStrictMode: true,
  // swcMinify: true,
  // pwa: {
  //   disable: prod ? false : true,
  //   dest: 'public',
  //   register: true,
  //   mode: 'production',
  //   // skipWaiting: true,
  //   // runtimeCaching,
  // },
  // devIndicators: {
  //   autoPrerender: false,
  // },
  /* next.config.js : webpack extension */
};

module.exports = config;
