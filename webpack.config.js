const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const distDir = path.join(__dirname, 'dist');
const sourceDir = __dirname;

module.exports = {
  mode: "none",
  entry: {  server: './src/main.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/, nodeExternals()],
  output: {
    path: distDir,
    filename: 'server.bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      sourceDir,
      {}
    ),
    new CopyWebpackPlugin([
      {from: path.join(__dirname, 'views'), to: path.join(distDir, 'views')},
      {from: path.join(__dirname, 'assets'), to: path.join(distDir, 'assets')},
      {from: path.join(__dirname, '.data'), to: path.join(distDir, '.data')},
    ]/*, options*/)
  ]
};
