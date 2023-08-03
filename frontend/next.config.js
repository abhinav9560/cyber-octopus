/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
const { i18n } = require("./next-i18next.config");

const webpack = require("webpack");
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  i18n,
  images: {
    domains: ["http:/localhost:2500", "localhost", "http:/localhost"],
  },
  generateEtags: false,
};
