'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Bluebird = require('bluebird');

const Discussion = require('../../../db/models/discussion.js')
const Comment = require('../../../db/models/comment.js')
module.exports = router;

router.get('/', (req, res, next) => {
	Discussion.find({isActive: true}).sort({createdAt: -1})
	.then(discussions => {
		const discussionCommentsPromises = discussions.map(discussion => {
			return discussion.attachAssociatedComments();
		})
		return Bluebird.all(discussionCommentsPromises);
	})
	.then(discussionsWithComments => {
		res.status(201).send(discussionsWithComments)
	})
	.catch(err => {
		console.error(err)
		res.status(500).send(err);
	})
});

router.post('/', (req, res, next) => {
	Discussion.create(req.body)
	.then(discussion => res.status(200).send(discussion) )
	.catch(err => {
		console.error(err)
		res.status(500).send(err)
	});
});

router.get('/:id', (req, res, next) => {
	Discussion.findOne({_id: req.params.id, isActive: true})
	.then(discussion => {
		return discussion.attachAssociatedComments();
	})
	.then(discussionWithComments => {
		res.status(201).send(discussionWithComments);
	})
	.catch(err => {
		console.error(err);
		res.status(500).send(err);
	});
});

router.post('/:id', (req, res, next) => {
	console.log(req.body)
	Comment.create(req.body)
	.then(createdComment => {
		console.log(createdComment)
		res.status(200).send(createdComment)
	})
	.catch(err => {
		console.error(err);
		res.status(500).send(err)
	})
});