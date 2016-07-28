'use strict';

app.controller('HomeCtrl', function($scope, AuthService) {
	$scope.isLoggedIn = AuthService.isAuthenticated();
	trackJs.track('ahoy trackjs!');
});
