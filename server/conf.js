'use strict';

define(['underscore'], function (_) {

  var environment,
      defaults,
      development,
      production;

  defaults = {
    api: '/api/1.0/',
    port: 3000,
    session: {
      secret: 'P=~g8+Cf{Lz&HO,P',
      maxAge: 18000000
    },
    mongo : {
      user : '',
      pass : '',
      host : 'localhost',
      port : 27017,
      db   : 'datas',
      url  : 'mongodb://localhost:27017/datas'
    }
  };

  development = _.defaults({}, defaults);

  production = _.defaults({
    mongo: {
      user : 'datas',
      pass : '12345',
      host : 'paulo.mongohq.com',
      port : 10003,
      db   : 'datas',
      url  : 'mongodb://datas:12345@paulo.mongohq.com:10003/datas'
    }
  }, defaults);


  if ('production' === process.env.NODE_ENV) {
    environment = production;
  } else {
    environment = development;
  }

  return environment;

});
