'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('discussion', {
    url: '/forum/discussion/:id',
    templateUrl: 'js/forum/discussion/discussion.template.html',
    controller: 'DiscussionCtrl',
    resolve: {
    	loggedInUser: (AuthService) => AuthService.getLoggedInUser(),
    	discussion: (ForumFactory, $stateParams) => ForumFactory.getADiscussion($stateParams.id)
    }
  });
});
