'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('forum', {
    url: '/forum',
    templateUrl: 'js/forum/forum.template.html',
    controller: 'ForumCtrl',
    resolve: {
    	loggedInUser: (AuthService) => AuthService.getLoggedInUser(),
    	discussions: (ForumFactory) => ForumFactory.getAllDiscussions()
    }
  });
});
