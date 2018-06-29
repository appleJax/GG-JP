const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const path = require('path')

const { ADMIN_PW } = require('./.env.js').common

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
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
    new CopyWebpackPlugin([ { from: path.resolve(__dirname, 'src', 'admin') } ]),
    new webpack.DefinePlugin({
      'process.env.ADMIN_PW': JSON.stringify(ADMIN_PW)
    })
  ],
  resolve: {
    alias: {
      Admin:   path.resolve(__dirname, 'src/admin'),
      Anki:    path.resolve(__dirname, 'src/anki'),
      Config:  path.resolve(__dirname, 'src/config'),
      DB:      path.resolve(__dirname, 'src/db'),
      Models:  path.resolve(__dirname, 'src/db/models'),
      Src:     path.resolve(__dirname, 'src'),
      Twitter: path.resolve(__dirname, 'src/twitter'),
      Utils:   path.resolve(__dirname, 'src/utils')
    }
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  }
}
