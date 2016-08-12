'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const EmailSignup = mongoose.model('EmailSignup');
const Launch = mongoose.model('Launch');
const Question = mongoose.model('Question');
const Bluebird = require('bluebird');

module.exports = router;

router.post('/launch-a-chapter', (req, res, next) => {
	//creates a user and sends it back if successful
	//throws a 500 and sends back the error if unsuccessful
	Bluebird.resolve()
	.then( () => {
		if(req.body.email) {
			return EmailSignup(req.body);
		}
		return;
	})
	.then( (e) => {
		Launch.create(req.body);
	})
	.then( () => {
		if(req.body.question){
			return Question.create(req.body);
		}
		return;
	})
	.then( () => res.send())
	.catch(err => res.status(500).send(err));
});