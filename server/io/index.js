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

  emitter.on('discussion_created_from_slack', (discussion) => {
    io.emit('discussion_created', discussion)
  });
  
  io.on('connection', function (socket) {
    socket.on('discussion_created', (discussion) => {
      socket.broadcast.emit('discussion_created', discussion);
    });

    socket.on('comment_created', (comment) => {
      forumHomeNamespace.emit('comment_created', comment)
      const discussionNamespace = io.of(`/${comment.discussionId.toString()}`);
      // User.find
      discussionNamespace.emit('comment_created', comment);
    });
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
