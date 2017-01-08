app.directive('discussionRow', function () {
  return {
    scope: {
      discussion: '='
    },
    restrict: 'A',
    templateUrl: 'js/common/directives/discussionRow/discussionRow.html',
    link: function (scope, element, attributes) {
      scope.id = scope.discussion._id;
      scope.title = scope.discussion.title;
      scope.discussion.comments = scope.discussion.comments || [];
      scope.comments = scope.discussion.comments;
      scope.mostRecentComment = () => {
        if (scope.discussion.comments.length) {
          moment(scope.discussion.comments[scope.discussion.comments.length-1].createdAt).fromNow();
        } else {
          "No comments yet...";
        }
      }
    }
  };
});