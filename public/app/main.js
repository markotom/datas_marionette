'use strict';

requirejs.config({
  baseUrl: 'app/',
  paths: {
    templates     : '../js/templates',
    jquery        : '../components/jquery/jquery.min',
    bootstrap     : '../components/bootstrap/dist/js/bootstrap.min',
    underscore    : '../components/underscore/underscore-min',
    backbone      : '../components/backbone/backbone-min',
    marionette    : '../components/backbone.marionette/lib/backbone.marionette.min',
    paginator     : '../components/backbone.paginator/lib/backbone.paginator',
    markdown      : '../components/markdown/lib/markdown',
    typeahead     : '../components/typeahead.js/dist/typeahead.min'
  },
  shim: {
    app: ['marionette', 'bootstrap'],
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone', 'templates', 'typeahead', 'markdown'],
      exports: 'Marionette'
    },
    paginator: {
      deps: ['backbone'],
      exports: 'Backbone.Paginator'
    },
    typeahead: {
      deps: ['jquery'],
      exports: 'markdown'
    },
    markdown: { exports: 'markdown' },
    bootstrap: ['jquery']
  }
});

require([
  'app',
  'router',
  'controller'
], function (app, Router, Controller) {

  // Initializer
  app.addInitializer(function () {

    // Router
    app.router = new Router({
      // Controller
      controller: new Controller()
    });

  });

  // Start
  app.start({
    root: window.location.pathname,
    path_root: '/'
  });

});
