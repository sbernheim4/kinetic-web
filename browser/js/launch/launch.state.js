'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('launch', {
		url: '/launch-a-chapter',
		templateUrl: 'js/launch/launch.template.html',
		controller: 'LaunchCtrl'
	});
});
