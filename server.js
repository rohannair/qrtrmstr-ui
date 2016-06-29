const config               = require('./webpack.config.js');
const express              = require('express');
const open                 = require('open');
const path                 = require('path');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler             = webpack(config);
const app                  = express();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  progress: true,
  noInfo: true,
  quiet: false,
  stats : {
    colours: true,
    timings: true,
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log('Error', err);
    return;
  }

  console.log('App served at localhost:8080. Remember to use a subdomain!');
});
