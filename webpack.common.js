const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const { ADMIN_PW } = require('./.env.js').common;

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/server.js'
  ],
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
    new CopyWebpackPlugin([ { from: __dirname + '/src/admin' } ]),
    new webpack.DefinePlugin({
      'process.env.ADMIN_PW': JSON.stringify(ADMIN_PW)
    })
  ],
  resolve: {
    alias: {
      Anki:    __dirname + '/src/anki',
      Config:  __dirname + '/src/config',
      DB:      __dirname + '/src/db',
      Models:  __dirname + '/src/db/models',
      Src:     __dirname + '/src',
      Twitter: __dirname + '/src/twitter',
      Utils:   __dirname + '/src/utils'
    }
  },
  output: {
    filename: 'server.js',
    path: __dirname + '/dist'
  }
};
