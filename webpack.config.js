const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const lost         = require('lost');
const path         = require('path');
const rucksack     = require('rucksack-css');
const webpack      = require('webpack');

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

const config = {
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/public/',
  },

  module: {

    loaders: [

      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel-loader'],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },

      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },

      {
        test: /\.(png|jpg|otf)$/,
        loader: 'file-loader'
      }

    ],

    noParse: /node_modules\/quill\/dist/
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ],

  postcss: function() {
    return [
      lost,
      rucksack({
        autoprefixer: true
      }),
      precss
    ];
  },

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
    reasons: true
  },

};

module.exports = config;
