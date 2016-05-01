const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const lost         = require('lost');
const path         = require('path');
const rucksack     = require('rucksack-css');
const webpack      = require('webpack');

const config = {
  devtool: 'cheap-source-map',
  bail: true,

  entry: [
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    sourceMapFilename: '[file].map'
  },

  module: {

    loaders: [

      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
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
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|otf)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }

    ],

    noParse: /node_modules\/quill\/dist/
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'ENV': JSON.stringify('production')
      }
    })
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
