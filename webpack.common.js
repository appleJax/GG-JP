const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/server.js'
  ],
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(__dirname + '/dist'),
    new CopyWebpackPlugin([ { from: 'src/static' } ])
  ],
  resolve: {
    alias: {
      Utils: __dirname + '/src/utils'
    }
  },
  output: {
    filename: 'server.js',
    path: __dirname + '/dist'
  }
};
