const mongoose = require('mongoose');
const Discussion = require('../db/models/discussion.js');
const Comment = require('../db/models/comment.js');
const emitter = require('./eventEmitter.js');

module.exports = {
	createDiscussionFromSlack: (req) => {
		const newDiscussion = {
			slackTitle: req.event.channel.name,
			slackChannelId: req.event.channel.id,
			originCreated: 'slack',
			authorSlackId: req.event.channel.creator,
			slackChannelName: req.event.channel.name
		}
		return Discussion.create(newDiscussion)
		.then(createdDiscussion => {
			emitter.emit('discussion_created_from_slack', createdDiscussion);
		});
	},
	createCommentFromSlack: (req) => {
		const newComment = {
			message: req.event.text,
			slackTimeStamp: req.event.ts,
			originCreated: 'slack',
			authorSlackId: req.event.user,
			slackChannelId: req.event.channel
		}
		return Comment.create(newComment)
	}
}