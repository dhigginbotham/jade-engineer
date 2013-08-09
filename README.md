<img src="https://drone.io/github.com/dhigginbotham/jade-engineer/status.png" style="float: right;" />
## Jade Engineer
The purpose of this module is to render `big` / `small` / `micro` views on the server side with jade from an object/json. This is helpful if you have big datasets and need to render massive tables. I got something like 300,000 rows to give me a headache, but that was due to a client browser issue, by that time the middleware had long rendered the html.


### Options
Key | Description
--- | ---
`template` | you can swap out jade files to run your own views, however i will most likely be adding many views overtime as this is a pretty common use case in my world.
`pretty` | jade supports `pretty` & `ugly` html, i passed this through as it's probably nice to have access to.
`fields` | array objects of `key`, `title` for which fields to load in for templating.
`data` | json/object to give to jade, usually a db.find or some json from an api, file, etc..

### Usage
````js
var express = require('express');
var app = express();

var server = require('http').createServer(app);

// include some data, an easy replacement would be
// to grab this from mongodb or something similar.
var data = require('./data.json');

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
````

### License
````js
The MIT License (MIT)

Copyright (c) 2013 David Higginbotham 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
````