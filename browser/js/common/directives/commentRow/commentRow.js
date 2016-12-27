app.directive('commentRow', function () {
  return {
    scope: {
    	comment: '='
    },
    restrict: 'A',
  	templateUrl: 'js/common/directives/commentRow/commentRow.html',
  	link: function (scope, element, attributes) {
      scope.message = scope.comment.message;
      scope.name = `${scope.comment.authorId.firstName} ${scope.comment.authorId.lastName}`
  	}
  };
});