'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('construction', {
		url: '/construction',
		controller: 'ConstructionCtrl',
		templateUrl: 'js/construction/construction.template.html'
	});
});
