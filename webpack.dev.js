const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const { BOT_URL, UI_URL } = require('./.env.js').dev;

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev'),
      'BOT_URL':              JSON.stringify(BOT_URL),
      'UI_URL':               JSON.stringify(UI_URL)
    })
  ]
});
