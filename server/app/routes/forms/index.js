'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const EmailSignup = mongoose.model('EmailSignup');
const LaunchAChapter = mongoose.model('LaunchAChapter');
const Questions = mongoose.model('Questions');
const Bluebird = require('bluebird');

module.exports = router;

router.post('/launch-a-chapter', (req, res, next) => {
	//creates a user and sends it back if successful
	//throws a 500 and sends back the error if unsuccessful
	// const promisedCreations = [];
	Bluebird.resolve()
	.then( () => {
		if(req.body.email && req.body.newsletter) {
			return EmailSignup.create(req.body);
			//there should be a post-save hook on the email form that adds them to our mailing list
			// Use Zapier (MongoDB + Mailchimp integration) or look into mailchimp's own API
		}
		return;
	})
	.then( (e) => {
		return LaunchAChapter.create(req.body);
	})
	.then( () => {
		if(req.body.questions){
			return Questions.create(req.body);
			//if there is a question, we should email the admins with that question and the contact info of the user
		}
		return;
	//after all of this, we should send them an email confirmation
	})
	// When everything has completed we should redirect them to a page saying so
	// or add a confirmation popup or something dynamic like this
	.then( () => res.send())
	.catch(err => res.status(500).send(err));
});