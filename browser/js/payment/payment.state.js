'use strict'

app.config(function ($stateProvider) {

	$stateProvider.state('payment', {
		url: '/make-a-donation',
		templateUrl: 'js/payment/payment.template.html',
		controller: 'PaymentCtrl'
	});
});
