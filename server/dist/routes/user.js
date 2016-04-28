'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _index = require('../models/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var prefix = 'user';

var User = function () {
	function User() {
		_classCallCheck(this, User);
	}

	_createClass(User, null, [{
		key: 'route',
		value: function route() {
			return {
				signin: User.signin(),
				signup: User.signup(),
				home: User.home()
			};
		}
	}, {
		key: 'home',
		value: function home() {
			return {
				method: 'GET',
				path: '/' + prefix + '/home',
				handler: function handler(request, reply) {
					reply({ hello: "world" });
				},
				config: {
					auth: 'jwt'
				}
			};
		}
	}, {
		key: 'signin',
		value: function signin() {
			return {
				method: 'POST',
				path: '/' + prefix + '/signin',
				handler: function handler(request, reply) {
					_index.user.signin({
						username: request.payload.username,
						password: request.payload.password
					}, function (_) {
						switch (_) {
							case null:
								reply({ log: 'login_failed' });
								break;
							default:
								reply({
									log: 'login_success',
									token: _.token,
									username: _.username
								});
						}
					});
				},
				config: User.config()
			};
		}
	}, {
		key: 'signup',
		value: function signup() {
			return {
				method: 'POST',
				path: '/' + prefix + '/signup',
				handler: function handler(request, reply) {
					_index.user.signup({
						username: request.payload.username,
						password: request.payload.password
					}, function (_) {
						switch (_.log) {
							case 'username_available':
								reply({ log: 'username_available' });
								break;
							case 'account_create':
								reply({ log: 'account_create' });
								break;
						}
					});
				},
				config: User.config()
			};
		}
	}, {
		key: 'config',
		value: function config() {
			return {
				validate: {
					payload: {
						username: _joi2.default.string().alphanum().min(3).max(20),
						password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/)
					}
				}
			};
		}
	}]);

	return User;
}();

exports.default = User;