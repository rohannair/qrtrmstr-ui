const webpack = require('webpack');
const path    = require('path');
const root = path.resolve();

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: process.env.DEBUG || 'false'
});
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
];

plugins.push(devFlagPlugin)

if (isProd) {
  plugins.push(new HtmlWebpackPlugin({
    title: 'Quartermaster',
    template: path.join(root, 'src', 'assets', 'templates') + '/index.ejs',
    favicon: path.join(root, 'src', 'assets') + '/favicon.png',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  }));

  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false }
  }));

  plugins.push(new webpack.optimize.DedupePlugin());
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());

}

module.exports = plugins;
