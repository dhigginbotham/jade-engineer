//load in testing modules..
var expect = require('expect.js');
var _ = require('lodash');

// require module to test w/
var engineer = require('../lib');
var data = require('./100.json');

// run test .make
describe('Starting up test for `jade-engineer`', function () {

  var test = new engineer();

  // options for test
  var test_opts = {
    fields: [
      {key: 'name', title: 'Name'},
      {key: 'phone', title: 'Phone'},
      {key: 'date', title: 'Date'},
      {key: 'email', title: 'Email Address'}
    ],
    pretty: true
  };

  it('should not have any remains of `fields` or `input`', function (done) {

    expect(test).not.to.be(undefined);
    expect(test.pretty).to.be(false);
    expect(test.template).not.to.be(undefined);
    done();

  });

  it('should render html string with `make()`', function (done) {

    test.make(test_opts, data, function (err, html) {
      
      expect(test.fields).to.be(undefined);

      expect(test.keys).not.to.be(undefined);
      expect(test.titles).not.to.be(undefined);
      
      expect(err).to.be(null);
      expect(err).not.to.be(undefined);
      expect(html).not.to.be(null);
      expect(html).not.to.be(undefined);

      done();

    });

  });

});