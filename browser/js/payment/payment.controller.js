'use strict'

app.controller('PaymentCtrl', function ($scope, FormFactory) {

	$scope.wasFormSubmitted = false;

	$scope.submitForm = function (user) {
		$scope.wasFormSubmitted = true;
	};

});
