'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('support', {
		url: '/support',
		templateUrl: 'js/support/support.html',
		controller: 'SupportCtrl'
	});
});
