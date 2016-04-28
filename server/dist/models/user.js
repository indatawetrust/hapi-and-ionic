'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserSchema = _mongoose2.default.model('User');

var user = function () {
	function user() {
		_classCallCheck(this, user);
	}

	_createClass(user, null, [{
		key: 'signup',
		value: function signup() {
			var data = arguments.length <= 0 ? undefined : arguments[0],
			    call = arguments.length <= 1 ? undefined : arguments[1];

			new Promise(function (resolve, reject) {

				UserSchema.findOne({
					username: new RegExp(data.username, 'i')
				}, function (err, user) {
					resolve(user);
				});
			}).then(function (user) {

				var salt = _bcrypt2.default.genSaltSync(10);

				if (user == null) new UserSchema({
					username: data.username,
					password: _bcrypt2.default.hashSync(data.password, salt),
					salt: salt,
					token: _jsonwebtoken2.default.sign({ username: data.username }, 'SECRETKEY')
				}).save(function (err, _) {
					call({ log: 'account_create' });
				});else call({ log: 'username_available' });
			});
		}
	}, {
		key: 'signin',
		value: function signin() {
			var data = arguments.length <= 0 ? undefined : arguments[0],
			    call = arguments.length <= 1 ? undefined : arguments[1];

			UserSchema.findOne({
				username: data.username
			}, function (err, user) {
				if (user == null) call(null);else if (_bcrypt2.default.hashSync(data.password, user.salt) == user.password) call(user);else call(null);
			});
		}
	}, {
		key: 'tokenVerify',
		value: function tokenVerify(decoded, request, callback) {
			UserSchema.findOne({
				token: _jsonwebtoken2.default.sign(decoded, 'SECRETKEY')
			}, function (err, user) {
				if (user == null) callback(null, false);else callback(null, true);
			});
		}
	}]);

	return user;
}();

exports.default = user;