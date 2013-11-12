'use strict';

define(['db', 'node-restful'], function (db, restful) {

  var schema = db.Schema({
    comment: String,
    reference: {
      ref: 'Reference',
      type: db.Schema.ObjectId
    },
    created_at: Date,
    updated_at: Date
  });

  var Comment = restful.model('Comment', schema);

  Comment.slug = 'comments';

  return Comment;

});
