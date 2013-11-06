'use strict';

define(['app'], function (app) {

  // App Router
  var Router = Marionette.AppRouter.extend({

    // Routes
    appRoutes: {
      '': 'index'
    }

  });

  return Router;

});
