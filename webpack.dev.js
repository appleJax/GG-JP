const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const {
  BOT_URL,
  DM_URL,
  TWITTER_ACCOUNT,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_TOKEN,
  TWITTER_TOKEN_SECRET,
  ORIGIN_URL,
  UI_URL
} = require('./.env.js').dev;

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':             JSON.stringify('dev'),
      'process.env.BOT_URL':              JSON.stringify(BOT_URL),
      'process.env.DM_URL':               JSON.stringify(DM_URL),
      'process.env.TWITTER_ACCOUNT':      JSON.stringify(TWITTER_ACCOUNT),
      'process.env.TWITTER_API_KEY':      JSON.stringify(TWITTER_API_KEY),
      'process.env.TWITTER_API_SECRET':   JSON.stringify(TWITTER_API_SECRET),
      'process.env.TWITTER_TOKEN':        JSON.stringify(TWITTER_TOKEN),
      'process.env.TWITTER_TOKEN_SECRET': JSON.stringify(TWITTER_TOKEN_SECRET),
      'process.env.ORIGIN_URL':           JSON.stringify(ORIGIN_URL),
      'process.env.UI_URL':               JSON.stringify(UI_URL)
    })
  ]
});
