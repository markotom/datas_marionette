'use strict';

define([
  'models/reference',
  'models/source'
], function (Reference, Source) {

  Reference.methods(['get', 'post', 'put', 'delete']);
  Source.methods(['get', 'post', 'put', 'delete']);

  Reference.before('get', function (req, res, next) {
    req.quer.populate('source');
    next();
  });

  return [Reference, Source];

});
