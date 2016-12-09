'use strict'

app.controller('PaymentCtrl', function ($scope) {

	$scope.cardProcessingError = false;

	$scope.submitForm = function (user) {
		// launch checkout page from stripe
		//
		// store token that is returned as a variable and pass that
		// user.stipeInfo =
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
