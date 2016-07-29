'use strict'

app.controller('CampusesCtrl', function ($scope, AuthService) {
	$scope.isLoggedIn = AuthService.isAuthenticated();

});
