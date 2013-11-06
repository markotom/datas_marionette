'use strict';

define([
  'app',
  'layout',
  'modules/reference',
  'modules/source'
], function (app, Layout, Reference, Source) {

  // Initializer
  app.addInitializer(function () {

    // Set Collections
    app.collections = {
      references: new Reference.Collection(),
      sources: new Source.Collection()
    };

    // Set Main Layout
    app.layout = new Layout.Main();

    // Set Header Layout
    app.layout.header = new Layout.Header();

    // Set Footer Layout
    app.layout.footer = new Layout.Footer();

  });

  // Controller
  var Controller = Marionette.Controller.extend({

    initialize: function () {

      // Show header
      app.header.show(app.layout.header);

      // Show footer
      app.footer.show(app.layout.footer);

    },

    // Index
    index: function () {

      // Show Main Layout
      app.main.show(app.layout);

      // Show form reference
      app.layout.content.show(new Reference.Views.Edit({
        // Create empty reference instance
        model: new Reference.Model()
      }));

      // Show search layout in references region
      app.layout.references.show(new Reference.Views.Search());

    }
    
  });

  return Controller;

});
