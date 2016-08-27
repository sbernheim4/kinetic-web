'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('support', {
		url: '/support',
		controller: 'SupportCtrl',
		templateUrl: 'js/support/support.template.html'
	});
});
