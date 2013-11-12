'use strict';

define(['app'], function (app) {

  // Comment Object
  var Comment = {
    url: app.rest + '/comments',
    Views: {}
  };

  // Comment Model
  Comment.Model = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: Comment.url,
    defaults: {
      _id: null,
      comment: null,
      reference: null,
      created_at: null,
      updated_at: null
    }
  });

  // Comment Collection
  Comment.Collection = Backbone.Collection.extend({
    model: Comment.Model,
    url: Comment.url,
    comparator: function (comment) {
      // Sort comments descending by creation
      return -new Date(comment.get("created_at"));
    }
  });

  // Comment View Item
  Comment.Views.Item = Marionette.ItemView.extend({
    tagName: 'li',
    template: 'comment/item',
    events: {
      'click .remove-comment': 'removeComment'
    },
    removeComment: function () {
      if (confirm("¿Estás seguro?")) {
        // Destroy model
        this.model.destroy();
      }

      return false;
    }
  });

  // Comment View List
  Comment.Views.List = Marionette.CompositeView.extend({
    tagName: 'ul',
    className: 'comments',
    template: 'comment/list',
    events: {
      'submit form': 'saveComment'
    },
    itemView: Comment.Views.Item,
    itemViewContainer: '.comments-container',
    saveComment: function (e) {
      e.preventDefault();
      
      var that = this;

      // Set shortcut form
      var form = this.$el.find('form');

      // Set data object
      var data = {
        reference: this.model.get('_id'),
        comment: form.find('.input-comment').val(),
        updated_at: new Date(),
        created_at: new Date()
      };

      // Set comment model
      var comment = new Comment.Model();

      // Save comment
      comment.save(data, {
        success: function (model) {
          // Add model to collection
          that.collection.add(model);

          // Re-sort collection
          that.collection.sort();

          // Re-render
          that.render();
        }
      });

    }
  });

  return Comment;

});
