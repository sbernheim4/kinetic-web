'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

// Schema used for people who want to launch a chapter of Kinetic on their campus.
// Info comes from the form on the launch state: www.kineticglobal.org/launch-a-chapeter

const LaunchSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	school: {
		type: String
	},
	year: {
		type: String
	},
	questions: {
		type: String
	},
	newsletter: {
		type: Boolean
	}
});

mongoose.model('LaunchSchema', LaunchSchema);
