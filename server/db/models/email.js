'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const EmailSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	}
});

mongoose.model('EmailSignup', EmailSchema);
