'use strict';

const socketio = require('socket.io');
const emitter = require('../modules/eventEmitter.js');
const Discussion = require('../db/models/discussion.js');
let io = null;

module.exports = function (server) {
  if(io){
    return io;
  }

  io = socketio(server);


  const forumHomeNamespace = io.of('/forum');

  emitter.on('comment_created_from_slack', (comment) => {
    forumHomeNamespace.emit('comment_created', comment)
    const discussionNamespace = io.of(`/${comment.discussionId.toString()}`);
    discussionNamespace.emit('comment_created', comment);
  });
  
  io.on('connection', function (socket) {
    socket.on('comment_created', (comment) => {
      forumHomeNamespace.emit('comment_created', comment)
      const discussionNamespace = io.of(`/${comment.discussionId.toString()}`);
      discussionNamespace.emit('comment_created', comment);
    });
  });

  emitter.on('comment_edited_from_slack', (comment) => {
    const discussionNamespace = io.of(`/${comment.discussionId.toString()}`);
    discussionNamespace.emit('comment_edited', comment);
  });

  Discussion.find()
  .then((discussions) => {
    discussions.forEach((discussion) => {
      const nsp = io.of('' + discussion._id + '');
      // console.log(nsp)
      nsp.on('connection', (socket) => {
        // console.log('connected!')
      });
      nsp.on('comment_created', function(comment) {
        // console.log('????')
        // console.log(comment)
      });
    })
  })


  return io;

};
