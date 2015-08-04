var combo = require('connect-combo');
var path = require('path');
var connect = require('connect');

var dir = path.join(__dirname, '/');
var port = 2001
var app = connect()
  .use(combo({
    directory: dir,
    proxy: 'http://cmd.emaildm.net',
    cache: true,
    //log: true,
    static: true
  }))
  .listen(2001);
console.log('http://127.0.0.1:' + port)