/*
# ENGINEER
# I wrote this because I wanted a way for me to create server side tables with a jade file
# and an object.
*/


/*
# required modules
*/


(function() {
  var engineer, fs, jade, path, _;

  jade = require("jade");

  _ = require("lodash");

  fs = require("fs");

  path = require("path");

  engineer = function(opts) {
    this.template = path.join(__dirname, "..", "templates", "tables.jade");
    this.pretty = false;
    if (opts != null) {
      _.extend(this, opts);
    }
    return this;
  };

  engineer.prototype.make = function(opts, input, fn) {
    var self;
    if (_.isFunction(input) === true) {
      fn = input;
      input = [];
    }
    this.fields = [];
    if (opts != null) {
      _.extend(this, opts);
    }
    if (this.fields.length > 0) {
      this.keys = _.pluck(this.fields, "key");
      this.titles = _.pluck(this.fields, "title");
      delete this.fields;
    } else {
      return fn("You must pass an array of objects in your options for fields", null);
    }
    self = this;
    return fs.exists(self.template, function(exists) {
      if (exists) {
        return jade.renderFile(self.template, {
          engine: self,
          data: input,
          pretty: self.pretty
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
