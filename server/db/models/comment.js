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
  isEdited: {
    type: Boolean,
    default: false
  },
  originCreated: {
    type: String,
    enum: ['slack', 'website'],
    required: true
  },
  isFileUpload: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String
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

CommentSchema.pre('validate', function(next) {
  if (this.isFileUpload) {
    return User.findById(this.authorId)
    .then( author => {
      this.message = `${author.firstName} ${author.lastName} uploaded "${this.fileName}."
      You can see it here: ${this.message}`;
      next();
    })
    .catch( err => {
      console.error(err);
      next(err);
    });
  }
});

CommentSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

CommentSchema.post('save', (doc) => {
  if (!doc.wasNew) {
    if (doc.isEdited) {
      emitter.emit('comment_edited_from_slack', doc);
    }
    return;
  } else {
    if (doc.originCreated === 'website') {
      return User.findById(doc.authorId)
      .then(user => {
        // TODO: find user in slack and post the message with their icon
        return slackMethods.createMessage(doc, `${user.firstName} ${user.lastName}`)
      })
      .then( slackResponse => {
        doc.slackTimeStamp = slackResponse.ts;
        // no recursive error from saving again in a post save hook since when the post 
        // save hook runs a second time the first if statment is executed
        return doc.save();
      })
      .catch(err => {
        console.error(err);
      })
    } else { // doc.origin should be 'slack'
      return User.findById(doc.authorId)
      .then( (user) => {
        doc.authorId = user;
        emitter.emit('comment_created_from_slack', doc);
      })
    }
  }
});

// CommentSchema.methods.populateUser = function(done) {
//   const comment = this.toObject();
//   return this.populate('authorId').sort({createdAt: 1})
//   .then(comments => {
//     discussion.comments = comments;
//     return discussion;
//   })
//   .catch(done)
// };

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
