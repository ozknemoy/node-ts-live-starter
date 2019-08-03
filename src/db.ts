
var sworm = require('sworm');
//var oracledb = require('oracledb');

var db = sworm.db({
  driver: 'oracle',
  config: {
    user: 'sys',
    password: '1564615646',
    connectString: 'localhost/XE as SYSDBA',
    pool: true,
    options: {
      // options to set on `oracledb`
      maxRows: 1000
    },
    log: true
  }
});

var person = db.model({table: 'people'});

db.connect(function () {

  // connected
  var bob = person({name: 'bob'});
  return bob.save().then(function () {

  });
}).then(function () {

  // disconnected

});
