import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import rspack from '@rspack/core';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

console.log('v', isRunningWebpack ? webpack.version : rspack.rspackVersion);

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  devtool: 'source-map',
  plugins: [
    new (isRunningWebpack ? HtmlWebpackPlugin : rspack.HtmlRspackPlugin)({
      template: "./index.html"
    }),

  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler',
              implementation: 'sass-embedded',
              sassOptions: {
                loadPaths: [path.resolve(__dirname, 'src', 'scss')],
              },
            },
          },
        ],
        type: 'css/auto',
      },
    ]
  },
  experiments: {
    css: true,
  },
};

export default config;
