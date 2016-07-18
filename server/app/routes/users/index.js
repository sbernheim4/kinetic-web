'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = router;

router.post('/', (req, res, next) => {
	User.create(req.body)
	.then( user => res.json(user))
	.catch(err => res.status(500).send(err));
});