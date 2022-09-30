// Generated using webpack-cli https://github.com/webpack/webpack-cli

const isDevelopment = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: isDevelopment ? "eval-source-map" : false,
  resolve: {
    extensions: [".tsx", ".ts", "..."],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true, // default to true, set it explicitly so I couuld leave comment
      // caused duplicated head tags when used with <%= htmlWebpackPlugin.tags.headTags %> in template
      // so either use this or use the template tags
    }),
    new MiniCssExtractPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(t|j)sx?$/, // https://github.com/Microsoft/TypeScript-React-Conversion-Guide#set-up-build-pipeline
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: "3.25",
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
    ],
  },
  mode: isDevelopment ? "development" : "production",
};
