'use strict'

app.controller('PaymentCtrl', function ($scope) {

	$scope.wasFormSubmitted = false;

	$scope.submitForm = function (user) {
		$scope.wasFormSubmitted = true;
	};

});
