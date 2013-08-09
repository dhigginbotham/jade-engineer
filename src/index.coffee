###
# required modules
###

jade = require "jade"
_ = require "lodash"
fs = require "fs"
path = require "path"

###
# ENGINEER
# I wrote this because I wanted a way for me to create server side tables with a jade file
# and an object.
###

engineer = (opts) ->

  # jade template file
  @template = path.join __dirname, "templates", "..", "tables.jade"

  # time to extend our object from opts
  if opts? then _.extend @, opts

  @

engineer::make = (opts, input, fn) ->

  # define input - json/object tree
  @input = input

  # keys and titles
  @keys = []
  @titles = []
  @link = {}

  # time to extend our object from opts
  if opts? then _.extend @, opts

  self = @

  # check if our template file exists,
  # if it does we're in business, lets 
  # render some htmlz
  fs.exists self.template, (exists) ->
    if exists then jade.renderFile self.template, {engine: self, data: self.input}, (err, html) ->
      return if err? then fn err, null
      fn null, html
    else fn "You must provide a valid .jade file to render from", null


module.exports = engineer