var express = require('express');
var app = express();

var server = require('http').createServer(app);

var data = require('./data.json');
var engineer = require('../lib');

var path = require('path');

app.set('port', 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var exampleOptions = {
  keys: ['name', 'phone', 'date', 'email'],
  titles: ['Name', 'Phone', 'Date', 'Email Address']
}

var exampleMiddle = function (req, res, next) {

  // create new engineer object
  var example = new engineer();

  example.make(exampleOptions, data, function (err, html) {
    
    if (err) {
      return next(err, null);
    }

    if (html) {
      res.locals.table = html;
      return next();
    }

  });

};

var exampleRoute = function (req, res, next) {

  return res.render('example');

};

app.get('/', exampleMiddle, exampleRoute);

server.listen(app.get('port'), function () {
  console.log('jade-engineer example running on port %s', app.get('port'));
});