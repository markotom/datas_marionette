'use strict';

var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname + '/server'
});

requirejs([
  'conf',
  'express',
  'models/index'
], function(conf, express, models){

  var server  = module.exports = express(),
      listen  = server.listen(process.env.PORT || conf.port),
      Session = require('connect-mongo')(express);

  // All environments
  server.configure(function () {
    server.use(express.query());
    server.use(express.bodyParser());
    server.use(express.cookieParser());
    server.use(express.methodOverride());

    // Compile less files
    server.use(require('less-middleware')({
      src: __dirname + '/public',
      yuicompress: true
    }));

    // ejs for main file
    server.set("view engine", "ejs");
    server.set('views', __dirname + '/public');

    // Static files
    server.use(express.static(__dirname + '/public'));

  });

  // Development
  server.configure('development', function () {
    // Sessions
    server.use(express.session({
      secret: conf.session.secret,
      cookie: { maxAge: conf.session.maxAge }
    }));

    // Logger
    server.use(express.logger('dev'));
    server.use(express.errorHandler());
  });

  // Production
  server.configure('production', function () {
    // Sessions
    server.use(express.session({
      secret: conf.session.secret,
      cookie: { maxAge: conf.session.maxAge },
      store: new Session({ url: conf.mongo.url })
    }));

    // Logger
    server.use(express.logger());

    // Enable cache
    server.enable('view cache');
  });

  // Router
  server.use(server.router);

  // Main route
  server.get('/', function (req, res) {
    res.render('index');
  });

  // Rest API
  models.forEach(function (model) {
    model.register(server, conf.api + model.slug || model.modelName);
  });

});
