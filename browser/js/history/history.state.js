'use strict'

app.config(function ($stateProvider) {

	// Register our *history* state.
	$stateProvider.state('history', {
		url: '/history',
		templateUrl: 'js/history/history.template.html'
	});
});
