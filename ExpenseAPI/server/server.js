'use strict';
var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

var staticRoot = path.resolve(__dirname, '..', 'client');

app.all('/*', function(req, res, next) {
  // Everything starting with /api passes through
  if (req.url.startsWith('/apiexp')) {
      return next();
  }

  let isAsset = req.url.match(/\/(.*\.(js|css|map|png|svg|jpg|xlsx))\??/);
  if (isAsset) {
      return res.sendFile(isAsset[1], {root: staticRoot });
  }
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: staticRoot });
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


