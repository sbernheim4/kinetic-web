'use strict';

app.controller('ForumCtrl', function ($scope, $state, loggedInUser, discussions, ForumFactory) {
  $scope.discussions = discussions;
  if(!loggedInUser){
    return $state.go('home');
  }

  const socket = io('/forum');
  socket.on('comment_created', function(comment) {
    const discussionIdx = $scope.discussions.findIndex( discussion => {
      return discussion._id === comment.discussionId;
    });

    if ($scope.discussions[discussionIdx].comments) {
      $scope.discussions[discussionIdx].comments.push(comment);
    } else {
      $scope.discussions[discussionIdx].comments = [comment];
    }
    $scope.$digest();
  });

  $scope.createDiscussion = function(discussion) {
    discussion.authorId = loggedInUser._id;
    discussion.originCreated = 'website';

    ForumFactory.createDiscussion(discussion)
    .then(createdDiscussion => {
      $scope.discussions.unshift(createdDiscussion);
    })
    .catch(err => {
      console.error(err);
    });
  }
});
