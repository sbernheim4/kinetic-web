'use strict'

app.controller('CampusesCtrl', function ($scope, GoToSectionFactory) {
	$scope.goToSection = function(val, state) {
		GoToSectionFactory.goToSection(val, state);
	};
});
