const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: {
    server: './src/server.js'
  },
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(__dirname + '/dist'),
    new CopyWebpackPlugin([ { from: 'src/static' } ]),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  output: {
    filename: 'server.js',
    path: __dirname + '/dist'
  }
};
