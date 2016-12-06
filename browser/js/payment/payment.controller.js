'use strict'

app.controller('PaymentCtrl', function ($scope) {

	$scope.cardProcessingError = false;

	$scope.submitForm = function (user) {
		FormFactory.submitDonation(user)
		.then(() => {
			$scope.wasFormSubmitted = true;
		})
		.catch(e => {
			$scope.cardProcessingError = true;
			console.error(e);
		})
	};

});
