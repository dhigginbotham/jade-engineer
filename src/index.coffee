###
# ENGINEER
# I wrote this because I wanted a way for me to create server side tables with a jade file
# and an object.
###

###
# required modules
###

jade = require "jade"
_ = require "lodash"
fs = require "fs"
path = require "path"

engineer = (opts) ->

  # jade template file
  @template = path.join __dirname, "..", "templates", "tables.jade"

  @pretty = false

  # time to extend our object from opts
  if opts? then _.extend @, opts

  @

engineer::make = (opts, input, fn) ->

  if _.isFunction(input) == true
    fn = input
    input = []

  # # define input - json/object tree
  # @input = input

  # refactor to support array of objects so sorting
  # is much easier.
  @fields = []

  # by default you can add as many options as you'd
  # like and just do your rules with jade.

  # time to extend our object from opts
  if opts? then _.extend @, opts

  # if we've passed fields  
  if @fields.length > 0
    @keys = _.pluck @fields, "key"
    @titles = _.pluck @fields, "title"
    delete @fields
  else return fn "You must pass an array of objects in your options for fields", null

  self = @

  # check if our template file exists,
  # if it does we're in business, lets 
  # render some htmlz
  fs.exists self.template, (exists) ->

    if exists then jade.renderFile self.template, {engine: self, data: input, pretty: self.pretty}, (err, html) ->

      return if err? then fn err, null

      console.log self

      fn null, html

    else fn "You must provide a valid .jade file to render from", null

module.exports = engineer
