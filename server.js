'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  // kvModel = require('./api/kvModule/kvModel').model,
  bodyParser = require('body-parser');

var uri = 'mongodb://localhost/keyValDB';
mongoose.connect(uri, { useMongoClient: true }, function (e, r) {
  if(e) console.log(e);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/kvModule/kvRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('Key Value API server started on: ' + port);