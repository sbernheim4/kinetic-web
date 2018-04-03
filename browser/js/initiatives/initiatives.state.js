'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('initiatives', {
		url: '/initiatives',
		templateUrl: 'js/initiatives/initiatives.template.html'
	});
});
