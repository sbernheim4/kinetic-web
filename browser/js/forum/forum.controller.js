'use strict';

app.controller('ForumCtrl', function ($scope, $state, loggedInUser, discussions, ForumFactory) {
  $scope.discussions = discussions;
  console.log(discussions)
  if(!loggedInUser){
    return $state.go('home');
  }
  const socket = io('/forum');

  socket.on('discussion_created', function(discussion){
    console.log('????', discussion)
    $scope.discussions.unshift(discussion);
  });

  socket.on('comment_created', function(comment) {
    const discussionIdx = $scope.discussions.findIndex( discussion => discussion._id === comment.discussionId)
    $scope.discussions[discussionIdx].comments.push(comment);
    $scope.$digest();
  })

  $scope.createDiscussion = function(discussion) {
    discussion.authorId = loggedInUser._id;
    discussion.originCreated = 'website';

    ForumFactory.createDiscussion(discussion)
    .then(createdDiscussion => {
      $scope.discussions.unshift(createdDiscussion);
      socket.emit('discussion_created', createdDiscussion);
    })
    .catch(err => {
      console.error(err);
    });
  }
});
