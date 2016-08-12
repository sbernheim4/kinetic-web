'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const QuestionsSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	questions: {
		type: String,
		required: true
	}
});

mongoose.model('Questions', QuestionsSchema);
