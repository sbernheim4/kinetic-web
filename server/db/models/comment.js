'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const Discussion = require('./discussion.js');
const User = require('./user.js');
const slackMethods = require('../../modules/slackMethods');
const emitter = require('../../modules/eventEmitter.js');

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorSlackId: {
    type: String
  },
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  slackChannelId: {
    type: String,
    required: true
  },
  slackTimeStamp: {
    type: String,
    unique: true,
    sparse: true
  },
  originCreated: {
    type: String,
    enum: ['slack', 'website'],
    required: true
  }
});

CommentSchema.pre('validate', function(next) {
  if (this.originCreated === 'slack') {
    return Discussion.findOne({ slackChannelId: this.slackChannelId })
    .then(discussion => {
      if(!discussion) {
        return next('No discussion found');
      }
      this.discussionId = discussion._id;
      return slackMethods.findSlackUser(this.authorSlackId);
    })
    .then(slackResponse => {
      const email = slackResponse.user.profile.email;
      return User.findOne({ email: email });
    })
    .then(foundUser => {
      this.authorId = foundUser._id;
      next();
    })
    .catch(next);
  } else {
    next();
  }
});

CommentSchema.post('save', (doc) => {
  if (doc.originCreated === 'website') {
    return User.findById(doc.authorId)
    .then(user => {
      // TODO: find user in slack and post the message with their icon
      return slackMethods.createMessage(doc, `${user.firstName} ${user.lastName}`)
    })
    .catch(err => {
      console.error(err);
    })
  } else { // doc.origin should be 'slack'
    emitter.emit('comment_created_from_slack', doc);
  }
})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
