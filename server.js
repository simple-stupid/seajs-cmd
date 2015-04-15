var combo = require('connect-combo');
var path = require('path');
var connect = require('connect');

var dir = path.join(__dirname, '/');

var app = connect()
  .use(combo({
    directory: dir,
    proxy: 'http://cmd.nimojs.com',
    cache: true,
    //log: true,
    static: true
  }))
  .listen(18080);