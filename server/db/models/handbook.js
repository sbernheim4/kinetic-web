/*
 * Schema used for people who want to get a copy of the Kinetic Handbook.
 * Info comes from the form on the launch state: www.kineticglobal.org/get-the-handbook
 */

'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');

const HandbookSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  profession: {
    type: String
  },
  member: {
		type: Boolean
	},
	interested: {
		type: Boolean
	},
	curious: {
		type: Boolean
	},
	workAtUniversity: {
		type: Boolean
	},
  newsletter: {
    type: Boolean
  }
});

LaunchSchema.post('save', function (doc, next) {
	// Post save hook for mongoDB

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
    return next();
  }
});

mongoose.model('GetTheHandbook', HandbookSchema);
