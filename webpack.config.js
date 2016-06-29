const webpack      = require('webpack');
const path         = require('path');

const plugins = require('./webpack/plugins');
const postcss = require('./webpack/postcss');

const config = {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/public/',
  },

  module: {

    loaders: [
      { test: /\.jsx$/, loaders: ['babel'] },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: 'style-loader!css?-minimize!postcss' },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.(woff|woff2|ttf|eot)$/, loader: 'url-loader?prefix=font/&limit=5000' },
    ]
  },

  plugins: plugins,
  postcss: postcss,

  resolveLoader: {
    moduleDirectories: [
      './node_modules'
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  stats: {
    colors: true,
    timings: true,
    reasons: true
  },

};

module.exports = config;
