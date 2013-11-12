'use strict';

define([
  'models/reference',
  'models/source',
  'models/comment'
], function (Reference, Source, Comment) {

  Reference.methods(['get', 'post', 'put', 'delete']);
  Source.methods(['get', 'post', 'put', 'delete']);
  Comment.methods(['get', 'post', 'put', 'delete']);

  Reference.before('get', function (req, res, next) {
    req.quer.populate('source');
    next();
  });

  return [Reference, Source, Comment];

});
