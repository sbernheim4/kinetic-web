'use strict';

app.controller('ResourceCtrl', function($scope, GoToSectionFactory) {
	$scope.goToSection = GoToSectionFactory.goToSection;
});
