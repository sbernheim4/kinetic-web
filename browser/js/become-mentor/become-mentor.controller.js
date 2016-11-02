'use strict'

app.controller('BecomeMentorCtrl', function ($scope, GoToSectionFactory) {
	$scope.goToSection = GoToSectionFactory.goToSection;
});
