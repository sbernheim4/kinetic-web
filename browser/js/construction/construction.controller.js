'use strict'

app.controller('ConstructionCtrl', function ($scope, AuthService) {
	$scope.isLoggedIn = AuthService.isAuthenticated();
});
