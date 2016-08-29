'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('handbook', {
		url: '/get-the-kinetic-handbook',
		templateUrl: 'js/handbook/handbook.template.html',
		controller: 'HandbookCtrl'
	});
});
