'use strict';
module.exports = function(app) {
  var kvController = require('./kvController');

  app.route('/')
    .get(kvController.welcome);

  app.route('/api/object')
    .post(kvController.addNew);

  app.route('/api/object/:key/')
    .get(kvController.get);

  app.route('/api/object/:key/:timestamp')
    .get(kvController.get)
};