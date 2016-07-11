const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin   = require('stylelint-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');

const root = path.resolve();
const isProd = !!process.env.NODE_ENV === 'production';

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: !isProd,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  devFlagPlugin
];

const prodPlugins = [
  new HtmlWebpackPlugin({
    title: 'Quartermaster',
    template: path.join(root, 'src', 'assets', 'templates') + '/index.ejs',
    favicon: path.join(root, 'src', 'assets') + '/favicon.png',
    inject: 'body',
    minify: { collapseWhitespace: true }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false }
  }),
  new webpack.optimize.DedupePlugin(),
];

const devPlugins = [
  new StyleLintPlugin({
    configFile: './.stylelintrc',
    files: ['src/**/*.css'],
    failOnError: false,
  }),
  new webpack.HotModuleReplacementPlugin()
];

module.exports = plugins
  .concat(isProd ? prodPlugins : devPlugins);
