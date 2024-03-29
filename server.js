const config               = require('./webpack.config.js');
const express              = require('express');
const open                 = require('open');
const path                 = require('path');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Dashboard            = require('webpack-dashboard');
const DashboardPlugin      = require('webpack-dashboard/plugin');
const proxy                = require('express-http-proxy');

const compiler  = webpack(config);
const dashboard = new Dashboard();
compiler.apply(new DashboardPlugin(dashboard.setData));
const app       = express();


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  progress: true,
  noInfo: true,
  quiet: true,
  stats : {
    colours: true,
    timings: true,
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: () => {}
}));

app.use('/api', proxy('http://localhost:3000/api'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log('Error', err);
    return;
  }

  console.log('🐑 💨 💨 App served at http://localhost:8080.');
});
