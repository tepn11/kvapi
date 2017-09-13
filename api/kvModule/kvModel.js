'use strict'

var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var kvSchema = new Schema({
  key: {
    type: String,
    required: 'Key is required'
  },
  value: {
    type: Schema.Types.Mixed,
    required: 'Value is required'
  },
  timestamp: {
    type: Number
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

var keyVal = mongoose.model('kvcol', kvSchema);

var addNew = function(key, value){
  return new Promise(function (resolve, reject) {
    if(key && value) {
      var newKeyVal = new keyVal({ key: key, value: value, timestamp: new Date().getTime()});
      var savePromise = newKeyVal.save();
      savePromise.then(function (res) {
        return resolve({msg: 'Successfully added key: '+res._doc.key});
      }).catch(function () {
        return reject({err: 'Error: could not save key value pair'});
      });
    } else if(!key && value) {
      reject({err: 'Error: missing key'});
    } else if(key && !value) {
      reject({err: 'Error: missing value'});
    } else {
      reject({err: 'Error: missing key and value'});
    }
  });
};

var get = function(key, timeStamp){
  return new Promise(function (resolve, reject) {
    var qry,
      value;
    if(key) {
      if (timeStamp) {
        qry = keyVal.find({"key": key}).sort({timestamp: -1});
        qry.then(function (res) {
          if(res.length > 0) {
            for (var i = 0, arrLen = res.length; i < arrLen; i++) {
              if (timeStamp >= res[i]._doc.timestamp) {
                value = res[i]._doc.value;
                break;
              }
            }
            if (value) {
              resolve({
                msg: 'Successfully fetched value of key: ' + key + ' at Timestamp: ' + timeStamp,
                value: value
              });
            } else {
              reject({err: 'Error: Could not find the value of key: ' + key + ' at Timestamp: ' + timeStamp});
            }
          } else {
            reject({msg: 'Unable to find key: ' + key, value: value});
          }
        }, function (err) {
          console.log(err);
          reject({err: 'Error: unable to find key value pair'});
        });
      } else {
        qry = keyVal.find({"key": key}).sort({timestamp: -1}).limit(1);
        qry.then(function (res) {
          if(res.length > 0) {
            value = res[0]._doc.value;
            resolve({msg: 'Successfully fetched value of key: ' + key, value: value});
          } else {
            reject({msg: 'Unable to find key: ' + key, value: value});
          }
        }, function (err) {
          console.log(err);
          reject({err: 'Error: unable to find key value pair'});
        });
      }
    } else {
      reject({err: 'Error: missing key'});
    }
  });
};

module.exports = {
  model: keyVal,
  addNew: addNew,
  get: get
};

