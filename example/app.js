var express = require('express');
var app = express();

var server = require('http').createServer(app);

// include some data, an easy replacement would be
// to grab this from mongodb or something similar.
var data = require('./data17k.json');

// require jade-engineer
var engineer = require('../lib');

var path = require('path');

//1337 port is 1337
app.set('port', 1337);

// set our view and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var exampleOptions = {
  fields: [
    {key: 'name', title: 'Name'},
    {key: 'phone', title: 'Phone'},
    {key: 'date', title: 'Date'},
    {key: 'email', title: 'Email Address'}
  ]
};

// make an example out of this middleware ;)
var exampleMiddle = function (req, res, next) {

  // create new engineer object
  var example = new engineer();
  
  // get the start time
  var startMs = Date.now();

  // running .make gives us some html to do with as we wish
  example.make(exampleOptions, data, function (err, html) {
    
    if (err) {

      return next(err, null);

    }

    if (html) {

      // set `res.locals.table`
      res.locals.table = html;

      // store end time to get our speed test.
      var endMs = Date.now();

      // find out how long it took...
      console.log('It took ' + (endMs - startMs) + 'ms to render ' + data.length + ' rows.');

      return next();

    } else {
     
      // using this pattern allows you to handle not having
      // any html to return, and no error. Probably because you're
      // missing something in your chain.

      return next();
    
    }

  });

};

var exampleRoute = function (req, res, next) {

  // return res.render with our example.jade file
  return res.render('example');

};

// set app.get w/ some middleware and a route
app.get('/', exampleMiddle, exampleRoute);

server.listen(app.get('port'), function () {
  console.log('jade-engineer example running on port %s', app.get('port'));
});