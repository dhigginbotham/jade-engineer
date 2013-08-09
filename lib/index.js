/*
# required modules
*/


(function() {
  var engineer, fs, jade, path, _;

  jade = require("jade");

  _ = require("lodash");

  fs = require("fs");

  path = require("path");

  /*
  # ENGINEER
  # I wrote this because I wanted a way for me to create server side tables with a jade file
  # and an object.
  */


  engineer = function(opts) {
    this.template = path.join(__dirname, "..", "templates", "tables.jade");
    if (opts != null) {
      _.extend(this, opts);
    }
    return this;
  };

  engineer.prototype.make = function(opts, input, fn) {
    var self;
    this.input = input;
    this.keys = [];
    this.titles = [];
    this.link = {};
    if (opts != null) {
      _.extend(this, opts);
    }
    self = this;
    return fs.exists(self.template, function(exists) {
      if (exists) {
        return jade.renderFile(self.template, {
          engine: self,
          data: self.input
        }, function(err, html) {
          if (err != null) {
            return fn(err, null);
          }
          return fn(null, html);
        });
      } else {
        return fn("You must provide a valid .jade file to render from", null);
      }
    });
  };

  module.exports = engineer;

}).call(this);
