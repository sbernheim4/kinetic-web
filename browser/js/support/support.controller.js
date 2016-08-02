'use strict'

app.controller('SupportCtrl', function($scope, AuthService) {
	$scope.isLoggedIn = AuthService.isAuthenticated();
});
