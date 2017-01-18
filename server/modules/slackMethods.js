const rp = require('request-promise');
const token = require('../env/').SLACK.CLIENT_TOKEN;

module.exports = {
	findSlackUser: (id) => {
		const options = {
      uri: 'https://slack.com/api/users.info',
      qs: {
        token: token,
        user: id
      }
    };
    return rp(options)
    .then(slackResponse => {
    	slackResponse = JSON.parse(slackResponse);
      if(!slackResponse.ok) {
        throw new Error(slackResponse.error); 
      }
      return slackResponse;
    });
	},
  createSlackChannel: (channelName) => {
    const options = {
      uri: 'https://slack.com/api/channels.create',
      qs: {
        token: token,
        name: channelName
      }
    }
    return rp(options)
    .then(slackResponse => {
      slackResponse = JSON.parse(slackResponse);
      if(!slackResponse.ok) {
        throw new Error(slackResponse.error); 
      }
      return slackResponse;
    });
  },
  createMessage: (comment, userName, iconUrl) => {
    const options = {
      uri: 'https://slack.com/api/chat.postMessage',
      qs: {
        token: token,
        channel: comment.slackChannelId,
        text: comment.message,
        username: userName,
        icon_url: iconUrl,
        as_user: true
      }
    }
    return rp(options)
    .then(slackResponse => {
      slackResponse = JSON.parse(slackResponse);
      if(!slackResponse.ok) {
        throw new Error(slackResponse.error); 
      }
      return slackResponse;
    });
  },

  getSlackProfile: (id) => {
    const options = {
      uri: 'https://slack.com/api/users.profile.get',
      qs: {
        token: token,
        user: id
      }
    }
    return rp(options)
    .then(slackResponse => {
      slackResponse = JSON.parse(slackResponse);
      if(!slackResponse.ok) {
        throw new Error(slackResponse.error); 
      }
      return slackResponse.profile.image_48;
    });
  }
}