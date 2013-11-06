'use strict';

define(['db', 'node-restful'], function (db, restful) {

  var schema = db.Schema({
    reference: String,
    pages: String,
    source: {
      ref: 'Source',
      type: db.Schema.ObjectId
    },
    created_at: Date,
    updated_at: Date
  });

  var Reference = restful.model('Reference', schema);

  Reference.slug = 'references';

  return Reference;

});
