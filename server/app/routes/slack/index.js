'use strict';
const router = require('express').Router();
const rp = require('request-promise');

const env = require('../../../env/').SLACK;
const client_id = env.CLIENT_ID;
const client_secret = env.CLIENT_SECRET;
const slackFunctions = require('../../../modules/slack');
const Bluebird = require('bluebird');

module.exports = router;

router.post('/', (req, res, next) => {
	// console.log(req.body)
	res.status(200).send();
	
	if(req.body.challenge) {
		// console.log('sending back', req.body.challenge)
		return res.send(req.body.challenge)
	}
	let promise;
	switch(req.body.event.type) {
		case 'message': 
			if (req.body.event.subtype) {
				break;
			}
			promise = slackFunctions.createCommentFromSlack(req.body);
			break
		case 'channel_created': 
			promise = slackFunctions.createDiscussionFromSlack(req.body);
			break
	}
	Bluebird.resolve(promise)
	.then(response => {
		console.log(response)
	})
	.catch(err => {
		console.log('error during', req.body)
		console.error(err)
	})

})

router.get('/authorize', (req, res, next) => {
	const options = {
		uri: 'https://slack.com/api/oauth.access',
		qs: {
			client_id,
			client_secret,
			code: req.query.code
		}
	}
	rp(options)
	.then(response => {
		const parsedResponse = JSON.parse(response);
		console.log(parsedResponse)
		res.send('<h1>success!</h1>')
	})
	.catch(err => {
		console.error(err)
		res.status(500).send(err)
	})
})