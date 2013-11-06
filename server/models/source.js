'use strict';

define(['db', 'node-restful'], function (db, restful) {

  var schema = db.Schema({
    title: String,
    publisher: String,
    date: Date,
    author: String,
    created_at: Date,
    updated_at: Date
  });

  var Source = restful.model('Source', schema);

  Source.slug = 'sources';

  return Source;

});
