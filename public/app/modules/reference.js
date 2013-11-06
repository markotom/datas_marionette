'use strict';

define([
  'app',
  'markdown',
  'modules/source',
  'paginator'
], function (app, markdown, Source, Paginator) {

  // Reference Object
  var Reference = {
    url: app.rest + '/references',
    Views: {}
  };

  // Reference Model
  Reference.Model = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: Reference.url,
    defaults: {
      _id: null,
      reference: null,
      pages: null,
      source: null,
      created_at: null,
      updated_at: null
    }
  });

  // Reference Collection
  //
  // Using Backbone.Paginator
  // https://github.com/backbone-paginator/backbone.paginator
  Reference.Collection = Paginator.clientPager.extend({
    model: Reference.Model,
    paginator_core: {
      dataType: 'json',
      url: Reference.url
    },
    paginator_ui: {
      firstPage: 1,
      currentPage: 1,
      perPage: 3,
      totalPages: 10,
      pagesInRange: 4
    },
    parse: function (results) {
      // Total pages for pagination purpose
      this.totalPages = Math.ceil(results.length / this.perPage);
      return results;
    },
    comparator: function (reference) {
      // Sort references descending by update
      return -new Date(reference.get("updated_at"));
    }
  });

  // Reference View Edit
  Reference.Views.Edit = Marionette.Layout.extend({
    template: 'reference/edit',
    regions: {
      editSource: '#editSource',
      selectSource: '#source-select'
    },
    events: {
      'submit form#reference-form': 'saveReference',
      'click .reference-close': 'closeReference'
    },
    onRender: function () {
      var that = this;

      // Fetch sources collection
      app.collections.sources.fetch({
        success: function (collection) {
          // Sort collection
          collection.sort();

          // Show source select element
          that.selectSource.show(new Source.Views.SelectList({
            model: that.model,
            collection: collection
          }));

          // Show modal of source form
          that.editSource.show(new Source.Views.Edit({
            collection: collection
          }));
        }
      });
    },
    saveReference: function (e) {
      e.preventDefault();

      var that = this;

      // Set shortcut form
      var form = this.$el;

      // Set data object
      var data = {
        reference: form.find('#reference-content').val(),
        source: form.find('#reference-source').val(),
        pages: form.find('#reference-pages').val(),
        updated_at: new Date()
      };

      // Get reference id
      var id = form.find('#reference-id').val();

      // Set reference model
      var reference = id ? this.model : new Reference.Model();

      // New reference
      if (!id) {
        data.created_at = new Date();
      }

      // Save reference
      reference.save(data, {
        success: function (model) {
          // Fetch references collection
          app.collections.references.fetch({
            success: function (collection) {
              // Set pager
              collection.pager();

              // Re-sort collection
              collection.setSort('updated_at', 'desc');
            }
          });

          // Re-render view
          that.render();
        }
      });

    },
    closeReference: function () {
      // Reset form reference
      app.layout.content.show(new Reference.Views.Edit({
        // Create empty reference instance
        model: new Reference.Model()
      }));

      return false;
    }
  });

  // Reference View Pagination Controls
  Reference.Views.Pagination = Marionette.ItemView.extend({
    template: 'partials/pagination',
    events: {
      'click .prev': 'gotoPrev',
      'click .next': 'gotoNext',
      'click .page': 'gotoPage',
    },
    gotoPrev: function () {
      // Go to previous page
      this.collection.prevPage();

      // Re-render pagination controls
      this.render();

      return false;
    },
    gotoPage: function (e) {
      // Get page number
      var page = $(e.target).text();

      // Go to page
      this.collection.goTo(page);

      // Re-render pagination controls
      this.render();

      return false;
    },
    gotoNext: function (e) {
      // Go to next page
      this.collection.nextPage();

      // Re-render pagination controls
      this.render();

      return false;
    },
    serializeData: function () {
      // Send information to view
      return this.collection;
    },
    initialize: function () {
      // Re-render if collection trigger `all` event
      this.listenTo(this.collection, 'all', this.render);
    }
  });

  // Loading View
  Reference.Views.Loading = Marionette.ItemView.extend({
    template: 'partials/loading'
  });

  // Reference View Item
  Reference.Views.Item = Marionette.ItemView.extend({
    className: 'well',
    template: 'reference/item',
    templateHelpers: function () {
      return {
        markdown: function (str) {
          // Compile markdown syntax
          return markdown.toHTML(str);
        }
      };
    },
    events: {
      'click .reference-edit': 'showForm',
      'click .reference-destroy': 'destroyReference'
    },
    showForm: function () {
      // Reset form reference
      app.layout.content.show(new Reference.Views.Edit({
        // Set current model
        model: this.model
      }));

      return false;
    },
    destroyReference: function () {

      if (confirm("¿Estás seguro?")) {
        // Destroy model
        this.model.destroy();
      }

      return false;
    }
  });

  // Reference View List
  Reference.Views.List = Marionette.CollectionView.extend({
    template: 'reference/list',
    emptyView: Reference.Views.Loading,
    itemView: Reference.Views.Item,
    initialize: function () {
      var that = this;
      // Close empty view after synced
      this.listenTo(this.collection, 'sync', function () {
        that.closeEmptyView();
        that.emptyView = null;
      });
    }
  });

  // Reference View Search Form
  Reference.Views.SearchForm = Marionette.ItemView.extend({
    template: 'reference/search-form',
    events: {
      'keyup input': 'search'
    },
    search: function (e) {
      // Get value of input text
      var words = $(e.currentTarget).val();

      // Set filter (levenshtein method)
      app.collections.references.setFilter({
        reference: {
          cmp_method: 'levenshtein',
          max_distance: 7
        }
      }, words);
    }
  });

  // Reference View Search
  Reference.Views.Search = Marionette.Layout.extend({
    template: 'reference/search',
    regions: {
      pages: '.pages',
      list: '.list',
      search: '.search-form',
    },
    onRender: function () {
      var that = this;

      // Show references list in .list
      this.list.show(new Reference.Views.List({
        collection: app.collections.references
      }));

      // Show search form
      this.search.show(new Reference.Views.SearchForm());

      // Fetch references
      app.collections.references.fetch({
        success: function (collection) {
          // Set pager
          collection.pager();

          // Show pagination controls in .pages
          that.pages.show(new Reference.Views.Pagination({
            collection: collection
          }));
        }
      });

    }
  });

  return Reference;

});
