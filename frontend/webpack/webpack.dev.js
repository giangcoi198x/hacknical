const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./webpack.config.v3.js');
const PATH = require('../../config/path');

config.plugins.push(
  new ExtractTextPlugin("[name].bundle.css", {
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    minimize: true,
    options: {
      context: PATH.ROOT_PATH,
    }
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.SourceMapDevToolPlugin()
);
config.devtool = "cheap-module-eval-source-map";

module.exports = config;
