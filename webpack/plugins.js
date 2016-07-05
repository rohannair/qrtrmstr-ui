const webpack       = require('webpack');
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
];

if (isProd) {
  plugins.push(new HtmlWebpackPlugin({
    title: 'Quartermaster',
    template: path.join(__dirname, 'src', 'assets', 'templates') + '/index.ejs',
    favicon: path.join(__dirname, 'src', 'assets') + '/favicon.png',
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
  plugins.push(devFlagPlugin)
}

module.exports = plugins;
