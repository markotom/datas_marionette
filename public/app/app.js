'use strict';

define(['marionette'], function (Marionette) {

  var App = new Marionette.Application();

  // Regions
  App.addRegions({
    header  : '#header',
    main    : '#main',
    footer  : '#footer'
  });

  // After initialize
  App.on('initialize:after', function (options) {
    Backbone.history.start();

    // Config language of moment.js
    moment.lang('es');
  });

  // Templates
  Marionette.Renderer.render = function (template, data) {
    if (!JST[template]) {
      throw "Template '" + template + "' not found!";
    }
    return JST[template](data);
  };

  // Rest API Version
  App.rest = 'api/1.0';

  return App;

});
