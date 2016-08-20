'use strict'

app.controller('CampusesCtrl', function ($scope, GoToSectionFactory) {
	$scope.goToSection = GoToSectionFactory.goToSection;
});
