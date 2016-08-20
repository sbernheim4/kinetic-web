'use strict'

app.controller('HandbookCtrl', function ($scope, $http) {

	$scope.show = true;

	$scope.submitGetHandbook = function (user) {
		user.newsletter = !!user.newsletter;

		console.log('Get btn pressed');
		$http.post('/api/forms/get-the-handbook', user);
		$scope.show = false;
	}
});
