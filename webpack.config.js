const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv')
const webpack = require('webpack');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce(
  (prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);

    return prev;
  },
  {
    API_URL: JSON.stringify(process.env.API_URL),
    GOOGLE_ID: JSON.stringify(process.env.GOOGLE_ID),
  }
);

module.exports = {
  entry: join(__dirname, './src', 'main.tsx'),
  target: 'web',
  mode: 'production',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: join(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: './src/styles.css',
    }),
  ],
};
