'use strict';
module.exports = function(app) {
  var kvController = require('./kvController');

  app.route('/')
    .get(kvController.welcome);

  app.route('/object')
    .post(kvController.addNew);

  app.route('/object/:key/')
    .get(kvController.get);

  app.route('/object/:key/:timestamp')
    .get(kvController.get)
};