'use strict'

app.config(function ($stateProvider) {

	$stateProvider.state('press', {
		url: '/press',
		templateUrl: 'js/press/press.template.html',
		controller: 'PressCtrl'
	});
});
