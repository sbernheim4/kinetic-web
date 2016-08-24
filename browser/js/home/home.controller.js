'use strict';

app.controller('HomeCtrl', function($scope, AuthService, GoToSectionFactory) {
	$scope.isLoggedIn = AuthService.isAuthenticated();
	$scope.goToSection = GoToSectionFactory.goToSection;
});
