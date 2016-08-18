'use strict';

app.controller('HomeCtrl', function($scope, AuthService, GoToSectionFactory) {
	$scope.isLoggedIn = AuthService.isAuthenticated();
	$scope.goToSection = function (val, state) {
		GoToSectionFactory.goToSection(val, state);
	}
});
