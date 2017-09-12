'use strict';

var rewire = require('rewire');
var expect = require('chai').expect;
var moment = require('moment');

var kvModel = rewire('../../api/kvModule/kvModel');

// TODO need to rewire/mock the db connections

describe('kvModel', function () {
  describe('addNew', function () {
    it('should add new value', function () {
      kvModel.addNew('newKey', 'newValue')
        .then(function (res) {
        expect(res.msg).to.eq('Successfully added');
      });
    });
    it('should return an error when no key passed', function () {
      kvModel.addNew('','value')
        .then(function (res) {
          expect(res).to.be.null;
        }).catch(function (e) {
          expect(e.err).to.be.eq('Error: missing key');
      });
    });
    it('should return an error when no value passed', function () {
      kvModel.addNew('newKey')
        .then(function (res) {
          expect(res).to.be.null;
        }).catch(function (e) {
        expect(e.err).to.be.eq('Error: missing value');
      });
    });
    it('should return an error when no key and value passed', function () {
      kvModel.addNew()
        .then(function (res) {
          expect(res).to.be.null;
        }).catch(function (e) {
          expect(e.err).to.be.eq('Error: missing key and value');
      });
    });
  });
  describe('get', function () {
    it('should return an error when no key passed', function () {
      kvModel.get()
        .then(function (res) {
          expect(res).to.be.null;
        }).catch(function (e) {
        expect(e.err).to.be.eq('Error: missing key');
      });
    });
    it.skip('should return an error when key passed does not exist', function () {
      kvModel.get()
        .then(function (res) {
          expect(res).to.be.null;
        }).catch(function (e) {
        expect(e.err).to.be.eq('Error: missing key');
      });
    });
    it('should get the value when passed a key', function () {
      var key = 'newKey';
      kvModel.get(key)
        .then(function (res) {
          expect(res.value).to.eq('newValue');
          expect(res.msg).to.eq('Successfully fetched value of key: '+key);
        });
    });
    it('should get the old value when passed a key and a timestamp', function () {
      var key = 'newKey';
      var timeStamp = moment(new Date()).utc().valueOf();
      kvModel.get(key, timeStamp)
        .then(function (res) {
          expect(res.value).to.eq('oldValue');
          expect(res.msg).to.eq('Successfully fetched value of key: '+key);
        });
    });
  });
});