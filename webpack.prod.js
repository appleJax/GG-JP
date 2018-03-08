const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const webpack = require('webpack');
const { BOT_URL, UI_URL } = require('./.env.js').prod;

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'BOT_URL':              JSON.stringify(BOT_URL),
      'UI_URL':               JSON.stringify(UI_URL)
    })
  ]
});
