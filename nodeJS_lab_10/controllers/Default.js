'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.addCriminal = function addCriminal (req, res, next) {
  Default.addCriminal(req.swagger.params, res, next);
};

module.exports.deleteCriminalById = function deleteCriminalById (req, res, next) {
  Default.deleteCriminalById(req.swagger.params, res, next);
};

module.exports.findCriminal = function findCriminal (req, res, next) {
  Default.findCriminal(req.swagger.params, res, next);
};

module.exports.findCriminalById = function findCriminalById (req, res, next) {
  Default.findCriminalById(req.swagger.params, res, next);
};
