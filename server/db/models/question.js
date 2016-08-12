'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const QuestionSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	question: {
		type: String,
		required: true
	}
});

mongoose.model('Question', QuestionSchema);
