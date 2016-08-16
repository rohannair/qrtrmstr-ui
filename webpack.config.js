const webpack      = require('webpack');
const path         = require('path');

const plugins = require('./webpack/plugins');
const postcss = require('./webpack/postcss');

const isProd = process.env.NODE_ENV === 'production';
const entry = isProd
? { app: './src/index.js' }
: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './src/index.js'];

const config = {
  cache: !isProd,
  debug: !isProd,
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  bail: isProd,

  entry: entry,
  eslint: {
    configFile: './.eslintrc'
  },

  output: isProd
  ? {
    path: path.join(__dirname, 'public'),
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename:'[id].chunk.js',
    publicPath: '/'
  }
  : {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/public/',
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: [
          path.join(__dirname, 'node_modules')
        ]
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: [
          path.join(__dirname, 'node_modules')
        ],
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
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
