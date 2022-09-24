// Generated using webpack-cli https://github.com/webpack/webpack-cli

const isProduction = process.env.NODE_ENV == "production";

module.exports = {
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  mode: isProduction ? "production" : "development",
};
