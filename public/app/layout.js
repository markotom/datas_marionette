'use strict';

define([
  'app'
], function (app) {

  var Layout = {};

  // Main Layout
  Layout.Main = Marionette.Layout.extend({
    template: 'layout',
    regions: {
      references: '#references',
      content: '#content'
    },
    onRender: function () {
      $("[data-toggle=popover]").popover();
    }
  });

  // Header Layout
  Layout.Header = Marionette.Layout.extend({
    template: 'header'
  });

  // Footer Layout
  Layout.Footer = Marionette.Layout.extend({
    template: 'footer'
  });

  return Layout;

});
