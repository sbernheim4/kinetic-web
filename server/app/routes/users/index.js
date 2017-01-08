'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = router;

router.post('/', (req, res) => {
	//creates a user and sends it back if successful
	//throws a 500 and sends back the error if unsuccessful
	User.create(req.body)
	.then( user => res.json(user))
	.catch(err => res.status(500).send(err));
});
