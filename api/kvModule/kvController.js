'use strict';

var kvModel = require('./kvModel');

var welcome = function (req, res) {
  res.send('Welcome to Key value pair API.');
};

var addNew = function (req, res) {
  for(var k in req.body){
    var key = k;
    var value = req.body[k];
  }
  kvModel.addNew(key, value)
    .then(function(resp) {
      res.json(resp);
    }).catch(function (err) {
    if (err)
      res.send(err);
    });
};

var get = function (req, res) {
  var key = req.params.key;
  var timestamp = req.params.timestamp;
  kvModel.get(key, timestamp)
    .then(function(resp) {
      res.json(resp);
    }).catch(function (err) {
    if (err)
      res.send(err);
  });
};

module.exports = {
  welcome: welcome,
  addNew: addNew,
  get: get
};