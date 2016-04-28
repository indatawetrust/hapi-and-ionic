'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema,
    schemas = {};

schemas.User = _mongoose2.default.model('User', new Schema({
	username: String,
	password: String,
	salt: String,
	token: String,
	created_date: { type: Date, default: Date.now }
}));

exports.default = schemas;