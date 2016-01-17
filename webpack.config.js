const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const lost         = require('lost');
const rucksack     = require('rucksack');
const webpack      = require('webpack');

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

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
        test  : /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },

      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|otf)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }

    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ],

  postcss: function() {
    return [lost, autoprefixer, precss];
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
