'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _schemas = require('./schemas');

var _schemas2 = _interopRequireDefault(_schemas);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('./models/user');

var _user4 = _interopRequireDefault(_user3);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _hapiAuthJwt = require('hapi-auth-jwt2');

var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * db
 */
_mongoose2.default.connect('mongodb://localhost/words', function (err) {
  if (err) throw err;
}); /*
     * imports
     */


var server = new _hapi2.default.Server();

server.connection({
  host: 'localhost',
  port: 8000,
  routes: {
    cors: true
  }
});

server.register(_hapiAuthJwt2.default, function (err) {

  if (err) throw err;

  server.auth.strategy('jwt', 'jwt', {
    key: 'SECRETKEY',
    validateFunc: _user4.default.tokenVerify,
    verifyOptions: {}
  });

  // index
  server.route(_index2.default.route());

  // user
  for (var route in _user2.default.route()) {
    server.route(_user2.default.route()[route]);
  }
});
// server start
server.start(function (err) {

  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});