'use strict'

app.controller('PaymentCtrl', function ($scope, FormFactory) {

	$scope.cardProcessingError = false;
	$scope.wasFormSubmitted = false;

	$scope.submitForm = function () {
		showStripe();
	};

	function showStripe(){
		// get the amount the user entered
		const donationAmountInCents = parseInt(document.getElementById("donationAmount").value) * 100;

		var handler = createHandler();

		// open the handler on the page
		handler.open({
			name: 'Donation to Kinetic Global',
			description: 'Donation to Kinetic Global',
			amount: donationValueInCents
		});
	};

	function createHandler() {
		// Create the stripe handler --> info that is used for the popup and payment
		var handler = StripeCheckout.configure({
			key: 'pk_test_oMYDVrtdqS4wggcGq8FO0XNo',
			image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
			locale: 'auto',
			billingAddress: true,
			token: function(token) {
				// passes the tokenized version of all the information to FormFactory which then
				// creates the stripe charge and charges the user
				FormFactory.submitDonation(token)
			}
		});

		return handler;
	}

});
