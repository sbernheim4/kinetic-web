'use strict'

app.config(function ($stateProvider) {

	// Register our *history* state.
	$stateProvider.state('history', {
		url: '/history',
		controller: 'HistoryCtrl',
		templateUrl: 'js/history/history.template.html'
	});
});
