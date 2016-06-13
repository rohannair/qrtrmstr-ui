const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const lost         = require('lost');
const path         = require('path');
const rucksack     = require('rucksack-css');
const webpack      = require('webpack');

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify('false')
});

const config = {
  devtool: 'cheap-source-map',
  bail: true,

  entry: [
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.[hash].js',
    sourceMapFilename: '[file].map'
  },

  module: {

    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['babel'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
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
        test: /\.(png|jpg|gif|otf)$/,
        loader: 'file!img'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'ENV': JSON.stringify('production')
      }
    }),
    function() {
      this.plugin('done', function(stats) {
        require('fs').writeFileSync(
          path.join(__dirname, 'stats.json'),
          stats.toJson().hash
        );
      });
    },
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
};

module.exports = config;
