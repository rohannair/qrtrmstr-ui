const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const lost         = require('lost');
const rucksack     = require('rucksack');

module.exports = {
  context: __dirname + '/src',

  cache: true,
  debug: true,
  devtool: 'eval-source-map',

  entry: {
    javascript: './index.js',
    html: './index.html'
  },

  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },

  module: {

    loaders: [

      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },

      {
        test  : /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }

    ]
  },

  postcss: function() {
    return [lost, autoprefixer, precss]
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

}
