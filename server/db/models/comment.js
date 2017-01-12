'use strict';

const mongoose = require('mongoose');
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
  edited: {
    type: Boolean,
    default: false
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

CommentSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

CommentSchema.post('save', (doc) => {
  if (!doc.wasNew) {
    return;
  } else if (doc.originCreated === 'website') {
    return User.findById(doc.authorId)
    .then(user => {
      if (user.iconUrl) {
        return user;
      } else {
        return slackMethods.getSlackProfile(doc.authorSlackId)
        .then(iconUrl => {
          user.iconUrl = iconUrl;
          return user.save();
        });
      }
    }).then((user) => {
      if(user.iconUrl) {
        return slackMethods.createMessage(doc, `${user.firstName} ${user.lastName}`, user.iconUrl)
      } else { // i don't think this should ever be hit (but i'm also not even remotely close to sure).
        return slackMethods.createMessage(doc, `${user.firstName} ${user.lastName}`)
      }
    })
    .then( slackResponse => {
      doc.slackTimeStamp = slackResponse.ts;
      return doc.save();
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
