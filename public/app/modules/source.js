'use strict';

define(['app'], function (app) {

  // Source Object
  var Source = {
    url: app.rest + '/sources',
    Views: {}
  };

  // Source Model
  Source.Model = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: Source.url,
    defaults: {
      _id: null,
      title: null,
      publisher: null,
      date: null,
      author: null,
      created_at: null,
      updated_at: null
    }
  });

  // Source Collection
  Source.Collection = Backbone.Collection.extend({
    model: Source.Model,
    url: Source.url,
    comparator: function (source) {
      // Sort sources ascending by author
      return source.get("author").toLowerCase();
    }
  });

  // Source View Edit
  Source.Views.Edit = Marionette.Layout.extend({
    template: 'source/edit',
    events: {
      'submit form#source-form': 'saveSource'
    },
    onRender: function () {

      // Input text
      var input = this.$el.find('#source-author');

      // Destroy previously initialized typeahead
      input.typeahead('destroy');

      // Pluck authors from sources collection
      var authors = app.collections.sources.pluck("author");

      // Set typeahead
      input.typeahead({
        name: 'authors',
        local: _.uniq(authors)
      });

    },
    saveSource: function (e) {
      e.preventDefault();

      var that = this;

      // Modal
      var modal = this.$el.closest('#editSource').find('.modal');

      // Set shortcut form
      var form = this.$el;

      // Set data object
      var data = {
        title: form.find('#source-title').val(),
        author: form.find('#source-author').val(),
        publisher: form.find('#source-publisher').val(),
        date: form.find('#source-date').val(),
        updated_at: new Date()
      };

      // Get source id
      var id = form.find('#source-id').val();

      // Set source model
      var source = new Source.Model();

      // New source
      if (!id) {
        data.created_at = new Date();
      }

      // Save Source
      source.save(data, {
        success: function (model) {
          // Fetch collection
          app.collections.sources.fetch();

          // Re-sort collection
          app.collections.sources.sort();

          // Hide modal
          modal.modal('hide');

          // Re-render view
          that.render();
        }
      });

    }
  });

  // Source View Select Item
  Source.Views.SelectItem = Marionette.ItemView.extend({
    tagName: 'option',
    template: 'source/option',
    onRender: function () {

      // Get `_id` from current model
      var id = this.model.get('_id');

      // Get source from selected model
      var source = this.options.selected.get('source') || {};

      // Set `value` property of option element
      this.$el.prop('value', id);

      // If this.model is equal to selected model
      if (id === source._id) {
        // Set `selected`
        this.$el.prop('selected', 'selected');
      }

    }
  });

  // Source View Select List
  Source.Views.SelectList = Marionette.CollectionView.extend({
    tagName: 'select',
    className: 'form-control',
    itemView: Source.Views.SelectItem,
    itemViewOptions: function () {
      // Send current model to itemView
      return { selected: this.model };
    },
    initialize: function () {
      // Set `id` property of select element
      this.$el.prop('id', 'reference-source');

      // Add default option of select element
      this.$el.prepend('<option>Seleccionar fuente</option>');

      // Re-render to sort source collection
      this.listenTo(this.collection, 'sort', this.render);
    }
  });

  return Source;

});
