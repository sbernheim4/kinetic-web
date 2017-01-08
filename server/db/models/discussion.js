'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Bluebird = require('bluebird');
const titleCase = require('../../modules/titleCaseMonkeyPatch');
const slackMethods = require('../../modules/slackMethods.js');
const User = require('./user.js');

const DiscussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slackChannelName: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  authorSlackId: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  originCreated: {
    type: String,
    enum: ['slack', 'website'],
    required: true
  },
  slackChannelId: {
    type: String,
    unique: true,
    sparse: true
  }
});

DiscussionSchema.pre('validate', function(next) {
  if (this.originCreated === 'website') {
    let slackChannelName = this.title.replace(/[^\w\s]/gi, ''); // remove special chars
    slackChannelName = slackChannelName.split(' ').join('-').slice(0,21).toLowerCase(); // swap whitespace for -, slice 21 chars, lowercase
    this.slackChannelName = slackChannelName;
    return slackMethods.createSlackChannel(this.slackChannelName)
    .then(slackResponse => {
      this.slackChannelId = slackResponse.channel.id;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  } else {
    // this will fire erroneously because creating a discussion from the website creates a channel on slack, which will
    // hit our server saying that a new channel and try to add a record to our db. the save (or validate) will fail
    // because it won't be a unique slack channel id
    let title = this.slackChannelName.replace(/[_-]/g, " ");
    title = title.toTitleCase();
    this.title = title;
    return slackMethods.findSlackUser(this.authorSlackId)
    .then(slackResponse => {
      return User.findOne({email: slackResponse.user.profile.email})
    })
    .then((foundUser) => {
      this.authorId = foundUser._id;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
  }
});

DiscussionSchema.methods.attachAssociatedComments = function(done) {
  const discussion = this.toObject();
  return mongoose.model('Comment').find({discussionId: this.id}).populate('authorId').sort({createdAt: 1})
  .then(comments => {
    discussion.comments = comments;
    return discussion;
  })
  .catch(done)
};

const Discussion = mongoose.model('Discussion', DiscussionSchema);
module.exports = Discussion;
